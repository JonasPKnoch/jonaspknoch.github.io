cellSizePrefered = 6;

setTimeout(init, 100);

class Cell {
	constructor(i, j) {
		this.i = i;
		this.j = j;
		this.up = null;
		this.down = null;
		this.left = null;
		this.right = null;
	}

	draw() {
		ctx.rect(this.i*cellSize + cellSize*0.5, this.j*cellSize + cellSize*0.5, cellSize, cellSize);

		if(this.left != null)
			ctx.rect(this.i*cellSize + cellSize*0.5, this.j*cellSize + cellSize*0.5, cellSize, cellSize);
		if(this.right != null)
			ctx.rect(this.i*cellSize + cellSize*0.5, this.j*cellSize + cellSize*0.5, cellSize, cellSize);
		if(this.up != null)		
			ctx.rect(this.i*cellSize + cellSize*0.5, this.j*cellSize + cellSize*0.5, cellSize, cellSize);
		if(this.down != null)
			ctx.rect(this.i*cellSize + cellSize*0.5, this.j*cellSize + cellSize*0.5, cellSize, cellSize);
	}
}

function init() {
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	ctx.imageSmoothingEnabled = true;
	ctx.canvas.width  = document.documentElement.scrollWidth;
	
	width = Math.floor((ctx.canvas.width / cellSizePrefered) / 2) * 2 + 1;
	cellSize = ctx.canvas.width/width;
	document.documentElement.style.setProperty('--cell-size', cellSize + "px");

	ctx.canvas.height = document.documentElement.scrollHeight;
	height = Math.floor((ctx.canvas.height / cellSizePrefered) / 2) * 2 + 1;
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
	ctx.fillStyle = "#c0c0c0";
	loop();
}

function stampObject(object) {
	let rect = object.getBoundingClientRect();
	let gridILow = Math.round(rect.left/cellSize) - 1;
	let gridJLow = Math.round(rect.top/cellSize) - 1;
	let gridIHigh = Math.round(rect.right/cellSize) + 1;
	let gridJHigh = Math.round(rect.bottom/cellSize) + 1;
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
		
		nextIndex = openCells.length - Math.floor(Math.random() * Math.min(openCells.length, 32)) - 1;
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