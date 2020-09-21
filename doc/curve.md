# Bezier Curve

## Определение кривой Безье

$$P(t) = \sum_{i=0}^n B_i J_{n,i}(t).$$

$$J_{n,i} = \binom{n}{i} t^i (1-t)^{n-i}.$$

Действует только при соглащении, что $0^0 = 1$.

$$P_3(t) = \sum_{i=0}^3 B_i J_{n,i}(t).$$

$$J_{3,0} = (1-t)^3;$$
$$J_{3,1} = 3 t (1-t)^2;$$
$$J_{3,2} = 3 t^2 (1-t);$$
$$J_{3,3} = t^3.$$

## Первая производная

$$\dot P_3(t) = \sum_{i=0}^3 B_i \dot J_{3,i}(t).$$

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

$$\dot P_3 = 3 P_{2,\dot B};$$

## Вторая производная

$$\dot P_3 = 3 P_{2,\dot B};$$
$$\ddot P_3 = 3 \dot P_{2,\dot B};$$

$$J_{2,0} = (1-t)^2;$$
$$J_{2,1} = 2 t(1-t) = 2(t-t^2);$$
$$J_{2,2} = t^2.$$

$$dot J_{2,0} = -2(1-t);$$
$$dot J_{2,1} = 2 (1-2t);$$
$$dot J_{2,2} = 2t.$$

$$\dot P_{2,\dot B} = -2(1-t)\dot B_0 + 2 (1-2t) \dot B_1 + 2t \dot B_2;$$
$$\frac{\dot P_{2,\dot B}}{2} = -(1-t)\dot B_0 + (1-t) \dot B_1 + (-t) \dot B_1 + t \dot B_2;$$
$$\frac{\dot P_{2,\dot B}}{2} = (1-t) (\dot B_1 - \dot B_0) + t (\dot B_2 - \dot B_1);$$
$$\dot P_{2,\dot B} = 2 P_{1,\ddot B}.$$

$$\ddot P_{3,B} = 6 P_{1,\ddot B};$$

## Кривизна

$$k=\frac{\dot P \times \ddot P}{\left|\dot P\right|^3}.$$

$$k_3
=\frac{\dot P_{3,B} \times \ddot P_{3,B}}{\left|\dot P_{3,B}\right|^3}
=\frac{(3 P_{2,\dot B}) \times (6 P_{1,\ddot B})}{\left|3 P_{2,\dot B}\right|^3}
=\frac{18(P_{2,\dot B}) \times (P_{1,\ddot B})}{27\left|P_{2,\dot B}\right|^3}
=\frac{2(P_{2,\dot B}) \times (P_{1,\ddot B})}{3\left|P_{2,\dot B}\right|^3}
$$
