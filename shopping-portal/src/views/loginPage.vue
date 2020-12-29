<template>
  <div class="view">
    <input id="pwIn" type="password" placeholder="Password" v-model="pw" :disabled="locked" @mouseover="hovered = true" @mouseleave="hovered = false">
    <button @click="sendCheck" :disabled="locked" @mouseover="hovered = true" @mouseleave="hovered = false">Submit</button>
    <button @click="switchHidden">Show / Hide password text</button>
    <br>
    <label v-if="hovered && locked" for="pwIn">You are banned from logging in.</label>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../services/URL.json'

export default {
  name: 'LogIn',
  data () {
    return {
      hovered: false,
      locked: null,
      hidden: true,
      pw: ''
    }
  },
  mounted () {
    axios.get(URL.login.lock)
      .then(response => {
        this.locked = response.data.locked
        const remaining = response.data.until - Date.now()
        setTimeout(function () {
          this.locked = false
        },
        remaining)
      })
  },
  methods: {
    sendCheck: async function () {
      const MSG = {
        pw: this.pw
      }
      axios.post(URL.login.pwcheck, MSG)
        .then(response => {
          const { dispatch } = this.$store
          const approved = response.data.approved
          dispatch('LOGIN', approved)
          this.locked = response.data.locked
          const until = response.data.until
          if (approved) {
            alert('Succesfull login!')
            this.$emit('loggedIn')
          } else {
            alert('Invalid password.')
            console.log(until)
            if (this.locked) this.lockIt(until)
          }
        })
    },
    lockIt (until) {
      alert('Too many invalid passwords. You are disabled for a while.')
      let time
      if (!until) time = 30000
      else time = until - Date.now()
      setTimeout(function () {
        this.locked = false
      },
      time)
    },
    switchHidden () {
      if (this.hidden) this.hidden = false
      else this.hidden = true
    }
  },
  watch: {
    hidden: {
      handler: function () {
        const x = document.getElementById('pwIn')
        if (this.hidden) x.type = 'password'
        else x.type = 'text'
      }
    }
  }
}
</script>
