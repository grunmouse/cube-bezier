const  {
	delta,
	odelta,
	dot,
	points,
	proj
} = require('./base.js');

const {SetableMatrix} = require('@grunmouse/math-matrix');

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

/**
 * Возвращает матрицу смежности графа, описывающего пересечения
 */
function matrixIntersectRectangles(areas){
	const symbols = new Map();
	const N = areas.length;
	const points = [];
	const OPEN = 0, CLOSE = 1;
	for(let i =0; i<N; ++i){
		let area = areas[i];
		symbols.set(area[0], {type: OPEN, index:i});
		symbols.set(area[1], {type:CLOSE, index:i});
		points.push(...area);
	}
	
	const d = [0, 1].map((x)=>{
		points.sort((a,b)=>(a[x]-b[x]));
		const opens = new Set();
		const edges = new SetableMatrix(N, N);
		
		for(let i=0; i<points.length; ++i){
			let p = points[i];
			let s = symbols.get(p);
			let j = s.index;
			if(s.type === OPEN){
				for(let i of opens){
					edges.setValue(i, j, 1);
					edges.setValue(j, i, 1);
				}
				opens.add(j);
			}
			else if(s.type === CLOSE){
				opens.delete(j);
			}
		}
		
		return edges;
	});
	
	const res = d[0].odot(d[1]);
	
	return res.toMatrix();
	
}

module.exports = {
	isIn,
	rectangleArea,
	intersectRectangle,
	matrixIntersectRectangles
};