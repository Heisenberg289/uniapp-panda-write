<template>
    <view  class="container" v-if="src">
        <view class="head" :style="{paddingTop: navigationBarHeight + 'px'}">
            <img :src="src + 'return.png'" class="return" @click="back"/>
            <view class="title">添加老师</view>
            <view></view>
        </view>
        <view class="content">
            <img src="../../static/img/lingqu.png" class="bg"/>
            <view class="cover">
                <view class="text text-1">领取成功</view>
                <view class="text text-2">请添加老师微信，老师将优先为孩子书写姓名</view>
                <view class="saoma-box">
                    <img src="../../static/img/saoma.png" class="saoma-bg"/>
                    <view class="cover" style="padding-top: 128rpx;">
                        <view class="erwma"></view>
                        <view class="text text-3">长按二维码添加专属老师</view>
                        <view class="text text-4">名额有限 30分钟内添加有效</view>
                    </view>

                </view>
            </view>

        </view>
    </view>
</template>

<script>
    import api from '../../public/api'
    export default {
        name: "detail",
        data () {
            return {
            }
        },
        computed: {
            navigationBarHeight () {
                return parseInt(this.$store.state.systeminfo.statusBarHeight)
            },
            src () {
                return this.$store.state.imgsrc
            }
        },
        onShareAppMessage(res) {
            this.readyShare = true
            return {
                title: '熊猫老师写名字',
                path: '/pages/index/index',
                // imageUrl: `https://cdn.xiongmaolaoshi.com/1.7/${random}.png`,
                success: function(res) {
                    console.log("转发回调", res)
                },
                fail: function(res) {
                    console.log("失败")
                }
            }
        },
        onShow: function() {
        },
        methods: {
        },
        onLoad: function(option) {
        }
    }
</script>

<style scoped lang="scss">
    .cover{
        z-index: 2;
        position: relative;
    }
    .container{
        height: 100vh;
        font-size: 40rpx;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .head{
        height: 90rpx;
        z-index: 9;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .return{
            width: 24rpx;
            height: 42rpx;
            margin-left: 28rpx;
        }
        .title{
            text-align: center;
            color: #151515;
            font-size: 36rpx;
        }
    }
    .content{
        flex: 1;
        position: relative;
        .bg{
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .saoma-box{
            position: relative;
            width: 670rpx;
            height: 688rpx;
            margin: 0 auto;
            .saoma-bg{
                position: absolute;
                width: 100%;
                height: 100%;
            }
            .erwma{
                display: block;
                width: 296rpx;
                height: 296rpx;
                margin: 0 auto;
                box-sizing: content-box;
            }
        }
    }
    .text{
        line-height: 1;
        text-align: center;
    }
    .text-1{
        font-size: 68rpx;
        font-weight: bold;
        margin: 152rpx auto 40rpx;
        color: #fff;
    }
    .text-2{
        color: #FFF316;
        font-size: 32rpx;
        margin-bottom: 48rpx;
    }
    .text-3{
        margin: 88rpx auto 24rpx;
        color: #2D3C63;
        font-size: 40rpx;
        font-weight: bold;
    }
    .text-4{
        font-size: 40rpx;
        color: #FA540F;
        font-weight: bold;
    }


</style>
