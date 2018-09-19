$(document).ready(function(){			
    $('#login').click(function(e){
        // e.preventDefault();
        // console.log('select_link clicked');
        var data = {
            user:  $('#regU').val(),
            pass: $('#regP').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/log',						
            success: function(data) {
                // console.log('success');
                // console.log(JSON.stringify(data));
            }
        });
    });				
});