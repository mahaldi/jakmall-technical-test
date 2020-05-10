<template>
  <div class="payment">
    <div class="payment__box">
			<div class="payment__stepper-section">
				<Stepper />
			</div>
			<div class="payment__form-section">
				<div class="payment__back">
          <i class="icon-left"></i>
          <p>Back to cart</p>
        </div>
        <DeliveryDetails />
			</div>
			<div class="payment__summary-section">
				<PaymentSummary />
			</div>
    </div>
  </div>
</template>
<script>
import PaymentSummary from "@/components/summary";
import Stepper from "@/components/stepper";
import DeliveryDetails from '@/components/forms/delivery-details'

export default {
  name: "Payment",
  components: {
    PaymentSummary,
    Stepper,
    DeliveryDetails
  }
  // created(){
  //     if(isNaN(parseInt(this.$route.query.step))){
  //         window.location.replace('/payment?step=1')
  //     }
  // },
};
</script>
<style lang="scss" src="./style.scss" scoped />