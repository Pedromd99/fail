var vm = new Vue({
  el: '#app',
  data: {
    password: '',
    password2: '',
  },

  methods: {

    new_pass: function() {
      var pass = (this.password);
      var pass2 = (this.password2);
      var urlParams = new URLSearchParams(window.location.search);
      var id = (urlParams.get('id'))
      console.log(id);
      if (pass != pass2) {
        $('#clickme').on('click')
        $('#alert_placeholder').html('<div class="alert alert-danger"><span>"La dirección de correo electrónico no existe"</span></div>')
        return false;
      } else {
        this.$http.put('http://127.0.0.1:8000/reset/' + urlParams.get('id') + '/',
        {
          password: pass,
          id: id
        })
        .then((response) => {
          window.location.replace("index.html");

          return true;
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },


    // tt: function () {
    //   console.log(window.location.search);
    //   var urlParams = new URLSearchParams(window.location.search);
    //   console.log(urlParams.get('id'));
    //   console.log(urlParams.getAll('id'));
    //   localStorage.id = urlParams.get('id')
    // }
  }
})
