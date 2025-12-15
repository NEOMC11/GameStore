// Renderizar addons de forma INMEDIATA sin esperar reseñas
function renderAddons(addons) {
    const container = document.getElementById('addonsContainer');
    
    if (addons.length === 0) {
        container.innerHTML = `
            <div class="no-addons">
                <p>No se encontraron resultados.</p>
            </div>
        `;
        return;
    }
    
    // Renderizar INMEDIATAMENTE con rating 0 por defecto
    container.innerHTML = addons.map(addon => `
        <div class="addon-card" onclick="viewAddon(${addon.id})">
            <img src="${addon.cover_image}" alt="Portada" class="addon-cover">
            <div class="addon-info">
                <h3 class="addon-title sticker-content">${processTextWithStickersInTitles(addon.title)}</h3>
                <div class="addon-rating" data-addon-id="${addon.id}">
                    ${renderStars(0, false, 'small')}
                    <span class="rating-value">0.0</span>
                    <span class="reviews-count">(0)</span>
                </div>
                <p class="addon-description sticker-content">${processTextWithStickers(addon.description)}</p>
                
                <div class="addon-footer">
                    <span class="addon-version">${addon.version}</span>
                    <span class="publish-date">${formatDate(addon.last_updated)}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Cargar ratings en segundo plano SIN bloquear la UI
    loadRatingsInBackground(addons);
}

// Cargar ratings en segundo plano después de renderizar
async function loadRatingsInBackground(addons) {
    try {
        const reviews = await reviewsCache.getReviews();
        
        addons.forEach(addon => {
            const addonReviews = reviews[addon.id] || [];
            const averageRating = calculateAverageRating(addonReviews);
            const reviewsCount = addonReviews.length;
            
            // Actualizar el rating en el DOM sin re-renderizar todo
            const ratingElement = document.querySelector(`[data-addon-id="${addon.id}"]`);
            if (ratingElement) {
                ratingElement.innerHTML = `
                    ${renderStars(averageRating, false, 'small')}
                    <span class="rating-value">${averageRating}</span>
                    <span class="reviews-count">(${reviewsCount})</span>
                `;
            }
        });
    } catch (error) {
        console.log('Error cargando ratings, continuando sin ellos');
    }
}

// Función para renderizar videos (sin cambios, ya es rápida)
function renderVideos(videos) {
    const container = document.getElementById('addonsContainer');
    
    if (videos.length === 0) {
        container.innerHTML = `
            <div class="no-addons">
                <p>No se encontraron videos.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = videos.map(video => `
        <div class="addon-card video-card" onclick="openVideo('${video.id}')">
            <div class="video-thumbnail-container">
                <img src="${video.thumbnail}" alt="${video.title}" class="addon-cover">
                <div class="play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                </div>
            </div>
            <div class="addon-info">
                <h3 class="addon-title">${video.title}</h3>
                <p class="addon-description">${video.description}</p>
                <div class="addon-footer">
                    <span class="addon-version">Video</span>
                    <span class="publish-date">Ver ahora</span>
                </div>
            </div>
        </div>
    `).join('');
}

function openVideo(videoId) {
    const video = getVideoById(videoId);
    if (!video) return;
    
    const embedUrl = getYouTubeEmbedUrl(video.url);
    
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close" onclick="closeVideoModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <h2 class="video-modal-title">${video.title}</h2>
            <div class="video-wrapper">
                <iframe 
                    src="${embedUrl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <p class="video-modal-description">${video.description}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
}

function closeVideoModal() {
    const modal = document.querySelector('.video-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function viewAddon(id) {
    window.location.href = `view.html?id=${id}`;
}

function setupHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    
    function toggleMenu() {
        const isActive = dropdownMenu.classList.contains('active');
        
        if (isActive) {
            hamburgerMenu.classList.remove('active');
            dropdownMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            hamburgerMenu.classList.add('active');
            dropdownMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeMenuFunction() {
        hamburgerMenu.classList.remove('active');
        dropdownMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    hamburgerMenu.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenuFunction);
    closeMenu.addEventListener('click', closeMenuFunction);
    
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.includes('discord.gg') || href.includes('youtube.com')) {
                closeMenuFunction();
            } else if (href === './sc/licencia.html') {
                closeMenuFunction();
            } else if (href === 'index.html') {
                closeMenuFunction();
            } else {
                e.preventDefault();
                closeMenuFunction();
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (dropdownMenu.classList.contains('active')) {
                closeMenuFunction();
            }
            if (document.querySelector('.video-modal')) {
                closeVideoModal();
            }
        }
    });
}

