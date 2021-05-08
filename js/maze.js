cellSize = 4;

setTimeout(init, 1000);

function init() {
	c = document.getElementById("t");
	ctx = c.getContext("2d");
	
	let d = document.getElementById("body");
	ctx.canvas.width  = document.documentElement.scrollWidth;
	ctx.canvas.height = document.documentElement.scrollHeight;
	ctx.fillStyle = "#c0c0c0";

	width = Math.floor((ctx.canvas.width / cellSize) / 2) * 2;
	height = Math.floor((ctx.canvas.height / cellSize) / 2) * 2;
	grid = [];
	for(let i = 0; i < width; i++) {
		grid.push([]);
		for(let j = 0; j < height; j++) {
			grid[i].push(0);
		}
	}
	
	stampObject(document.getElementById("content"));

	openCells = [[[Math.round(width/2), 10],[Math.round(width/2), 10]]];
	finish = false;
	loop();
}

function stampObject(object) {
	let rect = object.getBoundingClientRect();
	let gridILow = Math.floor(rect.left/cellSize - 1.5);
	let gridJLow = Math.floor(rect.top/cellSize - 1.5);
	let gridIHigh = Math.ceil(rect.right/cellSize + 1.5);
	let gridJHigh = Math.ceil((rect.bottom)/cellSize + 1.5);
	console.log(rect.height);

	for(let i = 0; i < gridIHigh - gridILow; i++) {
		for(let j = 0; j < gridJHigh - gridJLow; j++) {
			grid[gridILow + i][gridJLow + j] = 1
		}
	}
}

function loop() {
	step();
	step();
	step();
	if(!finish)
		setTimeout(loop, 1);
}

function step() {
	do {
		if(openCells.length == 0) {
			finish = true;
			return;
		}
		
		nextIndex = openCells.length - Math.floor(Math.random() * Math.min(openCells.length, 64)) - 1;
		next = openCells[nextIndex];
		nextI = next[1][0];
		nextJ = next[1][1];
		pathI = next[0][0];
		pathJ = next[0][1];
		if(!openAt(nextI, nextJ)) {
			openCells.splice(nextIndex, 1);
		}
	} while(!openAt(nextI, nextJ));
	
	grid[nextI][nextJ] = 1;
	grid[pathI][pathJ] = 1;
	drawAt(nextI, nextJ);
	drawAt(pathI, pathJ);
	
	if(openAt(nextI + 2, nextJ)) {
		openCells.push([[nextI + 1, nextJ],[nextI + 2, nextJ]]);
	}
	if(openAt(nextI - 2, nextJ)) {
		openCells.push([[nextI - 1, nextJ],[nextI - 2, nextJ]]);
	}
	if(openAt(nextI, nextJ + 2)) {
		openCells.push([[nextI, nextJ + 1],[nextI, nextJ + 2]]);
	}
	if(openAt(nextI, nextJ - 2)) {
		openCells.push([[nextI, nextJ - 1],[nextI, nextJ - 2]]);
	}
}

function openAt(i, j) {
	if(i < 0 || width <= i || j < 0 || height <= j)
		return false;
	
	return grid[i][j] != 1;
}

function drawAll() {
	ctx.beginPath();
	for(let i = 0; i < width; i++) {
		for(let j = 0; j < height; j++) {
			if(grid[i][j] == 1) {
				ctx.rect(i*cellSize, j*cellSize, cellSize, cellSize);
			}
		}
	}
	ctx.fill();
}

function drawAt(i, j) {
	if(grid[i][j] == 1) {
		ctx.beginPath();
		ctx.rect(i*cellSize, j*cellSize, cellSize, cellSize);
		ctx.fill();
	}
}