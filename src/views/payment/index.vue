<template>
    <div class="payment">
        Payment
        <div class="payment__box">
            <PaymentSummary />
        </div>
    </div>
</template>
<script>
import PaymentSummary from '@/components/summary'
export default {
    name: 'Payment',
    components: {
        PaymentSummary
    }
    // created(){
    //     if(isNaN(parseInt(this.$route.query.step))){
    //         window.location.replace('/payment?step=1')
    //     }
    // },
}
</script>
<style lang="scss" src="./style.scss" scoped />