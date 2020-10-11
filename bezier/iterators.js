
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

return {
	approxCrossing
};