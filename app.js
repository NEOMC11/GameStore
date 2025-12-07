// ===== IMPORTAR FIREBASE =====
import { 
    db, 
    auth, 
    storage,
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    orderBy,
    serverTimestamp,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    ref,
    uploadBytes,
    getDownloadURL,
    increment
} from './firebase-config.js';

// ===== VARIABLES GLOBALES =====
let currentFilter = 'all';
let isAdminLoggedIn = false;
let currentUser = null;
let allContent = [];
let allVideos = [];
let editingItemId = null;
let currentItemComments = [];

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupEventListeners();
    checkAuthState();
    loadDataFromFirebase();
});

// ===== AUTENTICACIÓN =====
function checkAuthState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            isAdminLoggedIn = true;
            updateAdminUI(true);
        } else {
            currentUser = null;
            isAdminLoggedIn = false;
            updateAdminUI(false);
        }
    });
}

function updateAdminUI(isLoggedIn) {
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
        if (isLoggedIn) {
            adminBtn.innerHTML = '<i class="fas fa-user-shield"></i> Panel Admin';
        } else {
            adminBtn.innerHTML = '<i class="fas fa-lock"></i> Iniciar Sesión';
        }
    }
}

async function adminLogin() {
    const emailInput = document.getElementById('adminEmail');
    const passwordInput = document.getElementById('adminPassword');
    
    if (!emailInput || !passwordInput) return;
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (!email || !password) {
        showToast('Por favor completa todos los campos', true);
        return;
    }
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        closeModal();
        showToast('¡Sesión iniciada correctamente!');
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) adminPanel.classList.add('active');
        emailInput.value = '';
        passwordInput.value = '';
    } catch (error) {
        console.error('Error de login:', error);
        let errorMessage = 'Error al iniciar sesión';
        
        if (error.code === 'auth/invalid-credential') {
            errorMessage = 'Email o contraseña incorrectos';
        } else if (error.code === 'auth/user-not-found') {
            errorMessage = 'Usuario no encontrado';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Contraseña incorrecta';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Email inválido';
        }
        
        showToast(errorMessage, true);
    }
}

async function adminLogout() {
    try {
        await signOut(auth);
        closeModal();
        showToast('Sesión cerrada');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        showToast('Error al cerrar sesión', true);
    }
}

// ===== CARGAR DATOS DESDE FIREBASE =====
async function loadDataFromFirebase() {
    try {
        await Promise.all([loadContent(), loadVideos()]);
        checkHash();
    } catch (error) {
        console.error('Error al cargar datos:', error);
        showToast('Error al cargar datos', true);
    }
}

