# Возведение комплексного числа в целую степень

$$z = x + iy;$$
$$i^2 = -1;\; i^3 = -i;\; i^4 = 1$$
$$i^{-2} = -1;\; i^{-1} = -i;\; i^{-3} = i$$

$$i^{2j_1+j_0} = i^{2j_1}i^{j_0} = (-1)^{j_1}i^{j_0}$$
$$i^{2j_1+j_0+1} = i^{2j_1+2}i^{j_0+1-2} = (-1)^{j_1+1}i^{-1(1-j_0)} = (-1)^{j_1+1}(-i)^{1-j_0}$$

$$(x + iy)^n = \sum_{k=0}^n \binom{n}{k} x^{n-k} y^k i^k.$$
$$(x + iy)^n = x^n + \sum_{k=1}^n \binom{n}{k} x^{n-k} y^k i^k.$$


## Разложение

### 2
$$(x + iy)^{2} 
= \binom{2}{0} x^2 + \binom{2}{1} x y i + \binom{2}{2} y^2 i^2
= \binom{2}{0} x^2 + \binom{2}{1} x y i - \binom{2}{2} y^2;$$

$$Re = \binom{2}{0} x^2 - \binom{2}{2} y^2,$$
$$Im = \binom{2}{1} x y i.$$

### 3
$$(x + iy)^3 
= 
\binom{3}{0} x^3 
+\binom{3}{1} x^2 y i
+\binom{3}{2} x y^2 i^2
+\binom{3}{3} y^3 i^3
= 
\binom{3}{0} x^3 
+\binom{3}{1} x^2 y i
-\binom{3}{2} x y^2
-\binom{3}{3} y^3 i
.$$

$$Re = \binom{3}{0} x^3 - \binom{3}{2} x y^2,$$
$$Im = \binom{3}{1} x^2 y i - \binom{3}{3} y^3 i.$$


### 3, 7, 11, ...
$$(x + iy)^{4n+3} 
=
\sum_{k=0}^{4n+3} \binom{4n+3}{k} x^{4n+3-k} y^k i^k =
\sum_{j=0}^{3} 
\sum_{k=0}^n 
\binom{4n+3}{4k+j} x^{4n+3-4k-j} y^{4k+j} i^{4k+j}
;$$

$$(x + iy)^{4n+3} 
=
\sum_{j=0}^{3} 
\sum_{k=0}^n 
\binom{4n+3}{4k+j} x^{4n+3-4k-j} y^{4k+j} i^{4k}i^{j}
=
\sum_{j=0}^{3} 
i^{j}
\sum_{k=0}^n 
\binom{4n+3}{4k+j} x^{4n+3-4k-j} y^{4k+j}
;$$

$$(x + iy)^{4n+3} 
=
\sum_{j_0=0}^1 
\sum_{j_1=0}^1
i^{2j_1+j_0}
\sum_{k=0}^n 
\binom{4n+3}{4k+2j_1+j_0} x^{4n+3-4k-2j_1+j_0} y^{4k+2j_1+j_0}
;$$

$$(x + iy)^{4n+3} 
=
\sum_{j_0=0}^1 
i^{j_0}
\sum_{j_1=0}^1
(-1)^{j_1}
\sum_{k=0}^n 
\binom{4n+3}{4k+2j_1+j_0} x^{4n+3-4k-2j_1+j_0} y^{4k+2j_1+j_0}
.$$

$$Re = \sum_{j_1=0}^1
(-1)^{j_1}
\sum_{k=0}^n 
\binom{4n+3}{4k+2j_1} x^{4n+3-4k-2j_1} y^{4k+2j_1},$$

$$Im = \sum_{j_1=0}^1
(-1)^{j_1}
\sum_{k=0}^n 
\binom{4n+3}{4k+2j_1+1} x^{4n+3-4k-2j_1+1} y^{4k+2j_1+1}.$$


### 4, 8, 12, ...

$$(x + iy)^{4n} 
=
\sum_{k=0}^{4n} \binom{4n}{k} x^{4n-k} y^k i^k =
\binom{4n}{0} x^{4n} +
\sum_{j=0}^{3} 
\sum_{k=1}^n 
\binom{4n}{4k+j-3} x^{4n-(4k+j-3)} y^{4k+j-3} i^{4k+j-3}
;$$

$$(x + iy)^{4n} 
=
\binom{4n}{0} x^{4n} +
\sum_{j=0}^{3} 
i^{j+1}
\sum_{k=1}^n 
\binom{4n}{4k+j-3} x^{4n-(4k+j-3)} y^{4k+j-3} 
;$$

$$(x + iy)^{4n} 
=
\binom{4n}{0} x^{4n} +
\sum_{j_0=0}^1 
(-i)^{1-j_0}
\sum_{j_1=0}^1
(-1)^{j_1+1}
\sum_{k=1}^n 
\binom{4n}{4k+2j_1+j_0-3} x^{4n-(4k+2j_1+j_0-3)} y^{4k+2j_1+j_0-3} 
;$$

$$Re = \binom{4n}{0} x^{4n} +
\sum_{j_1=0}^1
(-1)^{j_1+1}
\sum_{k=1}^n 
\binom{4n}{4k+2j_1+1-3} x^{4n-(4k+2j_1+1-3)} y^{4k+2j_1+1-3};
$$

