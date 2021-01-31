// Array to hold button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Empty array to hold game sequence
var gamePattern = [];

// Empty array for user clicks record
var userClickedPattern = [];

var gameStarted = false;
var gameLevel = 0;

// function to start the game with a key press event
$(document).keydown(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + gameLevel);
    nextSequence();
    gameStarted = true;
  }
});
// Function to generate random game sequence
function nextSequence() {
  if (gameStarted) {
    // each time nextSequence is called game level increases by 1
    gameLevel++;
    // page title is changing each time level increases
    $("#level-title").text("Level " + gameLevel);
  }

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColours[randomNumber];

  gamePattern.push(randomChosenColor);

  // Logs random chosen color
  //   console.log(gamePattern);

  // flashes the buttons
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // Plays sound when flash happens
  playSound(randomChosenColor);
}

// a function to handle the user button presses
function userInteraction(e) {
  var buttonId = e.target.id;

  animatePress(buttonId);

  playSound(buttonId);

  userClickedPattern.push(buttonId);

  //   checkAnswer(gameLevel);
  checkAnswer(userClickedPattern.length - 1);

  //   logs user click pattern
  //   console.log(userClickedPattern);
}

// function to create sound object and play it
function playSound(trackName) {
  var sound = new Audio("sounds/" + trackName + ".mp3");
  sound.play();
}

// function to animate a button press event to the user
function animatePress(target) {
  $("#" + target).addClass("pressed");

  setTimeout(() => {
    $("#" + target).removeClass("pressed");
  }, 100);
}

// function to check the answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("sucess");

    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    // console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
    gameLevel = 0;
  }
}

// Event handler for button clicks
$(".btn").click(function (e) {
  userInteraction(e);
});
