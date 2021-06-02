class CNum {
	constructor(r, i) {
		this.r = r;
		this.i = i;
	}

	add(that) {
		return new CNum(this.r + that.r, this.i + that.i);
	}

	mult(that) {
		return new CNum(this.r*that.r - this.i*that.i, this.r*that.i + this.i*that.r);
	}

	square() {
		return mult(this, this);
	}

	distSquared(that) {
		return (this.r - that.r)*(this.r - that.r) + (this.i - that.i)*(this.i - that.i);
	}
} 

function diverge(init, func, iterations, radius) {
	let radSqr = radius*radius;
	let current = init;
	for(let i = 0; i < iterations. i++) {
		if(current.distSquared(init) > radius)
			return i;
		current = func.call(current);
	}

	return -1;
}