const  {
	delta,
	odelta,
	proj
} = require('./base.js');

/**
 * Рассчитывает единичное смещение точек ломаной, эквидистатной заданной
 */
function onedistance(B){
	const dotB = delta(B);
	const e = dotB.map((v)=>(v.ort().rotOrto(1));
	const r = [];
	const n = B.length-1;
	r[0] = e[0];
	r[n] = e[n-1];
	
	for(let i=1; i<n; ++i){
		r[i] = e[i-1].add(e[i]).div(
			1 + e[i-1].dot(e[i])
		);
	}
	return r;
}

/**
 * Возвращает две ломаные, эквидистантные заданной, и располагающиеся от неё сразных сторон
 */
function boldstroke(B, s){
	const r = onedistance(B);
	let R = [], L = [];
	
	for(let i=0; i<B.length; ++i){
		R[i] = r[i].mul(-s).add(B[i]);
		L[i] = r[i].mul(s).add(B[i]);
	}
	
	return {L, R};
}

/**
 * Находит точку пересечения прямых AB и CD
 */
function intersectLine(A, B, C, D){
	const V = B.sub(A), W = D.sub(C); //Направляющие вектора прямых
	/*
	R_00 = A; R_01 = B; r_0 = V;
	R_10 = C; R_11 = D; r_1 = W;
	
	R = \frac{r_0 (R_11 \times R_10) - r_1 (R_01  \times R_00)}{r_1 \times r_0}
	
	\times - псевдоскалярное произведение
	Опущен - знак умножения на число
	
	R = \frac{V (D \times C) - W (B  \times A)}{W \times V}
	*/
	
	let N = W.cross(V); //Знаменатель выражения
	
	//Проверка нуля
	let ctrl = N.div(W.dot(V));
	if(ctrl < Number.EPSILON){
		return undefined;
	}
	
	const R = V.mul(D.cross(C)).sub(W.mul(B.cross(A))).div(N);
	
	return R;
}

/**
 * Проверяет, попадает ли точка R в прямоугольную область между вершинами AB
 * Если подставить коллинеарные вектора - это будет проверка на R \in AB
 */
function isIn(R, A, B){
	let AR = R.sub(A), AB = B.sub(A);
	
	for(let i=0; i<R.lenght; ++i){
		if(Math.abs(AB[i])<Number.EPSILON){
			if(Math.abs(AR[i])>Number.EPSILON){
				return false
			}
		}
		else{
			let x = AR[i]/AB[i];
			if(x<0 || x>1){
				return false;
			}
		}
	}
	return true;
}

/**
 * Находит точку пересечения отрезков AB и CD
 */
function intersectLinePart(A, B, C, D){
	const R = intersectLine(A, B, C, D);
	if(R && isIn(R, A, B) && isIn(R, C, D)){
		return R;
	}
}

/**
 * Находит прямоугольную область, вмещающую кривую
 * @return Array[2]<Vector> - верхняя левая и нижняя правая точки
 */
function rectangleArea(B){
	const Ctor = B[0].constructor;
	const limits = Array.from(B[0], (_, i)=>{
		let x = proj(B, i);
		let max = Math.max(...x);
		let min = Math.min(...x);
		return [min, max];
	});
	
	let result = [0,1].map((i)=>(Ctor(...proj(limits, i))));
	
	return result;
}

/**
 * Проверяет, пересекаются ли прямоугольные области, заданные угловыми точками
 */
function isIntersectRectagle(A, B, C, D){
	//Чтобы прямоугольные области пересекались, нужно чтобы пересекались их проекции на каждую ось
	return A.every((_, i)=>{
		//проекции пересекаются, если одна из крайних точек одного отрезка находится внутри на другого отрезка
		return isIn(A[i], C[i], D[i]) || isIn(B[i], C[i], D[i]);
	});
}

/**
 * Возвращает положительное значение, если поворот от a к b - против часовой стрелки, и 
 * отрицательное, в противоположном случае, ноль, если их разность кратна 2pi
 */
function angleSub(a, b){
	let d = b - a; //Разность узлов, как она есть
	//Надо получить разность от -PI до PI
	while(d>Math.PI){
		d -= 2*Math.PI;
	}
	while(d<-Math.PI){
		d += 2*Math.PI;
	}
	return d;
}

function isInTriangle(R, A, B, C){
	const ABC = [A, B, C];
	const abc = odelta(ABC);
	let s = ABC.map((A, i)=>(
		abc[i].cross(R.sub(A))
	));
	
	return s.every((a)=>(a>0)) || s.every((a)=>(a<0));
}

/**
 * Находит выпуклую оболочку четырёхугольника
 */
function convex(A, B, C, D){
	let S = [A, B, C, D];
	for(let i=0; i<4; ++i){
		let [A, B, C, R] = S;
		if(isInTriangle(R, A, B, C)){
			S.pop();
			return S;
		}
		S.unshift(S.pop());
	}
	//Это не треугольник, найдём порядок вершин
	if(intersectLinePart(A, B, C, D)){
		//AB и CD пересекаются, мы нашли диагонали
		return [A, C, B, D];
	}
	else{
		//AB и CD - несмежные стороны
		if(intersectLinePart(A, C, B, D)){
			//AC и BD пересекаются, мы нашли диагонали
			return [A, B, C, D];
		}
		else{
			//AC и BD - тоже несмежные стороны, мы нашли четыре стороны
			return [A, B, D, C];
		}
	}
}

function pairs(arr){
	let len = arr.length-1;
	let res = [];
	for(let i=0;i<len; ++i){
		res.push([arr[i],arr[i+1]]);
	}
	return res;
}
function *opairs(arr){
	let len = arr.length-1;
	let res = [];
	for(let i=0;i<len; ++i){
		res.push([arr[i],arr[i+1]]);
	}
	res.push([arr[len],arr[0]]);
	return res;
}

 
/**
 * Проверяет выпуклые оболочки на пересечение
 */
function intersectConvex(M, N){
	let cross = [];
	const m = opairs(M), n = opairs(N);
	let sn = [], sm = [];
	m.forEach(([A,B], i)=>{
		sm[i]=[];
		let AB = B.sub(A);
		n.forEach(([C,D],j)=>{
			sn[j] = sn[j] || [];
			let R = intersectLinePart(A,B,C,D);
			if(R){
				cross.push(R);
			}
			let CD = D.sub(C);
			let AC = C.sub(A);
			sn[j][i] = AB.cross(AC); //Положение точки C относительно ребра AB
			sm[i][j] = CD.cross(AC); //Положение точки A относительно ребра CD
		});
	});
	
	//Попадание точек N в оболочку M
	const Ns = new Set();
	const Ms = new Set();
	sn.forEach((s, i)=>{
		if(s.every((a)=>(a>=0)) || s.every((a)=>(a<=0))){
			Ns.add(N[i]);
		}
	});
	//Попадание точек M в оболочку N
	sm.forEach((s, i)=>{
		if(s.every((a)=>(a>=0)) || s.every((a)=>(a<=0))){
			Ms.add(M[i]);
		}
	});
	
	return {
		cross,
		Ns, Ms
	};
}