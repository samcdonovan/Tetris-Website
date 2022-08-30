// NOTE
// In this JavaScript file, the word "Tetromino" is used frequently. A Tetromino is simply a Tetris piece.

// -------------------------------------------------------------------------
// GLOBAL VARIABLES

// canvas variables
let canvas = document.getElementById("gameboard"); // canvas is set as the canvas tag in the game.php page
let context = canvas.getContext("2d"); // sets the canvas context as 2d

let username = sessionStorage.getItem("loggedInUser"); // retrieves the loggedInUser item from sessionStorage

// difficulty variables
let interval; // variable to change setInterval timer to make the tetromino move down at different speeds
let difficultyMultiplier; // score multiplier that changes based on chosen difficulty

let score = 0; // initialize score to 0

let placed = false; // variable to check if tetromino is placed

// multidimensional board array that represents the board and all of the squares on the board
var board = new Array(18); // represents the rows of the board
for (var i = 0; i < 18; i++) {
    board[i] = new Array(10); // represents the cplumns of the board
    board[i].fill(0); // initializes all board values to 0 (empty)
}

let r = 0; // rotation value used to retrieve the current rotation of the tetromino

let colours = ["#FFA800", "#852CC8", "#1DC73F", "#FF0505", "#FF00EE", "#FFEE00", "#5BB2EC"]; // array that holds all 7 colours of the Tetrominos

let gameOverStatus = false; // boolean to check whether a game over has happened

// -------------------------------------------------------------------------
// PAGE INITIALIZATION

// when the page is loaded, the difficulty, scoreExplanation, game and gameOver divs are hidden.
// they remain hidden it is appropriate to show them.
document.getElementById("difficulty").classList.toggle("hide");
document.getElementById("scoreExplanation").classList.toggle("hide");
document.getElementById("game").classList.toggle("hide");
document.getElementById("gameOver").classList.toggle("hide");

// the following code is used to display a message underneath the play button. 
// this message changes depending on whether the user is logged in and whether or not they have played the game yet.
if (sessionStorage.getItem("loggedIn")) { // checks sessionStorage to see if the user is logged in
    document.getElementById("playLogin").innerHTML = "You are logged in as " + username + ".";

    let user = JSON.parse(localStorage[username]); // returns user object from given username key
    if (user.highscore == 0) { // "haven't played" message
        document.getElementById("playMessage").innerHTML = "You don't currently have a high score, because you haven't " +
            "played yet! Press the play button to change that!";
    } else { // "have played" message
        document.getElementById("playMessage").innerHTML = "Your current high score is " + user.highscore + "!";
    }
} else { // "not logged in" message
    document.getElementById("playLogin").innerHTML = "You are not logged in.";
    document.getElementById("playMessage").innerHTML = "You can still play Tetris" +
        " but your score will not be saved! If you would like to save your score and have not yet made an account, you can register "
        + "<a href='" + "../PHP/register.php" + "'>here!</a> Otherwise, you can login in the top right-hand corner of the page.";
}

// function that draws the gameboard
function drawGameboard() {

    context.canvas.height = 18 * 25; // canvas height is 18 multiplied by the size of the blocks
    context.canvas.width = 10 * 25; // canvas width is 10 multiplied by the size of the blocks
    // the width and height correspond to the length of the board arrays

    if (!placed) { // checks that the tetromino isn't placed when board is drawn
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) { // loops through the entire board array

                // for every position in the board array, draw an invisible square
                context.beginPath();
                context.rect((j * 25) + 0.5, (i * 25) + 0.5, 25, 25);
                context.strokeStyle = "black";
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.stroke();
            }
        }
    } else if (placed) { // checks that the tetromino has been placed

        // if tetromino has been placed, the board array will reflect this as the value of the blocks where
        // the tetromino was placed will be the color of the tetromino (e.g. if a blue tetromino was placed, those 
        // blocks will now be of value "blue")

        // this clears the entire canvas and redraws it with the new values in the board array 
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) {
                if (board[i][j] !== 0) {

                    // set fillStyle to black to draw the border of the blocks
                    context.fillStyle = "black";
                    context.fillRect(pos(this.x + j), pos(this.y + i), 25, 25);

                    // set fillStyle to the value of the squares that aren't 0
                    // draw these blocks on the board, effectively "placing" them
                    context.fillStyle = board[i][j];
                    context.fillRect(pos(j), pos(i), 25 - 3, 25 - 3);
                }
            }
        }
    }
}

// function that returns the position on the canvas given the coordinate from the board array
function pos(p) {
    return p * 25; // coordinate multiplied by the size of the blocks
}

