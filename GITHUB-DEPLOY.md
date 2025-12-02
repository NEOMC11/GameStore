# 🚀 Guía Completa de Deploy - GameStore

Esta guía te muestra cómo subir GameStore a GitHub y desplegarlo en la web.

## 📋 Preparación de Archivos

### Estructura Final del Proyecto

```
gamestore/
│
├── index.html              # Página principal
├── styles.css              # Estilos
├── app.js                  # Funcionalidades
├── data.js                 # Datos iniciales
├── README.md               # Documentación
├── LOGO-GUIDE.md          # Guía del logo
├── GITHUB-DEPLOY.md       # Esta guía
│
└── assets/
    └── logo.png           # Logo (crea uno siguiendo LOGO-GUIDE.md)
```

## 🎯 Paso 1: Subir a GitHub

### Opción A: Usando GitHub Desktop (Más Fácil)

1. **Descarga GitHub Desktop**
   - Ve a [desktop.github.com](https://desktop.github.com)
   - Instala la aplicación

2. **Crea un nuevo repositorio**
   - Abre GitHub Desktop
   - Clic en "File" → "New Repository"
   - Nombre: `gamestore`
   - Descripción: "Tienda de juegos y Minecraft"
   - Clic en "Create Repository"

3. **Añade los archivos**
   - Copia todos los archivos del proyecto a la carpeta del repositorio
   - GitHub Desktop detectará los cambios automáticamente

4. **Haz el primer commit**
   - Escribe un mensaje: "Initial commit - GameStore v1.0"
   - Clic en "Commit to main"

5. **Publica en GitHub**
   - Clic en "Publish repository"
   - Marca "Keep this code private" si quieres que sea privado
   - Clic en "Publish Repository"

### Opción B: Usando Git en Terminal

```bash
# 1. Navega a la carpeta de tu proyecto
cd ruta/a/gamestore

# 2. Inicializa Git
git init

# 3. Añade todos los archivos
git add .

# 4. Haz el primer commit
git commit -m "Initial commit - GameStore v1.0"

# 5. Crea el repositorio en GitHub
# Ve a github.com y crea un nuevo repositorio llamado "gamestore"

# 6. Conecta tu repositorio local con GitHub
git remote add origin https://github.com/TU-USUARIO/gamestore.git

# 7. Sube los archivos
git branch -M main
git push -u origin main
```

## 🌐 Paso 2: Deploy en GitHub Pages

### Método 1: Desde la Configuración (Recomendado)

1. **Ve a tu repositorio en GitHub**
   - `https://github.com/TU-USUARIO/gamestore`

2. **Abre Settings (Configuración)**
   - Clic en "Settings" en la barra superior

3. **Activa GitHub Pages**
   - En el menú lateral, clic en "Pages"
   - En "Source", selecciona "main"
   - En "Folder", deja "/ (root)"
   - Clic en "Save"

4. **Espera unos minutos**
   - GitHub generará tu sitio
   - Verás un mensaje: "Your site is published at..."
   - Tu sitio estará en: `https://TU-USUARIO.github.io/gamestore`

### Método 2: Usando Actions (Automático)

GitHub Pages se activará automáticamente al subir archivos al repositorio.

## 🚀 Paso 3: Deploy en Vercel (Alternativa Premium)

Vercel ofrece mejor rendimiento y es gratuito para proyectos personales.

### Desde GitHub

1. **Ve a [vercel.com](https://vercel.com)**
2. **Clic en "Sign Up" e inicia sesión con GitHub**
3. **Importa tu proyecto**
   - Clic en "Add New..." → "Project"
   - Selecciona tu repositorio `gamestore`
4. **Configura el proyecto**
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Deja las demás opciones por defecto
5. **Clic en "Deploy"**
6. **¡Listo!**
   - Tu sitio estará en: `gamestore.vercel.app`
   - O un dominio personalizado que elijas

### Ventajas de Vercel
- ✅ Deploy automático en cada push
- ✅ CDN global (carga rápida en todo el mundo)
- ✅ HTTPS automático
- ✅ Dominio personalizado gratis
- ✅ Analytics incluidos

## 🌍 Paso 4: Deploy en Netlify (Otra Alternativa)

Similar a Vercel, muy fácil de usar.

1. **Ve a [netlify.com](https://www.netlify.com)**
2. **Clic en "Sign Up" con GitHub**
3. **Clic en "New site from Git"**
4. **Selecciona GitHub y tu repositorio**
5. **Deploy settings**:
   - Build command: (dejar vacío)
   - Publish directory: `/`
6. **Clic en "Deploy site"**
7. Tu sitio estará en: `nombre-random.netlify.app`
   - Puedes cambiar el nombre en Site Settings

## 📱 Paso 5: Personalizar el Dominio

### En GitHub Pages

1. **Compra un dominio** (opcional)
   - Namecheap, Google Domains, GoDaddy, etc.

2. **Configura DNS**
   - Añade un registro CNAME apuntando a: `TU-USUARIO.github.io`

3. **En GitHub Settings → Pages**
   - En "Custom domain", escribe tu dominio
   - Marca "Enforce HTTPS"

### En Vercel/Netlify

1. **Ve a Settings → Domains**
2. **Añade tu dominio personalizado**
3. **Sigue las instrucciones de DNS**

## 🔄 Actualizar el Sitio

### Usando GitHub Desktop

1. Modifica los archivos localmente
2. GitHub Desktop detecta los cambios
3. Escribe un mensaje de commit (ej: "Añadidos nuevos juegos")
4. Clic en "Commit to main"
5. Clic en "Push origin"
6. ¡El sitio se actualiza automáticamente!

### Usando Terminal

```bash
# 1. Haz los cambios en tus archivos

# 2. Añade los cambios
git add .

# 3. Haz commit
git commit -m "Descripción de los cambios"

# 4. Sube a GitHub
git push
```

## 🎨 Personalización Post-Deploy

### Cambiar el Título de la Pestaña

En `index.html`:
```html
<title>Tu Nombre - GameStore</title>
```

### Cambiar Redes Sociales

En `index.html`, busca:
```html
<a href="TU_YOUTUBE" target="_blank" class="social-link youtube">
<a href="TU_INSTAGRAM" target="_blank" class="social-link instagram">
<a href="TU_TIKTOK" target="_blank" class="social-link tiktok">
```

### Cambiar Contraseña Admin

En `app.js`:
```javascript
const ADMIN_PASSWORD = 'tu-nueva-contraseña';
```

## 🔍 SEO y Optimización

### Añadir Meta Tags

Añade en el `<head>` de `index.html`:

```html
<!-- SEO Meta Tags -->
<meta name="description" content="Descarga juegos, apps, texturas y mundos de Minecraft gratis">
<meta name="keywords" content="minecraft, juegos, texturas, shaders, addons, mundos, craftsman">
<meta name="author" content="Tu Nombre">

<!-- Open Graph para compartir en redes sociales -->
<meta property="og:title" content="GameStore - Juegos y Minecraft">
<meta property="og:description" content="Descarga juegos, apps, texturas y mundos de Minecraft">
<meta property="og:image" content="https://tu-sitio.com/assets/logo.png">
<meta property="og:url" content="https://tu-sitio.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="GameStore">
<meta name="twitter:description" content="Descarga juegos y contenido de Minecraft">
<meta name="twitter:image" content="https://tu-sitio.com/assets/logo.png">
```

## 📊 Analytics (Opcional)

### Google Analytics

1. **Crea una cuenta en [analytics.google.com](https://analytics.google.com)**
2. **Obtén tu código de seguimiento**
3. **Añádelo antes de `</head>` en index.html**:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU-ID');
</script>
```

## 🐛 Solución de Problemas

### El sitio no carga
- Verifica que `index.html` esté en la raíz del repositorio
- Espera 2-3 minutos después del deploy
- Limpia el caché del navegador (Ctrl + F5)

### Las imágenes no aparecen
- Verifica que la carpeta `assets/` esté en el repositorio
- Revisa que las rutas sean relativas: `assets/logo.png`
- Asegúrate de que las imágenes estén subidas

### Los datos no se guardan
- LocalStorage funciona solo en el mismo dominio
- No funcionará en modo incógnito
- Verifica la consola del navegador (F12) para errores

### Error 404
- Verifica que GitHub Pages esté activado
- Revisa que la rama sea `main` y la carpeta sea `/root`
- Espera unos minutos para la propagación

## 🎉 ¡Felicidades!

Tu GameStore ya está online y accesible desde cualquier parte del mundo.

### URLs de Ejemplo
- **GitHub Pages**: `https://tu-usuario.github.io/gamestore`
- **Vercel**: `https://gamestore.vercel.app`
- **Netlify**: `https://gamestore.netlify.app`

## 📈 Próximos Pasos

1. ✅ Comparte tu sitio en redes sociales
2. ✅ Añade más contenido usando el panel admin
3. ✅ Personaliza los colores y estilos
4. ✅ Añade un dominio personalizado
5. ✅ Implementa analytics para ver visitantes

## 🆘 Necesitas Ayuda?

- **GitHub Issues**: Abre un issue en tu repositorio
- **GitHub Discussions**: Pregunta a la comunidad
- **Stack Overflow**: Busca o pregunta sobre problemas específicos

---

**¡Tu GameStore está lista para conquistar el mundo!** 🚀🎮