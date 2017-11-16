# registdemo

> 带倒计时和验证码的注册组件

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

```参数传递

// 注册api 必选

        registApi: {
            type: String,
            required: true
        },

// 自定义提示 可选
// 默认 '60s后重试'

        msg: {
            type: String,
            default: '60s后重试'
        },

// 验证码重发 倒数时间 可选
// 默认60s

        seconds: {
            type: Number,
            default: 60
        }

#若修改倒数时间，建议一并修改自定义提示
```
```在chrome下手机模式测试
```
