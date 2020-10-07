const CurvePath = require('./curve-path.js');


class NodeOfCurve{
	constructor(A, B, multipler){
		this.A = A;
		if(multipler && multipler !== 1){
			let V = B.sub(A);
			this.B = V.mul(multipler).add(A);
		}
		else{
			this.B = B;
		}
	}
	/**
	 * Направляющий вектор касательной к узлу
	 */
	get V(){
		let {A, B} = this;
		return B.sub(A);
	}
	
	/**
	 * Создать копию узла
	 */
	clone(){
		let {A, B} = this;
		return new NodeOfCurve(A, B);
	}
	
	/**
	 * Построить вектор, сонаправленный с V, длиной s.
	 * Если s===0 - вернуть V
	 */
	productV(s){
		let d, V = this.V;
		if(s){
			d = V.ort().mul(s);
		}
		else{
			d = V;
		}
		return d;
	}
	
	/**
	 * Создать для узла симметричный сиблинг
	 */
	makeSibling(s){
		let {A, V} = this;
		let B = A.sub(this.productV(s));
		let node = new NodeOfCurve(A, B);
		this.connect(node);
		return node;
	}
	
	/**
	 * Создать новый узел, оттянутый в противоположную сторону и находящийся в точке N
	 * Если N - число, то оно задаёт точку на оси AB
	 */
	mirror(N, s){
		if(typeof N === 'number'){
			N = A.add(this.productV(N));
		}
		let B = N.sub(this.productV(s));
		return new NodeOfCurve(N, B);
	}
	
	/**
	 * Делает два узла сиблингами друг друга
	 */
	connect(node){
		this.sibling = node;
		node.sibling = this;
	}
	
	get isEnd(){
		return !!this.segment && !this.sibling
	}

	/**
	 * 
	 * [curNode, alterNode, BA, segment]
	 */	
	traceState(){
		return this.segment ? this.segment.traceState(this) : [this];
	}
	
	/**
	 * Итерируется по цепочке сегментов, возвращая состояния обхода
	 */
	*itrState(){
		let end;
		let current = this;
		while(current){
			let state = current.traceState();
			let [_, fin] = state;
			if(fin){
				current = fin.sibling;
				yield state;
			}
		}
	}
	
	/**
	 * Итерируется по цепочке сегментов, исключая повторный проход по кольцу
	 */
	*itrStateOnce(){
		for(let state of this.itrState()){
			if(state[0] === this){
				break;
			}
			yield state;
		}
	}
	
	/**
	 * Находит последний узел цепочки
	 * Если цепочка замкнута, то последний узел является сиблингом текущего
	 */
	findEnd(){
		let end;
		for(let [_, fin] of this.itrStateOnce()){
			end = fin;
		}
		return end;
	}
	
	getCurves(stop){
		const result = {start:this, curves:[]};
		for(let [cur, fin, BA, segment] of this.itrState()){
			if(cur === this){
				result.close = true;
				break;
			}
			result.end = fin;
			result.curve.push(segment.curve(BA));
			if(stop && stop(fin)){
				break;
			}
		}
		return result;
	}
	
	trace(state){
		if(!state){
			state = {start:this, curves:[]};
		}
		else if(typeof state === 'function'){
			state = {start:this, curves:[], stop:state};
		}
		else if(state.start === this){
			state.close = true;
			return state;
		}
		
		if(this.segment){
			return this.segment.trace(this, state);
		}
		return state;
	}

	makePath(start, stop){
		let {startNode, curves, close} = this.trace(stop);
		return new CurvePath(start || startNode.A, curves, close);
	}
	
}

module.exports = NodeOfCurve;