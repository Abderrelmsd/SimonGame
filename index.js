
// Game Data
var gamePattern = [];
var playerPattern = [];
var buttonColors = ["red", "green", "blue", "yellow"];


// Event Listners
$(document).keydown(function (event){
    if(event.key == "A" || event.key == "a"){
        if(gamePattern.length == 0){
            startGame();
        }
    }
});

$(".btn").click(function(event) {
    playerPattern.push(event.target.id);
    if(JSON.stringify(playerPattern) == JSON.stringify(gamePattern)) {
        highlightButton(event.target.id);
        playerPattern = [];
        nextSequence();
        showSequence();
    } else if(JSON.stringify(playerPattern) == JSON.stringify(gamePattern.slice(0,playerPattern.length))){
        highlightButton(event.target.id);
    }
    else{
        clearSequence();
    }
});

// Functions

function startGame(){
    nextSequence();
    showSequence();
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("h1").text("Level "+gamePattern.length);
}

function showSequence() {
    for(let i = 0; i < gamePattern.length;i++){
        setTimeout(function (){
            highlightButton(gamePattern[i]);
        },1000 * (i + 1));
    }
}

function highlightButton(color) {
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
    $('#'+color).addClass("pressed");
    setTimeout(function() {
        $('#'+color).removeClass("pressed");
    },100);
}

function clearSequence(){
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },100);
    $("#level-title").html("Game Over<br> Press A Key to Start");
    gamePattern = [];
    playerPattern = [];
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}