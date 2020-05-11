<template>
  <div class="payment-form">
		
		<div class="payment-form__category">
			<HeadingForm heading="Shipment"/>
			<div class="payment-form__category-items">
				<div v-for=" (item,idx) in shipments" class="payment-form__category-item" :key="idx">
					<CategoryButton @click="dispatchShipment(item)" :isActive="item.id === selectedShipment.id" :firstText="item.courier" :secondText="item.cost"/>
				</div>
			</div>
		</div>

		<div class="payment-form__category">
			<HeadingForm heading="Payment"/>
			<div class="payment-form__category-items">
				<div v-for=" (item,idx) in payments"  class="payment-form__category-item" :key="idx">
					<CategoryButton @click="dispatchPayment(item)" :isActive="item.id === selectedPayment.id" :firstText="item.firstText" :secondText="item.secondText"/>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
import HeadingForm from '@/components/forms/heading-form'
import CategoryButton from '@/components/forms/payment/category-button'
import Cookies from 'js-cookie'

export default {
	props: {
		selectedPayment: {
			type: Object
		},
		selectedShipment: {
			type: Object
		}
	},
	data() {
		return {
			shipments: [
				{ id: 0, courier: 'GO-SEND', cost: '15,000', days: 'today' },
				{ id: 1, courier: 'JNE', cost: '9,000', days: '2 days' },
				{ id: 2, courier: 'Personal Courier', cost: '29,000', days: '1 day' }
			],

			payments: [
				{ id: 0, firstText: 'e-Wallet', secondText: '1,500,000 left' },
				{ id: 1, firstText: 'Bank Transfer', secondText: '' },
				{ id: 2, firstText: 'Virtual Account', secondText: '' }
			],

		}
	},
	components: {
		HeadingForm,
		CategoryButton
	},
	methods: {
		detailSelected(val , id) {
			for(let i = 0; i < this[val].length ;i++){
				if( id === this[val][i].id )
					return this[val][i]
			}
		},
		onSubmit() {
			let payload = {
				shipment: this.selectedShipment,
				payment: this.selectedPayment
			}
			let payment = JSON.parse(Cookies.get('payment'))
			payment.form2 = {
				payload
			}
			Cookies.set('payment', payment)
			return {
				isValid : this.selectedPayment !== null && this.selectedShipment !== null
			}
		},
		dispatchShipment(val) {
			this.$store.dispatch('payment/setSelectedShipment', val)
		},
		dispatchPayment(val) {
			this.$store.dispatch('payment/setSelectedPayment', val)
		}
	},
	mounted() {
		let prefferedSelected = {
			shipment: 0,
			payment: 0
		}
		this.dispatchShipment(this.shipments[prefferedSelected.shipment])
		this.dispatchPayment(this.payments[prefferedSelected.payment])
	}
};
</script>
<style lang="scss" src="./style.scss" scoped />