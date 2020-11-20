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
			N = this.A.add(this.productV(N));
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
	
	/**
	 * Исключает текущий полуузел и привязывает к его сиблингу переданный узел
	 * Используется для исправлений в цепочке сегментов
	 */
	self_replace(node){
		this.sibling.connect(node);
		//this.sibling = undefined; //Сиблинг продолжает ссылаться туда же
		this.excluded = true;
		this._actual = node;
	}
	
	get actual(){
		let start = this;
		while(start._actual){
			start = start._actual;
		}
		return start;
	}
	
	get isEnd(){
		return !!this.segment && (!this.sibling || this.sibling.sibling !== this)
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
	 * [Node, Node, Boolean, Segment]
	 * [nodeA, nodeB, BA, segment]
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
		//let start
		for(let state of this.itrState()){
			yield state;
			if(state[1].sibling === this){
				break;
			}
		}
	}
	
	/**
	 * Ориентирует сегменты по направлению обхода
	 */
	orderSegments(){
		let end;
		for(let state of this.itrStateOnce()){
			let [nodeA, nodeB, BA, segment] = state;
			
			if(BA){
				segment.reverse();
			}
			end = segment.nodeB;
		}
		return [this, end, end.sibling === this];
	}
	
	/**
	 * Проставить статус проход/переход
	 * @param code : String - код порядка проходов-перехододов данной кривой в её пересечениях
	 */
	setOUStatus(code){
		let i=0, sign = Number(code[0]+'1');
		for(let state of this.itrStateOnce()){
			let [nodeA, nodeB, BA, segment] = state;
			let crossing = segment.crossing[0];
			segment.level = sign;
			if(crossing){
				if(i>=code.length){
					throw new Error('Слишком короткая инструкция');
				}
				sign = Number(code[i]+'1')
				crossing.setOUStatus(sign);
				++i;
			}
		}
	}
	
	/**
	 * Собирает группы смежных кривых одного уровня
	 */
	*itrPathesByLevel(){
		let start = this;
		while(start){
			let lastLevel = start.segment.level;
			let curves = start.getCurves((finNode)=>(finNode.sibling && finNode.sibling.segment.level !== lastLevel));
			let fin = curves.end;
			curves.level = lastLevel
			yield curves;
			start = fin.sibling;
		}
	}
	
	*itrNodePoints(){
		yield this.A;
		for(let [_, B] of this.itrStateOnce()){
			yield B.A;
		}
	}

	*itrAllPoints(){
		yield this.A;
		for(let [nodeA, nodeB, BA, segment] of this.itrStateOnce()){
			yield* segment.points.slice(1);
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
		for(let [cur, fin, BA, segment] of this.itrStateOnce()){

			result.end = fin;
			result.curves.push(segment.curve(BA));
			if(stop && stop(fin)){
				break;
			}
		}
		result.close = (result.end.sibling === this);
		return result;
	}

	makePath(start, stop){
		let {start:startNode, curves, close} = this.getCurves(stop);
		return new CurvePath(start || startNode.A, curves, close);
	}
	
}

module.exports = NodeOfCurve;