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
 
const Polynomial = require('./Polynomial.js');
const PolynomX = require('./polynom-x.js');
const {Vector2} = require('@grunmouse/math-vector');
const coeff = require('./coeff.js');

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

    var c10x1 = c1x[0];
    var c10x2 = c10x1**2;
    var c10x3 = c10x1**3;
	
    var c10y1 = c1y[0];
    var c10y2 = c10y1**2;
    var c10y3 = c10y1**3;
    
	var c11x1 = c1x[1];
	var c11x2 = c11x1**2;
    var c11x3 = c11x1**3;
    
	var c11y1 = c1y[1];
	var c11y2 = c11y1**2;
    var c11y3 = c11y1**3;
    
	var c12x1 = c1x[2];
	var c12x2 = c12x1**2;
    var c12x3 = c12x1**3;
    
	var c12y1 = c1y[2];
	var c12y2 = c12y1**2;
    var c12y3 = c12y1**3;
    
	var c13x1 = c1x[3];
	var c13x2 = c13x1**2;
    var c13x3 = c13x1**3;
    
	var c13y1 = c1y[3];
	var c13y2 = c13y1**2;
    var c13y3 = c13y1**3;
    
	var c20x1 = c2x[0];
	var c20x2 = c20x1**2;
    var c20x3 = c20x1**3;
    
	var c20y1 = c2y[0];
	var c20y2 = c20y1**2;
    var c20y3 = c20y1**3;
    
	var c21x1 = c2x[1];
	var c21x2 = c21x1**2;
    var c21x3 = c21x1**3;
    
	var c21y1 = c2y[1];
	var c21y2 = c21y1**2;
    
	var c22x1 = c2x[2];
	var c22x2 = c22x1**2;
    var c22x3 = c22x1**3;
    
	var c22y1 = c2y[2];
	var c22y2 = c22y1**2;
    
	var c23x1 = c2x[3];
	var c23x2 = c23x1**2;
	var c23x3 = c23x1**3;
    
	var c23y1 = c2y[3];
	var c23y2 = c23y1**2;
    var c23y3 = c23y1**3;
	
    var poly = new Polynomial(
        -c13x3*c23y3 + c13y3*c23x3 - 3*c13x1*c13y2*c23x2*c23y1 +
            3*c13x2*c13y1*c23x1*c23y2,
        -6*c13x1*c22x1*c13y2*c23x1*c23y1 + 6*c13x2*c13y1*c22y1*c23x1*c23y1 + 3*c22x1*c13y3*c23x2 -
            3*c13x3*c22y1*c23y2 - 3*c13x1*c13y2*c22y1*c23x2 + 3*c13x2*c22x1*c13y1*c23y2,
        -6*c21x1*c13x1*c13y2*c23x1*c23y1 - 6*c13x1*c22x1*c13y2*c22y1*c23x1 + 6*c13x2*c22x1*c13y1*c22y1*c23y1 +
            3*c21x1*c13y3*c23x2 + 3*c22x2*c13y3*c23x1 + 3*c21x1*c13x2*c13y1*c23y2 - 3*c13x1*c21y1*c13y2*c23x2 -
            3*c13x1*c22x2*c13y2*c23y1 + c13x2*c13y1*c23x1*(6*c21y1*c23y1 + 3*c22y2) + c13x3*(-c21y1*c23y2 -
            2*c22y2*c23y1 - c23y1*(2*c21y1*c23y1 + c22y2)),
        c11x1*c12y1*c13x1*c13y1*c23x1*c23y1 - c11y1*c12x1*c13x1*c13y1*c23x1*c23y1 + 6*c21x1*c22x1*c13y3*c23x1 +
            3*c11x1*c12x1*c13x1*c13y1*c23y2 + 6*c10x1*c13x1*c13y2*c23x1*c23y1 - 3*c11x1*c12x1*c13y2*c23x1*c23y1 -
            3*c11y1*c12y1*c13x1*c13y1*c23x2 - 6*c10y1*c13x2*c13y1*c23x1*c23y1 - 6*c20x1*c13x1*c13y2*c23x1*c23y1 +
            3*c11y1*c12y1*c13x2*c23x1*c23y1 - 2*c12x1*c12y2*c13x1*c23x1*c23y1 - 6*c21x1*c13x1*c22x1*c13y2*c23y1 -
            6*c21x1*c13x1*c13y2*c22y1*c23x1 - 6*c13x1*c21y1*c22x1*c13y2*c23x1 + 6*c21x1*c13x2*c13y1*c22y1*c23y1 +
            2*c12x2*c12y1*c13y1*c23x1*c23y1 + c22x3*c13y3 - 3*c10x1*c13y3*c23x2 + 3*c10y1*c13x3*c23y2 +
            3*c20x1*c13y3*c23x2 + c12y3*c13x1*c23x2 - c12x3*c13y1*c23y2 - 3*c10x1*c13x2*c13y1*c23y2 +
            3*c10y1*c13x1*c13y2*c23x2 - 2*c11x1*c12y1*c13x2*c23y2 + c11x1*c12y1*c13y2*c23x2 - c11y1*c12x1*c13x2*c23y2 +
            2*c11y1*c12x1*c13y2*c23x2 + 3*c20x1*c13x2*c13y1*c23y2 - c12x1*c12y2*c13y1*c23x2 -
            3*c20y1*c13x1*c13y2*c23x2 + c12x2*c12y1*c13x1*c23y2 - 3*c13x1*c22x2*c13y2*c22y1 +
            c13x2*c13y1*c23x1*(6*c20y1*c23y1 + 6*c21y1*c22y1) + c13x2*c22x1*c13y1*(6*c21y1*c23y1 + 3*c22y2) +
            c13x3*(-2*c21y1*c22y1*c23y1 - c20y1*c23y2 - c22y1*(2*c21y1*c23y1 + c22y2) - c23y1*(2*c20y1*c23y1 + 2*c21y1*c22y1)),
        6*c11x1*c12x1*c13x1*c13y1*c22y1*c23y1 + c11x1*c12y1*c13x1*c22x1*c13y1*c23y1 + c11x1*c12y1*c13x1*c13y1*c22y1*c23x1 -
            c11y1*c12x1*c13x1*c22x1*c13y1*c23y1 - c11y1*c12x1*c13x1*c13y1*c22y1*c23x1 - 6*c11y1*c12y1*c13x1*c22x1*c13y1*c23x1 -
            6*c10x1*c22x1*c13y3*c23x1 + 6*c20x1*c22x1*c13y3*c23x1 + 6*c10y1*c13x3*c22y1*c23y1 + 2*c12y3*c13x1*c22x1*c23x1 -
            2*c12x3*c13y1*c22y1*c23y1 + 6*c10x1*c13x1*c22x1*c13y2*c23y1 + 6*c10x1*c13x1*c13y2*c22y1*c23x1 +
            6*c10y1*c13x1*c22x1*c13y2*c23x1 - 3*c11x1*c12x1*c22x1*c13y2*c23y1 - 3*c11x1*c12x1*c13y2*c22y1*c23x1 +
            2*c11x1*c12y1*c22x1*c13y2*c23x1 + 4*c11y1*c12x1*c22x1*c13y2*c23x1 - 6*c10x1*c13x2*c13y1*c22y1*c23y1 -
            6*c10y1*c13x2*c22x1*c13y1*c23y1 - 6*c10y1*c13x2*c13y1*c22y1*c23x1 - 4*c11x1*c12y1*c13x2*c22y1*c23y1 -
            6*c20x1*c13x1*c22x1*c13y2*c23y1 - 6*c20x1*c13x1*c13y2*c22y1*c23x1 - 2*c11y1*c12x1*c13x2*c22y1*c23y1 +
            3*c11y1*c12y1*c13x2*c22x1*c23y1 + 3*c11y1*c12y1*c13x2*c22y1*c23x1 - 2*c12x1*c12y2*c13x1*c22x1*c23y1 -
            2*c12x1*c12y2*c13x1*c22y1*c23x1 - 2*c12x1*c12y2*c22x1*c13y1*c23x1 - 6*c20y1*c13x1*c22x1*c13y2*c23x1 -
            6*c21x1*c13x1*c21y1*c13y2*c23x1 - 6*c21x1*c13x1*c22x1*c13y2*c22y1 + 6*c20x1*c13x2*c13y1*c22y1*c23y1 +
            2*c12x2*c12y1*c13x1*c22y1*c23y1 + 2*c12x2*c12y1*c22x1*c13y1*c23y1 + 2*c12x2*c12y1*c13y1*c22y1*c23x1 +
            3*c21x1*c22x2*c13y3 + 3*c21x2*c13y3*c23x1 - 3*c13x1*c21y1*c22x2*c13y2 - 3*c21x2*c13x1*c13y2*c23y1 +
            c13x2*c22x1*c13y1*(6*c20y1*c23y1 + 6*c21y1*c22y1) + c13x2*c13y1*c23x1*(6*c20y1*c22y1 + 3*c21y2) +
            c21x1*c13x2*c13y1*(6*c21y1*c23y1 + 3*c22y2) + c13x3*(-2*c20y1*c22y1*c23y1 - c23y1*(2*c20y1*c22y1 + c21y2) -
            c21y1*(2*c21y1*c23y1 + c22y2) - c22y1*(2*c20y1*c23y1 + 2*c21y1*c22y1)),
        c11x1*c21x1*c12y1*c13x1*c13y1*c23y1 + c11x1*c12y1*c13x1*c21y1*c13y1*c23x1 + c11x1*c12y1*c13x1*c22x1*c13y1*c22y1 -
            c11y1*c12x1*c21x1*c13x1*c13y1*c23y1 - c11y1*c12x1*c13x1*c21y1*c13y1*c23x1 - c11y1*c12x1*c13x1*c22x1*c13y1*c22y1 -
            6*c11y1*c21x1*c12y1*c13x1*c13y1*c23x1 - 6*c10x1*c21x1*c13y3*c23x1 + 6*c20x1*c21x1*c13y3*c23x1 +
            2*c21x1*c12y3*c13x1*c23x1 + 6*c10x1*c21x1*c13x1*c13y2*c23y1 + 6*c10x1*c13x1*c21y1*c13y2*c23x1 +
            6*c10x1*c13x1*c22x1*c13y2*c22y1 + 6*c10y1*c21x1*c13x1*c13y2*c23x1 - 3*c11x1*c12x1*c21x1*c13y2*c23y1 -
            3*c11x1*c12x1*c21y1*c13y2*c23x1 - 3*c11x1*c12x1*c22x1*c13y2*c22y1 + 2*c11x1*c21x1*c12y1*c13y2*c23x1 +
            4*c11y1*c12x1*c21x1*c13y2*c23x1 - 6*c10y1*c21x1*c13x2*c13y1*c23y1 - 6*c10y1*c13x2*c21y1*c13y1*c23x1 -
            6*c10y1*c13x2*c22x1*c13y1*c22y1 - 6*c20x1*c21x1*c13x1*c13y2*c23y1 - 6*c20x1*c13x1*c21y1*c13y2*c23x1 -
            6*c20x1*c13x1*c22x1*c13y2*c22y1 + 3*c11y1*c21x1*c12y1*c13x2*c23y1 - 3*c11y1*c12y1*c13x1*c22x2*c13y1 +
            3*c11y1*c12y1*c13x2*c21y1*c23x1 + 3*c11y1*c12y1*c13x2*c22x1*c22y1 - 2*c12x1*c21x1*c12y2*c13x1*c23y1 -
            2*c12x1*c21x1*c12y2*c13y1*c23x1 - 2*c12x1*c12y2*c13x1*c21y1*c23x1 - 2*c12x1*c12y2*c13x1*c22x1*c22y1 -
            6*c20y1*c21x1*c13x1*c13y2*c23x1 - 6*c21x1*c13x1*c21y1*c22x1*c13y2 + 6*c20y1*c13x2*c21y1*c13y1*c23x1 +
            2*c12x2*c21x1*c12y1*c13y1*c23y1 + 2*c12x2*c12y1*c21y1*c13y1*c23x1 + 2*c12x2*c12y1*c22x1*c13y1*c22y1 -
            3*c10x1*c22x2*c13y3 + 3*c20x1*c22x2*c13y3 + 3*c21x2*c22x1*c13y3 + c12y3*c13x1*c22x2 +
            3*c10y1*c13x1*c22x2*c13y2 + c11x1*c12y1*c22x2*c13y2 + 2*c11y1*c12x1*c22x2*c13y2 -
            c12x1*c12y2*c22x2*c13y1 - 3*c20y1*c13x1*c22x2*c13y2 - 3*c21x2*c13x1*c13y2*c22y1 +
            c12x2*c12y1*c13x1*(2*c21y1*c23y1 + c22y2) + c11x1*c12x1*c13x1*c13y1*(6*c21y1*c23y1 + 3*c22y2) +
            c21x1*c13x2*c13y1*(6*c20y1*c23y1 + 6*c21y1*c22y1) + c12x3*c13y1*(-2*c21y1*c23y1 - c22y2) +
            c10y1*c13x3*(6*c21y1*c23y1 + 3*c22y2) + c11y1*c12x1*c13x2*(-2*c21y1*c23y1 - c22y2) +
            c11x1*c12y1*c13x2*(-4*c21y1*c23y1 - 2*c22y2) + c10x1*c13x2*c13y1*(-6*c21y1*c23y1 - 3*c22y2) +
            c13x2*c22x1*c13y1*(6*c20y1*c22y1 + 3*c21y2) + c20x1*c13x2*c13y1*(6*c21y1*c23y1 + 3*c22y2) +
            c13x3*(-2*c20y1*c21y1*c23y1 - c22y1*(2*c20y1*c22y1 + c21y2) - c20y1*(2*c21y1*c23y1 + c22y2) -
            c21y1*(2*c20y1*c23y1 + 2*c21y1*c22y1)),
        -c10x1*c11x1*c12y1*c13x1*c13y1*c23y1 + c10x1*c11y1*c12x1*c13x1*c13y1*c23y1 + 6*c10x1*c11y1*c12y1*c13x1*c13y1*c23x1 -
            6*c10y1*c11x1*c12x1*c13x1*c13y1*c23y1 - c10y1*c11x1*c12y1*c13x1*c13y1*c23x1 + c10y1*c11y1*c12x1*c13x1*c13y1*c23x1 +
            c11x1*c11y1*c12x1*c12y1*c13x1*c23y1 - c11x1*c11y1*c12x1*c12y1*c13y1*c23x1 + c11x1*c20x1*c12y1*c13x1*c13y1*c23y1 +
            c11x1*c20y1*c12y1*c13x1*c13y1*c23x1 + c11x1*c21x1*c12y1*c13x1*c13y1*c22y1 + c11x1*c12y1*c13x1*c21y1*c22x1*c13y1 -
            c20x1*c11y1*c12x1*c13x1*c13y1*c23y1 - 6*c20x1*c11y1*c12y1*c13x1*c13y1*c23x1 - c11y1*c12x1*c20y1*c13x1*c13y1*c23x1 -
            c11y1*c12x1*c21x1*c13x1*c13y1*c22y1 - c11y1*c12x1*c13x1*c21y1*c22x1*c13y1 - 6*c11y1*c21x1*c12y1*c13x1*c22x1*c13y1 -
            6*c10x1*c20x1*c13y3*c23x1 - 6*c10x1*c21x1*c22x1*c13y3 - 2*c10x1*c12y3*c13x1*c23x1 + 6*c20x1*c21x1*c22x1*c13y3 +
            2*c20x1*c12y3*c13x1*c23x1 + 2*c21x1*c12y3*c13x1*c22x1 + 2*c10y1*c12x3*c13y1*c23y1 - 6*c10x1*c10y1*c13x1*c13y2*c23x1 +
            3*c10x1*c11x1*c12x1*c13y2*c23y1 - 2*c10x1*c11x1*c12y1*c13y2*c23x1 - 4*c10x1*c11y1*c12x1*c13y2*c23x1 +
            3*c10y1*c11x1*c12x1*c13y2*c23x1 + 6*c10x1*c10y1*c13x2*c13y1*c23y1 + 6*c10x1*c20x1*c13x1*c13y2*c23y1 -
            3*c10x1*c11y1*c12y1*c13x2*c23y1 + 2*c10x1*c12x1*c12y2*c13x1*c23y1 + 2*c10x1*c12x1*c12y2*c13y1*c23x1 +
            6*c10x1*c20y1*c13x1*c13y2*c23x1 + 6*c10x1*c21x1*c13x1*c13y2*c22y1 + 6*c10x1*c13x1*c21y1*c22x1*c13y2 +
            4*c10y1*c11x1*c12y1*c13x2*c23y1 + 6*c10y1*c20x1*c13x1*c13y2*c23x1 + 2*c10y1*c11y1*c12x1*c13x2*c23y1 -
            3*c10y1*c11y1*c12y1*c13x2*c23x1 + 2*c10y1*c12x1*c12y2*c13x1*c23x1 + 6*c10y1*c21x1*c13x1*c22x1*c13y2 -
            3*c11x1*c20x1*c12x1*c13y2*c23y1 + 2*c11x1*c20x1*c12y1*c13y2*c23x1 + c11x1*c11y1*c12y2*c13x1*c23x1 -
            3*c11x1*c12x1*c20y1*c13y2*c23x1 - 3*c11x1*c12x1*c21x1*c13y2*c22y1 - 3*c11x1*c12x1*c21y1*c22x1*c13y2 +
            2*c11x1*c21x1*c12y1*c22x1*c13y2 + 4*c20x1*c11y1*c12x1*c13y2*c23x1 + 4*c11y1*c12x1*c21x1*c22x1*c13y2 -
            2*c10x1*c12x2*c12y1*c13y1*c23y1 - 6*c10y1*c20x1*c13x2*c13y1*c23y1 - 6*c10y1*c20y1*c13x2*c13y1*c23x1 -
            6*c10y1*c21x1*c13x2*c13y1*c22y1 - 2*c10y1*c12x2*c12y1*c13x1*c23y1 - 2*c10y1*c12x2*c12y1*c13y1*c23x1 -
            6*c10y1*c13x2*c21y1*c22x1*c13y1 - c11x1*c11y1*c12x2*c13y1*c23y1 - 2*c11x1*c11y2*c13x1*c13y1*c23x1 +
            3*c20x1*c11y1*c12y1*c13x2*c23y1 - 2*c20x1*c12x1*c12y2*c13x1*c23y1 - 2*c20x1*c12x1*c12y2*c13y1*c23x1 -
            6*c20x1*c20y1*c13x1*c13y2*c23x1 - 6*c20x1*c21x1*c13x1*c13y2*c22y1 - 6*c20x1*c13x1*c21y1*c22x1*c13y2 +
            3*c11y1*c20y1*c12y1*c13x2*c23x1 + 3*c11y1*c21x1*c12y1*c13x2*c22y1 + 3*c11y1*c12y1*c13x2*c21y1*c22x1 -
            2*c12x1*c20y1*c12y2*c13x1*c23x1 - 2*c12x1*c21x1*c12y2*c13x1*c22y1 - 2*c12x1*c21x1*c12y2*c22x1*c13y1 -
            2*c12x1*c12y2*c13x1*c21y1*c22x1 - 6*c20y1*c21x1*c13x1*c22x1*c13y2 - c11y2*c12x1*c12y1*c13x1*c23x1 +
            2*c20x1*c12x2*c12y1*c13y1*c23y1 + 6*c20y1*c13x2*c21y1*c22x1*c13y1 + 2*c11x2*c11y1*c13x1*c13y1*c23y1 +
            c11x2*c12x1*c12y1*c13y1*c23y1 + 2*c12x2*c20y1*c12y1*c13y1*c23x1 + 2*c12x2*c21x1*c12y1*c13y1*c22y1 +
            2*c12x2*c12y1*c21y1*c22x1*c13y1 + c21x3*c13y3 + 3*c10x2*c13y3*c23x1 - 3*c10y2*c13x3*c23y1 +
            3*c20x2*c13y3*c23x1 + c11y3*c13x2*c23x1 - c11x3*c13y2*c23y1 - c11x1*c11y2*c13x2*c23y1 +
            c11x2*c11y1*c13y2*c23x1 - 3*c10x2*c13x1*c13y2*c23y1 + 3*c10y2*c13x2*c13y1*c23x1 - c11x2*c12y2*c13x1*c23y1 +
            c11y2*c12x2*c13y1*c23x1 - 3*c21x2*c13x1*c21y1*c13y2 - 3*c20x2*c13x1*c13y2*c23y1 + 3*c20y2*c13x2*c13y1*c23x1 +
            c11x1*c12x1*c13x1*c13y1*(6*c20y1*c23y1 + 6*c21y1*c22y1) + c12x3*c13y1*(-2*c20y1*c23y1 - 2*c21y1*c22y1) +
            c10y1*c13x3*(6*c20y1*c23y1 + 6*c21y1*c22y1) + c11y1*c12x1*c13x2*(-2*c20y1*c23y1 - 2*c21y1*c22y1) +
            c12x2*c12y1*c13x1*(2*c20y1*c23y1 + 2*c21y1*c22y1) + c11x1*c12y1*c13x2*(-4*c20y1*c23y1 - 4*c21y1*c22y1) +
            c10x1*c13x2*c13y1*(-6*c20y1*c23y1 - 6*c21y1*c22y1) + c20x1*c13x2*c13y1*(6*c20y1*c23y1 + 6*c21y1*c22y1) +
            c21x1*c13x2*c13y1*(6*c20y1*c22y1 + 3*c21y2) + c13x3*(-2*c20y1*c21y1*c22y1 - c20y2*c23y1 -
            c21y1*(2*c20y1*c22y1 + c21y2) - c20y1*(2*c20y1*c23y1 + 2*c21y1*c22y1)),
        -c10x1*c11x1*c12y1*c13x1*c13y1*c22y1 + c10x1*c11y1*c12x1*c13x1*c13y1*c22y1 + 6*c10x1*c11y1*c12y1*c13x1*c22x1*c13y1 -
            6*c10y1*c11x1*c12x1*c13x1*c13y1*c22y1 - c10y1*c11x1*c12y1*c13x1*c22x1*c13y1 + c10y1*c11y1*c12x1*c13x1*c22x1*c13y1 +
            c11x1*c11y1*c12x1*c12y1*c13x1*c22y1 - c11x1*c11y1*c12x1*c12y1*c22x1*c13y1 + c11x1*c20x1*c12y1*c13x1*c13y1*c22y1 +
            c11x1*c20y1*c12y1*c13x1*c22x1*c13y1 + c11x1*c21x1*c12y1*c13x1*c21y1*c13y1 - c20x1*c11y1*c12x1*c13x1*c13y1*c22y1 -
            6*c20x1*c11y1*c12y1*c13x1*c22x1*c13y1 - c11y1*c12x1*c20y1*c13x1*c22x1*c13y1 - c11y1*c12x1*c21x1*c13x1*c21y1*c13y1 -
            6*c10x1*c20x1*c22x1*c13y3 - 2*c10x1*c12y3*c13x1*c22x1 + 2*c20x1*c12y3*c13x1*c22x1 + 2*c10y1*c12x3*c13y1*c22y1 -
            6*c10x1*c10y1*c13x1*c22x1*c13y2 + 3*c10x1*c11x1*c12x1*c13y2*c22y1 - 2*c10x1*c11x1*c12y1*c22x1*c13y2 -
            4*c10x1*c11y1*c12x1*c22x1*c13y2 + 3*c10y1*c11x1*c12x1*c22x1*c13y2 + 6*c10x1*c10y1*c13x2*c13y1*c22y1 +
            6*c10x1*c20x1*c13x1*c13y2*c22y1 - 3*c10x1*c11y1*c12y1*c13x2*c22y1 + 2*c10x1*c12x1*c12y2*c13x1*c22y1 +
            2*c10x1*c12x1*c12y2*c22x1*c13y1 + 6*c10x1*c20y1*c13x1*c22x1*c13y2 + 6*c10x1*c21x1*c13x1*c21y1*c13y2 +
            4*c10y1*c11x1*c12y1*c13x2*c22y1 + 6*c10y1*c20x1*c13x1*c22x1*c13y2 + 2*c10y1*c11y1*c12x1*c13x2*c22y1 -
            3*c10y1*c11y1*c12y1*c13x2*c22x1 + 2*c10y1*c12x1*c12y2*c13x1*c22x1 - 3*c11x1*c20x1*c12x1*c13y2*c22y1 +
            2*c11x1*c20x1*c12y1*c22x1*c13y2 + c11x1*c11y1*c12y2*c13x1*c22x1 - 3*c11x1*c12x1*c20y1*c22x1*c13y2 -
            3*c11x1*c12x1*c21x1*c21y1*c13y2 + 4*c20x1*c11y1*c12x1*c22x1*c13y2 - 2*c10x1*c12x2*c12y1*c13y1*c22y1 -
            6*c10y1*c20x1*c13x2*c13y1*c22y1 - 6*c10y1*c20y1*c13x2*c22x1*c13y1 - 6*c10y1*c21x1*c13x2*c21y1*c13y1 -
            2*c10y1*c12x2*c12y1*c13x1*c22y1 - 2*c10y1*c12x2*c12y1*c22x1*c13y1 - c11x1*c11y1*c12x2*c13y1*c22y1 -
            2*c11x1*c11y2*c13x1*c22x1*c13y1 + 3*c20x1*c11y1*c12y1*c13x2*c22y1 - 2*c20x1*c12x1*c12y2*c13x1*c22y1 -
            2*c20x1*c12x1*c12y2*c22x1*c13y1 - 6*c20x1*c20y1*c13x1*c22x1*c13y2 - 6*c20x1*c21x1*c13x1*c21y1*c13y2 +
            3*c11y1*c20y1*c12y1*c13x2*c22x1 + 3*c11y1*c21x1*c12y1*c13x2*c21y1 - 2*c12x1*c20y1*c12y2*c13x1*c22x1 -
            2*c12x1*c21x1*c12y2*c13x1*c21y1 - c11y2*c12x1*c12y1*c13x1*c22x1 + 2*c20x1*c12x2*c12y1*c13y1*c22y1 -
            3*c11y1*c21x2*c12y1*c13x1*c13y1 + 6*c20y1*c21x1*c13x2*c21y1*c13y1 + 2*c11x2*c11y1*c13x1*c13y1*c22y1 +
            c11x2*c12x1*c12y1*c13y1*c22y1 + 2*c12x2*c20y1*c12y1*c22x1*c13y1 + 2*c12x2*c21x1*c12y1*c21y1*c13y1 -
            3*c10x1*c21x2*c13y3 + 3*c20x1*c21x2*c13y3 + 3*c10x2*c22x1*c13y3 - 3*c10y2*c13x3*c22y1 + 3*c20x2*c22x1*c13y3 +
            c21x2*c12y3*c13x1 + c11y3*c13x2*c22x1 - c11x3*c13y2*c22y1 + 3*c10y1*c21x2*c13x1*c13y2 -
            c11x1*c11y2*c13x2*c22y1 + c11x1*c21x2*c12y1*c13y2 + 2*c11y1*c12x1*c21x2*c13y2 + c11x2*c11y1*c22x1*c13y2 -
            c12x1*c21x2*c12y2*c13y1 - 3*c20y1*c21x2*c13x1*c13y2 - 3*c10x2*c13x1*c13y2*c22y1 + 3*c10y2*c13x2*c22x1*c13y1 -
            c11x2*c12y2*c13x1*c22y1 + c11y2*c12x2*c22x1*c13y1 - 3*c20x2*c13x1*c13y2*c22y1 + 3*c20y2*c13x2*c22x1*c13y1 +
            c12x2*c12y1*c13x1*(2*c20y1*c22y1 + c21y2) + c11x1*c12x1*c13x1*c13y1*(6*c20y1*c22y1 + 3*c21y2) +
            c12x3*c13y1*(-2*c20y1*c22y1 - c21y2) + c10y1*c13x3*(6*c20y1*c22y1 + 3*c21y2) +
            c11y1*c12x1*c13x2*(-2*c20y1*c22y1 - c21y2) + c11x1*c12y1*c13x2*(-4*c20y1*c22y1 - 2*c21y2) +
            c10x1*c13x2*c13y1*(-6*c20y1*c22y1 - 3*c21y2) + c20x1*c13x2*c13y1*(6*c20y1*c22y1 + 3*c21y2) +
            c13x3*(-2*c20y1*c21y2 - c20y2*c22y1 - c20y1*(2*c20y1*c22y1 + c21y2)),
        -c10x1*c11x1*c12y1*c13x1*c21y1*c13y1 + c10x1*c11y1*c12x1*c13x1*c21y1*c13y1 + 6*c10x1*c11y1*c21x1*c12y1*c13x1*c13y1 -
            6*c10y1*c11x1*c12x1*c13x1*c21y1*c13y1 - c10y1*c11x1*c21x1*c12y1*c13x1*c13y1 + c10y1*c11y1*c12x1*c21x1*c13x1*c13y1 -
            c11x1*c11y1*c12x1*c21x1*c12y1*c13y1 + c11x1*c11y1*c12x1*c12y1*c13x1*c21y1 + c11x1*c20x1*c12y1*c13x1*c21y1*c13y1 +
            6*c11x1*c12x1*c20y1*c13x1*c21y1*c13y1 + c11x1*c20y1*c21x1*c12y1*c13x1*c13y1 - c20x1*c11y1*c12x1*c13x1*c21y1*c13y1 -
            6*c20x1*c11y1*c21x1*c12y1*c13x1*c13y1 - c11y1*c12x1*c20y1*c21x1*c13x1*c13y1 - 6*c10x1*c20x1*c21x1*c13y3 -
            2*c10x1*c21x1*c12y3*c13x1 + 6*c10y1*c20y1*c13x3*c21y1 + 2*c20x1*c21x1*c12y3*c13x1 + 2*c10y1*c12x3*c21y1*c13y1 -
            2*c12x3*c20y1*c21y1*c13y1 - 6*c10x1*c10y1*c21x1*c13x1*c13y2 + 3*c10x1*c11x1*c12x1*c21y1*c13y2 -
            2*c10x1*c11x1*c21x1*c12y1*c13y2 - 4*c10x1*c11y1*c12x1*c21x1*c13y2 + 3*c10y1*c11x1*c12x1*c21x1*c13y2 +
            6*c10x1*c10y1*c13x2*c21y1*c13y1 + 6*c10x1*c20x1*c13x1*c21y1*c13y2 - 3*c10x1*c11y1*c12y1*c13x2*c21y1 +
            2*c10x1*c12x1*c21x1*c12y2*c13y1 + 2*c10x1*c12x1*c12y2*c13x1*c21y1 + 6*c10x1*c20y1*c21x1*c13x1*c13y2 +
            4*c10y1*c11x1*c12y1*c13x2*c21y1 + 6*c10y1*c20x1*c21x1*c13x1*c13y2 + 2*c10y1*c11y1*c12x1*c13x2*c21y1 -
            3*c10y1*c11y1*c21x1*c12y1*c13x2 + 2*c10y1*c12x1*c21x1*c12y2*c13x1 - 3*c11x1*c20x1*c12x1*c21y1*c13y2 +
            2*c11x1*c20x1*c21x1*c12y1*c13y2 + c11x1*c11y1*c21x1*c12y2*c13x1 - 3*c11x1*c12x1*c20y1*c21x1*c13y2 +
            4*c20x1*c11y1*c12x1*c21x1*c13y2 - 6*c10x1*c20y1*c13x2*c21y1*c13y1 - 2*c10x1*c12x2*c12y1*c21y1*c13y1 -
            6*c10y1*c20x1*c13x2*c21y1*c13y1 - 6*c10y1*c20y1*c21x1*c13x2*c13y1 - 2*c10y1*c12x2*c21x1*c12y1*c13y1 -
            2*c10y1*c12x2*c12y1*c13x1*c21y1 - c11x1*c11y1*c12x2*c21y1*c13y1 - 4*c11x1*c20y1*c12y1*c13x2*c21y1 -
            2*c11x1*c11y2*c21x1*c13x1*c13y1 + 3*c20x1*c11y1*c12y1*c13x2*c21y1 - 2*c20x1*c12x1*c21x1*c12y2*c13y1 -
            2*c20x1*c12x1*c12y2*c13x1*c21y1 - 6*c20x1*c20y1*c21x1*c13x1*c13y2 - 2*c11y1*c12x1*c20y1*c13x2*c21y1 +
            3*c11y1*c20y1*c21x1*c12y1*c13x2 - 2*c12x1*c20y1*c21x1*c12y2*c13x1 - c11y2*c12x1*c21x1*c12y1*c13x1 +
            6*c20x1*c20y1*c13x2*c21y1*c13y1 + 2*c20x1*c12x2*c12y1*c21y1*c13y1 + 2*c11x2*c11y1*c13x1*c21y1*c13y1 +
            c11x2*c12x1*c12y1*c21y1*c13y1 + 2*c12x2*c20y1*c21x1*c12y1*c13y1 + 2*c12x2*c20y1*c12y1*c13x1*c21y1 +
            3*c10x2*c21x1*c13y3 - 3*c10y2*c13x3*c21y1 + 3*c20x2*c21x1*c13y3 + c11y3*c21x1*c13x2 - c11x3*c21y1*c13y2 -
            3*c20y2*c13x3*c21y1 - c11x1*c11y2*c13x2*c21y1 + c11x2*c11y1*c21x1*c13y2 - 3*c10x2*c13x1*c21y1*c13y2 +
            3*c10y2*c21x1*c13x2*c13y1 - c11x2*c12y2*c13x1*c21y1 + c11y2*c12x2*c21x1*c13y1 - 3*c20x2*c13x1*c21y1*c13y2 +
            3*c20y2*c21x1*c13x2*c13y1,
        c10x1*c10y1*c11x1*c12y1*c13x1*c13y1 - c10x1*c10y1*c11y1*c12x1*c13x1*c13y1 + c10x1*c11x1*c11y1*c12x1*c12y1*c13y1 -
            c10y1*c11x1*c11y1*c12x1*c12y1*c13x1 - c10x1*c11x1*c20y1*c12y1*c13x1*c13y1 + 6*c10x1*c20x1*c11y1*c12y1*c13x1*c13y1 +
            c10x1*c11y1*c12x1*c20y1*c13x1*c13y1 - c10y1*c11x1*c20x1*c12y1*c13x1*c13y1 - 6*c10y1*c11x1*c12x1*c20y1*c13x1*c13y1 +
            c10y1*c20x1*c11y1*c12x1*c13x1*c13y1 - c11x1*c20x1*c11y1*c12x1*c12y1*c13y1 + c11x1*c11y1*c12x1*c20y1*c12y1*c13x1 +
            c11x1*c20x1*c20y1*c12y1*c13x1*c13y1 - c20x1*c11y1*c12x1*c20y1*c13x1*c13y1 - 2*c10x1*c20x1*c12y3*c13x1 +
            2*c10y1*c12x3*c20y1*c13y1 - 3*c10x1*c10y1*c11x1*c12x1*c13y2 - 6*c10x1*c10y1*c20x1*c13x1*c13y2 +
            3*c10x1*c10y1*c11y1*c12y1*c13x2 - 2*c10x1*c10y1*c12x1*c12y2*c13x1 - 2*c10x1*c11x1*c20x1*c12y1*c13y2 -
            c10x1*c11x1*c11y1*c12y2*c13x1 + 3*c10x1*c11x1*c12x1*c20y1*c13y2 - 4*c10x1*c20x1*c11y1*c12x1*c13y2 +
            3*c10y1*c11x1*c20x1*c12x1*c13y2 + 6*c10x1*c10y1*c20y1*c13x2*c13y1 + 2*c10x1*c10y1*c12x2*c12y1*c13y1 +
            2*c10x1*c11x1*c11y2*c13x1*c13y1 + 2*c10x1*c20x1*c12x1*c12y2*c13y1 + 6*c10x1*c20x1*c20y1*c13x1*c13y2 -
            3*c10x1*c11y1*c20y1*c12y1*c13x2 + 2*c10x1*c12x1*c20y1*c12y2*c13x1 + c10x1*c11y2*c12x1*c12y1*c13x1 +
            c10y1*c11x1*c11y1*c12x2*c13y1 + 4*c10y1*c11x1*c20y1*c12y1*c13x2 - 3*c10y1*c20x1*c11y1*c12y1*c13x2 +
            2*c10y1*c20x1*c12x1*c12y2*c13x1 + 2*c10y1*c11y1*c12x1*c20y1*c13x2 + c11x1*c20x1*c11y1*c12y2*c13x1 -
            3*c11x1*c20x1*c12x1*c20y1*c13y2 - 2*c10x1*c12x2*c20y1*c12y1*c13y1 - 6*c10y1*c20x1*c20y1*c13x2*c13y1 -
            2*c10y1*c20x1*c12x2*c12y1*c13y1 - 2*c10y1*c11x2*c11y1*c13x1*c13y1 - c10y1*c11x2*c12x1*c12y1*c13y1 -
            2*c10y1*c12x2*c20y1*c12y1*c13x1 - 2*c11x1*c20x1*c11y2*c13x1*c13y1 - c11x1*c11y1*c12x2*c20y1*c13y1 +
            3*c20x1*c11y1*c20y1*c12y1*c13x2 - 2*c20x1*c12x1*c20y1*c12y2*c13x1 - c20x1*c11y2*c12x1*c12y1*c13x1 +
            3*c10y2*c11x1*c12x1*c13x1*c13y1 + 3*c11x1*c12x1*c20y2*c13x1*c13y1 + 2*c20x1*c12x2*c20y1*c12y1*c13y1 -
            3*c10x2*c11y1*c12y1*c13x1*c13y1 + 2*c11x2*c11y1*c20y1*c13x1*c13y1 + c11x2*c12x1*c20y1*c12y1*c13y1 -
            3*c20x2*c11y1*c12y1*c13x1*c13y1 - c10x3*c13y3 + c10y3*c13x3 + c20x3*c13y3 - c20y3*c13x3 -
            3*c10x1*c20x2*c13y3 - c10x1*c11y3*c13x2 + 3*c10x2*c20x1*c13y3 + c10y1*c11x3*c13y2 +
            3*c10y1*c20y2*c13x3 + c20x1*c11y3*c13x2 + c10x2*c12y3*c13x1 - 3*c10y2*c20y1*c13x3 - c10y2*c12x3*c13y1 +
            c20x2*c12y3*c13x1 - c11x3*c20y1*c13y2 - c12x3*c20y2*c13y1 - c10x1*c11x2*c11y1*c13y2 +
            c10y1*c11x1*c11y2*c13x2 - 3*c10x1*c10y2*c13x2*c13y1 - c10x1*c11y2*c12x2*c13y1 + c10y1*c11x2*c12y2*c13x1 -
            c11x1*c11y2*c20y1*c13x2 + 3*c10x2*c10y1*c13x1*c13y2 + c10x2*c11x1*c12y1*c13y2 +
            2*c10x2*c11y1*c12x1*c13y2 - 2*c10y2*c11x1*c12y1*c13x2 - c10y2*c11y1*c12x1*c13x2 + c11x2*c20x1*c11y1*c13y2 -
            3*c10x1*c20y2*c13x2*c13y1 + 3*c10y1*c20x2*c13x1*c13y2 + c11x1*c20x2*c12y1*c13y2 - 2*c11x1*c20y2*c12y1*c13x2 +
            c20x1*c11y2*c12x2*c13y1 - c11y1*c12x1*c20y2*c13x2 - c10x2*c12x1*c12y2*c13y1 - 3*c10x2*c20y1*c13x1*c13y2 +
            3*c10y2*c20x1*c13x2*c13y1 + c10y2*c12x2*c12y1*c13x1 - c11x2*c20y1*c12y2*c13x1 + 2*c20x2*c11y1*c12x1*c13y2 +
            3*c20x1*c20y2*c13x2*c13y1 - c20x2*c12x1*c12y2*c13y1 - 3*c20x2*c20y1*c13x1*c13y2 + c12x2*c20y2*c12y1*c13x1
    );
    var roots = poly.getRootsInInterval(0,1);

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