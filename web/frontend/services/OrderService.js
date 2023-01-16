import HttpRequest from "./HttpRequest";

const baseUrl = 'http://localhost:8080/api';

const OrderCreateService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}/orders/create`, data);
};

const OrderGetService = async (data) => {
    return await HttpRequest("GET", `${baseUrl}/orders/findAll`, null);
};

export { OrderCreateService, OrderGetService };