const bezier = require('./bezier/base.js');
const {POINT_TOLERANCE} = require('./constants.js');
const {argumentEpsilon} = require('./bezier/cube-curve.js');

const abs = Math.abs;

/**
 * Представляет кривую безье, заданную точками, которую можно отрисовать в разных форматах
 */
class Curve extends Array{

	relativeCDR(){
		let [car, ...cdr] = this;
		return cdr.map((item)=>(item.sub(car)));
	}
	
	getPoint(t){
		return bezier.point(this, t);
	}
	
	split(t){
		return bezier.split(this, t).map(a=>(new Curve(...a)));
	}
	
	epsilon(){
		return argumentEpsilon(this, POINT_TOLERANCE);
	}
	
	eq(b){
		//Для каждой точки находим разность, и для каждой разности проверяем каждую координату
		return this === b || this.every((a,i)=>(
			a.sub(b[i]).every((x)=>(abs(x)<=POINT_TOLERANCE))
		));
	}
}

module.exports = Curve;