# Rediseño estético del portfolio (Violeta Pía) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el diseño genérico actual del portfolio de Violeta Pía por el concepto "brandbook" aprobado (spec: `docs/superpowers/specs/2026-09-14-portfolio-redesign-design.md`) — paneles de proyecto con el color real de cada marca, tipografía Bricolage Grotesque + Newsreader, acento violeta propio.

**Architecture:** Sitio estático (HTML/CSS/JS vanilla) servido por Express (`server.js`, sin cambios) con SQLite solo para `/api/contact`. Se reescriben `index.html` y `styles.css` completos; `script.js` se edita quitando el bloque de testimonios y el de filtros, y agregando la transición de color del nav por sección.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid/Flexbox, sin frameworks), JavaScript ES6 vanilla, Google Fonts (Bricolage Grotesque, Newsreader, Work Sans).

## Global Constraints

- No se agregan dependencias, build step ni frameworks nuevos.
- No se toca `server.js` ni `database.js` (el backend de contacto sigue funcionando igual).
- Paleta y tipografía exactas según la spec (tokens de color/fuente copiados abajo tal cual).
- Se elimina la sección de testimonios (HTML + JS) y los links de redes sociales rotos (`#`).
- Email de contacto correcto: `violetapia2203@gmail.com` (reemplaza el placeholder `tu.email@ejemplo.com`).
- Verificación visual real en navegador (desktop + ~390px mobile) antes de cerrar cada task de UI — no alcanza con "no tira error".

---

### Task 1: Skeleton — `index.html` completo + fundamentos de `styles.css` (tokens, reset, nav, cursor)

**Files:**
- Modify: `index.html` (reemplazo completo)
- Modify: `styles.css` (reemplazo completo — se construye incrementalmente en las Tasks 1-6, esta task deja la base)

**Interfaces:**
- Produce: variables CSS `--paper`, `--paper-raised`, `--ink`, `--ink-soft`, `--violet`, `--violet-tint`, `--sala-red`, `--sala-cream`, `--sala-ink`, `--mnba-blue`, `--mnba-ink`, `--border`, `--radius-lg` (16px), `--maxw` (1180px), `--gutter` (clamp(20px,5vw,64px)) — usadas por todas las tasks siguientes.
- Produce: clases de layout reusables `.eyebrow`, `.btn`/`.btn.primary`, `.section-header`, `.wrap`.
- Produce: estructura de secciones con `id`/`class` fijos que las Tasks 2-6 estilan: `#inicio.hero`, `#sobre-mi.about`, `#portfolio.portfolio-intro`, `.project-panel.project-sala`, `.project-panel.project-mnba`, `#project-modal.modal`, `#contacto.contact`, `.footer`.

