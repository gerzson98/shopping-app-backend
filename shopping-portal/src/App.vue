<template>
  <div class="home" :key="forceReRenderKey">
      <button @click="muteRows(1)">Add row for Input</button>
      <button @click="muteRows((-1))">Delete a row for Input</button>
      <button @click="deletePurchases()">Delete purchase</button>
      <button @click="deleteProducts()">Delete products</button>
      <div>
        <label>What was the name of the product?</label>
        <label>What trademark did it have?</label>
        <label>How many did you buy from it?</label>
        <br>
        <br>
      </div>
      <div v-for="item in dataToSend" :key="item">
        <input v-model="item.name" placeholder="Product name" />
        <input v-model="item.trademark" placeholder="Trademark's name" />
        <input v-model="item.location" placeholder="Location" />
        <input v-model="item.price" placeholder="Price" />
        <input v-model="item.unitSize" placeholder="Unit size" />
        <input v-model="item.unitType" placeholder="Unit type" />
        <input v-model="item.quantity" placeholder="Pieces" />
      </div>
      <div>
        <button @click="SendUpdate()">Submit</button>
      </div>
      <div>
        <button @click="sendRequestProducts()">Let's see what products we have</button>
      </div>
      <div>
        <button @click="sendRequestPurchases()">Let's see what purchases we have</button>
      </div>

      <div v-for="item in products" :key="item.product_id">
        <p>Termék: {{ item.name }} Márkája: {{ item.trademark }} Eddig összesen vásárolva: {{ item.purchases }} db</p>
      </div>
      <div v-for="item in purchases" :key="item">
        <p>relevant ID: {{item.product_id }} location: {{ item.location }} price: {{ item.price }} date: {{ item.date }}</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL_READ = 'http://localhost:5000/product/getallproducts'
const API_URL_GETALLPURCHASES = 'http://localhost:5000/purchases/getallpurchases'
const API_URL_ADD_SHOPPING = 'http://localhost:5000/purchases/addshopping'
const API_URL_DELETE_PURCHASES = 'http://localhost:5000/purchases/delete'
const API_URL_DELETE_PRODUCTS = 'http://localhost:5000/product/erase'
export default {
  name: 'App',
  data () {
    return {
      forceReRenderKey: 0,
      inputLinesQuantity: 1,
      dataToSend: [{
        name: 'testName',
        trademark: 'testTrademark',
        location: 'CBA',
        price: 100,
        unitSize: 500,
        unitType: 'ml',
        quantity: 1
      }],
      products: [],
      purchases: []
    }
  },
  computed: {
    adat: function () {
      return this.products
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
    },
    async SendUpdate () {
      await axios.post(API_URL_ADD_SHOPPING, this.dataToSend)
      this.inputLinesQuantity = 1
      this.dataToSend = [{
        name: '',
        trademark: '',
        location: '',
        price: 0,
        unitSize: 0,
        unitType: '',
        quantity: 1
      }]
    },
    muteRows: function (diff) {
      this.inputLinesQuantity += diff
      while (this.inputLinesQuantity !== this.dataToSend.length) {
        if (this.inputLinesQuantity > this.dataToSend.length) {
          this.dataToSend.push({})
        } else {
          this.dataToSend.pop()
        }
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
