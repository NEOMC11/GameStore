// Datos de videos para GameStore
const videosData = {
    videos: [
         { 
    id: "v-3", 
    title: "YA TODOS SE OLVIDARON DE CRAFTSMAN?", 
    url: "https://www.youtube.com/embed/maSlJ943Fc0?si=P3JVvHqQ14I0p_4O", 
    thumbnail: "./img/mini-3.jpg",
    description: "qué fue exactamente lo que sucedió con Craftsman?"
},
        { 
            id: "v-1", 
            title: "I SEE YOU NOW", 
            url: "https://www.youtube.com/embed/TpIy0LwxfGA?si=WICy3XEOVsV_YRLC", 
            thumbnail: "./img/miniatura1 (1).jpg",
            description: "Tutorial completo sobre cómo usar la textura I SEE YOU NOW"
        },
        { 
            id: "v-2", 
            title: "NEW UPDATE OF CRAFTING", 
            url: "https://youtu.be/b35C_J-j5fk?si=oovlIEAhjBVs1nv8", 
            thumbnail: "./img/miniatura.jpg",
            description: "Última actualización de Crafting and Building con todas las novedades"
        },
        { 
            id: "v-3", 
            title: "HOW LOGIN IN TO CRAFTING", 
            url: "https://youtu.be/RdriwySSGcA?si=qCiL3p9gtPzIw00k", 
            thumbnail: "./img/miniatura2.jpg",
            description: "Guía paso a paso para iniciar sesión en Crafting"
        },
        { 
            id: "v-4", 
            title: "Craftsman AB V2", 
            url: "https://youtu.be/rMX10q7NIxg?si=ZwiMbK5ZZkjFb2Nm", 
            thumbnail: "./img/p.png",
            description: "NUEVA ACTUALIZACIÓN DE CRAFTSMAN AB, LA CUAL ESTÁ EN LA VERSIÓN 0.15.1.20"
        }
    ]
};

