const {
	coeffsXY
} = require('./base.js');


const {
	resultant3x3,
	resultant2x2,
	resultant1x1
} = require('./resultant.js');

const {
	convex,
	isInConvex,
	intersectConvex,
	isIntersectConvex
} = require('./polyline.js');

const  PolynomX = require('./polynom-x.js');

const {
	abs
} = Math;

const {approxCrossing} = require('./iterators.js');


/**
 * Находит точку или точки пересечения кривых, заданных опорными точками
 *
 * @param A : Array<Vector2>
 * @param B : Array<Vector2>
 *
 */
function *intersectCurves(A, B){
	const [cAx, cAy] = coeffsXY(A);
	const [cBx, cBy] = coeffsXY(B);

	const pBx = new PolynomX(...cBx);
	const pBy = new PolynomX(...cBy);
	const pAx = new PolynomX(...cAx);
	const pAy = new PolynomX(...cAy);
	
	let deg = Math.max(pAx.deg, pAy.deg);
	
	const resultant = [
		resultant1x1,
		resultant2x2,
		resultant3x3
	][deg-1];
	
	const detS = resultant(cAx, cAy, cBx, cBy);
	
	//Находим из результанта аргумент второй кривой
	let roots = detS.realRoots(1e-9).filter((a)=>(a>=0 && a<=1));
	
	/* 
		Примем соглашение называть аргумент второй кривой буквой s, а первой - t
	*/
	for(const s of roots){
		//Для каждого корня решаем уравнения по X и по Y
		
		/*
			По условию, pA(t) = pB(s) для каждой переменной.
			pB(s) - нам известно.
			Значит нужно решить уравнения
			pA(t) - pB(s) = 0
			относительно t.
		*/
		//Оба массива содержат возможные значения t, искомое значение одно и, вероятно, более-менее близко
		let xRoots = pAx.addnew(-pBx.eval(s)).realRoots(1e-8).filter((a)=>(a>=0 && a<=1));
        let yRoots = pAy.addnew(-pBy.eval(s)).realRoots(1e-8).filter((a)=>(a>=0 && a<=1));
		
		/**
		 * Это число я утащил у Kevin Lindsey, copyright 2002-2003
		 * Вероятно, оно подобрано эмпирически
		 */
		let TOLERANCE = 1e-4;
		
		//Итерируем примерное пересечение массивов
		for(const t of approxCrossing(xRoots, yRoots, TOLERANCE, (a,b)=>((a+b)/2))){
			/*
			Ну вот, у нас есть s и t. И что с ними делать? Как возвращать?
			*/
			yield [t, s];
			break; //Находим только один корень
		}
	}
}

/**
 * Находит пару аргументов, отвечающую точке самопересечения кривой
 */
function intersectCurveSelf(A){
	const [
		[A_4, A_3, A_2, A_1], 
		[B_4, B_3, B_2, B_1]
	] = coeffsXY(A);

	const N_0 = (3 * (A_1*B_3 - A_3*B_1)**2 - 4 * (A_1*B_2 - A_2*B_1) * (A_2*B_3 - A_3*B_2));
	
	const N_2 = (A_1*B_2 - A_2*B_1)**2;
	
	if(N_0>=0 || N_2 === 0){
		return;
	}
	
	const Q = -N_0/N_2;
	
	const a = sqr(Q); //Нам нужна только положительная разность точек, если она будет отрицательная - точки просто поменяются местами
	
	//Нахождение t из уравнений для X и для Y, для проверки
	const xRoots = new PolynomX((A_1*a+A_2)*a+A_3, 3*A_1*a + 2 *A_2, 3*A_1).realRoots().filter(x=>(x>=0 && x<=1)); 
	const yRoots = new PolynomX((B_1*a+B_2)*a+B_3, 3*B_1*a + 2 *B_2, 3*B_1).realRoots().filter(x=>(x>=0 && x<=1)); 

	let TOLERANCE = 1e-4;
		
	//Итерируем примерное пересечение массивов
	for(const t of approxCrossing(xRoots, yRoots, TOLERANCE, (a,b)=>((a+b)/2))){
		if(t+a<=1){
			return [t, t+a];
		}
	}
	
}


module.exports = {
	intersectCurves,
	intersectCurveSelf
};