const {
	split,
	splits,
	join,
	joins,
	splitCond
} = require('../split-join.js');

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
const {Vector2} = require("@grunmouse/math-vector");

const jsondiffpatch = require('jsondiffpatch');
const assert = require('@grunmouse/assert');
const jsc = require('jsverify');

const diffpatcher = jsondiffpatch.create({
	arrays:{
		detectMove:false
	}
});


const binary = require('@grunmouse/binary');

const {
	env
} = require('@grunmouse/jsverify-env');


const bezier = jsc.compile('uarray 4 (array 2 (i_i 0 50))', env).smap((arr)=>arr.map((a)=>(new Vector2(...a))), (a)=>(a));

function * iterateDiff(obj, keys){
	keys = keys || [];
	for(let pair of Object.entries(obj)){
		let [key, val] = pair;
		if(key[0] === '_'){
		}
		else if(Array.isArray(val)){
			let old = obj['_'+key];
			yield [keys.concat(key), val, old];
		}
		else if(typeof val === 'object'){
			yield* iterateDiff(val, keys.concat(key));
		}
		else{
			console.log(key);
		}
	}
}

function getObject(obj, keys){
	if(keys.length === 0){
		return obj;
	}
	if(!obj[keys[0]]){
		obj[keys[0]] = {};
	}
	return getObject(obj[keys[0]], keys.slice(1));
}
function setValue(obj, keys, value){
	let loc = getObject(obj, keys.slice(0, -1));
	let key = keys[keys.length-1];
	loc[key] = value;
	return value;
}

function deepApprox(actual, excepted, accuracy, message){
	let diff = diffpatcher.diff(excepted, actual);
	
	if(typeof diff === 'undefined'){
		assert.ok(true, message);
		return;
	}
	
	let a = {}, e = {};
	
	for(let d of iterateDiff(diff)){
		let keys = d[0], actual = d[1][0], expected = d[2] && d[2][0]; 
		if(Math.abs(actual-expected) > accuracy){
			setValue(a, keys, actual);
			setValue(e, keys, expected);
		}
	}
	assert.deepEqual(a, e, message);
}


describe('bezier', ()=>{

	jsc.property('split', bezier, 'o_o', env, (A, t)=>{
		let [B, C] = split(A, t);
		return B[3].eq(C[0]) && B[3].eq(point(A, t));
	});
	
	jsc.property('join', bezier, 'o_o', env, (A, t)=>{
		let [B, C] = split(A, t);
		let [D, s] = join(B, C);
		assert.approxTupleEqual(D, A, 1e-9);
		assert.approxEqual(s, t, 1e-6);
		return true;
	});
	jsc.property('join 2', bezier, 'o_o', env, (A, t)=>{
		//A = B#C
		let [B, C] = split(A, t);
		//B = D#E; A = D#E#C
		let [D, E] = split(B,0.5);
		//A = X#Y
		let [X, Y] = split(A, 0.5*t);
		//M = E#C
		let [M, s] = join(E, C);
		
		deepApprox(M, Y, 1e-9, 'approx');
		
		return true;
	});
	jsc.property('splits', bezier, 'incarray 2 o_o', env, (A, tt)=>{
		let P = splits(A, tt);
		
		deepApprox(P[0][3], point(A, tt[0]), 5e-5);
		deepApprox(P[1][3], point(A, tt[1]), 5e-5);
		
		return true;
	});	
	jsc.property('joins', bezier, 'incarray 2 o_o', env, (A, tt)=>{
		let P = splits(A, tt);
		
		let [B, T] = joins(P);
		
		deepApprox(B, A, 1e-5, 'curve');
		deepApprox(T, tt, 1e-5, 'T');
		
		return true;
	});
});