import React from 'react'
import {useNavigate} from "react-router";
import type {LoginParams, LoginResponse} from "@ctypes/auth";
import {useAppSelector} from "@store/index";
import {postRequest} from "@commons/request";



export const useAuth = () => {
    const [authenticated, setAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState<LoginResponse>(); // 用户信息
    const navigate = useNavigate();
    const userState = useAppSelector(state => state.user)
    // React.useEffect(() => {
        const checkAuth =  () => {
            const token = localStorage.getItem("token");
            // eslint-disable-next-line no-debugger
            debugger
            if (!token) {
                setAuthenticated(false);
                return;
            }
            setAuthenticated(true);
            setUser(userState)
        }
        debugger
        checkAuth();
    // },[userState])

// 登出函数
    const logout = () => {
        localStorage.removeItem("token"); // 清除token
        setAuthenticated(false);
        setUser(undefined);
        navigate("/login"); // 跳回登录页
    };

    // 把需要的状态和方法返回出去
    return { authenticated, user, logout };




}