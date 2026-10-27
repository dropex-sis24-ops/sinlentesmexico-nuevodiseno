---
name: sinlentes
description: Criterios de diseño, decisiones ya tomadas y límites técnicos del sitio de Sinlentesmexico (landing + test + simulador de visión). Úsala siempre que trabajes en este proyecto: al tocar estilos, animaciones, tipografía, color, textos médicos o de precios, el simulador, el test, el recorrido 3D del ojo, o al agregar cualquier sección. También antes de proponer librerías, fuentes o efectos nuevos, porque varias ya fueron evaluadas y descartadas por el cliente.
---

# Sinlentesmexico — criterios del proyecto

Sitio de una clínica mexicana de cirugía refractiva (láser e implante de lente
intraocular). Lo que se vende no es un procedimiento: es una **decisión**. Todo
el sitio existe para llevar a la persona al test de 4 preguntas.

Este archivo guarda lo que ya se decidió, para no volver a discutirlo ni
romperlo sin darse cuenta.

## Lo primero: quién mira esta página

**Ve mal.** Miopía, astigmatismo o vista cansada desde los 40. Muchos leen en el
celular, con lentes puestos. Esto no es un detalle de accesibilidad, es el
público:

- Texto de lectura nunca por debajo de 16 px en celular, 17–19 px en escritorio.
- Contraste alto siempre. Nada de gris tenue sobre fondo oscuro para texto que
  haya que leer.
- Zonas tocables de 44 px de alto como mínimo.
- `prefers-reduced-motion` no es opcional: con eso activado, todo queda quieto.
  A este público el movimiento le cuesta más que al promedio.

Si un efecto bonito compromete la legibilidad, gana la legibilidad. Siempre.

## Límites técnicos que no se pueden saltar

El proyecto es **estático y sin paso de compilación**. Se abre con Live Server o
cualquier servidor de archivos. Antes de proponer algo, verificá que entre acá:

- `index.html` casi vacío; todo se dibuja desde `js/landing.js` (Preact + htm,
  plantillas `html\`...\`` dentro de `render()`). El test va aparte, en
  `test.html` + `js/test.js`.
- **three.js r149 como script global.** No hay GLTFLoader: esa versión ya no
  publica la build sin módulos. Si hace falta cargar un `.glb`, se lee a mano
  (hay un precedente en el historial de git, commit `d3f32d8`, con un lector
  mínimo que contempla datos entrelazados por `byteStride`).
- GSAP + ScrollTrigger ya están cargados. Usalos antes de sumar otra librería.
- Nada de React, JSX, npm ni bundlers. Si una solución los necesita, no sirve
  acá: buscá la versión vanilla o escribila.
- **Caché:** `index.html` carga el CSS y el JS con `?v=N`. Hay que subir ese
  número en cada edición o el navegador sigue sirviendo la copia vieja. Esto ya
  hizo perder tiempo dos veces.

## Identidad visual

Verde `#00E676` sobre azul muy oscuro `#07152B`, con `#0A7A4B` para el verde
sobre fondo claro. El fondo claro es `#F8FAF9`, el texto `#0B1A33`.

Tipografías actuales: Sora (títulos), Inter y Manrope (texto). **Están en
revisión**: el cliente observó que la combinación se ve genérica, "hecha con
IA", y tiene razón — es la que sale por defecto en cualquier generador. Si se
cambian, conviene una display con carácter y una de texto neutra, máximo dos
familias más una monoespaciada para datos. Fontshare es una fuente razonable de
tipografías gratuitas para uso comercial.

## Movimiento: cuándo sí y cuándo no

La página ya tiene mucha animación (recorrido 3D del ojo, apariciones, contadores).
El problema no es la cantidad, es la falta de criterio. Antes de animar algo,
que responda una de estas tres preguntas:

1. ¿Qué acaba de pasar?
2. ¿Qué es lo importante acá?
3. ¿A dónde tengo que mirar?

Si no responde ninguna, se borra. Un efecto que solo decora le resta.

Mantené una sola escala de tiempos y curvas en todo el sitio. Hoy conviven
`.25s`, `.3s`, `.35s`, `.4s` y `.5s` con al menos cuatro curvas distintas; eso
no se percibe como inconsistencia sino como falta de terminación.

## Qué hace que este sitio se vea genérico

El cliente lo dijo con estas palabras: *"uno entra y dice, esto está hecho con
IA"*. Lo que lo delata:

- Todo simétrico y centrado, mismo radio de borde en todo, misma animación de
  entrada para lo importante y lo accesorio.
- Degradados verdes, vidrio esmerilado y botones píldora, que es el combo por
  defecto.
