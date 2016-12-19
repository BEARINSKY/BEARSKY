/**
 * Created by Administrator on 2016/12/19.
 */
var creatXHR=function(){
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xhr;
};
var getXML=function(){
    //creatXHR
    var xhr=creatXHR();
    //创建请求
    xhr.open("get","person.xml",true);//true表示加载文档的时候加载AJAX请求
    //
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&xhr.status==200){
            //获取响应回来的XML文档
            var xmldom=xhr.responseXML;
            //console.log(xmldom);
            var users=xmldom.getElementsByTagName("user");
            //将每个ID作为一个对象存储
            var cUser=function(){};
            //将每个对象PUSH到该数组
            var arrUser=[];
            for(var i=0;i<users.length;i++){
                var user=users[i];
                var userp=new cUser();
                var id=user.getAttribute("id");
                userp["id"]=id;
                for(var j=0;j<user.children.length;j++){
                    var child=user.children[j];
                    //console.log(child.nodeName+":"+child.firstChild.nodeValue);
                    userp[child.nodeName]=child.firstChild.nodeValue;
                }
                arrUser.push(userp);
            }
            //console.log(arrUser.length);
            for(var k=0;k<arrUser.length;k++){
                var tr=$("<tr></tr>");
                var m=arrUser[k];
                for (var r in m){
                    var td=$("<td>"+m[r]+"</td>");
                    tr.append(td);
                }
                $("table").append(tr);
            }
        }
    };
    xhr.send(null);
};
$(document).ready(function () {
    //getXML();
    // console.log("aaaa");
});