<template>
  <form autocomplete="on" @submit.prevent="onSubmit">
    <slot></slot>
  </form>
</template>
<script>
import Merge from "@/utils/merge";
export default {
  name: "jakmall-form",
  componentName: "jakmall-form",
  mixins: [Merge],
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    },
    showMessage: {
      type: Boolean,
      default: false
    },
    validateOnRuleChange: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      _form: this
    };
  },
  data() {
    return {
      fields: []
    };
  },
  created() {
    this.initEventChild();
  },
  watch: {
    rules: {
      handler(){
        if (this.validateOnRuleChange) {
          this.validate(() => {});
        }
      },
      deep: true
    }
  },
  methods: {
    initEventChild() {
      this.$on("jakmall-form-addField", field => {
        if (field) {
          this.fields.push(field);
        }
      });
      this.$on("jakmall-form-removeField", field => {
        if (field.prop) {
          this.fields.splice(this.fields.indexOf(field), 1);
        }
      });
    },
    onSubmit() {
      this.$emit("submit");
    },
    validate(callback) {
      if (!this.model) {
        console.warn("[Form] model is required for validate to work!");
        return;
      }
      let promise;
      if (typeof callback !== "function" && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function(valid) {
            if (valid) {
              resolve(valid);
            } else {
              reject(valid);
            }
          };
        });
      }
      let valid = true;
      let count = 0;

      if (this.fields.length === 0 && callback) {
        callback(true);
      }

      let invalidFields = {};
      this.fields.forEach(field => {
        field.validate("", (message, field) => {
          if (message) {
            valid = false;
          }
          invalidFields = this.objectAssign({}, invalidFields, field);
          if (
            typeof callback === "function" &&
            ++count === this.fields.length
          ) {
            callback(valid, invalidFields);
          }
        });
      });
      if (promise) {
        return promise;
      }
    }
  }
};
</script>