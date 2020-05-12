<template>
  <div class="stepper">
    <div v-for="(item, idx) in steps" class="stepper__step" :key="idx">
      <div 
				class="stepper__rounded jakmall-text jakmall-text--ft16 jakmall-text--medium jakmall-text--secondary jakmall-text--mg0" 
				:class="{'stepper__rounded--active' : item.step <= step}">{{ item.step }}</div>
      <div class="stepper__text jakmall-text jakmall-text--ft16 jakmall-text--medium jakmall-text--secondary jakmall-text--mg0">
        {{ item.text }}
      </div>
			<i class="stepper__icon icon-right-open"></i>
    </div>
  </div>
</template>
<script>
export default {
	props: {
		step: {
			default: 1,
			type: Number
		}
	},
	data() {
		return {
			steps : [
				{ step: 1, text: 'Delivery'},
				{ step: 2, text: 'Payment'},
				{ step: 3, text: 'Finish'},
			]
		}
	}
};
</script>
<style lang="scss" src="./style.scss" scoped />