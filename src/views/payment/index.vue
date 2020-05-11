<template>
  <div class="payment">
    <div class="payment__box">
			<div class="payment__stepper-section">
				<Stepper :step="step" />
			</div>
			<div class="payment__form-section">
        <BackFormButton @click="step -= 1" :text="backBtnText"/>
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
import BackFormButton from '@/components/buttons/back-form'

export default {
  name: "Payment",
  components: {
    PaymentSummary,
    Stepper,
    DeliveryDetails,
    PaymentForm,
    BackFormButton
  },
  data() {
    return {
      step: 1,
      backBtnText: 'Back to cart'
    }
  },
  watch: {
    step(val) {
      let defaultText = 'Back to cart'
      val === 2 ? this.backBtnText = 'Back to delivery' : 
      val === 3 ? this.backBtnText = 'Go to homepage' : 
      this.backBtnText = defaultText
    }
  },
  // computed: {
  //   backBtnText() {
  //     let defaultText = 'Back to cart'
  //     return this.step == 2 ? 'Back to delivery' : this.step === 3 ? 'Go to homepage' : defaultText
  //   }
  // },
  methods: {
    onSubmit() {
      this.step += 1
    },
    // backBtnText() {
    //   let defaultText = 'Back to cart'
    //   return this.step == 2 ? 'Back to delivery' : this.step === 3 ? 'Go to homepage' : defaultText
    // }
  }
};
</script>
<style lang="scss" src="./style.scss" scoped />