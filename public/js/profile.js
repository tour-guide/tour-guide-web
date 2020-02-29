$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user/11").then(data => {
    $("#user-fullname").text(`${data.firstName} ${data.lastName}`);
    $("#bio-text").text(data.profile);
    $("#user-firstname").text(data.firstName);
    $("#user-stories").text("Cards go here");
  });
});