- [ ] **Step 1: Reemplazar `index.html` completo**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Violeta Pía - Diseñadora Gráfica</title>
    <meta name="description" content="Portfolio de Violeta Pía, diseñadora gráfica especializada en branding, identidad visual y comunicación estratégica.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%236C2E8C'/><text x='50' y='70' font-size='60' text-anchor='middle' fill='white' font-family='Georgia, serif' font-weight='700'>V</text></svg>">
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Newsreader:ital,wght@0,400;0,500;1,400;1,500&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="cursor"></div>
    <div class="cursor-follower"></div>

    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="#inicio" class="nav-mark"><span class="nav-dot"></span>Violeta Pía</a>
            <ul class="nav-menu">
                <li><a href="#inicio" class="nav-link">Inicio</a></li>
                <li><a href="#sobre-mi" class="nav-link">Sobre mí</a></li>
                <li><a href="#portfolio" class="nav-link">Portfolio</a></li>
                <li><a href="#contacto" class="nav-link">Contacto</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <section id="inicio" class="hero" data-panel="paper">
        <span class="hero-ghost" aria-hidden="true">PÍA</span>
        <div class="hero-inner">
            <span class="eyebrow">Diseñadora gráfica · Buenos Aires</span>
            <h1 class="hero-title">Identidades que <em>se sostienen</em> en el tiempo.</h1>
            <p class="hero-subtitle">Branding, sistemas visuales y comunicación estratégica para marcas que necesitan verse tan bien como funcionan.</p>
            <div class="hero-ctas">
                <a href="#portfolio" class="btn primary">Ver portfolio</a>
                <a href="https://wa.me/5491169807819" class="btn" target="_blank" rel="noopener">Hablemos</a>
            </div>
        </div>
    </section>

    <section id="sobre-mi" class="about" data-panel="paper">
        <div class="about-photo"><img src="images/violeta.png" alt="Retrato de Violeta Pía" width="150" height="150" loading="lazy"></div>
        <div class="about-text">
            <span class="eyebrow">Sobre mí</span>
            <p class="about-lead">Creo en el diseño como herramienta para <span>conectar personas, ideas y marcas</span> — combinando creatividad y estrategia en cada sistema de identidad que construyo.</p>
            <p class="about-body">Mi experiencia creando y gestionando proyectos propios me permitió comprender las marcas desde adentro: entender qué necesitan comunicar, a quién le hablan y cómo el diseño puede ayudarlas a crecer.</p>
            <ul class="tools">
                <li>Illustrator</li>
                <li>Photoshop</li>
                <li>InDesign</li>
                <li>Figma</li>
                <li>Canva</li>
            </ul>
        </div>
    </section>

    <section id="portfolio" class="portfolio-intro" data-panel="paper">
        <div class="section-header">
            <span class="eyebrow">Proyectos</span>
            <h2>Sistemas de identidad</h2>
        </div>
    </section>

    <section class="project-panel project-sala" data-panel="sala"
        data-title="Rebranding Centro Cultural Salamanca"
        data-category-label="Branding"
        data-description="Una propuesta que mantiene la tradición desde una mirada contemporánea para atraer a las nuevas generaciones."
        data-client="Centro Cultural Salamanca"
        data-year="2025"
        data-services="Branding, UI/UX, Diseño Web"
        data-link-app="https://www.figma.com/proto/DhtUyjIGfVBBisLJV6RXvc/Salamanca?node-id=1-4&p=f&viewport=313%2C209%2C0.13&t=JWBuZchWzuxsmY3m-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A4&page-id=0%3A1"
        data-link-app-label="Ver Prototipo App"
        data-link-web="https://www.figma.com/proto/DhtUyjIGfVBBisLJV6RXvc/Salamanca?node-id=28-3206&p=f&viewport=240%2C88%2C0.12&t=cGY0jYMcHUl8AbLD-1&scaling=scale-down&content-scaling=fixed&page-id=24%3A3189"
        data-link-web-label="Ver Prototipo Web"
        data-link-book="https://online.fliphtml5.com/visitor/aeyp/#p=1"
        data-link-book-label="Ver Brandbook">
        <div class="panel-grid">
            <div class="panel-image"><img src="images/salamanca-cover.jpg" alt="Cover del rebranding de Centro Cultural Salamanca" loading="lazy"></div>
            <div class="panel-text">
                <span class="panel-tag">Branding · 2025</span>
                <h3>Somos Salamanca</h3>
                <p>Una propuesta que mantiene la tradición del centro cultural desde una mirada contemporánea, pensada para atraer a las nuevas generaciones.</p>
                <button type="button" class="panel-link open-project">Ver el sistema completo →</button>
            </div>
        </div>
        <svg class="panel-motif" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="20" r="14" fill="currentColor"/>
            <path d="M60 34 C40 34 40 60 60 60 C80 60 80 34 60 34 Z" fill="currentColor" opacity="0.9"/>
            <circle cx="30" cy="70" r="10" fill="currentColor"/>
            <circle cx="90" cy="70" r="10" fill="currentColor"/>
        </svg>
    </section>

    <section class="project-panel project-mnba" data-panel="mnba"
        data-title="Sistema de Señalización — Museo Nacional de Bellas Artes"
        data-category-label="Señalética"
        data-description="Guía el recorrido del visitante hacia el museo y mejora su experiencia mediante un diseño claro y accesible."
        data-client="Museo Nacional de Bellas Artes"
        data-year="2025"
        data-services="Señalética, Diseño Editorial, Identidad"
        data-link-app="https://online.fliphtml5.com/visitor/kxxq/#p=1"
        data-link-app-label="Ver Señalética Online">
        <div class="panel-grid reverse">
            <div class="panel-text">
                <span class="panel-tag">Señalética · 2025</span>
                <h3>Museo Nacional de Bellas Artes</h3>
                <p>Guía el recorrido del visitante hacia el museo y mejora su experiencia mediante un diseño claro y accesible.</p>
                <button type="button" class="panel-link open-project">Ver el sistema completo →</button>
            </div>
            <div class="panel-image"><img src="images/mnba-cover.jpg" alt="Cover del sistema de señalización del Museo Nacional de Bellas Artes" loading="lazy"></div>
        </div>
        <svg class="panel-motif panel-motif-right" viewBox="0 0 120 120" aria-hidden="true">
            <path d="M10 60 L70 60 M70 60 L50 40 M70 60 L50 80" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="100" cy="60" r="8" fill="currentColor"/>
        </svg>
    </section>

    <div id="project-modal" class="modal">
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                <div class="modal-image">
                    <div class="image-placeholder">Imagen del proyecto</div>
                </div>
                <div class="modal-info">
                    <span class="modal-category">Categoría</span>
                    <h2 class="modal-title">Nombre del Proyecto</h2>
                    <p class="modal-description">Descripción detallada del proyecto, objetivos, proceso creativo y resultados obtenidos.</p>
                    <div class="modal-details">
                        <div class="detail-item">
                            <strong>Cliente:</strong>
                            <span id="modal-client">Nombre del cliente</span>
                        </div>
                        <div class="detail-item">
                            <strong>Año:</strong>
                            <span id="modal-year">2025</span>
                        </div>
                        <div class="detail-item">
                            <strong>Servicios:</strong>
                            <span id="modal-services">Branding, Diseño</span>
                        </div>
                    </div>
                    <div class="modal-links" id="modal-links">
                        <a href="#" class="modal-link-btn" id="modal-link-app" target="_blank" rel="noopener">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                            <span>Ver Prototipo App</span>
                        </a>
                        <a href="#" class="modal-link-btn" id="modal-link-web" target="_blank" rel="noopener">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            <span>Ver Prototipo Web</span>
                        </a>
                        <a href="#" class="modal-link-btn" id="modal-link-book" target="_blank" rel="noopener">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                            <span>Ver Brandbook</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section id="contacto" class="contact" data-panel="paper">
        <div class="section-header">
            <span class="eyebrow">Contacto</span>
            <h2>Trabajemos juntos</h2>
            <p class="contact-subtitle">¿Tenés un proyecto en mente? Me encantaría escucharlo.</p>
        </div>
        <div class="contact-content">
            <form class="contact-form">
                <div class="form-group">
                    <input type="text" id="name" name="name" placeholder="Nombre" required>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <textarea id="message" name="message" rows="5" placeholder="Mensaje" required></textarea>
                </div>
                <button type="submit" class="submit-button">Enviar mensaje</button>
            </form>
            <div class="contact-info">
                <div class="contact-item">
                    <h3>Email</h3>
                    <a href="mailto:violetapia2203@gmail.com" class="social-link">violetapia2203@gmail.com</a>
                </div>
                <div class="contact-item">
                    <h3>WhatsApp</h3>
                    <a href="https://wa.me/5491169807819" class="social-link" target="_blank" rel="noopener">+54 11 6980-7819</a>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="footer-inner">
            <span class="nav-mark"><span class="nav-dot"></span>Violeta Pía</span>
            <span>© 2026 · Tigre, Buenos Aires</span>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Reemplazar `styles.css` completo con la base (tokens + reset + nav + cursor + hamburger). El resto de selectores (`.hero`, `.about`, `.project-panel`, `.modal`, `.contact`, `.footer`) quedan vacíos de estilo hasta las próximas tasks — están en el HTML pero sin CSS todavía, lo cual es esperado en este punto del plan.**

