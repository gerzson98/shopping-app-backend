<template>
  <div class="view">
    <table class="shoppingList">
      <caption class="shoppingList">Shopping plans to go</caption>
      <tr v-for="item in list" :key="item.id" class="shoppingList">
        <th v-for="(property, index) in item" :key="index" class="shoppingList">
          <p>{{ property }}</p>
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
      list: [{
        id: 'ID',
        name: 'Product name',
        trademark: 'Trademark',
        unitType: 'Unit type',
        quantity: 'Quantity'
      }]
    }
  },
  async mounted () {
    await this.getList()
  },
  methods: {
    getList: async function () {
      const response = await axios.get(URL.list.getList)
      response.data.forEach(element => {
        this.list.push(element)
      })
    }
  }
}
</script>
