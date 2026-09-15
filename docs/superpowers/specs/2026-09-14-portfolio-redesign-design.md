# Rediseño estético del portfolio — Violeta Pía

**Estado:** aprobado (dirección validada por Pedro con mockup en Artifact)
**Fecha:** 2026-09-14

## Objetivo

El portfolio actual (`index.html` + `styles.css` + `script.js`) usa una plantilla genérica de "sitio creativo" (serif dorado, blobs beige, botón pill) que no tiene relación con el trabajo real de Violeta como diseñadora de identidad. El objetivo es un rediseño visual que:

- La represente a ella específicamente (no a "una diseñadora gráfica" genérica).
- Muestre su trabajo real (Salamanca, MNBA) con el mismo nivel de cuidado que ella le pone a sus propios sistemas de marca.
- Sorprenda a primera vista — es un regalo, tiene que tener un "wow" real, no solo tokens de color nuevos sobre el layout de siempre.
- Se mantenga simple de mantener: stack actual (HTML/CSS/JS vanilla + Express/SQLite) sin agregar frameworks ni build step.

## Concepto — "el portfolio como brandbook"

En vez de portfolio-items chicos en grilla, cada proyecto ocupa una sección completa que **toma el color real de esa marca** (rojo/crema de Salamanca, celeste de MNBA). Al hacer scroll, la barra de navegación transiciona de color para matchear la sección visible — como si se estuviera hojeando el brandbook físico de cada cliente. Es una decisión estructural (encaja con que ella diseña *sistemas de identidad*), no decorativa.

## Sistema de diseño

### Color

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--paper` | `#EFEEE6` | `#1A1720` | fondo base |
| `--paper-raised` | `#F8F7F2` | `#221E2B` | tarjetas, inputs |
| `--ink` | `#1B1A17` | `#F2EFE8` | texto principal |
| `--ink-soft` | `#5A5750` | `#B9B4AA` | texto secundario |
| `--violet` | `#6C2E8C` | `#B27FD1` | acento de marca personal (nav activo, links, un tag, una palabra de título) |
| `--violet-tint` | `#EAE0F0` | `#3A2A48` | fondos suaves (foto, chips) |
| `--sala-red` / `--sala-cream` | `#9E1B34` / `#EFE2D1` | igual | panel del proyecto Salamanca (colores reales de esa marca) |
| `--mnba-blue` | `#2A9BD8` | igual | panel del proyecto MNBA (color real de esa marca) |

El violeta es el único acento "propio" del sitio — ligado a su nombre pero usado con moderación, nunca como fondo grande. Los colores de proyecto viven *solo* dentro de su panel.

### Tipografía

- **Display** — Bricolage Grotesque (700–800): títulos, wordmark, tags.
- **Cuerpo largo / bajadas** — Newsreader itálica: subtítulo del hero, bio, pull-quotes.
- **UI / texto de interfaz** — Work Sans (400–600): nav, botones, formularios, metadata.

### Wordmark

"Violeta Pía" se trata como una marca propia, no solo una fuente: mismo tratamiento (peso, tracking, el punto violeta como "sello") repetido en nav, footer y como elemento gráfico grande en el hero (`PÍA` en contorno, tipo poster).

## Estructura y contenido

