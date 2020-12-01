<template>
  <div>
    <div v-if="isInput">
      <input v-model="chosenName" type="text">
    </div>
    <div v-else>
      <select v-model="chosenName">
        <option v-for="(item, index) in optionList" :key="index">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script>

import debounce from 'lodash/debounce'

export default {
  name: 'Input',
  data () {
    return {
      isInput: false,
      forceReRenderKey: 0,
      productNames: [],
      chosenName: null
    }
  },
  created () {
    this.debouncer = debounce(function () {
      if (this.pushNeeded) {
        this.pushToBill()
      }
    }, 350)
  },
  methods: {
    debouncer: function () {}
  },
  computed: {
    addIndicator: function () {
      console.log(this.logicalIndicator)
      return this.logicalIndicator
    },
    optionList: function () {
      return this.options
    }
  },
  watch: {
    chosenName: {
      immediate: true,
      handler: function () {
        if (this.chosenName === 'Add new') {
          this.chosenName = null
          this.isInput = true
        }
        if (this.isInput && this.chosenName === '') this.isInput = false
        this.$emit('muted', this.chosenName)
      }
    }
  },
  props: {
    logicalIndicator: {
      type: String,
      default: 'Add new'
    },
    options: {
      type: Array,
      requiered: true
    }
  }
}
</script>
