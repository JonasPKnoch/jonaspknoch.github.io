/*
	Classes
*/
class Vec4 {
	constructor(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	add(that) {
		return new Vec4(this.x + that.x, this.y + that.y, this.z + that.z, this.w + that.w);
	}

	reverse() {
		return new Vec4(-this.x, -this.y, -this.z, -this.w);
	}
}

class Board {
	constructor(size, matchSize) {
		this.board = [];
		this.matchSize = matchSize;

		for(let i = 0; i < size; i++) {
			this.board.push([]);
			for(let j = 0; j < size; j++) {
				this.board[i].push([]);
				for(let k = 0; k < size; k++) {
					this.board[i][j].push([]);
					for(let l = 0; l < size; l++) {
						this.board[i][j][k].push([]);
						this.board[i][j][k][i] = 0;
					}
				}
			}
		}
	}

	setAt(vec, value) {
		if(vec.x < 0 || vec.x > size||
			vec.y < 0 || vec.y > size||
			vec.z < 0 || vec.z > size||
			vec.w < 0 || vec.w > size)
			return false;

		board[vec.x][vec.y][vec.z][vec.w] = value;

		return true;
	}

	playedAt(vec) {
		if(vec.x < 0 || vec.x > size||
			vec.y < 0 || vec.y > size||
			vec.z < 0 || vec.z > size||
			vec.w < 0 || vec.w > size)
			return 0;

		return [vec.x][vec.y][vec.z][vec.w];
	}

	checkWin(vec) {
		let match = playedAt(vec);
		if(match == 0)
			return false;

		for(let i = 0; i < cardinalVecs.length; i++) {
			let dir = cardinalVecs[i];

			let pos = matchDir(vec.plus(dir), dir, match);
			let neg = matchDir(vec.reverse(), dir, match);

			if(pos + neg >= matchSize)
				return true;
		}
		return false;
	}

	matchDir(vec, dir, match) {
		let current = vec;
		count = 0;
		while(playedAt(current) === match) {
			count++;
			current = current.plus(dir);
		}

		return count;
	}
}

class Game {
	constructor(boardSize, matchSize, playerCount) {
		this.board = new Board(boardSize, matchSize);
		this.matchSize = matchSize;
		this.playerCount = playerCount;
		this.turn = 0;
	}

	playAt(vec, player) {
		if(this.board.playedAt(vec) != 0)
			return false;
		board
	}
}

/*
	Play functions
*/
function playAt(x, y, z, w) {
	alert(x+','+y+','+z+','+w);
}

/*
	Setup
*/
function logicSetup(players, dimensions) {
	cardinalVecs = generateCardinals();

}

function generateCardinals() {
	let retult = [];

	for(let i = -1; i <= 1; i++) {
		for(let j = -1; j <= 1; j++) {
			for(let k = -1; k <= 1; k++) {
				for(let l = -1; l <= 1; l++) {
					if(i === 0 && j === 0 && k === 0 && l === 0)
						continue;
					result.push(new Vec4(i, j, k, l));
				}
			}
		}
	}

	return result;
}