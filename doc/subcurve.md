# Проверка, является ли кривая B частью кривой A

Кривые Безье A и B степени не более 3.\
Решим задачу только для одной координаты, полагая, что по второй координате задача аналогична.

Дано: 
Кривые в виде полиномов
$$A(t) = A_0 + A_1 t + A_2 t^2 + A_3 t^3;$$
$$B(t) = B_0 + A_1 t + B_2 t^2 + B_3 t^3;$$

Найти такие a и b, чтобы
$$\forall t:\: A\left(\frac{t-a}{b-a}\right) = B(t).$$


$$\begin{gathered}
	A\left(\frac{t-a}{b-a}\right) =
	A_0 
	+A_1 \left(\frac{t-a}{b-a}\right) 
	+A_2 \left(\frac{t-a}{b-a}\right)^2 
	+A_3 \left(\frac{t-a}{b-a}\right)^3
	= \\ =
	A_0 
	+\frac{A_1}{b-a} \left(t-a\right) 
	+\frac{A_2}{(b-a)^2} \left(t^2-2at + a^2\right) 
	+\frac{A_3}{(b-a)^3} \left(t^3-3at^2 + 3 a^2t - a^3\right)
	= \\ =
	A_0
	+\frac{A_1t}{b-a}  
	-\frac{A_1a}{b-a}  
	+\frac{A_2t^2}{(b-a)^2} 
	-\frac{2A_2at}{(b-a)^2}  
	+\frac{A_2a^2}{(b-a)^2} 
	+\frac{A_3t^3}{(b-a)^3} 
	-\frac{3A_3at^2}{(b-a)^3} 
	+\frac{3A_3a^2t}{(b-a)^3} 
	-\frac{A_3a^3}{(b-a)^3} 
	= \\ =
	\left(
	A_0
	-\frac{A_1a}{b-a}  
	+\frac{A_2a^2}{(b-a)^2} 
	-\frac{A_3a^3}{(b-a)^3} 
	\right)
	+
	\left(
	\frac{A_1}{b-a}  
	-\frac{2A_2a}{(b-a)^2}  
	+\frac{3A_3a^2}{(b-a)^3} 
	\right)t
	+
	\left(
	\frac{A_2}{(b-a)^2} 
	-\frac{3A_3a}{(b-a)^3} 
	\right)t^2
	+\frac{A_3t^3}{(b-a)^3}.
	
\end{gathered}$$
	
