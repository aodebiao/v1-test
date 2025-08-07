import {Box, Button, Divider, InputAdornment} from '@mui/material';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import * as React from "react";

function BodySection() {
    const [codeUrl,setCodeUrl] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(true);
    const [imgLoading, setImgLoading] = React.useState(true);

    // 从后端获取验证码的函数
    const fetchCaptcha = async () => {
        try {
            setLoading(true);
            setImgLoading(true);
            // 这里替换为你的实际API端点
            const response = await fetch('https://www.mxnzp.com/api/verifycode/code?len=5&type=0&app_id=fhpmcbgqvmenohio&app_secret=XVrVkH9p2Rl33bRHhcSHjTw9v6MprFyl');
            const data = await response.json();

            if (data && data.data && data.data.verifyCodeImgUrl) {
                // 添加时间戳参数避免缓存
                setCodeUrl(`${data.data.verifyCodeImgUrl}?t=${new Date().getTime()}`);
            }
        } catch (error) {
            console.error('获取验证码失败:', error);
            // 可以在这里设置一个错误占位图
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
    };
    return (
        <FormContainer
            defaultValues={{ username: '', password: '' }}
            onSuccess={(data) => console.log(data)}
        >
            <Box display='flex' flexDirection={'column'} gap={'20px'}>
                <TextFieldElement
                    name="username"
                    label="姓名"
                    required
                    rules={{ required: '姓名不能为空' }}
                />
                <TextFieldElement
                    name="password"
                    label="密码"
                    required
                    rules={{
                        required:'密码不能为空',
                        // pattern: {
                        //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        //     message: '邮箱格式不正确'
                        // }
                    }}
                />

                <Box display="flex" flexDirection={'row'}>
                    <TextFieldElement
                        name="verifyCode"
                        label="验证码"
                        required
                        slotProps={{
                            input:{
                                endAdornment: <InputAdornment position="end">
                                    <Divider sx={{
                                        height: '40px',         // 手动设置高度
                                        mx: 1,              // 水平间距
                                        borderColor: 'gray',
                                        borderWidth: '1px',
                                    }} orientation="vertical" />
                                    <Box sx={{
                                        width: '110px',      // 设置宽度
                                        display: 'flex',      // 使用flex布局
                                        alignItems: 'center', // 垂直居中
                                        justifyContent: 'center', // 水平居中（可选，如果你也希望水平居中）
                                        cursor: 'pointer',
                                        height: '40px',       // 设置一个固定高度，这样垂直居中才有效果。这个高度应该与旁边的Divider和输入框的高度相匹配。
                                    }}
                                         onClick={fetchCaptcha}
                                    >
                                        {(loading || imgLoading) ? (<Box sx={{
                                            width: 100,
                                            height: 40,
                                            backgroundColor: '#f5f5f5',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#999'
                                        }}>
                                            加载中.....
                                        </Box>) :
                                            codeUrl ?  (<img
                                            alt={'验证码'}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                opacity: imgLoading ? 0 : 1,
                                                transition: 'opacity 0.3s ease'

                                            }}
                                            src={codeUrl}
                                            onLoad={handleImageLoaded}
                                            onError={(e) => {
                                                // 图片加载失败处理
                                                console.error('验证码加载失败');
                                                e.target.style.display = 'none';
                                                // 可以设置一个错误占位图
                                            }}
                                        />) : (
                                            // 获取失败的占位符
                                            <Box sx={{
                                            width: 100,
                                            height: 40,
                                            backgroundColor: '#ffebee',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#f44336'
                                        }}>
                                        点击刷新
                                    </Box>)
                                        }
                                    </Box>
                                    {/*<img  alt={'验证码加载失败'} src={''}/>*/}
                                </InputAdornment>,

                            }
                        }}
                        sx={{
                            width: '100%',
                        }}
                        rules={{
                            required: '验证码不能为空',
                        }}
                    />
                    </Box>
                {/*<Button type="submit">提交</Button>*/}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
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

export default BodySection