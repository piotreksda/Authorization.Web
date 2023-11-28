export interface IServiceConfig {
    rootUrl: string;
}

export enum ServiceKeys {
    Authorization = "Authorization",
}

const Services: Record<ServiceKeys, IServiceConfig> = {
    Authorization: {
        rootUrl: process.env.REACT_APP_PORTFOLIO_APP_AUTHORIZATION_URL || '',
    },
};

export default Services;