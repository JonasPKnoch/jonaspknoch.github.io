cellSizePrefered = 6;

setTimeout(init, 100);

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

	openCells = [[[Math.round(width/2), 9],[Math.round(width/2), 9]]];
	finish = false;
	ctx.fillStyle = "#c0c0c0";
	ctx.strokeStyle = "#c0c0c0";
	loop();
}

function stampObject(object) {
	let rect = object.getBoundingClientRect();
	let gridILow = Math.round(object.offsetLeft/cellSize);
	let gridJLow = Math.round(object.offsetTop/cellSize);
	let gridIHigh = Math.round((object.offsetLeft + object.offsetWidth)/cellSize);
	let gridJHigh = Math.round((object.offsetTop + object.offsetHeight)/cellSize);
	console.log(object.offsetTop);

	for(let i = 0; i < gridIHigh - gridILow; i++) {
		for(let j = 0; j < gridJHigh - gridJLow; j++) {
			grid[gridILow + i][gridJLow + j] = 1
		}
	}
}

function loop() {
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
		
		nextIndex = openCells.length - Math.floor(Math.random() * Math.min(openCells.length, 16)) - 1;
		next = openCells[nextIndex];
		if(!openAt(next[1])) {
			openCells.splice(nextIndex, 1);
		}
	} while(!openAt(next[1]));
	
	openPath(next);
	
	if(openAt(leftOf(next[1]))) {
		openCells.push(getPath(leftPathOf(next[1]), leftOf(next[1])));
	}
	if(openAt(rightOf(next[1]))) {
		openCells.push(getPath(rightPathOf(next[1]), rightOf(next[1])));
	}
	if(openAt(upOf(next[1]))) {
		openCells.push(getPath(upPathOf(next[1]), upOf(next[1])));
	}
	if(openAt(downOf(next[1]))) {
		openCells.push(getPath(downPathOf(next[1]), downOf(next[1])));
	}
}

function openPath(path) {
	grid[path[0][0]][path[0][1]] = 1;
	grid[path[1][0]][path[1][1]] = 1;
	drawAt(path[0]);
	drawAt(path[1]);
}

function getPath(from, to) {
	return [from, to];
}

function leftOf(point) {
	return adj(point, 2, 0);
}

function rightOf(point) {
	return adj(point, -2, 0);
}

function upOf(point) {
	return adj(point, 0, 2);
}

function downOf(point) {
	return adj(point, 0, -2);
}

function leftPathOf(point) {
	return adj(point, 1, 0);
}

function rightPathOf(point) {
	return adj(point, -1, 0);
}

function upPathOf(point) {
	return adj(point, 0, 1);
}

function downPathOf(point) {
	return adj(point, 0, -1);
}


function adj(point, i, j) {
	return [point[0] + i, point[1] + j]
}

function openAt(point) {
	let i = point[0];
	let j = point[1];
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

function drawAt(point) {
	let i = point[0];
	let j = point[1];
	if(grid[i][j] == 1) {
		ctx.beginPath();
		ctx.rect(i*cellSize, j*cellSize, cellSize, cellSize);
		ctx.fill();
		ctx.stroke();
	}
}