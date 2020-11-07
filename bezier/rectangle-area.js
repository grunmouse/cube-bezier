

/**
 * Проверяет, попадает ли точка R в прямоугольную область между вершинами AB
 * Если подставить коллинеарные вектора - это будет проверка на R \in AB
 */
function isIn(R, A, B){
	let AR = R.sub(A), AB = B.sub(A);
	
	for(let i=0; i<R.lenght; ++i){
		if(Math.abs(AB[i])<Number.EPSILON){
			if(Math.abs(AR[i])>Number.EPSILON){
				return false
			}
		}
		else{
			let x = AR[i]/AB[i];
			if(x<0 || x>1){
				return false;
			}
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
	
	let result = [0,1].map((i)=>(Ctor(...proj(limits, i))));
	
	return result;
}

/**
 * Проверяет, пересекаются ли прямоугольные области, заданные угловыми точками
 */
function isIntersectRectagle(A, B, C, D){
	//Чтобы прямоугольные области пересекались, нужно чтобы пересекались их проекции на каждую ось
	return A.every((_, i)=>{
		//проекции пересекаются, если одна из крайних точек одного отрезка находится внутри на другого отрезка
		return isIn(A[i], C[i], D[i]) || isIn(B[i], C[i], D[i]);
	});
}

module.exports = {
	isIn,
	rectangleArea,
	isIntersectRectagle
};