<?php

include_once ("globalFunctions.php");

general_header("Register");
navigationBar("Register");
?>
<script src = "../JS/register.js"></script>
<main>

    <div>
        <h1 id="registerHeader">Please enter your details below to register and create an account</h1>

        <!-- a form for registering an account on this website;
        it takes a username, email address, phone number and a password to create an account. -->
        <div class="register" id="register">   
            <p>Fields with <span class="required">*</span> are required</p>
            <div>
                <label for="username">Username:</label><span class="required">*</span>
                <input type="text" placeholder="Username" id="username" name="username" required="required"><br>
                <!-- popup tags are for displaying if the entered data is not valid -->
                <div class="popup" id = "popup3">
                    <p class="feedback" id="usernameError"> ""</p>
                </div>
            </div>
            <div>
                <label for="email">Email Address:</label><span class="required">*</span>
                <input type="email" placeholder="Email Address" id="email" name="email" required="required"><br>
                <div class="popup" id = "popup1">
                    <p class="feedback" id="emailError"> ""</p>
                </div>
            </div>
            <div>
                <label for="phone">Phone Number:</label>
                <input type="text" placeholder="Phone Number" id="phone" name="phone"><br>
            </div>
            <div>
                <label for="passwrd">Password:</label><span class="required">*</span>
                <input type="password" placeholder="Password" id="passwrd" name="passwrd" required="required">
                <div class="popup" id="popup2">
                    <p class="feedback" id="passwordError">""</p>
                </div>
            </div>
            <button onclick = "registerAccount()">Create Account</button>
        </div>

        <!-- message that is displayed after the user has successfully registered an account -->
        <div class = "success">
            <p class="successMessage" id="successMessage">Thank you for registering an account with us! 
                Now you can log in, <a href = "game.php">play Tetris </a>and store your score on our
                <a href ="leaderboards.php">leaderboards</a>.
            </p>
        </div>

    </div>
</main>

<?php

general_footer();
?>