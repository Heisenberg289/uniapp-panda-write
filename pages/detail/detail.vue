<template>
<view  class="container">
    <view class="head" :style="{paddingTop: navigationBarHeight + 'px'}">
        <img src="../../static/img/return.png" class="return" @click="back"/>
        <view class="title">熊猫老师写名字</view>
        <view></view>
    </view>
    <view class="play-box">
        <view class="block">
            <img src="../../static/img/bg.png" class="forbid-play"/>
<!--            <view class="learn">开始学习</view>-->
            <view class="tips">分享到微信群，可立即观看剩下所有视频哦~</view>
            <button class="share" open-type="share">分享后解锁</button>
        </view>
    </view>

    <view class="text-box">

        <template v-for="(item, index) in nameList" >
            <view class="text-list" :key="index">
                <img src="../../static/img/icon5.png" class="img1"/>
                <img src="../../static/img/icon2.png" class="img2"/>
                <view class="text-1">{{item.name}}</view>
            </view>
        </template>

<!--        <view class="text-list">-->
<!--            <img src="../../static/img/icon5.png" class="img1"/>-->
<!--            <img src="../../static/img/icon2.png" class="img2"/>-->
<!--            <view class="text-1">古</view>-->
<!--        </view>-->

<!--        <view class="text-list disabled">-->
<!--            <img src="../../static/img/icon6.png" class="img1"/>-->
<!--            <img src="../../static/img/icon4.png" class="img2"/>-->
<!--            <view class="text-1">古</view>-->
<!--        </view>-->

<!--        <view class="text-list locked">-->
<!--            <img src="../../static/img/icon6.png" class="img1"/>-->
<!--            <img src="../../static/img/icon3.png" class="img2"/>-->
<!--            <view class="text-1">古</view>-->
<!--        </view>-->

<!--        <view class="text-list active">-->
<!--            <img src="../../static/img/icon7.png" class="img1"/>-->
<!--            <img src="../../static/img/icon3.png" class="img2"/>-->
<!--            <view class="text-1">古</view>-->
<!--        </view>-->

    </view>

    <view class="btn-box">
        <button open-type="contact" class="btn-list">
            <img src="../../static/img/btn1.png"/>
            <text class="btn-text">0元学写字</text>
        </button>
<!--        <view class="btn-list">-->
<!--            <img src="../../static/img/btn1.png"/>-->
<!--            <text class="btn-text">0元学写字</text>-->
<!--        </view>-->
        <view class="btn-list">
            <img src="../../static/img/btn2.png"/>
            <text class="btn-text">邀好友写名字</text>
        </view>
    </view>

    <view class="student-box">
        <img src="../../static/img/students.png"/>
        <text>已有134312人跟着熊猫老师学写字</text>
    </view>
</view>
</template>

<script>
    import api from '../../public/api'
    export default {
        name: "detail",
        data () {
            return {
                nameList: []
            }
        },
        computed: {
            navigationBarHeight () {
                return parseInt(this.$store.state.systeminfo.statusBarHeight)
            }
        },
        onShareAppMessage(res) {
            return {
                title: '熊猫老师写名字',
                path: '/pages/index/index',
                // imageUrl: `https://cdn.xiongmaolaoshi.com/1.7/${random}.png`,
                success: function(res) {
                    uni.showToast({
                        title: '解锁成功',
                        image: '../../static/img/icon1.png',
                        icon: 'none',
                        mask: true
                    })
                    console.log("转发回调", res)
                    // 转发成功
                    // 如果这里有 shareTickets，则说明是分享到群的
                },
                fail: function(res) {
                    console.log("失败")
                }
            }
        },
        methods: {
            getNameInfo (option) {
                if (!option.name) {
                    return
                }
                api.wordQuery({name: option.name}).then(res => {
                    console.log(res)
                })
            },
            back () {
                uni.navigateBack()
            }
        },
        onLoad: function(option) {
            this.getNameInfo(option)
        }
    }
</script>

<style scoped lang="scss">
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
    .play-box{
        height: 422rpx;
    }
    .block{
        width: 100%;
        height: 100%;
        position: relative;
        .forbid-play{
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        .learn{
            position: absolute;
            width: 286rpx;
            height: 100rpx;
            font-size: 32rpx;
            color: #fff;
            border: 2rpx solid #fff;
            border-radius: 100rpx;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .share{
            position: absolute;
            width: 286rpx;
            height: 100rpx;
            font-size: 32rpx;
            color: #fff;
            border-radius: 100rpx;
            background:linear-gradient(90deg,rgba(255,132,0,1) 0%,rgba(255,99,35,1) 100%);
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .tips{
            color: #fff;
            font-size: 32rpx;
            position: absolute;
            top: 90rpx;
            left: 50%;
            width: 100%;
            text-align: center;
            transform: translateX(-50%);
        }
    }
    .text-box{
        display: flex;
        padding: 52rpx 12rpx 96rpx;
        flex-wrap: wrap;
        position: relative;
        .text-list{
            margin: 0 6% 32rpx;
            height: 0;
            position: relative;
            width: 21.3%;
            padding-bottom: 21.3%;
            color: #151515;
            font-size: 108rpx;
            .img1{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
            .img2{
                position: absolute;
                width: 40rpx;
                height: 40rpx;
                right: -20rpx;
                top: -20rpx;
            }
            .text-1{
                z-index: 9;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .disabled{
            color: #CCCCCC;
        }
        .locked{}
        .active{
            box-shadow: 0 0 10rpx rgba(255,86,16,1);
        }
    }
    .btn-box{
        /*padding: 0 40rpx;*/
        display: flex;
        justify-content: space-between;
        .btn-list{
            height: 156rpx;
            flex: 1;
            color: #FFFFFF;
            font-size: 40rpx;
            border: none;
            background-color: #fff;
            font-weight: bold;
            line-height: 100rpx;
            text-align: center;
            position: relative;
            .btn-text{
                z-index: 9;
                position: relative;
            }
            &>img{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
    .student-box{
        font-size: 28rpx;
        color: #8B8B8B;
        display: flex;
        align-items: center;
        justify-content: center;
        &>img{
            height: 40rpx;
            width: 91rpx;
            margin-right: 10rpx;
        }
    }

</style>