// -------------------------------------------------------------------------
// DIFFICULTY AND SCORE FUNCTIONS

// difficulty functions that change the speed at which the tetromino falls and the score multiplier
function easy() {
    interval = 1000
    difficultyMultiplier = 1;
    play();
}
function medium() {
    interval = 500
    difficultyMultiplier = 2;
    play();
}
function hard() {
    interval = 100;
    difficultyMultiplier = 3;
    play();
}
function chaos() {
    interval = 50;
    difficultyMultiplier = 4;
    play();
}

// function that is called when the play button is pressed
function difficultySelect() {

    // hides the play button and shows the difficulty select screen and score explanation
    document.getElementById("play").classList.toggle("hide");
    document.getElementById("difficulty").classList.toggle("hide");
    document.getElementById("scoreExplanation").classList.toggle("hide");
}

// takes a score as the input and updates the score variable
function updateScore(x) {
    score += x * difficultyMultiplier; // adds the input multiplied by the difficulty multiplier to the score
    document.getElementById("score").innerHTML = score; // updates the game screen score value
}

// -------------------------------------------------------------------------
// TETROMINO CLASS

// this is the Tetromino class, which is used to create the tetris tetromino.
// it contains class members that define what tetromino is on the board and its position on the board.
// it also contains member functions which are all used to control the tetromino on the board.

class Tetromino {
    constructor(color) { // constructor takes color as argument
        // all other class variables are set when the tetromino is created

        this.color = color; // sets the color of the tetromino, which determines its shape
        this.shape = []; // shape is initialized as an empty array but is changed by calling the setShape() function

        // the initial x and y coordinates draw the tetromino at the top of the board
        this.y = 0;
        this.x = 4;

    }

