## Другой метод расчёта

Пусть есть ломаная $B$, $B_0\, \dots B_n$ - её вершины

Найти пару ломаных, отстоящих от неё на $s$ в обе стороны.

Введём
$$\dot B_i = B_{i+1}-B_i.$$

Обозначим
$$\vec{s}_i = s \begin{pmatrix}
0 & -1\\
1 & 0
\end{pmatrix} \dot B_i^0;$$

$$\vec e_{i} = \vec s_{i}^0 = \begin{pmatrix}
0 & -1\\
1 & 0
\end{pmatrix} \dot B_i^0;$$

Найдём вектор $\vec r_i$ из четырёхугольника, образованного точками:
$$\begin{gathered}
B_i, \\
B_i + \vec{s}_{i-1}, \\
B_i + \vec{s}_{i}, \\
B_i + \vec{r}_{i}
\end{gathered}$$
Угол при точке $B$ назовём $\theta$

Если известно, что он симметричен относительно оси $B_i - (B_i + \vec{r}_{i})$, а углы при боковых точках - прямые.

Вычтем $B_i$,

$$\begin{gathered}
0, \\
\vec{s}_{i-1}, \\
\vec{s}_{i}, \\
\vec{r}_{i}
\end{gathered}$$


Из свойств четырёхугольника следует:
$$\begin{gathered}
\left|\vec{s}_{i-1}\right| = \left|\vec{s}_{i}\right| = s;\\
\left|\vec{r}_i - \vec{s}_{i-1}\right| = \left|\vec{r}_i - \vec{s}_{i}\right|;\\
\left|\vec{r}_i\right| = \frac{s}{ \cos\frac{\theta}{2}};\\
\vec{r}_i = \left|\vec{r}_i\right| \left(\vec s_{i-1}+\vec s_{i}\right)^0.
\end{gathered}$$

Найдём угол

$$\cos\theta = \vec e_{i-1}\cdot \vec e_i;$$

$$\cos\theta = 2\cos^2\frac{\theta}{2} - 1;$$
$$\cos^2\frac{\theta}{2} = \frac{1}{2}\cos\theta + \frac{1}{2};$$

$$\left|\vec s_{i-1}+\vec s_{i}\right|^2 = 
\left|\vec{s}_{i-1}\right|^2 + \left|\vec{s}_{i}\right|^2
 - 
 \left|\vec{s}_{i-1}\right| \left|\vec{s}_{i}\right| \cos\left(\pi-\theta\right)
=
2s^2\left(1 + \cos\theta \right);
$$
 
$$\vec{r}_i = \left|\vec{r}_i\right| \left(\vec s_{i-1}+\vec s_{i}\right)^0
= \left|\vec{r}_i\right| \frac{\vec s_{i-1}+\vec s_{i}}{\left|\vec s_{i-1}+\vec s_{i}\right|}
= \left(\vec s_{i-1}+\vec s_{i}\right) \frac{\left|\vec{r}_i\right|}{\left|\vec s_{i-1}+\vec s_{i}\right|}
.$$

$$\frac{\left|\vec{r}_i\right|}{\left|\vec s_{i-1}+\vec s_{i}\right|}
= 
\sqrt{
	\frac{\left|\vec{r}_i\right|^2}{\left|\vec s_{i-1}+\vec s_{i}\right|^2}
};$$

$$\left|\vec{r}_i\right|^2 
= \frac{s^2}{ \cos^2\frac{\theta}{2}}
= \frac{s^2}{ \frac{1}{2}\cos\theta + \frac{1}{2}}
= \frac{2s^2}{ \cos\theta + 1}
;$$


$$\frac{\left|\vec{r}_i\right|^2}{\left|\vec s_{i-1}+\vec s_{i}\right|^2}
=
\frac{2s^2}{ \cos\theta + 1}
\cdot
\frac{1}{2s^2\left(1 + \cos\theta \right)}
= \frac{1}{\left(1 + \cos\theta \right)^2};
$$

$$\frac{\left|\vec{r}_i\right|}{\left|\vec s_{i-1}+\vec s_{i}\right|}
=
\frac{1}{1 + \cos\theta}.
$$

$$\vec{r}_i = 
\frac{\vec s_{i-1}+\vec s_{i}}{1 + \cos\theta}.
=
\frac{\vec s_{i-1}+\vec s_{i}}{1 + \vec e_{i-1}\cdot \vec e_i}.
$$

$$\vec{r}_i = s \frac{\vec e_{i-1}+\vec e_{i}}{1 + \vec e_{i-1}\cdot \vec e_i}.$$

