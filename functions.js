const {
	matrixIntersectRectangles,
	rectangleArea
} = require('./bezier/rectangle-area.js');

const {
	convex,
	isIntersectConvex
} = require('./bezier/convex.js');

const {
	intersectCurves,
	intersectCurveSelf,
	asSubcurve
} = require('./bezier/intersection.js');


const Segment = require('./segment.js');
const SegmentPoint = require('./segment-point.js');
const {SetableMatrix} = require('@grunmouse/math-matrix');

const {
	split
} = require('./bezier/split-join.js');

function crossing(seg1, seg2){
	console.log(seg1.points, seg2.points);
	let cross = intersectCurves(seg1.points, seg2.points);
	console.log(cross);
	let ps1 = [], ps2 = [];
	for(let [t, s] of cross){
		console.log(t,s);
		p1 = new SegmentPoint(seg1, t);
		p2 = new SegmentPoint(seg2, s);
		p1.connect(p2);
		ps1.push(p1);
		ps2.push(p2);
		console.log(p1, p2);
	}
	
	return [ps1, ps2];
}

function selfCross(seg){
	let inter = intersectCurveSelf(seg.points);
	if(inter){
		let [t, s] = inter;
		p1 = new SegmentPoint(seg, t);
		p2 = new SegmentPoint(seg, s);
		p1.connect(p2);
		
		return [p1, p2];
	}
}

/**
 * Обрабатывает массив сегментов, добавляет в них точки их пересечения
 */
function allCrossing(S){
	const len = S.length;
	const areas = S.map((seg)=>(rectangleArea(seg.points)));
	const mat = matrixIntersectRectangles(areas);
	const conv = [];
	
	console.log(mat);
	
	const points = [];
	
	for(let i=0; i<len; ++i){
		let sp = selfCross(S[i]);
		sp && points.push(...sp);
	}
	
	for(let i=0; i<len; ++i){
		for(let j=i+1; j<len; ++j){
			if(mat.value(i, j)){
				let a = conv[i] || (conv[i] = convex(S[i].points));
				let b = conv[j] || (conv[j] = convex(S[j].points));

				if(isIntersectConvex(a, b)){
					let [pi, pj] = crossing(S[i], S[j]);
					points.push(...pi);
					points.push(...pj);
				}
			}
		}
	}
	
	console.log(points);
	
	points.forEach(p=>p.addToSegment());
	
	S.forEach(seg=>seg.filterPoints());
	
	return S;
}

/**
 * Собирает начала изолированных путей, которым принадлежат сегменты переданного множества
 */
function groupPath(S){
	S = new Set(S);
	let starts = [];
	while(S.size){
		let item = S.values().next();

		let start = item.value.nodeA;
		let fin;
		
		for(let state of start.itrStateOnce()){
			let [nodeA, nodeB, BA, segment] = state;
			fin = nodeB;
			S.delete(segment);
		}
		//Если путь оказался не замкнутым, итерируемся в другую сторону, чтобы найти его начало
		if(fin.sibling !== start){
			for(state of start.sibling.itrStateOnce()){
				let [nodeA, nodeB, BA, segment] = state;
				S.delete(segment);
				fin = nodeB;
			}
			//Конец обратного поиска - это начало пути
			start = fin;
		}
		
		starts.push(start);
	}
	
	return starts;
}

/**
 * Разделяет сегменты так, чтобы осталось не более одного пересечения на каждом
 */
function splitBetweenCrossing(S){
	S = new Set(S);
	let news = [];
	for(let seg of S){
		if(seg.crossing.length>1){
			let crossing = seg.crossing;
			let tt = [];
			for(let i=1; i<crossing.length; ++i){
				let a = crossing[i-1].t, b = seg.crossing[i].t;
				let t = (a+b)/2;
				tt.push(t);
			}
			let segments = seg.splits(tt);
			news.push(...segments);
			S.delete(seg);
		}
	}
	
	news.forEach((seg)=>{
		S.add(seg);
		seg.inheritPoints();
	});
	news.forEach((seg)=>{
		seg.filterPoints();
	});
	
	return S;
}


module.exports = {
	rectangleArea,
	crossing,
	allCrossing,
	groupPath,
	splitBetweenCrossing
};