    // class method that sets the shape of the tetromino based on its color.
    // the color is set when the tetromino is drawn on the board. 
    setShape(color) {

        // sets the shape to a multiple dimensional array that is looped through to draw the tetrominos on the board.
        // there are 4 variations of the arrays that correspond to different rotations of the tetromino.
        switch (color) {
            case "#FFA800":
                this.shape = [
                    [
                        [1, 0, 0, 0],
                        [1, 0, 0, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 0],
                        [1, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [1, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                break;
            case "#852CC8":
                this.shape = [
                    [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 0, 0, 0],
                        [1, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 1],
                        [0, 0, 0, 1],
                        [0, 0, 0, 0]
                    ]
                ];
                break;
            case "#1DC73F":
                this.shape = [
                    [
                        [0, 0, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                break;
            case "#FF0505":
                this.shape = [
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 0, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 0, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                break;
            case "#FF00EE":
                this.shape = [
                    [
                        [1, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [1, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                break;
            case "#FFEE00":
                this.shape = [
                    [
                        [1, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                break;
            case "#5BB2EC":
                this.shape = [
                    [
                        [1, 0, 0, 0],
                        [1, 0, 0, 0],
                        [1, 0, 0, 0],
                        [1, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [0, 0, 0, 0]
                    ]
                ];
                break;
            default:
                console.log(color + " does not exist.");
                break;
        }
    }

    // class method that creates or redraws a tetromino whenever it is called
    createTetromino() {
        if (this.x == 4 && this.y == 0) { // checks if tetromino is in starting position
            r = 0; // sets tetrominos rotation to initial rotation
        }

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) { // loops through the shape array of the tetromino
                if (this.shape[r][i][j] != 0) {
                    // whenever a 1 is encountered in the shape array, draw a block in that position.
                    // the position of the block is calculated by adding the x or y coordinates of the 
                    // tetromino to the current position in the shape array, and then passing this value to pos() 
                    // which will return a position on the canvas.

                    // firstly draws the border of the blocks
                    context.fillStyle = "black";
                    context.fillRect(pos(this.x + j), pos(this.y + i), 25, 25);

                    // then sets the fill colour to the colour of the tetromino and draws the blocks in their
                    // respective positions
                    context.fillStyle = this.color;
                    context.fillRect(pos(this.x + j), pos(this.y + i), 25 - 3, 25 - 3); // -3 from the block size to accomodate for the border
                    board[this.y + i][this.x + j] = 1; // sets the value of the squares in the board array to 1.
                    // this is done to later check for collision
                }
            }
        }
    }

    // class method that sets an interval and every time that interval passes, it adds 1 to this.y.
    // this moves the tetromino down by one block
    tetrominoDrop() {
        var that = this;

        if (!placed && !gameOverStatus) { // checks if the tetromino isn't placed and if the user hasn't had a game over
            var timer = setInterval(function () {

                if (!checkEmpty(getBlockPos()) && that.y === 0) {
                    // this checks that the tetromino is in its starting position.
                    // if the block below it isn't empty, the user gets a game over
                    gameOverStatus = true; // game over has occurred
                    gameOver(); // runs gameOver function
                }

                if (checkEmpty(getBlockPos())) { // checks that all blocks below the lowest blocks in the tetromino are empty

                    that.clearTetromino(); // clears previous location
                    that.y++; // adds one to y coordinate
                    that.createTetromino(); // draws tetromino in new location
                } else {
                    placed = true;
                    that.placeTetromino();
                    clearInterval(timer);
                }
            }, interval); // interval changes based on selected difficulty
        }
    }

    // class method to start the keydown listener for controlling the tetromino
    keyPress() {
        var that = this;

        document.addEventListener('keydown', event => {

            if (!gameOverStatus) { // only runs if game over hasn't occured, stops running when game over has occurred

                // checks if the esc key (keycode 27) is pressed
                if (event.keyCode === 27) {
                    gameOverStatus = true; // game over has occurred
                    gameOver(); // runs gameOver function
                }

                // every time the key down listener is called, before the coordinates are changed by the key presses,
                that.clearTetromino();

                // checks if the up arrow (keycode 38) is pressed.
                // when the up arrow is pressed, the tetromino rotates
                if (event.keyCode === 38) {

                    // for each event I have added "event.preventDefault()" which stops the keys from performing their default action
                    // which is usually controlling the scrollbar on the pages.
                    event.preventDefault();

                    if (r == 3) {
                        // there are only 4 rotations for every tetromino, so when a tetromino is on rotation 4, 
                        // pressing up sets the current rotation back to 0
                        r = 0;
                    } else {
                        // otherwise change the current rotation to the next one
                        r++;
                    }
                }

                // checks if the down arrow (keycode 40) is pressed and there is nothing below the lowest block(s)
                if (event.keyCode === 40 && checkEmpty(getBlockPos())) {

                    // add 1 to the y coordinate of the tetromino 
                    // to move downwards, the y coordinate needs to be increased because the boards y coordinates 
                    // starts from 0 which is at the top of the board and ends at 19  which is at the bottom
                    event.preventDefault();
                    that.y++;

                    updateScore(1); // adds 1 to the score if the down arrow is pressed

                }

                // checks if the right arrow (keycode 39) is pressed and that there is nothing stopping the tetromino from moving right
                // (e.g. another tetromino or the game border)
                if (event.keyCode === 39 && board[that.y][that.x + that.furthestRightX() + 1] == 0) {
                    event.preventDefault();
                    that.x++; // increases x coordinate
                }

                // checks if the left arrow (keycode 37) is pressed and that there is nothing stopping the tetromino from moving left
                if (event.keyCode === 37 && board[that.y][that.x + that.furthestLeftX() - 1] == 0) {
                    event.preventDefault();
                    that.x--; // decreases x coordinate
                }
            }
        });
        that.createTetromino(); // after the keydown event has occurred, redraw the tetromino with its new x and y coordinates
    }

    // class method that clears the squares in the previous position off of the canvas. 
    // this is how I have animated the tetrominos moving. When a tetromino moves, before the coordinates have changed,
    // the board is cleared in its previous position, then the coordinates are changed and the tetromino is redrawn in the new position
    clearTetromino() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) { // loops through shape array of this tetromino
                if (this.shape[r][i][j] != 0) {
                    context.clearRect(pos(this.x + j), pos(this.y + i), 25, 25); // clears squares in given position
                    board[this.y + i][this.x + j] = 0; // changes values of squares in the board array to 0
                }
            }
        }
    }

    // class method that places tetromino when it cannot move down any further 
    // i.e. if the tetromino has reached the bottom or there is a block below it
    placeTetromino() {
        var that = this;
        setTimeout(function () { // 1000ms pass before the tetromino is actually placed
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) { // loops through the shape array
                    if (that.shape[r][i][j] != 0) {
                        // for every square in the shape array that isn't 0, find that square on the board
                        // and change it's value to the color of the tetromino
                        // e.g. if a blue tetromino is placed, the value of the square where it is placed on the board will be blue                    
                        board[that.y + i][that.x + j] = that.color;
                    }
                }
            }
            placed = true; // tetromino is placed
            clearRows(); // checks to see if any rows are complete and removes them
            update(that); // starts update loop again 
        }, 1000);
    }

    // class method to find the block on the current tetromino that is furthest to the right
    furthestRightX() {
        let rightX = 0; // initialises rightX as the furthest left block
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) { // loops through shape array of current tetromino
                if (this.shape[r][i][j] != 0) {
                    if (j > rightX) { // if current iteration is higher than rightX, set rightX as the current iteration
                        rightX = j;
                    }
                }
            }
        }
        return rightX; // return x coordinate of the block furthest to the right
    }

    // class method to find the block on the current tetromino that is furthest to the left
    furthestLeftX() {
        let leftX = 4; // initialises leftX as the furthest right block
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) { // loops through shape array of current tetromino
                if (this.shape[r][i][j] != 0) {
                    if (leftX > j) { // if current iteration is lower than leftX, set leftX as the current iteration
                        leftX = j;
                    }
                }
            }
        }
        return leftX; // return x coordinate of the block furthest to the left
    }
}

// -------------------------------------------------------------------------
// BOARD STATE FUNCTIONS

// function that returns an array consisting of the lowest blocks in the current tetromino
function getBlockPos() {
    let lowest = 0; // value to compare lowest y pos to 
    let blockArray = []; // array to hold all of the lowest blocks

    // when a tetromino is dropping, the value of the squares it occupies is 1.
    // this loops through the entire board and looks for any position in the board array whose value is 1.
    // it then finds the lowest position whose value is 1 and sets "lowest" to that Y coordinate
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] == 1) {
                if (i > lowest) {
                    lowest = i;
                }
            }
        }
    }

