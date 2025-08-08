import Mock from 'mockjs';


Mock.mock('/api/login', 'post', function(options) {
    const { username, password } = JSON.parse(options.body);
    return username === 'admin' && password === 'admin'
        ? { code: 200, message: '登录成功', data: { token: 'hello-world', username: 'admin', userId: '123' } }
        : { code: 401, message: '用户名或密码错误' };
});