```css
:root {
    --paper: #EFEEE6;
    --paper-raised: #F8F7F2;
    --ink: #1B1A17;
    --ink-soft: #5A5750;
    --violet: #6C2E8C;
    --violet-tint: #EAE0F0;
    --sala-red: #9E1B34;
    --sala-cream: #EFE2D1;
    --sala-ink: #3A0F18;
    --mnba-blue: #2A9BD8;
    --mnba-ink: #0B3A54;
    --border: rgba(27, 26, 23, 0.14);
    --radius-lg: 16px;
    --maxw: 1180px;
    --gutter: clamp(20px, 5vw, 64px);
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: 'Work Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    cursor: none;
}

@media (max-width: 760px), (hover: none) {
    body { cursor: auto; }
}

img { max-width: 100%; display: block; }

h1, h2, h3 { font-family: 'Bricolage Grotesque', sans-serif; text-wrap: balance; margin: 0; }

.eyebrow {
    font-family: 'Work Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--violet);
    display: inline-block;
}

.wrap { max-width: var(--maxw); margin: 0 auto; padding-inline: var(--gutter); }

.btn {
    font-family: 'Work Sans', sans-serif;
    font-weight: 600;
    font-size: 14.5px;
    padding: 13px 26px;
    border-radius: 999px;
    text-decoration: none;
    border: 1px solid var(--ink);
    color: var(--ink);
    display: inline-block;
    transition: transform 0.15s ease;
}

.btn:hover { transform: translateY(-2px); }

.btn.primary { background: var(--ink); color: var(--paper); }

.section-header { max-width: 640px; margin: 0 auto var(--gutter); text-align: center; }
.section-header h2 { font-size: clamp(28px, 4vw, 44px); font-weight: 800; margin-top: 14px; }

/* Cursor */
.cursor, .cursor-follower {
    position: fixed;
    top: 0; left: 0;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
}
.cursor { width: 8px; height: 8px; background: var(--violet); }
.cursor-follower {
    width: 32px; height: 32px;
    border: 1.5px solid var(--violet);
    transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
    opacity: 0.6;
}
.cursor-follower.grow { width: 52px; height: 52px; opacity: 0.9; }
@media (max-width: 760px), (hover: none) {
    .cursor, .cursor-follower { display: none; }
}

/* Nav */
.navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    background: var(--paper);
    border-bottom: 0.5px solid var(--border);
    transition: background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease;
}
.nav-container {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 18px var(--gutter);
    display: flex; align-items: center; justify-content: space-between;
}
.nav-mark {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 800; font-size: 18px;
    color: var(--ink); text-decoration: none;
    display: flex; align-items: center; gap: 9px;
}
.nav-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--violet); flex-shrink: 0; }
.nav-menu { display: flex; gap: 30px; list-style: none; margin: 0; padding: 0; }
.nav-link { color: var(--ink-soft); text-decoration: none; font-weight: 500; font-size: 14px; transition: color 0.2s ease; }
.nav-link:hover, .nav-link.active { color: var(--violet); }

.hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; }
.hamburger span { width: 22px; height: 2px; background: var(--ink); transition: transform 0.2s ease, opacity 0.2s ease; }
.hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 760px) {
    .nav-menu {
        position: fixed; top: 62px; left: 0; right: 0;
        flex-direction: column; gap: 0;
        background: var(--paper);
        border-bottom: 0.5px solid var(--border);
        transform: translateY(-150%);
        transition: transform 0.25s ease;
    }
    .nav-menu.active { transform: translateY(0); }
    .nav-menu li { padding: 14px var(--gutter); border-top: 0.5px solid var(--border); }
    .hamburger { display: flex; }
}
```

