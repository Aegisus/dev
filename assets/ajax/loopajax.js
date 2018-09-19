$(document).ready(function(){
    //console.log('test');
    $.ajax({
        url:'/loop',
        contentType:'application/json',
        success: function (response){
            // console.log(response);
            var loopread = $("#loopfeed");
            loopread.html = "";
            response.loopcard.forEach(function(card){
                //playread.append("<p>"+"Post Successfully!---> " + card.title+ " " + card.subtitle+ " " + card.description+ "</p>");
                if (card != null){
                    loopread.append(
                        "<div class='col-6'>"+
                        "<div class='card' style='min-width: 10rem;width: 60%; height: 60%;text-align: center;vertical-align: middle;background-color: #e8e8e8;outline-color: white'><img class='card-img-top img-fluid' src='/assets/img/Stickman.png' alt='Stickman'>"+
                          "<div class='card-body' style='background-color: #FFC946; color: white;'>"+
                            "<div class='row'>"+
                              "<div class='col-6'><span class='card-title'>" + card.title + "</span></div>"+
                              "<div class='col-6'><a class='btn' href='/"+ card.id + "/looppost' style='background-color: white; color: #4d4d4d;'>READ</a></div>"+
                            "</div>"+
                          "</div>"+
                        "</div>"+
                      "</div>"); 
                }
            });
        },
        error : function(e) {
            console.log("ERROR: ", e);
        }
    });
});