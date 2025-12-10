/*
 * @Desc: library entry for external usage
 * @Date: 2025-12-10
 */
import TableTree from './TableTree/index.vue'

// 支持按需注册
const components = [TableTree]

const install = function(Vue) {
  if (install.installed) return
  components.forEach(component => {
    if (component && component.name) {
      Vue.component(component.name, component)
    }
  })
}

// 允许通过 <script> 引入后自动注册
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

TableTree.install = install

export { TableTree }
export default TableTree

