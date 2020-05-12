<template>
  <div class="payment">
    <div class="payment__box">
			<div class="payment__stepper-section">
				<Stepper :step="currentStep" />
			</div>
			<div class="payment__form-section">
        <BackFormButton v-if="currentStep < 3" @click="dispatchStep('prev')" :text="backBtnText"/>
        <DeliveryDetails v-if="currentStep === 1" ref="form1" :currentDetail="currentDetail && currentDetail.form1" />
        <PaymentForm v-else-if="currentStep === 2" ref="form2" 
          :currentDetail="currentDetail && currentDetail.form2 || {}"/>
        <FormFinish v-else-if="currentStep === 3" :currentDetail="currentDetail.form2"/>
			</div>
      <div class="payment__divider"></div>
			<div class="payment__summary-section">
				<PaymentSummary @submit="onSubmit" 
          :currentDetail="currentDetail"
          :currentStep="currentStep"
          :shipment="shipment"
          :payment="payment"
          :dropShip="dropShip"
          :confirmBtnText="currentStep === 1 ? 'Continue to Payment': `Pay with ${payment.firstText}`"/>
			</div>
      <div class="payment__confirm-button is-medium">
        <ConfirmButton @click="onSubmit" :label="currentStep === 1 ? 'Continue to Payment': `Pay with ${payment.firstText}`"/>
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
import FormFinish from '@/components/forms/finish'
import Cookies from 'js-cookie'
import ConfirmButton from '@/components/buttons/confirm-form'

export default {
  name: "Payment",
  components: {
    PaymentSummary,
    Stepper,
    DeliveryDetails,
    PaymentForm,
    BackFormButton,
    FormFinish,
    ConfirmButton
  },
  data() {
    return {
      backBtnText: 'Back to cart'
    }
  },
  watch: {
    currentStep(val) {
      let defaultText = 'Back to cart'
      val === 2 ? this.backBtnText = 'Back to delivery' : 
      val === 3 ? this.backBtnText = 'Go to homepage' : 
      this.backBtnText = defaultText
    },
  },
  computed: {
    currentDetail() {
      return this.$store.state.payment.currentDetail
    },
    shipment(){
      return this.currentDetail && this.currentDetail.form2  && this.currentDetail.form2.shipment || {}
    },
    payment() {
      return this.currentDetail && this.currentDetail.form2 && this.currentDetail.form2.payment || {}
    },
    dropShip(){
      return this.currentDetail && this.currentDetail.form1 && this.currentDetail.form1.isDropship || false
    },
    selectedPayment() {
      return this.$store.state.payment.selectedPayment
    },
    currentStep() {
      return this.$store.state.payment.step
    }
  },
  methods: {
		generateOrderId() {
			var charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
			let code =''
			for (var i = 0; i < 5; i++)
				code += charset.charAt(Math.floor(Math.random() * charset.length));
			
			return code;
		},
    dispatchStep(direction) {
      let step = this.currentStep
      direction === 'next' ? step += 1 : step -= 1
      this.$store.dispatch('payment/setStep', step )
      this.replaceQuery(step)
    },
    replaceQuery(step) {
      this.$router.replace({ query: {...this.$route.query, step }}).catch(() => {})
    },
    onSubmit() {
      let isValid = this.$refs[`form${this.currentStep}`].onSubmit()

      if(isValid) {
        this.dispatchStep('next')
        if( this.currentStep === 3 ) {
          let cookiePayments = Cookies.get('payments')
          if( !cookiePayments ) Cookies.set('payments', [])
          let dataPayments = JSON.parse(cookiePayments)
          let payload = this.currentDetail
          let orderId = this.generateOrderId()
          payload.id = orderId
          dataPayments.push(payload)
          Cookies.set( 'payments', dataPayments)
          Cookies.remove('payment')
          this.$router.replace({ path: '/payment/' + orderId }).catch(() => {})
          return
        }
        this.replaceQuery(this.currentStep)
      }
    }
  },
  beforeMount() {

    let { id } = this.$route.params
    if(id){
      this.$store.dispatch('payment/setStep', 3)
      return this.$store.dispatch('payment/fetchDetails', id)
    }
    let step = parseInt(this.$route.query.step)
    this.$store.dispatch('payment/fetchCurrentDetail')
    if(step > 1 && !this.currentDetail.form2)
      return this.replaceQuery(1)
    this.$store.dispatch('payment/setStep', step)
  }
};
</script>
<style lang="scss" src="./style.scss" scoped />