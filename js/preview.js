/**
 * Created by Administrator on 2017-03-08.
 */
var apiURL = "http://192.168.8.144:8081/raise/content.jhtml";


var app = new Vue({
  el: "#app",
  data: {
    info: {},
    his: "",
    contentId: "",
    detialInfo: [
      {
        title: "查看图文详情",
        href: "projectDetails.html"
      },
      {
        title: "项目评论",
        href: "comment.html"
      },
      {
        title: "支持记录",
        href: "supportRecord.html"
      },
      {
        title: "项目更新",
        href: "evolve.html"
      }
    ]
  },
  methods: {
    getCustomers: function () {
      var parameter = document.URL.split('?')[1];
      var contentId = parameter.split('&')[0].split('=')[1];
      var his = document.URL.split('&&&')[1];
      this.contentId = contentId;
      his && (this.his = his);
      this.$http.get(apiURL + "?" + parameter).then(function (response) {
        console.log(response)
        this.info = response.data;
      })
    },
    turnPage: function (item) {
      window.location.href = item.href+"?contentId="+this.contentId;
    },
    concern: function () {

    }
  },
  mounted: function () {
    this.getCustomers();
  }
});
