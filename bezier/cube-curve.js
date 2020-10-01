const  {
	reduce,
	point,
	delta,
	dot,
	split,
	splits,
	splitCond
	join,
	joins,
	proj
} = require('./base.js');

const coeff = require('./coeff.js');

const cube = require('./cube-equation.js');

/**
 * Функция оценки кривизны
 * @param arr : Array[4]<Vector> - опорные точки кривой
 * @return Number - число, характеризующее кривизну
 */
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
 * Афинно преобразует кубическую ломаную так, чтобы линия, соединяющая её концы лежала на оси X
 */
function aphineAD(B){
	const C = B.map((Bi)=>(Bi-B[0]));
	const e3 = C[3].ort();
	const D = C.map((Ci)=>(e3.dot(Ci) + e3.cross(Ci)));
	return D;
}

/**
 * Находит экстремумы одномерной кубической кривой
 */
function extremal(Y){
	const dotY = delta(Y), ddotY = delta(dotY);
	
	const [c,b,a] = coeff(dotY); //Коэффициенты квадратного уравнения
	
	const critical = cube(0, a, b, c);
	
	const values = new Map();
	
	const maximum = new Set();
	const minimum = new Set();
	const supremum = 0;
	const infimum = 0;
	
	for(let t of critical){
		let y = point(Y,t);
		values.set(t,y);
		let s = point(ddotY, t);
		if(s>Number.EPSILON){
			maximum.add(t);
			if(y>supremum){
				supremum = y;
			}
		}
		else if(s<-Number.EPSILON){
			minimum.add(t);
			if(y<infimum){
				infimum = y;
			}
		}
	}
	return {
		values,
		maximum.
		minimum,
		supremum,
		infimum
	}
}

/**
 * Находит опорные точки одномерной кривой, описывающей псевдоскалярное произведение
 * первой и второй производных исходной кубической кривой
 *
 * @param B : Array[4]<Vector> - опорные точки кривой
 * @return Array[4]<Number> - точки одномерной кривой в порядке следования
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

/** 
 * Находит точки перегиба
 * @param B : Array[4]<Vector> - опорные точки кривой 
 * @return Array<Number[0..1]> - точки одномерной кривой в порядке следования
 */
function inflection(B){
	let K = getKPoints(B);
	let c = coeff(C);
	let t = cube(c).filter((t)=>(t>=0 && t<=1));
	
	return t;
}

/**
 * Делит кривую на части, не содержащие перегибов в неконцевых точках
 * 
 * @param B : Array[4]<Vector> - опорные точки кривой 
 * @return Array<Array[4]<Vector>> - массив кривых, заданных массивами точек
 */
function splitInflection(B){
	let t = inflection(B).filter((t)=>(t>0 && t<1));
	if(t.lenght){
		return splits(t);
	}
	else{
		return [B];
	}
}

module.exports = {
	curvature,
	inflection,
	splitInflection
};