var canvas;
var canvasContext;

//defining ball properties
var ballX = 50
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

//defining scores
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 5;

var showingWinScreen = false;
//defining the paddle designs
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

//function to controll the pannel movement
function calculateMousePosition(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY
  };
}

//function to enable click to continue at the end
function handleMouseClick(evt) {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond); //sets the speed of drawing

  //calling the mouse click to continue at the end of the game
  canvas.addEventListener('mousedown', handleMouseClick);

  //calling the mouse to move for the panel
  canvas.addEventListener('mousemove',
    function(evt) {
      var mousePos = calculateMousePosition(evt);
      paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    })
}

//function to tell the ball to reset
function ballReset() {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

//Function that creates the AI movement for the right hand pannel
function computerMovement() {
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
}

function moveEverything() {
  if (showingWinScreen) {
    return; // if the end of the game is being shown none of this will need to be used so we return and cancell out the entire function
  }
  computerMovement();
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2Score++; //must be before the ball reset
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player1Score++; //must be before the ball reset
      ballReset();
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY; //makes the ball bouce back when it hits the end of the canvas
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY; //makes the ball bouce back when it hits the end of the canvas
  }
}

//Function to draw the net in the center of the canvas
function drawNet() {
  for (var i = 0; i < canvas.height; i += 40) {
    colourRect(canvas.width / 2 - 1, i, 2, 20, 'white');
  }
}

function drawEverything() {
  colourRect(0, 0, canvas.width, canvas.height, 'black'); //makes the canvas go black
  if (showingWinScreen) {
    canvasContext.fillStyle = 'white';
    if (player1Score >= WINNING_SCORE) {
      canvasContext.fillText("Left Player WON!", 350, 100);
    } else if (player2Score >= WINNING_SCORE) {
      canvasContext.fillText("Right Player WON!", 350, 100);
    }

    canvasContext.fillText("Click to continue!", 350, 500);
    return;
  }

  drawNet();

  colourRect(0, paddle1Y, PADDLE_THICKNESS, 100, 'white'); //left player paddle
  colourRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, 100, 'white'); // right computer paddle
  colourCircle(ballX, ballY, 10, 'white') //drawing the ball

  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);

}

//Function to create the ball to be a circle
function colourCircle(centerX, centerY, radius, drawcolour) {
  canvasContext.fillStyle = drawcolour;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
//defines canvas colour etc
function colourRect(leftX, topY, width, height, drawColour) {
  canvasContext.fillStyle = drawColour;
  canvasContext.fillRect(leftX, topY, width, height)
}
