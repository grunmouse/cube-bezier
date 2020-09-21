# Длина кривой безье

$$P_3(t) = \sum_{i=0}^3 B_i J_{n,i}(t).$$

$$J_{3,0} = (1-t)^3;$$
$$J_{3,1} = 3 t (1-t)^2;$$
$$J_{3,2} = 3 t^2 (1-t);$$
$$J_{3,3} = t^3.$$

$$dl = \left| P(t+dt)-P(t) \right|.$$

$$P(t+dt)-P(t) = \sum_{i=0}^3 B_i \left( J_{n,i}(t+dt) - J_{n,i}(t) \right).$$

$$J_{3,0}(t+dt) - J_{3,0}(t) 
= (1-t-dt)^3-(1-t)^3 
= (1-t)^3 - 3(1-t)^2dt + 3(1-t)d^2t - d^3t - (1-t)^3;$$
$$J_{3,0}(t+dt) - J_{3,0}(t) \approx -3(1-t)^2dt.$$

$$J_{3,1}(t+dt) - J_{3,1}(t) 
= 3 (t+dt) (1-t-dt)^2 - 3 t (1-t)^2 
= 3(t+dt)((1-t)^2 - 2tdt + d^2t) - 3 t (1-t)^2 ;$$

$$J_{3,1}(t+dt) - J_{3,1}(t) 
\approx 3(t+dt)((1-t)^2 - 2tdt) - 3 t (1-t)^2 
\approx 3 (t(1-t)^2 + (1-t)^2dt - 2t^2dt - 2td^2t) - 3 t (1-t)^2;$$
$$J_{3,1}(t+dt) - J_{3,1}(t) 
\approx 3t(1-t)^2 + 3 (1-t)^2dt - 6t^2dt - 3 t (1-t)^2
;$$
$$J_{3,1}(t+dt) - J_{3,1}(t) \approx  3 (1-t)^2dt - 6t^2dt.$$


$$J_{3,2}(t+dt) - J_{3,2}(t) 
= 3 (t+dt)^2 (1-t-dt) - 3 t^2 (1-t)
= 3 (t^2 + 2tdt + d^2t) (1-t-dt) - 3 t^2 (1-t);$$
$$J_{3,2}(t+dt) - J_{3,2}(t) 
\approx 3 (t^2 + 2tdt) (1-t-dt) - 3 t^2 (1-t)
\approx 3( t^2(t-1) - t^2dt + 2t(1-t)dt - 2td^2t) - 3 t^2 (1-t)
;$$
$$J_{3,2}(t+dt) - J_{3,2}(t) \approx 6t(1-t)dt - 3t^2dt.$$


$$J_{3,3}(t+dt) - J_{3,3}(t) 
= (t+dt)^3 - t^3
= t^3 + 3t^2dt + 3td^2t + d^3t - t^3
;$$

$$J_{3,3}(t+dt) - J_{3,3}(t) \approx 3t^2dt.$$

$$P_3(t+dt)-P_3(t) = B_0 (-3(1-t)^2dt) + B_1(3 (1-t)^2dt - 6t^2dt) + B_2(6t(1-t)dt- 3t^2dt) + B_3(3t^2dt);$$
$$P_3(t+dt)-P_3(t) = 
-3B_0(1-t)^2dt + 
3 B_1(1-t)^2dt - 6B_1t^2dt + 
6B_2t(1-t)dt- 3B_2t^2dt + 
3B_3t^2dt
;$$
$$P_3(t+dt)-P_3(t) = 3 (B_1-B0)(1-t)^2dt + 6B_2t(1-t)dt - 6B_1t^2dt + 3(B_3-B_2)t^2dt;$$
$$P_3(t+dt)-P_3(t) = 3 ((B_1-B0)(1-t)^2 + 6B_2t(1-t) - 6B_1t^2 + 3(B_3-B_2)t^2)dt.$$
