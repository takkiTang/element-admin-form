<template>
  <div id="app">
    <adminForm :model="model" :config="config" ref="form">
      <template #daterange="{formModel}">
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formModel.daterange.date1"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formModel.daterange.date2"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </template>
      <template #action>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </template>
    </adminForm>
  </div>
</template>
F

<script>
import { adminForm } from "../packages";

import outCom from "./components/outCom";

export default {
  name: "app",
  components: { adminForm },
  data() {
    return {
      model: {},
      config: [
        {
          label: "外部组件测试",
          key: "name",
          type: "custom_component",
          component: outCom
        },
        {
          label: "活动名称",
          key: "name",
          type: "input",
          rules: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ]
        },
        {
          label: "活动区域",
          key: "region",
          type: "select",
          rules: [
            { required: true, message: "请选择活动区域", trigger: "change" }
          ],
          props: {
            options: [
              {
                label: "区域一",
                value: "shanghai"
              },
              {
                label: "区域二",
                value: "beijin"
              }
            ]
          }
        },
        {
          label: "活动时间",
          key: "daterange",
          defaultValue: {
            date1: null,
            date2: null
          },
          rules: {
            type: "object",
            required: true,
            fields: {
              date1: {
                type: "number",
                required: true,
                message: "请选择活动时间1",
                trigger: "change"
              },
              date2: {
                type: "number",
                required: true,
                message: "请选择活动时间2",
                trigger: "change"
              }
            }
          },
          type: "slot"
        },
        {
          label: "即时配送",
          key: "delivery",
          type: "switch"
        },
        {
          label: "活动性质",
          key: "type",
          type: "checkbox",
          rules: [
            {
              type: "array",
              required: true,
              message: "请至少选择一个活动性质",
              trigger: "change"
            }
          ],
          props: {
            disabled: true,
            options: [
              {
                label: "美食/餐厅线上活动",
                value: "美食/餐厅线上活动"
              },
              {
                label: "地推活动",
                value: "地推活动"
              },
              {
                label: "线下主题活动",
                value: "线下主题活动"
              },
              {
                label: "单纯品牌曝光",
                value: "单纯品牌曝光"
              }
            ]
          }
        },
        {
          label: "特殊资源",
          key: "resource",
          type: "radio",
          rules: [
            { required: true, message: "请选择活动资源", trigger: "change" }
          ],
          props: {
            options: [
              {
                label: "线上品牌商赞助",
                value: "线上品牌商赞助"
              },
              {
                label: "线下场地免费",
                value: "线下场地免费"
              }
            ]
          }
        },
        {
          label: "活动形式",
          key: "desc",
          type: "input",
          rules: [
            { required: true, message: "请填写活动形式", trigger: "blur" }
          ],
          props: {
            type: "textarea"
          }
        },
        {
          label: "",
          key: "action",
          type: "slot"
        }
      ]
    };
  },
  methods: {
    test() {
      alert(11);
    },
    submitForm() {
      this.$refs.form.submitForm().then(model => {
        console.log(model);
      });
    },
    resetForm() {
      this.$refs.form.resetForm();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