// Datos de juegos y aplicaciones para GameStore
const addonsData = [
    {
    id: 46,
    title: "Craftsman AB v0.15.1.20",
    description: "🔥 ¡La mejor experiencia de Minecraft 1.20 en tu móvil totalmente GRATIS! Gráficos mejorados, mundos infinitos, multijugador, y optimizado para cualquier dispositivo Android. Construye, explora y sobrevive sin límites. ¡Descarga la versión oficial y únete a miles de jugadores en la comunidad Craftsman AB! 🎮⚡",
    cover_image: "./img/craftsman-ab.jpg",
    version: "0.15.1.20 (1.20)",
    download_link: "https://www.mediafire.com/file/oqa6g3mk826k1xh/Craftsman-AB-v2-By-NEOMC11.apk/file",
    tags: ["App", "Craftsman", "Minecraft 1.20", "Android"],
    last_updated: "2024-12-13",
    file_size: "250 MB"
    },
{
    id: 49,
    title: "Jenny Addon",
    description: "😏 Dale un toque atrevido y diferente a tu mundo de Minecraft. Jenny Addon añade un personaje especial que hará tus partidas más intensas, curiosas y divertidas. Ideal para jugadores que buscan algo fuera de lo común y quieren subir la temperatura del juego… bajo su propio riesgo 😉🔥",
    cover_image: "./img/jenny-addon.jpg",
    download_link: "https://www.mediafire.com/file/x88ciegi3os5m1z/jennyaddon.mcaddon/file",
    tags: ["Addon", "Minecraft"],
    last_updated: "2024-12-13",
    file_size: "16 MB"
},
    {
        id: 20,
        title: "Craftsman AB0.15.1.19.50",
        description: "Craftsman AB - Una de las versiones más estables y populares de la comunidad.",
        cover_image: "./img/craftsman.png",
        version: "1.19.50 (1.19.50)",
        download_link: "https://www.mediafire.com/file/ah73nfy17woyh7j/Craftsman_AB.apk/file",
        tags: ["App", "Craftsman", "Estable"],
        last_updated: "2024-10-22",
        file_size: "150 MB"
    },
{
  id: 50,
  title: "Newb X Dragon Complementary - Android",
  description: "🔥✨ Dale vida a tu mundo con Newb X Dragon Complementary para Android. Este shader combina iluminación suave, colores intensos y sombras elegantes que hacen que cada bloque se vea simplemente delicioso. Atardeceres cinematográficos, agua cristalina y un rendimiento ligero para que tu Minecraft se vea brutal sin sacrificar FPS. Puro flow visual para los que quieren jugar con estilo. 🐉💎",
  cover_image: "./img/newb-x-dragon-complementary.jpg",
  download_link: "https://www.mediafire.com/file/jtwqk9a0elf1phq/Newb_X_Dragon_Complementary_-_Android.mcpack/file",
  tags: ["Shaders", "Minecraft"],
last_update: "21-12-2025"
  file_size: "2 MB"
},
    {
        id: 1,
        title: "Craftsman ONE Android 14-15",
        description: "Versión especial de Craftsman ONE totalmente compatible con Android 14 y 15. ¡Funciona perfecto en los móviles más nuevos!",
        cover_image: "./img/craftsman-one.jpg",
        version: "1.1.5",
        download_link: "https://www.mediafire.com/file/5w2bbb09dsm5jpt/CRAFTSMAN_ONE_14-15_%25F0%259F%2591%25BE%25F0%259F%258E%2581.apk/file",
        tags: ["App", "Craftsman", "Android 14"],
        last_updated: "2024-12-01",
        file_size: "85 MB"
    },
    {
        id: 2,
        title: "NEOCRAFT v1",
        description: "La primera obra maestra de NEOMC11. Versión 1.20.12 con mejoras gráficas y optimizaciones.",
        cover_image: "./img/1NEOCRAFT.png",
        version: "1.20.12",
        download_link: "https://www.mediafire.com/file/cxqj0b3t0syd6vi/NEOCRAFT.apk/file",
        tags: ["App", "NEOCRAFT", "Gráficos"],
        last_updated: "2024-11-28",
        file_size: "92 MB"
    },
    {
        id: 3,
        title: "Craftsman Zero Demo 3 para Skins",
        description: "Demo 3 de Craftsman Zero optimizada especialmente para usar skins personalizadas sin errores.",
        cover_image: "./img/zero.png",
        version: "Demo 3 Skins",
        download_link: "https://www.mediafire.com/file/4koz7twgiqge5lu/CRAFTSMAN_ZERO_DEMO_3_FOR_SKINS_BY_NEOMC11.apk/file",
        tags: ["App", "Craftsman", "Skins"],
        last_updated: "2024-11-25",
        file_size: "78 MB"
    },
    {
        id: 4,
        title: "Textura Output",
        description: "Textura moderna con bordes definidos y colores vibrantes. Perfecta para construcciones épicas en 1.18+.",
        cover_image: "./img/out.png",
        version: "1.18+",
        download_link: "https://www.mediafire.com/file/yxuie1v5m6v0khg/outcut2.mcpack/file",
        tags: ["Texturas", "Moderno", "HD"],
        last_updated: "2024-11-20",
        file_size: "12 MB"
    },
    {
        id: 5,
        title: "Craftsman UNO",
        description: "Versión especial con temática única y mejoras exclusivas. Ideal para quienes buscan algo diferente.",
        cover_image: "./img/craftsman.png",
        version: "0.15.10",
        download_link: "https://www.mediafire.com/file/briwk3jkzyald7o/Craftsman_UNO.apk/file",
        tags: ["App", "Craftsman", "Especial"],
        last_updated: "2024-11-18",
        file_size: "68 MB"
    },
    {
        id: 6,
        title: "NEOCRAFT LTE",
        description: "Versión ligera y ultra optimizada de NEOCRAFT 1.21.92. Perfecta para móviles de gama baja/media.",
        cover_image: "./img/6NEOCRAFT.jpeg",
        version: "1.21.92 LTE",
        download_link: "https://www.mediafire.com/file/gbqt15tt1htjijv/NEOCRAFT_LTE.apk/file",
        tags: ["App", "NEOCRAFT", "Ligero"],
        last_updated: "2024-12-05",
        file_size: "400 MB"
    },
    {
  "id": 47,
  "title": "Java UI",
  "description": "✨ ¡REVOLUCIONA TU EXPERIENCIA DE JUEGO! La interfaz de usuario más bella, moderna y funcional para Minecraft Java 1.21.120 en adelante. Inspirada en la edición Bedrock pero con la potencia de Java, ofrece una navegación fluida, iconos rediseñados, animaciones suaves y una organización inteligente de menús. Perfecta para jugadores que buscan elegancia, claridad y máximo rendimiento. ¡Transforma tu juego con este pack de interfaz premium, ligero y totalmente gratuito! 🚀🎨",
  "cover_image": "./img/java-ui.jpg",
  "version": "3.2.8 (Para 1.21.120+)",
  "download_link": "https://www.mediafire.com/file/hwhzuevm8i5mwok/VDX-DesktopUI-v3.2.8%2528Main%2529.mcpack/file",
  "tags": [
    "Textura",
    "Minecraft",
    "Interfaz",
    "UI",
    "Java Edition",
    "Moderno"
  ],
  "last_updated": "2025-12-13",
  "file_size": "4 MB"
},
    {
        id: 7,
        title: "Craftsman Zero 1.1.5",
        description: "Versión estable y completa de Craftsman Zero con todas las funciones básicas y mejoras de rendimiento.",
        cover_image: "./img/zero.png",
        version: "1.1.5",
        download_link: "https://www.mediafire.com/file/vudh0hmv9mjh2tz/Cratsman+Zero+1.1.apk/file",
        tags: ["App", "Craftsman", "Estable"],
        last_updated: "2024-11-30",
        file_size: "82 MB"
    },
    {
        id: 8,
        title: "Newb X Dragon Complementary",
        description: "Shader ultra realista con iluminación avanzada, reflejos, nubes volumétricas y agua perfecta.",
        cover_image: "./img/shader.jpg",
        version: "Latest",
        download_link: "https://www.mediafire.com/file/tk98dpuu1vfdfl4/Newb_X_Dragon_ComECCE_Complementary_Reimagined_-_Android.mcpack/file",
        tags: ["Shaders", "Realista", "RTX"],
        last_updated: "2024-12-08",
        file_size: "2 MB"
    },
    {
        id: 9,
        title: "Craftsman Trial",
        description: "Versión de prueba oficial con funciones limitadas. Ideal para probar antes de instalar la completa.",
        cover_image: "./img/craftsman.png",
        version: "1.0.0.16",
        download_link: "https://www.mediafire.com/file/p2vj2wjczn2qf3j/Craftsman_Trial_1.0.0.16.apk/file",
        tags: ["App", "Craftsman", "Demo"],
        last_updated: "2024-11-15",
        file_size: "100 MB"
    },
    {
        id: 10,
        title: "NEOCRAFT Trailer Edition",
        description: "Edición especial usada en los trailers oficiales. Con efectos visuales mejorados.",
        cover_image: "./img/2NEOCRAFT.png",
        version: "Trailer",
        download_link: "https://www.mediafire.com/file/mookw5z8qrbintj/NEOCRAFT_Trailer_Edition_mod.apk/file",
        tags: ["App", "NEOCRAFT", "Especial"],
        last_updated: "2024-11-22",
        file_size: "300 MB"
    },
    {
        id: 11,
        title: "Craftsman Zero NAVIDAD",
        description: "Edición especial navideña con texturas de nieve, regalos y ambiente festivo.",
        cover_image: "./img/zero.png",
        version: "1.1.5 Navidad",
        download_link: "https://www.mediafire.com/file/guv0t148wko9h0i/Craftsman+Zero+Navidad.apk/file",
        tags: ["App", "Craftsman", "Navidad"],
        last_updated: "2025-12-10",
        file_size: "98 MB"
    },
    {
        id: 12,
        title: "Minecraft Bedrock Todas las Versiones",
        description: "Carpeta oficial con TODAS las versiones de Minecraft Bedrock 1.21.124+ en un solo link.",
        cover_image: "./img/Minecraft_Bedrock.png",
        version: "1.21.124+",
        download_link: "https://app.mediafire.com/folder/6vzirxgmdn4r2/1.21.94+Oficial+Grissby.com",
        tags: ["App", "Minecraft", "Oficial"],
        last_updated: "2025-12-12",
        file_size: "Carpeta"
    },
    {
        id: 13,
        title: "Craftsman ONE - OPTICRAFT ONE",
        description: "La versión MÁS OPTIMIZADA de Craftsman ONE. Funciona perfecto en cualquier móvil.",
        cover_image: "./img/craftsman-one.jpg",
        version: "1.1.5 Optimizado",
        download_link: "https://www.mediafire.com/file/2jkfza0klfxe0c9/OPTICRAFT_ONE_%25F0%259F%25A5%2594%25E2%259B%2584.apk/file",
        tags: ["App", "Craftsman", "Optimizado"],
        last_updated: "2025-12-03",
        file_size: "148 MB"
    },
    {
        id: 14,
        title: "Craftsman Zero Demo 2 Sin Bugs",
        description: "Demo 2 completamente corregida, sin errores ni crashes. Ideal para probar las novedades.",
        cover_image: "./img/zero.png",
        version: "Demo 2",
        download_link: "https://www.mediafire.com/file/7ds74aevus10761/Craftsman+Zero+Demo+2+Sin+Bugs.apk/file",
        tags: ["App", "Craftsman", "Demo"],
        last_updated: "2025-11-12",
        file_size: "94 MB"
    },
    {
        id: 15,
        title: "NEOCRAFT AS",
        description: "NEOCRAFT Advanced Series con mejoras visuales, nuevos bloques y optimizaciones.",
        cover_image: "./img/4NEOCRAFT.jpeg",
        version: "AS V1",
        download_link: "https://www.mediafire.com/file/23a74qf7fbv9s7n/Neocraft_AS_V1.apk/file",
        tags: ["App", "NEOCRAFT", "Advanced"],
        last_updated: "2024-11-26",
        file_size: "400 MB"
    },
    {
        id: 16,
        title: "Craftsman EMOTES",
        description: "Versión especial para grabar emotes directamente desde Craftsman. Perfecta para creadores de contenido.",
        cover_image: "./img/craftsman.png",
        version: "1.18",
        download_link: "https://www.mediafire.com/file/1l0wno4u23when8/Craftsman_emotes.apk/file",
        tags: ["App", "Craftsman", "Emotes"],
        last_updated: "2025-11-08",
        file_size: "145 MB"
    },
    {
        id: 17,
        title: "Texturas Vanilla Mejoradas",
        description: "Pack oficial de texturas vanilla mejoradas para Craftsman 1.18+ por NEOFACEMC.",
        cover_image: "./img/texturaa.jpg",
        version: "1.3",
        download_link: "https://www.mediafire.com/file/2wsc0bpel7frifo/Texturas_Vanillas_1.18.0_By_NEOFACEMC.mcpack/file",
        tags: ["Texturas", "Vanilla", "HD"],
        last_updated: "2025-11-05",
        file_size: "38 MB"
    },
    {
        id: 18,
        title: "Craftsman VI",
        description: "Craftsman VI con el famoso paquete NeoFace que mejora caras y animaciones de personajes.",
        cover_image: "./img/craftsman.png",
        version: "1.16.20",
        download_link: "https://www.mediafire.com/file/hgi53l00ce4okrc/Craftsman+VI+1.16+NEOFACE.apk/file",
        tags: ["App", "Craftsman", "Animaciones"],
        last_updated: "2025-10-28",
        file_size: "110 MB"
    },
    {
        id: 19,
        title: "Ultracraft Todas las Actualizaciones",
        description: "Carpeta oficial con TODAS las versiones nuevas de Ultracraft desde 1.1.5. Creador: Gabito Gaming.",
        cover_image: "./img/ultra.png",
        version: "1.1.5+",
        download_link: "https://www.mediafire.com/folder/h98zm2afn6tju/Updates",
        tags: ["App", "Ultracraft", "Carpeta"],
        last_updated: "2025-12-07",
        file_size: "Carpeta"
    },
    {
        id: 21,
        title: "NEOCRAFT Old Edition",
        description: "La clásica y querida versión antigua de NEOCRAFT, optimizada y con mejoras.",
        cover_image: "./img/1NEOCRAFT.png",
        version: "Old Edition",
        download_link: "https://www.mediafire.com/file/9jc389tiz5qkcy4/NeoCraft+Old+Edition_optimized.apk/file",
        tags: ["App", "NEOCRAFT", "Clásico"],
        last_updated: "2024-10-15",
        file_size: "260 MB"
    },
    {
        id: 22,
        title: "Craftsman Zero SIN ANUNCIOS",
        description: "100% sin anuncios ni interrupciones. Disfruta del juego limpio y puro.",
        cover_image: "./img/zero.png",
        version: "Sin anuncios",
        download_link: "https://www.mediafire.com/file/0h2pdhzy9wktolw/Craftsman_zero_sin_anuncios_By_NEOMC11.apk/file",
        tags: ["App", "Craftsman", "Sin Ads"],
        last_updated: "2024-11-28",
        file_size: "80 MB"
    },
    {
        id: 23,
        title: "Craftsmine V2",
        description: "Una de las mejores alternativas a Craftsman con gráficos mejorados y nuevos bloques.",
        cover_image: "./img/craftsman.png",
        version: "2.0",
        download_link: "https://www.mediafire.com/file/42lo3yruc2rh4bo/CraftMine_V2.apk/file",
        tags: ["App", "Alternativa", "Bloques"],
        last_updated: "2024-10-10",
        file_size: "87 MB"
    },
    {
        id: 24,
        title: "Newb X Legacy Shader",
        description: "Shader clásico y ligero con excelente rendimiento. Compatible con Minecraft PE 1.21+.",
        cover_image: "./img/Newb X Legacy.png",
        version: "1.21+",
        download_link: "https://www.mediafire.com/file/8qmz4j57gi45ekd/Newb_X_Legacy_Mcpe_1.21.mcpack.zip/file",
        tags: ["Shaders", "Ligero", "Clásico"],
        last_updated: "2024-12-01",
        file_size: "1 MB"
    },
    {
        id: 25,
        title: "Craftsman PE",
        description: "Craftsman Pocket Edition optimizado para móviles y tablets de cualquier potencia.",
        cover_image: "./img/craftsman.png",
        version: "PE",
        download_link: "https://www.mediafire.com/file/r0ummjkdjinpnn1/Craftsman_Pe.apk/file",
        tags: ["App", "Craftsman", "Móvil"],
        last_updated: "2024-09-28",
        file_size: "71 MB"
    },
    {
        id: 26,
        title: "One Block Survival",
        description: "El famoso mapa One Block actualizado a la versión 1.5.9. ¡Sobrevive y construye desde un solo bloque!",
        cover_image: "./img/texturaa.jpg",
        version: "1.5.9",
        download_link: "https://www.mediafire.com/file/fwxue1q70q93ybw/One_Block_%2528Spring_to_Life%2529_v%253D1.5.9_By_DtA_MC.mcworld/file",
        tags: ["Maps", "Survival", "Challenge"],
        last_updated: "2024-11-18",
        file_size: "22 MB"
    },
    {
        id: 27,
        title: "Craftsman Zero Demo 1",
        description: "La primera demo pública del proyecto Craftsman Zero. ¡Donde todo comenzó!",
        cover_image: "./img/zero.png",
        version: "Demo 1",
        download_link: "https://www.mediafire.com/file/k4krz1ww0299fvk/Craftsman+Zero+Demo+1.apk/file",
        tags: ["App", "Craftsman", "Demo"],
        last_updated: "2024-09-15",
        file_size: "69 MB"
    },
    {
        id: 28,
        title: "NEOCRAFT 1.21.92",
        description: "NEOCRAFT completamente actualizado a la versión 1.21.92 con todos los bloques nuevos.",
        cover_image: "./img/5NEOCRAFT.jpeg",
        version: "1.21.92",
        download_link: "https://www.mediafire.com/file/xml11u44xavdzs6/NEOCRAFT.apk/file",
        tags: ["App", "NEOCRAFT", "Actualizado"],
        last_updated: "2024-12-09",
        file_size: "99 MB"
    },
    {
        id: 29,
        title: "Craftsman 1.17 Mod",
        description: "Craftsman con todas las características de Minecraft 1.17 (cuevas, axolotls, cobre, etc.).",
        cover_image: "./img/craftsman.png",
        version: "1.17",
        download_link: "https://www.mediafire.com/file/drep2uik81qjuqm/minecraft-1-17-2_mod.apk/file",
        tags: ["App", "Craftsman", "Caves"],
        last_updated: "2024-09-05",
        file_size: "93 MB"
    },
    {
        id: 30,
        title: "Bare Bones",
        description: "Textura minimalista y limpia con colores más vivos. Ideal para construcciones modernas.",
        cover_image: "./img/bare.jpg",
        version: "1.18+",
        download_link: "https://www.mediafire.com/file/s1ridznky8rp0fn/RP_BB.mcpack/file",
        tags: ["Texturas", "Minimalista", "Moderno"],
        last_updated: "2024-11-02",
        file_size: "9 MB"
    },
    {
        id: 31,
        title: "Craftsman Zero 1.16.40",
        description: "Craftsman Zero actualizado a 1.16.40 con cuevas gigantes, montañas y todos los bloques nuevos.",
        cover_image: "./img/zero.png",
        version: "1.16.40",
        download_link: "https://www.mediafire.com/file/bdvo2pcqrp5n7g4/Craftsman+Zero+1.16.apk/file",
        tags: ["App", "Craftsman", "Caves"],
        last_updated: "2024-08-28",
        file_size: "84 MB"
    },
    {
        id: 32,
        title: "BalionCraft Launcher",
        description: "Launcher oficial con versiones 0.14.3, 0.15.10 y 1.1.5 integradas. ¡Elige al instante!",
        cover_image: "./img/balion.png",
        version: "Multi-version",
        download_link: "https://www.mediafire.com/folder/b5g5722h3gwry/BalionLauncher",
        tags: ["App", "Launcher", "Multi"],
        last_updated: "2024-11-20",
        file_size: "Carpeta"
    },
    {
        id: 33,
        title: "Craftsman (Versión Firmada)",
        description: "Versión firmada y 100% estable lista para instalar en cualquier dispositivo Android.",
        cover_image: "./img/craftsman.png",
        version: "Latest",
        download_link: "https://www.mediafire.com/file/i2jyn06j46j8jur/Craftsman__signed.apk/file",
        tags: ["App", "Craftsman", "Estable"],
        last_updated: "2024-10-05",
        file_size: "79 MB"
    },
    {
        id: 34,
        title: "Lucky Block Race",
        description: "Mapa multijugador de carreras con Lucky Blocks. ¡Rompe bloques y obtén items locos!",
        cover_image: "./img/texturaa.jpg",
        version: "1.18+",
        download_link: "https://www.mediafire.com/file/x1fqf8d1d76a9zn/RainbowLuckyBlockRaceV1.1.mcworld/file",
        tags: ["Maps", "Multiplayer", "Lucky"],
        last_updated: "2024-10-18",
        file_size: "18 MB"
    },
    {
        id: 35,
        title: "Ultracraft Primera Versión",
        description: "La primera versión oficial de Ultracraft creada por Gabito Gaming.",
        cover_image: "./img/ultra.png",
        version: "1.0",
        download_link: "https://www.mediafire.com/file/jkyr6jvpal1vfl5/ULTRACRAFT_Gabito.Gaming.apk/file",
        tags: ["App", "Ultracraft", "Original"],
        last_updated: "2024-09-22",
        file_size: "81 MB"
    },
    {
        id: 36,
        title: "NEOCRAFT SE",
        description: "NEOCRAFT Special Edition con texturas exclusivas y mejoras visuales únicas.",
        cover_image: "./img/3NEOCRAFT.png",
        version: "SE",
        download_link: "https://www.mediafire.com/file/d9942l6uw7whh2n/NEOCRAFT_SE.apk/file",
        tags: ["App", "NEOCRAFT", "Especial"],
        last_updated: "2024-11-10",
        file_size: "97 MB"
    },
    {
        id: 37,
        title: "Craftsman Zero Demo 3 con Animaciones",
        description: "Demo 3 con animaciones avanzadas y mejoras visuales por NEOMC11.",
        cover_image: "./img/zero.png",
        version: "Demo 3 Animations",
        download_link: "https://www.mediafire.com/file/ev9m698nl3sjjxt/CRAFTSMAN_ZERO_DEMO_3_WITH_ANIMATIONS__by_NEOMC11.apk/file",
        tags: ["App", "Craftsman", "Animaciones"],
        last_updated: "2024-11-22",
        file_size: "86 MB"
    },
    {
        id: 38,
        title: "I SEE YOU NOW!",
        description: "La famosa textura que permite ver skins de amigos en Crafting and Building + texturas vanilla mejoradas.",
        cover_image: "./img/isee.png",
        version: "1.16+",
        download_link: "https://www.mediafire.com/file/ykl2qy2d62fdnaw/I_SEE_YOU%2521_by_NEOMC11.mcpack/file",
        tags: ["Texturas", "Skins", "Multiplayer"],
        last_updated: "2024-10-30",
        file_size: "7 MB"
    },
    {
        id: 39,
        title: "Ultracraft 1.1.1 Actualizado",
        description: "Segunda versión oficial de Ultracraft con correcciones y mejoras. Creador: Gabito Gaming.",
        cover_image: "./img/ultra.png",
        version: "1.1.1",
        download_link: "https://www.mediafire.com/file/73vyix8atnk2k2f/ULTRACRAFT_%25E2%259C%2585_ACTUALIZADO_%25E2%259C%25A8_Gabito.Gaming.apk/file",
        tags: ["App", "Ultracraft", "Actualizado"],
        last_updated: "2024-10-25",
        file_size: "83 MB"
    },
    {
        id: 40,
        title: "Craftsman 0.15.10 Android 14-15",
        description: "Versión especial de Craftsman 0.15.10 compatible con Android 13, 14 y 15.",
        cover_image: "./img/craftsman.png",
        version: "0.15.10",
        download_link: "https://www.mediafire.com/file/38z1flqyp7jkvwi/CRAFTSMAN_FOR_ANDROID_13-14_BY_NEOMC11.apk/file",
        tags: ["App", "Craftsman", "Android 14"],
        last_updated: "2024-11-28",
        file_size: "70 MB"
    },
    {
        id: 41,
        title: "BalionCraft 1.12.1",
        description: "Versión oficial y estable de BalionCraft 1.12 con todas las funciones.",
        cover_image: "./img/balion.png",
        version: "1.12.1",
        download_link: "https://www.mediafire.com/file/59f4tfpqzms4aoa/Balioncraft_1.12.1_oficial.apk/file",
        tags: ["App", "BalionCraft", "Oficial"],
        last_updated: "2024-11-05",
        file_size: "88 MB"
    },
    {
        id: 42,
        title: "Craftsman 0.14.3 + Mod 1.19",
        description: "Craftsman 0.14.3 con el mod completo de Minecraft 1.19 por GOBLINyt y AlexMC.",
        cover_image: "./img/Minecraft_Mod.png",
        version: "0.14.3 + 1.19",
        download_link: "https://www.mediafire.com/file/ppotbt1nxvf8tzi/Mod_1.19_Upcade_By_GOBLINyt_y_AlexMC.apk/file",
        tags: ["App", "Craftsman", "Mod"],
        last_updated: "2024-09-18",
        file_size: "95 MB"
    },
    {
        id: 43,
        title: "HyperCraft 1.21.100",
        description: "HyperCraft actualizado a la versión oficial 1.21.100 con todos los últimos bloques.",
        cover_image: "./img/hiper.png",
        version: "1.21.100",
        download_link: "https://www.mediafire.com/file/jzeipqgtevpowca/HyperCraft_signed.apk/file",
        tags: ["App", "HyperCraft", "Actualizado"],
        last_updated: "2024-12-11",
        file_size: "92 MB"
    },
    {
        id: 44,
        title: "GameStore APK Oficial",
        description: "¡La tienda GameStore ahora como app! Descargas rápidas, navegación fluida y todo en tu móvil.",
        cover_image: "./img/texturaa.jpg",
        version: "1.0",
        download_link: "https://www.mediafire.com/file/22blvwo2yeaxmea/GStore.apk/file",
        tags: ["App", "GameStore", "Oficial"],
        last_updated: "2024-12-13",
        file_size: "5 MB"
    },
    {
        id: 45,
        title: "Craftsman ONE OFICIAL",
        description: "La versión oficial más reciente y estable de Craftsman ONE.",
        cover_image: "./img/craftsman-one.jpg",
        version: "OFICIAL",
        download_link: "https://www.mediafire.com/file/v32npfacwwl168i/CRAFTSMAN_ONE_%25F0%259F%258E%2584%25E2%259C%25A8.apk/file",
        tags: ["App", "Craftsman", "Oficial"],
        last_updated: "2024-12-12",
        file_size: "87 MB"
    }
];

