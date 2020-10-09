## Улучшение точки пересечения

Пусть даны две кривые 
$$\vec A = f(t); \vec B = g(t);$$

и хорошее приближение точки их пересечения

$$f(t) \approx g(s).$$

Штрихами будем обозначать производные функций по единственному аргументу.

Надо итеративно улучшить значения t и s для более точного приближения.

Введём функцию ошибки

$$D(t,s) = f(t) - g(s).$$

Функции - векторные от скаляра. Их разность - вектор.

$$D(t,s) = 0;$$

$$\frac{\partial D}{\partial t} = f'(t)$$
$$\frac{\partial D}{\partial s} = -g'(s)$$

Матрица Якоби

$$F 
= \begin{pmatrix}
\frac{\partial D_x}{\partial t} &&
\frac{\partial D_x}{\partial s} \\
\frac{\partial D_y}{\partial t} &&
\frac{\partial D_y}{\partial s} \\
\end{pmatrix}
= \begin{pmatrix}
f'_x(t) && -g'_x(s) \\
f'_y(t) && -g'_y(s) \\
\end{pmatrix}
$$

$$x_{k+1} = x_{k} - F(x_k)^{-1} D(x_k);$$

$$F^{-1} 
= \frac{1}{|F|}F_{*}^T
= \frac{1}{- f'_x g'_y + f'_y g'_x} 
\begin{pmatrix}
-g'_y && g'_x \\
-f'_y && f'_x
\end{pmatrix}
$$

Обозначим поворот на 90° матрицей
$$R = \begin{pmatrix}0 & -1 \\ 1 & 0 \end{pmatrix}$$

$$
F^{-1} 
= \frac{1}{g' \times f'}
\begin{pmatrix}
(R \vec g)^T \\
(R \vec f)^T
\end{pmatrix}
$$


$$F(x_k)^{-1} D(x_k)
= 
\frac{1}{g' \times f'}
\begin{pmatrix}
(R \vec g)^T \\
(R \vec f)^T
\end{pmatrix}
=
\frac{1}{g' \times f'}
\begin{pmatrix}
(R \vec g) \cdot \vec D \\
(R \vec f) \cdot \vec D
\end{pmatrix}
$$

$$
\begin{pmatrix}
t_{k+1} \\ s_{k+1}
\end{pmatrix}
=
\begin{pmatrix}
t_{k} \\ s_{k}
\end{pmatrix}
-
\frac{1}{g'(s_{k}) \times f'(t_{k})}
\begin{pmatrix}
(R \vec g(s_{k})) \cdot \vec D(t_{k},s_{k}) \\
(R \vec f(t_{k})) \cdot \vec D(t_{k},s_{k})
\end{pmatrix}
$$
$$