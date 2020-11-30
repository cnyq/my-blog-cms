const states = {
	isCollapse: sessionStorage.getItem('isCollapse') ? sessionStorage.getItem('isCollapse') - 0 ? true : false : false,
	breadcrumbList: [],
	keepAliveList: []
}

const mutations = {
	UPDATE_COLLAPSE(state, param) {
		state.isCollapse = param
		let set = param ? 1 : 0
		sessionStorage.setItem('isCollapse', set)
	},
	UPDATE_CRUMB_LIST(state, param) {
		state.breadcrumbList = param
	},
	ADD_KEEP_ALIVE: (state, url) => {
		if (!state.keepAliveList.includes(url)) {
			state.keepAliveList.push(url)
		}
	},
	DEL_KEEP_ALIVE: (state, url) => {
		if (state.keepAliveList.includes(url)) {
			state.keepAliveList.splice(state.keepAliveList.indexOf(url), 1)
		}
	}
}
const actions = {
	updateCollapse({ //左侧菜单是否折叠
		commit
	}, param) {
		commit('UPDATE_COLLAPSE', param)
	},
	updateCrumbList({ //面包屑
		commit
	}, param) {
		commit('UPDATE_CRUMB_LIST', param)
	},
	addKeepAlive({ commit }, url) {
		commit('ADD_KEEP_ALIVE', url)
	},
	delKeepAlive({ commit }, url) {
		commit('DEL_KEEP_ALIVE', url)
	},
}

export default {
	namespaced: true,
	state: states,
	mutations,
	actions
}