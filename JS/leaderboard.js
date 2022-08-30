
let userArray = [];
let user;

// function to be called after the HTML for the leaderboard page has loaded.
function leaderboard() {

    // Object.keys returns an array of keys from the localStorage.
    // forEach loop loops through all of the users in localStorage and pushes any that have a score higher than 0 into an array.
    Object.keys(localStorage).forEach(function (key) {
        user = JSON.parse(localStorage[key]);
        if (user !== undefined) {
            if (user.highscore > 0) {
                userArray.push(user.username);
            }
        }
    });

    let temp;

    // bubble sort algorithm to sort the previously created array by score in descending order.
    for (var i = 0; i < userArray.length - 1; i++) {
        for (var j = 0; j < userArray.length - i - 1; j++) {
            if (JSON.parse(localStorage[userArray[j]]).highscore < JSON.parse(localStorage[userArray[j + 1]]).highscore) {
                temp = userArray[j];
                userArray[j] = userArray[j + 1];
                userArray[j + 1] = temp;
            }
        }
    }

    // loops through the now sorted array and inserts them into the innerHTML of the leaderboard.
    for (var i = 0; i < userArray.length; i++) {
        if (sessionStorage.getItem('loggedInUser') == userArray[i]) { // if user is logged in, highlight that row
            document.getElementById("leaderboard").innerHTML += "<tr class='" + "highlighted" + "'><td>" + (i + 1) + "</td><td>" + userArray[i] +
                "</td><td>" + JSON.parse(localStorage[userArray[i]]).highscore + "</td></tr>";
        } else {
            document.getElementById("leaderboard").innerHTML += "<tr><td>" + (i + 1) + "</td><td>" + userArray[i] +
                "</td><td>" + JSON.parse(localStorage[userArray[i]]).highscore + "</td></tr>";
        }
    }
}
