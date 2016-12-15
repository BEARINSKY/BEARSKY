$(document).ready(function() {
    showtime(y,m);
    alert(getMastDay(2016,12));
     var s="今天是 "+todayY+"年"+(todayM+1)+"月"+todayD+"日。";
     $("#tt").text(s);
});
var today=new Date();
var todayY=today.getFullYear();
var y=todayY;
var todayM=today.getMonth();
var m=todayM+1;
var todayD=today.getDate();
var printD=function(y,m,d){
    var s="这是"+y+"年"+m+"月"+d+"日";
    $("#tt").text(s);
};
var showtime=function(year,mouth){
    //清空所有
    $("#rl-t tbody").children("tr").remove();
    //处理月份大于12的样式
    while(mouth>12){
        mouth-=12;
        year++;
    }
    $("#numy").html(year);
    $("#numm").html(mouth);
    var oneW=(new Date(year,mouth-1,1)).getDay();
    //如果oneW是0，转成7，sunday
    if(oneW==0)
    {oneW=7;}
    var arrday=[];//记录面板所有日期
    var d=0;
    //获取这个月最大天数
    var thisMD=getMastDay(year,mouth);
    //获取上个月的年月
    var lY=0;var lM=0;
    if (mouth==1){
        lM=12;lY=year-1;
    }else{
        lM=mouth-1;lY=year;
    }
    //获取下个月的年月
    var nY=0;var nM=0;
    if (mouth==12){
        nM=1;nY=year+1;
    }else{
        nM=mouth+1;nY=year;
    }
    //获取上个月的最大天数
    var  lastMD=getMastDay(lY,lM);

    for(var i=0;i<42;i++){
        d=lastMD-oneW+1+1+i;
        if (d>lastMD){
            d-=lastMD;
        }
        if(d>thisMD&&i>lastMD){
            d-=thisMD;
        }
        arrday.push(d);
    }

    var arrdayres = [];//每7个数据作为一个数组 存入该数组
    for(var i=0,len=arrday.length;i<len;i+=7){
        arrdayres.push(arrday.slice(i,i+7));
    }
    //判断最后一行是否有存在必要
     if(arrdayres[5][6]>7){
         arrdayres.pop();
     }
    for(var i=0;i<arrdayres.length;i++){
        var tr=$("<tr></tr>");
        var td;
        for(var j=0;j<7;j++){
            //上个月
            if(i==0&&arrdayres[i][j]>7){
                td=$("<td><txt style='color:gray' >"+arrdayres[i][j]+"</txt></td>");
                td.attr("y",lY);
                td.attr("m",lM);
                td.attr("d",arrdayres[i][j]);
                td.on("click",function(){
                    printD($(this).attr("y"),$(this).attr("m"),$(this).attr("d"))
                });
            }
            //下个月
            else if(i>3&&arrdayres[i][j]<8){
                td=$("<td><txt style='color:gray' >"+arrdayres[i][j]+"</txt></td>");
                td.attr("y",nY);
                td.attr("m",nM);
                td.attr("d",arrdayres[i][j]);
                td.on("click",function(){
                    printD($(this).attr("y"),$(this).attr("m"),$(this).attr("d"))
                });
            }
            //判断是不是今天
            else if(arrdayres[i][j]==todayD&&year==todayY&&mouth==todayM+1){
                td=$("<td><txt class='today' title='today'>"+arrdayres[i][j]+"</txt></td>");
                td.attr("y",year);
                td.attr("m",mouth);
                td.attr("d",arrdayres[i][j]);
                td.on("click",function(){
                    printD($(this).attr("y"),$(this).attr("m"),$(this).attr("d"))
                });
            }
            else {
                var s=year+"年"+mouth+"月"+arrdayres[i][j]+"日";
                td=$("<td ><txt >"+arrdayres[i][j]+"</txt></td>");
                td.attr("y",year);
                td.attr("m",mouth);
                td.attr("d",arrdayres[i][j]);
                td.on("click",function(){
                    printD($(this).attr("y"),$(this).attr("m"),$(this).attr("d"))
                });
            }
            tr.append(td);
        }
        $("#rl-t").append(tr);
    }
};

//获取某个月的最大天数
var getMastDay=function(year,month)
{
    var new_year = year;  //取当前的年份
    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
    if(month>12)      //如果当前大于12月，则年份转到下一年
    {
        new_month -=12;    //月份减
        new_year++;      //年份增
    }
    var new_date = new Date(new_year,new_month,1);//取下个月中的第一天
    var mmd=(new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
    return mmd;
};
var ad=function(){
    showtime(todayY,++todayM);
};

