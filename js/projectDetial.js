/**
 * Created by Administrator on 2017-03-10.
 */
// 动态设置像素比
var iScale = 1;
var dpr = window.devicePixelRatio;
iScale = iScale / dpr;
// 将这个比值动态的写入我们的meta里。
document.write('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=' + iScale + ', maximum-scale=' + iScale + ', minimum-scale=' + iScale + '" />');
// 动态的来设置我们的rem基准值：用当前设备的度/16得到一个数值，将它设置为html的字体大小。
window.onload = function () {
  var oHtml = document.getElementsByTagName('html')[0];
  var iWidth = document.documentElement.clientWidth;
  oHtml.style.fontSize = iWidth/ 18 + 'px';
  // alert( oHtml.style.fontSize );
  var apiURL = "http://192.168.8.144:8081/raise/projectDetails.jhtml";
  var parameter =document.URL.split('?')[1];
  var XHR=new XMLHttpRequest();
  if(XHR){
    XHR.open("GET", apiURL+"?"+parameter);
    XHR.onreadystatechange = function () {
      if (XHR.readyState == 4 && XHR.status == 200) {
        console.log(XHR.responseText);
        document.getElementById("app").innerHTML =  XHR.responseText;
      }
    };
    XHR.send();
  }
}
