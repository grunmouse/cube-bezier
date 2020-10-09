
class SegmentPoint{
	constructor(segment, t){
		this.segment = segment;
		this.t = t;
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