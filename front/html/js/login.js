var vm = new Vue ({
  el: '#app',
  data: {
    loading: false,
    username:"",
    password:"",
  },
  methods: {
    postapi: function (data) {
      var usus = (this.username);
      var pass = (this.password);
      console.log(usus, pass);
      this.loading = true;
      this.$http.post('http://127.0.0.1:8000/api-token-auth/',{username:usus, password:pass})
      .then((reponse) =>{
          localStorage.token = data.token;
          console.log(data.token);
          // window.location.replace("tareas.html");
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      })
    },
  }

})