    // loops through the row that has the lowest block and pushes all of the blocks with value of 1 into an array
    for (var j = 0; j < board[0].length; j++) {
        if (board[lowest][j] == 1) {
            blockArray.push([lowest, j]);
        }
    }
    return blockArray;
}

// function that takes an array that consists of block positions as the input.
// returns true or false based on whether or not the block below those coordinates is empty
function checkEmpty(array) {
    let x;
    let y;

    // some tetrominos have multiple blocks at the lowest Y position (e.g. the long block).
    // we use emptyCount to keep track of how many blocks are empty below the lowest blocks
    let emptyCount = 0;

    for (var i = 0; i < array.length; i++) {
        y = array[i][0]; // takes the first element of the current block in the loop and sets it as the y coordinate
        x = array[i][1]; // takes the second element of the current block in the loop and sets it as the x coordinate
        if (board[y + 1] === undefined) { // if the tetromino is at the bottom return false
            return false;
        } else if (board[y + 1][x] == 0) { // checks if the block below the current block is empty               
            emptyCount++; // add one to the empty count
        }
    }

    // checks if the empty count is the same as the number of lowest blocks (e.g for a sideways long
    // block, there are 4 lowest blocks so the emptyCount must be 4 in order for the tetromino to move down)
    if (emptyCount == array.length) {
        return true;
    } else {
        return false;
    }
}

// function to check if the given row is empty
function emptyRow(row) {
    for (var j = 0; j < 10; j++) {
        if (board[row][j] != 0) { // returns false if any square in the row does not equal 0 (empty)
            return false;
        }
    }
    return true;
}

