## Разложение определителя


$$
\det S =
\begin{vmatrix}
A_1 & A_2 & A_3 & A_0 & 0 & 0\\
0 & A_1 & A_2 & A_3 & A_0 & 0\\ 
0 & 0 & A_1 & A_2 & A_3 & A_0\\
B_1 & B_2 & B_3 & B_0 & 0 & 0\\
0 & B_1 & B_2 & B_3 & B_0 & 0\\ 
0 & 0 & B_1 & B_2 & B_3 & B_0
\end{vmatrix}
$$
$$
\det S =
=(-1)^{6+3} A_0 \bar M_{3;6}
+(-1)^{6+6} B_0 \bar M_{6;6}
$$
$$
\det S =
=-A_0 \bar M_{3;6}
+B_0 \bar M_{6;6}
$$

Дополнительные миноры будем обозначать $\bar{M}$ с двумя группами индексов, где сперва идут исключённые строки, а потом исключённые столбцы.


$$\bar{M}_{3;6} = 
\begin{vmatrix}
A_1 & A_2 & A_3 & A_0 & 0 \\
0 & A_1 & A_2 & A_3 & A_0 \\ 
B_1 & B_2 & B_3 & B_0 & 0 \\
0 & B_1 & B_2 & B_3 & B_0 \\ 
0 & 0 & B_1 & B_2 & B_3 
\end{vmatrix}
;\;
\bar{M}_{6;6} =
\begin{vmatrix}
A_1 & A_2 & A_3 & A_0 & 0 \\
0 & A_1 & A_2 & A_3 & A_0 \\ 
0 & 0 & A_1 & A_2 & A_3  \\
B_1 & B_2 & B_3 & B_0 & 0 \\
0 & B_1 & B_2 & B_3 & B_0 
\end{vmatrix};
$$


Подстановка столбцов для минора $\bar{M}_{3,6}$
$$\begin{pmatrix}
1 & 2 & 3 & 4 & 5 \\
1 & 2 & 4 & 5 & 6
\end{pmatrix}$$

$$\bar{M}_{3,6} = 
(-1)^{5+2} A_0 \bar M_{2,3;5,6}
+
(-1)^{5+4} B_0 \bar M_{3,5;5,6}
+
(-1)^{5+5} B_3 \bar M_{3,6;5,6};
$$

$$\bar{M}_{3,6} = 
-A_0 \bar M_{2,3;5,6}
-B_0 \bar M_{3,5;5,6}
+B_3 \bar M_{3,6;5,6};
$$

$$\bar M_{2,3;5,6} =
\begin{vmatrix}
A_1 & A_2 & A_3 & A_0  \\
B_1 & B_2 & B_3 & B_0  \\
0 & B_1 & B_2 & B_3 \\ 
0 & 0 & B_1 & B_2 
\end{vmatrix}
;\;
\bar M_{3,5;5,6} =
\begin{vmatrix}
A_1 & A_2 & A_3 & A_0  \\
0 & A_1 & A_2 & A_3  \\ 
B_1 & B_2 & B_3 & B_0  \\
0 & 0 & B_1 & B_2 
\end{vmatrix}
;\;
\bar M_{3,6;5,6} =
\begin{vmatrix} 
A_1 & A_2 & A_3 & A_0 \\
0 & A_1 & A_2 & A_3   \\ 
B_1 & B_2 & B_3 & B_0 \\
0 & B_1 & B_2 & B_3
\end{vmatrix}
.
$$

Подстановка столбцов для минора $\bar{M}_{6;6}$
$$\begin{pmatrix}
1 & 2 & 3 & 4 & 5 \\
1 & 2 & 3 & 4 & 5
\end{pmatrix}$$

$$\bar{M}_{6,6} = 
(-1)^{5+2} A_0 \bar{M}_{2,6;5,6} 
+(-1)^{5+3} A_3 \bar{M}_{3,6;5,6} 
+(-1)^{5+5} B_0 \bar{M}_{5,6;5,6};
$$

$$\bar{M}_{6,6} = 
-A_0 \bar{M}_{2,6;5,6} 
+A_3 \bar{M}_{3,6;5,6} 
+B_0 \bar{M}_{5,6;5,6};
$$

