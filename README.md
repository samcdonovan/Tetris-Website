# Tetris-Website
For this project, I made a website based around Tetris. The website has user functionality (register, 
login, sign out), a working leaderboard, and a working version of Tetirs. The gameboard and 
Tetrominos (Tetris pieces) are drawn onto a canvas, with each square in the board represented in a 
multi-dimensional array, which is filled with 0’s. As the piece is dropping from the top of the board, 
any squares that it covers on the board are now represented by 1’s in the array. This is so that a 
function can detect whether or not the piece can move into a position by checking the squares closest 
to each 1. 
The Tetrominos are animated by clearing the canvas in the position that the piece was 
previously in, and then redrawing the piece in its new position on the board. The game is controlled 
with the arrow keys. If the user presses down (making the piece move down faster), they gain 1 point 
for every press of the key. If they fill a line on the board, they gain an amount of points that 
corresponds to how many lines were cleared. If they press escape, their score is saved and the game 
finishes. 
