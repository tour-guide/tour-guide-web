$(document).ready(function() {
  const locationEnterOption = $("#locationEnterOption");

  // kick off db call when the save story button is clicked
  locationEnterOption.on("submit", event => {
    event.preventDefault();
  });
});
