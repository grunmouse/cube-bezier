const assert = require('assert');


const Intersection = require('./intersect.js');
const {Vector2} = require('@grunmouse/math-vector');
const {
	point,
	coeffsXY
} = require('../base.js');

const {
	intersectCurves
} = require('../intersection.js');

const doNewtonCross = require('../newton-cross.js');



describe('Intersection', ()=>{
	it('Exist', ()=>{
		assert.ok(Intersection instanceof Function);
		assert.ok(intersectCurves instanceof Function);
	});
	
	/* it('Bezier3 x Bezier3', ()=>{
		const a1 = new Vector2(1,5), a4 = new Vector2(4,0);
		const b1 = new Vector2(0,1), b4 = new Vector2(5,4);
		
		const va = 100, vb = 100; //Модуль вектора оттяжки
		
		const Va = new Vector2(1,-va);
		const Vb = new Vector2(vb, -1);
		
		const a2 = a1.add(Va), a3=a4.sub(Va);
		const b2 = b1.add(Vb), b3=b4.sub(Vb);
		
		const A = [a1,a2,a3,a4];
		const B = [b1,b2,b3,b4];
		
		let r = Intersection.intersectBezier3Bezier3(...A, ...B);
		
		let old = r.points, cur = [...intersectCurves(A, B)];
		//console.log(r);
		
		//console.log(cur);
		
		for(let i=0; i<cur.length; ++i){

			const oldA = point(A, old[i][2]);
			const oldB = point(B, old[i][0]);
			const curA = point(A, cur[i][0]);
			const curB = point(B, cur[i][1]);
			const oldD = oldA.sub(oldB).abs();
			const curD = curA.sub(curB).abs();
			
			assert.ok(curD <=oldD);
		}
		
		
	}); */
	
	it('case 1', ()=>{
		const a = [
		  new Vector2( 10, -10 ),
		  new Vector2( 0, -10 ),
		  new Vector2( 0, -5 ),
		  new Vector2( 0, 0 )
		];
		const b = [
		  new Vector2( 0, 0 ),
		  new Vector2( 0, 5 ),
		  new Vector2( 0, 10 ),
		  new Vector2( 10, 10 )
		];
		console.log(coeffsXY(b));
		let tt = [...intersectCurves(a, b)];
		console.log(tt);
		assert.ok(tt.length === 1);
		let [t,s] = tt[0];
		assert.ok(t>1023/1024);
	});
	/* it('case 2', ()=>{
		const a = [
		  new Vector2( 0, 0   ),
		  new Vector2( 0, 5   ),
		  new Vector2( 0, 10  ),
		  new Vector2( 10, 10 )
		];
		const b = [
		  new Vector2( 30, 0 ),
		  new Vector2( 0, 0  ),
		  new Vector2( 25, 0 ),
		  new Vector2( -5, 0 )
		];
	});
	it('case 3', ()=>{
		const a = [
		  new Vector2( 40, -10 ),
		  new Vector2( 40, -5  ),
		  new Vector2( 40, 0   ),
		  new Vector2( 30, 0   )
		];
		const b = [
		  new Vector2( 30, 0 ),
		  new Vector2( 0, 0  ),
		  new Vector2( 25, 0 ),
		  new Vector2( -5, 0 )
		];
	});
	it('case 4', ()=>{
		const a = [
		  new Vector2( 40, -10 ),
		  new Vector2( 40, -5  ),
		  new Vector2( 40, 0   ),
		  new Vector2( 30, 0   )
		];
		const b = [
		  new Vector2( 10, 10  ),
		  new Vector2( 30, 10  ),
		  new Vector2( 10, -20 ),
		  new Vector2( 30, -20 )
		];
	});
	it('case 5', ()=>{
		const a = [
		  new Vector2( 30, -20 ),
		  new Vector2( 40, -20 ),
		  new Vector2( 40, -15 ),
		  new Vector2( 40, -10 )
		];
		const b = [
		  new Vector2( 10, 10  ),
		  new Vector2( 30, 10  ),
		  new Vector2( 10, -20 ),
		  new Vector2( 30, -20 )
		];
	});
	it('case 6', ()=>{
		const a = [
		  new Vector2( 45, -10 ),
		  new Vector2( 15, -10 ),
		  new Vector2( 40, -10 ),
		  new Vector2( 10, -10 )
		];
		const b = [
		  new Vector2( 10, 10  ),
		  new Vector2( 30, 10  ),
		  new Vector2( 10, -20 ),
		  new Vector2( 30, -20 )
		];
	}); */
});