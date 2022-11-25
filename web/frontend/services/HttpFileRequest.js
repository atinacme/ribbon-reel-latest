import axios from "axios";

const HttpFileRequest = async (method, url, formData) => {
    const response = await axios({
        method: method,
        headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
        },
        url: url,
        data: formData,
    });
    return response.data;
};

export default HttpFileRequest;
