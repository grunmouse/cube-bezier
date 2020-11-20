# Кривизна

$$k=\frac{\dot P \times \ddot P}{\left|\dot P\right|^3}.$$

$$k_3
=\frac{\dot P_{3,B} \times \ddot P_{3,B}}{\left|\dot P_{3,B}\right|^3}
=\frac{(3 P_{2,\Delta B}) \times (6 P_{1,\Delta^2 B})}{\left|3 P_{2,\Delta B}\right|^3}
=\frac{18(P_{2,\Delta B} \times P_{1,\Delta^2 B})}{27\left|P_{2,\Delta B}\right|^3}
=\frac{2(P_{2,\Delta B} \times P_{1,\Delta^2 B})}{3\left|P_{2,\Delta B}\right|^3}.
$$

## Точки перегиба

$$k_3 = 0;\; \Rightarrow 
\left\{\begin{gathered} 
	P_{2,\Delta B} \times P_{1,\Delta^2 B} = 0, \\
	\left|P_{2,\Delta B}\right| \ne 0.
\end{gathered}\right.
$$

$$P_{2,\Delta B} \times P_{1,\Delta^2 B} 
= 
\left( \sum_{i=0}^2 \Delta B_i J_{2,i} \right) 
\times
\left( \sum_{j=0}^1 \Delta^2 B_j J_{1,j} \right) 
= 
\sum_{i=0}^2 \left( 
	\Delta B_i J_{2,i}
	\times
	\left( \sum_{j=0}^1 \Delta^2 B_j J_{1,j} \right) 
\right) 
;$$

$$P_{2,\Delta B} \times P_{1,\Delta^2 B} 
= 
\sum_{i=0}^2 \left( 
	\sum_{j=0}^1 \left(
		\Delta B_i J_{2,i}
		\times
		\Delta^2 B_j J_{1,j} 
	\right) 
\right) 
= 
\sum_{i=0}^2
\sum_{j=0}^1 \left(
		J_{2,i} J_{1,j} 
		\Delta B_i 
		\times
		\Delta^2 B_j 
\right) 
$$

$$J_{2,0} = (1-t)^2;$$
$$J_{2,1} = 2 t(1-t);$$
$$J_{2,2} = t^2.$$
$$J_{1,0} = (1-t);$$
$$J_{1,1} = t.$$

$$J_{2,0}J_{1,0} = (1-t)^3 = J_{3,0};$$
$$J_{2,1}J_{1,0} = 2 t(1-t)^2 = \frac{2}{3} J_{3,1};$$
$$J_{2,2}J_{1,0} = t^2 (1-t) = \frac{1}{3} J_{3,2};$$
$$J_{2,0}J_{1,1} = t(1-t)^2 = \frac{1}{3} J_{3,1};$$
$$J_{2,1}J_{1,1} = 2 t^2(1-t) = \frac{2}{3} J_{3,2};$$
$$J_{2,2}J_{1,1} = t^3 = J_{3,3}.$$

$$P_{2,\Delta B} \times P_{1,\Delta^2 B} 
= J_{3,0} \Delta B_0 \times \Delta^2 B_0 
+
\frac{2}{3} J_{3,1} \Delta B_1 \times \Delta^2 B_0 
+
\frac{1}{3} J_{3,1} \Delta B_0 \times \Delta^2 B_1 
+
\frac{1}{3} J_{3,2} \Delta B_2 \times \Delta^2 B_0 
+
\frac{2}{3} J_{3,2} \Delta B_1 \times \Delta^2 B_1
+
J_{3,3}  \Delta B_2 \times \Delta^2 B_1;
$$
$$P_{2,\Delta B} \times P_{1,\Delta^2 B} 
= 
J_{3,0} \Delta B_0 \times \Delta^2 B_0 
+J_{3,1} \left( \frac{2}{3} \Delta B_1 \times \Delta^2 B_0 + \frac{1}{3} \Delta B_0 \times \Delta^2 B_1 \right)
+J_{3,2} \left( \frac{1}{3} \Delta B_2 \times \Delta^2 B_0 + \frac{2}{3} \Delta B_1 \times \Delta^2 B_1 \right)
+J_{3,3} \Delta B_2 \times \Delta^2 B_1;
$$

$$\begin{gathered}
K_{3,0} = \Delta B_0 \times \Delta^2 B_0,\\
K_{3,1} =
\frac{1}{3} \Delta B_0 \times \Delta^2 B_1 
+
\frac{2}{3} \Delta B_1 \times \Delta^2 B_0 
,\\
K_{3,2} =
 \frac{2}{3} \Delta B_1 \times \Delta^2 B_1 
 +
 \frac{1}{3} \Delta B_2 \times \Delta^2 B_0 
,\\
K_{3,3} = \Delta B_2 \times \Delta^2 B_1;
\end{gathered}$$

$$P_{2,\Delta B} \times P_{1,\Delta^2 B} = P_{3,K}.$$

$$K_{3,i} = \frac{1}{3}\left( (3-i) \Delta B_i \times \Delta^2 B_0 + i \Delta B_{i-1} \times \Delta^2 B_1 \right).$$

$$k_3
=\frac{2(P_{3,K})}{3\left|P_{2,\Delta B}\right|^3}.
$$

$$k_3 = 0;\; \Rightarrow 
\left\{\begin{gathered} 
	P_{3,K} = 0, \\
	\left|P_{2,\Delta B}\right| \ne 0.
\end{gathered}\right.
$$


## Точки наибольшей кривизны

Экстремумы кривой $k(t)$

$$\dot k_3 = \frac{d}{d t}\left(\frac{2(P_{3,K})}{3\left|P_{2,\Delta B}\right|^3}\right).$$

$$d k_3 
= \frac{2}{3}d\left(\frac{P_{3,K}}{\left|P_{2,\Delta B}\right|^3}\right)
= \frac{2}{3}\left(
\frac{
	dP_{3,K}\left|P_{2,\Delta B}\right|^3 +
	P_{3,K}d\left(\left|P_{2,\Delta B}\right|^3\right)
}
{
	\left|P_{2,\Delta B}\right|^6
}
\right)
.$$

$$\left|P_{2,\Delta B}\right|^3 = \left(P_{2,\Delta B}^2\right)^{1.5};$$

$$d\left(\left|P_{2,\Delta B}\right|^3\right)
= d\left(\left(P_{2,\Delta B}^2\right)^{1.5}\right)
= 1.5 \left(P_{2,\Delta B}^2\right)^{0.5} d\left(P_{2,\Delta B}^2\right);
$$

$$d k_3 
= \frac{2}{3}\left(
\frac{
	dP_{3,K} \left(P_{2,\Delta B}^2\right)^{1.5} +
	1.5 P_{3,K}\left(P_{2,\Delta B}^2\right)^{0.5} d\left(P_{2,\Delta B}^2\right)
}
{
	\left|P_{2,\Delta B}\right|^6
}
\right)
;$$

$$d k_3 
= \frac{2}{3}
\frac{\left(P_{2,\Delta B}^2\right)^{0.5}}{\left|P_{2,\Delta B}\right|^6}
\left(
	dP_{3,K} \left(P_{2,\Delta B}^2\right) +
	1.5 P_{3,K} d\left(P_{2,\Delta B}^2\right)
\right)
;$$

$$d k_3 
= \frac{2}{3}
\left|P_{2,\Delta B}\right|^{-5}
\left(
	dP_{3,K} \left(P_{2,\Delta B}^2\right) +
	1.5 P_{3,K} d\left(P_{2,\Delta B}^2\right)
\right)
.$$

$$P_{2,\Delta B}^2
= \left(
	J_{2,0}\Delta B_0
	+J_{2,1}\Delta B_1
	+J_{2,2}\Delta B_2
\right)^2
=
 J_{2,0}^2\Delta B_0^2
+J_{2,1}^2\Delta B_1^2
+J_{2,2}^2\Delta B_2^2
+2 J_{2,0}J_{2,1}\Delta B_0 \Delta B_1
+2 J_{2,1}J_{2,2}\Delta B_1 \Delta B_2
+2 J_{2,2}J_{2,0}\Delta B_2 \Delta B_0
$$

$$J_{2,0}^2 = \binom{2}{0}^2\binom{4}{0}^{-1} J_{4,0} = J_{4,0};$$
$$J_{2,1}^2 = \binom{2}{1}^2\binom{4}{2}^{-1} J_{4,2} = \frac{2}{3} J_{4,2};$$
$$J_{2,2}^2 = \binom{2}{2}^2\binom{4}{4}^{-1} J_{4,4} = J_{4,4};$$

$$J_{2,0}J_{2,1} = \binom{2}{0}\binom{2}{1}\binom{4}{1}^{-1} J_{4,1} = \frac{1}{2}J_{4,1};$$
$$J_{2,1}J_{2,2} = \binom{2}{1}\binom{2}{2}\binom{4}{3}^{-1} J_{4,3} = \frac{1}{2}J_{4,3};$$
$$J_{2,2}J_{2,0} = \binom{2}{0}\binom{2}{0}\binom{4}{2}^{-1} J_{4,2} = \frac{1}{6}J_{4,2}.$$

$$P_{2,\Delta B}^2
=
 J_{4,0}\Delta B_0^2
+J_{4,1}\Delta B_0 \Delta B_1
+\frac{2}{3} J_{4,2} \Delta B_1^2
+\frac{2}{6}J_{4,2}\Delta B_2 \Delta B_0
+J_{4,3}\Delta B_1 \Delta B_2
+J_{4,4}\Delta B_2^2
;$$

$$P_{2,\Delta B}^2
=
 J_{4,0}\Delta B_0^2
+J_{4,1}\Delta B_0 \Delta B_1
+J_{4,2} \left( \frac{2}{3} \Delta B_1^2 + \frac{1}{3}\Delta B_2 \Delta B_0 \right)
+J_{4,3}\Delta B_1 \Delta B_2
+J_{4,4}\Delta B_2^2
.$$

$$\begin{gathered}
	Q_0 = \Delta B_0^2, \\
	Q_1 = \Delta B_0 \Delta B_1, \\
	Q_2 = \frac{2}{3} \Delta B_1^2 + \frac{1}{3}\Delta B_2 \Delta B_0, \\
	Q_3 = \Delta B_1 \Delta B_2, \\
	Q_4 = \Delta B_2^2.
\end{gathered}$$

$$P_{2,\Delta B}^2 = P_{4, Q}.$$

$$d k_3 
= \frac{2}{3}
\left|P_{2,\Delta B}\right|^{-5}
\left(
	dP_{3,K} P_{4, Q} +
	1.5 P_{3,K} dP_{4, Q}
\right)
;$$

$$\dot k_3 
= \frac{2}{3}
\left|P_{2,\Delta B}\right|^{-5}
\left(
	\dot P_{3,K} P_{4, Q} +
	1.5 P_{3,K} \dot P_{4, Q}
\right)
;$$

$$\dot P_{3,K} = 3 P_{2,\Delta K};$$
$$\dot P_{4, Q} = 4 P_{3, \Delta Q};$$

$$\dot k_3 
= \frac{2}{3}
\left|P_{2,\Delta B}\right|^{-5}
\left(
	3 P_{2,\Delta K} P_{4, Q} +
	6 P_{3,K} P_{3, \Delta Q}
\right)
;$$

$$\dot k_3 
= 2
\left|P_{2,\Delta B}\right|^{-5}
\left(
	 P_{2,\Delta K} P_{4, Q} +
	2 P_{3,K} P_{3, \Delta Q}
\right)
;$$

Умножим

$$P_{2,\Delta K} P_{4, Q} = P_{6,M}$$

$$M_k = \binom{6}{k}^{-1} \sum_{i=0}^{4} \theta(k-i)\theta(2-k+i) \binom{4}{i} \binom{2}{k-i} \Delta K_{k-i} Q_i.$$

$$M_0 = \binom{6}{0}^{-1} \sum_{i=0}^{4} \theta(0-i)\theta(2-0+i) \binom{4}{i} \binom{2}{0-i} \Delta K_{0-i} Q_i;$$
$$M_0 = \binom{6}{0}^{-1} \binom{4}{0} \binom{2}{0} \Delta K_{0} Q_0;$$
$$M_0 = \Delta K_{0} Q_0.$$

$$M_1 = \binom{6}{1}^{-1} \sum_{i=0}^{4} \theta(1-i)\theta(2-1+i) \binom{4}{i} \binom{2}{1-i} \Delta K_{1-i} Q_i;$$
$$M_1 = \binom{6}{1}^{-1} \sum_{i=0}^{1} \binom{4}{i} \binom{2}{1-i} \Delta K_{1-i} Q_i;$$
$$M_1 = 
 \binom{6}{1}^{-1} \binom{4}{0} \binom{2}{1} \Delta K_{1} Q_0
+\binom{6}{1}^{-1} \binom{4}{1} \binom{2}{0} \Delta K_{0} Q_1
;$$
$$M_1 = 
 \frac{2}{6} \Delta K_{1} Q_0
+\frac{4}{6} \Delta K_{0} Q_1
.$$

$$M_2 = \binom{6}{2}^{-1} \sum_{i=0}^{4} \theta(2-i)\theta(2-2+i) \binom{4}{i} \binom{2}{2-i} \Delta K_{2-i} Q_i;$$
$$M_2 = \binom{6}{2}^{-1} \sum_{i=0}^{2} \binom{4}{i} \binom{2}{2-i} \Delta K_{2-i} Q_i;$$
$$M_2 = 
 \binom{6}{2}^{-1} \binom{4}{0} \binom{2}{2} \Delta K_{2} Q_0
+\binom{6}{2}^{-1} \binom{4}{1} \binom{2}{1} \Delta K_{1} Q_1
+\binom{6}{2}^{-1} \binom{4}{2} \binom{2}{0} \Delta K_{0} Q_2
;$$
$$M_2 = 
 \frac{1}{15} \Delta K_{2} Q_0
+\frac{8}{15} \Delta K_{1} Q_1
+\frac{6}{15} \Delta K_{0} Q_2
.$$


$$M_3 = \binom{6}{3}^{-1} \sum_{i=0}^{4} \theta(3-i)\theta(2-3+i) \binom{4}{i} \binom{2}{3-i} \Delta K_{3-i} Q_i;$$
$$M_3 = \binom{6}{3}^{-1} \sum_{i=1}^{3} \binom{4}{i} \binom{2}{3-i} \Delta K_{3-i} Q_i;$$
$$M_3 = 
 \binom{6}{3}^{-1} \binom{4}{1} \binom{2}{2} \Delta K_{2} Q_1
+\binom{6}{3}^{-1} \binom{4}{2} \binom{2}{1} \Delta K_{1} Q_2
+\binom{6}{3}^{-1} \binom{4}{3} \binom{2}{0} \Delta K_{0} Q_3
;$$
$$M_3 = 
 \frac{4}{20} \Delta K_{2} Q_1
+\frac{12}{20} \Delta K_{1} Q_2
+\frac{4}{20} \Delta K_{0} Q_3
.$$


$$M_4 = \binom{6}{4}^{-1} \sum_{i=0}^{4} \theta(4-i)\theta(2-4+i) \binom{4}{i} \binom{2}{4-i} \Delta K_{4-i} Q_i;$$
$$M_4 = \binom{6}{4}^{-1} \sum_{i=2}^{4} \binom{4}{i} \binom{2}{4-i} \Delta K_{4-i} Q_i;$$
$$M_4 = 
 \binom{6}{4}^{-1} \binom{4}{2} \binom{2}{2} \Delta K_{2} Q_2
+\binom{6}{4}^{-1} \binom{4}{3} \binom{2}{1} \Delta K_{1} Q_3
+\binom{6}{4}^{-1} \binom{4}{4} \binom{2}{0} \Delta K_{0} Q_4
;$$
$$M_4 = 
 \frac{6}{15} \Delta K_{2} Q_2
+\frac{8}{15} \Delta K_{1} Q_3
+\frac{1}{15} \Delta K_{0} Q_4
.$$

$$M_5 = \binom{6}{5}^{-1} \sum_{i=0}^{4} \theta(5-i)\theta(2-5+i) \binom{4}{i} \binom{2}{5-i} \Delta K_{5-i} Q_i;$$
$$M_5 = \binom{6}{5}^{-1} \sum_{i=3}^{4} \binom{4}{i} \binom{2}{5-i} \Delta K_{5-i} Q_i;$$
$$M_5 = 
 \binom{6}{5}^{-1} \binom{4}{3} \binom{2}{2} \Delta K_{2} Q_3
+\binom{6}{5}^{-1} \binom{4}{4} \binom{2}{1} \Delta K_{1} Q_4
;$$
$$M_5 = 
 \frac{4}{6} \Delta K_{2} Q_3
+\frac{2}{6} \Delta K_{1} Q_4
.$$

$$M_6 = \binom{6}{6}^{-1} \sum_{i=0}^{4} \theta(6-i)\theta(2-6+i) \binom{4}{i} \binom{2}{6-i} \Delta K_{6-i} Q_i;$$
$$M_6 = \binom{6}{6}^{-1} \binom{4}{4} \binom{2}{2} \Delta K_{2} Q_4;$$
$$M_6 = \Delta K_{2} Q_4.$$

Умножим теперь
$$P_{3,K} P_{3, \Delta Q} = P_{6,N}.$$

$$N_k = \binom{6}{k}^{-1} \sum_{i=\max(0,k-3)}^{\min(3,k)} \binom{3}{i} \binom{3}{k-i} K_{k-i} \Delta Q_i.$$

$$N_0 = \binom{6}{0}^{-1} \sum_{i=\max(0,0-3)}^{\min(3,0)} \binom{3}{i} \binom{3}{0-i} K_{0-i} \Delta Q_i;$$
$$N_0 = K_{0} \Delta Q_0.$$

$$N_1 = \binom{6}{1}^{-1} \sum_{i=0}^{1} \binom{3}{i} \binom{3}{1-i} K_{1-i} \Delta Q_i;$$
$$N_1 = 
 \binom{6}{1}^{-1} \binom{3}{0} \binom{3}{1} K_{1} \Delta Q_0
+\binom{6}{1}^{-1} \binom{3}{1} \binom{3}{0} K_{0} \Delta Q_1
;$$
$$N_1 = 
 \frac{3}{6} K_{1} \Delta Q_0
+\frac{3}{6} K_{0} \Delta Q_1
.$$

$$N_2 = \binom{6}{2}^{-1} \sum_{i=0}^{2} \binom{3}{i} \binom{3}{2-i} K_{2-i} \Delta Q_i;$$
$$N_2 = 
 \binom{6}{2}^{-1} \binom{3}{0} \binom{3}{2} K_{2} \Delta Q_0
+\binom{6}{2}^{-1} \binom{3}{1} \binom{3}{1} K_{1} \Delta Q_1
+\binom{6}{2}^{-1} \binom{3}{2} \binom{3}{0} K_{0} \Delta Q_2
;$$
$$N_2 = 
 \frac{3}{15} K_{2} \Delta Q_0
+\frac{9}{15} K_{1} \Delta Q_1
+\frac{3}{15} K_{0} \Delta Q_2
.$$

$$N_3 = \binom{6}{3}^{-1} \sum_{i=0}^{3} \binom{3}{i} \binom{3}{3-i} K_{3-i} \Delta Q_i;$$
$$N_3 = 
 \binom{6}{3}^{-1} \binom{3}{0} \binom{3}{3} K_{3} \Delta Q_0
+\binom{6}{3}^{-1} \binom{3}{1} \binom{3}{2} K_{2} \Delta Q_1
+\binom{6}{3}^{-1} \binom{3}{2} \binom{3}{1} K_{1} \Delta Q_2
+\binom{6}{3}^{-1} \binom{3}{3} \binom{3}{0} K_{0} \Delta Q_3
;$$
$$N_3 = 
 \frac{1}{20} K_{3} \Delta Q_0
+\frac{9}{20} K_{2} \Delta Q_1
+\frac{9}{20} K_{1} \Delta Q_2
+\frac{1}{20} K_{0} \Delta Q_3
.$$

$$N_4 = \binom{6}{4}^{-1} \sum_{i=1}^{3} \binom{3}{i} \binom{3}{4-i} K_{4-i} \Delta Q_i;$$

$$N_4 = 
 \binom{6}{4}^{-1} \binom{3}{1} \binom{3}{3} K_{3} \Delta Q_1
+\binom{6}{4}^{-1} \binom{3}{2} \binom{3}{2} K_{2} \Delta Q_2
+\binom{6}{4}^{-1} \binom{3}{3} \binom{3}{1} K_{1} \Delta Q_3
;$$
$$N_4 = 
 \frac{3}{15} K_{3} \Delta Q_1
+\frac{9}{15} K_{2} \Delta Q_2
+\frac{3}{15} K_{1} \Delta Q_3
.$$

$$N_5 = \binom{6}{5}^{-1} \sum_{i=2}^{3} \binom{3}{i} \binom{3}{5-i} K_{5-i} \Delta Q_i;$$
$$N_5 = 
 \binom{6}{5}^{-1} \binom{3}{2} \binom{3}{3} K_{3} \Delta Q_2
+\binom{6}{5}^{-1} \binom{3}{3} \binom{3}{2} K_{2} \Delta Q_3
;$$
$$N_5 = 
 \frac{3}{6} K_{3} \Delta Q_2
+\frac{3}{6} K_{2} \Delta Q_3
.$$


$$N_6 = \binom{6}{6}^{-1} \sum_{i=\max(0,6-3)}^{\min(3,6)} \binom{3}{i} \binom{3}{6-i} K_{6-i} \Delta Q_i;$$
$$N_6 = K_3 \Delta Q_3.$$


Попробуем сложить
$$M_0 + 2 N_0
= \Delta K_{0} Q_0 + 2 K_{0} \Delta Q_0
= (K_1 - K_0) Q_0 + 2 K_0 (Q_1 - Q_0)
= K_1 Q_0 + 2 K_0 Q_1 - 3 K_0 Q_0
.$$

$$M_1 +2 N_1 =  
\frac{2}{6} \Delta K_{1} Q_0+\frac{4}{6} \Delta K_{0} Q_1
+2 \left(\frac{3}{6} K_{1} \Delta Q_0 +\frac{3}{6} K_{0} \Delta Q_1 \right).$$

$$M_2 + 2 N_2=  \frac{1}{15} \Delta K_{2} Q_0+\frac{8}{15} \Delta K_{1} Q_1+\frac{6}{15} \Delta K_{0} Q_2
+2 \left(\frac{3}{15} K_{2} \Delta Q_0+\frac{9}{15} K_{1} \Delta Q_1+\frac{3}{15} K_{0} \Delta Q_2 \right).$$

$$M_3 + 2 N_3 =  \frac{4}{20} \Delta K_{2} Q_1+\frac{12}{20} \Delta K_{1} Q_2+\frac{4}{20} \Delta K_{0} Q_3
+2 \left(\frac{1}{20} K_{3} \Delta Q_0+\frac{9}{20} K_{2} \Delta Q_1+\frac{9}{20} K_{1} \Delta Q_2+\frac{1}{20} K_{0} \Delta Q_3 \right).$$

$$M_4 + 2 N_4=  \frac{6}{15} \Delta K_{2} Q_2+\frac{8}{15} \Delta K_{1} Q_3+\frac{1}{15} \Delta K_{0} Q_4
+2 \left(\frac{3}{15} K_{3} \Delta Q_1+\frac{9}{15} K_{2} \Delta Q_2+\frac{3}{15} K_{1} \Delta Q_3 \right).$$

$$M_5 + 2N_5 =  \frac{4}{6} \Delta K_{2} Q_3+\frac{2}{6} \Delta K_{1} Q_4
+2 \left(\frac{3}{6} K_{3} \Delta Q_2+\frac{3}{6} K_{2} \Delta Q_3 \right).$$

$$M_6 + 2N_6 = \Delta K_{2} Q_4 + 2 K_3 \Delta Q_3
=
(K_3 - K_2)Q_4 + 2 K_3 (Q_4 - Q_3)
.$$
