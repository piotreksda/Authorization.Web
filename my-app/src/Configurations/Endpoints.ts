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
    Login: {
        service: ServiceKeys.Authorization,
        url: "login",
        method: HttpMethod.POST,
    },
    RefreshToken: {
        service: ServiceKeys.Authorization,
        url: "refreshToken",
        method: HttpMethod.GET
    },
    Register: {
        service: ServiceKeys.Authorization,
        url: "register",
        method: HttpMethod.POST
    }
};

export { Endpoints };