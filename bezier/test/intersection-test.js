const assert = require('assert');


const Intersection = require('../intersect.js');
const {Vector2} = require('@grunmouse/math-vector');
const bezier = require('../base.js');


describe('Intersection', ()=>{
	it('Exist', ()=>{
		assert.ok(Intersection instanceof Function);
	});
	
	it('Bezier3 x Bezier3', ()=>{
		const a1 = new Vector2(1,5), a4 = new Vector2(4,0);
		const b1 = new Vector2(0,1), b4 = new Vector2(5,4);
		
		const va = 100, vb = 10; //Модуль вектора оттяжки
		
		const Va = new Vector2(1,-va);
		const Vb = new Vector2(vb, -1);
		
		const a2 = a1.add(Va), a3=a4.sub(Va);
		const b2 = b1.add(Vb), b3=b4.sub(Vb);
		
		let r = Intersection.intersectBezier3Bezier3(a1,a2,a3,a4,b1,b2,b3,b4);
		
		for(let [t, v] of r.points){
			//let a = bezier.point([a1,a2,a3,a4], s);
			let b = bezier.point([b1,b2,b3,b4], t);
			
			console.log(t, v.sub(b).abs());
			console.log();
		}
		
		
	});
});