import type { LoginParams, LoginResponse } from '@ctypes/auth';
import request, {postRequest} from '@commons/request'

export function login(loginParam:LoginParams) {
    return postRequest<LoginResponse>('/api/login', loginParam);
}