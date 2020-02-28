let chapterAudArray = [];
let cNum = 0;
let uniquestoryImage = "";
let chapterNum = 1;

$(document).ready(function () {
  const storyForm = $("form.new-story");
  const storyImage = $("#story-image");
  let storyCity = "";
  let storyState = "";

  // kick off db writes when the save story button is clicked
  storyForm.on("submit", event => {
    event.preventDefault();

    const storyMeta = {
      storyName: $("#story-name").val(),
      location: $("#story-loc").val().trim(),
      storyCity: $("#story-city").val().trim(),
      storyState: $("#story-state").val().trim(),
      storyTransit: $("#story-transit").val(),
      info: $("#story-text").val(),
      storyImage: uniquestoryImage
    };

    createStory(storyMeta);
  });


  $("#next-chapter").on("click", () => {
    //increment chapter number
    chapterNum++;
    //get prev city/state
    if ($("#story-city").val()){
      storyCity = $("#story-city").val().trim();
    } else {
      storyCity = "City";
    }
    if ($("#story-state").val()){
      storyState = $("#story-state").val().trim();
    } else {
      storyState = "State";
    }
    const chapterblock = $("<div>");
    const headrow = $("<hr>");
    const chHead = $("<h3>").text(`Chapter ${chapterNum}`);
    const chName = $("<div>").attr("class", "form-group col s12")
      .append($("<input>").attr("type", "text").attr("class", "form-control").attr("data-chapter", chapterNum).attr("id", "chapter-name").attr("placeholder", "Name"));
    const chLocation = $("<div>").attr("class", "form-group col s12")
      .append($("<input>").attr("type", "text").attr("class", "form-control").attr("data-chapter", chapterNum).attr("id", "chapter-location").attr("placeholder", "Location"));
    const chCity = $("<div>").attr("class", "form-group col s6")
      .append($("<input>").attr("type", "text").attr("class", "form-control").attr("data-chapter", chapterNum).attr("id", "chapter-city").attr("value", storyCity));
    const chState = $("<div>").attr("class", "form-group col s6")
      .append($("<input>").attr("type", "text").attr("class", "form-control").attr("data-chapter", chapterNum).attr("id", "chapter-state").attr("value", storyState));
    const chAudio = $("<div>").attr("class", "form-group col s12")
      .append($("<label>").attr("for", "chapter-audio").text("Upload Your Audio File"))
      .append($("<input>").attr("type", "file").attr("class", "waves-effect waves-light btn-large fairy-button").attr("data-chapter", chapterNum).attr("id", "chapter-audio").attr("accept", "audio/*"));
    chapterblock.append(headrow).append(chHead).append(chName).append(chLocation).append(chCity).append(chState).append(chAudio);
    $("#next-chapter").before(chapterblock);
  });

  storyImage.on("change", imgUpload);

});

$(document).on("change", "#chapter-audio", function() {
  cNum = $(this).data("chapter")
  audioUpload(cNum);
});


function uploadFile(file, signedRequest) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        alert("File uploaded!")
      }
      else {
        alert("Could not upload file.");
      }
    }
  };
  xhr.send(file);
}

function getSignedRequest(file) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else {
        alert("Could not get signed URL.");
      }
    }
  };
  xhr.send();
}

function imgUpload() {
  //get the file selected by the user
  const newfile = document.getElementById("story-image").files[0];
  //if null, don't do anything
  if (newfile.name === null) {
    return alert("No file selected.");
  } else {
    uniquestoryImage = `https://audio-tour.s3.amazonaws.com/${encodeURIComponent(newfile.name)}`;
    getSignedRequest(newfile);
  }
}

function audioUpload(id) {
  //get the file selected by the user
  const newfile = document.getElementById("chapter-audio").files[0];
  //if null, don't do anything
  if (newfile.name === null) {
    return alert("No file selected.");
  } else {
    chapterAudArray[cNum] = `https://audio-tour.s3.amazonaws.com/${encodeURIComponent(newfile.name)}`;
    getSignedRequest(newfile);
  }
}

function createChapters(data) {
  //use chapterNum to get number of chapters
  for (let i = 1; i <= chapterNum; i++){
    console.log("this chapter audio is: " + chapterAudArray[chapterNum]);
    $.post("/api/chapter", {
      StoryId: data.id,
      chapNumber: chapterNum,
      chapName: $("#chapter-name").attr("data-chapter", chapterNum).val(),
      chapLocation: $("#chapter-location").attr("data-chapter", chapterNum).val(),
      chapCity: $("#chapter-city").attr("data-chapter", chapterNum).val(),
      chapState: $("#chapter-state").attr("data-chapter", chapterNum).val(),
      chapAudio: chapterAudArray[chapterNum]
    })
      .then(data => {
        console.log(`Chapter ${chapterNum} created!`)
      })
  }
}

function createStory(storyMeta) {
  const { storyName, location, storyCity, storyState, storyTransit, info, storyImage } = storyMeta;

  $.post("/api/story", {
    storyName,
    location,
    storyCity,
    storyState,
    storyTransit,
    info,
    storyImage
  })
    .then(data => {
      createChapters(data);
    });
}
