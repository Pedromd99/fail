var vm = new Vue({
  el: '#app',
  data: {
    username: "",
    password: "",
  },
  methods: {
    postapi: function() {

      var user = (this.username);
      var pass = (this.password);

      this.$http.post('http://127.0.0.1:8000/api-token-auth/', {username: user, password: pass})
      .then((response) => {
        this.loading = false;
        localStorage.token = response.data.token;
        localStorage.name = this.username;
        var datos = localStorage.todo = response;
        
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
// console.log(vm);
