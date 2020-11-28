<template>
  <div class="info">
    <div>
      <button @click="getMoneySpent()">Request money Spent</button>
      <button @click="sendRequestProducts()">Let's see what products we have</button>
      <button @click="sendRequestPurchases()">Let's see what purchases we have</button>
    </div>
      <h1>Favourite shop: {{ favouriteShop }}</h1>
    <div style="display: table;">
      <h3 style="display: table-cell">By: </h3>
      <select  style="display: table-cell" v-model="basedOn">
        <option>Money</option>
        <option>Quantity</option>
        <!-- <option>Times of Visit</option>
        <option>Types</option> -->
      </select>
      <!-- <img
      id="refreshButton"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @click="getFavShop()"
      style="width: 20px; height: 20px; display: table-cell;"
      src="../../public/img/refresh.png"
      alt="refresh">
      <label for="refreshButton" v-if="hover">Click this button to load/refresh favShop!</label> -->
    </div>
    <div>
      <h1>{{ moneySpent }}</h1>
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
const API_URL_SPENT = 'http://localhost:5000/purchases/spent'
const API_URL_FAVSHOP = 'http://localhost:5000/purchases/favshop'
export default {
  name: 'Info',
  data () {
    return {
      forceReRenderKey: 0,
      moneySpent: 0,
      hover: false,
      products: [],
      purchases: [],
      basedOn: 'Money',
      favouriteShop: ''
    }
  },
  methods: {
    async getMoneySpent () {
      await axios.get(API_URL_SPENT)
        .then(response => {
          this.moneySpent = response.data
        })
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
    },
    async getFavShop () {
      const MSG = {
        basedOn: this.basedOn
      }
      await axios.post(API_URL_FAVSHOP, MSG)
        .then(response => {
          if ((typeof response.data) === 'string') {
            this.favouriteShop = response.data
          } else {
            this.favouriteShop = 'Nem jó a válasz típusa'
          }
        })
    }
  },
  watch: {
    adat: {
      immediate: true,
      handler: function () {
        this.forceReRenderKey++
      }
    },
    basedOn: {
      immediate: true,
      handler: function () {
        this.getFavShop()
      }
    }
  }
}
</script>
