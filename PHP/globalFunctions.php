<?php

// header function;
// takes $currentPage as an input to assign a title relative to the current page
function general_header($currentPage) {
    echo '<DOCTYPE html>';
    echo '<html>';
    echo '<html lang="en">';
    echo '<head>';
    echo '<meta charset="UTF-8">';

    // takes the page input and sets the title of the current page to that input
    echo '<title>' . $currentPage . '</title>';
    echo '<link rel="stylesheet" href="../CSS/styles.css">';
    echo '<script src = "../JS/login.js"></script>';
    echo '</head>';
    echo '<body onload=checkLogin()>';
    echo '<header>';

    // logo and title images created by me
    echo '<div class="titleAndLogo">';
    echo '<img class="logo" src="../images/logo.png" alt="LOGO">';
    echo '<img class="title" src="../images/tetrisLogo.png" alt="TITLE">';
    echo '</div>';
}

// arrays that hold the names of the web pages and their corresponding php files;
// initialised outside of the function for use in two different functions
$pageName = array("Home", "Game", "Leaderboard", "About Us", "Register");
$pageLink = array("index.php", "game.php", "leaderboard.php", "aboutUs.php", "register.php");
$navIcons = array("index.png", "game.png", "leaderboard.png", "aboutUs.png", "register.png");

// navigation bar function;
// takes $currentPage input to check what page the user is currently on
function navigationBar($currentPage) {

    // calling the previously created arrays using "global" to be used in this function
    global $pageName, $pageLink, $navIcons;

    echo '<div class="navBar">';

    //uses a for loop to create the navigation bar using the arrays 
    for ($x = 0; $x < count($pageName); $x++) {
        echo '<a ';

        // if statement to assign the home class to the home link in the navigation bar;
        // this is because the home button on the bar has slightly different
        // styling than the rest of the buttons
        if ($pageName[$x] == "Home" && !($currentPage == "Home")) {
            echo 'class ="home"';
        }

        // if statement to check what the current page is (i.e. what page has been
        //passed to this function), and if it is the same page as the page being 
        // returned in the current iteration of the for loop, set the class of this page to "current"
        if ($currentPage == $pageName[$x]) {
            echo 'class="current"';
        }

        // uses the current iteration of the for loop to retrieve the page name and
        // php link for that page, and create their links along with an icon that 
        // corresponds to those links
        echo 'href="' . $pageLink[$x] . '">' . $pageName[$x] . '<img src="../images/' . $navIcons[$x] . '" alt="' . $pageName[$x] . '"></a>';
    }
    echo '</div>';

    // login form that rests on the right of the header
    echo '<div class="login" id="login">';
    echo '<label for="uname">Username:</label><br>';
    echo '<input type="text" id="uname" name="uname"><br>';
    echo '<label for="password">Password:</label><br>';
    echo '<input type="password" id="password" name="password">';
    echo '<button onclick ="login()">Login</button>';
    echo '<div class="popup" id="loginPopup">';
    echo '<p class="feedback" id="loginError"></p>';
    echo '</div>';
    echo '</div>';

    // div that is displayed after the user has successfully logged in
    echo '<div class ="loggedInWrap" id="loggedInWrap">';
    echo '<div class = "loggedIn" id = "loggedIn">';
    echo '<img src = "../images/profilePic.png" alt = "PROFILE_PIC">';
    echo '<p id="loginFeedback"></p>';
    echo '<button onclick = "signOut()">Sign Out</button>';
    echo '</div>';
    echo '</div>';
    echo '</header>';
}

// footer function; takes no input
function general_footer() {

    // calling the arrays again for use in a for loop
    global $pageName, $pageLink;

    echo '<footer>';

    // quick links/navigation list in the footer
    echo '<div class="quickLinks">';
    echo '<h>NAVIGATE</h>';
    echo '<ul>';

    // for loop to create the quick links in the footer;
    for ($x = 0; $x < count($pageName); $x++) {
        echo '<li><a href="' . $pageLink[$x] . '">' . $pageName[$x] . '</a></li>';
    }

    echo '</ul>';
    echo '</div>';

    //sign up section with subscribe button 
    echo '<div class="signUp">';
    echo '<h>SIGN UP TO WEEKLY NEWSLETTERS</h>';
    echo '<p>Enter your email below to sign up to a weekly newsletter where we talk ';
    echo 'about all things tetris!</p>';
    echo '<form action="#">';
    echo '<input type="text" placeholder="Email Address" name="mail">';
    echo '<button type="button">SUBSCRIBE</button>';
    echo '</form>';
    echo '</div>';

    // social media icons with links to respective pages
    echo '<div class="socials">';
    echo '<h>FOLLOW US</h>';
    echo '<a href = "https://www.facebook.com" target="_blank"><img src="../images/facebookLogo.png" alt="FACEBOOK"></a>';
    echo '<a href = "https://www.instagram.com" target="_blank"><img src="../images/instagramLogo.png" alt="INSTAGRAM"></a>';
    echo '<a href = "https://www.twitter.com" target="_blank"><img src="../images/twitterLogo.png" alt="TWITTER"></a>';
    echo '<a href = "https://www.linkedin.com" target="_blank"><img src="../images/linkedinLogo.png" alt="LINKEDIN"></a>';
    echo '</div>';

    // short paragraph about this project
    echo '<div class="footerAbout">';
    echo '<h>ABOUT US</h>';
    echo' <p>This is a game page project that I have created for uni. <br>
            I chose to do Tetris because it is a game that I enjoy <br>
            playing in my own time, and I believe that it is a project <br>
            that I will enjoy making and that will challenge me.<br> ';
    echo '</p>';
    echo '</div>';

    // small text at the bottom with privacy and copyright details
    echo '<div class="policies">';
    echo '<p>Privacy Policy</p>';
    echo '<p>Sitemap</p>';
    echo '<p>© 2020 Uni Project</p>';
    echo '</div>';

    echo '</footer>';

    echo '</body>';
    echo '</html>';
}
