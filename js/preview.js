/**
 * Created by Administrator on 2017-03-08.
 */
var apiURL = "http://192.168.8.144:8081/raise/content.jhtml";

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}


var app = new Vue({
  el: "#app",
  data: {
    info: {},
    his: "",
    contentId: "",
    wxbdopenId: "",
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
      this.wxbdopenId = arr[1].split('=')[1];
      var his = document.URL.split('&&&')[1];
      his && (this.his = his);
      this.$http.get(apiURL + "?" + parameter).then(function (response) {
        console.log(response)
        this.info = response.data;
      })
    },
    turnPage: function (item) {
      window.location.href = item.href + "?contentId=" + this.contentId + "&wxbdopenId=" + this.wxbdopenId;
    },
    concern: function () {
      this.$http.get("http://192.168.8.144:8081/raise/concern.jhtml?contentId=" + this.contentId + "&wxbdopenId=" + this.wxbdopenId + "&concern=" + !this.info.concern).then(function (response) {
        this.info.concern = !this.info.concern;
      })
    }
  },
  mounted: function () {
    this.getCustomers();
  }
});
