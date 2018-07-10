var vm = new Vue({
  el: '#app',
  data: {
    loading: false,
    username: "",
    password: "",
    // token:""
  },
  methods: {
    postapi: function() {
      var user = (this.username);
      var pass = (this.password);
      console.log(user, pass);
      this.loading = true;
      this.$http.post('http://127.0.0.1:8000/api-token-auth/', {username: user, password: pass})
      .then((response) => {
        this.loading = false;
        // this.commit('token', response.data.token);
        localStorage.token = response.data.token;
        console.log(response);
        window.location.replace("tareas.html");
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
        console.log('Fail');
      })
    },
  },
})
