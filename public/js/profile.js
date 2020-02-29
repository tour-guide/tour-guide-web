$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get(`/api/user/${user}`)
    .then(data => {
      // add user data
      $("#user-fullname").text(`${data.firstName} ${data.lastName}`);
      $("#bio-text").text(data.profile);
      $("#user-firstname").text(data.firstName);
      getStories(data.firstName, data.lastName, data.profilePic);  
    });
});

function getStories(firstName, lastName, profilePic) {
  //get all stories associated with a user's id
  $.get(`/api/stories/${user}`)
    .then(data => {
      if (data.length !== 0) {
        data.forEach(story => {
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

$(document).on("click", "#start-story", function() {
  const storySlug = $(this).data("story");
  //go to the story page indicated
  $.get(`/story/${storySlug}`)
});