- Ninguna ruptura deliberada de la grilla.

Lo que lo arregla: romper la grilla en pocos lugares elegidos (un bloque que se
sale del margen, un número grande detrás del texto, una columna desalineada),
dejar alguna sección **sin ningún efecto** para que respire, y dar jerarquía
real a lo que entra.

## Los textos son del cliente y no se inventan

Este es el punto más delicado del proyecto, porque es información médica de una
clínica real con registro COFEPRIS (2507015036X00028) y un responsable sanitario
con nombre y cédula (Dr. Edgar Antonio Solano Tego).

- Los textos, precios y meses sin intereses salen de sinlentesmexico.mx. No se
  redactan de nuevo ni se "mejoran" sin pedirlo.
- El test usa la regla real del sitio (`resolveTestV3` en `js/test.js`). No se
  toca la lógica.
- Cobertura por distancia (cerca, intermedia, lejos), de 0 a 2:
  Láser `0,1,2` · Esencial `0,1,2` · Avanzado `1,2,2` · Premium `2,2,2`.
- **Tope nocturno:** si la persona ve mal de noche o maneja de noche, el
  resultado nunca pasa de Avanzado, porque los trifocales dan más halos. Ese
  tope es el mejor argumento del cliente —le recomienda *menos* de lo que
  pidieron— y hay que mostrarlo, no esconderlo.
- Nada en el sitio promete un resultado. Las simulaciones son orientativas y se
  dice explícitamente.

## Decisiones ya tomadas (no revertir sin preguntar)

**Simulador de visión** (ventana emergente desde la portada):

- Se abre con el botón "Ver el simulador", **idéntico** al de "Hacer el test"
  (misma clase `btn-white shine`, mismo verde). Van uno al lado del otro.
- Mismos controles que el simulador de referencia de Rayner: escena, condición
  ocular, procedimiento, y un interruptor para comparar dos procedimientos.
- **Abre comparando por defecto**: sin corregir a la izquierda, Premium a la
  derecha.
- **Nunca debe aparecer scroll dentro de la ventana.** Es una columna flexible
  con alto definido; el lienzo se queda con el espacio que sobra. Si algo vuelve
  a desbordar, revisá que `.sim-box` siga siendo `display:flex`.
- Sin botón de "Hacer el test" adentro.
- El efecto se calcula en vivo sobre video con un lienzo 2D (desenfoque, velo y
  amarilleo de catarata, imagen doble del astigmatismo, halos sumados). No son
  videos pregrabados por combinación.

**Videos:** las tres tarjetas muestran la miniatura real guardada en `img/yt/` y
el reproductor se crea recién al hacer clic, para no pedirle nada a YouTube
mientras nadie lo mire. Se usa `youtube-nocookie`.

**Lo que se probó y se descartó:**

- Reemplazar los lentes blancos del recorrido 3D por el modelo propio: se hizo y
  el cliente pidió volver atrás. Está revertido pero conservado en el historial
  (`d3f32d8` y `9ddc0bb`). Quedó pendiente achicar el armazón y sacar el
  contorno real del aro para los cristales.
- Usar los videos del simulador de Rayner: no se puede, es material de
  producción de otra empresa, con su marca y su producto.

## Material disponible

- `video/dia.mp4` y `video/noche.mp4` — calles de CDMX, Pexels, uso comercial
  libre, créditos en `video/CREDITOS.md`.
- `img/yt/` — miniaturas de los tres videos del cliente.
- `img/` — cuatro fotos de Unsplash (cerca, intermedia, lejos, noche) de un
  intento anterior del simulador. Hoy **sin usar**.
- Videos del cliente en YouTube: `41sXpVChbng` (quiénes somos),
  `2XO8_NGPsOw` (el proceso), `uU7Zi72E7Iw` (testimonios, sí está publicado
  aunque el proyecto original decía lo contrario).

## Cómo trabajar acá

1. Antes de tocar estilos o movimiento, leé también
   `.claude/skills/awwwards/SKILL.md` si está instalada: aporta el criterio de
   dirección creativa. Esta skill manda sobre aquella cuando se contradicen,
   porque acá están las decisiones del cliente.
2. Hacé copia de lo que vayas a tocar si es un archivo grande (`js/landing.js`
   son 136 KB escritos por otro desarrollador).
3. Subí el `?v=N` de `index.html` en cada cambio.
4. Verificá en el navegador antes de decir que algo funciona: que no haya
   errores en consola y que se vea lo que esperabas, con captura.
5. Un commit por cambio, explicando **por qué**, no solo qué.