// Configuración de JSONBin.io
const JSONBIN_BASE_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "68e3f94dd0ea881f40978bff";
const MASTER_KEY = "$2a$10$llDNWie9.N2CafYjo7o3.OB/8XZpTocfzmyU2gCwG/bJGYAThWYyC";

// Configuración del sistema de cache
const CACHE_CONFIG = {
    REVIEWS_CACHE_KEY: 'gamestore_reviews_cache',
    CACHE_TIMESTAMP_KEY: 'gamestore_cache_timestamp',
    CACHE_DURATION: 5 * 60 * 1000,
    PENDING_REVIEWS_KEY: 'gamestore_pending_reviews'
};

// Sistema de cache para reseñas
class ReviewsCache {
    constructor() {
        this.isOnline = true;
        this.pendingSync = this.getPendingReviews();
        this.init();
    }

    init() {
        this.checkConnection();
        this.syncPendingReviews();
    }

    isCacheValid() {
        const timestamp = localStorage.getItem(CACHE_CONFIG.CACHE_TIMESTAMP_KEY);
        if (!timestamp) return false;
        
        const now = Date.now();
        const cacheTime = parseInt(timestamp);
        return (now - cacheTime) < CACHE_CONFIG.CACHE_DURATION;
    }

    saveToCache(reviews) {
        try {
            localStorage.setItem(CACHE_CONFIG.REVIEWS_CACHE_KEY, JSON.stringify(reviews));
            localStorage.setItem(CACHE_CONFIG.CACHE_TIMESTAMP_KEY, Date.now().toString());
            console.log('Reseñas guardadas en cache local');
        } catch (error) {
            console.error('Error guardando en cache:', error);
        }
    }

