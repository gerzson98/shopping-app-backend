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
        <Input @muted="importFromInput" :logicalIndicator="inputIndicator" :options="productNames" class="inputBox"/>
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
      <h1>NL name: {{ newLine.name }} NL Price: {{ newLine.price }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../services/URL.json'
import Input from '../views/input'
import debounce from 'lodash/debounce'

export default {
  name: 'Add',
  data () {
    return {
      inputIndicator: 'Add new',
      forceReRenderKey: 0,
      location: 'CBA',
      productNames: [],
      newLine: {
        name: null,
        trademark: null,
        unitSize: null,
        unitType: null,
        quantity: null,
        price: null
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
  async created () {
    this.debouncer = debounce(function () {
      if (this.pushNeeded) {
        this.pushToBill()
      }
    }, 350)
    await this.getOptions()
  },
  computed: {
    pushNeeded: function () {
      return this.newLine.name && this.newLine.price
    }
  },
  methods: {
    debouncer: function () {},
    importFromInput (value) {
      this.newLine.name = value
    },
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
      this.bill = [this.line]
    },
    pushToBill () {
      this.bill.push(this.newLine)
      this.newLine = {
        name: null,
        trademark: null,
        unitSize: null,
        unitType: null,
        quantity: null,
        price: null
      }
    },
    async getOptions () {
      const res = await axios.get(URL.product.getAllName)
      this.productNames = res.data
      this.productNames.push('Add new')
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
  },
  components: {
    Input
  }
}
</script>
