<template>
  <div class="home" :key="forceReRenderKey">
    <nav class="mainMenu">
      <div class="mainMenu">
      <router-link class="mainMenu" :to="{ name: 'Add' }">Add another bill</router-link>
      </div>
      <div class="mainMenu">
      <router-link class="mainMenu" :to="{ name: 'Info' }">Lets see some computed data</router-link>
      </div>
      <div class="mainMenu">
      <router-link class="mainMenu" :to="{ name: 'AddList' }">Add a new shopping list!</router-link>
      </div>
      <div class="mainMenu">
      <router-link class="mainMenu" :to="{ name: 'List' }">Let's check our shopping list!</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      forceReRenderKey: 0
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