    getFromCache() {
        try {
            const cached = localStorage.getItem(CACHE_CONFIG.REVIEWS_CACHE_KEY);
            return cached ? JSON.parse(cached) : null;
        } catch (error) {
            console.error('Error obteniendo del cache:', error);
            return null;
        }
    }

    savePendingReview(addonId, rating, comment) {
        const pending = this.getPendingReviews();
        const review = {
            addonId,
            rating,
            comment,
            timestamp: new Date().toISOString(),
            userId: getUserId()
        };
        
        pending.push(review);
        localStorage.setItem(CACHE_CONFIG.PENDING_REVIEWS_KEY, JSON.stringify(pending));
        return review;
    }

    getPendingReviews() {
        try {
            const pending = localStorage.getItem(CACHE_CONFIG.PENDING_REVIEWS_KEY);
            return pending ? JSON.parse(pending) : [];
        } catch (error) {
            console.error('Error obteniendo reseñas pendientes:', error);
            return [];
        }
    }

    clearPendingReviews() {
        localStorage.removeItem(CACHE_CONFIG.PENDING_REVIEWS_KEY);
    }

    async syncPendingReviews() {
        const pending = this.getPendingReviews();
        if (pending.length === 0 || !this.isOnline) return;

        console.log(`Sincronizando ${pending.length} reseñas pendientes...`);
        
        for (const review of pending) {
            try {
                await this.syncSingleReview(review);
            } catch (error) {
                console.error('Error sincronizando reseña:', error);
                break;
            }
        }

        await this.fetchAndUpdateCache();
    }

