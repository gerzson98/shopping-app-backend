<template>
  <div class="info">
    <div>
      <button @click="getMoneySpent()">Request money Spent</button>
      <button @click="sendRequestProducts()">Let's see what products we have</button>
      <button @click="sendRequestPurchases()">Let's see what purchases we have</button>
    </div>
    <div>
      <p>Favourite shop's pick by;</p>
      <select v-model="basedOn">
        <option>Money</option>
        <option>Quantity</option>
        <!-- <option>Times of Visit</option>
        <option>Types</option> -->
      </select>
      <h1>Favourite shop: {{ favouriteShop }}</h1>
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
    }
  },
  asyncComputed: {
    async favouriteShop () {
      const response = await axios.get(API_URL_FAVSHOP, JSON.stringify(this.basedOn))
      if ((typeof response.data) === 'string') {
        this.favouriteShop = response.data
        return this.favouriteShop
      } else {
        this.favouriteShop = 'Nem jó a válasz típusa'
        return this.favouriteShop
      }
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