async function loadContent() {
    try {
        const contentCollection = collection(db, 'content');
        const q = query(contentCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        allContent = [];
        querySnapshot.forEach((doc) => {
            allContent.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        displayContent();
    } catch (error) {
        console.error('Error al cargar contenido:', error);
        showToast('Error al cargar contenido', true);
    }
}

async function loadVideos() {
    try {
        const videosCollection = collection(db, 'videos');
        const q = query(videosCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        allVideos = [];
        querySnapshot.forEach((doc) => {
            allVideos.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        displayVideos();
    } catch (error) {
        console.error('Error al cargar videos:', error);
        showToast('Error al cargar videos', true);
    }
}

function displayContent() {
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

function displayVideos() {
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

// ===== ESTADÍSTICAS DE DESCARGAS =====
async function trackDownload(itemId) {
    try {
        const itemRef = doc(db, 'content', itemId);
        await updateDoc(itemRef, {
            downloads: increment(1)
        });
        
        // Actualizar en memoria
        const item = allContent.find(i => i.id === itemId);
        if (item) {
            item.downloads = (item.downloads || 0) + 1;
        }
        
    } catch (error) {
        console.error('Error al registrar descarga:', error);
    }
}

// ===== SISTEMA DE COMENTARIOS =====
async function loadComments(contentId) {
    try {
        const commentsCollection = collection(db, 'content', contentId, 'comments');
        const q = query(commentsCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        currentItemComments = [];
        querySnapshot.forEach((doc) => {
            currentItemComments.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return currentItemComments;
    } catch (error) {
        console.error('Error al cargar comentarios:', error);
        return [];
    }
}

async function addComment(contentId, userName, commentText) {
    try {
        const commentsCollection = collection(db, 'content', contentId, 'comments');
        const newComment = {
            userName: userName,
            text: commentText,
            createdAt: serverTimestamp()
        };
        
        await addDoc(commentsCollection, newComment);
        showToast('¡Comentario publicado!');
        return true;
    } catch (error) {
        console.error('Error al agregar comentario:', error);
        showToast('Error al publicar comentario', true);
        return false;
    }
}

async function deleteComment(contentId, commentId) {
    try {
        const commentRef = doc(db, 'content', contentId, 'comments', commentId);
        await deleteDoc(commentRef);
        showToast('Comentario eliminado');
        return true;
    } catch (error) {
        console.error('Error al eliminar comentario:', error);
        showToast('Error al eliminar comentario', true);
        return false;
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
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');
    
    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (closeSidebar) closeSidebar.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);
    
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    
    if (themeToggle) themeToggle.addEventListener('change', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchSection(btn.dataset.section));
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterContent(btn.dataset.filter));
    });
    
    const adminBtn = document.getElementById('adminBtn');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const closeAdminPanel = document.getElementById('closeAdminPanel');
    
    if (adminBtn) adminBtn.addEventListener('click', showLoginModal);
    if (closeLoginModal) closeLoginModal.addEventListener('click', closeModal);
    if (loginBtn) loginBtn.addEventListener('click', adminLogin);
    if (logoutBtn) logoutBtn.addEventListener('click', adminLogout);
    if (closeAdminPanel) closeAdminPanel.addEventListener('click', closeModal);
    
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchAdminTab(btn.dataset.tab));
    });
    
    const contentForm = document.getElementById('contentForm');
    const videoForm = document.getElementById('videoForm');
    
    if (contentForm) contentForm.addEventListener('submit', submitContent);
    if (videoForm) videoForm.addEventListener('submit', submitVideo);
    
    const closeDetailModal = document.getElementById('closeDetailModal');
    const closeVideoModal = document.getElementById('closeVideoModal');
    
    if (closeDetailModal) closeDetailModal.addEventListener('click', closeModal);
    if (closeVideoModal) closeVideoModal.addEventListener('click', closeModal);
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', handleSearch);
    
    const contentImage = document.getElementById('contentImage');
    if (contentImage) contentImage.addEventListener('change', handleImageUpload);
    
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });
    
    window.addEventListener('hashchange', checkHash);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar) sidebar.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

function switchSection(section) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });
    
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.toggle('active', sec.id === section);
    });
    
    if (section === 'search') {
        setTimeout(() => {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.focus();
        }, 300);
    }
}

function filterContent(filter) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    displayContent();
}

