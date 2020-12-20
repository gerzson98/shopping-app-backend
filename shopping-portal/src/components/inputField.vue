<template>
  <div v-if="isInput">
    <input v-model="choice" type="text">
  </div>
  <div v-else>
    <select v-model="choice">
      <option v-for="(item, index) in optionList" :key="index">{{ item }}</option>
    </select>
  </div>
</template>

<script>

import debounce from 'lodash/debounce'

export default {
  name: 'inputField',
  data () {
    return {
      isInput: false
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
      return this.logicalIndicator
    },
    optionList: function () {
      return this.options
    }
  },
  watch: {
    choice: {
      immediate: true,
      handler: function () {
        if (this.choice === 'Add new') {
          this.choice = null
          this.isInput = true
        }
        if (this.isInput && this.choice === '') {
          this.isInput = false
        }
        this.$emit('muted', this.choice)
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
    },
    choice: {
      type: String,
      default: null
    }
  }
}
</script>
