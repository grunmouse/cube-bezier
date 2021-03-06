# Расстояние точки плоской кубической кривой от линии, соединяющей её концы.

Пусть P - кубическая кривая.

$$P = \sum_{i=0}^3 B_i J_{3,i}(t).$$

Надо вывести уравнение расстояния точки кривой от линии $B_0B_3$.

Т.к. кривая Безье - афинно-инвариантна, преобразуем её так, чтобы линия $B_0B_3$ расположилась по оси $X$.

$$C_i = B_i - B_0;$$

Пусть $e_3 = \frac{C_3}{|C_3|}$;
Новая система координат состоит из орта $e_3$ и орта, повёрнутого относительно него влево на прямой угол.

$$D_i = \begin{pmatrix}
e_{3,x} & e_{3,y} \\
-e_{3,y} & e_{3,x}
\end{pmatrix}
C_i
= e_{3} \cdot C_{i} + e_{3} \times C_{i};$$

Кривая
$$R = \sum_{i=0}^3 D_i J_{3,i}(t)$$
расположена вдоль оси X, а искомое расстояние отсчитывается по оси Y.

Пусть $y$ и $Y_i$ - проекции $R$ и $D_i$ на ось Y.

$$y = \sum_{i=0}^3 Y_i J_{3,i}(t)$$

## Экстремумы

Обозначим:
$$\dot Y_i = Y_{i+1}-Y_i;$$
$$\ddot Y_i = \dot Y_{i+1}- \dot Y_i;$$

$$\dot y = 3 P_{2,\dot Y};$$
$$\ddot y = 6 P_{1,\ddot Y};$$

Мне нужно найти нули $\dot y$ и знак $\ddot y$. Следовательно, на константы можно разделить.

Критические точки найдём из уравнения
$$P_{2,\dot Y} = 0; $$
Это квадратное уравнение, должно решаться легко.

Знак второй производной возьмём так:

$$s = sign\left(P_{1,\ddot Y} \rigth);$$

в аргументе линейная функция.