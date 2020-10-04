const Curve = require('./curve.js');
const Node = require('./node-of-curve.js');

/**
 * Представляет кубическую кривую Безье, заданную двумя узлами с оттяжками,
 * может интерпретироваться в любом порядке
 */

class Segment{
	constructor(nodeA, nodeB){
		this.nodeA = nodeA;
		this.nodeB = nodeB;
		
		nodeA.segment = this;
		nodeB.segment = this;
	}
	
	get points(){
		const {nodeA, nodeB} = this;
		return new Curve(nodeA.A, nodeA.B, nodeB.B, nodeB.A);
	}
	
	clone(){
		return new Segment(this.nodeA.clone(), this.nodeB.clone());
	}
	
	/**
	 * Метод с побочным эффектом!
	 * Меняет порядок обхода сегмента, не меняя его формы
	 */
	reverse(){
		const {nodeA, nodeB} = this;
		this.nodeA = nodeB;
		this.nodeB = nodeA;
		
		return this;
	}
	
	curve(BA){
		let points = this.points;
		if(BA){
			points.reverse();
		}
		return points;
	}
	
	/**
	 * Возвращает аргументы, описывающие условия обхода сегмента, начиная с переданного узла
	 */ 
	traceState(node){
		const {nodeA, nodeB} = this;
		if(node === nodeA){
			return [nodeA, nodeB, false, this];
		}
		else if(node === nodeB){
			return [nodeB, nodeA, true, this];
		}
		else{
			return [node, undefined, undefined, node.segment];
		}
	}
	
	trace(node, state){
		let [_, fin, BA, segment] = this.traceState(node);
		if(fin){
			state.curves.push(this.curve(BA));
			//console.log(state.curves.length);
		}
		else{
			throw new Error('Node is not a curves end');
		}
		
		let stop = !state.stop || state.stop(fin);
		
		if(fin.sibling && stop){
			return fin.sibling.trace(state);
		}
		else{
			state.end = fin;
			return state;
		}
	}
}

Segment.makeLine = function(A, B){
	let nodeA;
	if(A instanceof Node){
		if(A.segment){
			nodeA = A.makeSibling(B);
		}
		else{
			nodeA = A;
		}
	}
	else{
		nodeA = new Node(A, B);
	}
	
	let nodeB = nodeA.mirror(nodeA.B);
	
	return new Segment(nodeA, nodeB);
};

Segment.makeQuadratic = function(A, M, B){
	let nodeA;
	if(A instanceof Node){
		if(A.segment){
			let s;
			if(typeof M === 'number'){
				s = M;
			}
			else{
				B = M;
			}
			nodeA = A.makeSibling(M);
		}
		else{
			nodeA = A;
			B = M;
		}
		M = nodeA.V.mul(1.5).add(nodeA.A);
	}
	else{
		nodeA = new Node(A, M, 2/3);
	}
	
	let nodeB = new Node(B, M, 2/3);
	
	return new Segment(nodeA, nodeB);
};

Segment.makeCubic = function(A, M, N, B){
	let nodeA, nodeB;
	if(A instanceof Node){
		if(typeof M === 'number'){
		}
		else{
			B = N;
			N = M;
			M = undefined;
		}
		if(A.segment){
			nodeA = A.makeSibling(M);
		}
		else{
			nodeA = A;
		}
	}
	else{
		nodeA = new Node(A, M);
	}
	if(N instanceof Node){
		if(N.segment){
			nodeB = N.makeSibling(B);
		}
		else{
			nodeB = N;
		}
	}
	else{
		nodeB = new Node(B, N);
	}
	
	return new Segment(nodeA, nodeB);
}

/**
 * Создаёт последовательность сцепленных сегментов
 */
Segment.reconstruction = function(curves, close){
	const first = Segment.makeCubic(...curves[0]);
	const len = curves.length;
	let prev = first;
	for(let i=1; i<len; ++i){
		let current = Segment.makeCubic(...curves[i]);
		prev.nodeB.connect(current.nodeA);
		prev = current;
	}
	const last = prev;
	if(close){
		prev.nodeB.connect(first.nodeA);
	}
	return {nodeA:first.nodeA, nodeB:last.nodeB};	
}

module.exports = Segment;