/**
 * Created by Administrator on 2016/11/11.
 */

var apiURL = "http://192.168.8.144:8081/raise/retrieval.jhtml";
var loadMoreURL = "http://192.168.8.144:8081/raise/advancedLucene.jhtml";


var app = new Vue({
  el: "#app",
  data: {
    type: "",
    openId: {},
    tabIndex: {num: 999},//菜单索引
    searchType: [],
    starter: [],
    more: 0,
    page: 1,
  },
  methods: {
    getCustomers: function () {
      var parameter = document.URL.split('?')[1];
      var arr = parameter.split('&');
      this.type = arr[0].split('=')[1];
      this.openId = arr[1].split('=')[1];
      this.$http.get(apiURL + "?type=" + this.type).then(function (response) {
        window.scrollTo(0,0);
        if (response.data.item.length) {
          app.starter = response.data.item;
        } else {
          app.more = 3;
        }
        app.searchType.push({"title": response.data.itemType[0], "list": response.data.itemType});
        app.searchType.push({"title": response.data.dataType[0], "list": response.data.dataType});
        app.searchType.push({"title": response.data.raiseType[0], "list": response.data.raiseType});
      })
    },
    switchIndex: function (event, index, obj) {
      obj.num = index;
      event.stopPropagation();
    },
    searchCriteria: function (event, item, list) {
      item.title = list;
      this.tabIndex.num = 999;
      var json = {};
      this.page = 0;
      json.page = this.page;
      json.itemType = this.searchType[0].title;
      json.dataType = this.searchType[1].title;
      json.raiseType = this.searchType[2].title;
      app.$http.post(loadMoreURL, json).then(function (response) {
        window.scrollTo(0,0);
        if (response.data.length) {
          app.starter = response.data;
          this.more = 0;
        } else {
          app.more = 3;
        }
        app.starter = response.data;
      });
      event.stopPropagation();
    },
    turnPage: function (item) {
      if (this.type == "hot") {
        window.location.href = "preview.html?contentId=" + item.contentId + "&openId=" + this.openId;
      } else {
        window.location.href = "preview.html?contentId=" + item.contentId + "&openId=" + this.info.openId + "&&&his=1";
      }
    },
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
    var json = {};
    app.more = 1;
    app.page = app.page + 1
    json.page = app.page;
    json.itemType = app.searchType[0].title;
    json.dataType = app.searchType[1].title;
    json.raiseType = app.searchType[2].title;
    app.$http.post(loadMoreURL, json).then(function (response) {
      console.log(response.data);
      if (response.data.length) {
        for (var i = 0; i < response.data.length; i++) {
          app.starter.push(response.data[i]);
        }
      } else {
        app.more = 2;
      }
    });
  }
};