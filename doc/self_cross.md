# Самопересечение кубической кривой Безье


Обозначим

$$\left\{
\begin{gathered}
A_1t_1^3 + A_2t_1^2 + A_3t_1 = A_1t_2^3 + A_2t_2^2 + A_3t_2,\\
B_1t_1^3 + B_2t_1^2 + B_3t_1 = B_1t_2^3 + B_2t_2^2 + B_3t_2,\\
t_1 \ne t_2.
\end{gathered}
\right.$$

Примем $t_2 = t_1+a$, тогда
$$A_1t_2^3 + A_2t_2^2 + A_3t_2
= A_1(t_1 + a)^3 + A_2(t_1 + a)^2 + A_3(t_1 + a)
= A_1(t_1^3 + 3t_1^2a + 3t_1a^2 + a^3) + A_2(t_1^2 + 2t_1a + a^2) + A_3t_1 + A_3a;
$$

$$A_1t_2^3 + A_2t_2^2 + A_3t_2
= 
A_1t_1^3 + A_2t_1^2  +A_3t_1 
+3A_1t_1^2a 
+3A_1t_1a^2 
+2A_2t_1a 
+A_1a^3 
+A_2a^2 
+A_3a.
$$

Приравняем правую часть к левой
$$A_1t_1^3 + A_2t_1^2 + A_3t_1 = 
A_1t_1^3 + A_2t_1^2  +A_3t_1 
+3A_1t_1^2a 
+3A_1t_1a^2 
+2A_2t_1a 
+A_1a^3 
+A_2a^2 
+A_3a;
$$
$$0 = 
3A_1t_1^2a 
+3A_1t_1a^2 
+2A_2t_1a 
+A_1a^3 
+A_2a^2 
+A_3a;
$$
$$ 
3A_1t_1^2 
+(3A_1a 
+2A_2)t_1 
+(A_1a^2 
+A_2a 
+A_3)
=0;
$$

Второе уравнение аналогично. Следовательно:

$$\left\{
\begin{gathered}
3A_1t_1^2 +(3A_1a +2A_2)t_1 +(A_1a^2 +A_2a +A_3) =0,\\
3B_1t_1^2 +(3B_1a +2B_2)t_1 +(B_1a^2 +B_2a +B_3) =0.\\
\end{gathered}
\right.$$

Составим
$$
S = \begin{pmatrix}
3A_1 & (3A_1a +2A_2) & (A_1a^2 +A_2a +A_3) & 0\\
0 & 3A_1 & (3A_1a +2A_2) & (A_1a^2 +A_2a +A_3)\\
3B_1 & (3B_1a +2B_2) & (B_1a^2 +B_2a +B_3) & 0\\
0 & 3B_1 & (3B_1a +2B_2) & (B_1a^2 +B_2a +B_3)\\
\end{pmatrix}
;$$

Обозначим для краткости
$$C_1 = (3A_1a +2A_2);\; C_2 =(A_1a^2 +A_2a +A_3);$$
$$D_1 = (3B_1a +2B_2);\; D_2 =(B_1a^2 +B_2a +B_3);$$

$$
S = \begin{pmatrix}
3A_1 & C_1 & C_2 & 0\\
0 & 3A_1 & C_1 & C_2\\
3B_1 & D_1 & D_2 & 0\\
0 & 3B_1 & D_1 & D_2\\
\end{pmatrix}
;$$

$$
\det S = 
3A_1
\begin{vmatrix}
3A_1 & C_1 & C_2\\
D_1 & D_2 & 0\\
3B_1 & D_1 & D_2\\
\end{vmatrix}
+
3B_1
\begin{vmatrix}
C_1 & C_2 & 0\\
3A_1 & C_1 & C_2\\
3B_1 & D_1 & D_2\\
\end{vmatrix}
;$$

$$
\det S = 
3A_1
\left(
C_2
\begin{vmatrix}
D_1 & D_2\\
3B_1 & D_1\\
\end{vmatrix}
+
D_2
\begin{vmatrix}
3A_1 & C_1\\
D_1 & D_2\\
\end{vmatrix}

\right)
+
3B_1
\left(
-C_2
\begin{vmatrix}
C_1 & C_2 \\
3B_1 & D_1\\
\end{vmatrix}
+
D_2
\begin{vmatrix}
C_1 & C_2 \\
3A_1 & C_1\\
\end{vmatrix}
\right)
;$$


$$
\det S = 
3A_1
\left(
C_2 (D_1^2 - 3B_1 D_2)
+
D_2 (3A_1 D_2 - C_1 D_1)
\right)
+
3B_1
\left(
-C_2 ( C_1 D_1 - 3B_1 C_2)
+
D_2 (C_1^2 - 3A_1 C_2)
\right)
;$$

$$
\det S = 
 3 A_1 C_2 D_1^2 
-9 A_1 B_1 C_2 D_2
+9 A_1^2 D_2^2 
-3 A_1 C_1 D_1 D_2 
-3 B_1 C_1 C_2 D_1 
+9 B_1^2 C_2^2
+3 B_1 C_1^2 D_2  
-9 A_1 B_1 C_2 D_2 
;$$

$$
\det S = 
\left( 3 A_1^2 B_2^2-6 A_1 A_2 B_1 B_2+3 A_2^2 B_1^2\right) a^2
+9 A_1^2 B_3^2+\left( \left( 12 A_2^2-18 A_1 A_3\right)  B_1-12 A_1 A_2 B_2\right)  B_3+12 A_1 A_3 B_2^2-12 A_2 A_3 B_1 B_2+9 A_3^2 B_1^2.
$$

$$K_2 = 3 A_1^2 B_2^2-6 A_1 A_2 B_1 B_2+3 A_2^2 B_1^2;$$
$$K_2 = 3 (A_1 B_2 - A_2 B_1) ^2;$$

$$K_0
= 3 \left(
3 A_1^2 B_3^2
-6 A_1 A_3 B_1 B_3
+3 A_3^2 B_1^2
+4 A_2^2 B_1 B_3
-4 A_1 A_2 B_2 B_3
+4 A_1 A_3 B_2^2
-4 A_2 A_3 B_1 B_2
\right);$$

$$K_0 = 3 \left(
3\left(
A_1 B_3 - A_3 B_1
\right)^2
-4\left(A_1 B_2 - A_2 B_1\right)
\left(A_2 B_3 - A_3 B_2 \right)
\right);$$

$$N_2 = \frac{K_2}{3} = (A_1 B_2 - A_2 B_1) ^2;$$
$$N_0 = \frac{N_2}{3} = 3\left(A_1 B_3 - A_3 B_1\right)^2 -4\left(A_1 B_2 - A_2 B_1\right)\left(A_2 B_3 - A_3 B_2\right).$$

$$\det S = 0;$$
$$K_2 a^2 + K_0 = 0;$$
$$N_2 a^2 + N_0 = 0;$$
$$a^2 = - \frac{N_0}{N_2};$$