- [ ] **Step 3: Verificar visualmente en el navegador**

Levantar el sitio (`npm run dev` o `node server.js`, puerto 3000) y abrir `http://localhost:3000`. Confirmar:
- El nav muestra "● Violeta Pía" con tipografía Bricolage Grotesque, fondo papel, sin errores de consola.
- Las fuentes Google (Bricolage Grotesque, Newsreader, Work Sans) cargan (Network tab, sin 404).
- El cursor personalizado (punto violeta + anillo) sigue el mouse en desktop.
- En mobile (~390px, DevTools) aparece el hamburger y el menú se abre/cierra.
- Las secciones sin estilo (hero, about, panels, modal, contact, footer) se ven como texto plano sin formato — esperado en este punto.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Rediseño: skeleton HTML completo + tokens/nav/cursor base"
```

---

### Task 2: Hero

**Files:**
- Modify: `styles.css` (agregar al final del archivo)

**Interfaces:**
- Consume: tokens de Task 1 (`--paper`, `--ink`, `--violet`, `--gutter`).
- Consume: markup `.hero`, `.hero-ghost`, `.hero-inner`, `.eyebrow`, `.hero-title`, `.hero-subtitle`, `.hero-ctas` (ya en `index.html` desde Task 1).

- [ ] **Step 1: Agregar CSS del hero**

```css
/* Hero */
.hero {
    position: relative;
    max-width: var(--maxw);
    margin: 0 auto;
    padding: clamp(120px, 16vw, 168px) var(--gutter) clamp(56px, 8vw, 88px);
    overflow: hidden;
}
.hero-ghost {
    position: absolute;
    right: -0.03em; top: 0.6em;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 800;
    font-size: clamp(64px, 15vw, 190px);
    line-height: 0.8;
    color: transparent;
    -webkit-text-stroke: 1.3px var(--border);
    letter-spacing: -0.02em;
    z-index: 0;
    user-select: none;
}
.hero-inner { position: relative; z-index: 1; max-width: 760px; }
.hero-title {
    font-size: clamp(38px, 6.4vw, 74px);
    font-weight: 800;
    line-height: 1.03;
    letter-spacing: -0.015em;
    margin-block: 18px 22px;
}
.hero-title em { font-style: normal; color: var(--violet); }
.hero-subtitle {
    font-family: 'Newsreader', serif;
    font-size: clamp(17px, 2vw, 21px);
    font-style: italic;
    color: var(--ink-soft);
    max-width: 46ch;
    line-height: 1.55;
    margin: 0 0 34px;
}
.hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }

