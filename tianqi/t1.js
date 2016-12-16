/**
 * Created by Administrator on 2016/12/16.
 */
$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
    if (remote_ip_info.ret == '1') {
        $.ajax({
            type: "GET",
            url: "http://wthrcdn.etouch.cn/weather_mini?city="+remote_ip_info.city,
            data: "",
            success: function(msg){
                var resstr="";
                var res=$.parseJSON(msg);
                var resd=res.data;
                var resdf=resd.forecast[0];
                var tianqi=resdf.type;
                var fengli=resdf.fengli;
                var fengxiang=resdf.fengxiang;
                var mh=resdf.high.split(" ")[1];
                var ml=resdf.low.split(" ")[1];
                var city=resd.city;
                var ganmao=resd.ganmao;
                resstr="您所在的城市是："+city+"。"+"今天的天气状态是："+tianqi+"。今天的最高气温是："+mh+"，最低气温是："+ml+"。风向是："+fengxiang+"，风力是："+fengli+"。"+ganmao;
                $("#tt").html(resstr);
            }
        });
    }
});
