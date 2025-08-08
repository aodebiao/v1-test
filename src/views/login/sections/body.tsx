import { Box, Button, Divider, InputAdornment } from '@mui/material';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import * as React from "react";
import { useForm } from "react-hook-form";
import type { LoginResponse} from "../../../types/auth";
import { postRequest } from '@commons/request'


type LoginFormData = {
    username: string;
    password: string;
    verifyCode:string
};

function BodySection() {
    const [codeUrl, setCodeUrl] = React.useState<string>('');
    const [code, setCode] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(true);
    const [imgLoading, setImgLoading] = React.useState(true);
    const [err, setErr] = React.useState<boolean>(false);
    const formContext = useForm<LoginFormData>({ defaultValues: { username: "", password: "",verifyCode:'' } });

    // 从后端获取验证码的函数
    const fetchCaptcha = async () => {
        try {
            setLoading(true);
            setImgLoading(true);
            setErr(false);
            const response = await fetch('https://www.mxnzp.com/api/verifycode/code?len=4&type=0&app_id=fhpmcbgqvmenohio&app_secret=XVrVkH9p2Rl33bRHhcSHjTw9v6MprFyl');
            const data = await response.json();

            if (data && data.data && data.data.verifyCodeImgUrl) {
                setCodeUrl(`${data.data.verifyCodeImgUrl}?t=${new Date().getTime()}`);
                setCode(data.data.verifyCode);
            } else {
                setErr(true);
            }
        } catch (error) {
            console.error('获取验证码失败:', error);
            setErr(true);
        } finally {
            setLoading(false);
        }
    };

    // 组件挂载时获取验证码
    React.useEffect(() => {
        fetchCaptcha();
    }, []);

    const handleImageLoaded = () => {
        setImgLoading(false);
        setErr(false);
    };

    const handleImageError = () => {
        console.error('验证码加载失败');
        setImgLoading(false);
        setErr(true);
    };

    const loginSubmit = async () => {

        const valid = await formContext.trigger();
        if (!valid) {
            console.log("表单校验失败")
            return;
        }
        const values = formContext.getValues();
        if (values.verifyCode.toLowerCase() !== code.toLowerCase()) {
            formContext.setError("verifyCode", {
                type: "manual", // 手动设置错误
                message: "验证码错误", // 会显示在 TextFieldElement 下方
            });
            return;
        }else {
            formContext.clearErrors("verifyCode"); // 校验正确时清除错误
        }
        const res: LoginResponse = await postRequest<LoginResponse>('/api/login', values);
        console.log(res)
    }

    return (
        <FormContainer
            formContext={formContext}
            defaultValues={{ username: '', password: '' }}
            onSuccess={(data) => console.log(data)}
        >
            <Box display='flex' flexDirection={'column'} gap={'20px'} maxWidth={400} mx="auto">
                <TextFieldElement
                    name="username"
                    label="姓名"
                    required
                    fullWidth
                    rules={{ required: '姓名不能为空' }}
                />
                <TextFieldElement
                    name="password"
                    label="密码"
                    type="password"
                    required
                    fullWidth
                    rules={{
                        required: '密码不能为空',
                    }}
                />

                <Box display="flex" flexDirection={'row'}>
                    <TextFieldElement
                        name="verifyCode"
                        label="验证码"
                        required
                        fullWidth
                        onChange={() => formContext.clearErrors("verifyCode")}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Divider sx={{
                                            height: '40px',
                                            mx: 1,
                                            borderColor: 'gray',
                                            borderWidth: '1px',
                                        }} orientation="vertical" />
                                        <Box
                                            sx={{
                                                width: '110px',
                                                height: '40px',
                                                position: 'relative',
                                                cursor: 'pointer',
                                                backgroundColor: '#f5f5f5',
                                                borderRadius: 1,
                                                overflow: 'hidden',
                                            }}
                                            onClick={fetchCaptcha}
                                        >
                                            {/* 加载状态指示器 - 绝对定位 */}
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#f5f5f5',
                                                zIndex: 2,
                                                opacity: (loading || imgLoading) && !err ? 1 : 0,
                                                transition: 'opacity 0.3s ease',
                                                pointerEvents: 'none'
                                            }}>
                                                <Box sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#999'
                                                }}>
                                                    加载中...
                                                </Box>
                                            </Box>

                                            {/* 验证码图片 - 绝对定位 */}
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                zIndex: 1,
                                                opacity: !loading && codeUrl && !err ? 1 : 0,
                                                transition: 'opacity 0.3s ease',
                                                pointerEvents: 'none'
                                            }}>
                                                <img
                                                    alt={'验证码'}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                    }}
                                                    src={codeUrl}
                                                    onLoad={handleImageLoaded}
                                                    onError={handleImageError}
                                                />
                                            </Box>

                                            {/* 错误状态 - 绝对定位 */}
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: '#ffebee',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#f44336',
                                                zIndex: 3,
                                                opacity: err ? 1 : 0,
                                                transition: 'opacity 0.3s ease',
                                                pointerEvents: 'none'
                                            }}>
                                                点击刷新
                                            </Box>
                                        </Box>
                                    </InputAdornment>
                                ),
                            }
                        }}
                        rules={{
                            required: '验证码不能为空',
                        }}
                    />
                </Box>
                <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    onClick={loginSubmit}
                    sx={{
                        mt: 2,
                        height: 45,
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderRadius: 1,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        '&:hover': {
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        }
                    }}
                >
                    提交
                </Button>
            </Box>
        </FormContainer>
    );
}

export default BodySection;