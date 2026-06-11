# Ocean Construction - Registro de Avances y Correcciones

Este documento mantiene un registro cronológico de las optimizaciones, correcciones de errores y nuevas características implementadas en el proyecto (Frontend Web y Backend AppOcean).

## 🚀 Optimizaciones de Rendimiento y UI
- **Rediseño de Videos de Fondo (Hero):** 
  - Se previno la descarga múltiple en paralelo de videos pesados. El componente `Hero` fue reescrito para montar y desmontar de forma limpia un solo elemento `<video>` a la vez.
  - Se implementó una animación Premium "Cinematic Reveal" (Blur + Zoom out + Fade-in) usando Tailwind CSS para suavizar las transiciones entre videos.
  - Se reemplazó el fondo temporal negro puro por `bg-ocean-950` para mayor coherencia de marca.
- **Soporte WebM:** Todo el código fuente (Hero y Our Services) fue actualizado para aceptar archivos `.webm`, un formato moderno y altamente optimizado para la web, mejorando drásticamente el TTI (Time to Interactive) y ahorrando ancho de banda.
- **Galería Multimedia en Modal de Proyectos:** 
  - Se unificó el diseño eliminando la sección aislada de video. Ahora, los videos de cada proyecto forman parte del carrusel de imágenes (apareciendo al final) con reproducción automática, silenciada y en bucle continuo (`loop`).
  - Se actualizó el color de fondo de las galerías a `ocean-900` para mantener coherencia visual con la paleta principal del sitio ("Our Services").

## 🛡️ Seguridad y Backend (AppOcean)
- **Patch de Vulnerabilidades:** Se ejecutó una auditoría (`npm audit fix`) mitigando 6 vulnerabilidades de seguridad en librerías críticas (`multer`, `path-to-regexp`, `qs`, `uuid`), previniendo vectores de ataque DoS (Denegación de Servicio).
- **Protección Anti-Fuerza Bruta:** Se integró el middleware `express-rate-limit`.
  - *Límite Global:* Máximo de 200 peticiones cada 15 minutos por IP.
  - *Límite Estricto:* Rutas críticas como `/api/auth` y `/api/bot` están restringidas a 30 peticiones cada 15 minutos para prevenir "credential stuffing" y abuso del bot de OpenAI.
- **Polución de Parámetros:** Se integró el middleware `hpp` para prevenir ataques de HTTP Parameter Pollution.

## 📈 SEO y Metadatos
- **Structured Data (JSON-LD):** Se inyectó el schema `LocalBusiness` en el `index.html` del Frontend para mejorar el posicionamiento en Google Maps y búsquedas locales (dirección, teléfonos, horario de operación).
- **Etiquetas Meta Avanzadas:** Se enriquecieron las descripciones y palabras clave, y se completaron los Open Graph Cards (`og:`) y Twitter Cards para una correcta previsualización al compartir el sitio en redes sociales.
- **Sitemap y Crawling:** 
  - Generación del archivo `sitemap.xml` priorizando rutas como `#services` y `#projects`.
  - Actualización del archivo `robots.txt` para dirigir a los crawlers al nuevo dominio de producción (`https://oceanconstruction.us/sitemap.xml`).
