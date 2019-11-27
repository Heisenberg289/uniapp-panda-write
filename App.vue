<script>
    import api from './public/api'
	export default {
		onLaunch: function() {
            const params = {
                type: 3,
                versions: 1.0
            }
            api.getAdress(params).then(res => {
                if (res.statusCode === 200) {
                    this.$store.commit('setBaseurl', res.data.result.addr)
                }
            })
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
