<template>
  <div class="addBill">
    <div>
      <button @click="muteRows(1)">Add row for Input</button>
      <button @click="muteRows((-1))">Delete a row for Input</button>
    </div>
    <div class="inputBox">
      <p>Shop: </p>
      <input class="inputBox" v-model="location" placeholder="Location" />
    </div>
    <p>
      Purchased stuff;
    </p>
      <div class="inputBox" v-for="(item, index) in dataToSend" :key="index">
        <input class="inputBox" v-model="item.name" placeholder="Product name" />
        <input class="inputBox" v-model="item.trademark" placeholder="Trademark's name" />
        <input class="inputBox" v-model="item.price" placeholder="Price" />
        <input class="inputBox" v-model="item.unitSize" placeholder="Unit size" />
        <select class="inputBox" v-model="item.unitType">
          <option>db</option>
          <option>g</option>
          <option>ml</option>
          <option>kg</option>
          <option>l</option>
        </select>
        <input class="inputBox" v-model="item.quantity" placeholder="Pieces" />
      </div>
      <div>
        <button id="submitButton" @click="SendUpdate()">Submit</button>
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
      location: 'CBA',
      // tmpMSG: {
      //   locationMSG: '',
      //   dataMSG: []
      // },
      dataToSend: [{
        name: 'testName',
        trademark: 'testTrademark',
        price: 100,
        unitSize: 500,
        unitType: 'ml',
        quantity: 1
      }]
    }
  },
  // computed: {
  //   computeMSG: function () {
  //     this.tmpMSG.locationMSG = this.location
  //     this.tmpMSG.dataMSG = this.dataToSend
  //     return tmpMSG
  //   }
  // },
  methods: {
    async SendUpdate () {
      const MSG = {
        location: this.location,
        data: this.dataToSend
      }
      try {
        await axios.post(API_URL_ADD_SHOPPING, MSG)
      } catch (error) {
        console.log('err', error)
      }
      this.inputLinesQuantity = 1
      this.location = ''
      this.dataToSend = [{
        name: '',
        trademark: '',
        price: '',
        unitSize: '',
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
