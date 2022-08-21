let urlTemp = '';

if (process.env.NODE_ENV === "development") {
    urlTemp = "http://localhost:8089/"
} else {
    urlTemp = "/"
}

const baseURL = urlTemp;
const image = baseURL + "api/file/image/";

export default { baseURL, image };