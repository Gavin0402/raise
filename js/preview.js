/**
 * Created by Administrator on 2017-03-08.
 */
var apiURL = "http://192.168.8.144:8081/raise/content.jhtml";


var app = new Vue({
  el: "#app",
  data: {
    info:{},
    his:""
  },
  methods: {
    getCustomers: function () {
      var parameter =document.URL.split('?')[1];
      var his =document.URL.split('&&&')[1];
      his && (this.his = his);
      this.$http.get(apiURL+"?"+parameter).then(function (response) {
        console.log(response)
        this.info = response.data;
      })
    },
    turnPage: function (item) {
      window.location.href = "preview.html?url="+item.href;
    },
    concern:function () {

    }
  },
  mounted: function () {
    this.getCustomers();
  }
});
