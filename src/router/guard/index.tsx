import type {FC, ReactNode} from "react";
import AuthGuard from "@router/guard/AuthGuard";
import AsyncAuthGuard from "@router/guard/AsyncAuthGuard";

type Guard = (children: ReactNode) => ReactNode;

export const CombineGuard = (guards:Guard[]):FC<{children:ReactNode}> => {
    return ({children}) => {
        return guards.reduce<ReactNode>((acc,guard) => {
            return guard(acc)
        },children)
    }
}

// 使用示例：组合多个守卫
const ProtectedRoute = CombineGuard([
    // (children) => <AsyncAuthGuard guardFunction={() => true}>{children}</AsyncAuthGuard>,
    (children) => <AuthGuard>{children}</AuthGuard>,
    // (children) => <DataGuard dataLoader={loadDashboardData}>{children}</DataGuard>
]);


export default ProtectedRoute;
