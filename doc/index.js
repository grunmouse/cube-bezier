const fs = require('fs');

const prim = [2,3];

function factor(value){
	const res = {};
	if(value<0){
		res[-1]=1;
		value = -value;
	}
	for(let p of prim){
		while(value % p === 0){
			res[p] = (res[p]||0)+1;
			value = value/p;
		}
	}
	return res;
}

function mulcoeff(res){
	let keys = Object.keys(res);
	
	return keys.reduce((akk, key)=>(akk * (+key)**res[key]), 1);
}

function simpMunus(res){
	if("-1" in res){
		let pow = res[-1] & 1;
		if(pow){
			res[-1] = 1;
		}
		else{
			delete res[-1];
		}
	}
	return res;
}

function delZero(mul){
	for(let val in mul){
		if(mul[val]===0){
			delete mul[val];
		}
	}
	return mul;
}

function powMonom(monom, pow){
	let res = {};
	for(let val in monom){
		res[val] = monom[val]*pow;
	}
	simpMunus(res);
	return res;
}

function mulMonom(a, b){
	let res = {};
	
	let keys = new Set([...Object.keys(a), ...Object.keys(b)]);
	for(let key of keys){
		res[key] = (a[key]||0) + (b[key]||0);
	}
	simpMunus(res)
	return res;
}

function mulPoly(...arr){
	if(arr.length === 1){
		return arr[0];
	}
	else if(arr.length > 2){
		let [a, ...b] = arr;
		return mulPoly(a, mulPoly(...b));
	}
	else{
		let [a, b] = arr;
		let result = [];
		for(let x of a){
			for(let y of b){
				result.push(mulMonom(x, y));
			}
		}
		return result;
	}
	throw new Error('Incorrecr args count');
}

function Monom(arr){
	let res = {};
	for(let str of arr){
		let [key, pow] = str.split('^');
		res[key] = Number(pow) || 1;
	}
	return res;
}

function parseMonom(str){
	let m = Monom(str.split('*'));
	simpMunus(m);
	return m;
}


function toStr(monom){
	let keys = Object.keys(monom);
	keys.sort();
	return keys.map((key)=>(key+'^'+monom[key])).join('*');
}

function splitMonom(monom){
	let k = {}, a= {}, x = {};
	
	for(let key in monom){
		if(!isNaN(key)){
			k[key] = monom[key];
		}
		else if("AB".includes(key[0])){
			a[key] = monom[key];
		}
		else if("xy".includes(key[0])){
			x[key] = monom[key];
		}
		else{
			console.log(key);
			throw new Error(key);
		}
	}
	
	return [k, a, x];
}

function getKeyAB(monom){
	return toStr(splitMonom(monom)[1]);
}
function getKeyXY(monom){
	return toStr(splitMonom(monom)[2]);
}

function parseItem(str){
	let coeff = 1;
	if(str[0] === '-'){
		coeff = -1;
		str = str.slice(1);
	}
	let mul = str.split('*');
	while(!isNaN(mul[0])){
		coeff *= Number(mul[0]);
		mul.shift();
	}

	return mulMonom(factor(coeff), Monom(mul));
}

function parsePoly(str){
	if(typeof str !== 'string'){
		if(Array.isArray(str)){
			return str;
		}
		else if(typeof str == 'number'){
			return [factor(str)];
		}
		else if(typeof str === 'object'){
			return [str];
		}
		else{
			throw new Error('incorrect arg type');
		}
	}
	
	str = str.split(/\s+/g).join('');
	str = str.split('-').join('\\-');
	let summands = str.split(/[+\\]/g);
	
	if(summands[0] === ""){
		summands.shift();
	}

	return summands.map(parseItem);
}


function subtrace(part, sub){
	let set = new Set(part.map(a=>toStr(a)));
	
	let key = toStr(sub);
	
	if(set.has(key)){
		set.delete(key);
		
		return [...set].map(parseMonom);
	}
	
	throw new Error('no subtrace ' + key);
}

function subtraceMany(part, subs){
	return subs.reduce(subtrace, part);
}

