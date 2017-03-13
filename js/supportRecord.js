/**
 * Created by Administrator on 2017-03-10.
 */
var apiURL = "http://192.168.8.144:8081/raise/supportRecord.jhtml";


var app = new Vue({
  el: "#app",
  data: {
    starter:{},
  },
  methods: {
    getCustomers: function () {
      var parameter =document.URL.split('?')[1];
      this.$http.get(apiURL+"?"+parameter).then(function (response) {
        console.log(response)
        this.starter = response.data;
      })
    },
  },
  mounted: function () {
    this.getCustomers();
  }
});