    async syncSingleReview(review) {
        const reviews = await this.fetchReviewsFromAPI();
        
        if (!reviews[review.addonId]) {
            reviews[review.addonId] = [];
        }

        const existingIndex = reviews[review.addonId].findIndex(r => r.userId === review.userId);
        
        if (existingIndex !== -1) {
            reviews[review.addonId][existingIndex] = {
                userId: review.userId,
                rating: review.rating,
                comment: review.comment,
                timestamp: review.timestamp
            };
        } else {
            reviews[review.addonId].push({
                userId: review.userId,
                rating: review.rating,
                comment: review.comment,
                timestamp: review.timestamp
            });
        }

        await this.saveReviewsToAPI(reviews);
    }

    checkConnection() {
        this.isOnline = navigator.onLine;
        
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncPendingReviews();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    async getReviews() {
        if (this.isCacheValid()) {
            const cached = this.getFromCache();
            if (cached) {
                console.log('Usando reseñas desde cache local');
                return cached;
            }
        }

        return await this.fetchAndUpdateCache();
    }

    async fetchAndUpdateCache() {
        try {
            const reviews = await this.fetchReviewsFromAPI();
            this.saveToCache(reviews);
            console.log('Reseñas actualizadas desde JSONBin');
            return reviews;
        } catch (error) {
            console.error('Error obteniendo reseñas:', error);
            const cached = this.getFromCache();
            if (cached) {
                console.log('Usando cache antiguo por fallo de conexión');
                return cached;
            }
            throw error;
        }
    }

    async fetchReviewsFromAPI() {
        const response = await fetch(`${JSONBIN_BASE_URL}/${BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': MASTER_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al cargar las reseñas desde JSONBin');
        }
        
        const data = await response.json();
        return data.record || this.getDefaultReviewsStructure();
    }

    async saveReviewsToAPI(reviews) {
        const response = await fetch(`${JSONBIN_BASE_URL}/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY
            },
            body: JSON.stringify(reviews)
        });
        
