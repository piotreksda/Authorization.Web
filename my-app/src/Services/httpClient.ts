import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import Services, { IServiceConfig, ServiceKeys } from '../Configurations/ApiMicroServices';
import { Endpoints, IEndpoint } from '../Configurations/Endpoints';



function createServiceInstance(serviceConfig: IServiceConfig): AxiosInstance {
    const instance = axios.create({
        baseURL: serviceConfig.rootUrl,
    });

    instance.interceptors.request.use((config : any) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
        }
        return config;
    });
    instance.interceptors.response.use(function (response) {
        return response;
      }, async function (error) {
        const originalRequest = error.config;
        if (error.code === 'ERR_NETWORK'){
            toast.error('NETWORK ERROR');
        }
        else if (error.response.status === 401 && error.response.headers && error.response.headers.authorization && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                const endpoint = Endpoints.RefreshToken;
                const serviceInstance = serviceInstances[endpoint.service];
                const refreshResponse = await serviceInstance.request<string>({
                    method: endpoint.method,
                    url: endpoint.url
                });

                const newToken = refreshResponse.data;
                localStorage.setItem('token', newToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                
                return axios(originalRequest);
            } catch (refreshError : any) {
                toast.error(refreshError.response.data.Title || 'Error');
                throw refreshError;
            }
        }
        else if (error.response.status !== 200 && !originalRequest._retry){
            toast.error(error.response.data.Title || 'Error');
            throw error;
        }
        return Promise.reject(error);
      });

    return instance;
}

const serviceInstances: Record<ServiceKeys, AxiosInstance> = Object.keys(Services).reduce((instances, key) => {
    const serviceKey = key as ServiceKeys;
    instances[serviceKey] = createServiceInstance(Services[serviceKey]);
    return instances;
}, {} as Record<ServiceKeys, AxiosInstance>);

const httpClient = {
    request: <T = any>(endpoint: IEndpoint, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        const serviceInstance = serviceInstances[endpoint.service];
        return serviceInstance.request<T>({ ...options, url: endpoint.url, method: endpoint.method });
    },
};

export default httpClient;