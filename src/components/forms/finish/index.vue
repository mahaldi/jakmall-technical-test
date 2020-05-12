<template>
	<div class="payment-finish">
		<div class="payment-finish__heading">
			<HeadingForm heading="Thank you"/>
		</div>
		<div class="payment-finish__content">
			<p class="jakmall-text">Order ID : {{ $route.params.id }}</p>
			<p class="jakmall-text jakmall-text--blackOpt60">Your order will be delivered today with {{ currentDetail.shipment.courier }}</p>
		</div>
		<a class="payment-finish__back" href="/payment?step=1">
			<BackFormButton text="Go to homepage"/>
		</a>
	</div>
</template>
<script>
import HeadingForm from '@/components/forms/heading-form'
import BackFormButton from '@/components/buttons/back-form'

export default {
	props: {
		currentDetail: {
			type: Object
		}
	},
  components: {
		HeadingForm,
		BackFormButton
	}
}
</script>
<style lang="scss" src="./style.scss" scoped />