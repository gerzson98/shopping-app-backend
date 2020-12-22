<template>
  <div>
    <input id="pwIn" type="password" placeholder="Password" v-model="pw" :disabled="locked">
    <button @click="sendCheck" :disabled="locked">Submit</button>
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
        console.log('Locked: ', this.locked, 'Remaining: ', remaining)
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
          this.approved = response.data.approved
          this.locked = response.data.locked
          const duration = response.data.duration
          if (this.approved) {
            alert('Succesfull login!')
            this.$emit('loggedIn')
          } else {
            alert('Invalid password.')
            if (this.locked) this.lockIt(duration)
          }
        })
    },
    lockIt (time) {
      alert('Too many invalid passwords. You\'re not gonna be able to modify pw for', time, 'sec.')
      if (!time) time = 30000
      else time *= 1000
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
  },
  props: {
    approved: {
      type: Boolean,
      default: false
    }
  }
}
</script>
