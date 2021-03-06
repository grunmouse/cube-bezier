const  {
	reduce,
	point,
	delta,
	dot,
	proj,
	coeff,
	coeffsXY
} = require('./base.js');

const{
	abs
} = Math;

const {
	approxCrossing
} = require('./iterators.js');

const PolynomX = require('./polynom-x.js');

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
 * Находит опорные точки одномерной кривой, описывающей псевдоскалярное произведение
 * первой и второй производных исходной кубической кривой
 *
 * @param B : Array[4]<Vector> - опорные точки кривой
 * @return Array[4]<Number> - точки одномерной кривой в порядке следования
 */
function getKPoints(B){
	let dotB = dot(B); //Опорные точки первой производной
	let ddotB = dot(dotB); //Опорные точки второй производной
	//Сверить с документом
	let K = [
		dotB[0].cross(ddotB[0]),
		(dotB[0].cross(ddotB[1])+2*dotB[1].cross(ddotB[0]))/3,
		(2*dotB[1].cross(ddotB[1])+dotB[2].cross(ddotB[0]))/3,
		dotB[2].cross(ddotB[1])
	];
	return K;
}

/** 
 * Находит точки перегиба
 * @param B : Array[4]<Vector> - опорные точки кривой 
 * @return Array<Number[0..1]> - точки одномерной кривой в порядке следования
 */
function inflection(B){
	let K = getKPoints(B);
	let c = coeff(K);
	let t = new PolynomX(...c).realRoots().filter((t)=>(t>=0 && t<=1));
	
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


/**
 * Проверяет, лежит ли точка A на кривой, и если да, находит её аргумент
 */
function findArgument(curve, A){
	const P = coeffsXY(curve).map((K)=>(new PolynomX(...K)));
	
	//Подстановка переменных должна обращать многочлены в нули
	const TOLERANCE = 1e-4;
	const ctrl = A.every((x, i)=>(
		abs(P[i].eval(x))<TOLERANCE
	));
	
	if(!ctrl){
		return NaN;
	}
	
	//Приравняв многочлен к значению координаты - получим уравнения
	//P(t) - x = 0
	const E = P.map((p, i)=>(p.addnew(-A[i])));
	//Решая эти уравнения для каждой переменной, получим два массива корней
	const xRoots = E[0].realRoots().filter(a=>(a>=0 && a<=1)); //Кубическое уравнение не требует заданной точности
	const yRoots = E[1].realRoots().filter(a=>(a>=0 && a<=1));
	
	//Берём первое значение итератора
	let t = approxCrossing(xRoots, yRoots, TOLERANCE, (a,b)=>((a+b)/2)).next().value;
	
	return t;
}

/**
 * Рассчитвает необходимую точность аргумента кривой
 * для обеспечения погрешности точек 
 * @param curve : Array<Vector2> - кривая, заданная опорными точками
 * @param epsilon : Number - допустимая погрешность точек
 */
function argumentEpsilon(curve, epsilon){
	const P = coeffsXY(curve).map((K)=>(new PolynomX(...K).diff()));
	const C = P.map((P)=>(
		P.diff.realRoots().filter(t=>(t>=0 && t<=1))
			.concat([0,1])
			.map((t)=>(abs(P.eval(t))))
	));
	
	const m = Math.max(...C.flat());
	
	//m = dx/dt
	//dt = dx/m
	
	return m>1 ? epsilon/m : epsilon;
}

/**
 * Проверяте кубические полиномы на приводимость друг к другу линейной заменой аргумента
 * @param A - коэффициенты полинома A
 * @param B - коэффициенты полинома B
 */
function subcurve(A, B){
	let pA = new PolynomX(...A);
	let pB = new PolynomX(...B);
	let dA = dA.diff;
	
	const TOLERANCE = 1e-4;

	if(pA.deg === 3 && pB.deg === 3){
		let m3 = A[3]/B[3];
		let m = Math.cbrt(m3);
		let a = (A[2]*m**2 - B[2])/B[3]/3;
		
		if(
			abs(dA.eval(-a/m) - m*B[1])<=TOLERANCE
			&&
			abs(pA.eval(-a/m) - B[0])<=TOLERANCE
		){
			let b = m+a;
			return [a,b];
		}
	}
	else if(pA.deg === 2 && pB.deg === 2){
		let m2 = A[2]/B[2];
		let m = Math.sqrt(m2);
		let a = (A[1]/m - B[1])/B[2]/2;
		if(abs(pA.eval(-a/m) - B[0])<=TOLERANCE){
			let b = m+a;
			return [a,b];
		}
	}
	else if(pA.deg === 1 && pB.deg === 1){
		let m = A[1]/B[1];
		let a = (A[0] - B[0])/B[1];
		let b = m+a;
		return [a,b];
	}
	
	return false;
}

module.exports = {
	curvature,
	inflection,
	subcurve,
	splitInflection,
	findArgument,
	argumentEpsilon
};