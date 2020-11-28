<template>
  <div class="home" :key="forceReRenderKey">
    <nav class="mainMenu">
      <div class="mainMenu">
      <router-link class="mainMenu" :to="{ name: 'Test' }">Let's go testing shiet</router-link>
      </div>
      <div class="mainMenu">
      <router-link class="mainMenu" :to="{ name: 'Add' }">Add another bill</router-link>
      </div>
      <div class="mainMenu">
      <router-link class="mainMenu" :to="{ name: 'Info' }">Lets see some computed data</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL_READ = 'http://localhost:5000/product/getallproducts'
const API_URL_GETALLPURCHASES = 'http://localhost:5000/purchases/getallpurchases'
const API_URL_ADD_SHOPPING = 'http://localhost:5000/purchases/addshopping'
const API_URL_DELETE_PURCHASES = 'http://localhost:5000/purchases/delete'
const API_URL_DELETE_PRODUCTS = 'http://localhost:5000/product/erase'
const API_URL_FAVSHOP = 'http://localhost:5000/purchases/favshop'
const API_URL_SPENT = 'http://localhost:5000/purchases/spent'
export default {
  name: 'App',
  data () {
    return {
      forceReRenderKey: 0,
      inputLinesQuantity: 1,
      moneySpent: 0,
      dataToSend: [{
        name: 'testName',
        trademark: 'testTrademark',
        location: 'CBA',
        price: 100,
        unitSize: 500,
        unitType: 'ml',
        quantity: 1
      }],
      products: [],
      purchases: []
    }
  },
  computed: {
    adat: function () {
      return this.products
    }
  },
  methods: {
    async getMoneySpent () {
      await axios.get(API_URL_SPENT)
        .then(response => {
          this.moneySpent = response.data
        })
    },
    async deletePurchases () {
      await axios.post(API_URL_DELETE_PURCHASES)
    },
    async deleteProducts () {
      await axios.post(API_URL_DELETE_PRODUCTS)
    },
    async sendRequestProducts () {
      await axios.get(API_URL_READ)
        .then(response => {
          this.products = response.data
        })
    },
    async sendRequestPurchases () {
      await axios.get(API_URL_GETALLPURCHASES)
        .then(response => {
          this.purchases = response.data
        })
    },
    async getFavShop () {
      // Miért kell ezt csinálni? Mármint hogy ide si beírom...
      const MSG = {
        basedOn: this.basedOn
      }
      await axios.post(API_URL_FAVSHOP, MSG)
        .then(response => {
          if ((typeof response.data) === 'string') {
            this.favouriteShop = response.data
          } else {
            this.favouriteShop = 'Nem jó a válasz típusa'
          }
        })
    },
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
