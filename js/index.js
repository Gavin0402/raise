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
      type: ["检察理论", "检察史", "检察业务", "检察综合", "法学学术", "法律应用", "普法读物", "法学教材", "法制文学"],//众筹类型数据
      /*索引*/
      pageIndex: {num: 0},//页面索引
      identityIndex: {num: 0},//身份类型索引
      typeIndex: {num: 0},//众筹类型索引
      /*图片路径*/
      IDcorrectSrc: {src: ""},//身份证正面照
      IDoppositeSrc: {src: ""},//身份证反面照
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
          type: 1,
          picSrc: [
            {src: ""}
          ],
          faMoney: {"invalid": ""},
          reTitlw: {"invalid": ""},
          faPeople: {"invalid": ""},
          freight: {"invalid": ""},
          retime: {"invalid": ""},
        }
      ],
      /*添加回报*/
      newReturn: {
        type: 1,
        picSrc: [
          {src: ""}
        ],
        faMoney: {"invalid": ""},
        reTitlw: {"invalid": ""},
        faPeople: {"invalid": ""},
        freight: {"invalid": ""},
        retime: {"invalid": ""},
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
        this.hot = response.data.hot;
        this.history = response.data.his;
        this.info = response.data.info;
      })
    },
    fileSubmit: function (e, id, obj, valid) {
      var This = this;
      var formData = new FormData(document.getElementById(id));//表单id
      this.$http.post(this.build.mediaDrl, formData).then(function (data) {
        obj.src = data.data.filePath;
        valid && This.handleValidation(e, valid);
      });
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
        if (returnInfo[i].faMoney.invalid === "" || returnInfo[i].faMoney.invalid === true) {
          returnInfo[i].faMoney.invalid = true;
          bOff = false;
        }
        if (returnInfo[i].reTitlw.invalid === "" || returnInfo[i].reTitlw.invalid === true) {
          returnInfo[i].reTitlw.invalid = true;
          bOff = false;
        }
        if (returnInfo[i].faPeople.invalid === "" || returnInfo[i].faPeople.invalid === true) {
          returnInfo[i].faPeople.invalid = true;
          bOff = false;
        }
        if (returnInfo[i].retime.invalid === "" || returnInfo[i].retime.invalid === true) {
          returnInfo[i].retime.invalid = true;
          bOff = false;
        }
        if (returnInfo[i].type === 1) {
          if (returnInfo[i].freight.invalid === "" || returnInfo[i].freight.invalid === true) {
            returnInfo[i].freight.invalid = true;
            bOff = false;
          }
        }
      }
      if (bOff) {
        alert("OK");
        var str = "";
        var details = this.build.detailsDescription;
        this.build.advertiseVideoSrc.src && (str = "<video src='" + this.build.advertiseVideoSrc.src + "'></video>");
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
      window.location.href = "preview.html?" + item.href;
    },
    turnPageHis: function (item) {
      window.location.href = "preview.html?" + item.href+"&&&his=1";
    }
  },
  mounted: function () {
    this.getCustomers();
    this.pisitionData();
  }
});
