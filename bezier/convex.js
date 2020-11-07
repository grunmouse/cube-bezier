const  {
	delta,
	odelta,
	proj
} = require('./base.js');

const {
	opairs,
	pairs
} = require('./iterators.js');


const {
	intersectLinePart
} = require('./line.js');



/**
 * Проверяет, находится ли точка R внутри треугольника ABC
 */
function isInTriangle(R, A, B, C){
	const ABC = [A, B, C];
	const abc = odelta(ABC);
	let s = ABC.map((A, i)=>(
		abc[i].cross(R.sub(A))
	));
	
	return s.every((a)=>(a>0)) || s.every((a)=>(a<0));
}

/**
 * Проверяет, находится ли точка внутри выпуклой оболочки
 */
function isInConvex(R, S){
	let s = opairs(S).map(([A,B])=>(
		B.sub(A).cross(R.sub(A)
	)));
	return s.every((a)=>(a>0)) || s.every((a)=>(a<0));
}

/**
 * Находит выпуклую оболочку четырёхугольника
 */
function convex(A, B, C, D){
	let S = [A, B, C, D];
	//собираем в кучку первые и последние точки, они точно не могут быть внутренними
	let ang = new Set();
	S.sort((a,b)=>(a.x-b.x));
	ang.add(S[0]); ang.add(S[3]);
	S.sort((a,b)=>(a.y-b.y));
	ang.add(S[0]); ang.add(S[3]);
	
	S = S.filter(a=>(!ang.has(a))); //Оставим в S кандидатов на внутренние
	
	
	if(S.length === 2){
		let R = S.pop();
		if(isInTriangle(R, S[0], ...ang)){
			//R внутри 
			return [S[0], ...ang];
		}
		else{
			//R снаружи, S[0] осталась под подозрением
			ang.add(R);
		}
	}
	
	//Одна подозрительная точка, проверим её
	if(S.length === 1 && isInTriangle(S[0], ...ang)){
		return [...ang];
	}


	//Это не треугольник, найдём порядок вершин
	if(intersectLinePart(A, B, C, D)){
		//AB и CD пересекаются, мы нашли диагонали
		return [A, C, B, D];
	}
	else{
		//AB и CD - несмежные стороны
		if(intersectLinePart(A, C, B, D)){
			//AC и BD пересекаются, мы нашли диагонали
			return [A, B, C, D];
		}
		else{
			//AC и BD - тоже несмежные стороны, мы нашли четыре стороны
			return [A, B, D, C];
		}
	}
}

 
/**
 * Анализирует пересечение выпуклых оболочек
 */
function intersectConvex(M, N){
	let cross = [];
	const m = opairs(M), n = opairs(N);
	let sn = [], sm = [];
	m.forEach(([A,B], i)=>{
		sm[i]=[];
		let AB = B.sub(A);
		n.forEach(([C,D],j)=>{
			sn[j] = sn[j] || [];
			let R = intersectLinePart(A,B,C,D);
			if(R){
				cross.push(R);
			}
			let CD = D.sub(C);
			let AC = C.sub(A);
			sn[j][i] = AB.cross(AC); //Положение точки C относительно ребра AB
			sm[i][j] = CD.cross(AC); //Положение точки A относительно ребра CD
		});
	});
	
	//Попадание точек N в оболочку M
	const Ns = new Set();
	const Ms = new Set();
	sn.forEach((s, i)=>{
		if(s.every((a)=>(a>=0)) || s.every((a)=>(a<=0))){
			Ns.add(N[i]);
		}
	});
	//Попадание точек M в оболочку N
	sm.forEach((s, i)=>{
		if(s.every((a)=>(a>=0)) || s.every((a)=>(a<=0))){
			Ms.add(M[i]);
		}
	});
	
	return {
		cross,
		Ns, Ms
	};
}

/**
 * Проверяет выпуклые оболочки на пересечение
 */
function isIntersectConvex(M, N){
	let cross = [];
	const m = opairs(M), n = opairs(N);
	let sn = [], sm = [];
	for(let [A, B] of m){
		for(let [C, D] of n){
			let R = intersectLinePart(A,B,C,D);
			if(R){
				return true;
			}
		}
	}
	
	//Возможно, одна оболочка полностьюу находится внутри другой. Проверим
	let s = isInConvex(M[0], N) || isInConvex(N[0], M);
	
	return s;
}

module.exports = {
	convex,
	isInConvex,
	intersectConvex,
	isIntersectConvex
};