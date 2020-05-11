<template>
	<div class="category-button" :class="{'category-button--active' : isActive}" @click="$emit('click')">
		<div class="category-button__content">
			<p class="jakmall-text jakmall-text--medium jakmall-text--blackOpt60 jakmall-text--ft-13 jakmall-text--mgb-5" 
				:class="{'jakmall-text--blackOpt80' : isActive}"> {{ firstText }} 
			</p>
			<p class="jakmall-text jakmall-text--bold jakmall-text--bluis-blackOpt60 jakmall-text--ft16 jakmall-text--mg0" 
				:class="{'jakmall-text--bluis-black' : isActive}"> {{ secondText }} 
			</p>
		</div>
		<i class="category-button__icon icon-ok" :class="{'category-button__icon--active' : isActive}"></i>
	</div>
</template>
<script>
export default {
  props: {
		isActive: {
			default: false,
			type: Boolean
		},
		firstText: {
			default: 'GO-SEND',
			type: String
		},
		secondText: {
			default: '15,000',
			type: String
		}
	}
}
</script>
<style lang="scss" src="./style.scss" scoped />