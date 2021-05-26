const  {
	odelta
} = require('./base.js');

const {
	opairs
} = require('./iterators.js');


const {
	intersectLinePart
} = require('./line.js');

const {
	rectangleArea,
	matrixIntersectRectangles
} = require('./rectangle-area.js');

const {SetableMatrix, SquareMatrix2} = require('@grunmouse/math-matrix');

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
	const H = S.map((C)=>(X.cross(C.sub(A))));
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
 * Анализирует пересечение выпуклых оболочек
 */
function intersectConvex(M, N){
	let cross = [];
	const m = opairs(M), n = opairs(N);
	let mn = m.concat(n).map(rectangleArea);
	let sep = m.length;
	
	let mat = isIntersectRectangles(mn);
	
	for(let [i, j, s] of mat.itrItems()){
		if(s===1 && i<sep & j>=sep){
			let intersect = intersectLinePart(M[i][0], M[i][1], N[j][0], N[j][1]);
			
			if(intersect){
				cross.push([M, N, intersect]);
			}
		}
	}
	
	//Попадание точек N в оболочку M
	const Ns = N.filter((P)=>(isInConvex(P, M)));
	const Ms = M.filter((P)=>(isInConvex(P, N)));
	
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
	
	let mn = m.concat(n).map(rectangleArea);
	let sep = m.length;
	
	let mat = matrixIntersectRectangles(mn);
	
	for(let [i, j, s] of mat.itrItems()){
		if(s===1 && i<sep & j>=sep){
			let intersect = intersectLinePart(M[i][0], M[i][1], N[j][0], N[j][1]);
			
			if(intersect){
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

function matrixIntersectConvexes(S){
	let matArea = matrixIntersectRectangles(S.map(rectangleArea));
	let mat = new SetableMatrix(matArea.M);
	
	for(let [i, j, s] of matArea.itrItems()){
		if(i<j){
			if(isIntersectConvex(S[i], S[j])){
				mat.setValue(i, j, 1);
				mat.setValue(j, i, 1);
			}
		}
	}
	
	return mat.toMatrix();
}

module.exports = {
	convex,
	isInConvex,
	intersectConvex,
	isIntersectConvex,
	matrixIntersectConvexes
};