function subtraceProp(arr, sub){
	let map = new Map(arr.map(m=>{
		let [k, a, x] = splitMonom(m);
		let val = mulcoeff(k);
		let key = toStr(mulMonom(a,x));
		return [key, val];
	}));
	let [k, a, x] = splitMonom(sub);
	let val = mulcoeff(k);
	let key = toStr(mulMonom(a,x));
	
	if(map.has(key)){
		let nv = map.get(key) - val;
		map.set(key, nv);
	}
	
	return [...map.entries()].map(([key, val])=>(mulMonom(factor(val), parseMonom(key))));
}

function subtracePoly(part, subs){
	return subs.subtraceProp(subtrace, part);
}


function isEqualPoly(a, b){
	let d = subtraceMany(a, b);
	
	return d.length === 0;
}

function extractMultipler(monoms){
	let mul = {"-1":1};
	prim.forEach(val=>{mul[val]=Infinity});
	monoms.forEach((k)=>{
		if(!k[-1]){
			mul[-1] = 0;
		}
		prim.forEach(val=>{mul[val] = Math.min(mul[val], k[val]||0)});
	});

	monoms = monoms.map((a)=>{
		let r = {};
		for(let val in a){
			r[val] = a[val] - (mul[val]||0);
		}
		simpMunus(r);
		delZero(r);
		return r;
	});
	
	delZero(mul);
	
	return [mul, monoms];
}

function representMonom(monom){
	let [k, a, x] = splitMonom(monom);
	k = mulcoeff(k);
	[a, x] = [a,x].map(toStr);
	
	k = k<0 ? ''+k : ' '+k;
	
	return k +'\t*' + a + '\t*' + x;
}

function makeCube(a, b){
	a = parseItem(a);
	b = parseItem(b);
	
	let a3 = powMonom(a, 3);
	let b3 = powMonom(b, 3);
	let a2 = powMonom(a, 2);
	let b2 = powMonom(b, 2);
	
	let a2b = mulMonom(a2, b);
	let ab2 = mulMonom(a, b2);

	let ka2b = mulMonom(a2b, {3:1});
	let kab2 = mulMonom(ab2, {3:1});
	
	return [a3, ka2b, kab2, b3];
}

function makeSquare(a, b){
	a = parseItem(a);
	b = parseItem(b);
	
	let a2 = powMonom(a, 2);
	let b2 = powMonom(b, 2);
	let kab = mulMonom(mulMonom(a, b), {2:1});
	
	return [a2, kab, b2];
}

function cubePoly(arr){
	if(arr.length === 1){
		return [powMonom(arr[0], 3)];
	}
	else if(arr.length === 2){
		let [a, b] = arr;
		let a3 = powMonom(a, 3);
		let b3 = powMonom(b, 3);
		let a2 = powMonom(a, 2);
		let b2 = powMonom(b, 2);

		let a2b = mulMonom(a2, b);
		let ab2 = mulMonom(a, b2);

		let ka2b = mulMonom(a2b, {3:1});
		let kab2 = mulMonom(ab2, {3:1});

		return [a3, ka2b, kab2, b3];
	}	
	else if(arr.length > 2){
		let [a, ...b] = arr;
		let a3 = powMonom(a, 3);
		let b3 = cubePoly(b);
		let a2 = powMonom(a, 2);
		let b2 = squarePoly(b, 2);

		let a2b = mulPoly([a2], b);
		let ab2 = mulPoly([a], b2);

		let ka2b = mulPoly(a2b, [{3:1}]);
		let kab2 = mulPoly(ab2, [{3:1}]);

		return [a3].concat(ka2b, kab2, b3);
	}
}

function squarePoly(arr){
	if(arr.length === 1){
		return [powMonom(arr[0], 3)];
	}
	else if(arr.length === 2){
		let [a, b] = arr;
		let a2 = powMonom(a, 2);
		let b2 = powMonom(b, 2);
		let kab = mulMonom(mulMonom(a, b), {2:1});
		
		return [a2, kab, b2];
	}
	else if(arr.length > 2){
		let [a, ...b] = arr;
		let a2 = powMonom(a, 2);
		let b2 = squarePoly(b);
		let kab = mulPoly(mulPoly([a], b), [{2:1}]);
		
		return [a2].concat(kab, b2);
	}
}

function showPoly(pp){
	console.log(pp.map(representMonom).join('\n'));
}

function controlDiff(a, b){
	let p = subtraceMany(a, b);

	let [k, pp] = extractMultipler(p);
	console.log(k);
	showPoly(pp)
}