Этакое уравнение может быть тождественно B(t) только при равенстве всех коэффициентов при t.
Запишем
$$\left\{\begin{gathered}
	A_0
	-\frac{A_1a}{b-a}  
	+\frac{A_2a^2}{(b-a)^2} 
	-\frac{A_3a^3}{(b-a)^3} 
	= B_0, \\
	\frac{A_1}{b-a}  
	-\frac{2A_2a}{(b-a)^2}  
	+\frac{3A_3a^2}{(b-a)^3} 
	= B_1, \\
	\frac{A_2}{(b-a)^2} 
	-\frac{3A_3a}{(b-a)^3} 
	= B_2, \\
	\frac{A_3}{(b-a)^3} = B_3.
\end{gathered}\right.$$

Если эта система имеет решения, значит кривые A и B - это участки одной кривой.

Введём переменную $m = b-a$:

$$\left\{\begin{gathered}
	A_0 - \frac{A_1a}{m} + \frac{A_2a^2}{m^2} - \frac{A_3a^3}{m^3} = B_0, \\
	\frac{A_1}{m} - \frac{2A_2a}{m^2} + \frac{3A_3a^2}{m^3}= B_1, \\
	\frac{A_2}{m^2} - \frac{3A_3a}{m^3}= B_2, \\
	\frac{A_3}{m^3} = B_3;
\end{gathered}\right.
$$

$m$ можно найти из уравнения высшей степени

$$
\left\{\begin{gathered}
 m^3 = \frac{A_3}{B_3},\\
 A_3 \ne 0,\\
 B_3 \ne 0.
\end{gathered}\right.
$$

$$
\left\{\begin{gathered}
 \frac{A_2}{m^2} -\frac{3A_3a}{m^3} = B_2,\\
 A_2 \ne 0,
 B_2 \ne 0,\\
 A_3 = 0,
 B_3 = 0;
\end{gathered}\right.
\Rightarrow
\left\{\begin{gathered}
 m^2 = \frac{A_2}{B_2},\\
 A_2 \ne 0,
 B_2 \ne 0,\\
 A_3 = 0,
 B_3 = 0.
\end{gathered}\right.
$$
	
$$
\left\{\begin{gathered}
 \frac{A_1}{b-a} - \frac{2A_2a}{(b-a)^2} + \frac{3A_3a^2}{(b-a)^3} = B_1,\\
 A_1 \ne 0, B_1 \ne 0,\\
 A_2 = 0, B_2 = 0,\\
 A_3 = 0, B_3 = 0,
\end{gathered}\right.
\Rightarrow
\left\{\begin{gathered}
 m = \frac{A_1}{B_1},\\
 A_1 \ne 0, B_1 \ne 0,\\
 A_2 = 0, B_2 = 0,\\
 A_3 = 0, B_3 = 0.
\end{gathered}\right.
$$

Уравнение следующей степени легко решить относительно $a$

$$
\left\{\begin{gathered}
\frac{A_2}{m^2} - \frac{3A_3a}{m^3}= B_2, \\
 A_3 \ne 0,\\
 B_3 \ne 0;
\end{gathered}\right.
\Rightarrow
\left\{\begin{gathered}
 a = \frac{m^3}{3A_3}\left(\frac{A_2}{m^2} - B_2 \right), \\
 A_3 \ne 0,\\
 B_3 \ne 0.
\end{gathered}\right.
$$

$$
\left\{\begin{gathered}
 \frac{A_1}{m} - \frac{2A_2a}{m^2} + \frac{3A_3a^2}{m^3}= B_1, \\
 A_2 \ne 0,
 B_2 \ne 0,\\
 A_3 = 0,
 B_3 = 0;
\end{gathered}\right.
\Rightarrow
\left\{\begin{gathered}
 a = \frac{m^2}{2A_2}\left(\frac{A_1}{m} - B_1 \right), \\
 A_2 \ne 0,
 B_2 \ne 0,\\
 A_3 = 0,
 B_3 = 0.
\end{gathered}\right.
$$

$$
\left\{\begin{gathered}
 A_0 - \frac{A_1a}{m} + \frac{A_2a^2}{m^2} - \frac{A_3a^3}{m^3} = B_0, \\
 A_1 \ne 0, B_1 \ne 0,\\
 A_2 = 0, B_2 = 0,\\
 A_3 = 0, B_3 = 0;
\end{gathered}\right.
\Rightarrow
\left\{\begin{gathered}
 a = \frac{m}{A_1} \left(A_0 - B_0 \right), \\
 A_1 \ne 0, B_1 \ne 0,\\
 A_2 = 0, B_2 = 0,\\
 A_3 = 0, B_3 = 0.
\end{gathered}\right.
$$

$b$ находится из разности

$$m = b-a \Rightarrow b = m+a.$$

Остальные уравнения (если они остались) следует использовать для проверки решения

$$A_0 - \frac{A_1a}{m} + \frac{A_2a^2}{m^2} - \frac{A_3a^3}{m^3} = B_0;$$
$$A_0 + A_1\left(-\frac{a}{m}\right) + A_2\left(-\frac{a}{m}\right)^2 + A_3\left(-\frac{a}{m}\right)^3 = B_0;$$
$$A\left(-\frac{a}{m}\right) = B_0.$$

$$\frac{A_1}{m} - \frac{2A_2a}{m^2} + \frac{3A_3a^2}{m^3}= B_1;$$
$$A_1 - \frac{2A_2a}{m} + \frac{3A_3a^2}{m^2}= mB_1;$$
$$A_1 + \frac{2A_2a}{-m} + \frac{3A_3a^2}{(-m)^2}= mB_1;$$
$$A_1 + 2A_2\left(-\frac{a}{m}\right) + 3A_3\left(-\frac{a}{m}\right)= mB_1;$$
$$A'(t) = A_1 + 2 A_2 t + 3 A_3 t^3;$$
$$A'\left(-\frac{a}{m}\right) = m B_1.$$


## Алгоритм

$$\left\{\begin{gathered}
 A_3 \ne 0, B_3 \ne 0,\\
 m^3 = \frac{A_3}{B_3},\\
 a = \frac{m^3}{3A_3}\left(\frac{A_2}{m^2} - B_2 \right), \\
 b = m+a,\\
 A'\left(-\frac{a}{m}\right) = m B_1, \\
 A\left(-\frac{a}{m}\right) = B_0. \\
\end{gathered}\right.
$$

$$\left\{\begin{gathered}
 A_3 = 0, B_3 = 0,\\
 A_2 \ne 0, B_2 \ne 0,\\
 m^2 = \frac{A_2}{B_2},\\
 a = \frac{m^2}{2A_2}\left(\frac{A_1}{m} - B_1 \right), \\
 b = m+a,\\
 A\left(-\frac{a}{m}\right) = B_0. \\
\end{gathered}\right.
$$

$$\left\{\begin{gathered}
 A_3 = 0, B_3 = 0,\\
 A_2 = 0, B_2 = 0,\\
 A_1 \ne 0, B_1 \ne 0,\\
 m = \frac{A_1}{B_1},\\
 a = \frac{m}{A_1} \left(A_0 - B_0 \right), \\
 b = m+a.
\end{gathered}\right.
$$

После получения решения нужно сличить между собой $a$ и $b$ полученные для разных координат. Если они примерно равны, значит решение найдено.

## Интерпретация

$a$ и $b$ - Это начало и конец кривой B на кривой A.

Если $a>b$ - кривая B обходится в другую сторону, нужно её развернуть

Если $a \ge 0,\, b \le 1,\, a<b$, значит B - подмножество А.

Если $a \le 0,\, b \ge 1,\, a<b$, значит A - подмножество B.

Если $a = 0,\, b = 1,\, a<b$, значит A и B совпадают.

Если $a \le 0,\, b \le 1,\, a<b$, значит A и B имеют общий отрезок $[0;b]$.

Если $a \ge 0,\, b \ge 1,\, a<b$, значит A и B имеют общий отрезок $[a;1]$.

Если $a = 1,\, a<b$, значит B - это продолжение A на отрезок $[1;b]$.

Если $b = 0,\, a<b$, значит B - это продолжение A на  отрезок $[a;0]$.

Если $a > 1,\, a<b$, значит A и B не имеют общих отрезков, но между ними может быть исключённый отрезок $[0;a]$.

Если $b < 0,\, a<b$, значит A и B не имеют общих отрезков, но между ними может быть исключённый отрезок $[b;0]$.

## Пересчёт относительно B

$$a_B = -\frac{a}{b-a};$$
$$b_B = \frac{1-a}{b-a}.$$