# Восстановление разбитой кривой Безье

Пусть кривая A разбита на две кривые B и C в пропорции t.\
Дано: B, C,\
Надо: A, t

Выразим разбиение кривой A.

$$\begin{gathered}
A'_0 = (1-t)A_0 + tA_1,\\
A'_1 = (1-t)A_1 + tA_2,\\
A'_2 = (1-t)A_2 + tA_3,\\
A''_0 = (1-t)A'_0 + tA'_1,\\
A''_1 = (1-t)A'_1 + tA'_2,\\
A'''_0 = (1-t)A''_0 + tA''_1;
\end{gathered}$$

$$\begin{gathered}
B_0 = A_0,\\
B_1 = A'_0,\\
B_2 = A''_0,\\
B_3 = A'''_0;
\end{gathered}$$

$$\begin{gathered}
C_0 = A'''_0,\\
C_1 = A''_1,\\
C_2 = A'_2,\\
C_3 = A_3;
\end{gathered}$$

Таким образом
$$A = [B_0, A_1, A_2, C_3];$$
$$A' = [B_1, A'_1, C_2];$$
$$A'' = [B_2, C_1];$$
$$A'''_0 = B_3 = C_0.$$

Уравнение $A'''_0$ разрешимо относительно $t$.
$$\begin{gathered}
A'''_0 = (1-t)A''_0 + tA''_1;\\
B_3 = (1-t)B_2 + tC_1;\\
B_3 = B_2 - tB_2 + tC_1;\\
B_3 - B_2 = t(-B_2 + tC_1);\\
t = \frac{B_3-B_2}{C_1-B_2}.
\end{gathered}$$
У нас вышла операция деления векторов. Смысл этой операции в том, что нам требуется найти коэффициент пропорциональности двух коллинеарных векторов друг другу.

По условию 
$$ B_3-B_2 \upuparrows C_1 - C_0,\, B_3 = C_0; $$
Тогда
$$\begin{gathered}
	B_3 - B_2 \upuparrows C_1 - B_3;\\
	B_3 - B_2 \upuparrows (C_1 - B_3) + (B_3 - B_2);\\
	B_3 - B_2 \upuparrows C_1 - B_2.
\end{gathered}$$

Значит закономерно выражение
$$t = \frac{\left| B_3-B_2 \right|}{\left| C_1-B_2 \right|}.$$

Проверим
$$\begin{gathered}
	1-t = 1 - \frac{\left| B_3-B_2 \right|}{\left| C_1-B_2 \right|};\\
	1-t = \frac{\left| C_1-B_2 \right| - \left| B_3-B_2 \right|}{\left| C_1-B_2 \right|};\\
	C_1-B_2 \upuparrows B_3-B_2,\\
	1-t = \frac{\left| C_1-B_2 - B_3+B_2 \right|}{\left| C_1-B_2 \right|};\\
	1-t = \frac{\left| C_1- B_3 \right|}{\left| C_1-B_2 \right|};\\
	B_3 = C_0,\\
	1-t = \frac{\left| C_1 - C_0 \right|}{\left| C_1-B_2 \right|}.\\
\end{gathered}$$

Распишем взаимосвязь $C_1$ и $B_2$:
$$(C_1-B_2)t = B_3 - B_2;$$
$$(C_1-B_2)(1-t) = C_1 - C_0;$$
$$\frac{B_3 - B_2}{t} = \frac{C_1 - C_0}{1-t};$$
$$C_1 = (B_3 - B_2)\frac{1-t}{t} + C_0;$$
$$B_2 = B_3 - (C_1 - C_0)\frac{t}{1-t};$$
$$C_0 = B_3 = (1-t)B_2 + tC_1.$$

Зная $t$, решим
$$\begin{gathered}
A''_0 = (1-t)A'_0 + tA'_1;\\
B_2 = (1-t)B_1 + tA'_1;\\
B_2 - (1-t)B_1 = tA'_1;\\
A'_1 = \frac{B_2 - (1-t)B_1}{t}.\\
\end{gathered}$$

