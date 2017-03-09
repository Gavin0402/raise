//文本框失去焦点后
$('form :input').blur(function () {
  var $parent = $(this).parent();
  $parent.find(".formtips").remove();
  //验证中文名

  //验证手机号
  if ($(this).is('#phone')) {
    if (( this.value != "" && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.value) )) {
      var errorMsg = '*请填写正确有效的11位手机号';
      $parent.append('<p class="formtips onError" style=\"color:red;line-height:30px;\" align=\"center\">' + errorMsg + '</p>');
      document.getElementById("phone").focus();
    }
  }
  //验证企业手机号
  if ($(this).is('#qyPhone')) {
    if (( this.value != "" && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.value) )) {
      var errorMsg = '*请填写正确有效的11位手机号';
      $parent.append('<p class="formtips onError" style=\"color:red;line-height:30px;\" align=\"center\">' + errorMsg + '</p>');
      document.getElementById("qyPhone").focus();
    }
  }
  //验证筹资金额
  if ($(this).is('#totaltarget')) {
    if (( this.value != "" && !/^([5-9][0-9]{2}|[1-9]\d{3,7}|100000000)$/.test(this.value) )) {
      var errorMsg = '*筹资金额不低于500 , 最高1亿';
      $parent.append('<p class="formtips onError" style=\"color:red;line-height:30px;\" align=\"center\">' + errorMsg + '</p>');
      document.getElementById("totaltarget").focus();
    }
  }
  //验证出资份额
  if ($(this).is('#chuziShare')) {
    if (( this.value != "" && !/^([1-9]\d?|100)$/.test(this.value) )) {
      var errorMsg = '*出资份额须在1~100之间';
      $parent.append('<p class="formtips onError" style=\"color:red;line-height:30px;\" align=\"center\">' + errorMsg + '</p>');
      document.getElementById("chuziShare").focus();
    }
  }
  //验证筹资天数
  if ($(this).is('#timelimit')) {
    if (( this.value != "" && !/^([12][0-9]|31|30|[1-9])$/.test(this.value) )) {
      var errorMsg = '*筹资时间周期须在1～31天之内';
      $parent.append('<p class="formtips onError" style=\"color:red;line-height:30px;\" align=\"center\">' + errorMsg + '</p>');
      document.getElementById("timelimit").focus();
    }
  }
  //验证标签
  if ($(this).is('#selfdom')) {
    if (this.value != "" && this.value.length > 15) {
      var errorMsg = '*每个个性标签不得超过3个汉字';
      $parent.append('<p class="formtips onError" style=\"color:red;line-height:30px;\" align=\"center\">' + errorMsg + '</p>');
      document.getElementById("selfdom").focus();
    }
  }
  //验证身份证号
  if ($(this).is('#cardNo')) {
    if (( this.value != "" && !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(this.value) )) {
      var errorMsg = '*请填写有效的18位身份证号码';
      $parent.append('<p class="formtips onError" style=\"color:red;line-height:30px;\" align=\"center\">' + errorMsg + '</p>');
      document.getElementById("cardNo").focus();
    }
  }
  //验证邮箱
  if ($(this).is('#favorerEmail')) {
    if (( this.value != "" && !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.value) )) {
      var errorMsg = '*填写的电子邮箱格式有误';
      $parent.append('<p class="formtips onError" style=\"color:red;line-height:30px;\" align=\"center\">' + errorMsg + '</p>');
      document.getElementById("favorerEmail").focus();
    }
  }
})
//验证支持金额
function cfaMoney(obj) {
  var money = $(obj).val();
  if (money.length != 0 && !/^[1-9]\d{0,4}$/.test(money)) {
    $(".fm").last().append("<p class=\"zcje\" id=\"yzcje\" style=\"color:red;line-height:30px;\" align=\"center\">*支持金额 (只能为整数,最高为99999元)</p>");
    $(obj).focus();
    if ($("#yzcje").length > 0) {
      $("#yzcje").nextAll().hide();
    }
    return false;
  } else {
    $(".zcje").remove();
  }
}
//验证人数上限
function cfaPeople(obj) {
  var people = $(obj).val();
  if (people.length != 0 && !/^(?:\d{1,3})$/.test(people)) {
    $(".rs").last().append("<p class=\"rssx\" id=\"ysxsx\" style=\"color:red;line-height:30px;\" align=\"center\">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp*回报人数上限只能为整数,最多为999个</p>");
    $(obj).focus();
    if ($("#ysxsx").length > 0) {
      $("#ysxsx").nextAll().hide();
    }
    return false;
  } else {
    $(".rssx").remove();
  }
}
//验证运费
function cfreight(obj) {
  var freight = $(obj).val();
  if (freight.length != 0 && !/^[0-9]{1,2}$/.test(freight)) {
    $(".fit").last().append("<p class=\"yf\" id=\"yyf\" style=\"color:red;line-height:30px;\" align=\"center\">&nbsp&nbsp&nbsp&nbsp*运费只能为整数,最多为99元</p>");
    $(obj).focus();
    if ($("#yyf").length > 0) {
      $("#yyf").nextAll().hide();
    }
    return false;
  } else {
    $(".yf").remove();
  }
}
//验证回报时间
function cRetime(obj) {
  var retime = $(obj).val();
  if (retime.length != 0 && !/^(?:\d{1,3})$/.test(retime)) {
    $(".hb").last().append("<p class=\"hbsj\" id=\"yhbsj\" style=\"color:red;line-height:30px;\" align=\"center\">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp*回报时间只能为整数,最长为999天</p>");
    $(obj).focus();
    if ($("#yhbsj").length > 0) {
      $("#yhbsj").nextAll().hide();
    }
    return false;
  } else {
    $(".hbsj").remove();
  }
}

function sub() {
  var boo;
  for (var i = 1; i <= num; i++) {
    if (($("#invoice" + i).val() != "" && $("#freight" + i).val() != "" && $("#faMoney" + i).val() != "" && $("#reTitlw" + i).val() != "" && $("#reContent" + i).val() != "" && $("#faPeople" + i).val() != "" &&
      $("#retime" + i).val() != "") || ($("#faMoney" + i).val() != "" && $("#reTitlw" + i).val() != "" && $("#reContent" + i).val() != "" && $("#faPeople" + i).val() != "" && $("#retime" + i).val() != "")) {
      boo = true;
    } else {
      boo = false;
      break;
    }
  }
  if (boo == true) {
    $(".deltitle").remove();
    $("#intros").val($(".wrap_edit").html());
    $(".wrap_edit").html("");
    $("#fundingForm").submit();
  } else {
    alert("请将资料填写完整，有利于提高成功率!");
  }
}