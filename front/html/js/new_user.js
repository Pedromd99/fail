var vm = new Vue({
  el: '#app',

  data: {
    Datos: [],
    loading: false,
  },
  mounted: function() {
    this.verify();
    this.getDatos();
  },
  methods: {
    getDatos: function () {
      this.loading = true;
      this.$http.get('http://127.0.0.1:8000/user/', {
        headers: {
          Authorization: "Token " + (localStorage.token),
        },
      })
      .then((response) => {
        this.loading = false;
        console.log(response);
        this.Datos = response.data;
      })
      .catch((response) => {
        this.loading = false
        console.log(err);
      })
    },
    postadd: function() {
      console.log(user, pass, pass_conf);
      this.loading = true;
      this.$http.post('http://127.0.0.1:8000/user/',{}, {
        headers: {
          Authorization: "Token " + (localStorage.token),
        },
      })
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
    verify: function() {
      this.loading = true;
      this.$http.post('http://127.0.0.1:8000/api-token-verify/', {
          token: localStorage.token
        })
        .then((response) => {
          localStorage.token = response.data.token;

          // this.tareas = response.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          window.location.replace("/");
          console.log(err);
        })
    },
  },
})
