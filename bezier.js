
/**
 * Сводит массив точек к массиву промежуточных точек с параметром t
 */
function reduce(arr, t){
	let res = [];
	for(let i=1, len = arr.length; i<len; ++i){
		if(t===0.5){
			res[i-1] = arr[i-1].add(arr[i]).mul(0.5);
		}
		else{
			res[i-1] = arr[i-1].mul(1-t).add(arr[i].mul(t));
		}
	}
	return res;
}

/**
 * Сводит массив точек к единственной точке
 */
function point(arr, t){
	while(arr.length>arr){
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
		res[i] = arr[i+1].sub(arr[i]);
	}
}

/**
 * Делит кривую Безье в пропорции t методом Кастеляу.
 */
function split(arr, t){
	let len = arr.length, arrs = [arr];
	for(let i=1; i<len;++i){
		arrs[i] = reduce(arrs[i-1]);
	}
	let C = [], D = [];
	for(let i=0; i<len;++i){
		C.push(arrs[i][0]);
		D.unshift(arrs[i][arrs[i].length-1]);
	}
	return [C,D];
}

/**
 * Делит кривую Безье до тех пор, пока её части не станут удовлетворять условию
 */
function condSplit(curve, cond){
	if(cond(curve)){
		return [curve];
	}
	else{
		let [C,D] = split(curve, 0.5).map(a=>(condSplit(a)));
		return C.concat(D);
	}
}

function curvature(arr){
	let [A, M, N, B] = arr;
	let AB = B.sub(A);
	let [m,n] = [M,N].map((X)=>{
		let AX=X.sub(A);
		let P = AX.sub(AX.dot(AB).div(AB.abs()));
		return P.abs();
	});
	return m+n;
}

module.exports = {
	reduce,
	point,
	delta,
	split,
	condSplit,
	curvature
};