// ===== CREAR CARDS =====
function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const downloads = item.downloads || 0;
    
    card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}" class="card-image" onerror="this.src='https://via.placeholder.com/300x180?text=No+Image'">
        <div class="card-content">
            <div class="card-header">
                <h3 class="card-title">${item.name}</h3>
                <span class="card-version">${item.version}</span>
            </div>
            <p class="card-description">${item.description.substring(0, 100)}...</p>
            <div class="card-stats">
                <span class="stat-item">
                    <i class="fas fa-download"></i>
                    ${downloads.toLocaleString()} descargas
                </span>
            </div>
            ${isAdminLoggedIn ? `
                <div class="card-admin-actions">
                    <button class="btn-edit" onclick="editItem('${item.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteItem('${item.id}', 'content')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            ` : ''}
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-admin-actions')) {
            showDetail(item);
        }
    });
    
    return card;
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
        ${isAdminLoggedIn ? `
            <div class="card-admin-actions">
                <button class="btn-delete" onclick="deleteItem('${video.id}', 'videos')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        ` : ''}
    `;
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-admin-actions')) {
            showVideo(video);
        }
    });
    
    return card;
}

// ===== DETALLES CON COMENTARIOS =====
async function showDetail(item) {
    window.location.hash = item.id;
    
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailContent');
    
    if (!modal || !content) return;
    
    // Cargar comentarios
    const comments = await loadComments(item.id);
    
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
    
    const downloads = item.downloads || 0;
    
    let commentsHTML = `
        <div class="comments-section">
            <h3>💬 Comentarios (${comments.length})</h3>
            
            <div class="comment-form">
                <input type="text" id="commentUserName" placeholder="Tu nombre" class="comment-input">
                <textarea id="commentText" placeholder="Escribe tu comentario..." rows="3" class="comment-textarea"></textarea>
                <button class="btn-comment-submit" onclick="submitComment('${item.id}')">
                    <i class="fas fa-paper-plane"></i> Publicar
                </button>
            </div>
            
            <div class="comments-list" id="commentsList">
                ${comments.length === 0 ? '<p class="no-comments">No hay comentarios aún. ¡Sé el primero!</p>' : ''}
                ${comments.map(comment => `
                    <div class="comment-item" data-comment-id="${comment.id}">
                        <div class="comment-header">
                            <span class="comment-author"><i class="fas fa-user"></i> ${comment.userName}</span>
                            <span class="comment-date">${formatDate(comment.createdAt)}</span>
                            ${isAdminLoggedIn ? `
                                <button class="btn-comment-delete" onclick="removeComment('${item.id}', '${comment.id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            ` : ''}
                        </div>
                        <p class="comment-text">${comment.text}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    content.innerHTML = `
        <div class="detail-header">
            <img src="${item.imageUrl}" alt="${item.name}" class="detail-image" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
            <h2 class="detail-title">${item.name}</h2>
            <span class="detail-version">${item.version}</span>
            <div class="detail-stats">
                <span class="detail-stat">
                    <i class="fas fa-download"></i>
                    ${downloads.toLocaleString()} descargas
                </span>
                <span class="detail-stat">
                    <i class="fas fa-comments"></i>
                    ${comments.length} comentarios
                </span>
            </div>
        </div>
        
        <div class="detail-description">
            <h3>Descripción</h3>
            <p>${item.description}</p>
        </div>
        
        ${screenshotsHTML}
        ${videosHTML}
        
        <div class="detail-actions">
            <button class="btn-download-large" onclick="downloadItem('${item.downloadUrl}', '${item.id}')">
                <i class="fas fa-download"></i>
                Descargar
            </button>
            <button class="btn-copy-link" onclick="copyCurrentLink()">
                <i class="fas fa-link"></i>
                Copiar Link
            </button>
        </div>
        
        ${commentsHTML}
    `;
    
    modal.classList.add('active');
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

// ===== FUNCIONES DE COMENTARIOS =====
window.submitComment = async function(contentId) {
    const userNameInput = document.getElementById('commentUserName');
    const commentTextInput = document.getElementById('commentText');
    
    if (!userNameInput || !commentTextInput) return;
    
    const userName = userNameInput.value.trim();
    const commentText = commentTextInput.value.trim();
    
    if (!userName || !commentText) {
        showToast('Por favor completa tu nombre y comentario', true);
        return;
    }
    
    const success = await addComment(contentId, userName, commentText);
    
    if (success) {
        userNameInput.value = '';
        commentTextInput.value = '';
        
        // Recargar detalle para mostrar nuevo comentario
        const item = allContent.find(i => i.id === contentId);
        if (item) {
            await showDetail(item);
        }
    }
}

window.removeComment = async function(contentId, commentId) {
    if (!confirm('¿Eliminar este comentario?')) return;
    
    const success = await deleteComment(contentId, commentId);
    
    if (success) {
        const item = allContent.find(i => i.id === contentId);
        if (item) {
            await showDetail(item);
        }
    }
}

function formatDate(timestamp) {
    if (!timestamp) return 'Ahora';
    
    try {
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'Ahora';
        if (minutes < 60) return `Hace ${minutes}m`;
        if (hours < 24) return `Hace ${hours}h`;
        if (days < 7) return `Hace ${days}d`;
        
        return date.toLocaleDateString();
    } catch (error) {
        return 'Fecha desconocida';
    }
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

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tab}Tab`);
    });
    
    if (tab === 'content') {
        clearContentForm();
    }
}

// ===== SUBIR IMAGEN =====
let uploadedImageFile = null;

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            showToast('La imagen no debe superar 5MB', true);
            e.target.value = '';
            return;
        }
        uploadedImageFile = file;
        showToast('Imagen seleccionada: ' + file.name);
    }
}

async function uploadImage(file, path) {
    try {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Error al subir imagen:', error);
        throw error;
    }
}

// ===== CREAR/EDITAR CONTENIDO =====
async function submitContent(e) {
    e.preventDefault();
    
    if (!isAdminLoggedIn) {
        showToast('Debes iniciar sesión como administrador', true);
        return;
    }
    
    const name = document.getElementById('contentName').value.trim();
    const description = document.getElementById('contentDescription').value.trim();
    const version = document.getElementById('contentVersion').value.trim();
    const downloadUrl = document.getElementById('contentDownload').value.trim();
    const type = document.getElementById('contentType').value;
    const screenshotsInput = document.getElementById('contentScreenshots').value.trim();
    const videosInput = document.getElementById('contentVideos').value.trim();
    
    if (!name || !description || !version || !downloadUrl) {
        showToast('Por favor completa todos los campos obligatorios', true);
        return;
    }
    
    try {
        showToast('Guardando...');
        
        let imageUrl = document.getElementById('contentImageUrl')?.value.trim() || '';
        
        if (uploadedImageFile) {
            const imagePath = `content/${Date.now()}_${uploadedImageFile.name}`;
            imageUrl = await uploadImage(uploadedImageFile, imagePath);
        }
        
        const screenshots = screenshotsInput 
            ? screenshotsInput.split(',').map(s => s.trim()).filter(s => s)
            : [];
        
        const videos = videosInput 
            ? videosInput.split(',').map(v => v.trim()).filter(v => v)
            : [];
        
        const contentData = {
            name,
            description,
            version,
            downloadUrl,
            imageUrl,
            type,
            screenshots,
            videos,
            downloads: 0,
            createdAt: serverTimestamp()
        };
        
        if (editingItemId) {
            const docRef = doc(db, 'content', editingItemId);
            await updateDoc(docRef, contentData);
            showToast('¡Contenido actualizado!');
            editingItemId = null;
        } else {
            await addDoc(collection(db, 'content'), contentData);
            showToast('¡Contenido publicado!');
        }
        
        clearContentForm();
        await loadContent();
        closeModal();
        
    } catch (error) {
        console.error('Error al guardar:', error);
        showToast('Error al guardar el contenido', true);
    }
}

async function submitVideo(e) {
    e.preventDefault();
    
    if (!isAdminLoggedIn) {
        showToast('Debes iniciar sesión como administrador', true);
        return;
    }
    
    const title = document.getElementById('videoTitle').value.trim();
    const url = document.getElementById('videoUrl').value.trim();
    const thumbnail = document.getElementById('videoThumbnail').value.trim();
    
    if (!title || !url || !thumbnail) {
        showToast('Por favor completa todos los campos', true);
        return;
    }
    
    try {
        showToast('Guardando...');
        
        const videoData = {
            title,
            url,
            thumbnail,
            platform: 'youtube',
            createdAt: serverTimestamp()
        };
        
        await addDoc(collection(db, 'videos'), videoData);
        showToast('¡Video publicado!');
        
        document.getElementById('videoForm').reset();
        await loadVideos();
        closeModal();
        
    } catch (error) {
        console.error('Error al guardar video:', error);
        showToast('Error al guardar el video', true);
    }
}

// ===== EDITAR ITEM =====
window.editItem = async function(itemId) {
    const item = allContent.find(i => i.id === itemId);
    if (!item) return;
    
    editingItemId = itemId;
    
    document.getElementById('contentName').value = item.name;
    document.getElementById('contentDescription').value = item.description;
    document.getElementById('contentVersion').value = item.version;
    document.getElementById('contentDownload').value = item.downloadUrl;
    document.getElementById('contentImageUrl').value = item.imageUrl;
    document.getElementById('contentType').value = item.type;
    document.getElementById('contentScreenshots').value = item.screenshots?.join(', ') || '';
    document.getElementById('contentVideos').value = item.videos?.join(', ') || '';
    
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) adminPanel.classList.add('active');
    
    switchAdminTab('content');
    
    showToast('Editando contenido...');
}

// ===== ELIMINAR ITEM =====
window.deleteItem = async function(itemId, collectionName) {
    if (!confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
        return;
    }
    
    try {
        await deleteDoc(doc(db, collectionName, itemId));
        showToast('¡Elemento eliminado!');
        
        if (collectionName === 'content') {
            await loadContent();
        } else {
            await loadVideos();
        }
    } catch (error) {
        console.error('Error al eliminar:', error);
        showToast('Error al eliminar el elemento', true);
    }
}

function clearContentForm() {
    const form = document.getElementById('contentForm');
    if (form) form.reset();
    uploadedImageFile = null;
    editingItemId = null;
}

// ===== UTILIDADES =====
window.downloadItem = async function(url, itemId) {
    window.open(url, '_blank');
    showToast('Iniciando descarga...');
    
    if (itemId) {
        await trackDownload(itemId);
    }
}

window.copyCurrentLink = function() {
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
        toast.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--neon-blue))';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function checkHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const item = allContent.find(i => i.id === hash);
        if (item) {
            showDetail(item);
        }
    }
}
/* ===== PWA Install Prompt ===== */
let deferredPrompt;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'block';
    installButton.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuario aceptó instalar la PWA');
            }
            deferredPrompt = null;
            installButton.style.display = 'none';
        });
    });
});

window.addEventListener('appinstalled', () => {
    console.log('PWA instalada');
    installButton.style.display = 'none';
});