const bezier = require('./bezier/base.js');

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
	
}

module.exports = Curve;