// function that clears any rows that are completed
function clearRows() {
    let counter = 0; // counter variable for counting how many squares in a row aren't empty
    let rows = 0; // variable for counting how many rows are removed
    let temp = []; // temporary array for storing x coordinates of the rows that have been removed
    for (var i = 0; i < board.length; i++) {
        counter = 0;
        for (var j = 0; j < board[0].length; j++) { // loops through whole board
            if (board[i][j] != 0) { // counts how many squares aren't empty
                counter++;
            }
            if (counter === 10) { // checks if every square in a row isn't empty
                rows++; // adds one to rows every time counter is 10
                board[i].fill(0);
                temp.push(i); // pushes the x coordinate into the temporary array
            }
        }
    }

    let tempHigh = 0; // variable for the highest number in the temporary array
    for (var i = 0; i < temp.length; i++) { // loops through the temporary array
        if (temp[i] > tempHigh) {
            tempHigh = temp[i]; // sets tempHigh to the lowest row that was removed
        }
    }

    for (var i = tempHigh - rows; i > 0; i--) { // loops through the board up to the lowest row that was removed
        if (!emptyRow(i)) {
            board[i + rows] = board[i];
            board[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // move all rows that aren't empty down by the amount of rows removed 
            // e.g. if 4 rows are removed, move all non-empty rows down by 4 rows
        }
    }

    switch (rows) { // switch on the rows removed; more points are scored for every subsequent row removed
        // up to 4 rows can be removed at once
        case 1:
            updateScore(1000);
            break;
        case 2:
            updateScore(3000);
            break;
        case 3:
            updateScore(5000);
            break;
        case 4:
            updateScore(8000);
            break;
        default:
            updateScore(0);
            break;
    }
}

// -------------------------------------------------------------------------
// GAME LOOP

// game timer
function timer() {
    let secondsCount = 0;
    let minutesCount = 0;
    setInterval(function () { // this function is called once every 1000ms
        secondsCount++;  //acts as a seconds counter

        if (secondsCount < 10) {
            secondsCount = "0" + secondsCount;
        }

        if (secondsCount == 60) { // displays the time in a 0:00 (minutes:seconds) format
            minutesCount++;
            secondsCount = 0;
        }
        // inserts the timer into the timer element in the HTML
        document.getElementById("timerCount").innerHTML = minutesCount + " : " + secondsCount;
    }, 1000);
}

// main game function; called after a difficulty is selected
function play() {

    // hides the difficulty screen and shows the game screen
    document.getElementById("difficulty").classList.toggle("hide");
    document.getElementById("scoreExplanation").classList.toggle("hide");
    document.getElementById("game").classList.toggle("hide");

    drawGameboard(); // draws the gameboard on the game screen (using canvas)

    // Math.random produces a number between 0 and 6 which acts as the index for the array of colours 
    let randColour = colours[Math.floor(Math.random() * 7)];

    let tetromino = new Tetromino(randColour); // creates a new tetromino object with the var name 'tetromino'

    tetromino.setShape(tetromino.color); // sets the shape of the tetromino based on what colour it is passed

    tetromino.createTetromino(); // draws the tetromino on the board
    timer(); // starts the game timer
    tetromino.keyPress(); //starts a keydown listener which allows the user to control the tetromino
    update(tetromino); // update loop for the game
}

// update loop which takes the object as its parameter
function update(tetromino) {
    if (!placed) { // if the tetromino is not currently placed calls the Tetromino.tetrominoDrop() function
        tetromino.tetrominoDrop();
    } else if (placed) { // if the tetromino is placed, resets the tetromino, sets "placed" to false and starts the update loop again
        reset(tetromino);
        placed = false;
        update(tetromino);
    }
}

// function to reset the x and y coordinates of the tetromino and change the colour and shape
// used to effectively create a new tetromino on the board
function reset(tetromino) {
    drawGameboard(); // redraws the gameboard
    let randColour = colours[Math.floor(Math.random() * 7)]; // chooses a random color from the color array
    tetromino.color = randColour; // changes the tetrominos color to the new random color
    tetromino.x = 4; // resets the tetrominos x coordinate
    tetromino.y = 0; // resets the tetrominos y coordinate
    tetromino.setShape(randColour); // sets the new tetrominos shape depending on its color
    tetromino.createTetromino(); // draws the new tetromino on the board
}

// gameOver function, called when the user presses esc or they reach the top of the gameboard
function gameOver() {
    context.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas (gameboard)
    clearInterval(timer()); // stops the timer

    document.getElementById("game").classList.toggle("hide"); // hides the game screen
    document.getElementById("gameOver").classList.toggle("hide"); // shows the game over screen

    if (sessionStorage.getItem("loggedIn")) { // only passes if the user has logged in
        let user = JSON.parse(localStorage[username]); // user object retrieved from localStorage

        if (user.highscore === 0) { // if the user has not yet saved a high score

            // displays a message congratulating the user
            document.getElementById("highscore").innerHTML = "Congratulations on beating your first game of Tetris! You scored "
                + score + "!";

            user.highscore = score; // sets the users highscore to the score that they achieved
            localStorage.setItem(username, JSON.stringify(user)); // stores the user object containing their new high score

        } else if (user.highscore > score) { // if the users high score is more than the score they just achieved

            // displays a message telling the user that they did not beat their previous high score
            document.getElementById("highscore").innerHTML = "Your score this time was " + score + ". Good work," +
                " but sadly you didn't beat your previous high score of " + user.highscore + "!";
        } else { // if the user score they achieved is higher than their stored high score

            // displays a message congratulating the user for beating their previous high score
            document.getElementById("highscore").innerHTML = "Congratulations " + username + "! You scored " + score + " beating "
                + "your previous high score of " + user.highscore + "!";
            user.highscore = score; // sets the users high score to the new high score that they achieved

            localStorage.setItem(username, JSON.stringify(user)); // stores the user object containing their new high score
        }
    } else { // if the user is not logged in 

        // displays a message telling the user they are not logged in so their score cannot be saved
        document.getElementById("highscore").innerHTML = "As you are not logged in, we cannot save your score. " +
            score + " is a formidable score though!";
    }
}