$(document).ready(function(){		
    var username;	
    $.ajax({
        url:'/userdetails',
        contentType:'application/json',
        success: function (response){
            username = response.user;
        },
        error : function(e) {
            console.log("ERROR: ", e);
        }
    });
    $('#submitbtn').click(function(e){
        // e.preventDefault();
        // console.log('select_link clicked');
        var data = {
            title: $('#create-title').val(),
            des: $('#create-des').val(),
            del: $('#create-del').val(),
            timestamp: Date.now(),
            price: $('#create-price').val(),
            username: username
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/play',						
            success: function(data) {
                // console.log('success');
                // console.log(JSON.stringify(data));
            }
        });
    });				
});