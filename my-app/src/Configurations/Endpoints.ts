import { ServiceKeys } from "./ApiMicroServices";


export interface IEndpoint {
    service: ServiceKeys;
    url: string;
    method: HttpMethod;
}
enum HttpMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch",
}

const Endpoints: Record<string, IEndpoint> = {
    login: {
        service: ServiceKeys.Authorization,
        url: "login",
        method: HttpMethod.POST,
    },
    refreshToken: {
        service: ServiceKeys.Authorization,
        url: "refreshToken",
        method: HttpMethod.GET
    }
};

export default Endpoints;