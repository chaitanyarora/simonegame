var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#main-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 4500);
    }

  }
  else {
    console.log("Wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#main-title").text("Game Over , Press Any Key To Restart");

    startOver();

  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#main-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randonChosenColor = buttonColors[randomNumber];

  gamePattern.push(randonChosenColor);
  $("#" + randonChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randonChosenColor);

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
