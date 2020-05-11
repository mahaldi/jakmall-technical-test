<template>
  <div class="summary">
    <div class="summary__top">
      <p class="heading">Summary</p>
      <p class="jakmall-text jakmall-text--opt6">10 items purchased</p>
    </div>
		<div class="summary__middle"  v-for="(item , idx) in 2" :key="idx">
      <div class="summary__divider"></div>
      <p class="jakmall-text jakmall-text--mgb2">Delivery estimation</p>
      <p class="jakmall-text jakmall-text--ft16 jakmall-text--medium jakmall-text--success">today by Go-send</p>
		</div>
    <div class="summary__bottom">
      <div v-for="(item , idx) in 2" class="summary__item" :key="idx">
        <div class="summary__item-name">
          <span class="jakmall-text">Cost of goods</span>
        </div>
        <div class="summary__item-cost">
          <span class="jakmall-text jakmall-text--bold">500,000</span>
        </div>
      </div>
      <div class="summary__total">
        <span class="summary__total-text heading">Total</span>
        <span class="summary__total-cost heading">505,900</span>
      </div>
      <button class="summary__button" @click="$emit('submit')">Continue to Payment</button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" src="./style.scss" scoped />