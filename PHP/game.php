<?php
include_once ("globalFunctions.php");

general_header("Game");
navigationBar("Game");
?>

<main >

    <!-- play button -->
    <div class="play" id="play">
        <button onclick="difficultySelect()" class="playButton" >PLAY</button>
        <p id="playLogin"></p> 
        <p id="playMessage"></p>
    </div>

    <!-- difficulty select screen that displays after pressing the play button -->
    <div class="difficulty" id="difficulty">
        <div class="difficultyButtons">
            <button onclick="easy()">EASY</button>
            <button onclick="medium()">MEDIUM</button>
            <button onclick="hard()">HARD</button>
            <button onclick="chaos()">CHAOS</button>
        </div>
    </div>

    <!-- explanation of how to score points, shown at the same time as the difficulty screen -->
    <div class="scoreExplanation" id="scoreExplanation">
        <div id="points">
            <p>Points System: </p>
            <p>Pressing down = 1 point (per press)</p>
            <p>1 line cleared = 1000 points</p>
            <p>2 lines cleared = 3000 points</p>
            <p>3 lines cleared = 5000 points</p>
            <p>4 lines cleared = 8000 points</p>
        </div>
        <div id="difficultyMultiplier">
            <p>Difficulty Multipliers: </p>
            <p>EASY = 1x</p>
            <p>MEDIUM = 2x</p>
            <p>HARD = 3x</p>
            <p>CHAOS = 4x</p>
        </div>
    </div>

    <!-- game screen that displays after selecting a difficulty -->
    <div class="game" id="game">
        <div class="tetris">
            <canvas class="gameboard" id="gameboard"></canvas>
            <div class="canvasBorder"></div>
            <div class="timer">      
                <p>TIME: </p>
                <p id = "timerCount"> 00:00</p>
            </div>

            <div class="score">
                <p>SCORE: </p>
                <p id="score"> 0</p>
            </div>
        </div>
        <!-- keyboard arrow images and short explanation of the controls for the game -->
        <div class="upDownArrows">
            <div class="up">
                <img src="../images/upArrow.png" alt="UP ARROW">
                <p>Rotates the piece 90 degrees clockwise</p>
            </div>
            <div class="down">
                <img src="../images/downArrow.png" alt="DOWN ARROW">
                <p>Sends the piece straight down</p>
            </div>
        </div>
        <div class="leftRightArrows">
            <div class="left">
                <img src="../images/leftArrow.png" alt="LEFT ARROW">
                <p>Moves the piece left</p>
            </div>
            <div class="right">
                <img src="../images/rightArrow.png" alt="RIGHT ARROW">
                <p>Moves the piece right</p>
            </div>
        </div>
        <div class="esc">
            <img src="../images/esc.png" alt="ESCAPE KEY">
            <p>Finishes the game!</p>
        </div>
    </div>

    <!-- shows the gameOver screen -->
    <div class="gameOver" id="gameOver">
        <p id= "gameOverMessage">GAME OVER</P>
        <p id= "highscore"></p>
    </div>

</main>
<script src = "../JS/game.js"></script>
<?php
general_footer();
?>

