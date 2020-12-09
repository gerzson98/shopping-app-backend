<template>
  <div class="test">
    <div>
      <button @click="get(url.product.getAll, 'products')">Let's see what products we have</button>
      <button @click="get(url.purchase.getAll, 'purchases')">Let's see what purchases we have</button>
      <button @click="truncate(url.purchase.erease)">Delete purchase</button>
      <button @click="truncate(url.product.erease)">Delete products</button>
    </div>
    <div v-for="(item, index) in products" :key="index">
      <p>Termék: {{ item.name }} Márkája: {{ item.trademark }} Eddig összesen vásárolva: {{ item.purchases }} db</p>
    </div>
    <div v-for="(item) in purchases" :key="item.product_id">
      <p>relevant ID: {{item.product_id }} location: {{ item.location }} price: {{ item.price }} date: {{ item.date }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../services/URL.json'
export default {
  name: 'Test',
  data () {
    return {
      forceReRenderKey: 0,
      trash: {},
      url: {},
      names: [],
      products: [],
      purchases: []
    }
  },
  async created () {
    this.url = URL
    await this.get(URL.product.getAllName, 'names')
  },
  methods: {
    async get (apiUrl, destination) {
      try {
        axios.get(apiUrl)
          .then(response => {
            this.$data[destination] = response.data
          })
      } catch (error) {
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
        console.log(error)
      }
    },
    async truncate (apiUrl) {
      await axios.post(apiUrl)
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
