$(document).on("click", "#start-story", function() {
  const storySlug = $(this).data("story");
  //go to the story page indicated
  $.get(`/story/${storySlug}`)
});