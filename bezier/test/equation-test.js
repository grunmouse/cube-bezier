
const jsc = require('jsverify');
const assert = require('assert');
const {
	env
} = require('@grunmouse/jsverify-env');

const curveEquation = require('../equation.js');
const {
	point,
	coeffsXY
} = require('../base.js');

const {Vector2} = require('@grunmouse/math-vector');

const bezier = jsc.compile('uarray 4 (array 2 (i_i 0 50))', env).smap((arr)=>arr.map((a)=>(new Vector2(...a))), (a)=>(a));



describe('equation f(x,y)=0', ()=>{
	it('exist', ()=>{
		assert.ok(curveEquation);
	});
	
	jsc.property('return type', bezier, (C)=>{
		let [cx, cy] = coeffsXY(C);
		
		let f = curveEquation(cx, cy);
		
		return typeof f === 'function';
	});

	jsc.property('testing point', bezier, 'i_i', env, (C, t)=>{
		let [cx, cy] = coeffsXY(C);
		
		let f = curveEquation(cx, cy);
		
		let [x,y] = point(C, t);
		
		let ctrl = f(x,y);
		const toll = 5e-3;
		if(Math.abs(ctrl)>toll){
			console.log(ctrl);
			return false;
		}
		return true;
	});
	jsc.property('testing no point', bezier, 'i_i', env, (C, t)=>{
		let [cx, cy] = coeffsXY(C);
		
		let f = curveEquation(cx, cy);
		
		let [x,y] = point(C, t);
		
		let ctrl = f(x+10,y-10);
		const toll = 5e-3;
		if(Math.abs(ctrl)<toll){
			console.log(ctrl);
			return false;
		}
		return true;
	});

	jsc.property('testing prec', bezier, 'i_i', env, (C, t)=>{
		let [cx, cy] = coeffsXY(C);
		
		let f = curveEquation(cx, cy);
		
		let [x,y] = point(C, t);
		
		const step = 5e-6;
		
		let ctrl = f(x,y);
		let ctrlx = f(x+step,y);
		let ctrly = f(x,y+step);
		const toll = 5e-3;

		if(Math.abs(ctrlx)<toll && Math.abs(ctrly)<toll){
			console.log('x',ctrlx);
			console.log('y',ctrly);
			return false;
		}
		
		return true;
	});
});