$$\bar{M}_{2,6;5,6} =
\begin{vmatrix}
A_1 & A_2 & A_3 & A_0 \\
0 & 0 & A_1 & A_2  \\
B_1 & B_2 & B_3 & B_0 \\
0 & B_1 & B_2 & B_3 
\end{vmatrix}
;\;
\bar{M}_{5,6;5,6} = 
\begin{vmatrix}
A_1 & A_2 & A_3 & A_0  \\
0 & A_1 & A_2 & A_3 \\ 
0 & 0 & A_1 & A_2 \\
B_1 & B_2 & B_3 & B_0  
\end{vmatrix};
$$

Подстановка столбцов для минора $\bar{M}_{2,3;5,6}$
$$\begin{pmatrix}
1 & 2 & 3 & 4 \\
1 & 4 & 5 & 6
\end{pmatrix}
$$
$$
\bar{M}_{2,3;5,6} =
(-1)^{4+1} A_0 \bar{M}_{1,2,3;4,5,6}
+(-1)^{4+2} B_0 \bar{M}_{2,3,4;4,5,6}
+(-1)^{4+3} B_3 \bar{M}_{2,3,5;4,5,6}
+(-1)^{4+4} B_2 \bar{M}_{2,3,6;4,5,6};
$$
$$
\bar{M}_{2,3;5,6} =
-A_0 \bar{M}_{1,2,3;4,5,6}
+B_0 \bar{M}_{2,3,4;4,5,6}
-B_3 \bar{M}_{2,3,5;4,5,6}
+B_2 \bar{M}_{2,3,6;4,5,6};
$$

Подстановка столбцов для минора $\bar{M}_{3,5;5,6}$
$$\begin{pmatrix}
1 & 2 & 3 & 4 \\
1 & 2 & 4 & 6
\end{pmatrix}
$$
$$
\bar{M}_{3,5;5,6} =
(-1)^{4+1}  A_0 \bar{M}_{1,3,5;4,5,6}
+(-1)^{4+2} A_3 \bar{M}_{2,3,5;4,5,6}
+(-1)^{4+3} B_0 \bar{M}_{3,4,5;4,5,6}
+(-1)^{4+4} B_2 \bar{M}_{3,5,6;4,5,6};
$$

Подстановка столбцов для минора $\bar{M}_{3,6;5,6}$
$$\begin{pmatrix}
1 & 2 & 3 & 4 \\
1 & 2 & 4 & 5
\end{pmatrix}
$$
$$
\bar{M}_{3,6;5,6} =
(-1)^{4+1}  A_0 \bar{M}_{1,3,6;4,5,6}
+(-1)^{4+2} A_3 \bar{M}_{2,3,6;4,5,6}
+(-1)^{4+3} B_0 \bar{M}_{3,4,6;4,5,6}
+(-1)^{4+4} B_3 \bar{M}_{3,5,6;4,5,6};
$$

Подстановка столбцов для минора $\bar{M}_{2,6;5,6}$
$$\begin{pmatrix}
1 & 2 & 3 & 4 \\
1 & 3 & 4 & 5
\end{pmatrix}
$$
$$
\bar{M}_{2,6;5,6} =
(-1)^{4+1}  A_0 \bar{M}_{1,2,6;4,5,6}
+(-1)^{4+2} A_2 \bar{M}_{2,3,6;4,5,6}
+(-1)^{4+3} B_0 \bar{M}_{2,4,6;4,5,6}
+(-1)^{4+4} B_3 \bar{M}_{2,5,6;4,5,6};
$$

Подстановка столбцов для минора $\bar{M}_{5,6;5,6}$
$$\begin{pmatrix}
1 & 2 & 3 & 4 \\
1 & 2 & 3 & 4
\end{pmatrix}
$$
$$
\bar{M}_{5,6;5,6} =
(-1)^{4+1}  A_0 \bar{M}_{1,5,6;4,5,6}
+(-1)^{4+2} A_3 \bar{M}_{2,5,6;4,5,6}
+(-1)^{4+3} A_2 \bar{M}_{3,5,6;4,5,6}
+(-1)^{4+4} B_0 \bar{M}_{4,5,6;4,5,6};
$$

Т.к. в первых трёх столбцах остались только константы, все нераскрытые миноры - константные. Будем обозначать их только номерами строк.

