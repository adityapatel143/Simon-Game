var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// detect the keypress
$(document).keydown(function() {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});


// click handler
$(".btn").click(function() {
	//alert("the button is clicked");
	var userChosenColour = $(this).attr("id"); // getting id of clicked buttonColours
	userClickedPattern.push(userChosenColour); // adding it to array
	playSound(userChosenColour);
	animatePress(userChosenColour);
	console.log("User clicked : " + userClickedPattern);
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

	// Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
	userClickedPattern = [];

	level++;
	$("#level-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4); // generate randomNumber 0-3
	var randomChosenColour = buttonColours[randomNumber]; // selecting the color from buttonColours
	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // flashing the selected buttonColours
	gamePattern.push(randomChosenColour);
	playSound(randomChosenColour);
	console.log("Game Pattern : " + gamePattern);
	//console.log(randomChosenColour);

}

// playsound
function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");

	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

// checking answer
function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length === gamePattern.length) {
			// Call nextSequence() after a 1000 millisecond delay.
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}

	} else {

		console.log("wrong");
		playSound("wrong");
		$("body").addClass("game-over");

		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}
