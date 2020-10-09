const bezier = require('../bezier/base.js');

const {Vector2} = require("@grunmouse/math-vector");

const assert = require('@grunmouse/assert');
const jsc = require('jsverify');

const dslSource = '(number & number) & (number & number) & (number & number) & (number & number)';

const source = jsc.compile(dslSource);

const BEZIER = source.smap(
	(A)=>A.map((a)=>(new Vector2(...a))),
	(A)=>A.map((a)=>([...a]))
);

const preBezier = (A)=>(
	!A[0].eq(A[1]) 
	&&
	!A[3].eq(A[2])
);

const RealBEZIER = jsc.bless({
	generator:(size)=>{
		let res;
		let count = 0;
		size = size || jsc.random(1, 100);
		do{
			res = BEZIER.generator(size);
			count++;
			if(count%100==0){
				//console.log('RealBEZIER '+count);
				//console.log(res);
				throw new Error('Hare');
			}
		}while(!preBezier(res));
		return res;
	},
	show:val=>(val.map(v=>('Vector('+v.join(',')+')').toString()))
});

const middleNumber = jsc.bless({
	generator:size=>{
		let res;
		let count = 0;
		do{
			res = jsc.random.number(0,1);
			count++;
			if(count%100==0){
				console.log('middleNumber '+count);
			}
		}while(res===0 || res===1);
		return res;
	}
});

describe('bezier', ()=>{
	jsc.property('point', BEZIER, (A)=>{
		return bezier.point(A, 0).eq(A[0]) && bezier.point(A, 1).eq(A[3]);
	});
	
	jsc.property('split', BEZIER, jsc.number(0,1), (A, t)=>{
		let [B, C] = bezier.split(A, t);
		return B[3].eq(C[0]) && B[3].eq(bezier.point(A, t));
	});
	
	jsc.property('join', RealBEZIER, middleNumber, (A, t)=>{
		let [B, C] = bezier.split(A, t);
		let [D, s] = bezier.join(B, C);
		assert.approxTupleEqual(D, A, 1e-9);
		assert.approxEqual(s, t, 1e-6);
		return true;
	});
	jsc.property('join 2', RealBEZIER, middleNumber, (A, t)=>{
		let [B, C] = bezier.split(A, t);
		let [D, E] = bezier.split(B,0.5);
		let [X, Y] = bezier.split(A, 0.5*t);
		let [M, s] = bezier.join(E, C);
		assert.approxTupleEqual(M, Y, 1e-9);
		return true;
	});
});