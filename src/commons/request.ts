import axios, {
    type AxiosInstance,
    type InternalAxiosRequestConfig,
    type AxiosResponse
} from 'axios';


// 定义响应数据的通用结构
export interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

// 创建 axios 实例
const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 加 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 响应拦截器
request.interceptors.response.use(
    <T>(response: AxiosResponse<ApiResponse<T>>) => {
        if (response.data.code !== 200) {
            console.error('接口错误：', response.data.message);
            return Promise.reject(response);
        }
        return response; // 注意这里返回的是完整响应
    },
    (error) => Promise.reject(error)
);


// // 带泛型的 POST 请求封装，自动解包 response.data
// export const  postRequest = async <T>(url: string, data?: any): Promise<T> => {
//     const response:AxiosResponse<ApiResponse<T>> = await request.post<ApiResponse<T>>(url, data);
//     // 这里 response 类型是 AxiosResponse<ApiResponse<T>>
//     // 返回里面的 data.data， 即接口真正数据
//     return response.data.data;
// }

// 3. 使用函数声明而不是箭头函数
export type PostRequest = <T>(url: string, data?: any) => Promise<T>;
export const  postRequest:PostRequest = async <T>(url: string, data?: any): Promise<T> => {
    const response:AxiosResponse<ApiResponse<T>> = await request.post<ApiResponse<T>>(url, data);
    // 这里 response 类型是 AxiosResponse<ApiResponse<T>>
    // 返回里面的 data.data， 即接口真正数据
    // return response.data.data;
    return response.data.data;
}

// export async function postRequest<T>(url: string, data?: any): Promise<T> {
//     const response:AxiosResponse<ApiResponse<T>>  = await request
//         .post<ApiResponse<T>>(url, data);
//     return response.data.data;
// }

// 类似的你也可以封装 GET
export async function getRequest<T>(url: string, params?: any): Promise<T> {
    const response = await request.get<ApiResponse<T>>(url, { params });
    return response.data.data;
}



export default request;
