<?php
// included globalFunctions in every page to use header, navigation bar and footer functions
include_once ("globalFunctions.php");

// header and navigation bar functions calls;
// current page is home so that is the input; 
// this is the same for every page except for the input
general_header("Home");
navigationBar("Home");
?>

<main>

    <!-- placeholder video taken from youtube using their embed feature;
        this feature generates html code to embed any youtube video into your own pages -->   
    <iframe src="https://www.youtube.com/embed/63hoSNvS6Z4" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


    <!-- information about the game of tetris -->
    <div class="gameInfo">
        <h1>The Game of Tetris!</h1>
        <p>
            Tetris was originally published in 1984, created by Alexey Pajitnov, 
            and has since been a staple in gaming history. It is a tile-matching 
            game, one that is relatively simple to understand and easy to get 
            into, but once you look past the surface, has a level of complexity that even 
            hardcore gamers will find enjoyable. So you want to test your Tetris skills?
            You can do that here, on this very website! All you need to do is
            <a href="register.php">register an account </a> and then head on over to 
            the <a href="game.php">game page</a> to play Tetris!
        </p>
    </div>

</main>

<?php
// footer function takes no input
general_footer();
?>