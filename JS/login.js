
// function that runs whenever a page is loaded; checks whether or not a user is logged in
function checkLogin() {
    if (sessionStorage.getItem('loggedIn')) { // checks if a user is logged in
        document.getElementById("login").classList.toggle("hide"); // hides the login form
        document.getElementById("loggedIn").classList.toggle("show"); // shows the logged in icon
        document.getElementById("loginFeedback").innerHTML = sessionStorage.loggedInUser + " logged in."; // shows which user is logged in
    }
}

// main login function, called when login button is pressed
function login() {
    let uname = document.getElementById("uname").value; // retrieves username input from username field in the login from
    // this is called "uname" to avoid conflicts with "username" in the register page

    if (localStorage[uname] !== undefined) { // checks that a user with the entered username exists in localStorage

        let user = JSON.parse(localStorage[uname]); // sets "user" to the user object in localStorage
        let password = document.getElementById("password").value; // sets "passwords" to the password that the user entered

        if (password === user.passwrd) { // checks that the entered password is the same associated with the user

            document.getElementById("loginError").innerHTML = ""; // empties the popup message
            document.getElementById("login").classList.toggle("hide"); // hides the login form

            document.getElementById("loggedIn").classList.toggle("show"); // shows the logged in icon
            document.getElementById("loginFeedback").innerHTML = user.username + " logged in."; // shows which user is logged in

            sessionStorage.loggedInUser = user.username; // creates an item in sessionStorage which stores the username of the logged in user
            sessionStorage.setItem("loggedIn", true); // sets logged in status to "true"

            if (document.getElementById("loginError").classList.contains("show")) { // checks if the error popup is still showing
                document.getElementById("loginError").classList.toggle("show"); // hides the popup if it is still there
            }
        } else { // if the entered password is not the correct password for the user

            // shows the popup error for the password being incorrect
            if (document.getElementById("loginError").classList.contains("show")) {
                document.getElementById("loginError").innerHTML = "Password not correct. Please try again.";
            } else {
                document.getElementById("loginError").classList.toggle("show");
                document.getElementById("loginError").innerHTML = "Password not correct. Please try again.";
            }
        }
    }
    else { // if the entered username does not exist in localStorage

        // shows the popup error for if the username is not recognised
        document.getElementById("loginError").innerHTML = "Username not recognised. Do you have an account?";
        document.getElementById("loginError").classList.toggle("show");
    }
}

// function for signing out
function signOut() {

    // when the button is pressed, the login form is hidden and the loggedIn element is shown in its place
    document.getElementById("loggedIn").classList.toggle("show");
    document.getElementById("login").classList.toggle("hide");

    // removes the logged in user and logged in status from sessionStorage
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('loggedIn');
}