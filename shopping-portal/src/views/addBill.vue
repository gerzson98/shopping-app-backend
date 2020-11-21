<template>
  <div class="addBill">
    <nav class="mainMenu">
      <router-link :to="{ name: 'Test' }">Let's go testing shiet</router-link>
      <router-link :to="{ name: 'Add' }">Add another bill</router-link>
      <router-link :to="{ name: 'Info' }">Lets see some computed data</router-link>
    </nav>
    <div>
      <button @click="muteRows(1)">Add row for Input</button>
      <button @click="muteRows((-1))">Delete a row for Input</button>
    </div>
      <div v-for="(item, index) in dataToSend" :key="index">
        <input v-model="item.name" placeholder="Product name" />
        <input v-model="item.trademark" placeholder="Trademark's name" />
        <input v-model="item.location" placeholder="Location" />
        <input v-model="item.price" placeholder="Price" />
        <input v-model="item.unitSize" placeholder="Unit size" />
        <select v-model="item.unitType">
          <option>db</option>
          <option>g</option>
          <option>ml</option>
          <option>kg</option>
          <option>l</option>
        </select>
        <input v-model="item.quantity" placeholder="Pieces" />
      </div>
      <div>
        <button @click="SendUpdate()">Submit</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL_ADD_SHOPPING = 'http://localhost:5000/purchases/addshopping'
export default {
  name: 'Add',
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
      }]
    }
  },
  methods: {
    async SendUpdate () {
      try {
        await axios.post(API_URL_ADD_SHOPPING, this.dataToSend)
      } catch (error) {
        console.log('err', error)
      }
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
