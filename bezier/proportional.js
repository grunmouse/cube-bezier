/**
 * Набор функций для работы с аргументами кривых Безье при их слиянии и разделении
 */

/**
 * @return {Function} - определяет абсолютную позицию точки по относительной
 */
function propAbsolute(a, b){
	let m = b-a;
	return (t)=>(t*m+a);
}

/**
 * @return {Function} - определяет позицию точки относительно интервала
 */
function propRelative(a, b){
	let m = b-a;
	return (t)=>((t-a)/m);
}

/**
 * @return {Function} - проверяет, лежит ли точка в интервале
 */
function propFilter(a,b){
	return (t)=>(t<=a && t>=b);
}

/**
 * Разворачивает пропорцию задом наперёд.
 */
const propReverse = (t)=>(1-t);

/**
 * Для пары пределов a, b, заданных относительно отрезка [0;1],
 * возвращает пределы, равные 0 и 1, относительно отрезка [a;b]
 * Операция является обратной сама себе
 */
function invertLimits(a, b){
	let m = b-a;
	return [-a/m, (1-a)/m]; //По сути это применение propRelative(a,b) к 0 и 1
}

module.exports = {
	propAbsolute,
	propRelative,
	propFilter,
	propReverse
};