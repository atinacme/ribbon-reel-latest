import HttpRequest from "./HttpRequest";

const baseUrl = 'http://localhost:8080/api/onboardings';

const OnboardingCreateService = async (data) => {
    return await HttpRequest("POST", `${baseUrl}`, data);
};

const OnboardingGetParticularService = async (id) => {
    return await HttpRequest("GET", `${baseUrl / id}`, null);
};

export { OnboardingCreateService, OnboardingGetParticularService }