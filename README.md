# Sinlentesmexico — Rediseño de landing + test

Sitio estático, sin paso de compilación. Funciona abriéndolo directo en el navegador.

## Cómo abrirlo en VS Code

1. Descomprime la carpeta y ábrela en VS Code (`Archivo → Abrir carpeta…`).
2. Instala la extensión **Live Server** (Ritwick Dey).
3. Clic derecho en `index.html` → **Open with Live Server**.

También puedes hacer doble clic en `index.html`; las fuentes de Google Fonts necesitan conexión a internet.

## Estructura

```
index.html          Landing
test.html           Test de candidatura (4 preguntas + resultado)
css/landing.css     Estilos de la landing (animaciones, 3D CSS, responsive)
css/test.css        Estilos del test
js/landing.js       Lógica + plantilla de la landing (modelos 3D, scroll, calculadora, FAQ)
js/test.js          Lógica + plantilla del test (preguntas, cálculo del resultado)
vendor/preact-htm.umd.js   Preact + htm (renderiza las plantillas, ~12 KB)
vendor/three.min.js        Three.js r149 (modelos 3D del ojo, lente e íconos)
vendor/gsap.min.js + ScrollTrigger.min.js   GSAP 3.12.5 (recorrido 3D controlado por scroll)
```

## Dónde editar

- **Textos y estructura:** dentro del método `render()` al final de cada archivo en `js/`.
  Es HTML normal dentro de una plantilla `html\`...\``; los `${v.algo}` son datos que vienen de `renderVals()`.
- **Listas de datos** (procedimientos, precios, sedes, preguntas frecuentes, preguntas del test): en `renderVals()`.
- **Modelos 3D:** método `init3D()` en `js/landing.js` (`buildEye`, `buildIOL` y los íconos de la FAQ).
- **Recorrido 3D por scroll:** bloque "1 · Scroll story" en `init3D()`. Las fases están en la línea de tiempo `tl` (GSAP) y las etiquetas en `LBL` dentro de `renderVals()`.
- **Textos por validar:** los paneles y etiquetas del recorrido 3D son textos nuevos. Para ocultar las marcas amarillas cambia `showReview` a `false` en `renderVals()` (`this.props.showReview ?? true`).
- **Lógica del resultado del test:** método `compute()` en `js/test.js`.

## Pendientes antes de publicar

- Los botones "Hacer el test" apuntan a `test.html`. En producción cámbialos de vuelta a
  `https://www.sinlentesmexico.mx/test-candidatura` (busca `test.html` en `js/landing.js`).
- La lógica de `compute()` es **de prueba**. Las frases marcadas con `[TEXTO DE PRUEBA]` deben
  reemplazarse por los textos reales.
- Los videos son tarjetas que enlazan a YouTube; si los quieres embebidos, cámbialos por un `<iframe>`.
