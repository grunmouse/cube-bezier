# Самопересечение кубической кривой

Пусть кривая задана полиномами

$$
\left\{
\begin{gathered}
x = A_1t^3+A_2t^2+A_3t + A_4, \\
y = B_1t^3+B_2t^2+B_3t + B_4.
\end{gathered}
\right.
$$

В точке пересечения
$$
\left\{
\begin{gathered}
x_1 = x_2, \\
y_1 = y_2, \\
t_1 \ne t_2.
\end{gathered}
\right.
$$

Получаем уравнения

$$
\left\{
\begin{gathered}
A_1t_1^3+A_2t_1^2+A_3t_1 + A_4 = A_1t_2^3+A_2t_2^2+A_3t_2 + A_4, \\
B_1t_1^3+B_2t_1^2+B_3t_1 + B_4 = B_1t_2^3+B_2t_2^2+B_3t_2 + B_4;
\end{gathered}
\right.
\Rightarrow
\left\{
\begin{gathered}
A_1t_1^3+A_2t_1^2+A_3t_1 = A_1t_2^3+A_2t_2^2+A_3t_2, \\
B_1t_1^3+B_2t_1^2+B_3t_1 = B_1t_2^3+B_2t_2^2+B_3t_2;
\end{gathered}
\right.
$$

Заменим $t_2 = t_1+a,\, a \ne 0$;

$$
\left\{
\begin{gathered}
A_1t_1^3+A_2t_1^2+A_3t_1 = A_1(t_1+a)^3+A_2(t_1+a)^2+A_3(t_1+a), \\
B_1t_1^3+B_2t_1^2+B_3t_1 = B_1(t_1+a)^3+B_2(t_1+a)^2+B_3(t_1+a);
\end{gathered}
\right.
$$

$$\begin{gathered}
A_1(t_1+a)^3+A_2(t_1+a)^2+A_3(t_1+a) 
= A_1(t_1^3+3t_1^2a+3t_1a^2+a^3)+A_2(t_1^2+2t_1a+a^2)+A_3(t_1+a)
= \\
= A_1 t_1^3 + 3 A_1 t_1^2 a + A_2 t_1^2 + 3 A_1 t_1 a^2 + 2 A_2 t_1 a + A_3 t_1 + A_1 a^3 + A_2 a^2 + A_3 a;
\end{gathered}$$

$$ A_1 t_1^3 + A_2 t_1^2 + A_3 t_1 = 
A_1 t_1^3 + 3 A_1 t_1^2 a + A_2 t_1^2 + 3 A_1 t_1 a^2 + 2 A_2 t_1 a + A_3 t_1 + A_1 a^3 + A_2 a^2 + A_3 a;$$
$$0 = 3 A_1 t_1^2 a + 3 A_1 t_1 a^2 + 2 A_2 t_1 a + A_1 a^3 + A_2 a^2 + A_3 a;$$
$$3 A_1 t_1^2 + 3 A_1 t_1 a + 2 A_2 t_1 + A_1 a^2 + A_2 a + A_3 = 0;$$
$$3 A_1 t_1^2 + (3 A_1 a + 2 A_2) t_1 + (A_1 a^2 + A_2 a + A_3) = 0;$$

Т.к. уравнение для $y$ аналогично,
$$
\left\{
\begin{gathered}
3 A_1 t_1^2 + (3 A_1 a + 2 A_2) t_1 + (A_1 a^2 + A_2 a + A_3) = 0,\\
3 B_1 t_1^2 + (3 B_1 a + 2 B_2) t_1 + (B_1 a^2 + B_2 a + B_3) = 0.
\end{gathered}
\right.
$$