С другой стороны
$$\begin{gathered}
A''_1 = (1-t)A'_1 + tA'_2;\\
C_1 = (1-t)A'_1 + tC_2;\\
C_1 - tC_2 = (1-t)A'_1;\\
A'_1 = \frac{C_1 - tC_2}{1-t}.
\end{gathered}$$

Значит существует условие 
$$\frac{B_2 - (1-t)B_1}{t} = \frac{C_1 - tC_2}{1-t} 
\Rightarrow 
(1-t)(B_2 - (1-t)B_1) = t(C_1 - tC_2)
.$$

Попробуем проверить
$$\begin{gathered}
(1-t)(B_2 - (1-t)B_1) = t(C_1 - tC_2);\\
(1-t)B_2 - (1-t)^2B_1 = tC_1 - t^2C_2;\\
(1-t)B_2 - (1-t)^2B_1 = (1-t)B_3 - (1-t)B_2 + tC_0 - t^2C_2;\\
(1-t)B_2 - (1-t)^2B_1 = (1-t)B_3 - (1-t)B_2 + tC_0 - t^2C_2;\\
\end{gathered}$$

Теперь найдём $A_1$ и $A_2$:
$$\begin{gathered}
A'_0 = (1-t)A_0 + tA_1;\\
B_1 = (1-t)B_0 + tA_1;\\
B_1 - (1-t)B_0 = tA_1;\\
A_1 = \frac{B_1 - (1-t)B_0}{t}.
\end{gathered}$$

$$\begin{gathered}
A'_2 = (1-t)A_2 + tA_3;\\
C_2 = (1-t)A_2 + tC_3;\\
C_2 - tC_3 = (1-t)A_2;\\
A_2 = \frac{C_2 - tC_3}{1-t}.\\
\end{gathered}$$

Проверим последнее уравнение:
$$\begin{gathered}
A'_1 = (1-t)A_1 + tA_2;\\
\frac{C_1 - tC_2}{1-t} = (1-t)A_1 + t\frac{C_2 - tC_3}{1-t};\\
\frac{C_1 - tC_2}{1-t} - t\frac{C_2 - tC_3}{1-t} = (1-t)A_1;\\
\frac{C_1 - tC_2 - tC_2 + t^2C_3}{1-t} = (1-t)A_1;\\
A_1 = \frac{C_1 - 2tC_2 + t^2C_3}{(1-t)^2};\\
A_1 = \frac{C_1 - t(2C_2 - tC_3)}{(1-t)^2}.\\
\end{gathered}$$

$$\begin{gathered}
A'_1 = (1-t)A_1 + tA_2;\\
\frac{B_2 - (1-t)B_1}{t} = (1-t)\frac{B_1 - (1-t)B_0}{t} + tA_2;\\
\frac{B_2 - (1-t)B_1}{t} - (1-t)\frac{B_1 - (1-t)B_0}{t} = tA_2;\\
\frac{B_2 - (1-t)B_1 - (1-t)B_1 + (1-t)^2B_0}{t} = tA_2;\\
A_2 = \frac{B_2 - 2(1-t)B_1 + (1-t)^2B_0}{t^2};\\
A_2 = \frac{B_2 - (1-t)(2B_1 + (1-t)B_0)}{t^2}.\\
\end{gathered}$$

Следовательно, должны существовать условия
$$\frac{B_1 - (1-t)B_0}{t} = \frac{C_1 - t(2C_2 - tC_3)}{(1-t)^2} 
\Rightarrow
(1-t)^2(B_1 - (1-t)B_0)= t(C_1 - t(2C_2 - tC_3))
;$$
$$\frac{B_2 - (1-t)(2B_1 + (1-t)B_0)}{t^2} = \frac{C_2 - tC_3}{1-t}
\Rightarrow
(1-t)(B_2 - (1-t)(2B_1 + (1-t)B_0)) = t^2(C_2 - tC_3)
.$$

