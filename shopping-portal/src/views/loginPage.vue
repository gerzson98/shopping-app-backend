<template>
  <div>
    <input id="pwIn" type="password" placeholder="Password" v-model="pw" :disabled="locked">
    <button @click="sendCheck">Submit</button>
    <button @click="switchHidden">Show / Hide password text</button>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../services/URL.json'

export default {
  name: 'LogIn',
  data () {
    return {
      locked: false,
      hidden: true,
      pw: '',
      tryCounter: 1
    }
  },
  methods: {
    sendCheck: async function () {
      const MSG = {
        pw: this.pw
      }
      axios.post(URL.login.pwcheck, MSG)
        .then(response => {
          this.approved = response.data.approved
          if (!this.approved) {
            this.tryCounter++
            alert('Invalid password.')
            if (this.tryCounter > 5) this.lockIt(30)
          } else {
            alert('Succesfull login!')
            this.$emit('loggedIn', true)
          }
        })
    },
    lockIt (time) {
      if (!time) time = 30000
      else time *= 1000
      this.locked = true
      alert('Too many invalid passwords. You\'re not gonna be able to modify pw for 30sec.')
      setTimeout(function () {
        this.locked = false
        this.tryCounter = 1
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
        if (this.hidden) {
          x.type = 'password'
        } else {
          x.type = 'text'
        }
      }
    }
  },
  props: {
    approved: {
      type: Boolean,
      default: false
    }
  }
}
</script>
