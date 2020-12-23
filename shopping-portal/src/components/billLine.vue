<template>
  <div class="billLine">
    <input v-model="lineData.name" placeholder="Product name" class="billLine" />
    <input v-model="lineData.trademark" placeholder="Trademark's name" class="billLine" />
    <input v-if="parent !== 'shoppingList'" v-model="lineData.unitSize" placeholder="Unit size" class="billLine" />
    <select v-model="lineData.unitType" class="billLine">
      <option v-for="item in types" :key="item">{{ item }}</option>
    </select>
    <input type="number" v-model="lineData.quantity" placeholder="Pieces" class="billLine" />
    <input v-if="parent === 'addBill'" type="number" v-model="lineData.price" placeholder="Price" class="billLine" />
    <button @click="requestDelete" class="billLine">Del</button>
  </div>
</template>

<script>

import debounce from 'lodash/debounce'

export default {
  name: 'billLine',
  data () {
    return {
      types: [
        'db',
        'g',
        'ml',
        'kg',
        'l'
      ]
    }
  },
  methods: {
    requestDelete: function () {
      this.$emit('requestDelete')
    }
  },
  watch: {
    lineData: {
      immediate: true,
      handler: debounce(function () {
        this.$emit('muted', this.lineData)
      }, 700),
      deep: true
    }
  },
  props: {
    lineData: {
      type: Object,
      requiered: true
    },
    parent: {
      type: String,
      requiered: true
    }
  }
}
</script>
