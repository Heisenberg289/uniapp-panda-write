const basicUrl = 'https://online.xiongmaolaoshi.com/'
// const basicUrl = 'https://pandatest.junxing-tech.com/'
import store from '../store'
const util = {
	//封装网络请求
	request(url, data, method = 'GET') {
		const baseUrl = store.getters.getBaseUrl
		return new Promise((resolev, reject) => {
			uni.request({
				url: `${baseUrl || basicUrl}${url}`,
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
	wordQuery(data) {
		return util.request('name/character/query/', data, 'POST')
	},
	getAdress(data) {
		return util.request('home/address/', data, 'POST')
	}
}
