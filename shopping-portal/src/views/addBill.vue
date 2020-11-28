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
        <input class="inputBox" v-model="item.unitSize" placeholder="Unit size" />
        <select class="inputBox" v-model="item.unitType">
          <option>db</option>
          <option>g</option>
          <option>ml</option>
          <option>kg</option>
          <option>l</option>
        </select>
        <input class="inputBox" v-model="item.quantity" placeholder="Pieces" />
        <input class="inputBox" v-model="item.price" placeholder="Price" />
      </div>
      <div>
        <input class="inputBox" v-model="newLine.name" placeholder="Product name" />
        <input class="inputBox" v-model="newLine.trademark" placeholder="Trademark's name" />
        <input class="inputBox" v-model="newLine.unitSize" placeholder="Unit size" />
        <select class="inputBox" v-model="newLine.unitType">
          <option>db</option>
          <option>g</option>
          <option>ml</option>
          <option>kg</option>
          <option>l</option>
        </select>
        <input class="inputBox" v-model="newLine.quantity" placeholder="Pieces" />
        <input class="inputBox" v-model="newLine.price" placeholder="Price" />
      </div>
      <div>
        <button id="submitButton" @click="SendUpdate()">Submit</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import debounce from 'lodash/debounce'
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
        unitSize: '',
        unitType: '',
        quantity: '',
        price: ''
      },
      bill: [{
        name: 'Snickers',
        trademark: 'Snickers',
        unitSize: 50,
        unitType: 'g',
        quantity: 1,
        price: 200
      }]
    }
  },
  created: function () {
    this.debouncer = debounce(function () {
      if (this.pushNeeded) {
        this.pushToBill()
      }
    },
    350)
  },
  computed: {
    pushNeeded: function () {
      return this.newLine.name !== '' && this.newLine.price !== ''
    }
  },
  methods: {
    debouncer: function () {},
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
        unitSize: '',
        unitType: '',
        quantity: '',
        price: ''
      }]
    },
    pushToBill () {
      this.bill.push(this.newLine)
      this.newLine = {
        name: '',
        trademark: '',
        unitSize: '',
        unitType: '',
        quantity: '',
        price: ''
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
    newLine: {
      handler: function () {
        this.debouncer()
      },
      deep: true
    }
  }
}
</script>
