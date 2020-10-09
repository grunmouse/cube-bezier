
const fact = [...(function*(){
	let i=0, f = 1;
	yield f;
	for(i=1;i<10;++i){
		f*=i;
		yield f;
	}
})()];


function factorial(n){
	if(!fact[n]){
		fact[n] = factorial(n-1) * n;
	}
	//console.log(n, fact[n]);
	return fact[n];
}

/**
 * Мультиноминальный коэффициент по массиву нижних индексов (верхний рассчитывается автоматически)
 * \binom{\sum{arr}}{arr}
 */
function multinom(...arr){
	let sum = arr.reduce((akk, v)=>(akk+v),0);
	let res = factorial(sum);
	for(let v of arr){
		if(v>1){
			res/=factorial(v);
		}
	}
	return res;
}

function binom(n, i){
	return factorial(n)/factorial(i)/factorial(n-1);
}

/**
 * Возвращает положительное значение, если поворот от a к b - против часовой стрелки, и 
 * отрицательное, в противоположном случае, ноль, если их разность кратна 2pi
 */
function angleSub(a, b){
	let d = b - a; //Разность узлов, как она есть
	//Надо получить разность от -PI до PI
	while(d>Math.PI){
		d -= 2*Math.PI;
	}
	while(d<-Math.PI){
		d += 2*Math.PI;
	}
	return d;
}



module.exports = {
	factorial,
	binom,
	multinom,
	angleSub
}