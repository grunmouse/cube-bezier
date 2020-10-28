const abs = Math.abs;

/**
 * Итерирует пересечение числовых массивов, считая числа равными, если они в эпсилон-окрестности друг друга
 * @param a : Array<Number>
 * @param b : Array<Number>
 * @param epsilon : Number
 * @param handle : ?Function(a,b=c) - функция обработки пары значений перед возвратом. По умолчанию будет возвращён элемент a
 */
function *approxCrossing(a, b, epsilon, handle){
	if(!a.length || !b.length) return;
	
	forx:for(let x of a){
		for(let y of b){
			if(abs(x-y)<=epsilon){
				if(handle){
					yield handle(x,y);
				}
				else{
					yield x;
				}
				continue forx;
			}
		}
	}
}

/**
 * Возвращает пары соседних элементов массива от первого до последнего
 * @param arr : Array<N>
 * @return Array<[N, N]>
 */
function pairs(arr){
	let len = arr.length-1;
	let res = [];
	for(let i=0;i<len; ++i){
		res.push([arr[i],arr[i+1]]);
	}
	return res;
}
/**
 * Возвращает пары соседних элементов массива, добавляя к ним пару последнего с первым
 * @param arr : Array<N>
 * @return Array<[N, N]>
 */
function opairs(arr){
	let len = arr.length-1;
	let res = [];
	for(let i=0;i<len; ++i){
		res.push([arr[i],arr[i+1]]);
	}
	res.push([arr[len],arr[0]]);
	return res;
}



module.exports = {
	approxCrossing,
	pairs,
	opairs
};