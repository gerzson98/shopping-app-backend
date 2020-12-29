<template>
  <div class="home">
    <div v-if="approved">
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
    <div v-else>
      <login-page :approved="approved" @loggedIn="approved = true" />
    </div>
  </div>
</template>

<script>
import LoginPage from './views/loginPage.vue'

export default {
  name: 'App',
  store: store,
  data () {
    return {
      approved: this.$store.loggedIn
    }
  },
  mounted () {
    console.log(this.$store.loggedIn)
  },
  components: {
    LoginPage
  }
}
</script>
