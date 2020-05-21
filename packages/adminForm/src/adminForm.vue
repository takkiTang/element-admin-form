<template>
  <el-form ref="form" :model="formModel" label-width="100px">
    <el-form-item
      v-for="(item, i) in formItems"
      v-if="item._ifRender"
      v-bind="item"
      :key="item.key + '_' + i"
      :prop="item.key"
    >
      <render
        v-if="item.render"
        :render="item.render"
        v-model="formModel[item.key]"
        v-bind="item.props"
      ></render>
      <slot v-else-if="item.type === 'slot'" :name="item.key" :formModel="formModel"></slot>
      <component v-else :is="item.component" v-model="formModel[item.key]" v-bind="item.props"></component>
    </el-form-item>
  </el-form>
</template>

<script>
import render from "./render";
import ElementMapping from "./type";
export default {
  name: "adminForm",
  components: { render },
  props: {
    config: {
      required: true
    },
    model: {
      type: Object
    }
  },
  data() {
    return {
      formModel: {}
    };
  },
  watch: {
    model: {
      handler() {
        this.computeFormModel();
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    formItems() {
      return (this.config || []).map(item =>
        this.computeFormItem(item, this.formModel)
      );
    }
  },
  methods: {
    isFunction(fn) {
      return typeof fn === "function";
    },
    // 计算表单项
    computeFormItem(config, form) {
      const item = { ...config };
      // 表单控件的类型
      let type = item.type || "input";
      // 对应到组件映射表
      let def = ElementMapping[type] || {};
      // 优先渲染 render
      if (def.render) {
        item.render = def.render;
        // 非 slot
      } else if (item.type !== "slot") {
        item.component =
          item.type === "custom_component" ? item.component : def.tag;
      }

      const defaultValue = item.defaultValue || def.defaultValue;
      this.checkValue(defaultValue) && (item.defaultValue = defaultValue);

      item.props = Object.assign({}, def.props, item.props);
      // 获取动态 props
      if (this.isFunction(item.getProps)) {
        Object.assign(item.props, item.getProps(form));
      }
      // 条件渲染
      item._ifRender = this.isFunction(item.ifRender)
        ? !!item.ifRender(form)
        : true;
      // 防止表单提交时存在多余 key
      if (!item._ifRender) {
        delete form[item.key];
      }
      return item;
    },
    // 计算表单值
    computeFormModel() {
      let formObj = {};
      if (!this.model) {
        return;
      }
      this.formItems.forEach(item => {
        let nameVal = item.key;
        if (!nameVal) {
          console.error("[oa form warn]: 存在未配置key或者key为空的表单项");
          return;
        }
        formObj[nameVal] = this.checkValue(this.model[nameVal])
          ? this.model[nameVal]
          : this.computeItemDefaultValue(item);
      });
      this.formModel = Object.assign({}, formObj);
    },
    // 计算默认值
    computeItemDefaultValue(item) {
      return this.checkValue(item.defaultValue) ? item.defaultValue : "";
    },
    // 判断是否值为空
    checkValue(val) {
      return val !== undefined;
    },
    submitForm() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          valid ? resolve(this.formModel) : reject();
        });
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    validateField(prop){
      this.$refs.form.validateField(prop)
    }
  }
};
</script>
