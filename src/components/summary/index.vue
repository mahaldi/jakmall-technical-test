<template>
  <div class="summary">
    <div class="summary__top">
      <p class="heading">Summary</p>
      <p class="jakmall-text jakmall-text--inter-ui jakmall-text--opt6">10 items purchased</p>
    </div>
		<div class="summary__middle">
			<div v-for="(item , idx) in 2"  class="summary__item" :key="idx">
				<p class="jakmall-text jakmall-text--mgb2">Delivery estimation</p>
				<p class="jakmall-text jakmall-text--ft16 jakmall-text--success">today by Go-send</p>
			</div>
		</div>
    <div class="summary__bottom">
      <div v-for="(item , idx) in 2" class="summary__item" :key="idx">
        <div class="summary__item-name">
          <span>Cost of goods</span>
        </div>
        <div class="summary__item-cost">
          <span>500,000</span>
        </div>
      </div>
      <div class="summary__total">
        <span>Total</span>
        <span>505,900</span>
      </div>
      <div class="summary__button">Continue to Payment</div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" src="./style.scss" scoped />