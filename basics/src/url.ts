function runUrlDemo(): void {
    // ?? how do you create a url object from a url string
    const apiUrl = new URL(
        "https://api.assetunion.com/users?page=2&limit=10",
        // "https://api.assetunion.com/users?page=2&limit=10&sort=latest",
    );

    console.log("full url", apiUrl.href);
    console.log("protocol", apiUrl.protocol);
    console.log("host", apiUrl.host);
    console.log("host name", apiUrl.hostname);
    console.log("path name", apiUrl.pathname);
    console.log("url hash", apiUrl.hash);
    console.log("\n");
    console.log("search params", apiUrl.searchParams);
    const pageParams = apiUrl.searchParams.get("page");
    const limitParams = apiUrl.searchParams.get("limit");
    const sortParams = apiUrl.searchParams.get("sort");

    // if the parameter is not availabel it returns null
    console.log(pageParams, limitParams, sortParams);

    // one can also update parameters
    apiUrl.searchParams.set("page", "3");
    console.log("url after update", apiUrl.href);

    // url query params
    const queryParams = new URLSearchParams({
        search: "node js",
        page: "1",
        limit: "5",
    });

    console.log("query params: ", queryParams.toString());
}

runUrlDemo();