Запишем
$$
\bar{M}_{2,3;5,6} =
-A_0 \bar{M}_{1,2,3}
+B_0 \bar{M}_{2,3,4}
-B_3 \bar{M}_{2,3,5}
+B_2 \bar{M}_{2,3,6};
$$
$$
\bar{M}_{3,5;5,6} =
-A_0 \bar{M}_{1,3,5}
+A_3 \bar{M}_{2,3,5}
-B_0 \bar{M}_{3,4,5}
+B_2 \bar{M}_{3,5,6};
$$
$$
\bar{M}_{3,6;5,6} =
-A_0 \bar{M}_{1,3,6}
+A_3 \bar{M}_{2,3,6}
-B_0 \bar{M}_{3,4,6}
+B_3 \bar{M}_{3,5,6};
$$
$$
\bar{M}_{2,6;5,6} =
-A_0 \bar{M}_{1,2,6}
+A_2 \bar{M}_{2,3,6}
-B_0 \bar{M}_{2,4,6}
+B_3 \bar{M}_{2,5,6};
$$
$$
\bar{M}_{5,6;5,6} =
-A_0 \bar{M}_{1,5,6}
+A_3 \bar{M}_{2,5,6}
-A_2 \bar{M}_{3,5,6}
+B_0 \bar{M}_{4,5,6};
$$

$$\begin{gathered}
\bar{M}_{3,6} = 
-A_0 \bar M_{2,3;5,6}
-B_0 \bar M_{3,5;5,6}
+B_3 \bar M_{3,6;5,6};
= \\ =
-A_0 \left( 
-A_0 \bar{M}_{1,2,3}
+B_0 \bar{M}_{2,3,4}
-B_3 \bar{M}_{2,3,5}
+B_2 \bar{M}_{2,3,6}
\right) \\
-B_0 \left( 
-A_0 \bar{M}_{1,3,5}
-B_0 \bar{M}_{3,4,5}
+A_3 \bar{M}_{2,3,5}
+B_2 \bar{M}_{3,5,6}
\right) \\
+B_3 \left(
-A_0 \bar{M}_{1,3,6}
-B_0 \bar{M}_{3,4,6}
+A_3 \bar{M}_{2,3,6}
+B_3 \bar{M}_{3,5,6}
\right)
= \\ =
A_0^2 \bar{M}_{1,2,3}
-A_0 B_0 \bar{M}_{2,3,4}
+
A_0 \left( 
B_3 \bar{M}_{2,3,5}
-B_2 \bar{M}_{2,3,6}
\right) \\
+A_0 B_0 \bar{M}_{1,3,5}
+B_0^2 \bar{M}_{3,4,5}
+B_0 \left( 
-A_3 \bar{M}_{2,3,5}
-B_2 \bar{M}_{3,5,6}
\right) \\
-A_0 B_3 \bar{M}_{1,3,6}
-B_0 B_3 \bar{M}_{3,4,6}
+B_3 \left(
A_3 \bar{M}_{2,3,6}
+B_3 \bar{M}_{3,5,6}
\right);
\bar{M}_{3,6} = 
A_0^2 \bar{M}_{1,2,3}
+A_0 B_0 \left( \bar{M}_{1,3,5} - \bar{M}_{2,3,4} \right)
+B_0^2 \bar{M}_{3,4,5}\\
+A_0 \left( B_3 \bar{M}_{2,3,5}-B_2 \bar{M}_{2,3,6} - B_3 \bar{M}_{1,3,6} \right)\\
+B_0 \left( -A_3 \bar{M}_{2,3,5}-B_2 \bar{M}_{3,5,6} - B_3 \bar{M}_{3,4,6} \right)\\
+B_3 \left(A_3 \bar{M}_{2,3,6}+B_3 \bar{M}_{3,5,6}\right);
\end{gathered}
$$

