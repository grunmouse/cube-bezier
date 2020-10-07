/**
 * Находит рациональные корни уравнения x^4+ax^3+bx^2+cx+d=0;
 */
function quartic_ferrari(a, b, c, d){
	const p = b - 3*a**2/8;
	const q = ((a/2)**2 - b)*a/2+c;
	const r = ((-3*(a/4)**2 + b)*a/4 - c)*a/4 + d;
	
	//y^4+py^2+qy+r = 0; x=y-a/4;
	
	//2s^3 - ps^2 - 2rs + rp - q^2/4 =0 // Кубическая резольвента
	
	/*
	 [r*p - q**2/4, -2*r, -p, 2] //Коэффициенты при степенях s
	 [(r*p - q**2/4)2, -r, -p/2, 1] //Коэффициенты при степенях s
	 */
	
	let s = cube_viet(-p/2, -r, (r*p - q**2/4)/2);
	
	if(s.length){
		s = s[0];
		
		/*
			y^2 + y* sqrt(2s-p) - q/2/sqrt(2s-p) + s =0;
			y^2 - y* sqrt(2s-p) + q/2/sqrt(2s-p) + s =0;
		*/
		
		let sq = sqrt(2*s-p);
		if(!isNaN(sq)){
			/*
				y^2 + y* sq - q/2/sq + s =0;
				y^2 - y* sq + q/2/sq + s =0;
				[-q/2/sq + s, sq, 1]
				[q/2/sq + s, -sq, 1]
			*/
			let y1 = square(1, sq, -q/2/sq + s);
			let y2 = square(1, -sq, q/2/sq + s);
			
			return y1.concat[y2].sort();
		}
	}
	return [];
}
