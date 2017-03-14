/**
 * Created by Administrator on 2017-03-10.
 */
var apiURL = "http://192.168.8.144:8081/raise/comment.jhtml";


var app = new Vue({
  el: "#app",
  data: {
    contentId: "",
    openId: "",
    state: true,
    placeholder: "",
    commentText: "",
    replyText: "",
    conmentId: "",
    discussId: "",
    starter: [
      {
        userName: "苏云金",
        headPic: "http://img.zcool.cn/community/011f1d561cb5f26ac7255b14cfadfb.png",
        conment: "梦想是注定孤独的旅行，路上少不了质疑和嘲笑，梦想是注定孤独的旅行，路上少不了质疑和嘲笑，梦想是注定孤独的旅行，路上少不了质疑和嘲笑",
        conmentId: "",
        time: "10天前",
        zan: false,
        zanNum: "99",
        discuss: [
          {
            proactive: "苏云金",
            passive: "",
            content: "是注定孤独定孤独定孤独定孤独定孤独的旅行，路上少不"
          }, {
            proactive: "苏云金",
            passive: "放假",
            content: "是注定孤独定孤独定孤独定孤独定孤独的旅行，路上少不"
          }
        ],
      },
      {
        userName: "苏云金",
        headPic: "http://img.zcool.cn/community/011f1d561cb5f26ac7255b14cfadfb.png",
        conment: "梦想是注定孤独的旅行，路上少不了质疑和嘲笑，梦想是注定孤独的旅行，路上少不了质疑和嘲笑，梦想是注定孤独的旅行，路上少不了质疑和嘲笑",
        conmentId: "",
        time: "9天前",
        zan: false,
        zanNum: "99",
        discuss: [
          {
            proactive: "苏云金",
            passive: "",
            content: "是注定孤独定孤独定孤独定孤独定孤独的旅行，路上少不"
          }, {
            proactive: "苏云金",
            passive: "放假",
            content: "是注定孤独定孤独定孤独定孤独定孤独的旅行，路上少不"
          }
        ],
      },
    ],
  },
  methods: {
    getCustomers: function () {
      var parameter = document.URL.split('?')[1];
      var arr = parameter.split('&');
      this.contentId = arr[0].split('=')[1];
      this.openId = arr[1].split('=')[1];
      this.$http.get(apiURL + "?" + parameter).then(function (response) {
        console.log(response)
        this.starter = response.data;
      })
    },
    zan: function (item) {
      this.$http.get("http://192.168.8.144:8081/raise/likes.jhtml?contentId=" + this.contentId + "&openId=" + this.openId + "&commentId=" + item.commentId + "&zan=" + !item.zan).then(function (response) {
        item.zan = !item.zan;
        if (item.zan) {
          item.zanNum++;
        } else {
          item.zanNum--;
        }
      });
    },
    comment: function () {
      this.$http.get("http://192.168.8.144:8081/raise/pinglun.jhtml?contentId=" + this.contentId + "&openId=" + this.openId + "&context=" + this.commentText).then(function (response) {
        console.log(response.data);
        app.starter.push(response.data);
        app.commentText = "";
      })
    },
    repaly: function () {
      this.$http.get("http://192.168.8.144:8081/raise/pinglun.jhtml?contentId=" + this.contentId + "&openId=" + this.openId + "&context=" + this.replyText + "&conmentId=" + this.conmentId + "&discussId=" + this.discussId).then(function (response) {
        console.log(response.data);
        app.starter.push(response.data);
        app.replyText = "";
        app.conmentId = "";
        app.discussId = "";
      })
    },
    changestate: function () {
      this.state = true;
      this.replyText = "";
      this.conmentId = "";
      this.discussId = "";
    },
    repalycomment: function (item) {
      this.state = false;
      document.getElementById("replyText").focus();
      this.conmentId = item.conmentId;
    },
    repalyrepaly: function (list, item) {
      this.repalycomment(item);
      this.discussId = item.discussId;
    },
    delComment: function (item, index) {
      this.starter.splice(index, 1);
      /*this.$http.get("http://192.168.8.144:8081/raise/pinglun.jhtml?contentId=" + this.contentId + "&openId=" + this.openId + "&commentId=" + item.commentId).then(function (response) {
       console.log(response.data);
       })*/
    }
  },
  mounted: function () {
    // this.getCustomers();
  },
  filters: {
    zanNum: function (value) {
      if (value > 99) {
        return "99+"
      } else {
        return value;
      }
    }
  }
});
