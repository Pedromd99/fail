var vm = new Vue({
  el: '#app',

  data: {
    username:"",
    email:"",
    first_name:"",
    last_name:"",
    password:"",
    // loading: false,
  },
  mounted: function() {
  },
  methods: {
    register: function() {
      var user = (this.username);
      var pass = (this.password);
      var pass_conf = (this.password_confirmation);
      var email = (this.email);
      var fn = (this.first_name);
      var ln = (this.last_name);

      console.log(user, pass, email, fn, ln);
      // this.loading = true;
      this.$http.post('http://127.0.0.1:8000/user/', {username: user, password: pass, email: email, first_name: fn, last_name: ln})
      .then((response) => {
        console.log(response);
        this.loading = false;
        console.log(OK);
        // window.location.replace("tareas.html");
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
        console.log('Fail');
      })
    },
  },
})
