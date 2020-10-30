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
