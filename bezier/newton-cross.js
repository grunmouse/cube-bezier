const {
	dot,
	point
} = require('./base.js')

const abs = Math.abs;
/*

РАСХОДИТСЯ!!! НУЖНО ИСПРАВИТЬ!

*/

/**
 * Улучшает точку пересечения кривых методом Ньютона, решая уравнение
 * f(t) - g(s) = 0
 * @param f : Array<Vector2> - опорные точки кривой f
 * @param g : Array<Vector2> - опорные точки кривой g
 * @param t : Number - приближение аргумента на кривой f
 * @param s : Number - приближение аргумента на кривой g
 * @param epsilon : Number - требуемое расстояние между точками
 */
function doNewtonCross(f, g, t, s, epsilon){
	const dotF = dot(f), dotG = dot(g); // Опорные точки производных
	let C;
	while(true){
		let pf = point(f, t);
		let pg = point(g, s);
		let D = pf.sub(pg);
		//console.log(D.abs());
		if(D.abs()>C){
			//console.log('stop');
			break;
		}
		C = D.abs();
		if(C<=epsilon){
			//console.log('ok');
			break;
		}
		let pdotF = point(dotF, t);
		let pdotG = point(dotG, s);
		
		let det = pdotG.cross(pdotF);
		
		let dt = pg.rotOrto(1).dot(D)/det;
		let ds = pf.rotOrto(1).dot(D)/det;
		
		t += dt;
		s += ds;
	};
	
	return [t,s];
}

module.exports = doNewtonCross;