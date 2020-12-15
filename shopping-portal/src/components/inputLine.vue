<template>
  <div class="container">
    <Input @muted="gotName" :options="pNames" placeholder="Product name" class="cell" />
    <Input @muted="gotTrademark" :options="trademarksToSend" placeholder="Trademark's name" class="cell" />
    <input v-model="lineData.unitSize" placeholder="Unit size" class="cell" />
    <select v-model="lineData.unitType" class="cell">
      <option v-for="item in types" :key="item" class="cell">{{ item }}</option>
    </select>
    <input type="number" v-model="lineData.quantity" placeholder="Pieces" class="cell" />
    <input v-if="parent === 'addBill'" type="number" v-model="lineData.price" placeholder="Price" class="cell" />
  </div>
</template>

<script>

import axios from 'axios'
import URL from '../services/URL.json'
import Input from '../components/inputField'
import debounce from 'lodash/debounce'

export default {
  name: 'inputLine',
  data () {
    return {
      lineData: {
        name: null,
        trademark: null,
        unitSize: null,
        unitType: 'db',
        quantity: null,
        price: null
      },
      types: [
        'db',
        'g',
        'ml',
        'kg',
        'l'
      ],
      trademarks: [],
      chosenName: null
    }
  },
  methods: {
    debouncer: function () {},
    gotName: function (value) {
      this.lineData.name = value
      this.getTrademarks(URL.product.getTrademark, value)
    },
    gotTrademark: function (value) {
      this.lineData.trademark = value
    },
    getTrademarks: async function (name) {
      const MSG = {
        msg: name
      }
      axios.post(URL.product.getTrademark, MSG)
        .then(response => {
          this.trademarks = []
          response.data.forEach(element => {
            this.trademarks.push(element.trademark)
          })
          this.trademarks.push('Add new')
        })
    }
  },
  computed: {
    pushNeeded: function () {
      if (this.parent === 'addBill') return this.lineData.name !== null && this.lineData.name !== this.logicalIndicator && this.lineData.price !== 0 && this.lineData.price !== null
      else if (this.parent === 'List') return this.lineData.name !== null && this.lineData.name !== this.logicalIndicator && this.lineData.trademark !== this.logicalIndicator && this.lineData.trademark !== null
      else {
        console.log('pushNeeded is not setup for this parent in inputLine.vue.')
        return false
      }
    },
    trademarksToSend: function () {
      return this.trademarks
    }
  },
  watch: {
    lineData: {
      immediate: true,
      handler: debounce(function () {
        if (this.pushNeeded) {
          this.$emit('pushNeeded', this.lineData)
          this.lineData = {
            name: null,
            trademark: null,
            unitSize: null,
            unitType: 'db',
            quantity: null,
            price: null
          }
        }
      }, 350),
      deep: true
    },
    'lineData.name': {
      immediate: true,
      handler: async function (value) {
        await this.getTrademarks(value)
      },
      deep: true
    }
  },
  components: {
    Input
  },
  props: {
    logicalIndicator: {
      type: String,
      default: 'Add new'
    },
    pNames: {
      type: Array,
      requiered: true
    },
    parent: {
      type: String,
      requiered: true
    }
  }
}
</script>
