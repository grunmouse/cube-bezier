
/**
 * Сводит массив точек к массиву промежуточных точек с параметром t
 */
function reduce(arr, t){
	let res = [];
	for(let i=1, len = arr.length; i<len; ++i){
		res[i-1] = arr[i-1].mul(1-t).add(arr[i].mul(t));
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

module.exports = {
	reduce,
	point,
	delta
};