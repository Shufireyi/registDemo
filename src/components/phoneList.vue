<template>
    <transition name="moveIn">
        <div class="phone_list" v-show="showFlag">
            <header>
                <i class="fa fa-chevron-left" aria-hidden="true" @click="hideList"></i>
                <h3>选择国家和地区</h3>
            </header>
            <div id="phone_list_wrapper" ref="prefixList">
                <ul id="phone_list_content" @click="selectItem">
                    <li v-for="(item , index) in prefixList" :key="index">{{ item.countryName }}
                        <span>+{{ item.phoneCode }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
import prefixArray from '../../static/js/getPhonePrefix'
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            // 前缀数组
            prefixList: [],
            // 是否显示
            showFlag: false
        }
    },
    methods: {
        // 父组件调用，显示prefixList
        showList() {
            this.showFlag = true
            // 在dom更新完成后，计算list高度
            // 新建或更新BScroll
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.prefixList, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
        },
        // 隐藏list
        hideList() {
            this.showFlag = false
        },
        // 点击i,将i返回给父组件
        selectItem(event) {
            // 是否是better-scroll触发的事件
            // 不是直接返回
            if (!event._constructed) {
                return
            }
            // 触发selectPrefix事件 父组件监听
            this.$emit('selectPrefix', event.target)
            // 选择后，同时隐藏list
            this.hideList()
        }
    },
    created: function() {
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
    transition: all .4s
}


/* 简单左移动画 */

.moveIn-enter,
.moveIn-leave-active {
    left: 100%;
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




/* 列表样式 */

#phone_list_wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow: hidden;
}

li {
    margin: 0 auto;
    padding: 5px 5px 0 5px;
    height: 42px;
    font-size: 16px;
    line-height: 42px;
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