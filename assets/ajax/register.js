$(document).ready(function(){		
  var errlist = [];
  var errors = !{errors}
  //- console.log(errors);
  if (errors){
      errors.forEach((result)=>{
          //- console.log(result.msg);
          if (result.msg == 'Email address must be between 4-100 characters long.'){
              errlist[0] = result.msg;
          }
          if (result.msg == 'Username must be between 8-15 characters long.'){
              errlist[1] = result.msg;
          }
          if (result.msg == 'Password must be between 8-100 characters long.'){
              errlist[2] = result.msg;
          }
          if (result.msg == 'Password must include one lowercase character, one uppercase character, a number, and a special character.'){
              errlist[3] = result.msg;
          }
          if (result.msg == 'Passwords do not match, please try again.'){
              errlist[4] = result.msg;
          }
      });
      //- for (var i = 0; i < errlist.length; i++){
      //-     console.log(errlist[i]);
      //- }
      var email_feed = $("#email_feed");
      email_feed.html = "";
      var user_feed = $("#user_feed");
      user_feed.html = "";
      var pass_feed = $("#pass_feed");
      pass_feed.html = "";
      var repass_feed = $("#repass_feed");
      repass_feed.html = "";
      if (errlist[0]){
          console.log(errlist[0]);
          email_feed.append("<p>" +errlist[0] + "</p>");
      }
      if (errlist[1]){
          console.log(errlist[1]);
          user_feed.append("<p>" +errlist[1] + "</p>");
      }
      if (errlist[2]) {
          console.log(errlist[2]);
          pass_feed.append("<p>" +errlist[2] + "</p>");
      }
      if (errlist[3]){
          console.log(errlist[3]);
          pass_feed.append("<p>" + errlist[3] + "</p>");
      }
      if (errlist[4]){
          console.log(errlist[4]);
          repass_feed.append("<p>" +errlist[4] + "</p>");
      }

      $("#regisform").addClass( "was-validated" );	
  }	
});