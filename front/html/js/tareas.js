var vm = new Vue({
  el: '#app',
  data: {
    isChecked: false,
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
  },
  mounted: function() {
    this.getUser();
    this.verify();
    this.getTareas();
  },
  methods: {
    change_data: function() {
      var ln = (this.User.last_name);
      var fn = (this.User.first_name);
      var pass = (this.User.password);
      var usu = (this.User.username);
      var email = (this.User.email);
      var pass2 = (this.password);


      this.$http.put('http://127.0.0.1:8000/user/' + this.User.id + '/', {
          first_name: fn,
          last_name: ln,
          password: pass,
          username: usu,
          email: email,
        }, {
          headers: {
            Authorization: "Token " + (localStorage.token)
          },
        })
        .then((response) => {
          $('#name').modal('hide');
        })
        .catch((err) => {
          console.log(err);
        })
    },

    change_pass: function() {
      var pass = (this.password);
      var pass2 = (this.password2);
      var usu = (this.User.username);
      var ln = (this.User.last_name);
      var fn = (this.User.first_name);
      var email = (this.User.email);
      if (this.password != this.password2) {
        alert("La contraseña no coinciden")
        return false;
      } else {
        this.$http.put('http://127.0.0.1:8000/password/' + this.User.id + '/', {
            password: pass,
            first_name: fn,
            last_name: ln,
            username: usu,
            email: email
          }, {
            headers: {
              Authorization: "Token " + (localStorage.token)
            },
          })
          .then((response) => {
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
          console.log(err);
        })
    },

    verify: function() {
      this.$http.post('http://127.0.0.1:8000/api-token-verify/', {
          token: localStorage.token
        })
        .then((response) => {
          localStorage.token = response.data.token;
        })
        .catch((err) => {
          window.location.replace("/");
          console.log(err);
        })
    },
    getTareas: function() {
      this.$http.get('http://127.0.0.1:8000/tareas/', {
          headers: {
            Authorization: "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.Tareas = response.data;
        })
        .catch((err) => {
          console.log(err);
        })

    },

    getTarea: function(id) {
      this.$http.get('http://127.0.0.1:8000/tareas/' + id + '/', {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.currentTarea = response.data;
          $("#edit").modal('show');
        })
        .catch((err) => {
          console.log(err);
        })
    },
    addTarea: function() {
      this.$http.post('http://127.0.0.1:8000/tareas/', this.newTarea, {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.Tareas.push(response.data);
          this.newTarea.description = "";
          $('#add').modal('hide');
        })
        .catch((err) => {
          console.log(err);
        })
    },
    updateTarea: function(id) {
      this.$http.put('http://127.0.0.1:8000/tareas/' + id + '/', this.currentTarea, {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {
          this.getTareas();
          $('#edit').modal('hide');
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteTarea: function(id) {
      this.$http.delete('http://127.0.0.1:8000/tareas/' + id + '/', {
          headers: {
            "Authorization": "Token " + (localStorage.token),
          },
        })
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        })
    },

    deleteTareas: function() {
      for (var i = 0; i < this.Tareas.length; i++) {
        if (!this.Tareas[i].pending) {
          this.$http.delete('http://127.0.0.1:8000/tareas/' + this.Tareas[i].id + '/', {
              headers: {
                "Authorization": "Token " + (localStorage.token),
              },
            })
            .then((response) => {
              for (var i = 0; i < this.Tareas.length; i++) {
                if (!this.Tareas[i].pending) {
                  this.Tareas.pop(i);
                }
              }
            })
            .catch((err) => {
              console.log(err);
            })
        }
      }
    },
    marcar: function(data) {
      data.pending = !data.pending;

      if (data.pending) {
        this.$http.put('http://127.0.0.1:8000/tareas/' + data.id + '/', data, {
            headers: {
              "Authorization": "Token " + (localStorage.token),
            },
          })
          .then((response) => {
            this.currentTarea = response.data;
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        this.$http.put('http://127.0.0.1:8000/tareas/' + data.id + '/', data, {
            headers: {
              "Authorization": "Token " + (localStorage.token),
            },
          })
          .then((response) => {
            this.currentTarea = response.data;
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },

    marcartodo: function() {
      for (var i = 0; i < this.Tareas.length; i++) {
        if (this.Tareas[i].pending == true) {
          this.Tareas[i].pending = false
          this.$http.put('http://127.0.0.1:8000/tareas/' + this.Tareas[i].id + '/', this.Tareas[i], {
              headers: {
                "Authorization": "Token " + (localStorage.token),
              },
            })
            .then((response) => {
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
          if (this.Tareas[i].pending == false) {
            this.Tareas[i].pending = true
            this.$http.put('http://127.0.0.1:8000/tareas/' + this.Tareas[i].id + '/', this.Tareas[i], {
              headers: {
                "Authorization": "Token " + (localStorage.token),
              },
            })
            .then((response) => {

            })
            .catch((err) => {
              console.log(err);
            })
          }else {
            this.Tareas[i].pending = false
            this.$http.put('http://127.0.0.1:8000/tareas/' + this.Tareas[i].id + '/', this.Tareas[i], {
              headers: {
                "Authorization": "Token " + (localStorage.token),
              },
            })
            .then((response) => {

            })
            .catch((err) => {
              console.log(err);
            })
          }
        }

      }
    },

  },
});