$$Im = -i \sum_{j_1=0}^1
(-1)^{j_1+1}
\sum_{k=1}^n 
\binom{4n}{4k+2j_1+j_0-3} x^{4n-(4k+2j_1+j_0-3)} y^{4k+2j_1+j_0-3}.
$$

### 5, 9, 13, ...

$$(x + iy)^{4n+1} 
=
\sum_{k=0}^{4n+1} \binom{4n+1}{k} x^{4n-k} y^k i^k
= \binom{4n+1}{0} x^{4n} + \binom{4n+1}{1} x^{4n-1} y i +
\sum_{j=0}^{3} 
\sum_{k=1}^n 
\binom{4n+1}{(4k+j-2)} x^{4n-(4k+j-2)} y^{(4k+j-2)} i^{(4k+j-2)}
;$$

$$(x + iy)^{4n+1} 
= \binom{4n+1}{0} x^{4n} + \binom{4n+1}{1} x^{4n-1} y i +
\sum_{j=0}^{3} 
i^{j}i^{-2}
\sum_{k=1}^n 
\binom{4n+1}{(4k+j-2)} x^{4n-(4k+j-2)} y^{(4k+j-2)} 
;$$

$$(x + iy)^{4n+1} 
= \binom{4n+1}{0} x^{4n} + \binom{4n+1}{1} x^{4n-1} y i -
\sum_{j=0}^{3} 
i^{j}
\sum_{k=1}^n 
\binom{4n+1}{(4k+j-2)} x^{4n-(4k+j-2)} y^{(4k+j-2)} 
;$$

$$(x + iy)^{4n+1} 
= \binom{4n+1}{0} x^{4n} + \binom{4n+1}{1} x^{4n-1} y i -
\sum_{j_0=0}^1 
\sum_{j_1=0}^1
i^{2j_1+j_0}
\sum_{k=1}^n 
\binom{4n+1}{(4k+2j_1+j_0-2)} x^{4n-(4k+2j_1+j_0-2)} y^{(4k+2j_1+j_0-2)} 
;$$

$$(x + iy)^{4n+1} 
= \binom{4n+1}{0} x^{4n} + \binom{4n+1}{1} x^{4n-1} y i -
\sum_{j_0=0}^1 
i^{j_0}
\sum_{j_1=0}^1
(-1)^{j_1}
\sum_{k=1}^n 
\binom{4n+1}{(4k+2j_1+j_0-2)} x^{4n-(4k+2j_1+j_0-2)} y^{(4k+2j_1+j_0-2)} 
;$$

$$Re = \binom{4n+1}{0} x^{4n} -
\sum_{j_1=0}^1
(-1)^{j_1}
\sum_{k=1}^n 
\binom{4n+1}{(4k+2j_1-2)} x^{4n-(4k+2j_1-2)} y^{(4k+2j_1-2)} 
,$$

$$Im = \binom{4n+1}{1} x^{4n-1} y i -
\sum_{j_1=0}^1
(-1)^{j_1}
\sum_{k=1}^n 
\binom{4n+1}{(4k+2j_1+1-2)} x^{4n-(4k+2j_1+1-2)} y^{(4k+2j_1+1-2)} 
.$$

### 6, 10, 14, ...
$$(x + iy)^{4n+2} 
=
\sum_{k=0}^{4n+2} \binom{4n+2}{k} x^{4n-k} y^k i^k
= \binom{4n+2}{0} x^{4n} + \binom{4n+2}{1} x^{4n-1} y i - \binom{4n+2}{2} x^{4n-2} y^2
+
\sum_{j=0}^{3} 
\sum_{k=1}^n 
\binom{4n+2}{(4k+j-1)} x^{4n-(4k+j-1)} y^{4k+j-1} i^{4k+j-1}
;$$

$$(x + iy)^{4n+2} 
= \binom{4n+2}{0} x^{4n} + \binom{4n+2}{1} x^{4n-1} y i - \binom{4n+2}{2} x^{4n-2} y^2
-
\sum_{j=0}^{3} 
i^{j+1}
\sum_{k=1}^n 
\binom{4n+2}{(4k+j-1)} x^{4n-(4k+j-1)} y^{4k+j-1} 
;$$

$$(x + iy)^{4n+2} 
= \binom{4n+2}{0} x^{4n} + \binom{4n+2}{1} x^{4n-1} y i - \binom{4n+2}{2} x^{4n-2} y^2
-
\sum_{j_0=0}^1 
(-i)^{1-j_0}
\sum_{j_1=0}^1
(-1)^{j_1+1}
\sum_{k=1}^n 
\binom{4n+2}{(4k+2j_1+j_0-1)} x^{4n-(4k+2j_1+j_0-1)} y^{4k+2j_1+j_0-1} 
;$$

$$Re = \binom{4n+2}{0} x^{4n} - \binom{4n+2}{2} x^{4n-2} y^2
-
\sum_{j_1=0}^1
(-1)^{j_1+1}
\sum_{k=1}^n 
\binom{4n+2}{(4k+2j_1+1-1)} x^{4n-(4k+2j_1+1-1)} y^{4k+2j_1+1-1} 
,$$

$$Im = \binom{4n+2}{1} x^{4n-1} y i
+
\sum_{j_1=0}^1
(-1)^{j_1+1}
\sum_{k=1}^n 
\binom{4n+2}{(4k+2j_1+0-1)} x^{4n-(4k+2j_1+0-1)} y^{4k+2j_1+0-1} 
.$$