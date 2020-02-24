$(document).ready(function () {
  const storyForm = $("form.new-story");
  const storyImage = $("#story-image");
  let uniquestoryImage = "";

  // kick off db writes when the save story button is clicked
  storyForm.on("submit", event => {
    event.preventDefault();

    const storyMeta = {
      storyName: $("#story-name").val(),
      location: $("#story-loc").val().trim(),
      info: $("#story-text").val(),
      storyImage: uniquestoryImage
    };

    createStory(storyMeta);
  });
  
  storyImage.on("change", imgUpload);

  function uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert("File uploaded!")
          console.log("=============== file uploaded===============")
          console.log(url);
          //save the name of the file to the db so we can get it later
          uniquestoryImage = url;
          //document.getElementById('preview').src = url;
          //document.getElementById('avatar-url').value = url;
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
    console.log("============imgUpload================");
    console.log(newfile.name);
    //if null, don't do anything
    if (newfile.name === null) {
      return alert("No file selected.");
    } else {
      //give the file a new extension and put it back on the filename
      const fileName = Math.random().toString(36).substring(7) + new Date().getTime();
      newfile.key = `${fileName}/${newfile.name}`;
      console.log("================ renamed file =================");
      console.log(newfile.key);
      //now pass the file to the signed request function
      getSignedRequest(newfile);
    }

  }

  function createStory(storyMeta) {
    const { storyName, location, info, storyImage } = storyMeta;

    $.post("/api/story", {
      storyName,
      location,
      info,
      storyImage
    })
      .then(data => {
        console.log("=================story data================")
        console.log(data);
      });
  }
});
