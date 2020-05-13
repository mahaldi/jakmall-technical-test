<template>
  <label class="jakmall-checkbox">
    <span class="jakmall-checkbox__input">
      <span class="jakmall-checkbox__inner" 
				:class="[ { 'jakmall-checkbox__inner--checked': isChecked }]">

        <i class="jakmall-checkbox__icon icon-ok" 
					:class="[ { 'jakmall-checkbox__icon--checked': isChecked } ]"></i>
      </span>
      <input
        type="checkbox"
        class="jakmall-checkbox__original"
        v-model="model"
        :value="label"
        name="checkbox"
        @change="handleChange"
      />
    </span>
    <span class="jakmall-checkbox__label">{{ label }}</span>
  </label>
</template>
<script>
import Emitter from "@/utils/emitter.js";
export default {
  name: "jakmall-checkbox",
  componentName: "jakmall-checkbox",
  mixins: [Emitter],
  props: {
    value: {},
    label: {
      type: String,
      default: "label"
    },
    trueLabel: {},
    falseLabel: {}
  },
  data() {
    return {
      selfModel: false,
      focus: false,
      checked: false
    };
  },
  computed: {
    model: {
      get() {
        return this.value !== undefined
          ? this.value
          : this.selfModel;
      },
      set(val) {
				this.$emit("input", val);
				this.selfModel = val;
      }
    },
    store() {
      return this.value
    },
    isChecked() {
      if ({}.toString.call(this.model) === "[object Boolean]") {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
			}
			return false
    }
  },
  watch: {
    value(val) {
      this.dispatch("jakmall-form-item", "jakmall-form-change", val);
    }
  },
  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(e) {
      let value;
      if (e.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit("change", value, e);
    }
  }
};
</script>
<style lang="scss" src="./style.scss" scoped/>