@media (max-width: 760px) {
    .hero-ghost { display: none; }
}
```

- [ ] **Step 2: Verificar en navegador**

Recargar `http://localhost:3000`. Confirmar: título grande con "se sostienen" en violeta, "PÍA" en contorno detrás del texto (desktop), bajada en itálica Newsreader, dos botones (Ver portfolio / Hablemos — el segundo abre WhatsApp en pestaña nueva). En mobile el "PÍA" fantasma desaparece y el layout no desborda horizontalmente.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "Rediseño: sección hero"
```

---

### Task 3: Sobre mí — copiar foto real y estilar la sección

**Files:**
- Create: `images/violeta.png` (copiar desde el asset ya generado)
- Modify: `styles.css` (agregar al final)

**Interfaces:**
- Consume: markup `.about`, `.about-photo`, `.about-text`, `.about-lead`, `.about-body`, `.tools` de Task 1.

- [ ] **Step 1: Copiar la foto real al repo**

```bash
cp "/private/tmp/claude-501/-Users-pedromesaglio/39cafc38-db83-4b62-9f37-e73ba182aff5/scratchpad/vilu-redesign/images/violeta.png" "images/violeta.png"
```

(Es el headshot extraído del CV de Violeta con fondo transparente, 425×425px, ya generado en la fase de diseño.)

- [ ] **Step 2: Agregar CSS de la sección**

```css
/* Sobre mí */
.about {
    max-width: var(--maxw);
    margin: 0 auto;
    padding-block: clamp(56px, 9vw, 96px);
    padding-inline: var(--gutter);
    display: grid;
    grid-template-columns: auto 1fr;
    gap: clamp(28px, 5vw, 56px);
    align-items: center;
}
.about-photo {
    width: 168px; height: 168px;
    border-radius: 50%;
    background: var(--violet-tint);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
}
.about-photo img { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; }
.about-text .eyebrow { margin-bottom: 14px; }
.about-lead {
    font-family: 'Newsreader', serif;
    font-size: clamp(19px, 2.4vw, 25px);
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.005em;
    max-width: 56ch;
    margin: 0 0 16px;
}
.about-lead span { color: var(--violet); }
.about-body {
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--ink-soft);
    max-width: 58ch;
    margin: 0 0 22px;
}
.tools {
    list-style: none;
    display: flex; flex-wrap: wrap; gap: 10px;
    margin: 0; padding: 0;
}
.tools li {
    font-size: 13px; font-weight: 500;
    padding: 7px 14px;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--ink-soft);
}

@media (max-width: 760px) {
    .about { grid-template-columns: 1fr; text-align: left; }
}
```

- [ ] **Step 3: Verificar en navegador**

Confirmar que la foto circular real de Violeta aparece (no más "Tu foto aquí"), la bio en itálica con "conectar personas, ideas y marcas" en violeta, y los 5 chips de herramientas. En mobile la foto y el texto se apilan en una columna.

- [ ] **Step 4: Commit**

```bash
git add images/violeta.png styles.css
git commit -m "Rediseño: sección Sobre Mí con foto real y herramientas"
```

---

### Task 4: Panel de proyecto — Salamanca

**Files:**
- Modify: `styles.css` (agregar al final)

**Interfaces:**
- Consume: markup `.project-panel.project-sala`, `.panel-grid`, `.panel-image`, `.panel-text`, `.panel-tag`, `.panel-link`, `.panel-motif` de Task 1.
- Produce: clases compartidas `.project-panel`, `.panel-grid`, `.panel-tag`, `.panel-link`, `.panel-motif` que Task 5 (MNBA) reutiliza tal cual, solo cambiando la paleta de la variante.

- [ ] **Step 1: Agregar CSS del panel (base compartida + variante Salamanca)**

```css
/* Portfolio intro */
.portfolio-intro { padding-block: clamp(40px, 6vw, 64px) 0; }

/* Project panels — base compartida por todas las variantes */
.project-panel {
    position: relative;
    padding-block: clamp(52px, 8vw, 88px);
    padding-inline: var(--gutter);
    overflow: hidden;
}
.panel-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: clamp(28px, 5vw, 64px);
    align-items: center;
    max-width: var(--maxw);
    margin: 0 auto;
    position: relative;
    z-index: 1;
}
.panel-grid.reverse { grid-template-columns: 1fr 1.1fr; }
.panel-grid.reverse .panel-text { order: 2; }
.panel-grid.reverse .panel-image { order: 1; }
.panel-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid currentColor; border-radius: 999px; padding: 6px 14px;
    margin-bottom: 20px;
}
.panel-text h3 { font-size: clamp(28px, 4.2vw, 46px); font-weight: 800; line-height: 1.06; margin-bottom: 16px; }
.panel-text p { font-size: 15.5px; line-height: 1.65; max-width: 42ch; opacity: 0.88; margin-bottom: 26px; }
.panel-link {
    font-family: 'Work Sans', sans-serif;
    font-weight: 600; font-size: 14.5px;
    background: none; border: none; padding: 0;
    color: currentColor; cursor: pointer;
    border-bottom: 1.5px solid currentColor; padding-bottom: 2px;
}
.panel-image { border-radius: var(--radius-lg); overflow: hidden; }
.panel-image img { width: 100%; height: auto; transition: transform 0.4s ease; }
.panel-image:hover img { transform: scale(1.03); }
.panel-motif {
    position: absolute;
    width: clamp(90px, 12vw, 140px);
    height: auto;
    opacity: 0.5;
    bottom: 24px; left: var(--gutter);
    z-index: 0;
}
.panel-motif-right { left: auto; right: var(--gutter); }

