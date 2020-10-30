# Общее для кривых

## Определение кривой Безье

$$P(t) = \sum_{i=0}^n B_i J_{n,i}(t).$$

$$J_{n,i} = \binom{n}{i} t^i (1-t)^{n-i}.$$

Действует только при соглащении, что $0^0 = 1$.

$$t^a (1-t)^{b} = \binom{b+a}{a}^{-1} J_{b+a,a}.$$


Будем обозначать
$P_{n, B}$ - параметрическая функция кривой Безье порядка $n$, заданная множеством точек $B :\{B_0, ..., B_n\}$

## Производная 

$$\dot P = \sum_{i=0}^n B_i \dot J_{n,i}.$$

### $\dot J_{n,i},\,i \ne 0,\, i \ne n:$
$$d J_{n,i} = \binom{n}{i} \left( d(t^i) (1-t)^{n-i} + t^i d((1-t)^{n-i}) \right);$$
$$d J_{n,i} = \binom{n}{i} \left( i t^{i-1} (1-t)^{n-i}dt + (n-i) t^i (1-t)^{n-i-1}d(1-t) \right);$$
$$d J_{n,i} = \binom{n}{i} \left( i t^{i-1} (1-t)^{n-i} - (n-i) t^i (1-t)^{n-i-1} \right)dt;$$
$$\dot J_{n,i} = \binom{n}{i} \left( 
	i \binom{i-1+n-i}{i-1}^{-1} J_{i-1+n-i,i-1}
	-
	(n-i) \binom{n-i-1+i}{i}^{-1} J_{n-i-1+i,i}
\right);$$
$$\dot J_{n,i} = \binom{n}{i} \left( 
	i \binom{n-1}{i-1}^{-1} J_{n-1,i-1}
	-
	(n-i) \binom{n-1}{i}^{-1} J_{n-1,i}
\right);$$

$$i \binom{n-1}{i-1}^{-1} 
= i\left(\frac{(n-1)!}{(i-1)!(n-1-(i-1))!}\right)^{-1}
= \frac{i(i-1)!(n-i)!}{(n-1)!}
= \frac{i!(n-i)!}{(n-1)!}
= \frac{i!(n-i)!n}{(n-1)!n}
= \frac{i!(n-i)!n}{n!}
= \binom{n}{i}^{-1} n.
$$

$$(n-i) \binom{n-1}{i}^{-1}
= (n-i) \frac{i!(n-i-1)!}{(n-1)!}
= \frac{i!(n-i)!}{(n-1)!}
= \binom{n}{i}^{-1} n.
$$

$$\dot J_{n,i} = \binom{n}{i} \left( 
	\binom{n}{i}^{-1} n J_{n-1,i-1}
	-
	\binom{n}{i}^{-1} n J_{n-1,i}
\right);$$
$$\dot J_{n,i} = n \left(J_{n-1,i-1} - J_{n-1,i}\right).$$

### $\dot J_{n,i},\,i = 0:$

$$d J_{n,0} =d(\binom{n}{0} (1-t)^{n}) = d((1-t)^{n}) = - n (1-t)^{n-1} dt;$$
$$\dot J_{n,0} = - n (1-t)^{n-1}.$$
$$\dot J_{n,0} = - n J_{n-1,0}.$$


### $\dot J_{n,i},\,i = n:$

$$d J_{n,n} = d(\binom{n}{n} t^n) = d(t^n) = n t^{n-1} dt;$$
$$\dot J_{n,n} = n t^{n-1}.$$
$$\dot J_{n,0} = n J_{n-1,n-1}.$$


### Складываем

$$\dot P 
= \sum_{i=0}^n B_i \dot J_{n,i}
= B_0 \dot J_{n,0} + B_n \dot J_{n,n} + \sum_{i=1}^{n-1} B_i \dot J_{n,i}
= - B_0 n J_{n-1,0} + B_n n J_{n-1,n-1} + \sum_{i=1}^{n-1} B_i n \left(J_{n-1,i-1} - J_{n-1,i}\right); $$
$$\dot P = n \left( - B_0 J_{n-1,0} + B_n J_{n-1,n-1} + \sum_{i=1}^{n-1} B_i \left(J_{n-1,i-1} - J_{n-1,i}\right) \right);$$
$$\frac{\dot P}{n} = - B_0 J_{n-1,0} + B_n J_{n-1,n-1} + \sum_{i=1}^{n-1} \left(B_i J_{n-1,i-1} - B_i J_{n-1,i}\right);$$
$$\frac{\dot P}{n} = - B_0 J_{n-1,0} - \sum_{i=1}^{n-1} B_i J_{n-1,i} + \sum_{i=1}^{n-1} B_i J_{n-1,i-1} + B_n J_{n-1,n-1}  ;$$
$$\frac{\dot P}{n} = - \sum_{i=0}^{n-1} B_i J_{n-1,i} + \sum_{i=1}^{n} B_i J_{n-1,i-1};$$
$$\frac{\dot P}{n} = - \sum_{i=0}^{n-1} B_i J_{n-1,i} + \sum_{i=0}^{n-1} B_{i+1} J_{n-1,i};$$
$$\frac{\dot P}{n} = \sum_{i=0}^{n-1} \left( B_{i+1} J_{n-1,i} -  B_i J_{n-1,i} \right);$$
$$\frac{\dot P}{n} = \sum_{i=0}^{n-1} J_{n-1,i} \left( B_{i+1} - B_i \right);$$
$$\dot P = n \sum_{i=0}^{n-1} J_{n-1,i} \left( B_{i+1} - B_i \right).$$

