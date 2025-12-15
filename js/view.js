// Renderizar detalles del addon INMEDIATAMENTE
async function renderAddonDetails(addon) {
    const container = document.getElementById('addonDetails');
    const pageTitle = document.getElementById('pageTitle');
    
    if (!addon) {
        container.innerHTML = `
            <div class="error-message">
                <div class="error-icon">!</div>
                <h3 class="error-text">Addon no encontrado</h3>
                <p class="error-details">El addon que buscas no existe o ha sido eliminado.</p>
                <a href="index.html" class="clear-search">Volver al inicio</a>
            </div>
        `;
        return;
    }
    
    // Actualizar título de la página
    pageTitle.innerHTML = `${processTextWithStickersInTitles(addon.title)} - GameStore`;
    
    // Renderizar INMEDIATAMENTE con valores por defecto
    container.innerHTML = `
        <div class="addon-header">
            <img src="${addon.cover_image}" alt="Portada del addon" class="addon-cover">
            <h1 class="addon-title sticker-content">${processTextWithStickersInTitles(addon.title)}</h1>
            
            <div class="addon-meta">
                <div class="meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Actualizado: ${formatDate(addon.last_updated)}</span>
                </div>
                <div class="meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Minecraft ${addon.version}</span>
                </div>
                <div class="meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <span>${addon.file_size}</span>
                </div>
            </div>
            
            <div class="addon-tags">
                ${addon.tags.map(tag => `<span class="addon-tag">${tag}</span>`).join('')}
            </div>
            
            <p class="addon-description sticker-content">${processTextWithStickers(addon.description)}</p>
            
            <div class="action-buttons">
                <button class="download-btn" onclick="downloadAddon(${addon.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Descargar
                </button>
                
                <button class="copy-link-btn" onclick="copyAddonLink(${addon.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copiar Link
                </button>
                
                <button class="share-btn" onclick="openShareModal(${addon.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Compartir
                </button>
            </div>
        </div>
        
        <div class="reviews-section" id="reviewsSection">
            <div class="reviews-header">
                <h2 class="reviews-title">Reseñas</h2>
                <div class="overall-rating">
                    <div class="rating-display">
                        <div class="rating-stars">
                            ${renderStars(0)}
                        </div>
                        <div class="rating-score">0.0</div>
                        <div class="rating-count">0 reseñas</div>
                    </div>
                </div>
            </div>
            
            <div class="loading-reviews">Cargando reseñas...</div>
        </div>
    `;
    
    // Cargar reseñas en segundo plano
    loadReviewsInBackground(addon.id);
}

// Cargar reseñas en segundo plano SIN bloquear
async function loadReviewsInBackground(addonId) {
    try {
        const reviews = await getReviewsForAddon(addonId);
        const averageRating = calculateAverageRating(reviews);
        const userReview = await getUserReviewForAddon(addonId);
        
        // Actualizar la sección de reseñas
        const reviewsSection = document.getElementById('reviewsSection');
        if (reviewsSection) {
            reviewsSection.innerHTML = `
                <div class="reviews-header">
                    <h2 class="reviews-title">Reseñas</h2>
                    <div class="overall-rating">
                        <div class="rating-display">
                            <div class="rating-stars">
                                ${renderStars(averageRating)}
                            </div>
                            <div class="rating-score">${averageRating}</div>
                            <div class="rating-count">${reviews.length} reseña${reviews.length !== 1 ? 's' : ''}</div>
                        </div>
                    </div>
                </div>
                
                ${renderReviewForm(addonId, userReview)}
                ${renderReviewsList(reviews, userReview)}
            `;
            
            setupReviewForm(addonId);
        }
    } catch (error) {
        console.log('Error cargando reseñas:', error);
        const reviewsSection = document.getElementById('reviewsSection');
        if (reviewsSection) {
            reviewsSection.innerHTML = `
                <div class="reviews-header">
                    <h2 class="reviews-title">Reseñas</h2>
                    <p>No se pudieron cargar las reseñas</p>
                </div>
            `;
        }
    }
}

function copyAddonLink(addonId) {
    const addon = getAddonById(addonId);
    if (!addon) return;
    
    const addonUrl = `https://game-store-self.vercel.app/view.html?id=${addonId}`;
    
    navigator.clipboard.writeText(addonUrl).then(() => {
        showNotification('¡Link copiado!', 'El enlace se copió al portapapeles', 'success');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = addonUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('¡Link copiado!', 'El enlace se copió al portapapeles', 'success');
        } catch (err) {
            showNotification('Error', 'No se pudo copiar el enlace', 'error');
        }
        document.body.removeChild(textArea);
    });
}

function openShareModal(addonId) {
    const addon = getAddonById(addonId);
    if (!addon) return;
    
    const addonUrl = encodeURIComponent(`https://game-store-self.vercel.app/view.html?id=${addonId}`);
    const addonTitle = encodeURIComponent(addon.title);
    
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <button class="share-modal-close" onclick="closeShareModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            
            <h2 class="share-modal-title">Compartir "${addon.title}"</h2>
            
            <div class="share-options">
                <button class="share-option whatsapp" onclick="shareToWhatsApp('${addonUrl}', '${addonTitle}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>WhatsApp</span>
                </button>
                
                <button class="share-option facebook" onclick="shareToFacebook('${addonUrl}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                </button>
                
                <button class="share-option twitter" onclick="shareToTwitter('${addonUrl}', '${addonTitle}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>Twitter</span>
                </button>
                
                <button class="share-option telegram" onclick="shareToTelegram('${addonUrl}', '${addonTitle}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span>Telegram</span>
                </button>
                
                <button class="share-option copy-link" onclick="copyAddonLink(${addonId}); closeShareModal();">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copiar Link</span>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeShareModal();
        }
    });
}

