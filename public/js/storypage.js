const apikey = process.env.APIKEY;

$(document).ready(function () {
  $.get("/api/chapter").then(data => {

    const startingPoint = {
      where(${ data.chapNumber
    } = 1).then(${ data.chapLong }, ${ data.chapLat })
};
const endingPoint = {

};
const wayPoints = "";
const modeType = "";

// const directions = function (startingPoint, endingPoint, wayPoints, modeType, apikey) {
const directions = function () {
  //const queryURL = "https://maps.googleapis.com/maps/api/directions/json?origin=4605+Radcliff+Road,Raleigh,NC&destination=2821+Adershot+Drive,Wake+Forest,NC&waypoints=933+Brookside+Drive,Raleigh,NC|204+Abercrobie,%20Wake+Forest,NC&mode=driving&key=" + apikey;
  // const queryURL = "https://maps.googleapis.com/maps/api/directions/json?origin=" + startingPoint + "&destination=" + endingPoint + "&waypoints=" + wayPoints + "&mode=" + modeType + "&key=" + apikey;
  const queryURL = "https://www.google.com/maps/embed/v1/directions?key=" + apikey + "&origin=4605+Radcliff+Road,Raleigh,NC&destination=2821+Adershot+Drive,Wake+Forest,NC&waypoints=933+Brookside+Drive,Raleigh,NC|204+Abercrobie,%20Wake+Forest,NC&mode=driving";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (data) {
    createRow(data);
  });

  const legDistance = $("<div>").addClass("leg-distance").text(data.routes.legs[i].distance.text);
  const stepDistance = $("<div>").addClass("step-distance").text(data.routes.legs[i].steps[j].distance.text);
  const stepInstructions = $("<div>").addClass("step-distance").text(data.routes.legs[i].distance.text);

};
    }
});


//get request from story to populate the HTML
$.get("/api/story").then(data => {
  $("#story-image").text(data.storyImage);
  $("#story-title").text(data.storyName);
});
});


function getStoryChapters(storyName) {
  //get all stories associated with a user's id
  $.get(`/api/chapter/${story}`)
    .then(data => {
      if (data.length !== 0) {
        data.forEach(chapter => {
          const card = $("<div>").attr("class", "col xl4 m6 s12 story-card");
          const img = $("<div>").attr("id", "story-image").append($("<img>").attr("src", story.storyImage));
          card.append(img);
          const title = $("<h2>").attr("id", "story-title").text(story.storyName);
          card.append(title);
          const author = $("<div>").attr("id", "author-block");
          const authorPic = $("<div>").attr("id", "author-image").append($("<img>").attr("src", profilePic));
          const contrib = $("<h6>").text("CONTRIBUTED BY");
          const authorName = $("<div>").attr("id", "author-name").text(`${firstName} ${lastName}`);
          author.append(authorPic).append(contrib).append(authorName);
          card.append(author);
          card.append($("<button>").attr("id", "start-story").attr("data-story", story.slug).text("Start Story"));
          $("#user-stories").append(card);
        })
      } else {
        $("#user-stories").append($("<p>").text("This user hasn't created any stories yet!"));
      }
    });
}