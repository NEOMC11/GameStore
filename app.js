// ===== VARIABLES GLOBALES =====
let currentFilter = 'all';
let isAdminLoggedIn = false;
const ADMIN_PASSWORD = 'gaelzule';
let allContent = [];
let allVideos = [];

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadDataFromFile();
    setupEventListeners();
});

// ===== CARGAR DATOS DESDE data.js =====
function loadDataFromFile() {
    // Los datos vienen de GAMESTORE_DATA definido en data.js
    if (typeof GAMESTORE_DATA !== 'undefined') {
        allContent = GAMESTORE_DATA.content || [];
        allVideos = GAMESTORE_DATA.videos || [];
        loadContent();
        loadVideos();
        checkHash();
    } else {
        console.error('GAMESTORE_DATA no está definido. Asegúrate de que data.js está cargado.');
    }
}

// ===== TEMA =====
function initializeTheme() {
    const savedTheme = localStorage.getItem('gamestore_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'light';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('gamestore_theme', newTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.checked = newTheme === 'light';
    }
}

// ===== NAVEGACIÓN =====
function setupEventListeners() {
    // Menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');
    
    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (closeSidebar) closeSidebar.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    
    if (themeToggle) themeToggle.addEventListener('change', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Bottom navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchSection(btn.dataset.section));
    });
    
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterContent(btn.dataset.filter));
    });
    
    // Admin
    const adminBtn = document.getElementById('adminBtn');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeAdminPanel = document.getElementById('closeAdminPanel');
    
    if (adminBtn) adminBtn.addEventListener('click', showLoginModal);
    if (closeLoginModal) closeLoginModal.addEventListener('click', closeModal);
    if (loginBtn) loginBtn.addEventListener('click', adminLogin);
    if (closeAdminPanel) closeAdminPanel.addEventListener('click', closeModal);
    
    // Admin tabs
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchAdminTab(btn.dataset.tab));
    });
    
    // Formularios
    const contentForm = document.getElementById('contentForm');
    const videoForm = document.getElementById('videoForm');
    
    if (contentForm) contentForm.addEventListener('submit', submitContent);
    if (videoForm) videoForm.addEventListener('submit', submitVideo);
    
    // Modales
    const closeDetailModal = document.getElementById('closeDetailModal');
    const closeVideoModal = document.getElementById('closeVideoModal');
    
    if (closeDetailModal) closeDetailModal.addEventListener('click', closeModal);
    if (closeVideoModal) closeVideoModal.addEventListener('click', closeModal);
    
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', handleSearch);
    
    // Cerrar modal al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });
    
    // Hash changes
    window.addEventListener('hashchange', checkHash);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar) sidebar.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

function switchSection(section) {
    // Actualizar botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });
    
    // Actualizar secciones
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.toggle('active', sec.id === section);
    });
    
    // Si es búsqueda, enfocar el input
    if (section === 'search') {
        setTimeout(() => {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.focus();
        }, 300);
    }
}

function filterContent(filter) {
    currentFilter = filter;
    
    // Actualizar botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    // Recargar contenido
    loadContent();
}

