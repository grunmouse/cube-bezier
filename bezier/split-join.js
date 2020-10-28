const {
	reduce
} = require('./base.js');

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
 * Восстанавливает разделённую кривую Безье и пропорцию её разбиение
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
	
	return [[B[0], M, N, C[3]], t];
}
/**
 * Восстанавливает кривую, разделённую на несколько частей и массив пропорций разбиения
 */
function joins(arrs){
	//console.log(arrs);
	return arrs.slice(1).reduce((akk, B)=>{
		let [A, T] = akk, t;
		//console.log(A);
		//console.log(B);
		[A, t] = join(A, B);
		T = T.map((s)=>(s*t));
		T.push(t);
		return [A, T];
	}, [arrs[0], []]);
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

module.exports = {
	split,
	splits,
	join,
	joins,
	splitCond
};