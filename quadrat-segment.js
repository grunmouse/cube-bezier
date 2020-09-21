const Node = require('./node-of-curve.js');
const Segment = require('./segment.js');

/**
 * Соединяет три точки квадратичным сегментом
 */
class QuadratSegment extends Segment{
	constructor(A, M, B){
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
		
		super(nodeA, nodeB);
	}

}

module.exports = QuadratSegment;