@media (max-width: 760px) {
    .panel-grid, .panel-grid.reverse { grid-template-columns: 1fr; }
    .panel-grid.reverse .panel-text, .panel-grid.reverse .panel-image { order: initial; }
    .panel-motif { display: none; }
}

/* Variante Salamanca */
.project-sala { background: var(--sala-cream); color: var(--sala-ink); }
.project-sala .panel-motif { color: var(--sala-red); }
```

- [ ] **Step 2: Verificar en navegador**

Confirmar que la sección "Somos Salamanca" ocupa todo el ancho con fondo crema y texto oscuro (colores reales de esa marca), la imagen `salamanca-cover.jpg` a la izquierda, el motivo floral SVG sutil abajo, y que "Ver el sistema completo →" es clickeable (el modal se conecta en Task 7, por ahora puede no abrir todavía — no bloquea esta task). Confirmar contraste de texto legible sobre el crema.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "Rediseño: panel de proyecto compartido + variante Salamanca"
```

---

### Task 5: Panel de proyecto — MNBA + franja de transición

**Files:**
- Modify: `styles.css` (agregar al final)

**Interfaces:**
- Consume: clases compartidas `.project-panel`, `.panel-grid`, `.panel-tag`, etc. de Task 4 — solo agrega la variante de color.

- [ ] **Step 1: Agregar CSS de la variante MNBA**

```css
/* Variante MNBA */
.project-mnba { background: var(--mnba-blue); color: #fff; }
.project-mnba .panel-tag { border-color: #fff; }
.project-mnba .panel-motif { color: #fff; opacity: 0.35; }
```

- [ ] **Step 2: Verificar en navegador**

Confirmar que el panel MNBA tiene fondo celeste real, texto blanco legible, imagen a la derecha (layout invertido respecto a Salamanca por `.panel-grid.reverse`), y el motivo de flecha/señalética visible sutilmente. Confirmar que la transición visual entre el panel crema de Salamanca y el celeste de MNBA se siente intencional (sin gap raro entre ambos — deben quedar pegados, cada uno full-bleed).

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "Rediseño: variante MNBA del panel de proyecto"
```

---

### Task 6: Modal, contacto, footer — y eliminar testimonios / filtros del HTML

**Files:**
- Modify: `styles.css` (agregar al final)
- Modify: `index.html` — ya no tiene testimonios ni filtros desde Task 1 (nunca se escribieron), así que no hay nada que borrar ahí; esta task solo confirma que no quedó rastro y estila lo que falta.

**Interfaces:**
- Consume: markup `.modal`, `.contact`, `.contact-form`, `.contact-info`, `.footer` de Task 1.

- [ ] **Step 1: Agregar CSS de modal, contacto y footer**

```css
/* Modal */
.modal {
    display: none;
    position: fixed; inset: 0;
    background: rgba(27, 26, 23, 0.55);
    z-index: 2000;
    align-items: center; justify-content: center;
    padding: var(--gutter);
}
.modal.active { display: flex; }
.modal-content {
    background: var(--paper-raised);
    border-radius: var(--radius-lg);
    max-width: 880px; width: 100%;
    max-height: 86vh; overflow-y: auto;
    position: relative;
    padding: clamp(24px, 4vw, 40px);
}
.modal-close {
    position: absolute; top: 18px; right: 22px;
    font-size: 26px; line-height: 1; cursor: pointer;
    color: var(--ink-soft);
}
.modal-close:hover { color: var(--ink); }
.modal-body { display: flex; flex-direction: column; gap: 20px; }
.modal-image { border-radius: 12px; overflow: hidden; background: var(--violet-tint); min-height: 160px; }
.modal-image .image-placeholder { display: flex; align-items: center; justify-content: center; min-height: 160px; color: var(--ink-soft); font-size: 14px; }
.modal-category { color: var(--violet); font-weight: 600; font-size: 12.5px; letter-spacing: 0.08em; text-transform: uppercase; }
.modal-title { font-size: clamp(24px, 3.6vw, 34px); font-weight: 800; margin: 10px 0 14px; }
.modal-description { font-size: 15px; line-height: 1.6; color: var(--ink-soft); margin-bottom: 20px; }
.modal-details { display: flex; flex-wrap: wrap; gap: 18px; margin-bottom: 24px; font-size: 13.5px; }
.modal-details strong { display: block; color: var(--ink-soft); font-weight: 500; margin-bottom: 2px; }
.modal-links { display: flex; flex-wrap: wrap; gap: 10px; }
.modal-link-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 13.5px; font-weight: 600;
    padding: 10px 16px; border-radius: 999px;
    border: 1px solid var(--ink); color: var(--ink);
    text-decoration: none;
}
.modal-link-btn:hover { background: var(--ink); color: var(--paper); }

