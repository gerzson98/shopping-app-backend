<template>
  <div class="view">
    <div>
      <p>Shop: </p>
      <input v-model="location" placeholder="Location" />
    </div>
    <p>
      Purchased stuff;
    </p>
    <div class="container">
      <bill-line v-for="(item, index) in bill" :key="index" :lineData="item" :parent="'addBill'" @muted="Refresh(index)" @requestDelete="delMethod(index)" />
      <input-line @pushNeeded="pushToBill" :pNames="productNames" :parent="'addBill'" />
    </div>
      <div>
        <button id="submitButton" @click="SendUpdate()">Submit</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../services/URL.json'
import InputLine from '../components/inputLine.vue'
import BillLine from '../components/billLine.vue'

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
        this.location = null
        this.bill = [{
          name: null,
          trademark: null,
          unitSize: null,
          unitType: null,
          quantity: null,
          price: null
        }]
        alert('Succesfull upload!')
      } catch (error) {
        alert('err', error)
        console.log(error)
      }
    },
    Refresh (value, index) {
      this.bill[index] = value
    },
    delMethod (index) {
      this.bill.splice(index, 1)
    },
    validate (line) {
      if (!line.trademark) line.trademark = this.location
      if (!line.unitSize) line.unitSize = 1
      if (!line.unitType) line.unitType = 'db'
      if (!line.quantity) line.quantity = 1
      return line
    },
    pushToBill (line) {
      this.bill.push(this.validate(line))
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
    InputLine,
    BillLine
  }
}
</script>