        if (!response.ok) {
            throw new Error('Error al guardar las reseñas en JSONBin');
        }
        
        return await response.json();
    }

    getDefaultReviewsStructure() {
        const structure = {};
        addonsData.forEach(addon => {
            structure[addon.id] = [];
        });
        return structure;
    }
}

const reviewsCache = new ReviewsCache();

function getAddonById(id) {
    return addonsData.find(addon => addon.id === parseInt(id));
}

function getAllAddons() {
    return addonsData;
}

function searchAddons(query) {
    if (!query) {
        return addonsData;
    }
    
    const lowerQuery = query.toLowerCase();
    return addonsData.filter(addon => 
        addon.title.toLowerCase().includes(lowerQuery) ||
        addon.description.toLowerCase().includes(lowerQuery) ||
        addon.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}

function formatDate(dateString) {
    try {
        let date;
        
        if (dateString.includes('-')) {
            date = new Date(dateString);
        } else if (dateString.includes('/')) {
            const parts = dateString.split('/');
            if (parts.length === 3) {
                date = new Date(parts[2], parts[0] - 1, parts[1]);
            }
        } else {
            date = new Date(dateString);
        }
        
        if (isNaN(date.getTime())) {
            console.warn('Fecha inválida:', dateString);
            return 'Fecha no disponible';
        }
        
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'UTC'
        };
        
        return date.toLocaleDateString('es-ES', options);
    } catch (error) {
        console.error('Error formateando fecha:', error, dateString);
        return 'Fecha no disponible';
    }
}

