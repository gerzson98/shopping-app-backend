<template>
  <div class="addBill">
    <div class="inputBox">
      <p>Shop: </p>
      <input class="inputBox" v-model="location" placeholder="Location" />
    </div>
    <p>
      Purchased stuff;
    </p>
      <div class="inputBox" v-for="(item, index) in bill" :key="index">
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
        <input class="inputBox" v-model="newLine.name" placeholder="Product name" />
        <input class="inputBox" v-model="newLine.trademark" placeholder="Trademark's name" />
        <input class="inputBox" v-model="newLine.price" placeholder="Price" />
        <input class="inputBox" v-model="newLine.unitSize" placeholder="Unit size" />
        <select class="inputBox" v-model="newLine.unitType">
          <option>db</option>
          <option>g</option>
          <option>ml</option>
          <option>kg</option>
          <option>l</option>
        </select>
        <input class="inputBox" v-model="newLine.quantity" placeholder="Pieces" />
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
      location: 'CBA',
      newLine: {
        name: '',
        trademark: '',
        price: '',
        unitSize: '',
        unitType: 'db',
        quantity: 1
      },
      bill: [{
        name: 'testName',
        trademark: 'testTrademark',
        price: 100,
        unitSize: 500,
        unitType: 'ml',
        quantity: 1
      }]
    }
  },
  computed: {
    pushNeeded: function () {
      let answer = false
      if (this.newLine.name !== '' && this.newLine.price !== '') {
        answer = true
      }
      console.log('pushNeeded\'s current value:', answer)
      return answer
    }
  },
  methods: {
    async SendUpdate () {
      const MSG = {
        location: this.location,
        data: this.bill
      }
      try {
        await axios.post(API_URL_ADD_SHOPPING, MSG)
      } catch (error) {
        console.log('err', error)
      }
      this.location = ''
      this.bill = [{
        name: '',
        trademark: '',
        price: '',
        unitSize: '',
        unitType: '',
        quantity: 1
      }]
    },
    pushToBill () {
      console.log('Push method called')
      this.bill.push(this.newLine)
      this.newLine = {
        name: '',
        trademark: '',
        price: '',
        unitSize: '',
        unitType: 'db',
        quantity: 1
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
    pushNeeded: function (val) {
      if (val) {
        this.pushToBill()
      }
    }
  }
}
</script>
