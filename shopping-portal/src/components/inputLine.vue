<template>
  <div class="inputBox">
    <Input @muted="gotName"  :options="pNames" class="inputBox" placeholder="Product name" />
    <input class="inputBox" v-model="lineData.trademark" placeholder="Trademark's name" />
    <input class="inputBox" v-model="lineData.unitSize" placeholder="Unit size" />
    <select class="inputBox" v-model="lineData.unitType">
      <option>db</option>
      <option>g</option>
      <option>ml</option>
      <option>kg</option>
      <option>l</option>
    </select>
    <input class="inputBox" type="number" v-model="lineData.quantity" placeholder="Pieces" />
    <input class="inputBox" type="number" v-model="lineData.price" placeholder="Price" />
  </div>
</template>

<script>

// import axios from 'axios'
// import URL from '../services/URL.json'
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
      trademarks: [],
      chosenName: null
    }
  },
  methods: {
    debouncer: function () {},
    gotName: function (value) {
      this.lineData.name = value
      /*
      getTrademarks: async function (name) {
        awios.post(URL.products.getTrademarks, name)
          .then(response => {
            this.trademarks = response.data
          })
      }
      */
    }
  },
  computed: {
    pushNeeded: function () {
      if (this.lineData.name !== null && this.lineData.name !== this.logicalIndicator && this.lineData.price !== 0 && this.lineData.price !== null) {
        return true
      } else {
        return false
      }
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
    } /* ,
    lineData.name: {
      immediate: true,
      handler: async function () {
        await getTrademarks ()
      }
    } */
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
    }
  }
}
</script>
