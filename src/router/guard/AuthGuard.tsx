import type {FC, ReactNode} from 'react';
import {Navigate, useLocation} from "react-router";
import {useAuth} from "../../hooks/auth";

interface AuthGuardProps {
    children?: ReactNode;
    requireRole?: boolean;
}


const AuthGuard:FC<AuthGuardProps> = ({children,requireRole}:AuthGuardProps) => {
    const location = useLocation();
    const { authenticated, user } = useAuth();

    // 加载中（比如正在检查token是否有效），显示加载提示
    // if (loading) {
    //     return <div>Loading...</div>; // 这里可以换成好看的加载动画
    // }

    // 没登录？去登录页
    if (!authenticated) {
        // eslint-disable-next-line no-debugger
        debugger
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children

}

export default AuthGuard;