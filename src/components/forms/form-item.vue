<template>
  <div
    class="jakmall-form-item"
    :class="[{
        'jakmall-form-item--error': validateState === 'error',
        'jakmall-form-item--success': validateState === 'success'}]"
  >
    <div class="jakmall-form-item__content">
      <slot></slot>
      <div class="jakmall-form-item__error" v-if="validateState === 'error' && form.showMessage">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>
<script>
import AsyncValidator from "async-validator";
import Emitter from "@/utils/emitter";
import Merge from "@/utils/merge";

export default {
  name: "jakmall-form-item",
  componentName: "jakmall-form-item",
  data() {
    return {
      validateState: "",
      validateDisabled: false,
      validateMessage: "",
      validator: {}
    };
  },
  inject: ["_form"],
  mixins: [Emitter, Merge],
  props: {
    prop: String
  },
  computed: {
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== "jakmall-form") {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
    fieldValue() {
      const model = this.form.model;
      if (!model || !this.prop) {
        return;
      }

      let path = this.prop;
      if (path.indexOf(":") !== -1) {
        path = path.replace(/:/, ".");
      }

      return this.getPropByPath(model, path, true).r;
    }
  },
  methods: {
    validate(trigger, callback = () => {}) {
      const rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        callback();
        return true;
      }
      this.validateState = "validating";
      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      const model = {};
      model[this.prop] = this.fieldValue;
      validator.validate(
        model,
        { firstFields: true },
        (errors, invalidFields) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";

          callback(this.validateMessage, invalidFields);
          this._form &&
            this._form.$emit(
              "validate",
              this.prop,
              !errors,
              this.validateMessage || null
            );
        }
      );
    },
    getPropByPath(obj, path, strict) {
      let tempObj = obj;
      path = path.replace(/\[(\w+)\]/g, ".$1");
      path = path.replace(/^\./, "");

      let keyArr = path.split(".");
      let i = 0;
      for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break;
        let key = keyArr[i];
        if (key in tempObj) {
          tempObj = tempObj[key];
        } else {
          if (strict) {
            throw new Error("please transfer a valid prop path to form item!");
          }
          break;
        }
      }
      return {
        u: tempObj,
        m: keyArr[i],
        r: tempObj ? tempObj[keyArr[i]] : null
      };
    },
    getRules() {
      let formRules = this.form.rules;
      const selfRules = this.rules;
			
      const prop = this.getPropByPath(formRules, this.prop || "");
      formRules = formRules ? prop.u[this.prop || ""] || prop.r : [];
      return [].concat(selfRules || formRules || []);
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();

      return rules
        .filter(rule => {
          if (!rule.trigger || trigger === "") return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1;
          } else {
            return rule.trigger === trigger;
          }
        })
        .map(rule => this.objectAssign({}, rule));
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    },
    addValidateEvents() {
      const rules = this.getRules();
      if (rules.length > 0) {
        this.$on("jakmall-form-blur", this.onFieldBlur);
        this.$on("jakmall-form-change", this.onFieldChange);
      }
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch("jakmall-form", "jakmall-form-addField", [this]);
      this.addValidateEvents();
    }
  },
  beforeDestroy() {
    this.dispatch("jakmall-form", "jakmall-form-removeField", [this]);
  }
};
</script>
<style lang="scss" src="./style.scss" scoped />