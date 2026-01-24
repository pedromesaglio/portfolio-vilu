# Portfolio Violeta Pía - Diseñadora Gráfica

Portfolio profesional con backend completo para gestionar testimonios y mensajes de contacto.

## 🚀 Características

- ✨ Diseño moderno y elegante
- 📱 Totalmente responsive
- 🎨 Animaciones suaves
- 💾 Backend con Node.js y Express
- 🗄️ Base de datos SQLite
- 📝 Sistema de testimonios con calificación
- 📧 Formulario de contacto funcional
- 🎯 API RESTful completa

## 📋 Requisitos

- Node.js v14 o superior
- npm o yarn

## 🔧 Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno** (opcional)

El archivo `.env` ya está configurado con valores por defecto. Puedes modificarlo si necesitas:
```
PORT=3000
NODE_ENV=development
```

## 🎮 Uso

### Iniciar el servidor

**Modo normal:**
```bash
npm start
```

**Modo desarrollo (con auto-reload):**
```bash
npm run dev
```

El portfolio estará disponible en: **http://localhost:3000**

## 📡 API Endpoints

### Testimonios

- `GET /api/testimonials` - Obtener todos los testimonios
- `GET /api/testimonials/:id` - Obtener un testimonio específico
- `POST /api/testimonials` - Crear nuevo testimonio
- `DELETE /api/testimonials/:id` - Eliminar testimonio

**Ejemplo POST:**
```json
{
  "name": "Juan Pérez",
  "position": "CEO, Mi Empresa",
  "message": "Excelente trabajo!",
  "rating": 5
}
```

### Mensajes de Contacto

- `GET /api/contact` - Obtener todos los mensajes
- `GET /api/contact/:id` - Obtener un mensaje específico
- `POST /api/contact` - Crear nuevo mensaje
- `PATCH /api/contact/:id/read` - Marcar mensaje como leído
- `DELETE /api/contact/:id` - Eliminar mensaje

**Ejemplo POST:**
```json
{
  "name": "María García",
  "email": "maria@example.com",
  "message": "Me gustaría trabajar contigo"
}
```

### Health Check

- `GET /api/health` - Verificar estado del servidor

## 📁 Estructura del Proyecto

```
portfolio-vilu/
├── index.html          # Página principal
├── styles.css          # Estilos
├── script.js           # JavaScript del frontend
├── server.js           # Servidor Express
├── database.js         # Configuración de la base de datos
├── package.json        # Dependencias del proyecto
├── .env                # Variables de entorno
├── .gitignore          # Archivos ignorados por git
├── README.md           # Este archivo
└── portfolio.db        # Base de datos SQLite (se crea automáticamente)
```

## 🗄️ Base de Datos

El proyecto usa SQLite que se crea automáticamente al iniciar el servidor.

**Tablas:**

1. **testimonials**
   - id (INTEGER PRIMARY KEY)
   - name (TEXT)
   - position (TEXT)
   - message (TEXT)
   - rating (INTEGER 1-5)
   - created_at (DATETIME)
   - approved (BOOLEAN)

2. **contact_messages**
   - id (INTEGER PRIMARY KEY)
   - name (TEXT)
   - email (TEXT)
   - message (TEXT)
   - created_at (DATETIME)
   - read (BOOLEAN)

## 🎨 Personalización

### Colores

Los colores principales están definidos en `styles.css`:

```css
:root {
    --primary-color: #1a1a1a;
    --accent-color: #c9a676;
    --accent-dark: #a88557;
}
```

### Contenido

- **Textos:** Editar `index.html`
- **Proyectos del portfolio:** Agregar más divs `.portfolio-item` en el HTML
- **Imágenes:** Reemplazar los `.image-placeholder` con tus imágenes reales

## 🚀 Despliegue

### Opción 1: Servidor propio

1. Subir todos los archivos al servidor
2. Instalar dependencias: `npm install --production`
3. Iniciar: `npm start`

### Opción 2: Heroku

1. Crear app en Heroku
2. Conectar repositorio Git
3. Deploy automático

### Opción 3: Vercel / Netlify

Estas plataformas requieren configuración adicional para el backend.

## 📝 Notas

- Los testimonios nuevos se aprueban automáticamente (`approved = 1`)
- La base de datos incluye 3 testimonios de ejemplo
- El puerto por defecto es 3000, pero puedes cambiarlo en `.env`

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Fetch API

- **Backend:**
  - Node.js
  - Express.js
  - SQLite3
  - CORS

## 📞 Soporte

Para cualquier duda o problema, contacta a través del formulario de contacto en el portfolio.

## 📄 Licencia

Este proyecto es de uso personal para Violeta Pía.

---

Hecho con ❤️ para Violeta Pía
