/**
 * Created by Administrator on 2016/11/11.
 */

var apiURL = "http://192.168.8.144:8081/raise/retrieval.jhtml";


var app = new Vue({
  el: "#app",
  data: {
    openId: {},
    tabIndex: {num: 999},//菜单索引
    searchType: [
      ["全部", "分类1q", "分类2", "分类3"],
      ["全部", "分类1w", "分类2", "分类3"],
      ["全部", "分类1e", "分类2", "分类3"]
    ],
    starter: [],
    more: 0
  },
  methods: {
    getCustomers: function () {
      var parameter = document.URL.split('?')[1];
      this.openId = parameter.split('=')[1];
      this.$http.get(apiURL).then(function (response) {
        console.log(response)
        this.starter = response.data.item;
      })
    },
    switchIndex: function (event, index, obj) {
      obj.num = index;
      event.stopPropagation();
    },
    searchCriteria: function (event, item, list) {
      item.title = list;
      this.tabIndex.num = 999;
      event.stopPropagation();
    }
  },
  mounted: function () {
    this.getCustomers();
  }
});

document.onclick = function () {
  app.tabIndex.num = 999;
}
window.onscroll = function () {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  if (scrollTop + windowHeight === scrollHeight) {
    // alert(5555);
    // app.$http.post("http://127.0.0.1:3000/test",{"time":"20170310","person":"小红"}).then(function (response) {});
  }
};