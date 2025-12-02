# ⚡ GAMESTORE - GUÍA DE INICIO RÁPIDO

## 🎯 Lo que necesitas saber en 2 minutos

### 📦 Archivos del Proyecto
```
gamestore/
├── index.html          ← Página principal
├── styles.css          ← Diseño y colores
├── app.js             ← Funcionalidades
├── data.js            ← 20+ contenidos de ejemplo
├── .gitignore         ← Archivos a ignorar
├── README.md          ← Documentación completa
├── QUICKSTART.md      ← Esta guía
└── assets/
    └── logo.png       ← Tu logo (créalo con LOGO-GUIDE.md)
```

## 🚀 Opción 1: Usar Localmente (3 pasos)

1. **Descarga todos los archivos**
2. **Crea la carpeta `assets/` y añade un `logo.png`**
3. **Abre `index.html` en tu navegador**

¡Listo! ✅

## 🌐 Opción 2: Subir a la Web (5 pasos)

1. **Crea un repositorio en GitHub** llamado `gamestore`
2. **Sube todos los archivos** (usa GitHub Desktop o terminal)
3. **Ve a Settings → Pages** en GitHub
4. **Selecciona rama `main` y carpeta `/root`**
5. **Espera 2 minutos** → Tu sitio estará en `tu-usuario.github.io/gamestore`

¡Online! 🌍

## 🔑 Contraseña Admin

```
Contraseña: gaelzule
```

Para cambiarla, edita en `app.js`:
```javascript
const ADMIN_PASSWORD = 'tu-nueva-contraseña';
```

## 🎨 Personalización Rápida

### Cambiar Colores
Edita en `styles.css`:
```css
:root {
    --primary-color: #1E90FF;      /* Azul */
    --secondary-color: #00FF88;    /* Verde */
    --bg-primary: #121212;          /* Fondo */
}
```

### Cambiar Redes Sociales
Edita en `index.html` líneas 41-53:
```html
<a href="TU_YOUTUBE">YouTube</a>
<a href="TU_INSTAGRAM">Instagram</a>
<a href="TU_TIKTOK">TikTok</a>
```

### Cambiar Nombre
Edita en `index.html` línea 12:
```html
<title>Tu Nombre - GameStore</title>
```

## 📱 Funcionalidades Principales

✅ **20+ contenidos** de ejemplo incluidos
✅ **Modo oscuro/claro** con un clic
✅ **100% responsive** (móvil, tablet, desktop)
✅ **Panel admin** para subir contenido
✅ **Búsqueda en tiempo real**
✅ **Filtros** por tipo (apps, texturas, shaders, etc.)
✅ **Videos** embebidos de YouTube
✅ **Copiar enlaces** directos
✅ **Sin backend** - todo funciona con localStorage

## 🎮 Cómo Usar el Panel Admin

1. Clic en **menú hamburguesa** (☰)
2. Clic en **"Admin Panel"**
3. Ingresa contraseña: **`gaelzule`**
4. Elige pestaña:
   - **Subir Contenido** → Apps, texturas, shaders, etc.
   - **Subir Video** → Videos de YouTube

### Ejemplo: Subir una App

```
Nombre: Mi Juego
Descripción: Un juego increíble de aventuras...
Versión: v1.0.0
Enlace de Descarga: https://mediafire.com/file/...
URL de Imagen: https://i.imgur.com/imagen.jpg
Capturas: url1, url2, url3
Videos: https://youtube.com/watch?v=...
Tipo: App
```

Clic en **"Publicar"** ✅

## 📁 Contenido Incluido

El proyecto viene con **20+ elementos** de ejemplo:

- 🎮 **5 Apps**: Craftsman, Minecraft PE, Block Craft 3D, etc.
- 🖼️ **4 Texturas**: Faithful 32x, Realistic, Cartoon, Medieval
- ✨ **3 Shaders**: SEUS Renewed, BSL, Lagless
- 🎯 **4 Addons**: Dragons, Furniture, Weapons, Vehicles
- 🗺️ **6 Mundos**: Skyblock, PvP Arena, Parkour, City, Horror, Adventure
- 🎬 **3 Videos**: Tutoriales

## 🔧 Solución Rápida de Problemas

| Problema | Solución |
|----------|----------|
| **No aparece el logo** | Usa un ícono de Font Awesome temporalmente |
| **No se guardan los datos** | Verifica que no estés en modo incógnito |
| **Las imágenes no cargan** | Usa URLs completas (https://...) |
| **El sitio no se ve bien en móvil** | Limpia el caché (Ctrl + F5) |

## 🎨 Logo Rápido (Sin archivo)

Si no tienes logo, usa un ícono:

En `index.html`, reemplaza:
```html
<img src="assets/logo.png" ...>
```

Por:
```html
<i class="fas fa-gamepad" style="font-size: 35px; color: #1E90FF;"></i>
```

## 📊 Estructura de un Enlace Compartido

Cuando alguien copia el link de un juego:

```
https://tu-sitio.com/#craftsman-v1
                      ↑
                   ID del juego
```

Al abrir ese enlace, se abre directamente la página de detalle.

## 🌟 Próximos Pasos

1. ✅ Prueba el sitio localmente
2. ✅ Personaliza colores y redes sociales
3. ✅ Crea tu logo (o usa un ícono temporal)
4. ✅ Sube a GitHub
5. ✅ Activa GitHub Pages
6. ✅ Comparte tu sitio

## 📖 Más Información

- **README.md** → Documentación completa
- **LOGO-GUIDE.md** → Cómo crear el logo
- **GITHUB-DEPLOY.md** → Guía detallada de deploy

## 🆘 ¿Problemas?

1. Lee el **README.md** completo
2. Revisa la consola del navegador (F12)
3. Verifica que todos los archivos estén en su lugar

## 🎉 ¡Todo Listo!

Tu GameStore está lista para funcionar. Solo necesitas:

1. ✅ Descargar los 4 archivos principales
2. ✅ Crear un logo (o usar un ícono)
3. ✅ Abrir index.html

**¡Es así de simple!** 🚀

---

### 📱 Vista Previa de Secciones

**🏠 INICIO**
- Grid de cards con filtros
- Ver detalle al hacer clic
- Botón de descargar
- Botón de copiar link

**🎬 VIDEOS**
- Miniaturas de YouTube
- Reproducir en modal
- 3 videos de ejemplo

**🔍 BUSCAR**
- Búsqueda en tiempo real
- Filtrado inteligente
- Resultados instantáneos

**☰ MENÚ LATERAL**
- Redes sociales
- Cambio de tema
- Acceso admin

---

**¿Listo para empezar?** ¡Abre `index.html` y disfruta! 🎮✨