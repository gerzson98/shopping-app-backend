<template>
  <div>
    <input v-model="lineData.name" placeholder="Product name" class="cell" />
    <input v-model="lineData.trademark" placeholder="Trademark's name" class="cell" />
    <input v-model="lineData.unitSize" placeholder="Unit size" class="cell" />
    <select v-model="lineData.unitType" class="cell">
      <option v-for="item in types" :key="item">{{ item }}</option>
    </select>
    <input type="number" v-model="lineData.quantity" placeholder="Pieces" class="cell" />
    <input type="number" v-model="lineData.price" placeholder="Price" class="cell" />
    <button @click="requestDelete">Del</button>
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
    debouncer: function () {},
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
    }
  }
}
</script>
