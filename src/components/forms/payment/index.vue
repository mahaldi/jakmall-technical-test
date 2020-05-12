<template>
  <div class="payment-form">
		
		<div class="payment-form__category">
			<HeadingForm heading="Shipment"/>
			<div class="payment-form__category-items">
				<div v-for=" (item,idx) in shipments" class="payment-form__category-item" :key="idx">
					<CategoryButton @click="dispatchShipment(item)" :isActive="item.id === shipment" :firstText="item.courier" :secondText="item.cost"/>
				</div>
			</div>
		</div>

		<div class="payment-form__category">
			<HeadingForm heading="Payment"/>
			<div class="payment-form__category-items">
				<div v-for=" (item,idx) in payments"  class="payment-form__category-item" :key="idx">
					<CategoryButton @click="dispatchPayment(item)" :isActive="item.id === payment" :firstText="item.firstText" :secondText="item.secondText"/>
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
		currentDetail: {
			type: Object
		}
	},
	data() {
		return {
			shipments: [
				{ id: 0, courier: 'GO-SEND', cost: 15000, days: 'today' },
				{ id: 1, courier: 'JNE', cost: 9000, days: '2 days' },
				{ id: 2, courier: 'Personal Courier', cost: 29000, days: '1 day' }
			],

			payments: [
				{ id: 0, firstText: 'e-Wallet', secondText: 1500000 },
				{ id: 1, firstText: 'Bank Transfer', secondText: '' },
				{ id: 2, firstText: 'Virtual Account', secondText: '' }
			],
			shipment: 0,
			payment: 0
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
		setCookies() {
			let payload = {
				shipment: this.detailSelected('shipments', this.shipment),
				payment: this.detailSelected('payments', this.payment)
			}
			let payment = JSON.parse(Cookies.get('payment'))
			payment.form2 = payload
			Cookies.set('payment', payment)
			this.$store.dispatch('payment/setCurrentDetail', payment)
		},
		onSubmit() {
			return {
				isValid : true
			}
		},
		async dispatchShipment(val) {
			this.shipment = val.id
			this.setCookies()
		},
		async dispatchPayment(val) {
			this.payment = val.id
			this.setCookies()
		}
	},
	mounted() {
		if( this.currentDetail.shipment ) {
			this.shipment = this.currentDetail.shipment.id
			this.payment = this.currentDetail.payment.id
			this.setCookies()
		}else {
			this.setCookies()
		}
	}
};
</script>
<style lang="scss" src="./style.scss" scoped />