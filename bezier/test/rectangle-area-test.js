
const jsc = require('jsverify');
const assert = require('assert');
const {
	env,
	bless
} = require('@grunmouse/jsverify-env');

const {Vector2} = require('@grunmouse/math-vector');
const {SquareMatrix2} = require('@grunmouse/math-matrix');


const {
	isIn,
	rectangleArea,
	intersectRectangle,
	isIntersectRectangles
} = require('../rectangle-area.js');

describe('rectangle-area', ()=>{
	jsc.property('isIn', 'incarray 3 (i_i 50)', 'incarray 3 (i_i 50)', env, (X, Y)=>{
		const A = new Vector2(X[0], Y[0]);
		const B = new Vector2(X[2], Y[2]);
		const R = new Vector2(X[1], Y[1]);
		
		return isIn(R, [A, B]);
	});

	jsc.property('!isIn', 'incarray 3 (i_i 50)', 'incarray 3 (i_i 50)', env, (X, Y)=>{
		const A = new Vector2(X[0], Y[0]);
		const B = new Vector2(X[1], Y[2]);
		const R = new Vector2(X[2], Y[1]);
		
		return !isIn(R, [A, B]);
	});
	
	jsc.property('rectangleArea', 'uarray (integer 3 10) (array 2 (integer 50))', env, (S)=>{
		S = S.map(arr=>(new Vector2(...arr)));
		let conv = rectangleArea(S);
		
		for(let P of S){
			assert.ok(isIn(P, conv), JSON.stringify({conv:conv.map(a=>([...a])), P:[...P]}));
		}
		return true;
	});
	
	describe('matrixIntersectRectangles', ()=>{
		it('case 1', ()=>{
			let areas = [
				[new Vector2(0,0), new Vector2(2,2)],
				[new Vector2(1,1), new Vector2(3,3)]
			];
			
			let mat = matrixIntersectRectangles(areas);
			
			return mat.value(0,1)===1 && mat.value(1, 0)===1;
		});
		
		it('case 2', ()=>{
			let areas = [
				[new Vector2(0,1), new Vector2(2,3)],
				[new Vector2(1,0), new Vector2(3,2)]
			];
			
			let mat = matrixIntersectRectangles(areas);
			
			return mat.value(0,1)===1 && mat.value(1, 0)===1;
		});		
		it('case 3', ()=>{
			let areas = [
				[new Vector2(0,1), new Vector2(2,3)],
				[new Vector2(1,0), new Vector2(3,2)],
				[new Vector2(-1,-1), new Vector2(0,0)]
			];
			
			let mat = matrixIntersectRectangles(areas);
			
			//console.log(mat);
			
			return mat.value(0,1)===1 && mat.value(1, 0)===1 && mat.value(1,2) ===0 && mat.value(0,2)===0;
		});

		it('case 4', ()=>{
			let areas = [
				[new Vector2(0,0), new Vector2(3,3)],
				[new Vector2(2,2), new Vector2(5,5)],
				[new Vector2(0,4), new Vector2(3,7)]
			];
			
			let mat = matrixIntersectRectangles(areas);
			
			return mat.value(0,1)===1 && mat.value(1, 2)===1 && mat.value(1,2) ===0;
		});
	});
});