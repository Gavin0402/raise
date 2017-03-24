/**
 * Created by Administrator on 2017-02-28.
 */
var apiURL = "http://192.168.8.144:8081/raise/zccb.jhtml";


var app = new Vue({
  el: "#app",
  data: {
    title: ["热门众筹", "历史众筹", "发起众筹"],//菜单标题
    tabIndex: {num: 0},//菜单索引
    /*热门数据*/
    hot: [],
    /*历史数据*/
    history: [],
    info: {},
    /*新建数据*/
    build: {
      formDrl: "http://192.168.8.144:8081/raise/fundingSub.jhtml",//表单提交地址
      mediaDrl: "http://192.168.8.144:8081/raise/upload_file.jhtml",//表单提交地址
      /*数据*/
      identity: ["个人", "机构"],//身份类型数据
      type: [],//众筹类型数据
      /*索引*/
      pageIndex: {num: 0},//页面索引
      identityIndex: {num: 0},//身份类型索引
      typeIndex: {num: 0},//众筹类型索引
      IDinfo: {
        IDtype: ["身份证", "护照"],//证件类型
        IDnum: "",//证件类型
        IDtypeSelect: "身份证",//选中证件类型
        IDerrors: "请填写有效的18位身份证号码",//选中证件类型
      },
      /*图片路径*/
      IDcorrectSrc: {src: ""},//证件正面照
      IDoppositeSrc: {src: ""},//证件反面照
      businessLicenseSrc: {src: ""},//营业执照照片
      coverPicSrc: {src: ""},//封面照片
      advertiseVideoSrc: {src: ""},//宣传视频
      /*项目详情*/
      detailsDescription: [
        {
          type: 0,//添加类型（文本/图片）
          edit: {num: 0},
          title: "为什么我需要你的资金支持",
          content: "<p>请在这里说明你的项目特色，以及详细的资 金用途，这会增加项目的可信度并由此提高筹资的成功率。</p>",
          contentEdit: "请在这里说明你的项目特色，以及详细的资 金用途，这会增加项目的可信度并由此提高筹资的成功率。",
          picSrc: {src: ""},
        },
        {
          type: 1,//添加类型（文本/图片）
          edit: {num: 0},
          title: "",
          content: "",
          contentEdit: "",
          picSrc: {src: ""},
        }
      ],
      /*添加文本*/
      newText: {
        type: 0,//添加类型（文本/图片）
        edit: {num: 0},
        title: "为什么我需要你的资金支持",
        content: "<p>请在这里说明你的项目特色，以及详细的资 金用途，这会增加项目的可信度并由此提高筹资的成功率。</p>",
        contentEdit: "请在这里说明你的项目特色，以及详细的资 金用途，这会增加项目的可信度并由此提高筹资的成功率。",
        picSrc: {src: ""},
      },
      /*添加图片*/
      newPic: {
        type: 1,//添加类型（文本/图片）
        edit: {num: 0},
        title: "",
        content: "",
        contentEdit: "",
        picSrc: {src: ""},
      },
      /*回报信息*/
      returnInfo: [
        {
          picSrc: [
            {src: ""}
          ],
          type: 1,
          lotteryNum: "抽出1个奖品",
          freight: {"invalid": ""},
          lotteryReg: {"invalid": ""},
          normal: {
            faMoney: {"invalid": ""},
            reTitlw: {"invalid": ""},
            content: {"invalid": ""},
            faPeople: {"invalid": ""},
            retime: {"invalid": ""},
          },
          lottery: {
            faMoney: {"invalid": ""},
            content: {"invalid": ""},
            faPeople: {"invalid": ""},
            retime: {"invalid": ""},
          },
        }
      ],
      /*添加回报*/
      newReturn: {
        picSrc: [
          {src: ""}
        ],
        type: 1,
        lotteryNum: "抽出1个奖品",
        freight: {"invalid": ""},
        lotteryReg: {"invalid": ""},
        normal: {
          faMoney: {"invalid": ""},
          reTitlw: {"invalid": ""},
          content: {"invalid": ""},
          faPeople: {"invalid": ""},
          retime: {"invalid": ""},
        },
        lottery: {
          faMoney: {"invalid": ""},
          content: {"invalid": ""},
          faPeople: {"invalid": ""},
          retime: {"invalid": ""},
        },
      },
    },
    position: [],
    city1: "",
    town1: {},
    city2: "",
    town2: {},
    page1: {
      per: {
        username: {"invalid": ""},
        IDnum: {"invalid": ""},
        telnum: {"invalid": ""},
        loProvince: {"invalid": ""},
        positive: {"invalid": ""},
        inverse: {"invalid": ""},
      },
      ins: {
        tradeName: {"invalid": ""},
        license: {"invalid": ""},
        lawPerson: {"invalid": ""},
        inRegister: {"invalid": ""},
        contact: {"invalid": ""},
        qyPhone: {"invalid": ""},
        licenseImg: {"invalid": ""},
      },
    },
    page2: {
      cover: {"invalid": ""},
      cfName: {"invalid": ""},
      purpose: {"invalid": ""},
      totaltarget: {"invalid": ""},
      timelimit: {"invalid": ""},
      chuziShare: {"invalid": ""},
      itemProvince: {"invalid": ""},
    },
    selfdomValid: {
      selfdomlength: {"invalid": false},
      selfdomnum: {"invalid": false},
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
  },
  methods: {
    switchIndex: function (index, obj) {
      obj.num = index;
    },
    deleteSrc: function (obj) {
      obj.src = "";
    },
    saveEdit: function (item) {
      var arr = item.contentEdit.split("\n");
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        str += "<p>" + arr[i] + "</p>";
      }
      item.content = str;
      item.edit.num = 0;
    },
    delArr: function (obj, index) {
      obj.splice(index, 1);
    },
    addDescription: function (parent, children, num) {
      if (parent.length > num - 1) {
        alert("最多只能上传" + num + "条");
      } else {
        parent.push(JSON.parse(JSON.stringify(children)));
      }
    },
    addPic: function (id, obj, item) {
      if (item.picSrc.length > 3) {
        alert("最多只能上传" + 3 + "条");
      } else {
        this.fileSubmit(event, id, obj);
        item.picSrc.push({src: ""});
      }
    },
    getCustomers: function () {
      this.$http.get(apiURL).then(function (response) {
        console.log(response.data);
        this.hot = response.data.hot;
        this.history = response.data.his;
        this.info = response.data.info;
        this.build.type = response.data.itemtype;
      })
    },
    fileSubmit: function (e, id, obj, valid) {
      var This = this;
      var formData = new FormData(document.getElementById(id));//表单id
      this.$http.post(this.build.mediaDrl, formData).then(function (data) {
        obj.src = data.data.filePath;
        valid && This.handleValidation(e, valid);
      }, function (response) {
        alert("上传失败");
      });
    },
    IDtypeMethod: function (event) {
      if (this.build.IDinfo.IDtypeSelect == "身份证") {
        this.$options.validators.IDnum = function (val) {
          return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(val);
        };
        this.build.IDinfo.IDerrors = "请填写有效的18位身份证号码";
      } else if (this.build.IDinfo.IDtypeSelect == "护照") {
        this.$options.validators.IDnum = function (val) {
          return /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/.test(val);
        };
        this.build.IDinfo.IDerrors = "请填写有效的18位";
      }
      this.page1.per.IDnum.invalid = !this.$options.validators.IDnum(this.build.IDinfo.IDnum);
    },
    submitPage1: function (e) {
      var bOff = true;
      if (this.build.identityIndex.num == 0) {
        var page = this.page1.per;
      } else {
        var page = this.page1.ins;
      }
      for (attr in page) {
        if (page[attr].invalid === "" || page[attr].invalid === true) {
          page[attr].invalid = true;
          bOff = false;
        }
      }
      if (bOff) {
        this.switchIndex(1, app.build.pageIndex);
      }
    },
    submitPage2: function (e) {
      var bOff = true;
      var page = this.page2;
      for (attr in page) {
        if (page[attr].invalid === "" || page[attr].invalid === true) {
          page[attr].invalid = true;
          bOff = false;
        }
      }
      if (this.selfdomValid.selfdomlength.invalid || this.selfdomValid.selfdomnum.invalid) {
        bOff = false;
      }
      if (bOff) {
        this.switchIndex(2, app.build.pageIndex);
      }
    },
    submitPage3: function (e) {
      var bOff = true;
      var details = this.build.detailsDescription;
      for (var i = 0; i < details.length; i++) {
        details[i].edit.num && (bOff = false);
      }
      if (bOff) {
        this.switchIndex(3, app.build.pageIndex);
      } else {
        alert("您还有为完成的编辑项");
      }
    },
    pisitionData: function () {
      this.$http.get("../js/city.json").then(function (response) {
        app.position = response.body.citylist;
      })
    },
    townData: function (town, city, valid) {
      for (var i = 0; i < this.position.length; i++) {
        if (this.position[i].p == city) {
          town.town = JSON.parse(JSON.stringify(this.position[i].c));
        }
      }
      this.handleValidation(event, valid);
    },
    handleValidation: function (e, item) {
      var $validity = e.target.$validity
      $validity.validate(function () {
        item.invalid = $validity.result.invalid;
      });
    },
    selfdomValidation: function (e) {
      var $validity = e.target.$validity
      $validity.validate(function () {
        app.selfdomValid.selfdomlength.invalid = $validity.result.selfdomlength;
        app.selfdomValid.selfdomnum.invalid = $validity.result.selfdomnum;
      });
    },
    submit: function () {
      var returnInfo = this.build.returnInfo;
      var bOff = true;
      for (var i = 0; i < returnInfo.length; i++) {
        if (returnInfo[i].type == 3) {
          var removeNode = document.getElementById("normal"+i);
          removeNode.parentNode.removeChild(removeNode);
          for (attr in returnInfo[i].lottery) {
            if (returnInfo[i].lottery[attr].invalid === "" || returnInfo[i].lottery[attr].invalid === true) {
              returnInfo[i].lottery[attr].invalid = true;
              bOff = false;
            }
          }
          if (returnInfo[i].lotteryNum == "抽出多个奖品") {
            if (returnInfo[i].lotteryReg.invalid === "" || returnInfo[i].lotteryReg.invalid === true) {
              returnInfo[i].lotteryReg.invalid = true;
              bOff = false;
            }
          }
        } else {
          var removeNode = document.getElementById("lottery"+i);
          removeNode.parentNode.removeChild(removeNode);
          for (attr in returnInfo[i].normal) {
            if (returnInfo[i].normal[attr].invalid === "" || returnInfo[i].normal[attr].invalid === true) {
              returnInfo[i].normal[attr].invalid = true;
              bOff = false;
            }
          }
          if (returnInfo[i].type == 1) {
            if (returnInfo[i].freight.invalid === "" || returnInfo[i].freight.invalid === true) {
              returnInfo[i].freight.invalid = true;
              bOff = false;
            }
          }
        }
      }
      if (bOff) {
        alert("OK");
        var str = "";
        var details = this.build.detailsDescription;
        this.build.advertiseVideoSrc.src && (str = "<video controls='controls' src='" + this.build.advertiseVideoSrc.src + "'></video>");
        for (var i = 0; i < details.length; i++) {
          details[i].title && details[i].title !== "为什么我需要你的资金支持" && (str += "<h1>" + details[i].title + "</h1>");
          details[i].content && details[i].content !== "<p>请在这里说明你的项目特色，以及详细的资 金用途，这会增加项目的可信度并由此提高筹资的成功率。</p>" && (str += details[i].content);
          details[i].picSrc.src && (str += "<img src='" + details[i].picSrc.src + "' alt='pic'>");
        }
        document.getElementById("intros").value = str;
        if (this.build.identityIndex.num == 0) {
          var removeNode = document.getElementById("wrap_ins");
        } else {
          var removeNode = document.getElementById("wrap_per");
        }
        removeNode.parentNode.removeChild(removeNode);
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
