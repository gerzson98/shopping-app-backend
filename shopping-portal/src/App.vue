<template>
  <div class="home" :key="forceReRenderKey">
      <button @click="muteRows(1)">Add row for Input</button>
      <button @click="muteRows((-1))">Delete a row for Input</button>
      <div>
        <label>What was the name of the product?</label>
        <label>What trademark did it have?</label>
        <label>How many did you buy from it?</label>
        <br>
        <br>
      </div>
      <div v-for="i in inputLinesQuantity" :key="i">
        <input v-model="inputName[i]" placeholder="Product name" />
        <input v-model="inputTrademark[i]" placeholder="Trademark's name" />
        <input v-model="inputQuantity[i]" placeholder="Pieces" />
      </div>
      <div>
        <button @click="SendUpdate(inputLinesQuantity)">Submit</button>
      </div>
      <div>
        <button @click="SendRequest()">Let's see what we have so far</button>
      </div>

      <div v-for="item in products" :key="item.product_id">
        <p>Termék: {{ item.name }} Márkája: {{ item.trademark }} Eddig összesen vásárolva: {{ item.purchases }} db</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL_READ = 'http://localhost:5000/product/getall'
const API_URL_ADD_PRODUCT = 'http://localhost:5000/product/addproduct'

export default {
  name: 'App',
  data () {
    return {
      inputName: [],
      inputTrademark: [],
      inputQuantity: [],
      forceReRenderKey: 0,
      inputLinesQuantity: 5,
      dataToSend: [{
        name: 'testName',
        trademark: 'testTrademark',
        quantity: 1
      }],
      products: []
    }
  },
  computed: {
    adat: function () {
      return this.products
    }
  },
  methods: {
    inputAdder: function (i) {
      this.dataToSend.push({
        name: this.inputName[i],
        trademark: this.inputTrademark[i],
        quantity: this.inputQuantity
      })
    },
    async SendRequest () {
      const result = await axios.get(API_URL_READ)
      this.products = result.data
    },
    async SendUpdate (inputLinesQuantity) {
      for (var i = 1; i <= inputLinesQuantity; ++i) {
        this.inputAdder(i)
      }
      await axios.post(API_URL_ADD_PRODUCT, {
        jsonData: JSON.stringify(this.dataToSend)
      })
    },
    muteRows: function (diff) {
      this.inputLinesQuantity += diff
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
