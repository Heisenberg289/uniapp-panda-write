// const baseUrl = 'https://online.xiongmaolaoshi.com/'
const baseUrl = 'https://pandatest.junxing-tech.com/'
const util = {
	//封装网络请求
	request(url, data, method = 'GET') {
		return new Promise((resolev, reject) => {
			uni.request({
				url: `${baseUrl}${url}`,
				data: data,
				method: method,
				header: {
					'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				success: function(res) {
					resolev(res)
				},
				fail: function(res) {
					reject(res)
				}
			});
		})
	},
};
export default {
	/* --------------用户相关------------- */
	// uni登录
	// login(config) {
	// 	return new Promise((resolev, reject) => {
	// 		uni.login({
	// 			provider: config.provider,
	// 			success: resolev,
	// 			fail: reject
	// 		})
	// 	})
	// },
	wordQuery(data) {
		return util.request('name/character/query/', data, 'POST')
	}
}
