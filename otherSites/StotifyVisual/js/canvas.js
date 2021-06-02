setTimeout(init, 100);

function init() {
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	ctx.beginPath();
	ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = "blue";
	ctx.fill();
}