function renderFilters() {
    const searchSection = document.querySelector('.search-section');
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters-container';
    
    filtersContainer.innerHTML = `
        <div class="filters-scroll">
            <div class="filters-wrapper">
                <button class="filter-btn active" data-category="Todos">
                    <span>Todos</span>
                </button>
                <button class="filter-btn" data-category="App">
                    <span>Apps</span>
                </button>
                <button class="filter-btn" data-category="Texturas">
                    <span>Texturas</span>
                </button>
                <button class="filter-btn" data-category="Shaders">
                    <span>Shaders</span>
                </button>
                <button class="filter-btn" data-category="Maps">
                    <span>Maps</span>
                </button>
                <button class="filter-btn" data-category="Videos">
                    <span>Videos</span>
                </button>
                <button class="filter-btn" data-category="Mejor Valorados">
                    <span>Mejor Valorados</span>
                </button>
            </div>
        </div>
    `;
    
    const searchContainer = searchSection.querySelector('.search-container');
    searchSection.insertBefore(filtersContainer, searchContainer.nextSibling);
    
    const filterButtons = filtersContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', async function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            const pageTitle = document.querySelector('.page-title');
            
            if (category === 'Videos') {
                const videos = getAllVideos();
                renderVideos(videos);
                pageTitle.textContent = 'Videos Tutoriales';
            } else if (category === 'Mejor Valorados') {
                // Para "Mejor Valorados" sí necesitamos esperar
                pageTitle.textContent = 'Mejor Valorados';
                const container = document.getElementById('addonsContainer');
                container.innerHTML = '<div class="loading-spinner">Cargando mejores valorados...</div>';
                
                const filteredAddons = await getBestRatedAddons();
                renderAddons(filteredAddons);
            } else {
                const filteredAddons = filterAddonsByCategory(category);
                renderAddons(filteredAddons);
                
                if (category === 'Todos') {
                    pageTitle.textContent = 'Últimas Descargas';
                } else {
                    pageTitle.textContent = category;
                }
            }
            
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });
}

// Inicializar la página - CARGA INSTANTÁNEA
document.addEventListener('DOMContentLoaded', function() {
    renderFilters();
    
    // Renderizar INMEDIATAMENTE sin esperar nada
    renderAddons(getAllAddons());
    
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        
        const addonResults = searchAddons(query);
        const videoResults = searchVideos(query);
        
        const pageTitle = document.querySelector('.page-title');
        
        if (query) {
            if (addonResults.length === 0 && videoResults.length === 0) {
                pageTitle.textContent = `Sin resultados para: "${query}"`;
                renderAddons([]);
            } else if (addonResults.length > 0) {
                pageTitle.textContent = `Resultados para: "${query}"`;
                renderAddons(addonResults);
            } else {
                pageTitle.textContent = `Videos para: "${query}"`;
                renderVideos(videoResults);
            }
            
            if (!document.querySelector('.clear-search')) {
                const clearBtn = document.createElement('a');
                clearBtn.href = '#';
                clearBtn.className = 'clear-search';
                clearBtn.textContent = 'Mostrar todos';
                clearBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    searchInput.value = '';
                    renderAddons(getAllAddons());
                    pageTitle.textContent = 'Últimas Descargas';
                    clearBtn.remove();
                    
                    document.querySelectorAll('.filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.getAttribute('data-category') === 'Todos') {
                            btn.classList.add('active');
                        }
                    });
                });
                pageTitle.parentNode.insertBefore(clearBtn, pageTitle.nextSibling);
            }
        } else {
            pageTitle.textContent = 'Últimas Descargas';
            const clearBtn = document.querySelector('.clear-search');
            if (clearBtn) clearBtn.remove();
            renderAddons(getAllAddons());
        }
    });
    
    setupHamburgerMenu();
});