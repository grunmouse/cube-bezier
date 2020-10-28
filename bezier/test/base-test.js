const {
	reduce,
	point,
	delta,
	odelta,
	dot,
	coeff,
	coeffsXY,
	points,
	proj	
} = require('../base.js');

const jsc = require('jsverify');
const assert = require('assert');
const {
	env
} = require('@grunmouse/jsverify-env');

const {Vector2} = require('@grunmouse/math-vector');

const bezier = jsc.compile('uarray 4 (array 2 (i_i 0 50))', env).smap((arr)=>arr.map((a)=>(new Vector2(...a))), (a)=>(a));


describe('base', ()=>{
	describe('reduce', ()=>{
		jsc.property('test', 'uarray 4 (array 2 (i_i 0 50))', 'i_i', env, (arr, t)=>{
			arr = arr.map((a)=>(new Vector2(...a)));
			
			let r = reduce(arr, t);
			
			return r.length === 3;
		});
	});
	describe('point', ()=>{
		jsc.property('test', 'uarray 4 (array 2 (i_i 0 50))', 'i_i', env, (arr, t)=>{
			arr = arr.map((a)=>(new Vector2(...a)));
			
			let r = point(arr, t);
			
			return (r instanceof Vector2);
		});		
		jsc.property('first,last', 'uarray 4 (array 2 (i_i 0 50))', env, (arr)=>{
			arr = arr.map((a)=>(new Vector2(...a)));
			
			let first = point(arr, 0);
			let last = point(arr, 1);
			
			assert.deepEqual(first, arr[0]);
			assert.deepEqual(last, arr[3]);
			
			return true;
		});
	});
	describe('odelta', ()=>{
		jsc.property('test', bezier, (curve)=>{
			let d = odelta(curve);
			
			assert.ok(d[0].add(curve[0]).sub(curve[1]).abs()<=1e-11);
			assert.ok(d[1].add(curve[1]).sub(curve[2]).abs()<=1e-11);
			assert.ok(d[2].add(curve[2]).sub(curve[3]).abs()<=1e-11);
			assert.ok(d[3].add(curve[3]).sub(curve[0]).abs()<=1e-11);
			
			return true;
		});
	});	
	describe('delta', ()=>{
		jsc.property('test', bezier, (curve)=>{
			let od = odelta(curve);
			let d = delta(curve);
			
			assert.deepEqual(d, od.slice(0,-1));
			
			return true;
		});
	});
	describe('proj', ()=>{
		jsc.property('x', bezier, (curve)=>{
			let x = proj(curve, 'x');
			let n = proj(curve, 0);
			
			assert.deepEqual(x, n);
			
			assert.ok(x.every((v,i)=>(v===curve[i].x)));
			
			return true;
		});
		
		jsc.property('y', bezier, (curve)=>{
			let x = proj(curve, 'y');
			let n = proj(curve, 1);
			
			assert.deepEqual(x, n);
			
			assert.ok(x.every((v,i)=>(v===curve[i].y)));
			
			return true;
		});
		
	});
	function naivPoints(c){
		let K = [];
		K[0] = c[0];
		K[1] = c[1]/3 + K[0];
		K[2] = c[2]/3 - K[0] + 2*K[1];
		K[3] = c[3] + K[0] - 3*K[1] + 3*K[2];
		
		return K;
	}
	describe('coeff,points', ()=>{
		jsc.property('coeff', bezier, 'i_i', env, (curve, t)=>{
			let x = proj(curve, 'x');
			
			let c = coeff(x);
			
			let fun = (t)=>(c[0] +t*(c[1] + t*(c[2] + t*c[3])));
			
			
			assert.ok(Math.abs(point(x, t) - fun(t)) < 1e-11);
			
			return true;
		});
		jsc.property('points', bezier, 'i_i', env, (curve, t)=>{
			let x = proj(curve, 'x');
			
			let c = coeff(x);
			
			let p = points(c);
			
			//assert.deepEqual(p, x);
			assert.ok(p.every((v,i)=>(Math.abs(v-x[i])<1e-11)));
			
			return true;
		});
	});
});