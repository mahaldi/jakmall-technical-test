<template>
  <div class="payment">
    <div class="payment__box">
      <Stepper />
      <PaymentSummary />
    </div>
  </div>
</template>
<script>
import PaymentSummary from "@/components/summary";
import Stepper from "@/components/stepper";

export default {
  name: "Payment",
  components: {
    PaymentSummary,
    Stepper
  }
  // created(){
  //     if(isNaN(parseInt(this.$route.query.step))){
  //         window.location.replace('/payment?step=1')
  //     }
  // },
};
</script>
<style lang="scss" src="./style.scss" scoped />