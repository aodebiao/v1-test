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

                <Box display={'flex'} flexDirection={'row'}>
                    <TextFieldElement
                        name="verifyCode"
                        sx={{
                            width: '66%',
                        }}
                        label="验证码"
                        required
                        rules={{
                            required:'验证码不能为空',
                            // pattern: {
                            //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            //     message: '邮箱格式不正确'
                            // }
                        }}
                    />
                    <Divider sx={{ height: 'auto', m: 0.5 }} orientation="vertical" />

                </Box>
                <Button type="submit">提交</Button>
            </Box>
        </FormContainer>
    );
}

export default BodySection