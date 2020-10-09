# Пересечение двух кубических кривых Безье

Пусть кривые заданы полиномами
$$
\left\{
\begin{gathered}
x_1 = A_1t_1^3+A_2t_1^2+A_3t_1 + A_4, \\
y_1 = B_1t_1^3+B_2t_1^2+B_3t_1 + B_4.
\end{gathered}
\right.
$$
$$
\left\{
\begin{gathered}
x_2 = C_1t_2^3+C_2t_2^2+C_3t_2 + C_4, \\
y_2 = D_1t_2^3+D_2t_2^2+D_3t_2 + D_4.
\end{gathered}
\right.
$$

Получим систему уравнений

$$
\left\{
\begin{gathered}
A_1t_1^3+A_2t_1^2+A_3t_1 + A_4 = C_1t_2^3+C_2t_2^2+C_3t_2 + C_4, \\
B_1t_1^3+B_2t_1^2+B_3t_1 + B_4 = D_1t_2^3+D_2t_2^2+D_3t_2 + D_4;
\end{gathered}
\right.
$$

$$
\left\{
\begin{gathered}
A_1t_1^3+A_2t_1^2+A_3t_1 + A_4 - C_1t_2^3-C_2t_2^2-C_3t_2 - C_4 =0, \\
B_1t_1^3+B_2t_1^2+B_3t_1 + B_4 - D_1t_2^3-D_2t_2^2-D_3t_2 - D_4 =0.
\end{gathered}
\right.
$$

Применим теорию вычетов.

Обозначим
$$
\begin{gathered}
A_0 = A_4 - C_1t_2^3-C_2t_2^2-C_3t_2 - C_4 =0, \\
B_0 = B_4 - D_1t_2^3-D_2t_2^2-D_3t_2 - D_4 =0;
\end{gathered}
$$

тогда

$$
\left\{
\begin{gathered}
A_1t_1^3+A_2t_1^2+A_3t_1 + A_0 =0, \\
B_1t_1^3+B_2t_1^2+B_3t_1 + B_0 =0.
\end{gathered}
\right.
$$

Введём полиномы
$$
\left\{
\begin{gathered}
f(t_1) = A_1t_1^3+A_2t_1^2+A_3t_1 + A_0 =0, \\
g(t_1) = B_1t_1^3+B_2t_1^2+B_3t_1 + B_0 =0;
\end{gathered}
\right.
$$

и составим матрицу Сильвестера

$$
S(f, g) = \begin{pmatrix}
A_1 & A_2 & A_3 & A_0 & 0 & 0\\
0 & A_1 & A_2 & A_3 & A_0 & 0\\ 
0 & 0 & A_1 & A_2 & A_3 & A_0\\
B_1 & B_2 & B_3 & B_0 & 0 & 0\\
0 & B_1 & B_2 & B_3 & B_0 & 0\\ 
0 & 0 & B_1 & B_2 & B_3 & B_0
\end{pmatrix}.
$$

Миноры, состоящие из первых трёх столбцов - константные.
Их будем обозначать $M$ или $\bar M$, с тремя индексами, где черта обозначает дополнительный минор. Индексы для $M$ будут обозначать включённые строки, а для $\bar M$ - исключённые.


$$\det S(f,g) = \sum_{i=1}^3 \sum_{j=0}^{i} K_{i-j,j}A_0^{i-j}B_0^{j};$$

$$
\begin{gathered}
K_{3,0} = - M_{4,5,6},\\
K_{2,1} =  = M_{3,4,5},\\
K_{1,2} = -3 M_{2,3,4},\\
K_{0,3} = M_{1,2,3},\\
K_{2,0} = - 2 B_3 M_{1,4,6} + B_2 M_{1,4,5},\\
K_{1,1} =
-A_2 M_{1,4,5} 
+2 A_3 M_{1,4,6}
+B_2 M_{1,2,4} 
+2 B_3 M_{1,2,5} 
, \\
K_{0,2} = - A_2 M_{1,2,4} - 2 A_3 M_{1,2,5} , \\
K_{1,0} = - B_3 \left( A_3 M_{1,4,5} + B_3 M_{1,2,4} \right),\\
K_{0,1} = A_3 \left( A_3 M_{1,4,5} + B_3 M_{1,2,4} \right).\\
\end{gathered}
$$

## Случай $A_1 = 0 \wedge B_1=0$

Введём полиномы
$$
\left\{
\begin{gathered}
f(t_1) = A_2t_1^2+A_3t_1 + A_0 =0, \\
g(t_1) = B_2t_1^2+B_3t_1 + B_0 =0;
\end{gathered}
\right.
$$

и составим матрицу Сильвестера

$$
S(f, g) = \begin{pmatrix}
A_2 & A_3 & A_0 & 0\\ 
0 & A_2 & A_3 & A_0\\
B_2 & B_3 & B_0 & 0\\ 
0 & B_2 & B_3 & B_0
\end{pmatrix}.
$$

$$\det S =
(-1)^{4+2}A_0 \bar{M}_{4;2}
+
(-1)^{4+4}B_0 \bar{M}_{4;4}
$$

$$
\bar{M}_{4;2} =
\begin{vmatrix}
A_2 & A_3 & A_0 \\ 
B_2 & B_3 & B_0 \\ 
0 & B_2 & B_3 
\end{vmatrix}
=
(-1)^{1+1} A_2 
\begin{vmatrix}
 B_3 & B_0 \\ 
 B_2 & B_3 
\end{vmatrix} 
+
(-1)^{1+2} B_2
\begin{vmatrix}
  A_3 & A_0 \\ 
 B_2 & B_3 
\end{vmatrix} 
;
$$

$$\bar{M}_{4;2} 
= A_2 (B_3^2 - B_2 B_0) - B_2 (A_3 B_3 - B_2 A_0)
= A_2 B_3^2 - A_2 B_2 B_0 - B_2 A_3 B_3 + B_2^2 A_0
;
$$


$$
\bar{M}_{4;4} =
\begin{vmatrix}
A_2 & A_3 & A_0 \\ 
0 & A_2 & A_3 \\
B_2 & B_3 & B_0 \\ 
\end{vmatrix}
=
(-1)^{1+1} A_2
\begin{vmatrix}
 A_2 & A_3 \\
 B_3 & B_0 \\ 
\end{vmatrix}
+
(-1)^{1+3} B_2
\begin{vmatrix}
 A_3 & A_0 \\ 
 A_2 & A_3 \\
\end{vmatrix}
;$$

$$
\bar{M}_{4;4} 
= A_2 (A_2 B_0 - A_3 B_3) + B_2 (A_3^2 - A_2 A_0)
= A_2^2 B_0 - A_2 A_3 B_3 + B_2 A_3^2 - A_2 B_2 A_0
;$$

$$\det S 
= A_0 \bar{M}_{4;2} + B_0 \bar{M}_{4;4}
= A_0 (A_2 B_3^2 - A_2 B_2 B_0 - B_2 A_3 B_3 + B_2^2 A_0) 
+B_0 (A_2^2 B_0 - A_2 A_3 B_3 + B_2 A_3^2 - A_2 B_2 A_0)
;
$$

$$
\det S 
= 
B_2^2 A_0^2 - 2 A_2 B_2 A_0 B_0 + A_2^2 B_0^2
+
 A_0 (A_2 B_3^2 - B_2 A_3 B_3) + B_0 (B_2 A_3^2 - A_2 A_3 B_3)  
$$

$$
\begin{gathered}
K_{2,0} = B_2^2,\\
K_{1,1} = - 2 A_2 B_2, \\
K_{0,2} = A_2^2 , \\
K_{1,0} = (A_2 B_3 - B_2 A_3)B_3,\\
K_{0,1} = (B_2 A_3 - A_2 B_3)A_3 .\\
\end{gathered}
$$

## Случай $A_1 = 0 \wedge B_1=0 \wedge A_2 = 0 \wedge B_2=0$

$$
\left\{
\begin{gathered}
f(t_1) = A_3t_1 + A_0 =0, \\
g(t_1) = B_3t_1 + B_0 =0;
\end{gathered}
\right.
$$

$$
S(f, g) = \begin{pmatrix}
 A_3 & A_0\\
 B_3 & B_0
\end{pmatrix}
$$
$$
\det S = A_3 B_0 - B_3 A_0;
$$

$$K_{1,0} = -B_3;\; K_{0,1} = A_3.$$