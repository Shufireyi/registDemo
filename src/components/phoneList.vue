<template>
    <div class="phone_list">
        <header>
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            <h3>选择国家和地区</h3>
        </header>
        <ul>
            <li v-for="(item , index) in prefixList" :key="index">{{ item.countryName }}
                <span>+ {{ item.phoneCode }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import prefixArray from '../../static/js/getPhonePrefix'
export default {
    data() {
        return {
            prefixList: []
        }
    },
    methods: {
    },
    mounted: function() {
        this.prefixList = prefixArray
    }
}
</script>

<style scoped>
/* fixed 全屏 */

.phone_list {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background-color: white;
}


/* 头部样式 */

header {
    height: 50px;
    border-bottom: 1px solid #ccc;
    text-align: center;
}

header i,
header h3 {
    display: inline-block;
}

header i {
    float: left;
    margin-left: 10px;
    line-height: 50px;
    font-size: 24px;
}

header h3 {
    font-size: 18px;
    line-height: 50px;
}

li {
    display: block;
    margin: 0 auto;
    padding: 5px;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
    width: 90%;
    color: #555;
    text-indent: 10px;
}

li::after {
    content: '';
    display: block;
    width: 100%;
    border-top: 1px solid #ccc;
}

li:last-child::after {
    display: none;
}

li>span {
    float: right;
    margin-right: 20px;
    font-size: 14px;
}
</style>