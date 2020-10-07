const {recursiveJoin} = require('@grunmouse/strings');

/**
 * Представляет путь, состоящий из кривых Безье и методы его отрисовки в разных форматах
 */
class CurvePath{
	/**
	 * @param start :Vector2
	 * @param curves : Array<Curve>
	 * @param close : Boolean
	 */
	constructor(start, curves, close){
		this.start = start;
		this.curves = curves;
		this.close = close;
	}
	
	/**
	 * отрисовывает путь в SVG-path
	 */
	toSVG(){
		let {start, curves, close} = this;
		let code = 'M ' + start.join(",") + ' '
			+ curves.map((curve)=>('c '+recursiveJoin(curve.relativeCDR(), [' ', ',']))).join(' ');
			
		if(close){
			code += 'Z';
		}
		return code;
	}
	
	toPS(){
		let {start, curves, close} = this;
		let code = start.join(' ') + ' moveto' 
			+ curves.map((curve)=>(recursiveJoin(curve.relativeCDR(), [' ', ' '])+ ' rcurveto'));
		
		if(close){
			code = `newpath ${code} closepath`;
		}
	}

}

module.exports = CurvePath;