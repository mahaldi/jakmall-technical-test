<template>
  <div class="text-area">
		<div class="text-area__formfield" :class="`text-area--${formItem.validateState}`">
			<textarea 
				:id="id" 
				class="text-area__element" 
				:value="value" 
        @input="handleInput($event)"
				@blur="handleBlur($event)"
				required>
			</textarea>
			<label :for="id" class="text-area__label"> {{label}} </label>
			<div class="text-area__counter">{{lengthInput}} / 120</div>
		</div>
	</div>
</template>
<script>
import Emitter from '@/utils/emitter'

export default {
  name: "jakmall-textarea",
	mixins : [Emitter],
	componentName: "jakmall-textarea",
	props: {
    value: {
      // this value refer to $attrs.value , v-model change the $attrs.value's value
      default: ""
    },
    id: {
      //id is required for label and input animation css https://www.geeksforgeeks.org/html-label-tag/
      type: [String, Number],
      required: true
    },
		label : { //label and placeholder always the same
			required : false,
			type : String,
			default : 'label'
		},
	},
  watch: {
    value(val) {
      this.dispatch("jakmall-form-item", "jakmall-form-change", [val]);
    }
  },
  computed: {
    lengthInput() {
      return this.value.toString().length;
    },
    formItem() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== "jakmall-form-item") {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    }
  },
  methods: {
    handleBlur(e) {
      let value = e.target.value;

      this.$emit("input", value);
    },
    handleInput(e) {
      let value = e.target.value;

      this.$emit("input", value);
    },
    submit() {
      this.$emit("submit");
    }
  }
};
</script>
<style lang="scss" src="./style.scss" scoped />