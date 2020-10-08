/*****
*
*   Intersection.js
*
*   copyright 2002-2003, Kevin Lindsey
*
*****/

/**
 * Доработка напильником
 * rakov, 2020
 */

const PolynomX = require('./polynom-x.js');
const {Vector2} = require('@grunmouse/math-vector');
const coeff = require('./coeff.js');
const {resultant3x3} = require('./resultant.js');

/*****
*
*   constructor
*
*****/
function Intersection(status) {
	this.setStatus(!!status)
    this.points = new Array();
}


/*****
*
*   init
*
*****/
Intersection.prototype.setStatus = function(status) {
	this.isIntersection = !!status;
	this.status = !!status ? "Intersection" : "No Intersection";
};


/*****
*
*   intersectBezier3Bezier3
*
*****/
Intersection.intersectBezier3Bezier3 = function(a1, a2, a3, a4, b1, b2, b3, b4) {
    var result = new Intersection();
	const a = [a1, a2, a3, a4];
	const b = [b1, b2, b3, b4];

    // Calculate the coefficients of cubic polynomial
	let c1x = coeff(a.map(a=>(a.x)));
	let c1y = coeff(a.map(a=>(a.y)));
	let c2x = coeff(b.map(a=>(a.x)));
	let c2y = coeff(b.map(a=>(a.y)));
	
	const detS = resultant3x3(c1x, c1y, c2x, c2y); //Полином

	let roots = detS.realRoots(1e-9).filter((a)=>(a>=0 && a<=1));
	
	//console.log(roots, meroots);
	
	let p2x = new PolynomX(...c2x);
	let p2y = new PolynomX(...c2y);
	let p1x = new PolynomX(...c1x);
	let p1y = new PolynomX(...c1y);

	/*
	Корни - это точки на кривой b
	 */
    for ( var i = 0; i < roots.length; i++ ) {
        var s = roots[i];
		let p = new Vector2(
			p2x.eval(s),
			p2y.eval(s)
		);
        var xRoots = p1x.addnew(-p2x.eval(s)).realRoots(1e-8);
        var yRoots = p1y.addnew(-p2y.eval(s)).realRoots(1e-8);

        if ( xRoots.length > 0 && yRoots.length > 0 ) {
            let TOLERANCE = 1e-4;

            checkRoots:
            for ( var j = 0; j < xRoots.length; j++ ) {
                var xRoot = xRoots[j];
                
                if ( 0 <= xRoot && xRoot <= 1 ) {
                    for ( var k = 0; k < yRoots.length; k++ ) {
                        if ( Math.abs( xRoot - yRoots[k] ) < TOLERANCE ) {
							let t = (xRoot + yRoots[k])/2;
                            result.points.push(
                                [s, p, t]
                            );
                            break checkRoots;
                        }
                    }
                }
            }
        }
    }

    if ( result.points.length > 0 ) result.setStatus(true);

    return result;
};

module.exports = Intersection;