/**
 * Created by Administrator on 2017-03-10.
 */
var apiURL = "http://192.168.8.144:8081/raise/evolve.jhtml";


var app = new Vue({
  el: "#app",
  data: {
    starter: {},
    boff:true
  },
  methods: {
    getCustomers: function () {
      var parameter = document.URL.split('?')[1];
      this.$http.get(apiURL+"?"+parameter).then(function (response) {
        console.log(response)
        this.starter = response.data;
        if(response.data.dynamic.length){
          this.boff = false;
        }
      })
    },
  },
  mounted: function () {
    this.getCustomers();
  }
});
