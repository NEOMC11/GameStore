# 🎮 GameStore - Tienda de Juegos y Minecraft

Una tienda web moderna y responsive para descargar juegos, aplicaciones, texturas, shaders, addons y mundos de Minecraft. Diseñada con un estilo similar a Google Play Store, completamente funcional sin necesidad de backend.

![GameStore Banner](https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=400&fit=crop)

## ✨ Características

### 🎨 Diseño
- **Modo oscuro por defecto** con opción de cambiar a modo claro
- **100% Responsive** - Optimizado para móviles, tablets y desktop
- **Colores modernos**: Azul (#1E90FF), Verde (#00FF88), Negro (#121212)
- **Animaciones suaves** y efectos hover profesionales
- **Tipografía moderna** con Google Fonts (Poppins)

### 🔥 Funcionalidades Principales

#### 📱 Navegación
- **3 secciones principales**:
  - 🏠 **Inicio**: Todos los contenidos en formato card
  - 🎬 **Videos**: Galería de videos de YouTube
  - 🔍 **Buscar**: Búsqueda en tiempo real

- **Barra de navegación inferior fija** (estilo app móvil)
- **Sidebar lateral desplegable** con:
  - Redes sociales (YouTube, Instagram, TikTok)
  - Interruptor de tema (oscuro/claro)
  - Acceso al panel de administrador

#### 🎯 Filtros de Contenido
- **Todos**: Muestra todo el contenido
- **Apps**: Aplicaciones y juegos APK
- **Texturas**: Packs de texturas para Minecraft
- **Shaders**: Shaders y mejoras gráficas
- **Addons**: Complementos y mods
- **Mundos**: Mapas y mundos descargables

#### 📦 Sistema de Contenido
Cada elemento incluye:
- **Card de vista previa** con imagen, nombre y versión
- **Página de detalle completa** con:
  - Descripción detallada
  - Galería de capturas de pantalla
  - Videos de demostración (enlaces a YouTube)
  - Botón de descarga
  - Botón para copiar enlace directo


Permite:
- ✅ Subir nuevos juegos, apps, texturas, shaders, addons y mundos
- ✅ Agregar videos con miniatura
- ✅ Gestionar todo desde el navegador
- ✅ Datos guardados en localStorage (persisten sin backend)

#### 🔗 Sistema de Enlaces
- Cada contenido tiene un ID único
- Copiar enlace genera una URL directa: `tu-sitio.com/#item-id`
- Al compartir el enlace, se abre directamente la página de detalle

#### 🎬 Videos
- Soporte para YouTube, Facebook e Instagram
- Reproducción en modal (ventana emergente)
- Miniaturas personalizadas
- Sistema de embeds responsive

#### 🔎 Búsqueda Avanzada
Busca por:
- Nombre del contenido
- Descripción
- Versión
- Tipo de archivo

Resultados en tiempo real mientras escribes.

## 📂 Estructura del Proyecto

```
gamestore/
│
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y tema
├── app.js             # Lógica y funcionalidades
├── data.js            # Datos iniciales (20+ items)
├── README.md          # Documentación
│
└── assets/
    └── logo.png       # Logo de GameStore (crear tu propio logo)
```

## 🚀 Instalación y Uso

### Opción 1: Uso Local

1. **Descarga todos los archivos**
2. **Crea la carpeta `assets`** y añade un logo (logo.png)
3. **Abre `index.html`** en tu navegador
4. ¡Listo! La página funciona completamente offline

### Opción 2: Subir a GitHub Pages

1. **Crea un repositorio en GitHub**
2. **Sube todos los archivos**
3. Ve a Settings → Pages
4. Selecciona la rama `main` y carpeta `root`
5. Tu sitio estará en: `tu-usuario.github.io/nombre-repo`

### Opción 3: Deploy en Vercel

1. **Sube tu repositorio a GitHub**
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Deploy automático
4. Tu sitio estará en: `tu-proyecto.vercel.app`

## 🎮 Cómo Usar el Panel Admin

1. Haz clic en el **menú hamburguesa** (☰)
2. Clic en **"Admin Panel"**
3. Ingresa la contraseña: **`gaelzule`**
4. Selecciona la pestaña **"Subir Contenido"** o **"Subir Video"**

### Subir Contenido (Apps/Texturas/Shaders/etc.)

```
Nombre: Craftsman
Descripción: Juego de construcción similar a Minecraft...
Versión: v1.9.220
Enlace de Descarga: https://mediafire.com/file/...
URL de Imagen: https://images.unsplash.com/...
URLs de Capturas: url1, url2, url3 (separadas por coma)
Enlaces de Videos: video1, video2 (separados por coma)
Tipo: App
```

### Subir Video

```
Título: Tutorial de Instalación
Enlace: https://youtube.com/watch?v=...
Miniatura: https://images.unsplash.com/...
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #1E90FF;      /* Azul principal */
    --secondary-color: #00FF88;    /* Verde secundario */
    --bg-primary: #121212;          /* Fondo principal */
    --bg-secondary: #1E1E1E;        /* Fondo secundario */
    --bg-card: #2A2A2A;             /* Fondo de cards */
}
```

### Cambiar Logo

Reemplaza `assets/logo.png` con tu propio logo (recomendado 512x512px).

### Modificar Redes Sociales

Edita las URLs en `index.html`:

```html
<a href="TU_URL_DE_YOUTUBE" target="_blank" class="social-link youtube">
<a href="TU_URL_DE_INSTAGRAM" target="_blank" class="social-link instagram">
<a href="TU_URL_DE_TIKTOK" target="_blank" class="social-link tiktok">
```

### Cambiar Contraseña Admin

En `app.js`, busca:

```javascript
const ADMIN_PASSWORD = 'gaelzule';
```

Y cámbiala por tu propia contraseña.

## 📱 Características Responsive

- ✅ Diseño mobile-first
- ✅ Grid adaptativo para todas las pantallas
- ✅ Navegación táctil optimizada
- ✅ Modales y sidebars con gestos
- ✅ Imágenes optimizadas con lazy loading
- ✅ Fuentes escalables

## 🛠 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Animaciones, Grid, Flexbox, Variables CSS
- **JavaScript Vanilla**: Sin frameworks, puro JS
- **LocalStorage**: Persistencia de datos sin backend
- **Google Fonts**: Tipografía Poppins
- **Font Awesome 6**: Iconos modernos

## 📊 Contenido Predeterminado

La página incluye **20+ elementos** de ejemplo:

- 🎮 **5 Apps/Juegos**: Craftsman, Minecraft PE, Block Craft 3D, etc.
- 🖼 **4 Texturas**: Faithful 32x, Realistic, Cartoon, Medieval
- ✨ **3 Shaders**: SEUS Renewed, BSL, Lagless
- 🎯 **4 Addons**: Dragons, Furniture, Weapons, Vehicles
- 🗺 **6 Mundos**: Skyblock, PvP Arena, Parkour, City, Horror, Adventure
- 🎬 **3 Videos**: Tutoriales y tops

Todos con descripciones detalladas, imágenes y enlaces funcionales.

## 🔧 Solución de Problemas

### Las imágenes no cargan
- Verifica que las URLs sean válidas
- Usa servicios confiables (Imgur, Unsplash, etc.)
- Asegúrate de que las imágenes sean accesibles públicamente

### localStorage no funciona
- Verifica que el navegador permita localStorage
- Algunos navegadores en modo incógnito bloquean localStorage
- Limpia el cache si hay problemas

### Los videos no se reproducen
- Usa URLs de embed correctas
- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
- Verifica que los videos no estén bloqueados para embed

## 📸 Capturas de Pantalla

### Pantalla Principal
![Inicio](https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800)

### Modo Claro
![Modo Claro](https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800)

### Panel Admin
![Admin](https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800)

## 🤝 Contribuir

Si deseas mejorar este proyecto:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -am 'Añadir nueva función'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**GameStore** - Tienda de Juegos y Minecraft

---

## 🌟 Redes Sociales

- 📺 [YouTube](https://youtube.com/@JLMC2)
- 📸 [Instagram](https://www.instagram.com/jlmc_24_n?igsh=MXNqYmcwNHZmOGx3Yg==)
- 🎵 [TikTok](https://www.tiktok.com/@neomc1?_r=1&_t=ZS-91FCqdmam9Q)

---

**¡Gracias por usar GameStore!** 🎮✨

modificame todo mi codigo para qu nada se guarde en el locatestorage de ningun dispositivo, y que lo pueda actualizar en tiempo real...................no hay alguna anera de que lo que yo suba desde el apartdado de administracion se ponga en el codigo sin necesidad de sql?? por ejemplo, subo un video y automaticamente eso se pone en el codigo??, o si subo un app o textura, se pone en el data.js??.......MI REPOSITORIO ES "https://game-store-self.vercel.app/" originalmente desplegado en vercel, pero el proyecto esta en github, quiero hacer eso que te dije si??, que las apps o texturas se suban al content en el archivo data.js y los videos, esos si se suben al apartado de video en el data.js...... y por ultimo dame el app.js que funcione correctamente, ya que ahora no me deja abrir el sidebar, ir al apartado de inicio, el apartado de buscare, el de video, y tampoco me deja abrir la pestaña de las apps, y el boton de descargar y de copiar link solo debe de aparecer al momento de tocar la caja del item, y ese es otra pantalla, no una subventana, sino otra pantala y el link que se copia es el de la pantalla, por ejemplo, yo entro a "I SEE YOU NOY" y ahi se abre la pantalla de "i see you now" ahi bajo hazta abajo y le doy a copiar, y ahi me da el link de "game-store-self.vercel.app/#I-SEE-YOU-NOW" ese link se lo comparto a mi amigo, y el entra a ese link, y ese link lo lleva directamente a esa pantalla, si men entiendes?? y si es asi, dame todo el app,js completo