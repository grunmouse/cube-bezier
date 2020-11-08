
/**
 * Возвращает функцию, представляющую уравнение кривой от x, y
 * @param cx - коэффициенты полинома x(t)
 * @param cy - коэффициенты полинома y(t)
 */
function curveEquation(cx, cy){
	const a_0 = cx[0];
	const a_1 = cx[1]/3;
	const a_2 = cx[2]/3;
	const a_3 = cx[3];
	const b_0 = cy[0];
	const b_1 = cy[1]/3;
	const b_2 = cy[2]/3;
	const b_3 = cy[3];

	const E =-a_0*b_3**3+(3*a_1*b_2+6*a_2*b_1+a_3*b_0)*b_3**2+(-9*a_2*b_2**2-9*a_3*b_1*b_2)*b_3+9*a_3*b_2**3;
	
	const F = ((2*a_0*a_3-9*a_1*a_2)*b_3**2+((3*a_1*a_3+18*a_2**2)*b_2-3*a_2*a_3*b_1-2*a_3**2*b_0)*b_3-18*a_2*a_3*b_2**2+9*a_3**2*b_1*b_2)/2;
	
	const G = (-a_0*a_3**2+9*a_1*a_2*a_3-9*a_2**3)*b_3+(9*a_2**2*a_3-6*a_1*a_3**2)*b_2-3*a_2*a_3**2*b_1+a_3**3*b_0;
	
	const H = a_0**2*b_3**3+(-6*a_0*a_1*b_2+(9*a_1**2-12*a_0*a_2)*b_1+(9*a_1*a_2-2*a_0*a_3)*b_0)*b_3**2+(18*a_0*a_2*b_2**2+((18*a_0*a_3-27*a_1*a_2)*b_1+(-3*a_1*a_3-18*a_2**2)*b_0)*b_2+(27*a_2**2-18*a_1*a_3)*b_1**2+3*a_2*a_3*b_0*b_1+a_3**2*b_0**2)*b_3-18*a_0*a_3*b_2**3+(27*a_1*a_3*b_1+18*a_2*a_3*b_0)*b_2**2+(-27*a_2*a_3*b_1**2-9*a_3**2*b_0*b_1)*b_2+9*a_3**2*b_1**3;
	
	const K = (-(a_0**2*a_3) + 9*a_0*a_1*a_2 - 9*a_1**3)*b_3**2 
		+ ((-3*a_0*a_1*a_3-18*a_0*a_2**2+27*a_1**2*a_2)*b_2+((3*a_0*a_2+18*a_1**2)*a_3-27*a_1*a_2**2)*b_1+(2*a_0*a_3**2-18*a_1*a_2*a_3+18*a_2**3)*b_0)*b_3 
		+ (18*a_0*a_2-27*a_1**2)*a_3*b_2**2 + 
		((27*a_1*a_2*a_3-9*a_0*a_3**2)*b_1+(12*a_1*a_3**2-18*a_2**2*a_3)*b_0)*b_2 
		- 9*a_1*a_3**2*b_1**2 + 6*a_2*a_3**2*b_0*b_1 - a_3**3*b_0**2;
	
	const L = -(a_0**3)*b_3**3+9*a_0**2*a_1*b_2*b_3**2+18*a_0**2*a_2*b_1*b_3**2-27*a_0*a_1**2*b_1*b_3**2+3*a_0**2*a_3*b_0*b_3**2-27*a_0*a_1*a_2*b_0*b_3**2+27*a_1**3*b_0*b_3**2-27*a_0**2*a_2*b_2**2*b_3-27*a_0**2*a_3*b_1*b_2*b_3+81*a_0*a_1*a_2*b_1*b_2*b_3+9*a_0*a_1*a_3*b_0*b_2*b_3+54*a_0*a_2**2*b_0*b_2*b_3-81*a_1**2*a_2*b_0*b_2*b_3+54*a_0*a_1*a_3*b_1**2*b_3-81*a_0*a_2**2*b_1**2*b_3-9*a_0*a_2*a_3*b_0*b_1*b_3-54*a_1**2*a_3*b_0*b_1*b_3+81*a_1*a_2**2*b_0*b_1*b_3-3*a_0*a_3**2*b_0**2*b_3+27*a_1*a_2*a_3*b_0**2*b_3-27*a_2**3*b_0**2*b_3+27*a_0**2*a_3*b_2**3-81*a_0*a_1*a_3*b_1*b_2**2-54*a_0*a_2*a_3*b_0*b_2**2+81*a_1**2*a_3*b_0*b_2**2+81*a_0*a_2*a_3*b_1**2*b_2+27*a_0*a_3**2*b_0*b_1*b_2-81*a_1*a_2*a_3*b_0*b_1*b_2-18*a_1*a_3**2*b_0**2*b_2+27*a_2**2*a_3*b_0**2*b_2-27*a_0*a_3**2*b_1**3+27*a_1*a_3**2*b_0*b_1**2-9*a_2*a_3**2*b_0**2*b_1+a_3**3*b_0**3;
	
	const e = 3*E;
	const f = 6*F;
	const g = 3*G;
	const h = 3*H;
	const k = 3*K;
	const l = L;
	
	const a = a_3;
	const b = b_3;
	
	return function(x, y){
		return (b*x - a*y)**3 + l + x*(h + x*e + y*f) + y*(k + y*g);
	};
};

module.exports = curveEquation;