# Ломаная, эквидистантная данной

Пусть есть ломаная $B$, $B_0\, \dots B_n$ - её вершины

Найти пару ломаных, отстоящих от неё на $s$ в обе стороны.

Введём
$$\dot B_i = B_{i+1}-B_i.$$

Обозначим
$$\vec{s}_i = s \begin{pmatrix}
0 & -1\\
1 & 0
\end{pmatrix} \dot B_i^0;$$
$$\begin{gathered}
\left|\vec{s}_i\right| = s,\\
\vec{s}_i \perp \dot B_i,\\
\dot B_i \times \vec{s}_i >0.
\end{gathered}$$

Пусть в каждая точка искомых кривых отстоит от точки $B_i$ на вектор $\vec{r}_i$.

$$C_{i,\pm} = B_i \pm \vec{r}.$$

Знаки плюс и минус дают нам две ломаные слева и справа от данной.

Для первой и последней точек

$$\vec{r}_0 = \vec{s}_0;$$

$$\vec{r}_n = \vec{s}_{n-1}.$$

Для промежуточных точек найдём пересечение соответствующих линий ломаной.
Каждая линия ломаной

$$\begin{gathered}
C_iC_{i+1} \upuparrows B_iB_{i+1},\\
(B_i + \vec{s}_i) \in C_iC_{i+1};
\end{gathered}$$

отсюда параметрическое уравнение

$$C_iC_{i+1} : \vec{P} = B_i + \vec{s}_i + t\dot B_i.$$

Соответственно:
$$C_{i-1}C_{i} : \vec{P} = B_{i-1} + \vec{s}_{i-1} + t\dot B_{i-1}.$$

Найдём их пересечение:

$$B_{i} + \vec{s}_i + t_1 \dot B_i = B_{i-1} + \vec{s}_{i-1} + t_0 \dot B_{i-1};$$

$$t_0 \dot B_{i-1} - t_1 \dot B_i = B_i - B_{i-1} + \vec{s}_{i} - \vec{s}_{i-1};$$

Обозначим

$$D_i = B_i - B_{i-1} + \vec{s}_{i} - \vec{s}_{i-1}.$$

