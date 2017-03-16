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
    commentId: "",
    commentIndex: "",
    replyText: "",
    replyName: "",
    userName: "",
    confirm: false,
    tip: "",
    indexComment: "",
    indexDiscuss: "",
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
      this.$http.get("http://192.168.8.144:8081/raise/replyComment.jhtml?contentId=" + this.contentId + "&openId=" + this.openId + "&replyContext=" + this.replyText + "&commentId=" + this.commentId + "&replyName=" + this.replyName).then(function (response) {
        console.log(response.data);
        app.starter[this.commentIndex].discuss.push(response.data);
        app.replyText = "";
        app.commentId = "";
        app.replyName = "";
      });
    },
    changestate: function () {
      this.state = true;
      this.replyText = "";
      this.commentId = "";
      this.replyName = "";
    },
    repalycomment: function (event, item, index) {
      this.state = false;
      this.commentId = item.commentId;
      this.commentIndex = index;
      this.placeholder = "回复";
      event.stopPropagation();
    },
    repalyrepaly: function (event, list, indexDiscuss, item, index) {
      if (list.proactive == this.userName) {
        this.confirm = true;
        this.indexComment = index;
        this.indexDiscuss = indexDiscuss;
      } else {
        this.repalycomment(event, item, index);
        this.replyName = list.proactive;
        this.placeholder = "@" + list.proactive;
      }
    },
    delComment: function (item, index) {
      this.$http.get("http://192.168.8.144:8081/raise/delComment.jhtml?contentId=" + this.contentId + "&openId=" + this.openId + "&commentId=" + item.commentId).then(function (response) {
        console.log(response.data);
        this.starter.splice(index, 1);
      })
    },
    delRepaly: function () {
      var comment = this.starter[this.indexComment];
      var discuss = comment.discuss[this.indexDiscuss];
      // this.$http.get("http://127.0.0.1:3000/raise/delReplyComment.jhtml?contentId=" + this.contentId + "&openId=" + this.openId + "&commentId=" + comment.commentId + "&discussId=" + discuss.discussId).then(function (response) {
      this.$http.get("http://192.168.8.144:8081/raise/delReplyComment.jhtml?contentId=" + this.contentId + "&openId=" + this.openId + "&commentId=" + comment.commentId + "&discussId=" + discuss.discussId).then(function (response) {
        console.log(response.data);
        if(response.data.success){
          this.confirm = false;
          comment.discuss.splice(app.indexDiscuss, 1);
        }else {
          app.tip = "操作失败";
          setTimeout(function () {
            app.tip = "";
          },1000)
        }
      })
    },
    closeMask: function () {
      this.confirm = false;
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
