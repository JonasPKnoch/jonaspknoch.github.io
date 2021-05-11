/*
	Classes:
*/

class coord {
	x;
	y;
	z;
	w;
	
	constructor(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
	
	toString() {
		return "("+this.x+","+this.y+","+this.z+","+this.w+")";
	}
	
	plus(other) {
		return new coord(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
	}
	
	negative() {
		return new coord(-this.x, -this.y, -this.z, -this.w);
	}
}

/*
	Gloval Variables:
*/


board = [[[[],[],[]],[[],[],[]],[[],[],[]]],[[[],[],[]],[[],[],[]],[[],[],[]]],[[[],[],[]],[[],[],[]],[[],[],[]]]];
buttons = [[[[],[],[]],[[],[],[]],[[],[],[]]],[[[],[],[]],[[],[],[]],[[],[],[]]],[[[],[],[]],[[],[],[]],[[],[],[]]]];
cardinals = cardinalPositive();
turn = 0;
players = ["Player1", "Player2"];
playerColors = ["Maroon", "DarkBlue"];
playerWinningColors = ["Coral", "DeepSkyBlue"];
gameFinished = false;
winner = 0;
playButtonStyle = document.getElementsByClassName("playButton").style;
buttonsUsed = [];
playerScores = [0, 0];
winningButtons = [];

/*
	User input:
*/

function playAt(object, x, y, z, w) {
	board[x][y][z][w] = turn;
	buttons[x][y][z][w] = object;
	if(checkWin(new coord(x, y, z, w))) {
		gameFinished = true;
		winner = turn;
		playerScores[winner]++;
	}
	squarePlayedHTML(object);
	turn = (turn + 1) % players.length;
	updateDisplayHTML();
}

function reset() {
	resetGame();
	resetPlayButtons();
	removeResetButton();
	updateDisplayHTML();
}

function setPlayerNames() {
	players[0] = document.getElementById("player1Name").value;
	players[1] = document.getElementById("player2Name").value;
}

/*
	HTML stuff:
*/

function squarePlayedHTML(object) {	
	object.style.backgroundColor = playerColors[turn];
	object.style.borderRadius = "12px";
	object.disabled  = "true";
	buttonsUsed.push(object);
}

function updateDisplayHTML() {
	setPlayerNames();
	if(gameFinished) {
		wonDisplayHTML();
	} else {
		turnDisplayHTML();
	}
	scoreDisplayHTML()
}

function turnDisplayHTML() {
	var display = document.getElementById("turnDisplay");
	display.innerHTML = players[turn]+"'s Turn:";
	display.style.color = playerColors[turn];
}

function wonDisplayHTML() {
	var display = document.getElementById("turnDisplay");
	display.innerHTML = players[winner] + " won";
	display.style.color = playerColors[winner];
	disablePlayButtons()
	displayWinningButtons();
	addResetButton();
}

function scoreDisplayHTML() {
	var display = document.getElementById("scoreDisplay");
	display.innerHTML = players[0]+": "+playerScores[0]+" | "+players[1]+": "+playerScores[1];
}

function resetHTML() {
	for(var i = 0; i < buttonsUsed.length; i++) {
		object.style.backgroundColor = "White";
		object.disabled  = "false";
	}
}

function displayWinningButtons() {
	for(var i = 0; i < winningButtons.length; i++) {
		var coord = winningButtons[i];
		console.log(coord);
		var button = buttons[coord.x][coord.y][coord.z][coord.w];
		console.log(button);
		button.style.backgroundColor = playerWinningColors[winner];
	}
}

function disablePlayButtons() {
	var buttons = document.getElementsByClassName("playButton");
	for(var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		button.disabled = true;
	}
}

function resetPlayButtons() {
	var buttons = document.getElementsByClassName("playButton");
	for(var i = 0; i < buttons.length; i++) {
		buttons[i].disabled = false;
		buttons[i].style = playButtonStyle;
	}
}

function addResetButton() {
	var display = document.getElementById("playButtonHolder");
	display.innerHTML = '<button class="resetButton" onclick="reset()">Play again</button>';
}

function removeResetButton() {
	var display = document.getElementById("playButtonHolder");
	display.innerHTML = "";
}

/*
	Secondary game logic
*/
function resetGame() {
	board = [[[[],[],[]],[[],[],[]],[[],[],[]]],[[[],[],[]],[[],[],[]],[[],[],[]]],[[[],[],[]],[[],[],[]],[[],[],[]]]];
	turn = 0;
	gameFinished = false;
	winner = 0;
}

/*
	Core game logic:
*/

function checkWin(origin) {
	for(var i = 0; i < cardinals.length; i++) {
		var dir = cardinals[i];
		
		winningButtons = []
		
		var pos = checkDir(origin.plus(dir), dir, 0);
		var neg = checkDir(origin, dir.negative(), 0);

		if(pos + neg >= board.length) {
			return true;
		}
	}
	return false;
}

function checkDir(origin, dir, count) {
	if(origin.x >= board.length || origin.y >= board.length || origin.z >= board.length || origin.w >= board.length ||
		origin.x < 0 || origin.y < 0 || origin.z < 0 || origin.w < 0) {
		return count;
	}
	if(board[origin.x][origin.y][origin.z][origin.w] == turn) {
		winningButtons.push(origin);
		return checkDir(origin.plus(dir), dir, count + 1);
	}
	
	return count;
}

/*
	Utility:
*/


function cardinalPositive() {
	results = [];
	for(var x = -1; x <= 1; x++) {
		for(var y = -1; y <=1; y++) {
			for(var z = -1; z <= 1; z++) {
				for(var w = -1; w <= 1; w++) {
					if(!(x == 0 && y == 0 && z == 0 && w == 0)) {
						results.push(new coord(x, y, z, w));
					}
				}
			}
		}
	}
	return results;
}