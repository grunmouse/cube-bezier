
class Carret{
	constructor(start){
		this.setSegment(start)
	}
	
	setSegment(segment, BA){
		this.segment = start;
		this.BA = BA;
		let [nodeA, nodeB] = this.segment;
		if(BA){
			[nodeA, nodeB] = [nodeB, nodeA];
		}
		this.toA = nodeA.sibling;
		this.toB = nodeB.sibling;
	}
	
	rev(){
		let [toA, toB] = this;
		this.toA = toB;
		this.toB = toA;
	}

	_goto(node){
		if(node){
			let state = node.traceState();
			let [_, _, BA, segment] = state;
			this.setSegment(segment, BA);
			return state;
		}
	}
	
	goA(){
		return this._goto(this.toA);
	}
	goB(){
		return this._goto(this.toB);
	}
	
	findEnds(){
		let start = this.segment, current = this.toA, begin, end;
		while(current){
			let state = current.traceState();
			begin = state[1];
			current = begin.sibling;
			if(start === state[3]){
			}
		}
	}
}