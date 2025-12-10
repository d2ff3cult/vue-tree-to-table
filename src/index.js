/*
 * @Descripttion: 
 * @version: 
 * @Author: huangwei
 * @Date: 2021-03-06 12:44:41
 * @LastEditors: huangwei
 * @LastEditTime: 2021-03-12 00:16:37
 */

import Vue from 'vue'
import Main from './Main.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(Main)
}).$mount('#app')