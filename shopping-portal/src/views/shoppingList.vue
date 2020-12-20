<template>
<div class="view">
    <button @click="inputMode = true">Muting view</button>
    <button @click="inputMode = false">Normal view</button>
  <div v-if="inputMode" class="view">
    <table class="shoppingList">
      <caption class="shoppingList">Muteable shopping list:</caption>
      <tr v-for="(item, index) in list" :key="index">
        <bill-line :lineData="validate(item)" :parent="'shoppingList'" @muted="item = $event" @requestDelete="deleteLine(index)" />
      </tr>
    </table>
    <button id="submitButton" @click="sendUpdate">Save changes</button>
  </div>
  <div v-else class="view">
    <table class="shoppingList">
      <caption class="shoppingList">Shopping plans to go</caption>
      <tr><th><p>Product name</p></th><th><p>Trademark</p></th><th><p>Quantity</p></th></tr>
      <tr v-for="item in list" :key="item.id" class="shoppingList">
        <td class="shoppingList">{{ item.name }}</td>
        <td class="shoppingList">{{ item.trademark }}</td>
        <td class="shoppingList">{{ item.quantity }} {{ item.unitType }}</td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import URL from '../services/URL.json'
import BillLine from '../components/billLine.vue'

export default {
  name: 'Test',
  data () {
    return {
      inputMode: false,
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
          this.list.push(this.renameProps(element))
        })
      } catch (error) {
        alert('err', error)
        console.log(error)
      }
    },
    renameProps (element) {
      return {
        id: element.id,
        name: element.name,
        trademark: element.trademark,
        unitSize: 1,
        unitType: element.unit_type,
        quantity: element.quantity
      }
    },
    validate (line) {
      if (!line.trademark) line.trademark = 'not_given'
      if (!line.unitSize) line.unitSize = 1
      if (!line.unitType) line.unitType = 'db'
      if (!line.quantity) line.quantity = 1
      return line
    },
    sendUpdate: async function () {
      this.list.forEach(el => {
        el = this.validate(el)
      })
      try {
        await axios.post(URL.list.update, this.list)
        alert('Succesfull update!')
        this.getList()
      } catch (error) {
        alert('Error!', error)
        console.log(error)
      }
    },
    deleteLine (index) {
      this.list = this.list.splice(index, 1)
    }
  },
  components: {
    BillLine
  }
}
</script>
