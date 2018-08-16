const config = {
    endpoint: "/api/"
}

const get = (url) => fetch(config.endpoint + url, {
    method: "GET"
}).then((response) => {
    var contentType = response.headers.get("content-type")
    let returnData

    if (contentType && contentType.includes("application/json")) {
        returnData = response.json()
    }
    else {
        returnData = response
    }

    if (!response.ok) {
        throw new Error()
    }

    return returnData
});

export default { get };