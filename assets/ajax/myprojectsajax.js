$(document).ready(function(){
    //console.log('test');
    $.ajax({
        url:'/projlist',
        contentType:'application/json',
        success: function (response){
            console.log(response);
            var projlistdiv = $("#projdiv");
            projlistdiv.html = "";
            var projdetails = response.projectlist;
            var timelist = [];
            var j;
            for (var i = 0; i < projdetails.length;i++){
                timelist.push(projdetails[i].timestamp);
            }
            var sortlist = timelist.sort((a,b) => {return b-a});
            for (var i = 0; i < sortlist.length;i++){
                j = projdetails.findIndex(x => x.timestamp === sortlist[i]);
                if (projdetails != null && projdetails[j].status == 1){
                    projlistdiv.append("<div class='col-6'><a class='card' style='min-width: 10 rem;width: 70%; height: 70%;text-align: center;vertical-align: middle;background-color: #e8e8e8;outline-color: white;text-decoration:none' href='/"+ projdetails[j].uid +"/playpost'><img class='card-img-top img-fluid' src='../assets/img/Stickman.png' alt='Stickman'><div class='card-body' style='color: black;'><div class='row'><div class='col-6'><span class='card-title'>" + projdetails[j].title +"</span></div></div></div></a></div>"); 
                }
            }
        },
        error : function(e) {
            console.log("ERROR: ", e);
        }
    });
});