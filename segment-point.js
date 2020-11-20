const {SetableMatrix} = require('@grunmouse/math-matrix');


/**
 * Сравнивает две SegmentPoint
 */
function isEqualPoints(a, b, tollerance){
	/* 
		Точки считаются равными, если они принадлежат одному сегменту, имеют примерно равные параметры
		и парные им точки одновременно не существуют или тоже равны по этим признакам
	*/
	
	const propEqual = (a, b)=>(a==b || a.segment === b.segment && Math.abs(a.t - b.t) < tollerance);
	
	return propEqual(a, b) && propEqual(a.intersect, b.intersect);
}

/**
 * @param tt : Array<Number> - возрастающий массив параметров
 */
function matrixEqualParam(tt, tollerance){
	let mat = new SetableMatrix(tt.length);
	
	let j = 0, i = 1;
	while(i < tt.length){
		if(tt[i] - tt[j] < tollerance){
			mat.setValue(i, j, 1);
			mat.setValue(j, i, 1);
			++i;
		}
		else{
			if(j < i){
				++j;
			}
			if(j === i){
				++i;
			}
		}
	}
	
	return mat.toMatrix();
}

/**
 * Фильтрует массив точек от дублей
 */
function filterPoints(P, tollerance){
	P.sort((a, b)=>(a.t-b.t));
	
	let tt = P.map(a=>(a.t));
	
	let mat = matrixEqualParam(tt, tollerance);
	
	for(let [i, j, s] of mat.itrItems()){
		if(i<j && s){
			if(isEqualPoints(P[i], P[j])){
				mat.setValue(i, j, 1);
				mat.setValue(j, i, 1);
			}
		}
	}
	
	const ex = [];
	for(let i = 0; i<P.length; ++i){
		let row = mat.getRow(i);
		let ii = row.map((s, j)=>(s ? j : -1)).filter(j=>(j>i));
		if(ii.lenght === 1){
			ex.push(...ii);
		}
		else if(ii.lenght>1){
			//Может, ещё какая логика нужна...
			ex.push(...ii);
		}
	}
	
	return P.filter((_, i)=>(!ex.includes(i)));
}

const PARAM_TOLLERANCE = 1/1024;


class SegmentPoint{
	static filterArray(P){
		return filterPoints(P, PARAM_TOLLERANCE);
	}
	
	constructor(segment, t){
		this.segment = segment;
		this.collisions = [];
		this.t = t;
	}
	
	connect(p){
		this.intersect = p;
		p.intersect = this;
	}
	
	setOUStatus(type){
		this.status = type;
		this.intersect.status = -type;
	}
	
	eq(p){
		if(p === this){
			return true;
		}
		
		return isEqualPoints(this, p, PARAM_TOLLERANCE);
	}
	
	/**
	 * Создаёт новую точку и заменяет ей текущую
	 */
	self_replace(segment, t){
		let point = new SegmentPoint(segment, t);
		if(this.intersect){
			point.connect(point);
			this.excluded = true;
		}
		return point;
	}
	
	addToSegment(){
		this.segment.crossing.push(this);
	}
	
	point(){
		return this.segment.points.getPoint(this.t);
	}
}

module.exports = SegmentPoint;