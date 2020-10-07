const {
	abs,
	sign,
	min
} = Math;

const cube = require('./cube-equation.js');

class PolynomX{
	/**
	 * @properta a: Array<Number> - коэффициенты, соответствующие степеням полинома
	 */
	 
	 
	constructor(...coeff){
		/**
		 * сбрасываем нули с хвоста
		 */
		for(let i = coeff.length; i-- && !coeff[i];){
			coeff.pop();
		}
		this.a = coeff;
		//console.log(this.a);
	}
	
	/**
	 * Вычисляет значение полинома в точке x,
	 * Использует схему Горнера
	 */
	eval(x){
		let result = 0;
		const a = this.a;
		for(let i = a.length; i--;){
			result *= x;
			result += a[i];
		}
		return result;
	}
	
	/**
	 * Ленивая функция расчёта производной
	 */
	get diff(){
		if(!this.d){
			const a = this.a;
			let k = Array.from(
				{length:a.length-1},
				(_, i)=>(a[i+1]*(i+1))
			);
			this.d = new PolynomX(...k);
		}
		return this.d;
	}
	
	/**
	 * Пренебречь значениями, меньше epsilon и создать новый полином
	 */
	ignoreEpsilon(epsilon){
		return new PolynomX(...this.a.map(a=>(abs(a)<=epsilon ? 0 : a)));
	}
	
	/**
	 * Улучшает корень x до точность epsilon методом Ньютона
	 */
	_Newton(x, epsilon){
		let d = this.eval(x)/this.diff.eval(x);
		while(abs(d)>epsilon){
			x = x-d;
			d = this.eval(x)/this.diff.eval(x);
		}
		return x;
	}
	
	/**
	 * Находит действительные корни многочлена
	 */
	realRoots(epsilon){
		if(this.deg<=3){
			let a = this.a;
			return cube(a[3],a[2],a[1],a[0]);
		}
		else{
			let y = this._initRoots(epsilon);
			let r, q = this, count = this.deg - 3;
			let roots = [];
			let max = min(count, y.length)
			for(let i = 0; i < max; ++i){
				let x = this._Newton(y[i], epsilon);
				
				({r, q} = q.div(new PolynomX(-x,1)));
				
				[r, q] = [r,q].map(a=>a.ignoreEpsilon(epsilon));
				
				if(!r.isZero()){
					max = y.length;
					//throw new Error('Нужно улучшить корень');
				}
				
				roots.push(x);
			}
			
			if(q.deg<=3){
				roots = roots.concat(q.realRoots(epsilon)).sort();
			}
			return roots;
		}
	}

	/**
	 * Определяет количество рациональных корней и выбирает для каждого начальное приближение
	 */
	_initRoots(epsilon){
		let y = this.diff.realRoots(epsilon);
		let f = y.map(y=>this.eval(y));
		
		const r = new Set();
		for(let i=1; i<f.length; ++i){
			if(f[i-1] === 0){
				r.add(y[i-1]);
			}
			else if(f[i] === 0){
				r.add(y[i]);
			}
			else if(sign(f[i-1]) !== sign(f[i])){
				r.add((y[i-1] + y[i])/2);
			}
		}
		
		const step = 10;
		let i =0, x = y[i]-step, l = this.diff.eval(x);
		if(sign(l) !== sign(f[i])){
			r.add(x);
		}
		i = y.length-1, x = y[i]+step, l = this.diff.eval(x);
		if(sign(l) !== sign(f[i])){
			r.add(x);
		}
		
		let result = [...r].sort();
		return result;
	}
	
	
	/**
	 * Степень полинома. 
	 */
	get deg(){
		const len = this.a.length;
		/*
		 * Тождественный ноль обозначается пустым массивом, хотя его степень тоже нулевая, как и у других констант
		 */
		return len ? len-1 : 0;
	}
	
	isZero(){
		return this.a.length === 0;
	}
	isConst(){
		return this.a.length < 2;
	}
	isLine(){
		return this.a.length === 2;
	}
	isQuadrat(){
		return this.a.length === 3;
	}
	isCube(){
		return this.a.length === 4;
	}
	
	/**
	 * Делит многочлен на многочлен
	 * f = q + r/g
	 * @return {q,r}
	 * q : PolynomX - частное
	 * r : PolynomX - остаток деления
	 */
	div(dividend){
		if(dividend.isZero()){
			throw new Error('Divide of zero');
		}
		const f = this.a, g = dividend.a;
		const q = [];
		let r = f;
		while(r.length >= g.length){
			let index = r.length - g.length;
			let n = [];
			let d = r[r.length-1]/g[g.length-1];
			q[index] = d;
			let tail = true;
			//n[g.length-1] = 0; // Не присваиваем, т.к. нам нужно уменьшить длину
			for(let k=g.length-1; k--;){
				let v = r[k+index] - g[k]*d;
				if(!tail || v){
					n[k+index] = v;
					tail = false;
				}
				
			}
			for(let k=index; k--;){
				let v = r[k];
				if(!tail || v){
					n[k] = v;
					tail = false;
				}
			}
			r = n;
		}
		
		return {
			q:new PolynomX(...Array.from(q,a=>(a||0))),
			r:new PolynomX(...r)
		};
	}
	
	mul(multipler){
		const a = this.a, b = multipler.a;
		const q = [];
		for(let i = a.length; i--;)
		for(let j = b.length; j--;)
		{
			let k = i+j;
			let v = (q[k]||0) + a[i]*b[j];
			q[k] = v;
		}
		return new PolynomX(...Array.from(q,a=>(a||0)));
	}
	
	mulnew(...c){
		return this.mul(new PolynomX(...c));
	}
}

//console.log((new PolynomX(-42,0,-12,1)).div(new PolynomX(-3,1)));
//console.log((new PolynomX(3,1,-2,1)).div(new PolynomX(-3,-2)));
//console.log((new PolynomX(1,0,-1,0,2,1)).div(new PolynomX(2,-4)));
//console.log((new PolynomX(0,1,0,-1,0,2,1)).div(new PolynomX(2,-4,0,0,1)));
//console.log((new PolynomX(0,1,0,-1,0,2,1)).div(new PolynomX(0,2,-4,0,0,1)));
//console.log((new PolynomX(1,0,-1,0,2,1)).div(new PolynomX(2,-4,0,0,1)));

//console.log(a.mul(a));
//let a = new PolynomX(0,0,2);

let x = Array.from({length:9}, Math.random).sort(), epsilon = 1e-6;

let p = x.reduce((p, x)=>(p.mulnew(-x,1)), new PolynomX(1));

let r = p.realRoots(epsilon);

console.log(x);
console.log(r.map((r,i)=>(r-x[i])));
module.exports = PolynomX;