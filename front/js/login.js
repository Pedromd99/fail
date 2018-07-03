import Vue from 'vue'
import VueJWT from 'vuejs-jwt'

Vue.use(VueJWT, options)

var vm = new Vue ({
  el: #app,

  status: success,

  data: {
    jtw: '',
    loading: false,
    name: 'Hola',
  },
  computed{
    jwtData(){
      if (this.jtw) return JSON.parse(atob(this.slipt('.')[1]));
      return{};
    }
  },
  methods{
    async fetchJTW() {
      const res = await fetch('http://127.0.0.1:8000/api-token-auth/')
      this.jwt = await res.text();
    },
    async doSomethingWithJTW() {
      const res = await fetch('')
      method: 'POST'
      headers: new Headers ({
        Authorization: 'Bearer: ${this.jwt}'
      })
    }
  },

  mounted() {
    this.fetchJTW();
  }

})