Обозначим 
$$\Delta B_i = B_{i+1} - B_i;$$
$$\Delta B : {\Delta B_0, ..., \Delta B_{n-1}}$$

$$\dot P = n \sum_{i=0}^{n-1} J_{n-1,i} \Delta B_i.$$


$$\dot P_{n, B} = n P_{n-1, \Delta B}.$$

## Умножение $J_{n,i}$ друг на друга

$$J_{n,i} = \binom{n}{i} t^i (1-t)^{n-i}.$$


$$J_{n,i}J_{m,j} 
= \binom{n}{i} t^i (1-t)^{n-i} \cdot \binom{m}{j} t^j (1-t)^{m-j}
= \binom{n}{i} \binom{m}{j} t^{i+j} (1-t)^{(n+m)-(i+j)}.
$$

$$J_{n+m,i+j} = \binom{n+m}{i+j} t^{i+j} (1-t)^{(n+m)-(i+j)}.$$


$$J_{n,i}J_{m,j} = \binom{n}{i} \binom{m}{j} \binom{n+m}{i+j}^{-1} J_{n+m,i+j}.$$

## Умножение кривых

Пусть над точками кривых определена операция $\times$, обладающая ассоциативностью с умножением на скаляр
$$mA \times nB = mn(A \times B)$$

Чтобы получить более общее решение, будем считать, что она не коммутативна.

$$P_{m, A} \times P_{n, B} = \left(\sum_{j=0}^m A_j J_{m,j}\right)\times \left(\sum_{i=0}^n B_i J_{n,i}\right);$$
$$P_{m, A} \times P_{n, B} = \left(\sum_{j=0}^m \left(\sum_{i=0}^n A_j J_{m,j} \times B_i J_{n,i}\right) \right);$$
$$P_{m, A} \times P_{n, B} = \sum_{j=0}^m \sum_{i=0}^n J_{m,j} J_{n,i} A_j \times B_i;$$
$$P_{m, A} \times P_{n, B} = \sum_{j=0}^m \sum_{i=0}^n \binom{n}{i} \binom{m}{j} \binom{n+m}{i+j}^{-1} J_{n+m,i+j} A_j \times B_i;$$

Введём
$$k = i+j;\; j=k-i.$$

Применим функцию Хевисайда, чтобы защититься от невалидных значений индексов
$$\theta(x)=\begin{cases} 0, & x<0;
\\ 1, & x\geqslant 0.\end{cases}$$


И преобразуем

$$P_{m, A} \times P_{n, B} = \sum_{k=0}^{m+n} \sum_{i=0}^{n} \theta(k-i)\theta(m-k-i) \binom{n}{i} \binom{m}{k-i} \binom{n+m}{i+k-i}^{-1} J_{n+m,k} A_{k-i} \times B_i;$$

$$P_{m, A} \times P_{n, B} = \sum_{k=0}^{m+n} \sum_{i=0}^{n} \theta(k-i)\theta(m-k-i) \binom{n}{i} \binom{m}{k-i} \binom{n+m}{k}^{-1} J_{n+m,k} A_{k-i} \times B_i;$$
$$P_{m, A} \times P_{n, B} 
= \sum_{k=0}^{m+n} \binom{n+m}{k}^{-1} J_{n+m,k} \sum_{i=0}^{n} \theta(k-i)\theta(m-k-i) \binom{n}{i} \binom{m}{k-i} A_{k-i} \times B_i;$$

Обозначим:

$$M_k = \binom{n+m}{k}^{-1} \sum_{i=0}^{n} \theta(k-i)\theta(m-k-i) \binom{n}{i} \binom{m}{k-i} A_{k-i} \times B_i;$$

$$P_{m, A} \times P_{n, B} 
= \sum_{k=0}^{m+n} M_k J_{n+m,k};$$

$$P_{m, A} \times P_{n, B} = P_{n+m, M}.$$