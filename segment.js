const Curve = require('./curve.js');
const Node = require('./node-of-curve.js');
const SegmentPoint = require('./segment-point.js');
const {POINT_TOLERANCE} = require('./constants.js');
const abs = Math.abs;
const {
	propAbsolute,
	propRelative,
	propFilter
} = require('./bezier/proportional.js');

/**
 * Представляет кубическую кривую Безье, заданную двумя узлами с оттяжками,
 * может интерпретироваться в любом порядке
 */

/**
 * @class Segment - 
 * @property nodeA : NodeOfCurve - начальная точка с оттяжкой
 * @property nodeB : NodeOfCurve - конечная точка с оттяжкой
 * @property crossing : Array<SegmentPoint> - отмеченные точки на кривой (возможно - точки пересечения с другими)
 * @property master : (undefined|{segment:<Segment>, a:<Number>, b:Number}) - ссылка на исходный сегмент, частью которого является данный
 * @property excluded : Boolean - признак, что сегмент не участвует в цепочке, на которую ссылаются его узлы
 * @property actual : ? - ссылка на актуальную замену
 */
class Segment{
	constructor(nodeA, nodeB){
		Object.defineProperties(this,{
			nodeA:{
				configurable:true,
				enumerable:true,
				writable:false,
				value:nodeA
			},
			nodeB:{
				configurable:true,
				enumerable:true,
				writable:false,
				value:nodeB
			}
		});
		//this.nodeA = nodeA;
		//this.nodeB = nodeB;
		
		this.crossing = [];
		
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
	
	eq(b){
		return this === b || this.points.eq(b.points);
	}
	
	approxEqual(t, s){
		return t === s || abs(t-s)<=this.points.epsilon();
	}
	/**
	 *
	 */
	self_replace(struct){
		this.nodeA.self_replace(struct.nodeA);
		this.nodeB.self_replace(struct.nodeB);

		this.excluded = true;
		return struct;
	}
	
	/**
	 * Находит начало и конец
	 */
	get actual(){
		return {
			nodeA:this.nodeA.actual,
			nodeB:this.nodeB.actual
		};
	}
	
	/**
	 * Разбивает сегмент на два сцепленных сегмента
	 */
	split(t){
		let [p, q] = this.points.split(t);
		
		let A = Segment.makeCubic(...p);
		let B = Segment.makeCubic(...q);
		A.nodeB.connect(B.nodeA);
		
		let master = this.master || {segment:this, a:0, b:1};
		let absT = propAbsolute(master.a, master.b)(t);
	
		A.master = {segment:master.segment, a:master.a, b:absT};
		B.master = {segment:master.segment, a:absT, b:master.b};		
		
		this.self_replace({nodeA:A.nodeA, nodeB:B.nodeB});
		
		return [A, B];
	}
	
	splits(tt){
		let pp = this.points.splits(tt);
		let master = this.master || {segment:this, a:0, b:1};
		let toAbs = propAbsolute(master.a, master.b);
		let limits = [0, ...tt, 1].map(toAbs);
		
		let struct = Segment.reconstruction(pp, false, 
			(segment, i)=>{
				segment.master = {segment:master.segment, a:limits[i], b:limits[i+1]};
			}
		);
		
		this.self_replace(struct);
		
		return struct.segments;
	}
	
	/**
	 * Явная команда унаследовать точки от мастера
	 */
	inheritPoints(master){
		let {a, b, segment} = master || this.master;
		let filter = propFilter(a,b), toRel = propRelative(a, b);
		
		let points = segment.crossing.filter(p=>filter(p.t)).map((p)=>(p.self_replace(this, toRel(p.t))));
		
		this.crossing.push(...points);
	}
	
	/**
	 * Команда очистить список пересечений от повторов
	 */
	filterPoints(){
		this.crossing = SegmentPoint.filterArray(this.crossing);
		
		let prev = this.nodeA.sibling && this.nodeA.sibling.segment;
		let next = this.nodeB.sibling && this.nodeB.sibling.segment;
		
		if(this.crossing.length>0){
			//Удаление из списка узла B
			this.crossing.sort((a,b)=>(b.t-a.t));
			let p = this.crossing[0];
			while(p.t>1023/1024 && p.segment === next){
				this.crossing.shift();
				p = this.crossing[0];
			}			
			
			//Удаление из списка узла A
			this.crossing.sort((a,b)=>(a.t-b.t));
			p = this.crossing[0];
			while(p.t<1/1024 && p.segment === prev){
				this.crossing.shift();
				p = this.crossing[0];
			}			
		}
	}

	
	isLine(){
		let {nodeA, nodeB} = this;
		//Сегмент линеен, если все три части ломаной коллинеарны
		return nodeA.V.cross(nodeB.V) === 0 && nodeA.A.sub(nodeB.A).cross(nodeA.V) === 0;
	}
	
	toLongAdd(s){
		let len = this.nodeA.A.sub(this.nodeB.A).abs();
		
		this.toLong(len+s);
	}
	
	toLong(s){
		if(this.isLine()){
			let {nodeA, nodeB} = this;
			let free, stat;
			if(!nodeB.sibling){
				free = nodeB;
				stat = nodeA;
			}
			else if(!nodeA.sibling){
				free = nodeA;
				stat = nodeB;
			}
			else{
				throw new Error('Segment is full connected');
			}
			
			let calc = stat.mirror(s);
			
			free.A = calc.A;
			free.B = calc.B;
		}
		else{
			throw new Error('Segment is not linear');
		}
	}
	

	
	/**
	 * Метод с побочным эффектом!
	 * Меняет порядок обхода сегмента, не меняя его формы
	 */
	reverse(){
		const {nodeA, nodeB} = this;
		Object.defineProperties(this,{
			nodeA:{
				configurable:true,
				enumerable:true,
				writable:false,
				value:nodeB
			},
			nodeB:{
				configurable:true,
				enumerable:true,
				writable:false,
				value:nodeA
			}
		});

		this.crossing.forEach((point)=>{
			point.t = 1 - point.t;
		});
		this.crossing.sort((a,b)=>(a.t - b.t));

		
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
	 * @return [Node, Node, Boolean, Segment] 
	 * - узел начала обхода, 
	 * - узел конца обхода,
	 * - признак обратного направления обхода (начало - это nodeB)
	 * - ссылка на сегмент
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
Segment.reconstruction = function(curves, close, callback){
	const first = Segment.makeCubic(...curves[0]);
	const segments = [];
	const len = curves.length;
	let prev = first;
	callback && callback(prev, 0);
	segments.push(prev);
	for(let i=1; i<len; ++i){
		let current = Segment.makeCubic(...curves[i]);
		prev.nodeB.connect(current.nodeA);
		prev = current;
		callback && callback(prev, i);
		segments.push(prev);
	}
	const last = prev;
	if(close){
		prev.nodeB.connect(first.nodeA);
	}
	return {nodeA:first.nodeA, nodeB:last.nodeB, segments};	
}

module.exports = Segment;