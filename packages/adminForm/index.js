import adminForm from './src/adminForm'
adminForm.install = Vue => {
  Vue.component(adminForm.name, adminForm)
}
export default adminForm
