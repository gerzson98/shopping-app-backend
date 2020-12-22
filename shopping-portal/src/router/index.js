import Vue from 'vue'
import App from '../App.vue'
import Info from '../views/getInfo.vue'
import List from '../views/shoppingList.vue'
import AddBill from '../views/addBill.vue'
import AddList from '../views/addList.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/add-bill',
    name: 'Add',
    component: AddBill
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/list-adder',
    name: 'AddList',
    component: AddList
  }
]

const router = new VueRouter({
  routes
})

export default router
