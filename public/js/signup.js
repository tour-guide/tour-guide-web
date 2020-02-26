$(document).ready(function() {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const fNameInput = $("#firstname-input");
  const lNameInput = $("#lastname-input")
  const emailInput = $("#email-input");
  const passwordInput = $("#password-input");
  const profile = $("#bio-text");

  // When the signup button is clicked, we validate the firstname, email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    
    const userData = {
      firstName: fNameInput.val().trim(),
      lastName: lNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      profile: profile.val()
    };

    if (!userData.email || !userData.password || !userData.firstName) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.firstName, userData.lastName, userData.email, userData.password, userData.profile);
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, email, password, profile) {
    $.post("/api/signup", {
      firstName,
      lastName,
      email,
      password,
      profile
    })
      .then( data => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up an alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
