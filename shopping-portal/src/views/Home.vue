<template>
  <div class="home">
      <div v-for="(item, index) in products" :key="index">
        <p>{{item.name}}</p>
      </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:5000/'
export default {
  name: 'Home',
  data () {
    return {
      products: []
    }
  },
  async mounted () {
    const result = await fetch(API_URL)
    this.products = result.data
  }
}
</script>
