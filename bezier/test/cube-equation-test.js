
const assert = require('assert');

const cube = require('../cube-equation.js');

describe('cube-equation', ()=>{
	it('case 1', ()=>{
		let a =  [ 20.17436375429905, 0, 0, -10 ];
		a.reverse();
		
		let x = cube(...a);
		
		console.log(x);
	});
});