# Вычисление нулей одномерной кривой
Сведение к уравнению

## Кубическая кривая
$$P_{3,K} = 0;\; K \in \mathbb{R}^4.$$


$$(1-t)^3 K_0 + 3 t (1-t)^2 K_1 + 3 t^2 (1-t) K_2 + t^3 K_3 = 0;$$
$$(1 - 3t + 3t^2 - t^3) K_0 + 3 t (1 - 2t + t^2) K_1 + 3 t^2 (1-t) K_2 + t^3 K_3 = 0;$$
$$(1 - 3t + 3t^2 - t^3) K_0 + (3t - 6t^2 + 3t^3) K_1 + (3t^2 - 3t^3) K_2 + t^3 K_3 = 0;$$
$$
K_0 
-3K_0t 
+3K_1t 
+3K_0t^2 
-6K_1t^2 
+3K_2t^2
-K_0t^3 
+3K_1t^3  
-3K_2t^3 
+K_3 t^3  
= 0;$$
$$
K_0 
+
(-3K_0 +3K_1)t
+
(3K_0 -6K_1 +3K_2)t^2
+
(-K_0 +3K_1 -3K_2 +K_3)t^3
= 0.$$

$$
\begin{gathered}
c_0 = K_0;\\
c_1 = -3K_0 +3K_1;\\
c_2 = 3K_0 -6K_1 +3K_2;\\
c_3 = -K_0 +3K_1 -3K_2 +K_3.
\end{gathered}
$$
$$
\begin{gathered}
c_0 = K_0;\\
c_1 = 3(-K_0 +K_1);\\
c_2 = 3(\binom{2}{0} K_0 - \binom{2}{1}K_1 + \binom{2}{2}K_2);\\
c_3 = -\binom{3}{0}K_0 +\binom{3}{1}K_1 - \binom{3}{2}K_2 + \binom{3}{3}K_3.
\end{gathered}
$$

## Квадратичная кривая
$$P_{2,K} = 0;\; K \in \mathbb{R}^3.$$

$$(1-t)^2 K_0 + 2 t(1-t) K_1 + t^2 K_2 = 0;$$
$$(1-2t+t^2) K_0 + (2t-2t^2) K_1 + t^2 K_2 = 0;$$
$$K_0 - 2tK_0 + t^2K_0 + 2tK_1 - 2t^2K_1 + t^2 K_2 = 0;$$
$$K_0 + t(-2K_0 + 2K_1) + t^2(K_0 - 2K_1 + K_2) = 0;$$

$$
\begin{gathered}
c_0 = K_0;\\
c_1 = -2K_0 +2K_1;\\
c_2 = K_0 - 2K_1 +K_2.
\end{gathered}
$$

$$
\begin{gathered}
c_0 = K_0;\\
c_1 = 2 (-K_0 +K_1);\\
c_2 = \binom{2}{0} K_0 - \binom{2}{1}K_1 + \binom{2}{2}K_2.
\end{gathered}
$$



## Линейная кривая

$$P_{1,K} = 0;\; K \in \mathbb{R}^2.$$

$$(1-t)K_0 + t K_1 = 0;$$
$$K_0 + t(-K_0 + K_1) = 0;$$

$$\begin{gathered}
c_1 = (-K_0 + K_1);\\
c_0 = K_0.
\end{gathered}$$

## В общем виде

$$P = \sum_{i=0}^n K_i J_{n,i}.$$

$$J_{n,i} = \binom{n}{i} t^i (1-t)^{n-i}.$$
Действует только при соглащении, что $0^0 = 1$.

$$P = \sum_{i=0}^n K_i \binom{n}{i} t^i (1-t)^{n-i};$$
$$P = \sum_{i=0}^n K_i \binom{n}{i} t^i \left( \sum_{k=0}^{n-i}\binom{n-i}{k}(1)^{n-i-k}(-t)^k \right);$$
$$P = \sum_{i=0}^n K_i \binom{n}{i} t^i \left( \sum_{k=0}^{n-i}\binom{n-i}{k}(-t)^k \right);$$
$$P = \sum_{i=0}^n \sum_{k=0}^{n-i} \left(K_i \binom{n}{i} \binom{n-i}{k}(-t)^kt^i \right);$$
$$P = \sum_{i=0}^n \sum_{k=0}^{n-i} \left((-1)^k \binom{n}{i} \binom{n-i}{k}K_i t^{i+k} \right);$$

$$\binom{n}{i} \binom{n-i}{k} = \frac{n!}{i!(n-i)!}\frac{(n-i)!}{k!(n-i-k)!} = \frac{n!}{i!k!(n-i-k)!}
= \binom{n}{i,\,k,\,n-i-k}.$$

Заменим индексную переменную 
$$\begin{gathered}
	(i,k) \in ([0;n],[0;n-i]);\\
	i+k=j;\\
	k_{max} = n-i; \Rightarrow j_{max} = i+n-i = n;\\
	i=j-k;\\
	k=j-i,\,i \in [0;n]; \Rightarrow k_{max}(j) = j.
\end{gathered}$$

тогда

$$\begin{gathered}
	j \in [0;n],\, k \in [0;j]:\: i=j-k \Rightarrow i \in [0; j].\\
\end{gathered}$$

$$P = \sum_{j=0}^{n} \sum_{k=0}^{j} \left((-1)^k \binom{n}{j-k,\,k,\,n-(j-k)-k} K_{j-k} t^j \right);$$
$$P = \sum_{j=0}^{n} t^j \sum_{k=0}^{j} \left((-1)^k \binom{n}{j-k,\,k,\,n-j}K_{j-k} \right);$$

$$c_j = \sum_{k=0}^{j} \left((-1)^k \binom{n}{j-k,\,k,\,n-j}K_{j-k} \right).$$