// ===== CARGAR CONTENIDO =====
function loadContent() {
    const grid = document.getElementById('cardsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filtered = currentFilter === 'all' 
        ? allContent 
        : allContent.filter(item => item.type === currentFilter);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">No hay contenido disponible</p>';
        return;
    }
    
    filtered.forEach(item => {
        const card = createCard(item);
        grid.appendChild(card);
    });
}

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}" class="card-image" onerror="this.src='https://via.placeholder.com/300x180?text=No+Image'">
        <div class="card-content">
            <div class="card-header">
                <h3 class="card-title">${item.name}</h3>
                <span class="card-version">${item.version}</span>
            </div>
            <p class="card-description">${item.description.substring(0, 100)}...</p>
        </div>
    `;
    
    // Hacer clic en la card para ver detalles
    card.addEventListener('click', () => {
        showDetail(item);
    });
    
    return card;
}

function showDetail(item) {
    // Cambiar el hash de la URL
    window.location.hash = item.id;
    
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailContent');
    
    if (!modal || !content) return;
    
    let screenshotsHTML = '';
    if (item.screenshots && item.screenshots.length > 0) {
        screenshotsHTML = `
            <div class="detail-screenshots">
                <h3>Capturas</h3>
                <div class="screenshots-grid">
                    ${item.screenshots.map(img => `
                        <img src="${img}" alt="Screenshot" class="screenshot-img" onerror="this.src='https://via.placeholder.com/150x120?text=No+Image'">
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    let videosHTML = '';
    if (item.videos && item.videos.length > 0) {
        videosHTML = `
            <div class="detail-videos">
                <h3>Videos</h3>
                <div class="videos-list">
                    ${item.videos.map((video, index) => `
                        <a href="${video}" target="_blank" class="video-link">
                            <i class="fab fa-youtube"></i>
                            <span>Ver video ${index + 1}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    content.innerHTML = `
        <div class="detail-header">
            <img src="${item.imageUrl}" alt="${item.name}" class="detail-image" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
            <h2 class="detail-title">${item.name}</h2>
            <span class="detail-version">${item.version}</span>
        </div>
        
        <div class="detail-description">
            <h3>Descripción</h3>
            <p>${item.description}</p>
        </div>
        
        ${screenshotsHTML}
        ${videosHTML}
        
        <div class="detail-actions">
            <button class="btn-download-large" onclick="downloadItem('${item.downloadUrl}')">
                <i class="fas fa-download"></i>
                Descargar
            </button>
            <button class="btn-copy-link" onclick="copyCurrentLink()">
                <i class="fas fa-link"></i>
                Copiar Link
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

// ===== CARGAR VIDEOS =====
function loadVideos() {
    const grid = document.getElementById('videosGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (allVideos.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">No hay videos disponibles</p>';
        return;
    }
    
    allVideos.forEach(video => {
        const card = createVideoCard(video);
        grid.appendChild(card);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='https://via.placeholder.com/300x180?text=No+Image'">
            <div class="play-icon">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="video-title">${video.title}</div>
    `;
    
    card.addEventListener('click', () => showVideo(video));
    
    return card;
}

function showVideo(video) {
    const modal = document.getElementById('videoModal');
    const content = document.getElementById('videoContent');
    
    if (!modal || !content) return;
    
    content.innerHTML = `
        <h3 style="margin-bottom: 15px; color: var(--primary-color);">${video.title}</h3>
        <div class="video-embed">
            <iframe src="${video.url}" allowfullscreen></iframe>
        </div>
    `;
    
    modal.classList.add('active');
}

// ===== BÚSQUEDA =====
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) return;
    
    if (query === '') {
        resultsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Escribe para buscar...</p>';
        return;
    }
    
    const results = allContent.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.version.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No se encontraron resultados</p>';
        return;
    }
    
    resultsContainer.innerHTML = '';
    results.forEach(item => {
        const card = createCard(item);
        resultsContainer.appendChild(card);
    });
}

// ===== ADMIN =====
function showLoginModal() {
    if (isAdminLoggedIn) {
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) adminPanel.classList.add('active');
    } else {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.add('active');
    }
}

function adminLogin() {
    const passwordInput = document.getElementById('adminPassword');
    if (!passwordInput) return;
    
    const password = passwordInput.value;
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        closeModal();
        showToast('Acceso concedido');
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) adminPanel.classList.add('active');
        passwordInput.value = '';
    } else {
        showToast('Contraseña incorrecta', true);
    }
}

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tab}Tab`);
    });
}

function submitContent(e) {
    e.preventDefault();
    
    showToast('⚠️ Para añadir contenido, debes editar el archivo data.js en tu repositorio de GitHub', true);
    
    // Mostrar instrucciones
    alert(`Para añadir contenido:

1. Ve a tu repositorio en GitHub
2. Edita el archivo "data.js"
3. Añade tu nuevo item en el array "content"
4. Guarda y espera el redeploy automático (1-2 minutos)

Formato del item:
{
  id: 'mi-app-v1',
  name: 'Mi App',
  description: 'Descripción...',
  version: 'v1.0',
  downloadUrl: 'https://...',
  imageUrl: 'https://...',
  type: 'app',
  screenshots: ['url1', 'url2'],
  videos: ['url1']
}`);
}

function submitVideo(e) {
    e.preventDefault();
    
    showToast('⚠️ Para añadir videos, debes editar el archivo data.js en tu repositorio de GitHub', true);
    
    // Mostrar instrucciones
    alert(`Para añadir videos:

1. Ve a tu repositorio en GitHub
2. Edita el archivo "data.js"
3. Añade tu nuevo video en el array "videos"
4. Guarda y espera el redeploy automático (1-2 minutos)

Formato del video:
{
  id: 'video4',
  title: 'Mi Video',
  url: 'https://www.youtube.com/embed/VIDEO_ID',
  thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  platform: 'youtube'
}`);
}

// ===== UTILIDADES =====
function downloadItem(url) {
    window.open(url, '_blank');
    showToast('Iniciando descarga...');
}

function copyCurrentLink() {
    const link = window.location.href;
    
    navigator.clipboard.writeText(link).then(() => {
        showToast('¡Enlace copiado!');
    }).catch(() => {
        showToast('Error al copiar enlace', true);
    });
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    
    // Limpiar el hash si estamos cerrando el detalle
    if (window.location.hash) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    if (isError) {
        toast.style.background = 'linear-gradient(135deg, #FF4444, #CC0000)';
    } else {
        toast.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== MANEJO DE HASH =====
function checkHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const item = allContent.find(i => i.id === hash);
        if (item) {
            showDetail(item);
        }
    }
}