var vm = new Vue({
  el: '#app',

  data: {
    username:"dddd",
    email:"sebaspete123@gmail.com",
    first_name:"eeeee",
    last_name:"ffgfg",
    password:"1234qwer",
    password2:"1234qwer",
    is_staff:true,
    // loading: false,
  },
  mounted: function() {
  },
  methods: {
    register: function() {
      var user = (this.username);
      var pass = (this.password);
      var pass2 = (this.password2);
      var email = (this.email);
      var fn = (this.first_name);
      var ln = (this.last_name);
      var staff = (this.is_staff);
      this.$http.post('http://127.0.0.1:8000/user/', {is_staff: staff, username: user, password: pass, email: email, first_name: fn, last_name: ln})
      .then((response) => {
        console.log(response);
        if (pass != pass2) {
          alert("La contraseña no coinciden")
          return false;
        } else {
          alert('Account created')
          window.location.replace("tareas.html");
          return true;
        }


      })
      .catch((err) => {
        console.log(err);
        console.log('Fail');
      })
    },
    // valido: function () {
    //   var pass = this.password
    //   var pass2 = this.password2
    //
    // },
  },
})
