
const {Matrix} = require('@grunmouse/math-matrix');

const PolynomX = require('./polynom-x.js');
/**
 * A,B - массивы коэффициентов полиномов для x и y первой кривой
 * С,D - массивы коэффициентов полиномов для x и y второй кривой
 */
function resultant3x3(A, B, C, D){
	
	const [A_4, A_3, A_2, A_1] = A;
	const [B_4, B_3, B_2, B_1] = B;
	const [C_4, C_3, C_2, C_1] = C;
	const [D_4, D_3, D_2, D_1] = D;
	
	const A_0 = new PolynomX(A_4 -C_4, -C_3, -C_2, -C_1);
	const B_0 = new PolynomX(B_4 -D_4, -D_3, -D_2, -D_1);
	
	const M_456 =  B_1**3;
	const M_345 =  A_1 * B_1**2;
	const M_234 =  A_1**2 * B_1;
	const M_123 =  A_1**3;
	const M_245 = -B_1*(A_1 * B_2 - A_2 * B_1);
	const M_146 =  B_1*(A_1 * B_2 - A_2 * B_1);
	const M_134 = -A_1*(A_1 * B_2 - A_2 * B_1);
	const M_125 =  A_1*(A_1 * B_2 - A_2 * B_1);
	const M_145 =  A_1*(B_2**2 - B_1 * B_3) - B_1*(A_2 * B_2 - A_3 * B_1);
	const M_124 =  A_1*(A_1 * B_3 - A_2 * B_2) + B_1*(A_2**2 - A_1 * A_3);
	
	const K_30 = -M_456;
	const K_21 = M_345;
	const K_12 = -3 * M_234;
	const K_03 = M_123;
	const K_20 = - 2 * B_3 * M_146 + B_2 * M_145;
	const K_11 = -A_2 * M_145 + 2* A_3 * M_146 +B_2* M_124 +2 * B_3 * M_125;
	const K_02 = - A_2 * M_124 - 2 * A_3 * M_125;
	const K_10 = - B_3 *( A_3 * M_145 + B_3 * M_124 );
	const K_01 = A_3 *( A_3 * M_145 + B_3 * M_124 );
	

	let res = new PolynomX();
	
	res = res.add(A_0.mul(A_0).mul(A_0).mulnew(K_30));
	res = res.add(A_0.mul(A_0).mul(B_0).mulnew(K_21));
	res = res.add(A_0.mul(B_0).mul(B_0).mulnew(K_12));
	res = res.add(B_0.mul(B_0).mul(B_0).mulnew(K_03));
	
	res = res.add(A_0.mul(A_0).mulnew(K_20));
	res = res.add(A_0.mul(B_0).mulnew(K_11));
	res = res.add(B_0.mul(B_0).mulnew(K_02));
	
	res = res.add(A_0.mulnew(K_10));
	res = res.add(B_0.mulnew(K_01));
	
	return res;
}

/**
 *  Случай, когда A и B одновременно не имеют третьей степени
 */
function resultant2x2(A, B, C, D){
	const [A_4, A_3, A_2] = A;
	const [B_4, B_3, B_2] = B;
	const [C_4, C_3, C_2, C_1] = C;
	const [D_4, D_3, D_2, D_1] = D;
	
	const A_0 = new PolynomX(A_4 -C_4, -C_3, -C_2, -C_1);
	const B_0 = new PolynomX(B_4 -D_4, -D_3, -D_2, -D_1);	
	
	let res = new PolynomX();
	
	const K_20 = B_2**2;
	const K_11 = -2*A_2*B_2
	const K_02 = A_2**2;
	const K_10 = (A_2*B_3 - B_2*A_3)*B_3;
	const K_01 = (B_2*A_3 - A_2*B_3)*A_3;
	
	res = res.add(A_0.mul(A_0).mulnew(K_20));
	res = res.add(A_0.mul(B_0).mulnew(K_11));
	res = res.add(B_0.mul(B_0).mulnew(K_02));
	res = res.add(A_0.mulnew(K_10));
	res = res.add(B_0.mulnew(K_01));
	
	return res;
}

function resultant1x1(A, B, C, D){
	const [A_4, A_3] = A;
	const [B_4, B_3] = B;
	const [C_4, C_3, C_2, C_1] = C;
	const [D_4, D_3, D_2, D_1] = D;
	
	const A_0 = new PolynomX(A_4 -C_4, -C_3, -C_2, -C_1);
	const B_0 = new PolynomX(B_4 -D_4, -D_3, -D_2, -D_1);	
	
	let res = new PolynomX();
	//$$K_{1,0} = -B_3;\; K_{0,1} = A_3.$$
	
	const K_10 = -B_3
	const K_01 = A_3;
	
	res = res.add(A_0.mulnew(K_10));
	res = res.add(B_0.mulnew(K_01));
	
	return res;
}

module.exports = {
	resultant3x3,
	resultant2x2,
	resultant1x1
};