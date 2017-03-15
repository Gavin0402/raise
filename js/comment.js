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
    commentId: "",
    discussId: "",
    userName: "",
    starter: []
  },
  methods: {
    getCustomers: function () {
      var parameter = document.URL.split('?')[1];
      var arr = parameter.split('&');
      this.contentId = arr[0].split('=')[1];
      this.openId = arr[1].split('=')[1];
      this.$http.get(apiURL + "?" + parameter).then(function (response) {
        console.log(response)
        this.starter = response.data.commentList.reverse();
        this.userName = response.data.userName;
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
        app.starter.unshift(response.data);
        app.commentText = "";
      })
    },
    repaly: function () {
      this.$http.get("http://192.168.8.144:8081/raise/replyComment.jhtml?contentId=" + this.contentId + "&openId=" + this.openId + "&replyContext=" + this.replyText + "&commentId=" + this.commentId + "&discussId=" + this.discussId).then(function (response) {
        console.log(response.data);
        app.starter.push(response.data);
        app.replyText = "";
        app.commentId = "";
        app.discussId = "";
      });
    },
    changestate: function () {
      this.state = true;
      this.replyText = "";
      this.commentId = "";
      this.discussId = "";
    },
    repalycomment: function (event,item) {
      this.state = false;
      /*console.log(item);*/
      this.commentId = item.commentId;
      event.stopPropagation();
    },
    repalyrepaly: function (event,list, item) {
      this.repalycomment(event,item);
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
    this.getCustomers();
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
