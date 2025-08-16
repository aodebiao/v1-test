// AsyncRouteGuard.jsx
import {type ReactNode,type FC, useEffect, useState} from "react";
import { useNavigate } from "react-router";


interface AuthRouteGuardProps {
    children: ReactNode,
    guardFunction:() => boolean,
}

const AsyncRouteGuard:FC<AuthRouteGuardProps> = ({ children, guardFunction }) => {
    // 用null表示"还没检查完"，true表示"可以访问"，false表示"禁止访问"
    const [canAccess, setCanAccess] = useState<boolean|null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 异步检查函数
        const checkAccess = async () => {
            try {
                // 调用外部传入的异步守卫函数（比如API检查）
                const result = await guardFunction();
                setCanAccess(result); // 保存检查结果
            } catch (error) {
                // 出错了也禁止访问
                setCanAccess(false);
                navigate("/error", { replace: true });
            }
        };

        checkAccess(); // 执行检查
    }, [guardFunction, navigate]);


    // 还没检查完？显示加载提示（别让用户看到内容）
    if (canAccess === null) {
        return <div>Checking access...</div>;
    }

    // 检查不通过？不显示内容（已经跳走了）
    if (!canAccess) {
        return null;
    }

    // 检查通过，显示内容
    return children;
};

export default AsyncRouteGuard