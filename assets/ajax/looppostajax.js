$(document).ready(function(){
    $.ajax({
        url:'/looppost',
        contentType:'application/json',
        success: function (response){
            // console.log(response);
            var title = $("#title");
            var subtitle = $("#subtitle");
            var des = $("#des");
            title.html = "";
            subtitle.html = "";
            des.html = "";
            response.loopdetails.forEach(function(data){
                title.append("<h3><strong>" + data.title +"</strong></h3>"); 
                subtitle.append("<h5 style='font-size: 17px'>" + data.subtitle+ "</h5>");
                des.append("<h5 style='font-size: 15px'>" +data.des+ "</h5>");
            });
        },
        error : function(e) {
            console.log("ERROR: ", e);
        }
    });
});