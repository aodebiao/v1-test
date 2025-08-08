import type { LoginParams, LoginResponse } from '@/types/auth';
import request from '@commons/request'

export function login(loginParam:LoginParams) {
    return request.post<LoginResponse>('/api/login', loginParam);
}