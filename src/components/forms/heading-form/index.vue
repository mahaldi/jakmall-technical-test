<template>
  <div class="payment-heading">
    <h3 class="payment-heading__tag heading heading--large">{{ heading }} hotfix 1.0.1</h3>
		<div class="payment-heading__shadow"></div>
  </div>
</template>
<script>
export default {
  props: {
    heading: {
      default: "Heading"
    }
  }
};
</script>
<style lang="scss" src="./style.scss" scoped />