/* Contacto */
.contact { padding-block: clamp(56px, 9vw, 96px); }
.contact-subtitle { color: var(--ink-soft); font-size: 15.5px; margin-top: 10px; }
.contact-content {
    max-width: var(--maxw); margin: 0 auto;
    display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(28px, 5vw, 56px);
}
.form-group { margin-bottom: 16px; }
.contact-form input, .contact-form textarea {
    width: 100%;
    font-family: 'Work Sans', sans-serif; font-size: 14.5px;
    padding: 13px 16px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--paper-raised);
    color: var(--ink);
}
.contact-form input:focus, .contact-form textarea:focus {
    outline: none; border-color: var(--violet);
}
.submit-button {
    font-family: 'Work Sans', sans-serif; font-weight: 600; font-size: 14.5px;
    padding: 13px 28px; border-radius: 999px;
    background: var(--ink); color: var(--paper);
    border: none; cursor: pointer;
}
.contact-item { margin-bottom: 22px; }
.contact-item h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-soft); font-weight: 600; margin-bottom: 6px; }
.social-link { color: var(--violet); text-decoration: none; font-size: 15px; font-weight: 500; }
.social-link:hover { text-decoration: underline; }

@media (max-width: 760px) {
    .contact-content { grid-template-columns: 1fr; }
}

/* Footer */
.footer { border-top: 0.5px solid var(--border); padding-block: 26px; }
.footer-inner {
    max-width: var(--maxw); margin: 0 auto; padding-inline: var(--gutter);
    display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;
    font-size: 13px; color: var(--ink-soft);
}
```

- [ ] **Step 2: Confirmar en el código que no queda ningún rastro de testimonios ni filtros**

```bash
grep -in "testimonial\|filter-btn\|data-filter" index.html
```

Expected: sin resultados (Task 1 ya escribió el HTML sin esas secciones).

- [ ] **Step 3: Verificar en navegador**

Confirmar: sección de contacto con formulario funcional visualmente (falta probar el submit real, eso es Task 7), email correcto `violetapia2203@gmail.com` en vez del placeholder viejo, sin links a Instagram/Behance/LinkedIn rotos, footer minimal con el wordmark. Click en "Ver el sistema completo →" de un panel — el modal probablemente todavía no abre (JS pendiente en Task 7), confirmarlo y no bloquear esta task por eso.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Rediseño: modal, contacto y footer"
```

---

### Task 7: JavaScript — quitar testimonios/filtros, transición de color del nav, cursor

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consume: `data-panel` attribute en cada `<section>`/`.project-panel` (paper/sala/mnba) escrito en Task 1 — clave para la transición de color.
- Produce: función `updateNavPanel(panelName)` que aplica `document.documentElement.style.setProperty('--nav-bg', ...)` — no consumida por otras tasks (es la última).

- [ ] **Step 1: Leer el archivo actual completo para confirmar los números de línea antes de editar**

```bash
grep -n "^function\|^// \|addEventListener" script.js
```

(Los bloques a tocar, según el archivo actual: cursor L1-50, hamburger L51-82, smooth scroll L83-97, filtro de portfolio L98-130 [eliminar — ya no existen `.filter-btn` en el HTML], modal L131-202, reveal on scroll L203-248, navbar on scroll L249-273 [reemplazar], contact form L274-350, parallax hero L351-368 [eliminar — ya no hay `.hero-shape`], hover portfolio items L369-379, mobile detection L396-404, DOMContentLoaded L469-480, bloque de testimonios L481-654 [eliminar completo], error handler L655-658.)

- [ ] **Step 2: Eliminar el bloque de filtro de portfolio (ya no hay botones `.filter-btn` en el HTML)**

Buscar el comentario `// Filtro del portfolio` y borrar ese bloque completo (selecciona `.filter-btn` y `.portfolio-item`, ya no aplica con el nuevo markup de paneles).

- [ ] **Step 3: Eliminar el bloque de parallax del hero (ya no hay `.hero-shape` en el nuevo hero)**

Buscar el comentario `// Efecto parallax sutil en el hero` y borrar ese bloque completo.

- [ ] **Step 4: Eliminar el bloque completo de testimonios**

Buscar el comentario `// Sistema de calificación con estrellas para testimonios` y borrar todo hasta el final del archivo, **excepto** el bloque final `// Manejo de errores global` (el `window.addEventListener('error', ...)`), que se conserva pegado justo después del bloque de `DOMContentLoaded`.

- [ ] **Step 5: Reemplazar el bloque "Navbar con efecto al scroll" por la transición de color por sección**

