const assert = require('assert');


const Intersection = require('../intersect.js');
const Vector2D = require('../Vector2D.js');
const {Vector2} = require('@grunmouse/math-vector');

Vector2.prototype.multiply = Vector2.prototype.mul;
Vector2.prototype.subtract = Vector2.prototype.sub;

describe('Intersection', ()=>{
	it('Exist', ()=>{
		assert.ok(Intersection instanceof Function);
	});
	
	it('Bezier3 x Bezier3', ()=>{
		const a1 = new Vector2(1,5), a4 = new Vector2(4,0);
		const b1 = new Vector2(0,1), b4 = new Vector2(5,4);
		
		const va = 100, vb =100; //Модуль вектора оттяжки
		
		const Va = new Vector2(1,-va);
		const Vb = new Vector2(vb, -1);
		
		const a2 = a1.add(Va), a3=a4.sub(Va);
		const b2 = b1.add(Vb), b3=b4.sub(Vb);
		
		let r = Intersection.intersectBezier3Bezier3(a1,a2,a3,a4,b1,b2,b3,b4);
		
		console.log(r);
	});
});