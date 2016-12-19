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
            for(var i=0;i<users.length;i++){
                var user=users[i];
                var id=user.getAttribute("id");
                var name=user.nodeName;
                console.log("节点名称："+name+",id:"+id);
                for(var j=0;j<user.children.length;j++){
                    var child=user.children[j];
                    console.log(child.nodeName+":"+child.firstChild.nodeValue);
                }
            }
        }
    };
    xhr.send(null);
};
$(document).ready(function () {
    getXML();
   // console.log("aaaa");
});