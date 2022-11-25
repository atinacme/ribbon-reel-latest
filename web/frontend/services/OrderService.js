import HttpRequest from "./HttpRequest";
import HttpFileRequest from "./HttpFileRequest";

const baseUrl = 'http://localhost:8080/api';

const OrderCreateService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/orders/create`, data);
};

const OrderVideoAddService = async (formData) => {
    return await HttpFileRequest("POST", `${baseUrl}/file/upload`, formData);
};

export { OrderCreateService, OrderVideoAddService }