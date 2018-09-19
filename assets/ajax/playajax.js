$(document).ready(function(){
    //console.log('test');
    $.ajax({
        url:'/play',
        contentType:'application/json',
        success: function (response){
            // console.log(response.playcard);
            var tier2 = $("#tier2");
            tier2.html = "";
            var tier1 = $("#tier1");
            tier1.html = "";
            // var num1 = null;
            // var num2 = null;
            var card = response.playcard;
            var timelist = [];
            var j;
            for (var i = 0; i < card.length;i++){
                timelist.push(card[i].timestamp);
            }
            var sortlist = timelist.sort((a,b) => {return b-a});
            for (var i = 0; i < sortlist.length;i++){
                // alert(card.findIndex(x => x.timestamp === sortlist[i]));
                j = card.findIndex(x => x.timestamp === sortlist[i]);
                if (card != null && card[j].status == 0){
                    if (card[j].tier == 2){
                        tier2.append("<div class='card m-2' style='min-width: 10rem;width: 100%; max-height: 250px;text-align: center;vertical-align: middle;'>" +
                        "<div class='card-body' style='text-align: left'><div class='row'>"+
                        "<div class='col-6 col-md-4' style='max-width: 200px'><img src='../assets/img/Stickman.png' alt='Stickman' width='180px' height='200px'></div>"+
                        "<div class='col-6 col-md-4' style='text-align: left'>"+
                        "<h3><strong>" +card[j].title+"</strong></h3>"+
                        "<h5 style='font-size: 17px'>" +card[j].company+ "</h5>"+
                        "<h5 style='font-size: 15px'>" +card[j].des+ "</h5>"+
                        "</div>"+
                        "<div class='col-6 col-md-4' style='max-height: 50px;'>"+
                        "<div class='row' style='max-height: 50px;width:500px;'><a href='#' style='text-decoration:none; color: black'>"+
                        "<div class='rectangle ml-2 p-1 border border-dark rounded'>Web</div></a><a href'#' style='text-decoration:none; color: black'>"+
                        "<div class='dropdown' style='margin-left: 5%'>"+
                        "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'></button>"+
                        "<div class='dropdown-menu'><a class='dropdown-item' href='#'>Web</a><a class='dropdown-item' href='#'>Web</a><a class='dropdown-item' href='#'>Web</a><a class='dropdown-item' href='#'>Web</a></div>"+
                        "</div>"+
                        "</div>"+
                        "<div class='row mt-5' style='margin-left: 100%;max-height:10%'><a href='/"+ card[j].uid +"/playpost' style='text-decoration:none;margin-top:250%'><div class='rectangle ml-5 p-1 rounded' style='background-color: #555; color: white;'>Connect</div></a></div></div>"+
                        "</div>"+
                        "</div>"+
                        "</div>"+
                        "</div>"); 
                    }
                    if (card[j].tier == 1){
                        tier1.append("<div class='card m-2' style='min-width: 10rem;width: 100%; max-height: 250px;text-align: center;vertical-align: middle;'>" +
                        "<div class='card-body' style='text-align: left; background-color: #d7dae0'><div class='row'>"+
                        "<div class='col-6 col-md-4' style='max-width: 200px'><img src='../assets/img/Stickman.png' alt='Stickman' width='180px' height='200px'></div>"+
                        "<div class='col-6 col-md-4' style='text-align: left'>"+
                        "<h3><strong>" +card[j].title+"</strong></h3>"+
                        "<h5 style='font-size: 17px'>" +card[j].company+ "</h5>"+
                        "<h5 style='font-size: 15px'>" +card[j].des+ "</h5>"+
                        "</div>"+
                        "<div class='col-6 col-md-4' style='max-height: 50px;'>"+
                        "<div class='row' style='max-height: 50px;width:500px;'><a href='#' style='text-decoration:none; color: black'>"+
                        "<div class='rectangle ml-2 p-1 border border-dark rounded'>Web</div></a><a href'#' style='text-decoration:none; color: black'>"+
                        "<div class='dropdown' style='margin-left: 5%'>"+
                        "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'></button>"+
                        "<div class='dropdown-menu'><a class='dropdown-item' href='#'>Web</a><a class='dropdown-item' href='#'>Web</a><a class='dropdown-item' href='#'>Web</a><a class='dropdown-item' href='#'>Web</a></div>"+
                        "</div>"+
                        "</div>"+
                        "<div class='row mt-5' style='margin-left: 100%;max-height:10%'><a href='/"+ card[j].uid +"/playpost' style='text-decoration:none;margin-top:250%'><div class='rectangle ml-5 p-1 rounded' style='background-color: #555; color: white;'>Connect</div></a></div></div>"+
                        "</div>"+
                        "</div>"+
                        "</div>"+
                        "</div>"); 
                    }
                }
            }
        },
        error : function(e) {
            console.log("ERROR: ", e);
        }
    });
});