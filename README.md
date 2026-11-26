# Marley Unity Hub · Presentación final

Presentación web de la propuesta del Equipo 6 de Agencia Pinky para el Desafío Marley Coffee 2026. Tiene 14 láminas pensadas para 10 minutos, con animaciones, videos del MVP y un QR que lleva al prototipo.

## Qué hay en esta carpeta

| Ruta | Qué es |
|---|---|
| `index.html` | La presentación |
| `mvp/index.html` | El prototipo del Hub (Piloto v4) al que apunta el QR |
| `assets/video/` | Los 6 videos del MVP grabados desde el prototipo |
| `assets/css`, `assets/js`, `assets/img` | Estilos, fuentes, motor de la presentación y logo |
| `GUION.md` | El guion de cada lámina con sus tiempos |

## Publicarla en GitHub Pages

1. Crea un repositorio público en GitHub, por ejemplo `marley-unity-hub`.
2. Sube **todo el contenido de esta carpeta** a la raíz del repositorio: arrastra los archivos en *Add file › Upload files*, o usa `git push`. `index.html` tiene que quedar en la raíz, no dentro de otra carpeta.
3. Entra a *Settings › Pages*. En *Source* elige **Deploy from a branch**, luego la rama `main` y la carpeta `/ (root)`, y presiona *Save*.
4. Espera uno o dos minutos. La presentación queda en
   `https://TU-USUARIO.github.io/marley-unity-hub/`
   y el MVP en
   `https://TU-USUARIO.github.io/marley-unity-hub/mvp/`

**El QR se arma solo** con la dirección donde está publicada la presentación, más `mvp/`. No hay que editar nada. Si alguna vez quieres que apunte a otra dirección, agrega `?mvp=` a la URL, por ejemplo `index.html?mvp=https://otra-url.cl`.

## Cómo presentar

| Tecla | Acción |
|---|---|
| → · espacio · clic | Lámina siguiente |
| ← · clic en el borde izquierdo | Lámina anterior |
| F | Pantalla completa |
| N | Mostrar u ocultar las notas del expositor |
| 1–9 | Ir directo a esa lámina |

Cada lámina tiene su propio enlace (`#7` abre la 7). Los videos parten solos al llegar a cada lámina y se repiten mientras sigas en ella.

**Para la grabación:** presiona F, oculta las notas con N y graba la ventana del navegador a 1920×1080. El guion también está en `GUION.md`, por si prefieren leerlo desde otro dispositivo.

También se puede abrir sin internet, haciendo doble clic en `index.html`. En ese caso el QR apunta a la carpeta local, así que para compartirlo hay que usar la versión publicada.

---
Prototipo educativo con datos ficticios. Las cifras internas de Marley son supuestos académicos del caso.
