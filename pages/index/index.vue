<template>
	<view class="container">
		<img src="../../static/img/homeBg.png" class="home-bg"/>
		<view class="head" :style="{paddingTop: navigationBarHeight + 'px'}">
			<view class="title">熊猫老师写名字</view>
			<view class="head-img">
				<img src="../../static/img/home1.gif" class="img1 img2"/>
				<img src="../../static/img/home2.png" class="img1"/>
			</view>
		</view>

		<view class="bottom">
			<view class="tips">写名字</view>
			<input placeholder="请输入名字"	placeholder-class="placeholder"	class="input" v-model="value"/>
		</view>

		<view class="watch">
			<img src="../../static/img/slogan.png" class="slogan-img"/>
			<button class="watch-btn" @click="linkHandle">
				<text>观看我的名字视频</text>
			</button>
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
			return {
				title: '熊猫老师写名字',
				path: '/pages/index/index',
				// imageUrl: `https://cdn.xiongmaolaoshi.com/1.7/${random}.png`,
				success: function(res) {
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
			linkHandle () {
				if (this.value.length < 2) {
					uni.showToast({
						title: '请输入2个以上的汉字~',
						icon: 'none',
						mask: true
					})
					return
				}
				if (this.value.length > 6) {
					uni.showToast({
						title: '请输入6个以内的汉字~',
						icon: 'none',
						mask: true
					})
					return
				}
				let reg= /^[\u4e00-\u9fa5]+$/
				if (!reg.test(this.value)){
					uni.showToast({
						title: '不全是中文~',
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
			}
		}
	}
</script>

<style lang="scss">
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
	.head{
		/*height: 568rpx;*/
		z-index: 9;
		.head-img{
			width: 670rpx;
			height: 380rpx;
			margin: 52rpx auto 0;
			position: relative;
			.img1{
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index:9;
			}
			.img2{
				z-index: 99;
			}
		}
		.title{
			text-align: center;
			color: #151515;
			font-size: 36rpx;
			padding: 14rpx 0;
		}
	}
	.bottom{
		z-index: 9;
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
		z-index: 9;
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
		}
		.slogan-img{
			height: 28rpx;
			width: 384rpx;
			display: block;
			margin: 60rpx auto 20rpx;
		}
	}
</style>
