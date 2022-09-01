// GLOBAL
var pattern = [];
var clicked = [];
var buttonsMatched = 0;
var level = 0;
var gameEnd = false;

// EVENTS
$(document).keydown(function () {
  //detects keypress event to start game
  if (pattern.length == 0) {
    storePattern();
    gameEnd = false;
  }
});

$(".btn").click(function () {
  storeClicked(this);
});

// MAJOR METHODS
function storePattern() {
  //stores new pattern and calls next func
  if (gameEnd == false) {
    buttonsMatched = 0;
    var newBtn = randomBtn();
    animatePattern(newBtn);
    playSound(newBtn);
    pattern.push(newBtn);
    $(".heading").text("Level " + pattern.length);
  }
}

function storeClicked(buttonPressed) {
  //stores clicked pattern and calls checkClicked alongside every click
  animateClicked(buttonPressed);
  playSound(buttonPressed);

  if (pattern.length != 0) {
    clicked.push(buttonPressed);
    checkClicked(buttonPressed);
  }
}

function checkClicked(buttonPressed) {
  if (clicked.length > pattern.length) {
    gameOver();
    gameEnd = true; //to avoid delayed previous animation
  } else {
    console.log("entered els");
    var buttonPattern = pattern[clicked.length - 1];
    if (buttonPressed.classList[1] == buttonPattern.classList[1]) {
      buttonsMatched = buttonsMatched + 1;
      if (buttonsMatched == pattern.length) {
        setTimeout(function () {
          storePattern();
        }, 650);
      }
      // continueCheck(buttonsMatched);
    } else {
      gameOver();
      gameEnd = true;
    }
  }
}

// MINOR METHODS
function randomBtn() {
  var randomNum = Math.trunc(Math.random() * 4);
  var randomBtn = $(".btn")[randomNum];
  return randomBtn;
}

function animatePattern(button) {
  if (gameEnd == false) {
    $(button).addClass("hidden");
    setTimeout(function () {
      $(button).removeClass("hidden");
      clicked = [];
    }, 300);
  }
}

function animateClicked(button) {
  $(button).addClass("flash");
  setTimeout(function () {
    $(button).removeClass("flash");
  }, 100);
}

function playSound(button) {
  console.log(button.classList[1]);
  switch (button.classList[1]) {
    case "greenBtn":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "redBtn":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellowBtn":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "blueBtn":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
  }
}

function gameOver() {
  $(".btn").stop();
  $(".heading").text("Game Over, Press Any Key to Restart");
  $("body").addClass("redBg");
  setTimeout(function () {
    $("body").removeClass("redBg");
  }, 250);
  pattern = [];
  clicked = [];
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
}
