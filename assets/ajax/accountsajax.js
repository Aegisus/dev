var accounttype = null;
$(document).ready(function () {
    $.ajax({
        url: '/accounttype',
        contentType: 'application/json',
        success: function (response) {
            // console.log(response);
            var accside = $("#accside");
            accside.html = "";
            response.accounttype.forEach(function (data) {
                if (data.acc == 'owner') {
                    if (data.type == 'student') {
                        accside.append("<nav class='col-md-2 bg-white sidebar mt-5' style='text-align: center; height: 750px'><div class='sidebar-sticky'><ul class='nav flex-column'><li class='nav-item mt-1'><div class='row'><div id='photo'></div><a class='nav-link' href='/editaccount' style='color: #FFC946'>Edit</a></div><li class='nav-item mt-1'><h5 id='name'></h5></li><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'><span>Skillsets:</span></h6><li class='nav-item'><h7 id='skillsets'></h7></li><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'><span>software Proficiency:</span></h6><li class='nav-item'><h7 id='softprof'<h7></li></ul><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'></h6><span>Rating:</span><ul class='nav flex-column mb-2'><li class='nav-item'><h7 id='rating'></h7></li></ul><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'></h6><span>Review:</span><ul class='nav flex-column mb-2'><li class='nav-item'><h7 id='review'></h7></li></ul></div></nav>");
                        accounttype = 'student';
                    }
                    if (data.type == 'company') {
                        accside.append("<nav class='col-md-2 bg-white sidebar mt-5' style='text-align: center; height: 750px'><div class='sidebar-sticky'><ul class='nav flex-column'><li class='nav-item mt-1'><div class='row'><img src='/assets/img/Stickman.png' alt='Amanda' width='150' height='150'><a class='nav-link' href='/editaccount' style='color: #FFC946'>Edit</a></div></li><li class='nav-item mt-1'><h5 id='compname'></h5></li><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'><span>Description:</span></h6><li class='nav-item'><h7 id='compdes'></h7></li><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'><span>industry:</span></h6><li class='nav-item'><h7 id='industry'></h7></li><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'><span>services:</span></h6><li class='nav-item'><h7 id='services'></h7></li></ul></div><div><a href='/logout'>logout</a></div></nav>");
                        accounttype = 'company';
                    }
                }
                if (data.acc == 'others') {
                    if (data.type == 'student') {
                        accside.append("<nav class='col-md-2 bg-white sidebar mt-5' style='text-align: center; height: 750px'><div class='sidebar-sticky'><ul class='nav flex-column'><li class='nav-item mt-1'><img src='/assets/img/Stickman.png' alt='Amanda' width='150' height='150'><li class='nav-item mt-1'><h5 id='name'></h5></li><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'><span>Skillsets:</span></h6><li class='nav-item'><h7 id='skillsets'></h7></li><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'><span>software Proficiency:</span></h6><li class='nav-item'><h7 id='softprof'<h7></li></ul><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'></h6><span>Rating:</span><ul class='nav flex-column mb-2'><li class='nav-item'><h7 id='rating'></h7></li></ul><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'></h6><span>Review:</span><ul class='nav flex-column mb-2'><li class='nav-item'><h7 id='review'></h7></li></ul></div></nav>");
                        accounttype = 'student';
                    }
                    if (data.type == 'company') {
                        accside.append("<nav class='col-md-2 bg-white sidebar mt-5' style='text-align: center; height: 750px'><div class='sidebar-sticky'><ul class='nav flex-column'><li class='nav-item mt-1'><img src='/assets/img/Stickman.png' alt='Amanda' width='150' height='150'></li><li class='nav-item mt-1'><h5 id='compname'></h5></li><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'><span>Description:</span></h6><li class='nav-item'><h7 id='compdes'></h7></li><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'><span>industry:</span></h6><li class='nav-item'><h7 id='industry'></h7></li><h6 class='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'><span>services:</span></h6><li class='nav-item'><h7 id='services'></h7></li></ul></div><div><a href='/logout'>logout</a></div></nav>");
                        accounttype = 'company';
                    }
                }
            });
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });

    $.ajax({
        url: '/accountdetails',
        contentType: 'application/json',
        success: function (response) {
            if (accounttype == 'student') {
                // console.log(response);
                var name = $("#name");
                var skillsets = $("#skillsets");
                var softprof = $("#softprof");
                var rating = $("#rating");
                var review = $("#review");
                var photo = $("#photo");
                name.html = "";
                skillsets.html = "";
                softprof.html = "";
                rating.html = "";
                review.html = "";
                photo.html = "";
                response.accdetails.forEach(function (data) {
                    // console.log(data.photo);
                    photo.append("<img src='/assets/uploads/" + data.photo + "' alt='sometext' width='150' height='150'></img>");
                    name.append("<strong>" + data.name + "</strong>");
                    skillsets.append(data.skillsets);
                    softprof.append(data.softprof);
                    rating.append(data.rating);
                    review.append(data.review);
                });
            }
            if (accounttype == 'company') {
                // console.log(response);
                var compname = $("#compname");
                var compdes = $("#compdes");
                var industry = $("#industry");
                var services = $("#services");
                compname.html = "";
                compdes.html = "";
                industry.html = "";
                services.html = "";
                response.accdetails.forEach(function (data) {
                    // console.log(data.name);
                    compname.append("<strong>" + data.compname + "</strong>");
                    compdes.append(data.compdes);
                    industry.append(data.industry);
                    services.append(data.services);
                });
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });

    $.ajax({
        url: '/projlist',
        contentType: 'application/json',
        success: function (response) {
            // console.log(response);
            var projlistdivcurr = $("#accmaincurr");
            var projlistdivdone = $("#accmaindone");
            projlistdivcurr.html = "";
            projlistdivdone.html = "";
            var projdetails = response.projectlist;
            var timelist = [];
            var j;
            for (var i = 0; i < projdetails.length; i++) {
                timelist.push(projdetails[i].timestamp);
            }
            var sortlist = timelist.sort((a, b) => { return b - a });
            for (var i = 0; i < sortlist.length; i++) {
                j = projdetails.findIndex(x => x.timestamp === sortlist[i]);
                if (projdetails != null && projdetails[j].status == 1) {
                    // console.log(projdetails[j].status);
                    projlistdivcurr.append("<div class='col-6'><a class='card' style='min-width: 10 rem;width: 70%; height: 70%;text-align: center;vertical-align: middle;background-color: #e8e8e8;outline-color: white;text-decoration:none' href='/" + projdetails[j].uid + "/playpost'><img class='card-img-top img-fluid' src='../assets/img/Stickman.png' alt='Stickman'><div class='card-body' style='color: black;'><div class='row'><div class='col-6'><span class='card-title'>" + projdetails[j].title + "</span></div></div></div></a></div>");
                }
                if (projdetails != null && projdetails[j].status == 2) {
                    // console.log(projdetails[j].status);
                    projlistdivdone.append("<div class='col-6'><a class='card' style='min-width: 10 rem;width: 70%; height: 70%;text-align: center;vertical-align: middle;background-color: #e8e8e8;outline-color: white;text-decoration:none' href='/" + projdetails[j].uid + "/playpost'><img class='card-img-top img-fluid' src='../assets/img/Stickman.png' alt='Stickman'><div class='card-body' style='color: black;'><div class='row'><div class='col-6'><span class='card-title'>" + projdetails[j].title + "</span></div></div></div></a></div>");
                }
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
});

$(document).ready(function () {
    //console.log('test');
    $.ajax({
        url: '/editaccounttype',
        contentType: 'application/json',
        success: function (response) {
            var type = null;
            type = response.editaccjson.accounttype;
            var form = $("#edit_form");
            form.html = "";
            // console.log(type);
            if (type == 'student') {
                form.append("<form class='form-group' id='edit'><input class='form-control' type='text' id='update_skill'><input class='form-control' type='text' id='update_prof'><button id='editcfm'>Confirm</button></form>");
                $('#editcfm').click(function (e) {
                    // e.preventDefault();
                    var data = {
                        skillsets: $('#update_skill').val(),
                        softprof: $('#update_prof').val()
                    };
                    // console.log(data);
                    $.ajax({
                        type: 'POST',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        url: 'http://localhost:3000/editdetails',
                        success: function (data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        },
                        error: function (e) {
                            console.log("ERROR: ", e);
                        }
                    });
                });
            }
            else {
                form.append("<form class='form-group' id='edit'><input class='form-control' type='text' id='update_comdes'><input class='form-control' type='text' id='update_indus'><input class='form-control' type='text' id='update_serv'><button id='editcfm'>Confirm</button> </form>");
                $('#editcfm').click(function (e) {
                    // e.preventDefault();
                    // console.log('select_link clicked');
                    var data = {
                        compdes: $('#update_comdes').val(),
                        industry: $('#update_indus').val(),
                        services: $('#update_serv').val()
                    };
                    console.log(data);
                    $.ajax({
                        type: 'POST',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        url: 'http://localhost:3000/editdetails',
                        success: function (data) {
                            // console.log('success');
                            // console.log(JSON.stringify(data));
                        },
                        error: function (e) {
                            console.log("ERROR: ", e);
                        }
                    });
                });
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
});