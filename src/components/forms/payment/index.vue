<template>
  <div class="payment-form">
		
		<div class="payment-form__category">
			<HeadingForm heading="Shipment"/>
			<div class="payment-form__category-items">
				<div v-for=" (item,idx) in shipments" class="payment-form__category-item" :key="idx">
					<CategoryButton @click="selectedShipment = item.id" :isActive="item.id === selectedShipment" :firstText="item.courier" :secondText="item.cost"/>
				</div>
			</div>
		</div>

		<div class="payment-form__category">
			<HeadingForm heading="Payment"/>
			<div class="payment-form__category-items">
				<div v-for=" (item,idx) in payments"  class="payment-form__category-item" :key="idx">
					<CategoryButton @click="selectedPayment = item.id" :isActive="item.id === selectedPayment" :firstText="item.firstText" :secondText="item.secondText"/>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
import HeadingForm from '@/components/forms/heading-form'
import CategoryButton from '@/components/forms/payment/category-button'

export default {
	data() {
		return {
			selectedShipment: null,
			shipments: [
				{ id: 0, courier: 'GO-SEND', cost: '15,000' },
				{ id: 1, courier: 'JNE', cost: '9,000' },
				{ id: 2, courier: 'Personal Courier', cost: '29,000' }
			],

			selectedPayment: null,
			payments: [
				{ id: 0, firstText: 'e-Wallet', secondText: '1,500,000 left' },
				{ id: 1, firstText: 'Bank Transfer', secondText: '' },
				{ id: 2, firstText: 'Virtual Account', secondText: '' }
			]
		}
	},
	components: {
		HeadingForm,
		CategoryButton
	}
};
</script>
<style lang="scss" src="./style.scss" scoped />