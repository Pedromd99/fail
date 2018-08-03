var vm = new Vue({
  el: '#app',
  data: {
    password: '',
    password2: '',
    currentUser: {},
    User: {},
    Tareas: [],
    newTarea: {
      'description': null,
      'pending': true,
      'id_name': null,
    },
    currentTarea: {},
    delTareas: [],
    loading: false,
    token: localStorage.token,
    name: localStorage.name,
    // local: localStorage.todo
  },
  mounted: function() {
    this.getUser();
    this.verify();
    this.getTareas();
  },
  methods: {
    change_data: function () {
      var ln = (this.User.last_name);
      var fn = (this.User.first_name);
      var pass = (this.User.password);
      var usu = (this.User.username);
      var email = (this.User.email);
      var pass2 = (this.password);


      this.$http.put('http://127.0.0.1:8000/user/' + this.User.id + '/', {
          first_name: fn, last_name: ln, password: pass, username: usu, email: email,
        }, {
          headers: {
            Authorization: "Token " + (localStorage.token)
          },
        })
        .then((response) => {
          console.log('ok');
          console.log(response);
          $('#name').modal('hide');
        })
        .catch((err) => {
          console.log(err);
        })
    },


    change_pass: function() {
      var pass = (this.password);
      var pass2 = (this.password2);
      var ln = (this.User.last_name);
      var fn = (this.User.first_name);
      var usu = (this.User.username);
      var email = (this.User.email);
      console.log(pass, ln, fn, usu, email);
      if (this.password != this.password2) {
        alert("La contraseña no coinciden")
        return false;
      } else {
        this.$http.put('http://127.0.0.1:8000/password/' + this.User.id + '/', {
           password: pass ,first_name: fn, last_name: ln, username: usu, email: email
          }, {
            headers: {
              Authorization: "Token " + (localStorage.token)
            },
          })
          .then((response) => {

            console.log('ok');
            console.log(response);
            $('#change').modal('hide');
            return true;
          })
          .catch((err) => {
            console.log(err);
          })
      }

    },

    rellenar: function() {
      this.newTarea.id_name = this.User.id
    },

    clearLS: function() {
      localStorage.clear();
    },

    getUser: function() {

      this.loading = true;
      this.$http.get('http://127.0.0.1:8000/user/', {
          headers: {
            Authorization: "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.User = response.data[0];
          localStorage.id = this.User.id
          this.id = localStorage.id
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
    getTareas: function() {
      this.loading = true;
      this.$http.get('http://127.0.0.1:8000/tareas/', {
          headers: {
            Authorization: "Token " + (localStorage.token),
          },
        })
        .then((response) => {

          this.Tareas = response.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })

    },

    getTarea: function(id) {
      this.loading = true;
      this.$http.get('http://127.0.0.1:8000/tareas/' + id + '/', {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.currentTarea = response.data;
          $("#edit").modal('show');
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },
    addTarea: function() {

      this.loading = true;
      this.$http.post('http://127.0.0.1:8000/tareas/', this.newTarea, {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.loading = false;
          this.Tareas.push(response.data);
          this.newTarea.description = "";
          $('#add').modal('hide');

        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },
    updateTarea: function(id) {
      this.loading = true;
      this.$http.put('http://127.0.0.1:8000/tareas/' + id + '/', this.currentTarea, {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          console.log(response);
          this.getTareas();
          $('#edit').modal('hide');
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },
    deleteTarea: function(id) {
      this.loading = true;
      this.$http.delete('http://127.0.0.1:8000/tareas/' + id + '/', {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },

    deleteTareas: function() {
      this.loading = true;
      for (var i = 0; i < this.Tareas.length; i++) {
        if (!this.Tareas[i].pending) {
          this.loading = true;
          this.$http.delete('http://127.0.0.1:8000/tareas/' + this.Tareas[i].id + '/', {
              headers: {
                "Authorization": "Token " + (localStorage.token),
              },
            })
            .then((response) => {
              this.loading = false;
              for (var i = 0; i < this.Tareas.length; i++) {
                if (!this.Tareas[i].pending) {
                  this.Tareas.pop(i);
                }
              }
            })
            .catch((err) => {
              this.loading = false;
              console.log(err);
            })
        }
      }
    },
    marcar: function(data) {
      data.pending = !data.pending;

      if (data.pending) {
        this.loading = true;
        this.$http.put('http://127.0.0.1:8000/tareas/' + data.id + '/', data, {
            headers: {
              "Authorization": "Token " + (localStorage.token),
            },
          })
          .then((response) => {
            this.loading = false;
            this.currentTarea = response.data;
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          })
      } else {
        this.loading = true;
        this.$http.put('http://127.0.0.1:8000/tareas/' + data.id + '/', data, {
            headers: {
              "Authorization": "Token " + (localStorage.token),
            },
          })
          .then((response) => {
            this.loading = false;
            this.currentTarea = response.data;
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          })
      }
    },
    // marcartodo: function check1(checkbox) {
    //   if (checkbox.checked){
    //     getElementsyild('checks').checked = true
    //   }else{
    //
    //   }
    // }
  },
});
