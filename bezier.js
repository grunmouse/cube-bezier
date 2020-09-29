const {symbol:{SUB, ADD, MUL, DIV}} = require('@grunmouse/multioperator-ariphmetic');


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

/**
 * Находит опорные точки одномерной кривой, описывающей псевдоскалярное произведение
 * первой и второй производных исходной кубической кривой
 */
function getKPoints(B){
	let dotB = dot(B); //Опорные точки первой производной
	let ddotB = dot(dotB); //Опорные точки второй производной
	let K = Array.from({length:4}, (_, i)=>{
		let j = 3-i;
		let res = 0;
		if(j>0){
			let part = dotB[i].cross(ddotB[0]);
			if(j<3){
				part = part*j/3;
			}
			res += part;
		}
		if(i>0){
			let part = dotB[i-1].cross(ddotB[1]);
			if(i<3){
				part = part*i/3;
			}
			res += part;
		}
		return res;
	});
	return K;
}

const factorial = [...(function*(){
	let i=0, f = 1;
	yield f;
	for(i=1;i<7;++i){
		f*=i;
		yield f;
	}
})()];

function multinom(arr){
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


module.exports = {
	reduce,
	point,
	delta,
	dot,
	split,
	join,
	condSplit,
	curvature,
	getKPoints,
	coeff
};