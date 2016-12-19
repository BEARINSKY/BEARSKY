$(function(){
    $('#bt').click(function(){
        $.ajax({
            type: "GET",
            url: "https://api.thinkpage.cn/v3/weather/now.json?key=mmoicvlzl8etjbex&location=beijing&language=zh-Hans&unit=c",
            data: "",
            dataType: "jsonp",
            success: function(data){
                $('#tt').empty();   //清空resText里面的所有内容
                var html = '';
                // $.each(data, function(commentIndex, comment){
                //     html += '<div class="comment"><h6>' + comment['username']
                //         + ':</h6><p class="para"' + comment['content']
                //         + '</p></div>';
                // });
                $('#tt').html(data["results"].length);
            }
        });
    });
});