async function fetchReviews() {
    return await reviewsCache.getReviews();
}

async function saveReviews(reviews) {
    try {
        await reviewsCache.saveReviewsToAPI(reviews);
        reviewsCache.saveToCache(reviews);
        return reviews;
    } catch (error) {
        console.error('Error al guardar reseñas:', error);
        throw error;
    }
}

async function getReviewsForAddon(addonId) {
    const reviews = await fetchReviews();
    
    if (!reviews[addonId]) {
        reviews[addonId] = [];
    }
    
    return reviews[addonId];
}

async function getUserReviewForAddon(addonId) {
    const reviews = await getReviewsForAddon(addonId);
    const userId = getUserId();
    
    const pending = reviewsCache.getPendingReviews();
    const pendingReview = pending.find(review => 
        review.addonId === addonId.toString() && review.userId === userId
    );
    
    if (pendingReview) {
        return {
            userId: pendingReview.userId,
            rating: pendingReview.rating,
            comment: pendingReview.comment,
            timestamp: pendingReview.timestamp,
            pending: true
        };
    }
    
    return reviews.find(review => review.userId === userId);
}

async function addOrUpdateReview(addonId, rating, comment) {
    const userId = getUserId();
    
    if (reviewsCache.isOnline) {
        const reviews = await fetchReviews();
        
        if (!reviews[addonId]) {
            reviews[addonId] = [];
        }
        
        const existingReviewIndex = reviews[addonId].findIndex(review => review.userId === userId);
        
        if (existingReviewIndex !== -1) {
            reviews[addonId][existingReviewIndex] = {
                userId,
                rating,
                comment,
                timestamp: new Date().toISOString()
            };
        } else {
            reviews[addonId].push({
                userId,
                rating,
                comment,
                timestamp: new Date().toISOString()
            });
        }
        
        await saveReviews(reviews);
        return reviews[addonId];
    } else {
        console.log('Sin conexión, guardando reseña en cache local');
        reviewsCache.savePendingReview(addonId.toString(), rating, comment);
        
        const cachedReviews = reviewsCache.getFromCache() || reviewsCache.getDefaultReviewsStructure();
        
        if (!cachedReviews[addonId]) {
            cachedReviews[addonId] = [];
        }
        
        const existingIndex = cachedReviews[addonId].findIndex(review => review.userId === userId);
        
        if (existingIndex !== -1) {
            cachedReviews[addonId][existingIndex] = {
                userId,
                rating,
                comment,
                timestamp: new Date().toISOString()
            };
        } else {
            cachedReviews[addonId].push({
                userId,
                rating,
                comment,
                timestamp: new Date().toISOString()
            });
        }
        
        reviewsCache.saveToCache(cachedReviews);
        return cachedReviews[addonId];
    }
}

