import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../views/Test.vue'
import AddBill from '../views/addBill.vue'
import Info from '../views/getInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Add',
    component: AddBill
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