В проекциях:
$$\left\{
\begin{gathered}
t_0\dot B_{i,x} - t_1\dot B_{i-1,x} = D_{i,x},\\
t_0\dot B_{i,y} - t_1\dot B_{i-1,y} = D_{i,y};
\end{gathered}
\right.
$$

$$
\begin{pmatrix}
\dot B_{i,x} & -\dot B_{i-1,x}\\
\dot B_{i,y} & -\dot B_{i-1,y}
\end{pmatrix}
\begin{pmatrix}
t_0 \\ t_1
\end{pmatrix}
=
\begin{pmatrix}
D_{i,x}\\
D_{i,y}
\end{pmatrix}.
$$

По Крамеру
$$
\Delta = \begin{vmatrix}
\dot B_{i,x} & -\dot B_{i-1,x}\\
\dot B_{i,y} & -\dot B_{i-1,y}
\end{vmatrix}
=
\dot B_{i} \times (-\dot B_{i-1}) =
-\dot B_{i} \times \dot B_{i-1}
=
\dot B_{i-1} \times \dot B_{i}
$$

$$\Delta_0 = \begin{vmatrix}
D_{i,x} & -\dot B_{i-1,x}\\
D_{i,y} & -\dot B_{i-1,y}
\end{vmatrix}
= - D_{i} \times \dot B_{i-1} =
\dot B_{i-1} \times D_{i}.
$$

$$
\Delta_1 = \begin{vmatrix}
\dot B_{i,x} & D_{i,x}\\
\dot B_{i,y} & D_{i,y}
\end{vmatrix} =
\dot B_{i} \times D_{i}.
$$

$$
t_0 = \frac{\Delta_0}{\Delta},\,
t_1 = \frac{\Delta_1}{\Delta}
.$$

Искомая точка 
$$\vec{P}_i 
= B_i + \vec{s}_i + t_1\dot B_i
= B_i + \vec{s}_i + \frac{\dot B_{i} \times D_{i}}{\dot B_{i-1} \times \dot B_{i}}\dot B_i.$$

$$\vec{r}_i = \vec{P}_i - B_i;$$

$$\vec{r}_i = \vec{s}_i + \frac{\dot B_{i} \times D_{i}}{\dot B_{i-1} \times \dot B_{i}}\dot B_i;$$
где

$$D_i = B_i - B_{i-1} + \vec{s}_{i} - \vec{s}_{i-1} = \dot B_{i-1} + \vec{s}_{i} - \vec{s}_{i-1}.$$

Обозначим

$$\dot{\vec{s}}_{i-1} = \vec{s}_{i} - \vec{s}_{i-1};$$
И попробуем упростить

$$D_i = \dot B_{i-1} + \dot{\vec{s}}_{i-1};$$

$$\vec{r}_i = \vec{s}_i + \frac{\dot B_{i} \times (\dot B_{i-1} + \dot{\vec{s}}_{i-1})}{\dot B_{i-1} \times \dot B_{i}}\dot B_i;$$
$$\vec{r}_i = \vec{s}_i + \frac{\dot B_{i} \times \dot B_{i-1} + \dot B_{i} \times \dot{\vec{s}}_{i-1}}{\dot B_{i-1} \times \dot B_{i}}\dot B_i;$$
$$\vec{r}_i = \vec{s}_i + 
\left(
\frac{\dot B_{i} \times \dot{\vec{s}}_{i-1}}{\dot B_{i-1} \times \dot B_{i}} - 1
\right)
\dot B_i.$$

$$\dot{\vec{s}}_{i-1} = \vec{s}_{i} - \vec{s}_{i-1}
=
s \begin{pmatrix}
0 & -1\\
1 & 0
\end{pmatrix} \dot B_i^0
-
s \begin{pmatrix}
0 & -1\\
1 & 0
\end{pmatrix} \dot B_{i-1}^0
= 
s \begin{pmatrix}
0 & -1\\
1 & 0
\end{pmatrix}
\left(\dot B_i^0 - \dot B_{i-1}^0 \right)
;$$

Обозначим
$$\dot B_i^0 = \begin{pmatrix} \cos\alpha_i \\ \cos\beta_i \end{pmatrix};$$

$$\dot{\vec{s}}_{i-1} 
=
s \begin{pmatrix}
0 & -1\\
1 & 0
\end{pmatrix}
\begin{pmatrix} 
\cos\alpha_i - \cos\alpha_{i-1} \\ 
\cos\beta_i - \cos\beta_{i-1}
\end{pmatrix} 
;$$

$$\dot{\vec{s}}_{i-1} 
=
s 
\begin{pmatrix} 
-\cos\beta_i + \cos\beta_{i-1} \\
\cos\alpha_i - \cos\alpha_{i-1} 
\end{pmatrix} 
;$$

$$\dot B_i \times \dot{\vec s}_{i-1}
=
s \dot B_i \times 
\begin{pmatrix} 
-\cos\beta_i + \cos\beta_{i-1} \\
\cos\alpha_i - \cos\alpha_{i-1} 
\end{pmatrix}
=
s
\begin{vmatrix}
	\dot B_{i,x}	& \dot B_{i,y} \\
	-\cos\beta_i + \cos\beta_{i-1} & \cos\alpha_i - \cos\alpha_{i-1} 
\end{vmatrix};
$$

$$\dot B_i \times \dot{\vec s}_{i-1}
= s\left( \dot B_{i,x} \left( \cos\alpha_i - \cos\alpha_{i-1} \right)
-\dot B_{i,y} \left(-\cos\beta_i + \cos\beta_{i-1} \right)
\right);
$$

$$\dot B_i \times \dot{\vec s}_{i-1}
= s\left( \dot B_{i,x} \left( \cos\alpha_i - \cos\alpha_{i-1} \right)
+\dot B_{i,y} \left(\cos\beta_i - \cos\beta_{i-1} \right)
\right)
= s \dot B_{i} \cdot \begin{pmatrix}
\cos\alpha_i - \cos\alpha_{i-1}
\cos\beta_i - \cos\beta_{i-1}
\end{pmatrix};
$$

$$\dot B_i \times \dot{\vec s}_{i-1}
= s \dot B_{i} \cdot \left(\dot B_i^0 - \dot B_{i-1}^0 \right)
= s \left(\dot B_{i} \cdot \dot B_i^0 - \dot B_{i} \cdot \dot B_{i-1}^0 \right)
= s \left(\left|\dot B_{i}\right| \dot B_{i}^0 \cdot \dot B_i^0 - \frac{\dot B_{i} \cdot \dot B_{i-1}}{\left|B_{i-1}\right|} \right)
$$

$$\dot B_i \times \dot{\vec s}_{i-1}
= s \left(\left|\dot B_{i}\right| - \frac{\dot B_{i} \cdot \dot B_{i-1}}{\left|B_{i-1}\right|} \right)
$$
