var vm = new Vue({
  el: '#app',
  data: {
    email: '',
  },
  methods: {
    send_mail: function() {
      this.$http.post('http://127.0.0.1:8000/send_mail/', {
        email: this.email
      })
      .then((response) => {
        window.location.replace("pass_reset_done.html");
      })
      .catch((err) => {
        console.log(err);
      })
    },
  }
})