$$
\begin{gathered}
\bar{M}_{6,6} = 
-A_0 \bar{M}_{2,6;5,6} 
+A_3 \bar{M}_{3,6;5,6} 
+B_0 \bar{M}_{5,6;5,6}
= \\ =
-A_0 \left( 
-A_0 \bar{M}_{1,2,6}
-B_0 \bar{M}_{2,4,6}
+A_2 \bar{M}_{2,3,6}
+B_3 \bar{M}_{2,5,6}
\right) \\
+A_3 \left( 
-A_0 \bar{M}_{1,3,6}
-B_0 \bar{M}_{3,4,6}
+A_3 \bar{M}_{2,3,6}
+B_3 \bar{M}_{3,5,6}
\right) \\
+B_0 \left( 
-A_0 \bar{M}_{1,5,6}
+B_0 \bar{M}_{4,5,6}
+A_3 \bar{M}_{2,5,6}
-A_2 \bar{M}_{3,5,6}
\right)
= \\ =
+A_0^2 \bar{M}_{1,2,6}
+A_0 B_0 \bar{M}_{2,4,6}
+A_0 \left( 
-A_2 \bar{M}_{2,3,6}
-B_3 \bar{M}_{2,5,6}
\right) \\
-A_0 A_3 \bar{M}_{1,3,6}
-B_0 A_3 \bar{M}_{3,4,6}
+A_3 \left( 
+A_3 \bar{M}_{2,3,6}
+B_3 \bar{M}_{3,5,6}
\right) \\
-A_0 B_0 \bar{M}_{1,5,6}
+B_0^2 \bar{M}_{4,5,6}
+B_0 \left( 
+A_3 \bar{M}_{2,5,6}
-A_2 \bar{M}_{3,5,6}
\right);
\bar{M}_{6,6} = 
A_0^2 \bar{M}_{1,2,6}
+A_0 B_0 \left( \bar{M}_{2,4,6} - \bar{M}_{1,5,6} \right)
+B_0^2 \bar{M}_{4,5,6} \\
+A_0 \left( -A_2 \bar{M}_{2,3,6} -B_3 \bar{M}_{2,5,6} - A_3 \bar{M}_{1,3,6} \right) \\
+B_0 \left( A_3 \bar{M}_{2,5,6}-A_2 \bar{M}_{3,5,6} - A_3 \bar{M}_{3,4,6} \right) \\
+A_3 \left( A_3 \bar{M}_{2,3,6}+B_3 \bar{M}_{3,5,6}\right);
\end{gathered}
$$

$$
\begin{gathered}
\det S(f,g) =
-A_0 \bar M_{3;6}
+B_0 \bar M_{6;6}
= \\ =
-A_0^3 \bar{M}_{1,2,3}
-A_0^2 B_0 \left( \bar{M}_{1,3,5} - \bar{M}_{2,3,4} \right)
+A_0^2 B_0\bar{M}_{1,2,6} \\
-A_0 B_0^2 \bar{M}_{3,4,5}
+A_0 B_0^2 \left( \bar{M}_{2,4,6} - \bar{M}_{1,5,6} \right) 
+B_0^3 \bar{M}_{4,5,6} \\
-A_0^2 \left( B_3 \bar{M}_{2,3,5}-B_2 \bar{M}_{2,3,6} - B_3 \bar{M}_{1,3,6} \right)\\
-A_0 B_0 \left( -A_3 \bar{M}_{2,3,5}-B_2 \bar{M}_{3,5,6} - B_3 \bar{M}_{3,4,6} \right) 
+A_0 B_0\left( -A_2 \bar{M}_{2,3,6} -B_3 \bar{M}_{2,5,6} - A_3 \bar{M}_{1,3,6} \right)\\
+B_0^2 \left( A_3 \bar{M}_{2,5,6}-A_2 \bar{M}_{3,5,6} - A_3 \bar{M}_{3,4,6} \right) \\
-A_0 B_3 \left(A_3 \bar{M}_{2,3,6}+B_3 \bar{M}_{3,5,6}\right)
+B_0 A_3 \left( A_3 \bar{M}_{2,3,6}+B_3 \bar{M}_{3,5,6}\right);\\
\det S(f,g) = \\ =
-A_0^3 \bar{M}_{1,2,3}
-A_0^2 B_0 \left( \bar{M}_{1,3,5} - \bar{M}_{2,3,4} + \bar{M}_{1,2,6} \right)
+A_0 B_0^2 \left( \bar{M}_{2,4,6} - \bar{M}_{1,5,6} - \bar{M}_{3,4,5}\right) 
+B_0^3 \bar{M}_{4,5,6}\\
-A_0^2 \left( B_3 \bar{M}_{2,3,5}-B_2 \bar{M}_{2,3,6} - B_3 \bar{M}_{1,3,6} \right)\\
+A_0 B_0 \left( A_3 \bar{M}_{2,3,5}+B_2 \bar{M}_{3,5,6} + B_3 \bar{M}_{3,4,6}  -A_2 \bar{M}_{2,3,6} -B_3 \bar{M}_{2,5,6} - A_3 \bar{M}_{1,3,6} \right) \\
+B_0^2 \left( A_3 \bar{M}_{2,5,6}-A_2 \bar{M}_{3,5,6} - A_3 \bar{M}_{3,4,6} \right) \\
-A_0 B_3 \left(A_3 \bar{M}_{2,3,6}+B_3 \bar{M}_{3,5,6}\right)
+B_0 A_3 \left( A_3 \bar{M}_{2,3,6}+B_3 \bar{M}_{3,5,6}\right).
\end{gathered}
$$

