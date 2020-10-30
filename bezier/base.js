/**
 * Наиболее общие функции для работы с кривыми Безье
 */

const {symbols:{SUB, ADD, MUL, DIV}} = require('@grunmouse/multioperator-ariphmetic');

const {
	multinom,
	binom,
	theta
} = require('./math.js');


/**
 * Сводит массив точек к массиву промежуточных точек с параметром t
 */
function reduce(arr, t){
	let res = [];
	for(let i=1, len = arr.length; i<len; ++i){
		if(t===0.5){
			res[i-1] = arr[i-1][ADD](arr[i])[MUL](0.5);
		}
		else{
			res[i-1] = arr[i-1][MUL](1-t)[ADD](arr[i][MUL](t));
		}
	}
	return res;
}

/**
 * Сводит массив точек к единственной точке
 */
function point(arr, t){
	while(arr.length>1){
		arr = reduce(arr, t);
	}
	return arr[0];
}

/**
 * Находит массив разностей точек
 */
function delta(arr){
	let len = arr.length-1;
	let res = [];
	for(let i=0;i<len; ++i){
		res[i] = arr[i+1][SUB](arr[i]);
	}
	return res;
}

/**
 * Находит массив разностей точек по кольцу
 */
function odelta(arr){
	let len = arr.length-1;
	let res = [];
	for(let i=0;i<len; ++i){
		res[i] = arr[i+1][SUB](arr[i]);
	}
	res[len] = arr[0][SUB](arr[len]);
	return res;
}

/**
 * Находит массив опорных точек производной исходной линии
 */
function dot(arr){
	let n = arr.length-1;
	return delta(arr).map((v)=>(v[MUL](n)));
}

/**
 * Возвращает проекцию кривой на ось
 * @param curve : Array<Vector>
 * @param axis : (number|string) - номер координаты или имя оси, если класс вектора поддерживает имена
 * @return Array<Number> - одномерная кривая Безье, заданная точками
 */
function proj(curve, axis){
	return curve.map((v)=>(v[axis]));
}

/**
 * Рассчитывает коэффициенты полинома одномерной кривой
 * @param K : Array<Number> - точки одномерной кривой в порядке следования
 * @return Array<Number> - коэффициенты полинома под номерами степеней переменной
 */
function coeff(K){
	let n = K.length - 1;
	let c = K.map((_, j)=>{
		let res = 0;
		for(let k=0; k<=j; ++k){
			let part = multinom(j-k, k, n-j) * K[j-k];
			if(k & 1 === 1){
				//(-1)**k
				part =-part;
			}
			res += part;
		}
		return res;
	});
	return c;
}

/**
 * Возвращает по полиному для каждого измерения кривой Безье
 * @param curve : Array<Vector>
 */
function coeffsXY(curve){
	return Array.from(curve[0], (_, i)=>(
		coeff(proj(curve, i))
	));
}

/**
 * Находит точки одномерной кривой по её коэффициентам
 */
function points(c){
	let n = c.length-1;
	let K = [];
	c.forEach((cj, j)=>{
		let res = cj/binom(n,j);
		for(let k=1; k<=j; ++k){
			let part = binom(j,k)*K[j-k];
			if(k & 1 === 1){
				part = -part;
			}
			res -= part;
		}
		K[j] = res;
	});
	return K;
}

/**
 * Находит кривую, соответствующую произведению двух кривых
 */
function multiple(A, B, TIMES){
	const m = A.length-1, n = b.length-1;
	const Ctor = A[0].constructor;
	
	const M = [];
	
	for(let k=0; k<=m+n; ++k){
		let val = new Ctor();
		const dividend = binom(n+m, k);
		for(let i = 0; i<=n; ++i){
			let j = k-i;
			if(theta(j) && theta(m-j)){
				const coeff = binom(n, i)*binom(m,j);
				
				let part = A[j][TIMES](B[i])[MUL](coeff)
				
				val = val[ADD](part);
			}
		}
		val = val[DIV](dividend);
		
		M[k] = val;
	}
}

module.exports = {
	reduce,
	point,
	delta,
	odelta,
	dot,
	coeff,
	coeffsXY,
	points,
	proj
};