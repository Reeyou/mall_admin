import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout: 10000
})
instance.interceptors.request.use(
    config => {
        if (sessionStorage.token) {
            config.headers.authorization = sessionStorage.token;
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
instance.interceptors.response.use(
    res => {
        const { authorization } = res.headers;
        //如果token存在则存在localStorage
        if (authorization) {
            sessionStorage.setItem('token', authorization);
        }
        return res;
    },
    err => {
        if (err) {
            switch (err.response.data.code) {
                // 状态码为200  token失效
                case 201:
                    const { authorization } = err.response.headers;
                    authorization && sessionStorage.setItem('token', authorization);
                    break;
                case 401:
                    sessionStorage.removeItem('token')
                    router.replace({
                        path: '/login',
                    })
                    break;
                default:
                    break;
            }
        }
        return Promise.reject(err.response.data) // 返回接口返回的错误信息
    }
)

function request (url, options) {
    // 请求状态码
    const responseCode = {
        "200": "服务请求成功",
        "400": "请求参数错误",
        "401": "未进行认证,用户没有权限(Token)",
        "403": "访问被禁止",
        "404": "请求路径错误",
        "500": "服务器发生错误,请检查服务器",
        "502": "网关错误",
        "503": "服务不可用，服务器过载或维护中",
        "504": "网关超时",
    }
    // return true;

    //请求添加Token
    const option = { ...options }

    if (option.method == 'POST') {
        return POST(url, option.body);
    } else {
        return GET(url);
    }
    //封装Get方法
    function GET (url) {
        return new Promise((resolve, reject) => {
            instance.get(url)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error.data);
                })
        })
    }
    //封装Post方法
    //qs.stringify()将对象 序列化成Url的形式，以&进行拼接
    //qs.parse()将Url解析成对象的形式
    function POST (url, params) {
        return new Promise((resolve, reject) => {
            instance.post(url, qs.stringify(params, { indices: false }))
            // instance.post(url, params)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }
}

export {
    instance,
    request
}