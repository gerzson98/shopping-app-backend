<template>
  <div class="view">
    <table class="shoppingList">
      <caption class="shoppingList">Shopping plans to go</caption>
      <tr><th><p>Product name</p></th><th><p>Trademark</p></th><th><p>Quantity</p></th></tr>
      <tr v-for="item in list" :key="item.id">
        <th v-for="(property, index) in item" :key="index">
          {{ property }}
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../services/URL.json'
export default {
  name: 'Test',
  data () {
    return {
      list: []
    }
  },
  async mounted () {
    await this.getList()
  },
  methods: {
    getList: async function () {
      try {
        const response = await axios.get(URL.list.getList)
        response.data.forEach(element => {
          this.list.push(this.simplifyObject(element))
        })
      } catch (error) {
        alert('err', error)
        console.log(error)
      }
    },
    simplifyObject (element) {
      return {
        name: element.name,
        trademark: element.trademark,
        quantity: `${element.quantity} ${element.unit_type}`
      }
    }
  }
}
</script>
