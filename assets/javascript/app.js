
var player1choice;

var player2choice;

var player1ref = firebase.database().ref('player1');

var player2ref = firebase.database().ref('player2');

$(document).ready(function() {
  firebase.database().ref().remove();
})

//connect two players
function connectPlayers(){
	if (!player1ref && !player2ref){
		console.log("both seats vacant");
	}
}

$(".player-login").on("click", function(){
	connectPlayers();
})

//send a play to a database

$(".player1-button").on("click", function(event) {
  event.preventDefault();
  var click = $(this).html();
  player1ref.set({
    play: click
  });
});

$(".player2-button").on("click", function(event) {
  event.preventDefault();
  var click = $(this).html();
  player2ref.set({
    play: click
  });
});

player1ref.on("value", function(snapshot) {
  if (snapshot.hasChild("play")) {
    player1choice = snapshot.child("play").val();
    console.log(player1choice);
    $("#play-text0").html("Player 1 has chosen");
    $("#play-text2").html("");
  }
});

player2ref.on("value", function(snapshot) {
  if (snapshot.hasChild("play")) {
    player2choice = snapshot.child("play").val();
    console.log(player2choice);
    $("#play-text1").html("Player 2 has chosen");
    $("#play-text2").html("");
  }
});

//upon receiving response, compare them and display who won
firebase.database().ref().on("value", function(snapshot){
	if(snapshot.child("player1").hasChild("play") && snapshot.child("player2").hasChild("play")){
		checkResults();
	}
});

function checkResults(){
	if(player1choice == player2choice){
		$("#play-text2").html("You both chose the same, <b>tie</b>!");
	} else if(player1choice == "Rock" && player2choice == "Scissors"){
		$("#play-text2").html("<i>Rock</i> dulls <i>scissors</i>, <b>player 1 wins</b>!");
	}else if(player1choice == "Scissors" && player2choice == "Paper"){
		$("#play-text2").html("<i>Scissors</i> cuts <i>paper</i>, <b>player 1 wins</b>!");
	}else if(player1choice == "Paper" && player2choice == "Rock"){
		$("#play-text2").html("<i>Paper</i> covers <i>rock</i>, <b>player 1 wins</b>!");
	}else if(player1choice == "Rock" && player2choice == "Paper"){
		$("#play-text2").html("<i>Paper</i> covers <i>rock</i>, <b>player 2 wins!</b>");
	} else if(player1choice == "Paper" && player2choice == "Scissors"){
		$("#play-text2").html("<i>Scissors</i> cuts <i>paper</i>, <b>player 2 wins!</b>");
	} else if(player1choice == "Scissors" && player2choice == "Rock"){
		$("#play-text2").html("<i>Rock</i> dulls <i>scissors</i>, <b>player 2 wins!</b>");
	}
	player1ref.child("play").remove();
	player2ref.child("play").remove();
	setTimeout(function(){
		$("#play-text0").html("");
		$("#play-text1").html("");
	}, 1000)
}