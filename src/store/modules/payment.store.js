import Cookies from 'js-cookie';

// State object
const state = {
	step: 1,
	details: {},
	currentDetail: {},
	selectedShipment: {},
	selectedPayment: {},
	firstForm: {}
}

// Getter functions
const getters = {

}

// Actions 
const actions = {
	fetchDetails({ commit }, id) {
		let data = Cookies.get('payments')
		if( !data ) Cookies.set('payments', [], { expires: 1 });
		commit('SET_DETAILS', data[id])
	},
	fetchCurrentDetail({commit}) {
		let data = Cookies.get('payment')
		if( !data ) {
			Cookies.set('payment', {}, { expires: 1 });
			commit('SET_CURRENTDETAIL', {})
		}else{
			commit('SET_CURRENTDETAIL', JSON.parse(data))
		}
		
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
	}
}
// Mutations
const mutations = {
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