async function deleteReview(addonId) {
    const userId = getUserId();
    
    if (reviewsCache.isOnline) {
        const reviews = await fetchReviews();
        
        if (reviews[addonId]) {
            reviews[addonId] = reviews[addonId].filter(review => review.userId !== userId);
            await saveReviews(reviews);
        }
        
        return reviews[addonId] || [];
    } else {
        console.log('Sin conexión, eliminando reseña del cache local');
        
        const pending = reviewsCache.getPendingReviews().filter(review => 
            !(review.addonId === addonId.toString() && review.userId === userId)
        );
        localStorage.setItem(CACHE_CONFIG.PENDING_REVIEWS_KEY, JSON.stringify(pending));
        
        const cachedReviews = reviewsCache.getFromCache() || reviewsCache.getDefaultReviewsStructure();
        if (cachedReviews[addonId]) {
            cachedReviews[addonId] = cachedReviews[addonId].filter(review => review.userId !== userId);
            reviewsCache.saveToCache(cachedReviews);
        }
        
        return cachedReviews[addonId] || [];
    }
}

async function forceSyncReviews() {
    if (!reviewsCache.isOnline) {
        console.log('No hay conexión para sincronizar');
        return false;
    }
    
    try {
        await reviewsCache.syncPendingReviews();
        reviewsCache.clearPendingReviews();
        console.log('Sincronización completada');
        return true;
    } catch (error) {
        console.error('Error en sincronización:', error);
        return false;
    }
}

function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
}

function getUserId() {
    let userId = localStorage.getItem('gamestore_userId');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('gamestore_userId', userId);
    }
    return userId;
}

function renderStars(rating, interactive = false, size = 'medium') {
    const starSize = size === 'small' ? '1rem' : '1.5rem';
    let starsHtml = '';
    
    for (let i = 1; i <= 5; i++) {
        if (interactive) {
            starsHtml += `
                <span class="star ${i <= rating ? 'active' : ''}" data-rating="${i}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="${starSize}" height="${starSize}" viewBox="0 0 24 24" fill="${i <= rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                </span>
            `;
        } else {
            starsHtml += `
                <span class="star ${i <= rating ? 'active' : ''}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="${starSize}" height="${starSize}" viewBox="0 0 24 24" fill="${i <= rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                </span>
            `;
        }
    }
    
    return `<div class="stars ${interactive ? 'interactive' : ''} ${size}">${starsHtml}</div>`;
}

function getUserProfilePicture() {
    return "./img/profile/NEOMC11.png";
}

function processTextWithStickers(text) {
    if (typeof window.StickerSystem !== 'undefined') {
        return window.StickerSystem.processStickers(text);
    }
    return text;
}

function processTextWithStickersInTitles(text) {
    if (typeof window.StickerSystem !== 'undefined') {
        return window.StickerSystem.processStickersInTitles(text);
    }
    return text;
}

function updateAddonDate(addonId, newDate) {
    const addon = getAddonById(addonId);
    if (addon) {
        addon.last_updated = newDate;
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            renderAddons(getAllAddons());
        }
        return true;
    }
    return false;
}

function filterAddonsByCategory(category) {
    if (category === 'Todos') {
        return getAllAddons();
    } else if (category === 'Mejor Valorados') {
        return getBestRatedAddons();
    } else {
        return addonsData.filter(addon => 
            addon.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
        );
    }
}

async function getBestRatedAddons() {
    const addonsWithRatings = await Promise.all(
        addonsData.map(async (addon) => {
            const reviews = await getReviewsForAddon(addon.id);
            const averageRating = parseFloat(calculateAverageRating(reviews));
            const reviewsCount = reviews.length;
            return {
                ...addon,
                averageRating,
                reviewsCount
            };
        })
    );
    
    return addonsWithRatings.sort((a, b) => {
        if (b.averageRating !== a.averageRating) {
            return b.averageRating - a.averageRating;
        }
        return b.reviewsCount - a.reviewsCount;
    });
}

// Funciones para manejar videos
function getAllVideos() {
    return videosData.videos;
}

function getVideoById(id) {
    return videosData.videos.find(video => video.id === id);
}

function searchVideos(query) {
    if (!query) {
        return videosData.videos;
    }
    
    const lowerQuery = query.toLowerCase();
    return videosData.videos.filter(video => 
        video.title.toLowerCase().includes(lowerQuery) ||
        video.description.toLowerCase().includes(lowerQuery)
    );
}

// Convertir URL de YouTube a embed
function getYouTubeEmbedUrl(url) {
    // Si ya es embed, devolverla tal cual
    if (url.includes('/embed/')) {
        return url;
    }
    
    // Extraer ID del video de diferentes formatos
    let videoId = '';
    
    if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

document.addEventListener('DOMContentLoaded', function() {
    if (reviewsCache.isOnline) {
        setTimeout(() => {
            reviewsCache.syncPendingReviews();
        }, 2000);
    }
    
    console.log(`Estado conexión: ${reviewsCache.isOnline ? 'En línea' : 'Sin conexión'}`);
    
    const pending = reviewsCache.getPendingReviews();
    if (pending.length > 0) {
        console.log(`${pending.length} reseñas pendientes de sincronización`);
    }
});
