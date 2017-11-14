<template>
    <div class="regist">
        <header>
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            <h1>注册</h1>
            <i class="fa fa-times" aria-hidden="true"></i>
        </header>
        <div id="regist_form">
            <form action="">
                <p id="form_phone">
                    <span class="select">{{ phone_prefix }}
                        <i class="fa fa-sort-desc" aria-hidden="true"></i>
                        </i>
                    </span>
                    <input id='temp' type="text" placeholder="手机号" maxlength="11" v-model="phone_number" @keypress="filterNum" style="ime-mode:disabled;" onpaste="return false;">
                </p>
                <p id="form_code">
                    <input type="number" placeholder="验证码" v-model="code">
                    <span id="check_code" :class="{active:activeGetCode}" v-if="getCode" @click="getPhoneCode">点击获取验证码</span>
                    <span v-if="!getCode"> {{msg}} ({{ waitSeconds }}s)</span>
                </p>
                <p id="form_password">
                    <input type="password" placeholder="密码(不少于6位,包含字母和数字)" v-model="password">
                </p>
                <button id="form_registBtn" @click="registUser" ref="registBtn">
                    <i></i>注册</button>
            </form>
        </div>
        <transition>
            <phone-list  :v-if="show_phone_list">
            </phone-list>
        </transition>
    </div>
</template>

<script>
import phoneList from '../components/phoneList'
export default {
    props: {
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
    },
    components: {
        phoneList
    },
    data() {
        return {
            // 手机前缀 默认+86
            phone_prefix: '+86',
            // 点击获取验证码后，设为false,禁止点击，等待60s
            getCode: true,
            // 手机满足条件后，激活点击按钮
            activeCode: false,
            // 手机号
            phone_number: '',
            // 验证码
            code: '',
            // 密码
            password: '',
            // 等待秒数
            waitSeconds: this.seconds,
            // 是否显示电话前缀列表
            show_phone_list: true
        }
    },
    computed: {
        // 当手机检测通过，设为true，可以点击获取验证码
        // activeGetCode: false
        activeGetCode: function() {
            return this.checkCellphone(this.phone_number)
        }
    },
    methods: {
        /**
        * 验证手机号码
        * 暂只检测中国号码  +86 开头
        * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
        * 联通号码段:130、131、132、136、185、186、145
        * 电信号码段:133、153、180、189
        * @argument cellphone 手机号
        * @return
        */
        checkCellphone(cellphone) {
            var regex = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
            var res = regex.test(cellphone)
            this.activeCode = res
            return res
        },

        /**
         * 过滤输入的非数字
         */
        filterNum(event) {
            var keyCode = event.keyCode
            if ((keyCode >= 48 && keyCode <= 57)) {
                event.returnValue = true
            } else {
                event.returnValue = false
            }
        },

        /**
         * 获取手机验证码
         * @argument cellphone 手机号
         */
        getPhoneCode(event) {
            event.stopPropagation()
            if (this.activeCode) {
                // 调用切换函数，禁止点击
                this.toggleGetCode()
                // 模拟一下短信
                alert('123456')
            }
        },

        /**
         * 获取验证码切换函数
         */
        toggleGetCode() {
            // eslint-disable-next-line
            var timeId
            // 将getCode置为false,显示倒计时，同时禁止再次点击
            this.getCode = false
            // setInterval 完成倒计时，没个1s 秒数-1
            timeId = setInterval(() => {
                this.waitSeconds--
                // 当倒计时完成，清除计时器
                // 并将倒计时数值还原
                // 同时将getCode置为true，可以再次点击
                if (this.waitSeconds <= 0) {
                    clearInterval(timeId)
                    this.waitSeconds = this.seconds
                    this.getCode = true
                }
            }, 1000)
        },

        /**
         * 注册函数，发送ajax请求
         */
        registUser(event) {
            event.stopPropagation()
            event.preventDefault()
            // if (!this._testVuleLegle()) {
            //     return
            // }
            this.$refs.registBtn.classList.add('loading')
            this.$refs.registBtn.setAttribute('disabled', 'true')
            var data = {
                phonePrefix: this.phone_prefix,
                phoneNumber: this.phone_number,
                password: this.password,
                code: this.code
            }
            // 发送ajax请求
            var xhr = new XMLHttpRequest()
            xhr.timeout = 4000
            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log(xhr.responseText)
                } else {
                    console.log(xhr.status)
                }
                this.$refs.registBtn.classList.remove('loading')
                this.$refs.registBtn.removeAttribute('disabled')
            }
            xhr.ontimeout = () => {
                this.$refs.registBtn.classList.remove('loading')
                this.$refs.registBtn.removeAttribute('disabled')
            }
            xhr.open('POST', this.registApi, true)
            xhr.send(data)
        },

        /**
         * 检测函数，检测输入
         */
        _testVuleLegle() {
            var regNumber = /\d+/
            var regChar = /[a-zA-Z]+/
            var res = true
            if (this.password.length < 6 || !regNumber.test(this.password) || !regChar.test(this.password)) {
                alert('输入正确格式密码')
                res = false
            }
            if (this.code.length < 4) {
                alert('输入正确格式验证码')
                res = false
            }
            if (!this.checkCellphone(this.phone_number)) {
                alert('输入正确格式手机')
                res = false
            }
            return res
        }
    }
}
</script>

<style scoped>
/*
 * 设置header部分
 */

.regist>header {
    padding-top: 12px;
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #ccc;
}

.regist>header i,
.regist>header h1 {
    display: inline-block;
    font-size: 20px;
    line-height: 36px;
}

.regist>header i {
    font-size: 18px;
    color: #aaa;
}

.regist>header i.fa-chevron-left {
    float: left;
    margin-left: 30px;
}

.regist>header i.fa-times {
    float: right;
    margin-right: 30px;
}

.regist>header h1 {
    color: #1ca2e2;
}

/* 表单样式  */

#regist_form .select {
    margin-top: 7px;
    color: black;
    font-size: 16px;
}

#regist_form .select i {
    vertical-align: text-top;
    margin-left: 6px;
    color: #aaa;
}

#regist_form input {
    padding: 5px;
    border: none;
    outline: none;
    font-size: 18px;
}

#regist_form input::placeholder {
    font-size: 14px;
    color: #ccc;
}


#regist_form p {
    position: relative;
    box-sizing: border-box;
    width: 90%;
    margin: 30px auto;
    padding: 10px;
    color: #aaa;
}

#regist_form p::after {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ccc;
}

#regist_form p:hover::after {
    transition: 0.2s;
    border-top: 1px solid #1ca2e2;
}

#form_code input {
    width: 120px;
}

#form_code span {
    float: right;
    margin-top: 5px;
    padding-left: 8px;
    height: 20px;
    line-height: 18px;
    font-size: 14px;
    color: #aaa;
    border-left: 1px solid #ccc;
}

#form_code .active {
    color: #1ca2e2;
}

#form_registBtn {
    display: block;
    border: none;
    outline: none;
    width: 90%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    margin: 30px auto;
    background: black;
    color: white;
    border-radius: 8px;
    transition: all .2s;
    overflow: hidden;
}

#form_registBtn.loading {
    width: 40px;
    border-radius: 50%;
    color: black;
    animation: rotate 1.2s 0.2s infinite linear;
}

#form_registBtn.loading i {
    display: inline-block;
    box-sizing: border-box;
    margin-top: 7px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 3px solid white;
    border-bottom-color: black;
    transition: all .2s;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg)
    }
    33% {

        transform: rotate(90deg)
    }
    66% {

        transform: rotate(270deg)
    }
    100% {
        transform: rotate(360deg)
    }
}
</style>