1. **Nav** — wordmark + link activo subrayado en violeta. En scroll, el fondo del nav se anima hacia el color del panel visible (blanco/papel en hero y about, crema en Salamanca, celeste en MNBA). Menú hamburguesa en mobile (se reusa el patrón que ya existe en `script.js`).
2. **Hero** — eyebrow "Diseñadora gráfica · Buenos Aires", título nuevo (reemplaza "Transformando Ideas en Experiencias Visuales" por algo con voz propia, ej. "Identidades que se sostienen en el tiempo"), bajada tomada/adaptada de su "Acerca de mí" del CV, dos CTAs (Ver portfolio / Hablemos → scroll a contacto y WhatsApp respectivamente). Tipografía "PÍA" en contorno de fondo.
3. **Sobre mí** — foto circular real (extraída de su CV, ya la tengo en `images/violeta.png`), bio en Newsreader itálica con una frase destacada en violeta, chip-row de herramientas reales del CV (Illustrator, Photoshop, InDesign, Figma, Canva) en vez del `skills-grid` genérico actual.
4. **Portfolio — panel Salamanca** — full-bleed, colores reales del proyecto, imagen `salamanca-cover.jpg`, copy ya existente en el HTML (cliente/año/servicios), links reales a Figma/brandbook que ya están en el `data-*` del item actual. Un detalle gráfico propio del proyecto (motivo floral fino, inspirado en su isotipo) como separador, no un divider genérico.
5. **Portfolio — panel MNBA** — mismo patrón, celeste, imagen `mnba-cover.jpg`, motivo de señalética/flecha como detalle propio de esa sección.
6. **Contacto** — formulario existente (mantiene el POST a `/api/contact`), WhatsApp real (`+54 11 6980-7819`), **email corregido** a `violetapia2203@gmail.com` (hoy dice el placeholder `tu.email@ejemplo.com`). Se **quitan** los links de Instagram/Behance/LinkedIn actuales porque apuntan a `#` (no hay handles reales) — se pueden agregar cuando Violeta los pase.
7. **Footer** — minimal, wordmark + email + ubicación.

### Testimonios — se elimina

Se quita la sección/formulario de testimonios del HTML y del JS (no hay testimonios reales; el propio historial del repo ya sacó los falsos). El endpoint `/api/testimonials` y la tabla en `database.js` quedan sin usar en el frontend — no se borran del backend en este alcance para no tocar la base de datos sin necesidad, pero no se renderizan ni se linkean desde la UI.

## Interacciones

- **Cursor personalizado** — se mantiene el patrón ya implementado, restyleado a un punto violeta + anillo fino, coherente con el acento del sitio. Se respeta `prefers-reduced-motion` y se desactiva en touch (el código ya detecta mobile).
- **Transición de color del nav al hacer scroll** — `IntersectionObserver` sobre cada `<section>`, actualiza una CSS custom property que el nav consume vía `transition: background-color .3s, color .3s`. Sin librerías nuevas.
- **Reveal de secciones** — se reusa el patrón de Intersection Observer que ya existe (`script.js` línea ~203), ajustado a las nuevas secciones.
- **Hover en panel-image** — leve escala/parallax, consistente con el `mouseenter/mouseleave` que ya existe en portfolio items.

## Alcance técnico

- Reescritura de `index.html`, `styles.css`, `script.js`. Se mantiene Express + SQLite solo para `/api/contact` (el formulario de contacto funcional).
- No se agregan frameworks, build step ni dependencias nuevas.
- Assets: `images/salamanca-cover.jpg` y `images/mnba-cover.jpg` (ya existen) + `images/violeta.png` (foto nueva, extraída del CV, ya generada con fondo transparente en `/private/tmp/.../vilu-redesign/images/violeta.png`, pendiente copiar al repo).
- Filtros de categoría (`filter-buttons`) se eliminan — con solo 2 proyectos reales no aportan y son ruido genérico de plantilla.
- El modal de detalle de proyecto se mantiene (los links a Figma/brandbook son reales y valiosos), restyleado con la paleta nueva.

## Fuera de alcance (para después)

- Sumar los proyectos de BKINA y Benares que aparecen en el CV pero no tienen assets todavía.
- Testimonios reales cuando existan.
- Redes sociales reales cuando Violeta pase los handles.

## Verificación

- Revisar visualmente en el navegador (desktop + mobile ~390px) antes de dar por terminado — no alcanza con que compile.
- Confirmar que el formulario de contacto sigue posteando a `/api/contact` sin errores de consola.
- Confirmar contraste de texto sobre cada panel de color (paper/ink, sala-cream/sala-ink, mnba-blue/blanco) a ojo — son paneles grandes, tienen que ser legibles.
- Sin errores de consola ni de red en ninguna sección.
