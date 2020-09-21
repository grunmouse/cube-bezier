# Bezier Curve

## Определение кривой Безье

$$P(t) = \sum_{i=0}^n B_i J_{n,i}(t).$$

$$J_{n,i} = \binom{n}{i} t^i (1-t)^{n-i}.$$

Действует только при соглащении, что $0^0 = 1$.

$$J_{3,0} = (1-t)^3;$$
$$J_{3,1} = 3 t (1-t)^2;$$
$$J_{3,2} = 3 t^2 (1-t);$$
$$J_{3,3} = t^3.$$

## Первая производная

$$\dot P(t) = \sum_{i=0}^n B_i \dot J_{n,i}(t).$$

$$\dot J_{3,0} = -3 (1-t)^2;$$
$$\dot J_{3,1} = 3 ((1-t)^2 - 2t(1-t));$$
$$\dot J_{3,2} = 3 (2t (1-t) - t^2);$$
$$\dot J_{3,3} = 3 t^2.$$

$$\dot P_3(t) = -3 (1-t)^2 B_0 + 3 ((1-t)^2 - 2t(1-t)) B_1 + 3 (2t (1-t) - t^2) B_2 + 3 t^2 B_3;$$

$$\frac {\dot P_3}{3} = -(1-t)^2 B_0 + (1-t)^2 B_1 - 2t(1-t) B_1 + 2t (1-t) B_2 - t^2 B_2 + t^2 B_3;$$

$$\frac {\dot P_3}{3} = (1-t)^2 (B_1-B_0) + 2t(1-t)(B_2- B_1) + t^2 (B_3-B_2 );$$

$$\frac {\dot P_3}{3} = t^0(1-t)^{2-0} (B_{0+1}-B_0) + 2 t^1(1-t)^{2-1}(B_{1+1}-B_1) + t^2 (1-t)^{2-2}(B_{2+1}-B_2);$$

$$\frac {\dot P_3}{3} = \sum_{i=0}^2 \binom{2}{i} t^i(1-t)^{2-i}(B_{i+1}-B_i);$$

Введём
$$\dot B_i = B_{i+1}-B_i.$$

$$\frac {\dot P_3}{3} = P_{2,\dot B};$$

## Разбиение кривой Безье на две кривые того же порядка

$P_B$ - исходная кривая, $P_C$ и $P_D$ - её части, разбитые в пропорции $t^\star$.


$$
\left\{
\begin{gathered}
P_C(0) = P_B(0),\\
P_C(1) = P_B(t^\star),\\
P_D(0) = P_B(t^\star),\\
P_D(1) = P_B(1),\\
\dot P_C(0) = \dot P_B(0),\\
\dot P_C(1) = \dot P_B(t^\star),\\
\dot P_D(0) = \dot P_B(t^\star),\\
\dot P_D(1) = \dot P_B(1);
\end{gathered}
\right.
$$

$$\dot P_B = 3 P_{\dot B} = 3\sum_{i=0}^2 \binom{2}{i} t^i(1-t)^{2-i}(B_{i+1}-B_i);$$
$$\dot P_B(0) = 3\sum_{i=0}^2 \binom{2}{i} 0^i(1-0)^{2-i}(B_{i+1}-B_i) = 3 (B_1-B_0);$$
$$\dot P_B(1) = 3\sum_{i=0}^2 \binom{2}{i} 1^i(1-1)^{2-i}(B_{i+1}-B_i) = 3 (B_3-B_2);$$
$$\dot P_B(t^\star) = 3 P_{\dot B}(t^\star).$$

$$\dot P_C = 3 \sum_{i=0}^2 \binom{2}{i} t^i(1-t)^{2-i}(C_{i+1}-C_i);$$
$$\dot P_C(0) = 3 (C_1-C_0);$$
$$\dot P_C(1) = 3 (C_3-C_2).$$

$$\dot P_D = 3\sum_{i=0}^2 \binom{2}{i} t^i(1-t)^{2-i}(D_{i+1}-D_i);$$
$$\dot P_D(0) = 3 (D_1-D_0);$$
$$\dot P_D(1) = 3 (D_3-D_2).$$

$$
\left\{
\begin{gathered}
C_0 = B_0,\\
C_3 = P_B(t^\star),\\
D_0 = P_B(t^\star),\\
D_3 = B_3,\\
3 (C_1-C_0) = 3 (B_1-B_0),\\
3 (C_3-C_2) = 3 P_{\dot B}(t^\star),\\
3 (D_1-D_0) = 3 P_{\dot B}(t^\star),\\
3 (D_3-D_2) = 3 (B_3-B_2);\\
\end{gathered}
\right.
\Rightarrow
\left\{
\begin{gathered}
C_0 = B_0,\\
C_1 = B_1,\\
C_3 = P_B(t^\star),\\
D_1 = P_B(t^\star),\\
D_2 = B_2,\\
D_3 = B_3,\\
C_2 = C_3 - P_{\dot B}(t^\star),\\
D_1 = D_0 + P_{\dot B}(t^\star).\\
\end{gathered}
\right.
$$