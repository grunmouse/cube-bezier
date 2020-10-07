const factorial = [...(function*(){
	let i=0, f = 1;
	yield f;
	for(i=1;i<10;++i){
		f*=i;
		yield f;
	}
})()];

/**
 * Мультиноминальный коэффициент по массиву нижних индексов (верхний рассчитывается автоматически)
 * \binom{\sum{arr}}{arr}
 */
function multinom(...arr){
	let sum = arr.reduce((akk, v)=>(akk+v),0);
	let res = factorial[sum];
	for(let v of arr){
		if(v>1){
			res/=factorial[v];
		}
	}
	return res;
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

module.exports = coeff