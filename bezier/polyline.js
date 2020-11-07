const  {
	delta,
	odelta,
	opairs,
	pairs,
	proj
} = require('./base.js');

/**
 * Рассчитывает единичное смещение точек ломаной, эквидистатной заданной
 */
function onedistance(B){
	const dotB = delta(B);
	const e = dotB.map((v)=>(v.ort().rotOrto(1)));
	const r = [];
	const n = B.length-1;
	r[0] = e[0];
	r[n] = e[n-1];
	
	for(let i=1; i<n; ++i){
		r[i] = e[i-1].add(e[i]).div(
			1 + e[i-1].dot(e[i])
		);
	}
	return r;
}

/**
 * Возвращает две ломаные, эквидистантные заданной, и располагающиеся от неё сразных сторон
 */
function boldstroke(B, s){
	const r = onedistance(B);
	let R = [], L = [];
	
	for(let i=0; i<B.length; ++i){
		R[i] = r[i].mul(-s).add(B[i]);
		L[i] = r[i].mul(s).add(B[i]);
	}
	
	return {L, R};
}


module.exports = {
	boldstroke,
	onedistance
};