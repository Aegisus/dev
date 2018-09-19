$(document).ready(function(){
    flag=0;
    $("#floatingbtn").click(function(){
        if (flag==0) {
            $("#floatingbtn").animate({height: '50px', width: '50px'} , 100);
            $("#c1").animate({top: '50%', left: '43%'} , 200);
            $("#c1").animate({height: '50px', width: '50px'} , 200);

        }
    });
});