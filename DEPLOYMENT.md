# 🚀 Guía de Deployment en Vercel

Este portfolio está listo para ser desplegado en Vercel con base de datos Neon PostgreSQL.

## 📋 Requisitos Previos

- Cuenta en [Vercel](https://vercel.com) (gratis)
- Cuenta en [Neon](https://neon.tech) (gratis)
- Git instalado

---

## 🎯 Opción 1: Deploy usando Vercel CLI (Recomendado)

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login en Vercel

```bash
vercel login
```

### Paso 3: Crear base de datos en Neon

1. Ve a [https://console.neon.tech](https://console.neon.tech)
2. Click en "Create Project"
3. Nombre del proyecto: `violetapia-portfolio`
4. Región: Selecciona la más cercana a tus usuarios
5. Click en "Create Project"
6. **COPIA el "Connection String"** que aparece (lo necesitarás después)

### Paso 4: Deploy a Vercel

```bash
cd "/home/pedro/Desktop/portfolio vilu"
vercel
```

Responde a las preguntas:
- **Set up and deploy?** → `Y`
- **Which scope?** → Selecciona tu cuenta
- **Link to existing project?** → `N`
- **What's your project's name?** → `violetapia`
- **In which directory is your code located?** → `./` (presiona Enter)
- **Want to override the settings?** → `N`

### Paso 5: Agregar la variable de entorno

```bash
vercel env add DATABASE_URL
```

- Cuando te pregunte el valor, pega el **Connection String** de Neon
- Selecciona: `Production`, `Preview`, `Development` (todos)

### Paso 6: Deploy a Producción

```bash
vercel --prod
```

🎉 **¡Listo!** Tu portfolio estará en: **https://violetapia.vercel.app**

---

## 🌐 Opción 2: Deploy usando la interfaz web de Vercel

### Paso 1: Subir código a GitHub

```bash
# Asegúrate de estar en el directorio del proyecto
cd "/home/pedro/Desktop/portfolio vilu"

# Si no has hecho commit, hazlo ahora
git add .
git commit -m "Preparado para deployment en Vercel"

# Crear repositorio en GitHub y subir código
# Ve a github.com y crea un nuevo repositorio llamado "portfolio-violetapia"
# Luego ejecuta:
git remote add origin https://github.com/TU-USUARIO/portfolio-violetapia.git
git branch -M main
git push -u origin main
```

### Paso 2: Crear base de datos en Neon

1. Ve a [https://console.neon.tech](https://console.neon.tech)
2. Click en "Create Project"
3. Nombre: `violetapia-portfolio`
4. Click en "Create Project"
5. **COPIA el "Connection String"**

### Paso 3: Importar en Vercel

1. Ve a [https://vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. Configuración del proyecto:
   - **Project Name**: `violetapia`
   - **Framework Preset**: Other
   - **Build Command**: (déjalo vacío)
   - **Output Directory**: (déjalo vacío)
   - **Install Command**: `npm install`

4. **Variables de entorno:**
   - Click en "Environment Variables"
   - Nombre: `DATABASE_URL`
   - Valor: Pega el Connection String de Neon
   - Marca: Production, Preview, Development

5. Click en **"Deploy"**

🎉 Tu portfolio estará en: **https://violetapia.vercel.app**

---

## 🔧 Configuración Adicional

### Dominio personalizado (Opcional)

Si quieres usar un dominio propio como `violetapia.com`:

1. En Vercel, ve a tu proyecto
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Sigue las instrucciones de configuración DNS

### Variables de entorno

Tu proyecto usa:
- `DATABASE_URL` - Conexión a Neon PostgreSQL (requerido en producción)
- `PORT` - Puerto del servidor (opcional, Vercel lo maneja automáticamente)

---

## ✅ Verificar que todo funciona

1. Abre https://violetapia.vercel.app
2. Verifica que la página carga correctamente
3. Prueba dejar un comentario en la sección de testimonios
4. Prueba el formulario de contacto

---

## 🐛 Solución de Problemas

### Error: "DATABASE_URL is not defined"
- Asegúrate de haber agregado la variable de entorno `DATABASE_URL` en Vercel
- Redeploy el proyecto después de agregar la variable

### Los comentarios no se guardan
- Verifica que la base de datos Neon esté activa
- Revisa los logs en Vercel: Dashboard → Tu Proyecto → Deployments → Click en el deployment → "View Function Logs"

### Página no carga
- Revisa los logs de deployment en Vercel
- Asegúrate de que todas las dependencias estén en `package.json`

---

## 📊 Monitoreo

- **Logs de Vercel**: [Dashboard → Proyecto → Deployments](https://vercel.com/dashboard)
- **Base de datos Neon**: [Console Neon](https://console.neon.tech)
- **Analytics**: Vercel ofrece analytics gratis en el dashboard

---

## 💡 Notas Importantes

- **Base de datos**: Neon tiene un tier gratuito generoso (hasta 0.5GB de almacenamiento)
- **Vercel**: El tier gratuito es perfecto para portfolios personales
- **Desarrollo local**: Usa SQLite automáticamente (no necesitas Neon para desarrollo)
- **Backups**: Neon hace backups automáticos de tu base de datos

---

## 🔄 Actualizaciones Futuras

Para actualizar el portfolio:

1. Haz cambios en tu código
2. Commit y push a GitHub (si usas la opción web)
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push
   ```
3. Vercel hará deploy automáticamente

O si usas CLI:
```bash
vercel --prod
```

---

¿Necesitas ayuda? Revisa:
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Neon](https://neon.tech/docs)