function closeShareModal() {
    const modal = document.querySelector('.share-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function shareToWhatsApp(url, title) {
    const text = `¡Mira esto! ${decodeURIComponent(title)}`;
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    closeShareModal();
}

function shareToFacebook(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    closeShareModal();
}

function shareToTwitter(url, title) {
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
    closeShareModal();
}

function shareToTelegram(url, title) {
    window.open(`https://t.me/share/url?url=${url}&text=${title}`, '_blank');
    closeShareModal();
}

function showNotification(title, message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function renderReviewForm(addonId, userReview) {
    if (userReview) {
        return `
            <div class="user-review">
                <div class="user-review-header">
                    <div class="user-review-info">
                        <img src="${getUserProfilePicture()}" alt="Tu foto de perfil" class="profile-picture">
                        <div>
                            <div class="user-review-rating">
                                <span>Tu calificación:</span>
                                ${renderStars(userReview.rating)}
                            </div>
                            <div class="user-review-date">${formatDate(userReview.timestamp)}</div>
                        </div>
                    </div>
                    <button class="delete-review-btn" onclick="deleteUserReview(${addonId})">
                        Eliminar reseña
                    </button>
                </div>
                <p class="user-review-comment sticker-content">${processTextWithStickers(userReview.comment)}</p>
            </div>
        `;
    } else {
        return `
            <div class="add-review-form">
                <h3 class="form-title">Añadir reseña</h3>
                <form id="reviewForm">
                    <div class="rating-input">
                        <label>Calificación:</label>
                        ${renderStars(0, true)}
                    </div>
                    <div class="comment-input">
                        <label for="reviewComment">Comentario:</label>
                        <textarea id="reviewComment" placeholder="Comparte tu experiencia con este addon... $fire $heart" required></textarea>
                        <div class="sticker-help">
                            <small>Usa $1, $2, $fire, $heart, etc. para añadir stickers</small>
                        </div>
                    </div>
                    <div class="review-actions">
                        <button type="submit" class="submit-review-btn">
                            Enviar reseña
                        </button>
                        <button type="button" class="sticker-picker-toggle" onclick="toggleStickerPicker('reviewComment')">
                            😊 Añadir Sticker
                        </button>
                    </div>
                </form>
            </div>
        `;
    }
}

function renderReviewsList(reviews, userReview) {
    const otherReviews = reviews.filter(review => 
        !userReview || review.userId !== userReview.userId
    );
    
    if (otherReviews.length === 0) {
        return `
            <div class="all-reviews">
                <h3>Todas las reseñas</h3>
                <div class="no-reviews">
                    <p>Aún no hay reseñas para este addon.</p>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="all-reviews">
            <h3>Todas las reseñas</h3>
            <div class="reviews-list">
                ${otherReviews.map(review => `
                    <div class="review-item">
                        <div class="review-header">
                            <div class="review-user-info">
                                <img src="${getUserProfilePicture()}" alt="Foto de perfil" class="profile-picture">
                                <div class="review-user">Usuario</div>
                            </div>
                            <div class="review-rating">
                                ${renderStars(review.rating, false, 'small')}
                                <span class="review-date">${formatDate(review.timestamp)}</span>
                            </div>
                        </div>
                        <p class="review-comment sticker-content">${processTextWithStickers(review.comment)}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function setupReviewForm(addonId) {
    const reviewForm = document.getElementById('reviewForm');
    const stars = document.querySelectorAll('.stars.interactive .star');
    let selectedRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const comment = document.getElementById('reviewComment').value.trim();
            
            if (selectedRating === 0) {
                showNotification('Error', 'Por favor, selecciona una calificación', 'error');
                return;
            }
            
            if (!comment) {
                showNotification('Error', 'Por favor, escribe un comentario', 'error');
                return;
            }
            
            try {
                await addOrUpdateReview(addonId, selectedRating, comment);
                showNotification('¡Éxito!', 'Tu reseña ha sido publicada', 'success');
                setTimeout(() => location.reload(), 1500);
            } catch (error) {
                showNotification('Error', 'No se pudo enviar la reseña', 'error');
            }
        });
    }
}

async function deleteUserReview(addonId) {
    if (confirm('¿Estás seguro de que quieres eliminar tu reseña?')) {
        try {
            await deleteReview(addonId);
            showNotification('Eliminada', 'Tu reseña ha sido eliminada', 'success');
            setTimeout(() => location.reload(), 1500);
        } catch (error) {
            showNotification('Error', 'No se pudo eliminar la reseña', 'error');
        }
    }
}

function downloadAddon(addonId) {
    const addon = getAddonById(addonId);
    if (addon && addon.download_link) {
        window.open(addon.download_link, '_blank');
        showNotification('Descargando', 'Se abrió el enlace de descarga', 'success');
    } else {
        showNotification('Error', 'No se encontró el enlace de descarga', 'error');
    }
}

function toggleStickerPicker(textareaId) {
    if (typeof window.StickerSystem !== 'undefined') {
        window.StickerSystem.toggleStickerPicker(textareaId);
    }
}

// Inicializar la página - CARGA INSTANTÁNEA
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const addonId = urlParams.get('id');
    
    if (addonId) {
        const addon = getAddonById(addonId);
        renderAddonDetails(addon); // Renderizar INMEDIATAMENTE
    } else {
        renderAddonDetails(null);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeShareModal();
        }
    });
});