function parse(arr){
}

function M(...arr){
	arr = arr.map(parsePoly);
	return mulPoly(...arr);
}

function S(...arr){
	arr = arr.map(parsePoly);
	return [].concat(...arr);
}


let code = fs.readFileSync('./x-y.txt', {encoding:'utf-8'});

code = code.split(/\s+/g).join('');

let summands = code.split(/[+\\]/g);

while(summands[0] === ""){
	summands.shift();
}
while(summands[summands.length-1] === ""){
	summands.pop();
}



summands = summands.map(parseItem);

const parts = new Map();

summands.forEach((s)=>{
	let x = getKeyXY(s);
	if(!parts.has(x)){
		parts.set(x, []);
	}
	parts.get(x).push(s);
});


const A_03 = parsePoly("A_0 - A_3");
const A_21 = parsePoly("A_2 - A_1");
const B_30 = parsePoly("B_3 - B_0");
const B_12 = parsePoly("B_1 - B_2");

const A_21_3 = mulPoly(A_21,[{3:1}]);
const B_12_3 = mulPoly(B_12,[{3:1}]);

const binA = A_03.concat(A_21_3);
const binB = B_30.concat(B_12_3);


/* y^3 *((A_0 - A_3) + 3*(A_2 - A_1))^3 */
let y3 = mulPoly(parsePoly("y^3"), cubePoly(binA)); 

console.log(isEqualPoly(parts.get('y^3'), y3));

let xy2 = mulPoly(squarePoly(binA), binB, parsePoly("3"), parsePoly("x*y^2"));

console.log(isEqualPoly(parts.get('x^1*y^2'), xy2));

let x2y = mulPoly(squarePoly(binB), binA, parsePoly("3"), parsePoly("x^2*y"))

console.log(isEqualPoly(parts.get('x^2*y^1'), x2y));

let x3 = mulPoly(parsePoly("x^3"), cubePoly(binB)); 

console.log(isEqualPoly(parts.get('x^3'), x3));

let p = parts.get('x^2');

let q = S(
	M("A_0", S(
		"- B_3^3",
		M("6*B_2 + 3*B_1 - B_0", "B_3^2"),
		M(S(
			"- 18*B_2^2",
			M("9*B_1 + 3*B_0", "B_2"),
			"- 9*B_1^2 - 3*B_0*B_1 - B_0^2"
		), "B_3"),
		"18*B_2^3",
		M("- 27*B_1 - 18*B_0", "B_2^2"),
	 	M("27*B_1^2 + 9*B_0*B_1", "B_2"),
		"- 9*B_1^3"
	)),
	M("A_1", S(
		M("3*B_2 - 18*B_1 + 18*B_0", "B_3^2"),
		M(S(
			M("27*B_1 - 3*B_0","B_2"),
			"18*B_1^2 - 9*B_0*B_1 + 9*B_0^2"
		),"B_3"),
		M("54*B_0 - 27*B_1", "B_2^2"),
		M("- 27*B_0*B_1 - 6*B_0^2", "B_2"),
		"9*B_0*B_1^2"
	)),
	M("A_2", S(
		M("6*B_1 - 9*B_0","B_3^2"),
		M(S(
			"- 9*B_2^2",
			M("27*B_1 + 9*B_0", "B_2"),
			"- 54*B_1^2 + 3*B_0*B_1 - 18*B_0^2"
		), "B_3"),
		"- 18*B_0*B_2^2",
		M("27*B_1^2 - 27*B_0*B_1 + 18*B_0^2", "B_2"),
		"- 3*B_0^2*B_1"
	)),
	M("A_3", S(
		"B_0*B_3^2",
		M(S(
			M("3*B_0 - 9*B_1", "B_2"),
			"18*B_1^2 - 3*B_0*B_1 + B_0^2"
		), "B_3"),
		"9*B_2^3",
		M("9*B_0 - 27*B_1", "B_2^2"),
		M("27*B_1^2 - 9*B_0*B_1 - 3*B_0^2", "B_2"),
		"- 18*B_1^3 + 18*B_0*B_1^2 - 6*B_0^2*B_1 + B_0^3"
	))
);

let x2 = M(q, "3*x^2");

//showPoly(x2);

controlDiff(p, x2);
