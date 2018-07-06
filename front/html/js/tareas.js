var vm = new Vue({
el: '#app',
  data: {
    tasks: [],
    taskstodelete: [],
    loading: false,
    message: null,
    new_task: {
      'description': null,
      'pending': true
    },
  },
  mounted: function() {
    this.getArticles();
  },
  methods: {
    getArticles: function() {
      this.loading = true;
      this.$http.get('http://127.0.0.1:8000/')
        .then((response) => {

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },
    getArticle: function(id) {
      this.loading = true;
      this.$http.get()
        .then((response) => {

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },
    addArticle: function() {
      this.loading = true;
      this.$http.post()
        .then((response) => {

          this.getArticles();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },
    updateArticle: function() {
      this.loading = true;
      this.$http.put()
        .then((response) => {
          this.loading = false;
        
          this.getArticles();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    },
    deleteArticle: function(id) {
      this.loading = true;
      this.$http.delete()
        .then((response) => {
          this.loading = false;
          this.getArticles();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        })
    }
  }

});
