<template>
    <div class='regist'>
        <header>
            <i class='fa fa-chevron-left' aria-hidden='true'></i>
            <h1>登录</h1>
            <i class='fa fa-times' aria-hidden='true'></i>
        </header>
        <div id='regist_form'>
            <form action=''>
                <p id='form_phone'>
                    <select name='' id=''>
                        <option value='+86'>+86</option>
                        <option value='+86'>+1</option>
                        <option value='+86'>+6</option>
                        <option value='+86'>+8</option>
                    </select>
                    <input type='number' placeholder='手机号'>
                </p>
                <p id='form_code'>
                    <input type='number' placeholder='验证码'>
                    <span id='check_code'>点击获取验证码</span>
                </p>
                <p id='form_password'>
                    <input type='password' placeholder='密码(不少于6位)'>
                </p>
                <button id='form_registBtn'>注册</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/*
 * 设置header部分
 */

header {
    padding-top: 12px;
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #ccc;
}

header i,
header h1 {
    display: inline-block;
    font-size: 20px;
    line-height: 36px;
}

header i {
    font-size: 18px;
    color: #aaa;
}

header i.fa-chevron-left {
    float: left;
    margin-left: 30px;
}

header i.fa-times {
    float: right;
    margin-right: 30px;
}

header h1 {
    color: #1ca2e2;
}





/*
 *表单样式
 */

#regist_form select {
    border: none;
    outline: none;
}

#regist_form select option {
    border: 1px solid red;
}

#regist_form input {
    padding: 5px;
    border: none;
    outline: none;
}

#regist_form input::placeholder {
    font-size: 14px;
    color: #ccc;
}

#regist_form p {
    box-sizing: border-box;
    width: 90%;
    margin: 30px auto;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    color: #aaa;
}

#form_code input {
    width: 120px;
}

#check_code {
    float: right;
    margin-top: 5px;
    padding-left: 8px;
    line-height: 18px;
    font-size: 14px;
    color: #1ca2e2;
    border-left: 1px solid #ccc;
}

#form_registBtn {
    display: block;
    width: 90%;
    height: 32px;
    margin: 30px auto;
    background: black;
    color: white;
    border: none;
    outline: none;
}
</style>