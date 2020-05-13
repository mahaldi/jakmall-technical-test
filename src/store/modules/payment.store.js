import Cookies from 'js-cookie';

// State object
const state = {
	step: 1,
	details: {},
	currentDetail: {},
	selectedShipment: {},
	selectedPayment: {},
	firstForm: {},
	wallet: 1500000,
	item: {
		qty: 10,
		total: 500000
	}
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
	fetchDetails({ commit }, id) {
		let data = JSON.parse(Cookies.get('payments'))
		for(let i = 0 ; i < data.length; i++){
			if(data[i].id === id) {
				commit('SET_CURRENTDETAIL', data[i])
			}
		}
		
	},
	fetchCurrentDetail({commit}) {
		let data = Cookies.get('payment')
		let payments = Cookies.get('payments')
		if( !payments ) Cookies.set('payments', [], { expires: 1 });
		
		if( !data ) {
			Cookies.set('payment', {}, { expires: 1 });
			commit('SET_CURRENTDETAIL', {})
		}else{
			commit('SET_CURRENTDETAIL', JSON.parse(data))
		}
		
	},
	fetchItem({commit}){
		let cookie = Cookies.get('item')
		if(!cookie) Cookies.set('item', {qty: 10, total: 500000}, { expires: 1 })
		let total = JSON.parse(Cookies.get('item'))
		commit('SET_ITEM', total)
	},
	setSelectedShipment({commit}, data) {
		commit('SET_SELECTED_SHIPMENT', data)
	},
	setSelectedPayment({commit}, data) {
		commit('SET_SELECTED_PAYMENT', data)
	},
	setFirstForm({commit}, data) {
		commit('SET_FIRST_FORM', data)
	},
	setStep({commit}, data) {
		commit('SET_STEP', data)
	},
	setCurrentDetail({commit}, data) {
		commit('SET_CURRENTDETAIL', data)
	},
	setItem({commit}, data) {
		commit('SET_ITEM', data)
	}
}
// Mutations
const mutations = {
	SET_ITEM(state, data) {
		state.item = data
	},
	SET_FIRST_FORM(state, data) {
		state.firstForm = data
	},
	SET_SELECTED_PAYMENT(state, data) {
		state.selectedPayment = data
	},
	SET_SELECTED_SHIPMENT(state, data) {
		state.selectedShipment = data
	},
	SET_STEP(state, data) {
		state.step = data;
	},
	SET_DETAILS(state, data) {
		state.details = data
	},
	SET_CURRENTDETAIL(state, data) {
		state.currentDetail = data
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}