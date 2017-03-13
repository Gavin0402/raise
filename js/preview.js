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
    openId: "",
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
      var arr = parameter.split('&');
      this.contentId = arr[0].split('=')[1];
      this.openId = arr[1].split('=')[1];
      var his = document.URL.split('&&&')[1];
      his && (this.his = his);
      this.$http.get(apiURL + "?" + parameter).then(function (response) {
        console.log(response)
        this.info = response.data;
      })
    },
    turnPage: function (item) {
      window.location.href = item.href + "?contentId=" + this.contentId;
    },
    concern: function () {
      this.$http.get("http://192.168.8.144:8081/raise/concern.jhtml?contentId=" + this.contentId + "&openId=" + this.openId+ "&concern=" + !this.info.concern).then(function (response) {
        this.info.concern = !this.info.concern;
      })
    }
  },
  mounted: function () {
    this.getCustomers();
  }
});
