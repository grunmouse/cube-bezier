
class SegmentPoint{
	constructor(segment, t){
		this.segment = segment;
		this.t = t;
	}
	
	eq(p){
		return this === p || this.segment.eq(p.segment) && this.segment.approxEqual(this.t, p.t);
	}
	
	connect(p){
		this.intersect = p;
		p.intersect = this;
	}
	
	point(){
		return this.segment.points.getPoint(this.t);
	}
}

module.exports = SegmentPoint;