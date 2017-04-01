/**
 * Created by Administrator on 2017-02-28.
 */
var apiURL = "http://192.168.8.144:8081/raise/zccb.jhtml";

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

var app = new Vue({
  el: "#app",
  data: {
    title: ["热门众筹", "历史众筹", "发起众筹"],//菜单标题
    tabIndex: 0,//菜单索引
    /*热门数据*/
    hot: [],
    /*历史数据*/
    history: [],
    info: {},
    /*新建数据*/
    build: {
      formDrl: "http://192.168.8.144:8081/raise/fundingSub.jhtml",//表单提交地址
      // mediaDrl: "http://127.0.0.1:3001/test",//表单提交地址
      mediaDrl: "http://192.168.8.144:8081/raise/upload_file.jhtml",//表单提交地址
      imgAccept: "image/jpeg, image/jpg, image/bmp, image/gif, image/png",
      videoAccept: "video/avi, video/rmvb, video/3GP, video/wmv, video/mkv, video/mp4, video/wmv, video/mov",
      /*数据*/
      /*identity: ["个人", "机构"],//身份类型数据*/
      type: [],//众筹类型数据
      /*索引*/
      pageIndex: 0,//页面索引
      identityIndex: 0,//身份类型索引
      typeIndex: 0,//众筹类型索引
      advertiseVideoSrc: {value: ""},//宣传视频
      /*项目详情*/
      detailsDescription: [
        {
          type: 0,//添加类型（文本）
          edit: 0,
          title: "为什么我需要你的资金支持",
          content: "<p>请在这里说明你的项目特色，以及详细的资 金用途，这会增加项目的可信度并由此提高筹资的成功率。</p>",
          contentEdit: "请在这里说明你的项目特色，以及详细的资 金用途，这会增加项目的可信度并由此提高筹资的成功率。",
        },
        {
          type: 1,//添加类型（图片）
          picSrc: {value: ""},
        }
      ],
      /*添加文本*/
      newText: {
        type: 0,//添加类型（文本/图片）
        edit: {num: 0},
        title: "为什么我需要你的资金支持",
        content: "<p>请在这里说明你的项目特色，以及详细的资 金用途，这会增加项目的可信度并由此提高筹资的成功率。</p>",
        contentEdit: "请在这里说明你的项目特色，以及详细的资 金用途，这会增加项目的可信度并由此提高筹资的成功率。",
      },
      /*添加图片*/
      newPic: {
        type: 1,//添加类型（文本/图片）
        picSrc: {value: ""},
      },
      /*回报信息*/
      returnInfo: [
        {
          type: 2,
          picSrc: [{value: ""}],
          freight: {invalid: "", value: ""},
          reTitlw: {invalid: "", value: ""},
          range: {
            lowPrice: {invalid: "", value: ""},
            highPrice: {invalid: "", value: ""},
          },
          public: {
            faMoney: {invalid: "", value: ""},
            content: {invalid: "", value: ""},
            faPeople: {invalid: "", value: ""},
            retime: {invalid: "", value: ""},
          },
          lottery: {
            lotteryReg: {invalid: "", value: ""},
            lotteryNum: "抽出1个奖品",
          },
        }
      ],
      /*添加回报*/
      newReturn: {
        type: 2,
        picSrc: [{value: ""}],
        freight: {invalid: "", value: ""},
        reTitlw: {invalid: "", value: ""},
        range: {
          lowPrice: {invalid: "", value: ""},
          highPrice: {invalid: "", value: ""},
        },
        public: {
          faMoney: {invalid: "", value: ""},
          content: {invalid: "", value: ""},
          faPeople: {invalid: "", value: ""},
          retime: {invalid: "", value: ""},
        },
        lottery: {
          lotteryReg: {invalid: "", value: ""},
          lotteryNum: "抽出1个奖品",
        },
      },
    },
    position: [],
    city1: {},
    city2: {},
    page1: {
      per: {
        username: {invalid: "", value: ""},
        IDnum: {invalid: "", value: ""},
        telnum: {invalid: "", value: ""},
        loProvince: {invalid: "", value: ""},
        positive: {invalid: "", value: ""},
        inverse: {invalid: "", value: ""},
      },
      ins: {
        tradeName: {invalid: "", value: ""},
        license: {invalid: "", value: ""},
        lawPerson: {invalid: "", value: ""},
        inRegister: {invalid: "", value: ""},
        contact: {invalid: "", value: ""},
        qyPhone: {invalid: "", value: ""},
        licenseImg: {invalid: "", value: ""},
      },
    },
    page2: {
      cover: {invalid: "", value: ""},
      cfName: {invalid: "", value: ""},
      purpose: {invalid: "", value: ""},
      totaltarget: {invalid: "", value: ""},
      timelimit: {invalid: "", value: ""},
     /* chuziShare: {invalid: "", value: ""},*/
      itemProvince: {invalid: "", value: ""},
    },
    selfdomValid: {
      value: "",
      selfdomlength: {"invalid": false},
      selfdomnum: {"invalid": false},
    },
    validateMsg: {
      unempty: "*此项不能为空",
      usename: "*请输入正确的中文名字(2~5个汉字之间)",
      IDnum: "*请填写有效的18位身份证号码",
      telnum: "*请填写正确有效的11位手机号",
      location: "*请选择地点",
      pic: "*请上传图片",
      totaltarget: "*筹资金额不低于500 , 最高1亿'",
      timelimit: "*筹资时间周期须在1～31天之内",
      chuziShare: "*出资份额须在1~100之间'",
      selfdomlength: "*每个标签不超过5个字符",
      selfdomnum: "*最多输入三个自定义标签",
      faMoney: "*支持金额 (只能为整数,最高为99999元)",
      title: "*请添加标题",
      faPeople: "*回报人数上限只能为整数,最多为999个",
      freight: "*运费只能为整数,最多为99元",
      retime: "*回报时间只能为整数,最长为999天",
      length: "*标题的长度不能超过13个字符",
    }
  },
  validators: { // `numeric` and `url` custom validator is local registration
    unempty: function (val) {
      return /\s{0,}[\S]{1,}[\s\S]{0,}/.test(val);
    },
    username: function (val) {
      return /^[\u4e00-\u9fa5]{2,5}$/.test(val);
    },
    IDnum: function (val) {
      return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(val);
    },
    telnum: function (val) {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(val);
    },
    totaltarget: function (val) {
      return /^([5-9][0-9]{2}|[1-9]\d{3,7}|100000000)$/.test(val);
    },
    timelimit: function (val) {
      return /^([12][0-9]|31|30|[1-9])$/.test(val);
    },
    chuziShare: function (val) {
      return /^([1-9]\d?|100)$/.test(val);
    },
    selfdomlength: function (val) {
      return !/\S{6,}/.test(val);
    },
    selfdomnum: function (val) {
      return !/\S+\s+\S+\s+\S+\s+\S/.test(val);
    },
    faMoney: function (val) {
      return /^[1-9]\d{0,4}$/.test(val);
    },
    faPeople: function (val) {
      return /^(?:\d{1,3})$/.test(val);
    },
    freight: function (val) {
      return /^[0-9]{1,2}$/.test(val);
    },
    retime: function (val) {
      return /^(?:\d{1,3})$/.test(val);
    },
    length: function (val) {
      return 0<val.length&&val.length<14;
    },
  },
  methods: {
    getCustomers: function () {
      this.$http.get(apiURL).then(function (response) {
        console.log(response.data);
        this.hot = response.data.hot;
        this.history = response.data.his;
        this.info = response.data.info;
        this.build.type = response.data.itemtype;
      })
    },
    pisitionData: function () {
      this.$http.get("../js/city.json").then(function (response) {
        app.position = response.body.citylist;
      })
    },
    buildRaise: function (index) {
      if (index == 2 && !this.info.cardType) {
        alert("请先补全个人信息");
        window.location = "/raise/page/index.html";
      } else {
        this.tabIndex = index;
      }
    },
    saveEdit: function (item) {
      var arr = item.contentEdit.split("\n");
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        str += "<p>" + arr[i] + "</p>";
      }
      item.content = str;
      item.edit = 0;
    },
    addDescription: function (parent, children, num) {
      if (num && (parent.length > num - 1)) {
        alert("最多只能上传" + num + "条");
      } else {
        parent.push(JSON.parse(JSON.stringify(children)));
      }
    },
    addPic: function (id, obj, item) {
      if (item.picSrc.length > 3) {
        alert("最多只能上传" + 3 + "条");
      } else {
        this.fileSubmit(id, obj);
        item.picSrc.push({value: ""});
      }
    },
    fileSubmit: function (id, valid, method) {
      var This = this;
      var formData = new FormData();
      var file = document.getElementById(id).files[0];
      formData.append('file', file);
      this.$http.post(this.build.mediaDrl, formData).then(function (res) {
        valid.value = res.data.filePath;
        method && This.validate(method, valid);
      }, function (response) {
        alert("上传失败");
      });
    },
    townData: function (city, method, valid) {
      for (var i = 0; i < this.position.length; i++) {
        if (this.position[i].p == valid.value) {
          this[city] = JSON.parse(JSON.stringify(this.position[i].c));
        }
      }
      this.validate(method, valid);
    },
    validate: function (reg, item) {
      item.invalid = !this.$options.validators[reg](item.value);
    },
    selfdomValidate: function () {
      this.selfdomValid.selfdomlength.invalid = !this.$options.validators.selfdomlength(this.selfdomValid.value);
      this.selfdomValid.selfdomnum.invalid = !this.$options.validators.selfdomnum(this.selfdomValid.value);
    },
    highPriceValidate: function (low, high) {
      low.invalid = !this.$options.validators.faMoney(low.value);
      high.invalid = parseInt(high.value) < parseInt(low.value);
      high.invalid = !this.$options.validators.faMoney(high.value);
    },
    submitPage1: function (e) {
      var bOff = true;
      if (this.build.identityIndex == 0) {
        bOff = _check(this.page1.per);
      } else {
        bOff = _check(this.page1.ins);
      }
      if (bOff) {
        this.build.pageIndex = 1;
      }
    },
    submitPage2: function (e) {
      var bOff = true;
      bOff = _check(this.page2);
      if (this.selfdomValid.selfdomlength.invalid || this.selfdomValid.selfdomnum.invalid) {
        bOff = false;
      }
      if (bOff) {
        this.build.pageIndex = 2;
      }
    },
    submitPage3: function (e) {
      var bOff = true;
      var details = this.build.detailsDescription;
      for (var i = 0; i < details.length; i++) {
        if (details[i].edit) {
          details[i].edit.num && (bOff = false);
        }
      }
      if (bOff) {
        this.build.pageIndex = 3;
      } else {
        alert("您还有为完成的编辑项");
      }
    },
    submit: function () {
      var returnInfo = this.build.returnInfo;
      var bOff = true;
      for (var i = 0; i < returnInfo.length; i++) {
        if (returnInfo[i].type != 1) {
          bOff = _check(returnInfo[i].public);
          if (returnInfo[i].type == 2) {
            if (returnInfo[i].lottery.lotteryNum == "抽出多个奖品") {
              if (returnInfo[i].lottery.lotteryReg.invalid === "" || returnInfo[i].lottery.lotteryReg.invalid === true) {
                returnInfo[i].lottery.lotteryReg.invalid = true;
                bOff = false;
              }
            }
          } else if (returnInfo[i].type == 3) {
            bOff = _check(returnInfo[i].range);
          } else if (returnInfo[i].type == 4) {
            if (returnInfo[i].reTitlw.invalid === "" || returnInfo[i].reTitlw.invalid === true) {
              returnInfo[i].reTitlw.invalid = true;
              bOff = false;
            }
          } else if (returnInfo[i].type == 5) {
            if (returnInfo[i].reTitlw.invalid === "" || returnInfo[i].reTitlw.invalid === true) {
              returnInfo[i].reTitlw.invalid = true;
              bOff = false;
            }
            if (returnInfo[i].freight.invalid === "" || returnInfo[i].freight.invalid === true) {
              returnInfo[i].freight.invalid = true;
              bOff = false;
            }
          }
        }
      }
      if (bOff) {
        alert("OK");
        // 详情描述字符串的拼接
        var str = "";
        var details = this.build.detailsDescription;
        this.build.advertiseVideoSrc.src && (str = "<video controls='controls' src='" + this.build.advertiseVideoSrc.value + "'></video>");
        for (var i = 0; i < details.length; i++) {
          details[i].title && details[i].title !== "为什么我需要你的资金支持" && (str += "<h1>" + details[i].title + "</h1>");
          details[i].content && details[i].content !== "<p>请在这里说明你的项目特色，以及详细的资 金用途，这会增加项目的可信度并由此提高筹资的成功率。</p>" && (str += details[i].content);
          if (details[i].picSrc) {
            details[i].picSrc.value && (str += "<img src='" + details[i].picSrc.value + "' alt='pic'>");
          }
        }
        document.getElementById("intros").value = str;
        //表单提交
        document.getElementById("allForm").submit();
      }
    },
    turnPage: function (item) {
      window.location.href = "preview.html?contentId=" + item.contentId + "&openId=" + this.info.openId;
    },
    turnPageHis: function (item) {
      window.location.href = "preview.html?contentId=" + item.contentId + "&openId=" + this.info.openId + "&&&his=1";
    }
  },
  mounted: function () {
    this.getCustomers();
    this.pisitionData();
  }
});


function _check(page) {
  var bOff = true;
  for (attr in page) {
    if (page[attr].invalid === "" || page[attr].invalid === true) {
      console.log(attr);
      page[attr].invalid = true;
      bOff = false;
    }
  }
  return bOff;
}
