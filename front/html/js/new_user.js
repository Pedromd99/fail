var vm = new Vue({
  el: '#app',
  data: {
    loading: false,
    Username: "",
    Email_address: "",
    Password: "",
    Password_confirmation:"",
  },

  methods: {
    postadd: function() {
      var user = (this.Username);
      var pass = (this.Password);
      var pass_conf =(this.Password_confirmation);
      console.log(user, pass, pass_conf);
      this.loading = true;
      this.$http.post('http://127.0.0.1:8000/admin/auth/user/add/', {Username: user, Password: pass, Password_confirmation: pass_conf })
      .then((response) => {
        this.loading = false;
        console.log(response);
        window.location.replace("index.html");
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      })
    },
  },
})
