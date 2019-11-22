<template>
    <view  class="container" v-if="src">

        <view class="guide-container" v-if="showGetVideoTip || showGetLessonTip">
            <view class="cover-0">
                <img :src="src + 'guide-top.png'" class="top" :style="{top: navigationBarHeight + 'px'}" mode="widthFix"/>
                <img :src="src + 'guide-bottom.png'" class="bottom" mode="widthFix"/>
            </view>
            <view class="cover-1" v-if="showGetLessonTip">
                <img :src="src + 'get-lesson.png'" class="cover-3" mode="widthFix"/>
                <button  @click="cancel"
                         class="cover-2"
                         hover-class="none"
                         open-type="contact"
                         send-message-title="班主任老师:"
                         :show-message-card="true"
                         send-message-path="../index/index?key=bz"
                         :send-message-img="`${src}getLesson.png`"
                >

                    <img :src="src + 'knowBtn.png'"  mode="widthFix"/>
                </button>
            </view>
            <view class="cover-1" v-if="showGetVideoTip">
                <img :src="src + 'get-video.png'" class="cover-3" mode="widthFix"/>
                <button  @click="cancel"
                         class="cover-2"
                         hover-class="none"
                         open-type="contact"
                         send-message-title="书法老师:"
                         :show-message-card="true"
                         send-message-path="../index/index?key=sf"
                         :send-message-img="`${src}getVideo.png`"
                >
                    <img :src="src + 'knowBtn.png'" mode="widthFix"/>
                </button>
            </view>
        </view>

        <view class="head" :style="{paddingTop: navigationBarHeight + 'px'}">
            <view class="return" @click="back">
                <img :src="src + 'return.png'" mode="widthFix" />
            </view>

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
                            <button @click="getVideo" class="share concat">联系老师 免费领取</button>
                        </template>
                    </template>
                </template>



            </view>
        </view>
        <view class="text-box">
            <template v-for="(item, index) in nameList" >
                <template v-if="isEverywordExist(nameList)">
                    <view class="text-list " :key="index"  @click="changeActive(index)" :class="{'text-active': activeIndex === index}">
                        <img :src="src + 'icon7.png'" class="img1" v-if="activeIndex === index"/>
                        <img :src="src + 'icon5.png'" class="img1" v-else/>
                        <img :src="src + 'icon3.png'" class="img2" v-if="locked && index !== 0"/>
                        <img :src="src + 'icon2.png'" class="img2" v-else/>
                        <view class="text-1">{{item.label}}</view>
                    </view>
                </template>
                <template  v-else>
                    <view class="text-list" :key="index" :class="{'disabled': !item.value, 'text-active': activeIndex === index}" @click="changeActive(index)">
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
            <button  class="btn-list" @click="getLesson">
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
                isPlay: false,
                readyShare: false,
                showGetVideoTip: false,
                showGetLessonTip: false
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
            this.readyShare = true
            const title = ['孩子名字写的歪歪扭扭，熊猫老师教你名字变好看！', '孩子名字写的歪歪扭扭， 专业名师免费教你写名字>>']
            return {
                title: title[Math.floor(Math.random() + 0.5)],
                path: '/pages/index/index',
                imageUrl: this.src + `invite.png`,
                success: function(res) {
                    console.log("转发回调", res)
                },
                fail: function(res) {
                    console.log("失败")
                }
            }
        },
        onShow: function() {
            if (this.readyShare) {
                if (this.locked) {
                    uni.showToast({
                        title: '解锁成功',
                        image: '../../static/img/icon1.png',
                        icon: 'none',
                        mask: true
                    })
                    this.locked = false
                }

            }
            this.readyShare = false
        },
        methods: {
            getLesson () {
                this.showGetLessonTip = true
            },
            getVideo () {
                this.showGetVideoTip = true
            },
            cancel () {
                this.showGetLessonTip = false
                this.showGetVideoTip = false
            },
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
                let reg= /^[\u4e00-\u9fa5]+$/
                if (!reg.test(option.name)){
                    return false
                }
                api.wordQuery({name: option.name}).then(res => {
                    let result = res.data.result
                    let list = option.name.split('')
                    this.nameList = list.map(v => {
                        let obj = {label: v, value: result[v]}
                        return obj
                    })
                    if (!this.isEverywordExist(this.nameList)) {
                        this.locked = false
                    }
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
    .guide-container{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background-color: #fff;
        .cover-0{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            .top{
                position: absolute;
                width: 100%;
            }
            .bottom{
                position: absolute;
                width: 100%;
                bottom: 0;
            }
        }
        .cover-1{
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
        }
        .cover-2{
            position: absolute;
            width: 200rpx;
            left: 180rpx;
            bottom: 310rpx;
            &>img{
                width: 100%;
                height: 100%;
            }
        }
        .cover-3{
            right: 0;
            bottom: 160rpx;
            position: absolute;
        }
        .guide-bg{
            width: 100%;
            height: 100%;
            position: absolute;
        }
        .guide-button{            position: absolute;
            z-index: 9;
        }
    }
    .text-active{
        box-shadow: 0 0 10rpx #FF8400;
    }
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
            padding: 24rpx 28rpx;
            &>img{
                width: 100%;
                height: 100%;
            }
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
        padding: 60rpx 40rpx 36rpx;
        flex-wrap: wrap;
        position: relative;
        .text-list{
            margin: 0 6% 40rpx;
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
                right: -10rpx;
                top: -10rpx;
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
