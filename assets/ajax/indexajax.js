$(document).ready(function(){
    //console.log('test');
    $.ajax({
        url:'/indextype',
        contentType:'application/json',
        success: function (response){
            // console.log(response);
            var readindex = $("#projbtn");
            var readnav = $("#accnav");
            readindex.html = "";
            readnav.html = "";
            // response.indextype.forEach(function(btn){
            // });
            if (response.indextype != null){
                if (response.indextype.account == 'company'){
                    readindex.append("<a class='navbar-brand button' id='myBtn' title='Create Project' href='/create'>+</a>");
                }
                readnav.append("<a class='navbar-brand avatar' href='/accounts' style='color: #FFC946;'>"+ response.indextype.name +"</a>");
            }
            // else{
            //     readnav.append("<a class='navbar-brand avatar' href='/login' style='color: #FFC946;'>Login</a>");
            // }
        },
        error : function(e) {
            console.log("ERROR: ", e);
        }
    });
});