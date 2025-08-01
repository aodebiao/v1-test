import {Box, Button, Divider, InputAdornment} from '@mui/material';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';

function BodySection() {
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
                                        height: '35px',         // 手动设置高度
                                        mx: 1,              // 水平间距
                                        borderColor: 'gray',
                                        borderWidth: '1px',
                                    }} orientation="vertical" />
                                    <img crossorigin="anonymous" alt={'验证码加载失败'} src={'https://www.mxnzp.com/api_file/verify/e/1/a/9/2/c/e/2/e35d48ab50034250b6807d922a18dbd4.jpg'}/>
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
                <Button type="submit">提交</Button>
            </Box>
        </FormContainer>
    );
}

export default BodySection