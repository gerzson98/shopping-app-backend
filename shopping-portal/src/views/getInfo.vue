<template>
  <div class="view">
    <div>
      <button @click="get(URL.product.getAll, 'products')">Let's see what products we have</button>
      <button @click="get(URL.purchase.getAll, 'purchases')">Let's see what purchases we have</button>
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
    </div>
    <div v-if="moneySpent > 0">
      <h1>Money spent; {{ moneySpent }}</h1>
    </div>
    <div>
      <h2>If u wanna see where to get something the cheapest, pick below!</h2>
      <select v-model="productName">
        <option v-for="(item, index) in productNames" :key="index">
          {{ item }}
        </option>
      </select>
      <p v-if="cheapestLocation">So! {{ productName }} is cheapest at {{ cheapestLocation }}</p>
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
import URL from '../services/URL.json'
export default {
  name: 'Info',
  data () {
    return {
      forceReRenderKey: 0,
      URL: URL,
      moneySpent: 0,
      productName: null,
      productNames: [],
      cheapestLocation: null,
      products: [],
      purchases: [],
      basedOn: 'Money',
      favouriteShop: null
    }
  },
  async created () {
    await this.get(URL.product.getAllName, 'productNames')
  },
  methods: {
    async get (apiUrl, destination) {
      try {
        axios.get(apiUrl)
          .then(response => {
            this.$data[destination] = response.data
          })
      } catch (error) {
        alert('err', error)
        console.log(error)
      }
    },
    async post (apiUrl, destination, message) {
      const MSG = {
        msg: message
      }
      try {
        axios.post(apiUrl, MSG)
          .then(response => {
            this.$data[destination] = response.data
          })
      } catch (error) {
        alert('err', error)
        console.log(error)
      }
    }
  },
  watch: {
    adat: {
      immediate: true,
      handler: function () {
        this.forceReRenderKey++
      }
    },
    productName: {
      immadiate: true,
      handler: function () {
        this.post(URL.computed.cheapest, 'cheapestLocation', this.productName)
      }
    },
    basedOn: {
      immediate: true,
      handler: function () {
        this.post(URL.computed.favShop, 'favouriteShop', this.basedOn)
      }
    }
  }
}
</script>
