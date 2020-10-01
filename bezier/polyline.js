const  {
	delta,
	proj
} = require('./base.js');

/**
 * Рассчитывает единичное смещение точек ломаной, эквидистатной заданной
 */
function onedistance(B){
	const dotB = delta(B);
	const e = dotB.map((v)=>(v.ort().rotOrto(1));
	const r = [];
	const n = B.length-1;
	r[0] = e[0];
	r[n] = e[n-1];
	
	for(let i=1; i<n; ++i){
		r[i] = e[i-1].add(e[i]).div(
			1 + e[i-1].dot(e[i])
		);
	}
	return r;
}

/**
 * Возвращает две ломаные, эквидистантные заданной, и располагающиеся от неё сразных сторон
 */
function boldstroke(B, s){
	const r = onedistance(B);
	let R = [], L = [];
	
	for(let i=0; i<B.length; ++i){
		R[i] = r[i].mul(-s).add(B[i]);
		L[i] = r[i].mul(s).add(B[i]);
	}
	
	return {L, R};
}

/**
 * Находит точку пересечения прямых AB и CD
 */
function intersectLine(A, B, C, D){
	const V = B.sub(A), W = D.sub(C); //Направляющие вектора прямых
	/*
	R_00 = A; R_01 = B; r_0 = V;
	R_10 = C; R_11 = D; r_1 = W;
	
	R = \frac{r_0 (R_11 \times R_10) - r_1 (R_01  \times R_00)}{r_1 \times r_0}
	
	\times - псевдоскалярное произведение
	Опущен - знак умножения на число
	
	R = \frac{V (D \times C) - W (B  \times A)}{W \times V}
	*/
	
	let N = W.cross(V); //Знаменатель выражения
	
	//Проверка нуля
	let ctrl = N.div(W.dot(V));
	if(ctrl < Number.EPSILON){
		return undefined;
	}
	
	const R = V.mul(D.cross(C)).sub(W.mul(B.cross(A))).div(N);
	
	return R;
}

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
 * Находит точку пересечения отрезков AB и CD
 */
function intersectLinePart(A, B, C, D){
	const R = intersectLine(A, B, C, D);
	if(R && isIn(R, A, B) && isIn(R, C, D)){
		return R;
	}
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
function intersectRectgle(A, B, C, D){
	//Чтобы прямоугольные области пересекались, нужно чтобы пересекались их проекции на каждую ось
	return A.every((_, i)=>{
		//проекции пересекаются, если одна из крайних точек одного отрезка находится внутри на другого отрезка
		return isIn(A[i], C[i], D[i]) || isIn(B[i], C[i], D[i]);
	});
}