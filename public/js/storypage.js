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
    const queryURL = "https://maps.googleapis.com/maps/api/directions/json?origin=4605+Radcliff+Road,Raleigh,NC&destination=2821+Adershot+Drive,Wake+Forest,NC&waypoints=933+Brookside+Drive,Raleigh,NC|204+Abercrobie,%20Wake+Forest,NC&mode=driving&key=AIzaSyAM2sy5zgEts-rs1GJbz0-S1p4TJiDtBpc";
    // const queryURL = "https://maps.googleapis.com/maps/api/directions/json?origin=" + startingPoint + "&destination=" + endingPoint + "&waypoints=" + wayPoints + "&mode=" + modeType + "&key=" + apikey;
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