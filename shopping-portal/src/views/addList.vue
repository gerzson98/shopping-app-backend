<template>
  <div class="view">
    <div>
      <p>Planned location(not necessary): </p>
      <input v-model="location" placeholder="Location" />
    </div>
    <p>
      Planning to buy;
    </p>
    <div class="container">
      <bill-line v-for="(item, index) in bill" :key="index" :lineData="item" :parent="'List'" @muted="Refresh(index)" @requestDelete="delMethod(index)" />
      <input-line @pushNeeded="pushToBill" :pNames="productNames" :parent="'List'" />
    </div>
      <div>
        <button id="submitButton" @click="SendUpdate()">Save</button>
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
      location: null,
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
        msg: this.bill
      }
      try {
        const answer = await axios.post(URL.list.addList, MSG)
        if (answer.status === 200) {
          alert('Your save was succesfull!')
          this.location = null
          this.bill = [{
            name: null,
            trademark: null,
            unitSize: null,
            unitType: null,
            quantity: null,
            price: null
          }]
        } else {
          alert('Ooops something went wrong!\n If you have experienced this multiple times, it is an error at us!\nWe will work on it! Promise!')
        }
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
