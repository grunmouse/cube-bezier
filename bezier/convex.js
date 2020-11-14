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

const {
	rectangleArea
} = require('./rectangle-area.js');

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
		B.sub(A).cross(R.sub(A))
	));

	return s.every((a)=>(a>=0)) || s.every((a)=>(a<=0));
}

/**
 * Находит часть выпуклой оболочки множества S, соединяющую точки A B
 * @param A : Vector2
 * @param B : Vector2
 * @param S : Array<Vector2>
 */
function convexPart(A, B, S){
	const X = B.sub(A);
	const H = S.map((C)=>(C.sub(A).cross(X)));
	let max = Math.max(...H);
	
	if(max<=0){
		return [A, B];
	}
	
	let P = S.filter((C,i)=>(H[i]===max));
	if(P.lenght>1){
		const R = P.map((C)=>(C.sub(A).dot(X)));
		let min = Math.min(...R);
		P = P.filter((C,i)=>(P[i]===max));
	}
	
	const C = P[0];
	
	let S1 = S.filter((D,i)=>(H[i]!==0 && D !== C));
	
	const AC = convexPart(A,C,S1);
	const CB = convexPart(C,B,S1);
	
	return AC.concat(CB.slice(1));
}


function selectDiametr(S, x){
	let [SA, SB] = getTwoDiameters(S, x);
	
	let A, B;
	if(SA[0][y] >= SB[1][y]){
		A = SA[1];
		B = SB[0];
	}
	else if(SA[1][y] <= SB[0][y]){
		A = SA[0];
		B = SB[1];
	}
	else{
		let d = [
			SA[0][y] - SB[0][y],
			SA[1][y] - SB[1][y]
		];
		if(SA[0][y]<=SB[0][y]){
			if(SA[1][y]<=SB[1][y]){
				A = SA[0];
				B = SB[1];
			}
			else{
				if(SB[0][y] - SA[0][y] >= SB[1][y] - SA[1][y]){
					A = SA[0];
					B = SB[1];
				}
				else{
					A = SA[1];
					B = SB[0];
				}
			}
		}
		else if(SA[0][y]>=SB[0][y]){
			if(SA[1][y]>=SB[1][y]){
				A = SA[1];
				B = SB[0];
			}
			else{
				if(SA[0][y] - SB[0][y] >= SA[1][y] - SB[1][y]){
					A = SA[1];
					B = SB[0];
				}
				else{
					A = SA[0];
					B = SB[1];
				}
			}
		}
			
	}
	return [A, B];
}

function getTwoDiameters(S, x){
	let y = (1-x);
	let xx = S.map(C=>(C[x]));
	let min = Math.min(...xx);
	let max = Math.max(...xx);

	let SA = S.filter((C)=>(C[x]===min)).sort((a,b)=>(a[y]-b[y]));
	let SB = S.filter((C)=>(C[x]===max)).sort((a,b)=>(a[y]-b[y]));
	
	let la = SA.length -1, lb = SB.length -1;
	
	let S1 = S.filter(C=>(!SA.includes(C) && !SB.includes(C)));
	
	SA = [SA[0], SA[la]];
	SB = [SB[0], SB[lb]];
	
	return [SA, SB, S1];
}

function convex(S){
	const area = rectangleArea(S);
	let x = +(area[1].x - area[0].x < area[1].y - area[0].y);
	let y = (1-x);
	const [[A0,A1], [B0,B1], S1] = getTwoDiameters(S, x);
	
	let parts = [];
	if(x){
		//mode Y
		parts = [
			[A1, A0],
			convexPart(A0, B0, S1),
			[B0, B1],
			convexPart(B1, A1, S1)
		];
	}
	else{
		//mode X
		parts = [
			[A0, A1],
			convexPart(A1, B1, S1),
			[B1, B0],
			convexPart(B0, A0, S1)
		];
	}
	
	return [].concat(
		...parts
	).filter((a, i, arr)=>(a!=arr[(i+1)%arr.length]));
}

/**
 * Находит выпуклую оболочку четырёхугольника
 */
function convexTetrangle(A, B, C, D){
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

function rotate(arr, i){
	let first = arr.slice(0, i), rest = arr.slice(i);
	return rest.concat(first);
}

module.exports = {
	convex,
	isInConvex,
	intersectConvex,
	isIntersectConvex
};