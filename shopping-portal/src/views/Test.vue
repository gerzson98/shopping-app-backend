<template>
  <div class="test">
    <nav class="mainMenu">
      <router-link :to="{ name: 'Test' }">Let's go testing shiet</router-link>
      <router-link :to="{ name: 'Add' }">Add another bill</router-link>
      <router-link :to="{ name: 'Info' }">Lets see some computed data</router-link>
    </nav>
    <div>
      <button @click="sendRequestProducts()">Let's see what products we have</button>
      <button @click="sendRequestPurchases()">Let's see what purchases we have</button>
      <button @click="deletePurchases()">Delete purchase</button>
      <button @click="deleteProducts()">Delete products</button>
    </div>
    <div v-for="(item, index) in products" :key="index">
      <p>Termék: {{ item.name }} Márkája: {{ item.trademark }} Eddig összesen vásárolva: {{ item.purchases }} db</p>
    </div>
    <div v-for="(item, index) in purchases" :key="index">
      <p>relevant ID: {{item.product_id }} location: {{ item.location }} price: {{ item.price }} date: {{ item.date }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL_READ = 'http://localhost:5000/product/getallproducts'
const API_URL_GETALLPURCHASES = 'http://localhost:5000/purchases/getallpurchases'
const API_URL_DELETE_PURCHASES = 'http://localhost:5000/purchases/delete'
const API_URL_DELETE_PRODUCTS = 'http://localhost:5000/product/erase'
export default {
  name: 'Test',
  data () {
    return {
      forceReRenderKey: 0,
      products: [],
      purchases: []
    }
  },
  methods: {
    async deletePurchases () {
      await axios.post(API_URL_DELETE_PURCHASES)
    },
    async deleteProducts () {
      await axios.post(API_URL_DELETE_PRODUCTS)
    },
    async sendRequestProducts () {
      await axios.get(API_URL_READ)
        .then(response => {
          this.products = response.data
        })
    },
    async sendRequestPurchases () {
      await axios.get(API_URL_GETALLPURCHASES)
        .then(response => {
          this.purchases = response.data
        })
    }
  },
  watch: {
    adat: {
      immediate: true,
      handler: function () {
        this.forceReRenderKey++
      }
    }
  }
}
</script>
