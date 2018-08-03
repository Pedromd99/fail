var vm = new Vue({
  el: '#app',

  data: {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    is_staff: false,
  },
  mounted: function() {},
  methods: {
    register: function() {
      var user = (this.username);
      var pass = (this.password);
      var pass2 = (this.password2);
      var email = (this.email);
      var fn = (this.first_name);
      var ln = (this.last_name);
      var staff = (this.is_staff);

      if (pass != pass2) {
        alert("La contraseña no coinciden")
        return false;
      } else {
        this.$http.post('http://127.0.0.1:8000/form/', {
            is_staff: staff,
            username: user,
            password: pass,
            email: email,
            first_name: fn,
            last_name: ln
          })
          .then((response) => {
            console.log(response);
            alert('Account created')
            window.location.replace("index.html");
            return true;
          })
          .catch((err) => {
            console.log(err);
            console.log('Fail');
          })
      }
    },
  },
})
