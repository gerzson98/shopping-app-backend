<template>
  <div class="test">
    <div>
      <button @click="get(url.product.getAll, 'products')">Let's see what products we have</button>
      <button @click="get(url.purchase.getAll, 'purchases')">Let's see what purchases we have</button>
      <button @click="get(url.purchase.erase, 'trash')">Delete purchase</button>
      <button @click="get(url.purchase.erase, 'trash')">Delete products</button>
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
  name: 'Test',
  data () {
    return {
      trash: {},
      url: {},
      forceReRenderKey: 0,
      products: [],
      purchases: []
    }
  },
  created () {
    this.url = URL
  },
  methods: {
    async get (apiUrl, destination) {
      axios.get(apiUrl)
        .then(response => {
          this.$data[destination] = response.data
        })
    },
    async post (apiUrl, destination, message) {
      const MSG = {
        msg: message
      }
      axios.post(apiUrl, MSG)
        .then(response => {
          this.$data[destination] = response.data
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
