const  {
	delta,
	odelta,
	dot,
	points,
	proj
} = require('./base.js');

/**
 * Проверяет, попадает ли точка R в прямоугольную область между вершинами AB
 * Если подставить коллинеарные вектора - это будет проверка на R \in AB
 */
function isIn(R, [A, B]){
	let AR = R.sub(A), AB = B.sub(A);
	
	for(let i=0; i<R.length; ++i){
		if(AR[i]<0 || AR[i]>AB[i]){
			return false;
		}
	}
	return true;
}

/**
 * Находит прямоугольную область, вмещающую кривую
 * @return Array[2]<Vector> - верхняя левая и нижняя правая точки
 */
function rectangleArea(B){
	const Ctor = B[0].constructor;
	const limits = Array.from(B[0], (_, i)=>{
		let x = proj(B, i);
		let max = Math.max(...x);
		let min = Math.min(...x);
		return [min, max];
	});
	
	let result = [0,1].map((i)=>(new Ctor(...proj(limits, i))));
	
	return result;
}


/**
 * Находит прямоугольную область, являющуюся пересечением
 */
function intersectRectangle(A, B, C, D){
	let limits = A.every((_, i)=>{
		if(A[i]<=C[i] && C[i]<=B[i]){
			return [C[i], B[i]];
		}
		else if(C[i]<=A[i] && A[i]<=D[i]){
			return [A[i], D[i]];
		}
	});
	
	if(limits.some(a=>(!a))){
		return ;
	}
	
	let result = [0,1].map((i)=>(new Ctor(...proj(limits, i))));
	
	return result;
}

module.exports = {
	isIn,
	rectangleArea,
	intersectRectangle
};