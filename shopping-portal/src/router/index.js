import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../views/Test.vue'
import AddBill from '../views/addBill.vue'
import Info from '../views/getInfo.vue'
import Input from '../views/input.vue'

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
  },
  {
    path: '/input',
    name: 'Input',
    component: Input
  }
]

const router = new VueRouter({
  routes
})

export default router
