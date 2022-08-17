var gamePattern = []; //this is an array containing the pattern of the game from the random number

var userClickedPattern = []; // this is an array for the pattern the user generated while playing the game

var buttonColors = ["purple", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).on("keydown", function(){ // responds at the beginning of the game when the user presses a key on the keyboard
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function () { // this is a higher order funstion for btn click
  var userChosenColor = $(this).attr("id"); // it get the id of the btn clicked
  userClickedPattern.push(userChosenColor); // it adds the color chosen by the user to the userClickedPattern array
  playSound(userChosenColor); // this plays the sound for each buttton clicked
  animatePress(userChosenColor); // this adds the animatePress function to the button clicked
  checkAnswer(userClickedPattern.length - 1); // this is used to pass the index of the last answer(whether correct or wrong) in the user's sequence
})

function nextSequence() { // this is a constructor function
  var randomNumber = Math.floor(Math.random() * 4); // this will craete a random number between 0 to 3 excluding 4
  var randomChosenColor = buttonColors[randomNumber]; // this picks an item from the buttonColors array at position randomNumber
  gamePattern.push(randomChosenColor); // this adds the randomChosenColor to the gamePattern array
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // this adds a fade animation to the selected id
  playSound(randomChosenColor); // calls the playSound() function
  level++; // increases the value of level
  $("#level-title").text("level " + level); // changes the heading to the currentLevel
  userClickedPattern = []; // resets the userClickedPattern
}

function playSound(randomChosenColor) {
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() { // all variables mentioned here are resetted
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // if gamePattern array at currentLevel is equal to userClickedPattern array, then
    if (userClickedPattern.length === gamePattern.length) { // check if userClickedPattern.length is equal to gamePattern.length
      setTimeout(function () {
        nextSequence(); // nextSequence() constructor is called
      }, 1000); // at a speed of 1000 milliseconds
    }

  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play(); // this is played when the user gets the pattern wrong
    $("body").addClass("game-over"); // adds a gameOver class
    setTimeout(function () {
      $("body").removeClass("game-over"); // remove the gameOver class after 200 milliseconds
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart"); // the heading is changed when the userClickedPattern at currentLevel is not equal to gamePattern
    startOver(); // startOver() function is called to reset the game
  }
}
