<template>
  <div class="summary">
    <div class="summary__top">
      <p class="heading">Summary</p>
      <p class="jakmall-text jakmall-text--opt6">{{ qty }} items purchased</p>
    </div>

		<div class="summary__middle" v-if="shipment.days">
      <div class="summary__divider"></div>
      <p class="jakmall-text jakmall-text--mgb2">Delivery estimation</p>
      <p class="jakmall-text jakmall-text--ft16 jakmall-text--medium jakmall-text--success">{{ shipment.days + ' by ' + shipment.courier }}</p>
		</div>
		<div class="summary__middle" v-if="currentStep > 2">
      <div class="summary__divider"></div>
      <p class="jakmall-text jakmall-text--mgb2">Payment method</p>
      <p class="jakmall-text jakmall-text--ft16 jakmall-text--medium jakmall-text--success">{{ payment.firstText }}</p>
		</div>

    <div class="summary__bottom">
      <div class="summary__item">
        <div class="summary__item-name">
          <span class="jakmall-text">Cost of goods</span>
        </div>
        <div class="summary__item-cost">
          <span class="jakmall-text jakmall-text--bold">{{ wordSplitter(productCost) }}</span>
        </div>
      </div>
      <div class="summary__item" v-if="dropShip">
        <div class="summary__item-name">
          <span class="jakmall-text">Dropshipping fee</span>
        </div>
        <div class="summary__item-cost">
          <span class="jakmall-text jakmall-text--bold">{{ wordSplitter(dropShipCost) }}</span>
        </div>
      </div>
      <div class="summary__item" v-if="shipment.courier">
        <div class="summary__item-name">
          <span class="jakmall-text"> <span class="jakmall-text jakmall-text--bold">{{ shipment.courier }}</span> shipment</span>
        </div>
        <div class="summary__item-cost">
          <span class="jakmall-text jakmall-text--bold"> {{ wordSplitter(shipment.cost) }} </span>
        </div>
      </div>
      <div class="summary__total">
        <span class="summary__total-text heading">Total</span>
        <span class="summary__total-cost heading">{{ wordSplitter(total) }}</span>
      </div>
      <ConfirmButton v-if="currentStep < 3"  @click="$emit('submit')" :label="confirmBtnText"/>
    </div>
  </div>
</template>
<script>
// import ConfirmButton from '@/components/buttons/confirm-form'
const ConfirmButton = () => import('@/components/buttons/confirm-form')
import { wordSplitter } from '@/utils/helper'

export default {
  components: {
    ConfirmButton
  },
  props: {
    confirmBtnText: {
      default: 'Continue to Payment'
    },
    shipment: {
      type: Object
    },
    payment: {
      type: Object
    },
    dropShip: {
      required: false
    },
    currentStep: {
      type: Number
    }
  },
  computed: {
    dropShipCost() {
      return this.dropShip ? 5900 : 0
    },
    shipmentCost() {
      return this.shipment.cost || 0
    },
    total() {
      return this.shipmentCost + this.productCost + this.dropShipCost
    },
    productCost() {
      return this.$store.state.payment.item.total
    },
    qty() {
      return this.$store.state.payment.item.qty
    }
  },
  methods: {
    wordSplitter(value) {
      return wordSplitter(value, ',', 3)
    }
  }
};
</script>
<style lang="scss" src="./style.scss" scoped />