<template>
  <div class="payment">
    <div class="payment__box">
			<div class="payment__stepper-section">
				<Stepper :step="step"/>
			</div>
			<div class="payment__form-section">
				<div class="payment__back" @click="step -= 1">
          <i class="payment__back-icon icon-left"></i>
          <p class="jakmall-text jakmall-text--medium jakmall-text--blackOpt60">Back to cart</p>
        </div>
        <DeliveryDetails v-show="step === 1"/>
        <PaymentForm v-show="step === 2"/>
			</div>
      <div class="payment__divider"></div>
			<div class="payment__summary-section">
				<PaymentSummary @submit="onSubmit"/>
			</div>
    </div>
  </div>
</template>
<script>
import PaymentSummary from "@/components/summary";
import Stepper from "@/components/stepper";
import DeliveryDetails from '@/components/forms/delivery-details'
import PaymentForm from '@/components/forms/payment'

export default {
  name: "Payment",
  components: {
    PaymentSummary,
    Stepper,
    DeliveryDetails,
    PaymentForm
  },
  data() {
    return {
      step: 1
    }
  },
  methods: {
    onSubmit() {
      this.step += 1
    }
  }
};
</script>
<style lang="scss" src="./style.scss" scoped />