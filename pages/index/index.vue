<template>
	<view class="container" v-if="src">
		<img :src="src + 'homeBg.png'" class="home-bg"/>
		<view class="main-box">
			<view class="title" :style="{paddingTop: navigationBarHeight + 'px'}">熊猫师父写名字</view>
			<view class="guide-box">
				<view class="head-img">
					<img :src="src + 'home1.gif'" class="img1" mode="widthFix"/>
					<img :src="src + 'banner-bg-1.png'" class="img2" mode="widthFix"/>
				</view>
				<view class="bottom">
					<view class="tips">你的名字怎么写？</view>
					<input placeholder="请输入名字"
						   placeholder-style="color: #E5D2CA;"
						   placeholder-class="placeholder"
						   class="input" v-model="value" :maxlength="6"/>
				</view>
				<view class="watch">
					<img :src="src + 'slogan.png'" class="slogan-img" mode="widthFix"/>
					<view class="link-1" @click="linkHandle">
						<view class="link-3">观看名字视频</view>
						<img src="../../static/img/home-btn.png" class="link-2"/>
					</view>
				</view>

			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		onLoad() {
		},
		onShareAppMessage(res) {
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
		methods: {
			linkHandle () {
				if (this.value.length < 2) {
					uni.showToast({
						title: '请输入2个以上的汉字',
						icon: 'none',
						mask: true
					})
					return
				}
				if (this.value.length > 6) {
					uni.showToast({
						title: '请输入2个以上的汉字',
						icon: 'none',
						mask: true
					})
					return
				}
				let reg= /^[\u4e00-\u9fa5]+$/
				if (!reg.test(this.value)){
					uni.showToast({
						title: '请输入2个以上的汉字',
						icon: 'none',
						mask: true
					})
					return false
				}
				uni.navigateTo({
					url:  `/pages/detail/detail?name=${this.value}`
				})
			}
		},
		computed: {
			navigationBarHeight () {
				return parseInt(this.$store.state.systeminfo.statusBarHeight)
			},
			src () {
				return this.$store.state.imgsrc
			}
		}
	}
</script>

<style lang="scss">
	.link-1{
		position: relative;
	}
	.link-2{
		width: 680rpx;
		display: block;
		margin: 0 auto;
		height: 230rpx;
	}
	.link-3{
		height: 160rpx;
		line-height: 160rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 40rpx;
		font-weight: bold;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
	.home-bg{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.container{
		height: 100vh;
		font-size: 40rpx;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.main-box{
		z-index: 9;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.guide-box{
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
		.guide-block{
			width: 100%;
			position: absolute;
			height: 100%;
			z-index:99;
		}
		.guide-bg{
			width: 100%;
		}
	}
	.head-img{
		margin: 52rpx auto 0;
		position: relative;
		.img2{
			width: 670rpx;
		}
		.img1{
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
	}
	.title{
		text-align: center;
		color: #151515;
		font-weight: bold;
		font-size: 36rpx;
		line-height: 64rpx;
	}
	.bottom{
		padding: 0 40rpx;
		.input{
			box-sizing: border-box;
			border: 4rpx solid #FF9468;
			width: 100%;
			height: 160rpx;
			padding-left: 40rpx;
			border-radius: 20rpx;
			font-size: 40rpx;
			box-shadow:0px 0px 8px 0px rgba(255,233,203,1);
			font-weight: bold;
			color: #2D3C63;
		}
		.tips{
			padding: 40rpx 0;
			color: #2D3C63;
			font-weight: bold;
			font-size: 40rpx;
		}
		.placeholder{
			color: #E5D2CA;
		}
	}
	.watch{
		flex: 1;
		background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(255,226,191,1) 100%);
		padding: 0 40rpx;
		.tip-text{
			text-align: center;
			font-size: 28rpx;
			color:rgba(255,86,16,1);
			margin-bottom: 20rpx;
			background:linear-gradient(180deg,rgba(255,239,218,1) 0%,rgba(255,255,255,1) 100%);
		}
		.watch-btn{
			background:linear-gradient(171deg,rgba(255,142,37,1) 0%,rgba(255,86,16,1) 100%);
			border-radius:160rpx;
			height: 160rpx;
			text-align: center;
			line-height: 160rpx;
			color: #FFFFFF;
			font-size: 40rpx;
			box-shadow: 0rpx 10rpx 25rpx #FF5610;
			font-weight: bold;
		}
		.slogan-img{
			width: 480rpx;
			display: block;
			margin: 60rpx auto 20rpx;
		}
	}
</style>
