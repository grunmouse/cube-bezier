const bezier = require('./bezier.js');

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
	
}

module.exports = Curve;