```javascript
// Navbar: transición de color según la sección visible
const navbar = document.getElementById('navbar');
const panelColors = {
    paper: { bg: '#EFEEE6', text: '#1B1A17' },
    sala: { bg: '#EFE2D1', text: '#3A0F18' },
    mnba: { bg: '#2A9BD8', text: '#ffffff' }
};

function updateNavPanel(panelName) {
    const colors = panelColors[panelName] || panelColors.paper;
    navbar.style.backgroundColor = colors.bg;
    navbar.style.color = colors.text;
    navbar.style.borderBottomColor = panelName === 'mnba'
        ? 'rgba(255,255,255,0.25)'
        : 'rgba(27,26,23,0.14)';
}

const panelSections = document.querySelectorAll('[data-panel]');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            updateNavPanel(entry.target.dataset.panel);
        }
    });
}, { threshold: [0.5] });

panelSections.forEach((section) => navObserver.observe(section));
```

- [ ] **Step 6: Restylear el cursor para que use el color violeta (ya lo hace vía CSS en Task 1 — confirmar que el JS no hardcodea otro color)**

```bash
grep -n "cursor" script.js | grep -i "color\|background"
```

Expected: sin resultados (el color vive en `styles.css`, el JS solo mueve la posición) — si aparece algún `style.background` hardcodeado con el color viejo (`#c9a676` o similar), quitarlo para que herede del CSS.

- [ ] **Step 7: Verificar en el navegador**

Recargar `http://localhost:3000` con la consola abierta:
- Hacer scroll desde el hero hasta contacto: el fondo del nav debe pasar de papel → crema (Salamanca) → celeste (MNBA) → papel, con transición suave, sin saltos ni errores de consola.
- Click en "Ver el sistema completo →" de Salamanca: el modal abre con los datos correctos (cliente, año, servicios, links a Figma/brandbook reales) y el link "Ver Brandbook" solo aparece en el proyecto que lo tiene (Salamanca) — MNBA no debería mostrar un botón "Ver Brandbook" roto.
- Cerrar el modal con la X, con click afuera, y con ESC — las tres formas deben funcionar (código ya existente, no tocado).
- Llenar y enviar el formulario de contacto: confirmar en la pestaña Network que hace `POST /api/contact` y responde 200/201 (no se rompió con los cambios de clases CSS).
- Confirmar que no hay ningún `console.error` relacionado a elementos que ya no existen (`.filter-btn`, `.testimonial-form`, `.hero-shape`).

- [ ] **Step 8: Commit**

```bash
git add script.js
git commit -m "Rediseño: JS — transición de color del nav, quita filtros y testimonios"
```

---

### Task 8: QA responsive final y cierre

**Files:**
- Modify: `styles.css` (solo ajustes puntuales que surjan del QA — no se anticipa código nuevo grande en esta task)

**Interfaces:**
- Ninguna — task de verificación final.

- [ ] **Step 1: QA visual en desktop (~1280px)**

Recorrer el sitio completo de arriba a abajo. Checklist:
- Hero: título y "PÍA" fantasma no se solapan de forma ilegible; CTAs alineados.
- Sobre mí: foto y bio bien alineadas verticalmente.
- Paneles Salamanca/MNBA: imágenes sin distorsión, contraste de texto correcto sobre cada color, motivo SVG no tapa texto.
- Contacto: formulario y datos de contacto alineados en dos columnas.
- Footer: wordmark y datos alineados.

- [ ] **Step 2: QA visual en mobile (~390px, DevTools device toolbar)**

Repetir el recorrido. Checklist adicional:
- Nav: hamburger abre/cierra, links clickeables, no hay scroll horizontal en ningún punto de la página (confirmar con `document.documentElement.scrollWidth <= window.innerWidth` en la consola).
- Hero: "PÍA" fantasma oculto, texto legible sin overflow.
- Paneles: imagen y texto apilados en una columna, motivo SVG oculto (ya definido en Task 4).
- Formulario de contacto usable con el teclado táctil (inputs con tamaño de touch-target razonable, ya cumplen por el padding de Task 6).

- [ ] **Step 3: Corregir cualquier issue puntual encontrado en los Steps 1-2 directamente en `styles.css`**

(Sin código genérico acá — si aparece un problema real, se soluciona con el selector y la propiedad CSS específica que lo causa.)

- [ ] **Step 4: Confirmar que el email y los links de contacto son correctos**

```bash
grep -n "tu.email@ejemplo.com\|violetapia2203@gmail.com\|5491169807819" index.html
```

Expected: no aparece `tu.email@ejemplo.com`; aparece `violetapia2203@gmail.com` y `5491169807819` (WhatsApp).

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "Rediseño: ajustes finales de QA responsive"
```

- [ ] **Step 6: Mostrarle el resultado a Pedro antes de cerrar**

No pushear a `main`/deploy sin que Pedro vea el sitio corriendo localmente primero (preferencia conocida: preview local antes de actualizar cualquier entrega). Confirmar con él si se hace `git push` para que Vercel redeploye, o si prefiere revisarlo más.
