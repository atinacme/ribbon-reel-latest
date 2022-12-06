import HttpRequest from "./HttpRequest";
import HttpFileRequest from "./HttpFileRequest";

const baseUrl = 'http://localhost:8080/api';

const OrderCreateService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/orders/create`, data);
};

const OrderGetService = async (data) => {
    return await HttpRequest("GET", `${baseUrl}/orders/findAll`, null);
};

const OrderVideoAddService = async (formData) => {
    return await HttpFileRequest("POST", `${baseUrl}/file/upload`, formData);
};

const OrderMailService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/orders/mail`, data);
};

const OrderGetFileService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/file/findFile`, data);
};

export { OrderCreateService, OrderGetService, OrderVideoAddService, OrderMailService, OrderGetFileService };