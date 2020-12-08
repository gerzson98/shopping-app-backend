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
        <input class="inputBox" type="number" v-model="item.quantity" placeholder="Pieces" />
        <input class="inputBox" type="number" v-model="item.price" placeholder="Price" />
      </div>
      <InputLine @pushNeeded="pushToBill" :pNames="productNames" />
      <div>
        <button id="submitButton" @click="SendUpdate()">Submit</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../services/URL.json'
import InputLine from '../components/inputLine.vue'

export default {
  name: 'Add',
  data () {
    return {
      inputIndicator: 'Add new',
      location: 'CBA',
      productNames: [],
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
  async created () {
    await this.getPNames()
  },
  methods: {
    async SendUpdate () {
      const MSG = {
        location: this.location,
        data: this.bill
      }
      try {
        await axios.post(URL.purchase.add, MSG)
      } catch (error) {
        console.log('err', error)
      }
      this.location = null
      this.bill = {
        name: null,
        trademark: null,
        unitSize: null,
        unitType: null,
        quantity: null,
        price: null
      }
    },
    pushToBill (line) {
      this.bill.push(line)
    },
    async getPNames () {
      const res = await axios.get(URL.product.getAllName)
      this.productNames = res.data.sort()
      this.productNames.push('Add new')
    }
  },
  watch: {
    newLine: {
      handler: function () {
        this.debouncer()
      },
      deep: true
    }
  },
  components: {
    InputLine
  }
}
</script>
