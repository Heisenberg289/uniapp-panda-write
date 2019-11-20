<template>
    <view  class="container" v-if="src">
        <view class="head" :style="{paddingTop: navigationBarHeight + 'px'}">
            <img :src="src + 'return.png'" class="return" @click="back"/>
            <view class="title">熊猫老师写名字</view>
            <view></view>
        </view>
        <view class="play-box">
            <view class="block">
                <template v-if="isPlay">
                    <video :src="videoSrc" controls="controls" class="video-block" id="video" :autoplay="true"></video>
                </template>
                <template v-else>
                    <template v-if="isEverywordExist(nameList)">
                        <template v-if="!locked || activeIndex === 0">
                            <img :src="src + 'bg.png'" class="forbid-play"/>
                            <view class="learn" @click="startPlay">开始学习</view>
                        </template>
                        <template v-else>
                            <img :src="src + 'bg.png'" class="forbid-play"/>
                            <view class="tips">分享到微信群，可立即观看剩下所有视频哦~</view>
                            <button class="share" open-type="share">分享后解锁</button>
                        </template>
                    </template>
                    <template v-else>
                        <template v-if="videoSrc">
                            <img :src="src + 'bg.png'" class="forbid-play"/>
                            <view class="learn" @click="startPlay">开始学习</view>
                        </template>
                        <template v-else>
                            <img :src="src + 'bg.png'" class="forbid-play"/>
                            <view class="tips">暂时没有该字的书写视频哦 ~</view>
                            <button class="share concat" open-type="contact">联系老师 免费领取</button>
                        </template>
                    </template>
                </template>



            </view>
        </view>
        <view class="text-box">
            <template v-for="(item, index) in nameList" >
                <template v-if="isEverywordExist(nameList)">
                    <view class="text-list " v-if="item.value" @click="changeActive(index)">
                        <img :src="src + 'icon7.png'" class="img1" v-if="activeIndex === index"/>
                        <img :src="src + 'icon5.png'" class="img1" v-else/>
                        <img :src="src + 'icon3.png'" class="img2" v-if="locked && activeIndex !== index"/>
                        <img :src="src + 'icon2.png'" class="img2" v-else/>
                        <view class="text-1">{{item.label}}</view>
                    </view>
                </template>
                <template  v-else>
                    <view class="text-list" :key="index" :class="{'disabled': !item.value}" @click="changeActive(index)">
                        <img :src="src + 'icon7.png'" class="img1" v-if="activeIndex === index"/>
                        <img :src="src + 'icon5.png'" class="img1" v-else-if="activeIndex !== index && item.value"/>
                        <img :src="src + 'icon6.png'" class="img1" v-else/>
                        <img :src="src + 'icon2.png'" class="img2" v-if="item.value"/>
                        <img :src="src + 'icon4.png'" class="img2" v-else/>
                        <view class="text-1">{{item.label}}</view>
                    </view>
                </template>
            </template>


        </view>
        <view class="btn-box">
            <button  class="btn-list" open-type="contact">
                <img :src="src + 'btn1.png'"/>
                <text class="btn-text">0元学写字</text>
            </button>
            <button class="btn-list" open-type="share">
                <img :src="src + 'btn2.png'"/>
                <text class="btn-text">邀好友写名字</text>
            </button>
        </view>
        <view class="student-box">
            <img :src="src + 'students.png'"/>
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
                nameList: [],
                activeIndex: 0,
                locked: true,
                isPlay: false
            }
        },
        computed: {
            navigationBarHeight () {
                return parseInt(this.$store.state.systeminfo.statusBarHeight)
            },
            videoSrc() {
                let temp = this.nameList[this.activeIndex]
                return temp? temp.value : ''
            },
            src () {
                return this.$store.state.imgsrc
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
                    this.locked= false
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
            startPlay () {
                this.isPlay = true
                this.$nextTick(() =>  {
                    // let video = document.getElementById("video")
                    // console.log(document.getElementById('video'))
                    // video.play()
                })
            },
            changeActive (i) {
                this.activeIndex = i
                this.isPlay = false
            },
            isEverywordExist (list) {
                return list.every(v => v.value)
            },
            getNameInfo (option) {
                if (!option.name) {
                    return
                }
                api.wordQuery({name: option.name}).then(res => {
                    let result = res.data.result
                    let list = option.name.split('')
                    this.nameList = list.map(v => {
                        let obj = {label: v, value: result[v]}
                        return obj
                    })
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
    .video-block{
        width: 100%;
        height: 100%;
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
        .concat{
            width: 360rpx;
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
