$(document).ready(function(){
    //console.log('test');
    $.ajax({
        url:'/hop',
        contentType:'application/json',
        success: function (response){
            // console.log(response);
            var hopread = $("#hopfeed");
            hopread.html = "";
            response.hopcard.forEach(function(card){
                if (card != null){
                    hopread.append(
                    "<div class='col-6'><div class='card' style='min-width: 10rem;width: 70%; height: 70%;text-align: center;vertical-align: middle;background-color: #e8e8e8;outline-color: white'><img class='card-img-top img-fluid' src='../assets/img/Stickman.png' alt='Stickman'><div class='card-body' style='background-color: #414449; color: white;'><div class='row'><div class='col-6'><span class='card-title'>" +card.name+"</span></div><div class='col-6'><a class='btn' href='/student/"+ card.username +"' style='background-color: white; color: #4d4d4d;'>CONNECT</a></div></div></div></div>"+
                    "</div>"); 
                }
            });
        },
        error : function(e) {
            console.log("ERROR: ", e);
        }
    });
});