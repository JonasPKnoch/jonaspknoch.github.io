function createBoard(obj, xS, yS, zS, wS) {
	obj.innerHTML = '<table id="board"></table>'
	let board = document.getElementByID("board");
	for(let i = 0; i < wS; i++) {
		board.innerHTML += '<tr id="rowW'+i+'"></tr>';
		let row = document.getElementById('rowW'+i);
		for(let j = 0; j < zS; j++) {
			row.innerHTML += '<td id="cellZ'+j+'W'+i+'"></td>'
			document.getElementById('cellZ'+j+'W'+i).innerHTML = '<table id="boardZ'+j+'W'+i+'"></table>';
			let subBoard = document.getElementById('boardZ'+j+'W'+i);
			for(let k = 0; k < yS; k++) {
				subBoard.innerHTML += '<tr id="rowY'+k+'Z'+j+'W'+i+'"></tr>';
				let  subRow = document.getElementById('rowY'+k+'Z'+j+'W'+i);
				for(let l = 0; l < xS; l++) {

				}
			}
		}
	}
}