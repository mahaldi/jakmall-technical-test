<template>
  <div class="jakmall-input">
    <div class="jakmall-input__formfield" 
			:class=" !disabled ? `jakmall-input--${formItem.validateState}` : '' ">
      <input
        :id="id"
        :type="type"
        :value="value"
        ref="input"
				class="jakmall-input__element"
        :name="name"
        @input="handleInput($event)"
				@blur="handleBlur($event)"
        @keyup.enter="submit"
        :autocomplete="autocomplete"
        :spellcheck="spellcheck"
        :autocapitalize="autocapitalize"
        :disabled="disabled"
        :aria-label="label"
        required
      />

      <!-- required is needed for valid css selector, check style file -->
      <label :for="id" class="jakmall-input__label">{{label}}</label>
      <i class="jakmall-input__icon" :class="formItem.validateState === 'error' ? 'icon-cancel-1' : 'icon-ok'"></i>
    </div>
  </div>
</template>
<script>
import Emitter from '@/utils/emitter'

export default {
  name: "jakmall-input",
	componentName: "jakmall-input",
	mixins : [Emitter],
  props: {
    value: {
      // this value refer to $attrs.value , v-model change the $attrs.value's value
      default: ""
    },
    label: {
      //label and placeholder always the same
      required: false,
      type: String,
      default: "label"
    },
    type: {
      default: "text",
      required: false,
      type: String,
      validator(val) {
        // we only cover these types in our input components.
        return (
          ["text", "url", "email", "password", "search", "tel"].indexOf(val) !== -1
        );
      }
    },
    autocapitalize: {
      //https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize
      default: "none",
      required: false,
      type: String,
      validator(val) {
        return (
          ["off", "none", "on", "sentences", "words", "characters"].indexOf(
            val
          ) !== -1
        );
      }
    },
    id: {
      //id is required for label and input animation css https://www.geeksforgeeks.org/html-label-tag/
      type: [String, Number],
      required: true
    },
    spellcheck: {
      required: false,
      type: Boolean,
      default: false
    },
    name: {
      required: false,
      type: String
    },
    autocomplete: {
      //autocomplete for credential form see this : https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element just like google login autocomplete maybe
      required: false,
      type: String,
      default: "on",
      validator(val) {
        return (
          [
            "on",
            "off",
            "username",
            "current-password",
            "new-password",
            "one-time-code"
          ].indexOf(val) !== -1
        );
      }
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  watch: {
    value(val) {
      this.dispatch("jakmall-form-item", "jakmall-form-change", [val]);
    }
  },
  data() {
    return {
      id_: this._uid,
      valueInput: this.value
    };
  },
  computed: {
    lengthInput() {
      return this.valueInput.toString().length;
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
      this.valueInput = value;

      this.$emit("input", value);
    },
    handleInput(e) {
      let value = e.target.value;
			this.valueInput = value;

      this.$emit("input", value);
    },
    submit() {
      this.$emit("submit");
    }
  }
};
</script>
<style lang="scss" src="./style.scss" scoped />