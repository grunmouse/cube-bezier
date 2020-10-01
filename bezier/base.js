/**
 * Наиболее общие функции для работы с кривыми Безье
 */

const {symbols:{SUB, ADD, MUL, DIV}} = require('@grunmouse/multioperator-ariphmetic');

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
 * Находит массив опорных точек производной исходной линии
 */
function dot(arr){
	let n = arr.length-1;
	return delta(arr).map((v)=>(v[MUL](n)));
}

/**
 * Делит кривую Безье в пропорции t методом Кастеляу.
 */
function split(arr, t){
	let len = arr.length, arrs = [arr];
	for(let i=1; i<len;++i){
		arrs[i] = reduce(arrs[i-1], t);
	}
	let C = [], D = [];
	for(let i=0; i<len;++i){
		C.push(arrs[i][0]);
		D.unshift(arrs[i][arrs[i].length-1]);
	}
	return [C,D];
}

/**
 * Делит кривую несколько раз 
 */
function splits(arr, T){
	let ret = [], start = 0;
	let C = arr;
	for(let i=0, len = T.length; i<len; ++i){
		let at = T[i];
		if(at>0 && at< 1){
			let t = (at-start)/(1-start);
			let [A, B] = split(C, t);
			ret.push(A);
			C = B;
		}
		start = at;
	}
	ret.push(C);
	return ret;
}

/**
 * Восстанавливает разделённую кривую Безье
 */
function join(B, C){
	if(!B[3].eq(C[0])){
		throw new Error('Bezier curves is not connected');
	}
	
	let t = B[3].sub(B[2]).abs()/C[1].sub(B[2]).abs();
	if(isNaN(t) || t==0){
		t=0.5;
	}
	
	let M = B[1].sub(B[0].mul(1-t)).div(t);
	let N = C[2].sub(C[3].mul(t)).div(1-t);
	
	return [B[0], M, N, C[3]];
}
/**
 * Восстанавливает кривую, разделённую на несколько частей
 */
function joins(arrs){
	return arrs.reduce((akk, B)=>{
		if(!akk){
			return B;
		}
		return join(akk, B);
	});
}

/**
 * Делит кривую Безье пополам до тех пор, пока её части не станут удовлетворять условию
 */
function splitCond(curve, cond){
	if(cond(curve)){
		return [curve];
	}
	else{
		let [C,D] = split(curve, 0.5).map(a=>(condSplit(a)));
		return C.concat(D);
	}
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

module.exports = {
	reduce,
	point,
	delta,
	dot,
	split,
	splits,
	splitCond,
	join,
	joins,
	proj
};