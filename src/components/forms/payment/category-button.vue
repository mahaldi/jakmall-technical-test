<template>
	<div class="category-button" :class="{'category-button--active' : isActive, 'category-button--disabled' : isDisabled}" @click="$emit('click')">
		<div class="category-button__content">
			<p class="jakmall-text jakmall-text--medium jakmall-text--blackOpt60 jakmall-text--ft-13 jakmall-text--mgb-5" 
				:class="{'jakmall-text--blackOpt80' : isActive}" :style="!secondText ? 'line-height: 30px;':''"> {{ firstText }} 
			</p>
			<p class="jakmall-text jakmall-text--bold jakmall-text--bluis-blackOpt60 jakmall-text--ft16 jakmall-text--mg0" 
				:class="{'jakmall-text--bluis-black' : isActive}"> {{ firstText === 'e-Wallet' ? wordSplitter(secondText) + ' left' : secondText ? wordSplitter(secondText) : '' }} 
			</p>
		</div>
		<i class="category-button__icon" :class="{'icon-ok category-button__icon--active' : isActive, 'icon-cancel-1 category-button__icon--disabled' : isDisabled}"></i>
	</div>
</template>
<script>
import { wordSplitter } from '@/utils/helper'

export default {
  props: {
		isDisabled: {
			type: Boolean,
			default: false
		},
		isActive: {
			default: false,
			type: Boolean
		},
		firstText: {
			default: 'GO-SEND',
			type: String
		},
		secondText: {
			default: '',
		}
	},
	computed: {
		wallet() {
			return this.$store.state.payment.wallet
		}
	},
	methods: {
		wordSplitter(value) {
			return wordSplitter(value, ',', 3)
		}
	}
}
</script>
<style lang="scss" src="./style.scss" scoped />