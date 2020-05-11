<template>
  <div class="payment-back" @click="$emit('click')">
    <i class="payment-back__icon icon-left"></i>
    <p class="jakmall-text jakmall-text--medium jakmall-text--blackOpt60"> {{ text }} </p>
  </div>
</template>
<script>
export default {
	props: {
		text: {
			default: '',
			type: String
		}
	}
}
</script>
<style lang="scss" scoped>
	.payment-back {
		$self: &;
		display: flex;
		cursor: pointer;
		margin-bottom: 33px;
    &__icon {
			color: $blackOpt60;
			margin-right: 11px;
    }
	}
</style>