$(document).ready(function(){
    $.ajax({
        url:'/playpost',
        contentType:'application/json',
        success: function (response){
            // console.log(response);
            var title = $("#title");
            var company = $("#company");
            var des = $("#des");
            var del = $("#del");
            var price = $("#price");
            title.html = "";
            company.html = "";
            des.html = "";
            del.html = "";
            price.html = "";
            response.playdetails.forEach(function(data){
                title.append("<h3><strong>" + data.title +"</strong></h3>"); 
                company.append("<h5 style='font-size: 17px'>" + data.company+ "</h5>"); 
                des.append("<h5 style='font-size: 15px'>" +data.des + "</h5>");
                var dellist = data.deliverables.split('|');
                for(var i = 0; i < dellist.length; i++)
                {
                    del.append("<li>" + dellist[i] + "</li>");
                }
                del.append("<h5 style='font-size: 15px'> Price: " +data.price + "</h5>");
            });
        },
        error : function(e) {
            console.log("ERROR: ", e);
        }
    });
});