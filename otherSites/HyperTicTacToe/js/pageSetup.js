function createBoard(obj, size) {
	obj.innerHTML = '<table id="board"></table>';
	let board = document.getElementById('board');
	for(let i = 0; i < size; i++) {
		board.innerHTML += '<tr id="rowW'+i+'"></tr>';
		let row = document.getElementById('rowW'+i);
		for(let j = 0; j < size; j++) {
			row.innerHTML += '<td id="cellZ'+j+'W'+i+'"></td>'
			document.getElementById('cellZ'+j+'W'+i).innerHTML = '<table id="boardZ'+j+'W'+i+'"></table>';
			let subBoard = document.getElementById('boardZ'+j+'W'+i);
			for(let k = 0; k < size; k++) {
				subBoard.innerHTML += '<tr id="rowY'+k+'Z'+j+'W'+i+'"></tr>';
				let subRow = document.getElementById('rowY'+k+'Z'+j+'W'+i);
				for(let l = 0; l < size; l++) {
					subRow.innerHTML += '<td id="cellX'+l+'Y'+k+'Z'+j+'W'+i+'">hi</td>';
					document.getElementById('cellX'+l+'Y'+k+'Z'+j+'W'+i).innerHTML = 
					'<button id="playButtonX'+l+'Y'+k+'Z'+j+'W'+i+'" onclick="playAt('+l+','+k+','+j+','+i+')">O</button>';
				}
			}
		}
	}
}