### Ответ:
$$t = \frac{\left| B_3-B_2 \right|}{\left| C_1-B_2 \right|},$$
$$A = \left[ B_0, \frac{B_1 - (1-t)B_0}{t}, \frac{C_2 - tC_3}{1-t}, C_3 \right] .$$

### Условия разрешимости

$$ B_3-B_2 \upuparrows C_1 - C_0; $$
$$ B_3 = C_0; $$
$$(1-t)(B_2 - (1-t)B_1) = t(C_1 - tC_2);$$
$$(1-t)^2(B_1 - (1-t)B_0)= t(C_1 - t(2C_2 - tC_3));$$
$$(1-t)(B_2 - (1-t)(2B_1 + (1-t)B_0)) = t^2(C_2 - tC_3).$$

Раскроем скобки
$$\begin{gathered}
(1-t)(B_2 - (1-t)B_1) = t(C_1 - tC_2);\\
{C_2} {{t}^{2}}-{B_1} {{t}^{2}}-{C_1} t-{B_2} t+2 {B_1} t+{B_2}-{B_1} = 0;
\end{gathered}$$

$$\begin{gathered}
(1-t)^2(B_1 - (1-t)B_0)= t(C_1 - t(2C_2 - tC_3));\\
-{C_3} {{t}^{3}}+{B_0} {{t}^{3}}+2 {C_2} {{t}^{2}}+{B_1} {{t}^{2}}-3 {B_0} {{t}^{2}}-{C_1} t-2 {B_1} t+3 {B_0} t+{B_1}-{B_0} = 0;\\

\end{gathered}$$

$$\begin{gathered}
(1-t)(B_2 - (1-t)(2B_1 + (1-t)B_0)) = t^2(C_2 - tC_3);\\
{C_3} {{t}^{3}}+{B_0} {{t}^{3}}-{C_2} {{t}^{2}}-2 {B_1} {{t}^{2}}-3 {B_0} {{t}^{2}}-{B_2} t+4 {B_1} t+3 {B_0} t+{B_2}-2 {B_1}-{B_0} =0;
\end{gathered}$$


### Проверка
Разделим кривую
$$A = \left[ B_0, \frac{B_1 - (1-t)B_0}{t}, \frac{C_2 - tC_3}{1-t}, C_3 \right]$$
в пропорции
$$t = \frac{\left| B_3-B_2 \right|}{\left| C_1-B_2 \right|},$$
при условии, что
$$ B_3-B_2 \upuparrows C_1 - C_0,\, B_3 = C_0. $$

$$\begin{gathered}
A'_0 = (1-t)A_0 + tA_1;\\
A'_0 = (1-t)B_0 + t\frac{B_1 - (1-t)B_0}{t};\\
A'_0 = (1-t)B_0 + B_1 - (1-t)B_0;\\
A'_0 = B_1.
\end{gathered}$$

$$\begin{gathered}
A'_1 = (1-t)\frac{B_1 - (1-t)B_0}{t} + t\frac{C_2 - tC_3}{1-t};\\
\end{gathered}$$

$$\begin{gathered}
A'_2 = (1-t)\frac{C_2 - tC_3}{1-t} + tC_3;\\
A'_2 = C_2 - tC_3 + tC_3;\\
A'_2 = C_2.\\
\end{gathered}$$

$$\begin{gathered}
A''_0 = (1-t)B_1 + t\left( (1-t)\frac{B_1 - (1-t)B_0}{t} + t\frac{C_2 - tC_3}{1-t} \right);\\
A''_0 = (1-t)B_1 + (1-t)B_1 - (1-t)^2B_0 + t^2\frac{C_2 - tC_3}{1-t};\\
\end{gathered}$$

$$\begin{gathered}
A''_1 = (1-t)\left( (1-t)\frac{B_1 - (1-t)B_0}{t} + t\frac{C_2 - tC_3}{1-t} \right) + tC_2;\\
\end{gathered}$$

$$\begin{gathered}
A'''_0 = (1-t)A''_0 + tA''_1;
\end{gathered}$$

