var vm = new Vue({
  el: '#app',
  data: {
    username: "",
    password: "",
  },

  mounted: function() {
    this.cubrir();

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
        document.cookie = "username="+ this.username
        window.location.replace("tareas.html");
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
        $('#clickme').on('click')
        $('#alert_placeholder').html('<div class="alert alert-danger"><span>"Usuario o contraseña incorrecorrectos"</span></div>')
      })
    },

    cubrir: function () {
      var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      this.username = cookieValue
    },

    // recordar: function () {
    //   document.cookie = "username="+ this.username
    //
    //   var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // },
  },
})
// console.log(vm);