У нас получилось много констант. Ведём для них обозначения.
Пусть
$$\det S(f,g) = \sum_{i=1}^3 \sum_{j=0}^{i} K_{i-j,j}A_0^{i-j}B_0^{j};$$
$$
\begin{gathered}
K_{3,0} = -\bar{M}_{1,2,3},\\
K_{2,1} = -\left( \bar{M}_{1,3,5} - \bar{M}_{2,3,4} + \bar{M}_{1,2,6} \right),\\
K_{1,2} = \bar{M}_{2,4,6} - \bar{M}_{1,5,6} - \bar{M}_{3,4,5},\\
K_{0,3} = \bar{M}_{4,5,6},\\
K_{2,0} = - \left( B_3 \bar{M}_{2,3,5}-B_2 \bar{M}_{2,3,6} - B_3 \bar{M}_{1,3,6} \right),\\
K_{1,1} = A_3 \bar{M}_{2,3,5}+B_2 \bar{M}_{3,5,6} + B_3 \bar{M}_{3,4,6} -A_2 \bar{M}_{2,3,6} -B_3 \bar{M}_{2,5,6} - A_3 \bar{M}_{1,3,6}, \\
K_{0,2} = A_3 \bar{M}_{2,5,6}-A_2 \bar{M}_{3,5,6} - A_3 \bar{M}_{3,4,6} , \\
K_{1,0} = - B_3 \left(A_3 \bar{M}_{2,3,6}+B_3 \bar{M}_{3,5,6}\right),\\
K_{0,1} = A_3 \left( A_3 \bar{M}_{2,3,6}+B_3 \bar{M}_{3,5,6}\right).\\
\end{gathered}

Подставим миноры, с учётом их взаимозависимостей
$$
\begin{gathered}
K_{3,0} = - M_{4,5,6},\\
K_{2,1} = -\left( -M_{3,4,5} - M_{3,4,5} + M_{3,4,5} \right)
 = M_{3,4,5},\\
K_{1,2} = -M_{2,3,4} - M_{2,3,4} - M_{2,3,4} = -3 M_{2,3,4},\\
K_{0,3} = M_{1,2,3},\\
K_{2,0} = - \left( B_3 M_{1,4,6}- B_2 M_{1,4,5} + B_3 M_{1,4,6} \right)
= - 2 B_3 M_{1,4,6} + B_2 M_{1,4,5},\\
K_{1,1} =  A_3 M_{1,4,6}+B_2 M_{1,2,4} + B_3 M_{1,2,5} -A_2 M_{1,4,5} +B_3 M_{1,2,5} + A_3 M_{1,4,6}
 =
-A_2 M_{1,4,5} 
+2 A_3 M_{1,4,6}
+B_2 M_{1,2,4} 
+2 B_3 M_{1,2,5} 
, \\
K_{0,2} = - A_3 M_{1,2,5} - A_2 M_{1,2,4} - A_3 M_{1,2,5} = - A_2 M_{1,2,4} - 2 A_3 M_{1,2,5} , \\
K_{1,0} = - B_3 \left( A_3 M_{1,4,5} + B_3 M_{1,2,4} \right),\\
K_{0,1} = A_3 \left( A_3 M_{1,4,5} + B_3 M_{1,2,4} \right).\\
\end{gathered}
$$


Окончательный вид
$$
\begin{gathered}
\det S(f,g) = \\ =
-M_{4,5,6} A_0^3 \\
-\left( M_{2,4,6} - M_{2,4,5} + M_{2,3,4} \right) A_0^2 B_0 \\
+\left( M_{1,3,5} - M_{2,3,4} - M_{1,2,6}\right) A_0 B_0^2\\
+M_{1,2,3}B_0^3\\
-\left( B_3 M_{1,4,6}-B_2 M_{1,4,5} - B_3 M_{2,4,5} \right)A_0^2\\
+\left( A_3 M_{1,4,6}+B_2 M_{1,2,4} + B_3 M_{1,2,5}  -A_2 M_{1,4,5} -B_3 M_{1,3,4} - A_3 M_{2,4,5} \right)A_0 B_0 \\
+\left( A_3 M_{1,3,4}-A_2 M_{1,2,4} - A_3 M_{1,2,5} \right) B_0^2\\
-B_3 \left(A_3 M_{1,4,5}+B_3 M_{1,2,4}\right) A_0\\
+A_3 \left( A_3 M_{1,4,5}+B_3 M_{1,2,4}\right)B_0.

\end{gathered}
$$

