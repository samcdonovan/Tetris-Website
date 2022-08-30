
// function that checks whether or not the username, password and email are valid.
function validityCheck(input) {

    // regex for password checks that is at least 6 characters long, has at least
    // one uppercase letter, has at least one number and has a special character (e.g. "?")
    let passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");

    // regex for email checks that there is a character before the @ and that there are characters
    // before and after the . after the @ symbol
    let emailRegEx = new RegExp(/(.+)@(.+){2,}\.(.+){2,}/);

    // if statements to test the input against the respective regex statements. If the input doesn't satisfy
    // the regex, return false, otherwise return true
    if (input == document.getElementById("passwrd").value) {
        if (!passwordRegEx.test(input)) {
            return false;
        }
        return true;
    }

    if (input == document.getElementById("email").value) {
        if (!emailRegEx.test(input)) {
            return false;
        }
        return true;
    }

    // if the inputted username already exists in localStorage, the input is invalid, so
    // validityCheck(input) returns false.
    if (input == document.getElementById("username").value) {
        if (localStorage[input] !== undefined) {
            return false;
        }
        return true;
    }
}

// function to check that all required parts of the form are filled in
// takes an array as input.
function checkFilledIn(formCheck) {
    let formString = ["username", "email", "passwrd"];

    var i;
    // loops through the passed array (which will consist of the username, email and password
    // that the user inputted), and if any of the elements are null or empty, their input boxes
    // are highlighted in red
    for (i = 0; i < formCheck.length; i++) {
        if (formCheck[i] === null || formCheck[i] === "") {
            document.getElementById(formString[i]).style.borderColor = "red";
            if (i == 0) {
                // for the first occurrence of an empty form, alert the user.
                alert("Please fill all required fields");
            }
        }
        else {
            // if element is not empty or null, the input border stays black
            document.getElementById(formString[i]).style.borderColor = "black";
        }
    }
}

// function that toggles popup error messages for given input
function errorToggle(input) {

    // initialized variables that change depending on given input
    let popup;
    let error;
    let innerHTML;

    if (input !== "" && input !== null) { // only runs if the input is not empty
        switch (input) { // switch on the input to check whether it is email, password or username

            // sets the previously initialized variables to their respective elements in the register.php file
            case document.getElementById("email").value:
                popup = document.getElementById("popup1");
                error = document.getElementById("emailError");
                innerHTML = "'" + input + "' is not in the correct format for an email address.";
                break;
            case document.getElementById("passwrd").value:
                popup = document.getElementById("popup2");
                error = document.getElementById("passwordError");
                innerHTML = "Please use a password that has at least one uppercase letter, a number and a special character.";
                break;
            case document.getElementById("username").value:
                popup = document.getElementById("popup3");
                error = document.getElementById("usernameError");
                innerHTML = "'" + input + "' already exists.";
                break;
            default:
                console.log("error");
                break;
        }

        // if input is valid and error message is still showing, hide the error message
        if (validityCheck(input) && error.classList.contains("show")) {
            error.classList.toggle("show");
            popup.style.position = "absolute";
        }

        // if input is invalid, show error message and change the innerHTML to show the user why their
        // input is invalid
        if (!validityCheck(input)) {
            if (error.classList.contains("show")) {
                error.innerHTML = innerHTML;
            } else {
                error.classList.toggle("show");
                error.innerHTML = innerHTML;
                popup.style.position = "relative";
            }
        }
    }
}

// main register function, called when the user presses the "register button"
function registerAccount() {

    //creates an array to store the user entered information
    let user = {};

    // sets the elements in the array to the user inputs and sets their highscore to 0
    user.username = document.getElementById("username").value;
    user.email = document.getElementById("email").value;
    user.phone = document.getElementById("phone").value;
    user.passwrd = document.getElementById("passwrd").value;
    user.highscore = 0;

    // array that is passed to the checkFilledIn() function
    let formCheck = [user.username, user.email, user.passwrd];
    checkFilledIn(formCheck);

    //errorToggle() is called on all 3 of the required fields whenever the "register button" is pressed
    errorToggle(user.username);
    errorToggle(user.email);
    errorToggle(user.passwrd);

    // check to see if all 3 required fileds are valid 
    if (validityCheck(user.passwrd) && validityCheck(user.email) && validityCheck(user.username)) {

        // if any error popups are currently showing for the 3 fields, remove them
        if (email.classList.contains("show")) {
            email.classList.toggle("show");
            popup1.style.position = "absolute";
        }
        if (password.classList.contains("show")) {
            password.classList.toggle("show");
            popup2.style.position = "absolute";
        }
        if (username.classList.contains("show")) {
            username.classList.toggle("show");
            popup3.style.position = "absolute";
        }

        // change innerHTML of the error messages to empty
        passwordError.innerHTML = "";
        emailError.innerHTML = "";
        usernameError.innerHTML = "";

        // stringify and store the user array, with their username as the key
        localStorage[user.username] = JSON.stringify(user);

        // hide the register form, and show a message in its place confirming that registration is complete
        document.getElementById("register").classList.toggle("hide");
        document.getElementById("successMessage").classList.toggle("show");
        document.getElementById("registerHeader").innerHTML = "<b>Registration successful!</b>";
    }
}