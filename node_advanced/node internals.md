## v8 engine

The **V8 engine** is Google’s open-source, high-performance JavaScript and WebAssembly engine written in C++. It acts as the execution environment that turns high-level JavaScript code into low-level machine code that your computer's CPU can execute directly.

It powers Google Chrome and Chromium-based browsers, and serves as the core runtime inside **Node.js** and **Deno**.

### How V8 Runs JavaScript: The Execution Pipeline

Historically, JavaScript was purely interpreted (line-by-line), which made it slow. V8 introduced modern **Just-In-Time (JIT) compilation**, combining fast startup times with optimized peak execution speed.

1. **Parsing:** The parser reads JavaScript source code and transforms it into an **Abstract Syntax Tree (AST)**—a tree representation of the program's syntactic structure.
2. **Interpreter (`Ignition`):** Ignition takes the AST and generates compact bytecode. This bytecode begins executing immediately, giving the application near-instant startup times.
3. **Profiler & Feedback Collection:** While the bytecode runs, a background profiler observes which functions run repeatedly ("hot functions") and gathers **type feedback** (e.g., whether a function consistently receives two integers versus two strings).
4. **Optimizing Compiler (`TurboFan`):** Once a piece of code is deemed hot, TurboFan takes the bytecode along with the collected type information and compiles it into highly optimized native machine code.
5. **Deoptimization ("Bailing Out"):** Because JavaScript is dynamically typed, assumptions can break. If TurboFan optimized a function assuming it only receives numbers, and your code suddenly passes an object, V8 discards the machine code and drops back down to Ignition's bytecode (shown in red above).

### Core Architectural Concepts

- **Hidden Classes (`Shapes` or `Maps`):**
  In languages like C++ or Java, object layouts are fixed at compile time. In JavaScript, properties can be added or deleted on the fly. To avoid costly hash-table lookups, V8 dynamically creates internal "hidden classes." Objects sharing the exact same properties in the same initialization order share a hidden class, allowing direct memory offset reads.
- **Inline Caches (IC):**
  When V8 accesses a property on an object repeatedly (e.g., `user.name`), it caches the memory offset location directly into the call site. If the object’s hidden class hasn't changed, V8 skips property lookup entirely.
- **Garbage Collection (`Orinoco`):**
  V8 automatically reclaims unreferenced memory using a generational garbage collector:
- **Young Generation (Scavenge):** Where newly allocated objects live. It cleans up short-lived objects rapidly.
- **Old Generation (Mark-Sweep-Compact):** Objects that survive multiple young-generation cycles get promoted here and are collected less frequently using concurrent, parallel algorithms to prevent application freezes.

### V8 vs. Node.js: Where the Boundary Lies

A common point of confusion is what belongs to V8 versus what belongs to Node.js:

| Component               | Handled by V8                                   | Handled by Node.js (via libuv & C++ bindings)             |
| ----------------------- | ----------------------------------------------- | --------------------------------------------------------- |
| **Language Primitives** | Variables, loops, functions, closures           | Custom globals (`process`, `Buffer`, `__dirname`)         |
| **Object Model**        | Arrays, Objects, Promises, Maps/Sets            | Streams, EventEmitter                                     |
| **Memory Management**   | Call stack, heap allocation, Garbage Collection | Buffer pools, native addon memory                         |
| **System Operations**   | _None_ (V8 has no concept of files or networks) | File system (`fs`), Networking (`http`, `net`), OS access |
| **Concurrency**         | Single-threaded JavaScript execution context    | Event loop, libuv thread pool, Worker threads             |

V8 provides the raw compute and JavaScript language semantics; Node.js supplies the operating system bindings and runtime event loop that make it useful outside a browser.

v8 = parse js code -> produce bytecode -> execute the code

---

## libuv

The **libuv thread pool** is a background pool of worker threads that Node.js uses to handle operations that cannot be performed asynchronously by the operating system kernel.

While JavaScript runs on a single thread and the event loop handles non-blocking I/O (like network requests) directly through the OS kernel, certain tasks block the system. libuv offloads these heavy or inherently blocking tasks to this internal thread pool to keep the main event loop free and responsive.

### How It Works

1. **JavaScript execution:** Your code runs on the main thread (V8).
2. **Delegation:** When you call an asynchronous function that requires disk access or heavy computation, Node.js hands the task over to libuv.
3. **Thread pool pickup:** A worker thread from the pool takes the task, executes it synchronously in the background, and waits for it to complete.
4. **Callback queuing:** Once finished, the worker thread notifies the main event loop, which queues the corresponding JavaScript callback to be executed on the main thread.

### What Runs in the Thread Pool vs. What Doesn't

A common misconception is that _all_ asynchronous Node.js operations use the thread pool. In reality, libuv only uses it for specific subsystems:

| Runs in the Thread Pool                                                                                                  | Does NOT Run in the Thread Pool (Kernel Asynchronous)                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **File system (`fs`)**: `fs.readFile`, `fs.writeFile`, etc. (POSIX has no universal, non-blocking asynchronous file API) | **Network I/O**: `http`, `https`, TCP, UDP sockets (handled via OS mechanisms like `epoll` on Linux, `kqueue` on macOS, or `IOCP` on Windows) |
| **Cryptography (`crypto`)**: CPU-heavy tasks like `crypto.pbkdf2`, `crypto.scrypt`, `crypto.randomBytes`                 | **Timers**: `setTimeout`, `setInterval`, `setImmediate` (managed directly inside the event loop)                                              |
| **Compression (`zlib`)**: Deflate, gzip, brotli                                                                          | **Process management**: `child_process` (signals/pipes are monitored via OS abstractions)                                                     |
| **DNS resolution**: `dns.lookup` (uses the blocking system call `getaddrinfo`)                                           | **DNS resolution (raw)**: `dns.resolve*` (uses `c-ares`, which bypasses the thread pool and uses network sockets directly)                    |

### Pool Size and Bottlenecks

By default, libuv creates **4 threads** in the pool.

If you initiate multiple heavy operations at once—for example, hashing five passwords simultaneously using `crypto.pbkdf2`—the first four operations consume all four threads. The fifth operation must wait in line until one of the first four completes, causing noticeable latency.

You can adjust the pool size by setting the `UV_THREADPOOL_SIZE` environment variable:

```bash
UV_THREADPOOL_SIZE=8 node app.js

```

- **Minimum:** 1 thread
- **Maximum:** 128 threads
- **Rule:** You must set this environment variable **before** the Node.js runtime initializes the pool. Setting `process.env.UV_THREADPOOL_SIZE = 8` inside your JavaScript code is generally ignored or unreliable because the pool is often initialized before your script finishes evaluating.

---

> Node.js benchmark demonstrating how the libuv thread pool gets saturated and how UV_THREADPOOL_SIZE fixes it.

This benchmark runs multiple concurrent `crypto.pbkdf2` operations to saturate the thread pool. Because PBKDF2 is CPU-intensive and offloaded directly to libuv, running 8 concurrent calls with the default pool size (4 threads) forces 4 tasks to wait in queue.

### 1. Benchmark Script

Save this script as `benchmark.js`:

```javascript
const crypto = require("crypto");
const { performance } = require("perf_hooks");

const TOTAL_CALLS = 8;
const ITERATIONS = 100_000;
const KEY_LEN = 64;
const DIGEST = "sha512";

const startTime = performance.now();

console.log(`Starting ${TOTAL_CALLS} concurrent PBKDF2 operations...`);

for (let i = 1; i <= TOTAL_CALLS; i++) {
    crypto.pbkdf2(
        "my-secret-password",
        "salt-string",
        ITERATIONS,
        KEY_LEN,
        DIGEST,
        (err) => {
            if (err) throw err;
            const duration = (performance.now() - startTime).toFixed(2);
            console.log(`Hash #${i} completed in ${duration} ms`);
        },
    );
}
```

### 2. Run with the Default Pool Size (4 Threads)

Execute the script normally:

```bash
node benchmark.js

```

**Expected Output:**

```text
Starting 8 concurrent PBKDF2 operations...
Hash #1 completed in 312.45 ms
Hash #2 completed in 318.10 ms
Hash #3 completed in 320.65 ms
Hash #4 completed in 325.80 ms
Hash #5 completed in 621.15 ms
Hash #6 completed in 628.40 ms
Hash #7 completed in 633.90 ms
Hash #8 completed in 639.20 ms

```

**Why this happens:**

- Hashes #1 through #4 grab the 4 available libuv worker threads immediately and finish in ~320 ms.
- Hashes #5 through #8 sit idle in libuv's internal task queue. They only start executing after the first batch finishes, taking twice as long (~630 ms total).

### 3. Run with an Expanded Pool (`UV_THREADPOOL_SIZE=8`)

Allocate 8 worker threads before the runtime initializes libuv:

**On macOS / Linux:**

```bash
UV_THREADPOOL_SIZE=8 node benchmark.js

```

**On Windows (PowerShell):**

```powershell
$env:UV_THREADPOOL_SIZE=8; node benchmark.js

```

**On Windows (CMD):**

```cmd
set UV_THREADPOOL_SIZE=8 && node benchmark.js

```

**Expected Output:**

```text
Starting 8 concurrent PBKDF2 operations...
Hash #1 completed in 345.10 ms
Hash #2 completed in 350.25 ms
Hash #3 completed in 355.80 ms
Hash #4 completed in 358.40 ms
Hash #5 completed in 361.12 ms
Hash #6 completed in 364.50 ms
Hash #7 completed in 368.20 ms
Hash #8 completed in 370.05 ms

```

**Why this fixes it:**
With 8 threads available, all 8 hashing tasks are picked up simultaneously. None of them stall in the queue, cutting overall latency for the final tasks almost in half.

### Hardware Caveat

Expanding `UV_THREADPOOL_SIZE` yields the best gains when your machine has enough physical CPU cores to schedule those threads. If your machine only has 2 or 4 physical CPU cores, increasing the thread pool to 8 or 16 will trigger CPU time-slicing and context switching, meaning all threads will take longer to finish, though queued latency will disappear.

---

## c++ bindings

Connects js facing apis to native functionality

It allows js code to communicate with libuv which then communicates with the operaing system
