<template>
	<div class="payment-finish">
		<div class="payment-finish__heading">
			<HeadingForm heading="Thank you"/>
		</div>
		<div class="payment-finish__content">
			<p class="jakmall-text">Order ID : XXKYB</p>
			<p class="jakmall-text jakmall-text--blackOpt60">Your order will be delivered today with GO-SEND</p>
		</div>
		<div class="payment-finish__back">
			<BackFormButton />
		</div>
	</div>
</template>
<script>
import HeadingForm from '@/components/forms/heading-form'
import BackFormButton from '@/components/buttons/back-form'

export default {
  components: {
		HeadingForm,
		BackFormButton
	}
}
</script>
<style lang="scss" src="./style.scss" scoped />