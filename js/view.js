// =============================================
// GAMESTORE V2 — Vista de Detalle
// =============================================

'use strict';

function $(id) { return document.getElementById(id); }

function showToast(msg, duration = 2200) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

function goBack() {
  if (document.referrer && document.referrer.includes(location.hostname)) {
    history.back();
  } else {
    window.location.href = 'index.html';
  }
}

let currentAddon = null;

function openShare() {
  const sheet = $('shareSheet');
  if (!sheet) return;
  sheet.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeShareSheet() {
  const sheet = $('shareSheet');
  if (!sheet) return;
  sheet.style.display = 'none';
  document.body.style.overflow = '';
}

function copyLink() {
  const url = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => showToast('¡Link copiado!'));
  } else {
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast('¡Link copiado!');
  }
  closeShareSheet();
}

function toggleDesc() {
  const desc = document.querySelector('.detail-desc');
  const btn = document.querySelector('.read-more-btn');
  if (!desc || !btn) return;
  desc.classList.toggle('collapsed');
  btn.textContent = desc.classList.contains('collapsed') ? 'Leer más' : 'Leer menos';
}

function renderStars(rating) {
  return Array.from({length: 5}, (_, i) =>
    `<span style="color:${i < Math.round(rating) ? '#f59e0b' : '#444'}">★</span>`
  ).join('');
}

function renderAddon(addon) {
  const container = $('addonDetails');
  if (!container) return;

  // Update page title
  document.title = `${addon.title} — GameStore`;
  const navTitle = $('navTitle');
  if (navTitle) navTitle.textContent = addon.title;

  // Update share links
  const shareUrl = window.location.href;
  const shareText = `Descarga ${addon.title} en GameStore: ${shareUrl}`;
  const waLink = $('shareWhatsApp');
  const tgLink = $('shareTelegram');
  if (waLink) waLink.href = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  if (tgLink) tgLink.href = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(addon.title)}`;

  const isApp = addon.tags.some(t => ['App'].includes(t));
  const isTexture = addon.tags.some(t => ['Texturas','Textura'].includes(t));
  const isShader = addon.tags.includes('Shaders');
  const isMap = addon.tags.includes('Maps');

  let typeIcon = '📦';
  if (isApp) typeIcon = '📱';
  else if (isTexture) typeIcon = '🎨';
  else if (isShader) typeIcon = '✨';
  else if (isMap) typeIcon = '🗺️';

  const fakeReviews = [
    { user: 'Gamer_Pro', rating: 5, text: 'Increíble, funciona perfecto en mi dispositivo. Lo recomiendo 100%.', date: 'hace 2 días' },
    { user: 'MinecraftFan', rating: 4, text: 'Muy buena versión, sin bugs y carga rápido.', date: 'hace 1 semana' },
    { user: 'CraftMaster', rating: 5, text: 'La mejor versión que he probado. NEOMC11 siempre entrega calidad.', date: 'hace 2 semanas' },
  ];

  container.innerHTML = `
    <!-- Hero -->
    <div class="detail-hero animate-in">
      <img src="${addon.cover_image}" alt="${addon.title}" class="detail-icon" onerror="this.src='./img/NEOCRAFT.png'">
      <div class="detail-info">
        <h1 class="detail-title">${addon.title}</h1>
        <p class="detail-author">por NEOMC11 ${typeIcon}</p>
        <div class="detail-tags">
          ${addon.tags.slice(0, 3).map(t => `<span class="detail-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="detail-stats animate-in" style="animation-delay:0.05s;">
      <div class="stat-item">
        <span class="stat-value">4.8</span>
        <span class="stat-label">★ Valoración</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${addon.file_size || 'N/A'}</span>
        <span class="stat-label">Tamaño</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${addon.version || '1.0'}</span>
        <span class="stat-label">Versión</span>
      </div>
    </div>

    <!-- Download Button -->
    <a href="${addon.download_link}" target="_blank" rel="noopener" class="detail-download-btn animate-in" style="animation-delay:0.1s;" onclick="showToast('Redirigiendo a descarga...')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Descargar — ${addon.file_size || ''}
    </a>

    <!-- Descripción -->
    <div class="detail-section animate-in" style="animation-delay:0.12s;">
      <h2 class="detail-section-title">Descripción</h2>
      <p class="detail-desc collapsed">${addon.description}</p>
      <button class="read-more-btn" onclick="toggleDesc()">Leer más</button>
    </div>

    <!-- Info -->
    <div class="detail-section animate-in" style="animation-delay:0.15s;">
      <h2 class="detail-section-title">Información</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:9px 0;color:var(--text3);">Última actualización</td>
          <td style="padding:9px 0;text-align:right;font-weight:500;">${addon.last_updated || 'N/A'}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:9px 0;color:var(--text3);">Versión</td>
          <td style="padding:9px 0;text-align:right;font-weight:500;">${addon.version || 'N/A'}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:9px 0;color:var(--text3);">Tamaño</td>
          <td style="padding:9px 0;text-align:right;font-weight:500;">${addon.file_size || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding:9px 0;color:var(--text3);">Categorías</td>
          <td style="padding:9px 0;text-align:right;font-weight:500;">${addon.tags.join(', ')}</td>
        </tr>
      </table>
    </div>

    <!-- Redes del creador -->
    <div class="detail-section animate-in" style="animation-delay:0.18s;">
      <h2 class="detail-section-title">Creador</h2>
      <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--card);border-radius:var(--radius-sm);border:1px solid var(--border);margin-bottom:12px;">
        <img src="./img/profile/NEOMC11.png" alt="NEOMC11" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid var(--accent);" onerror="this.src='./img/NEOCRAFT.png'">
        <div>
          <p style="font-weight:700;font-size:15px;">NEOMC11</p>
          <p style="font-size:12px;color:var(--text3);">Creador de contenido · GameStore</p>
        </div>
        <a href="profile.html" style="margin-left:auto;background:var(--accent);color:#fff;font-size:12px;font-weight:600;padding:6px 12px;border-radius:50px;text-decoration:none;">Ver perfil</a>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <a href="https://youtube.com/@jlmc2?si=qHmc0eB24stW3Kcv" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:6px;background:var(--card);border:1px solid var(--border);color:var(--text);text-decoration:none;padding:8px 12px;border-radius:50px;font-size:13px;font-weight:500;transition:all 0.2s;">
          <img src="./img/yt.png" width="16" alt="YT" onerror="this.style.display='none'"> YouTube
        </a>
        <a href="https://www.tiktok.com/@neomc1?_t=ZS-8zkfUb8Lnjm&_r=1" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:6px;background:var(--card);border:1px solid var(--border);color:var(--text);text-decoration:none;padding:8px 12px;border-radius:50px;font-size:13px;font-weight:500;transition:all 0.2s;">
          <img src="./img/tiktok.png" width="16" alt="TT" onerror="this.style.display='none'"> TikTok
        </a>
        <a href="https://www.instagram.com/neomc12?igsh=MXNqYmcwNHZmOGx3Yg==" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:6px;background:var(--card);border:1px solid var(--border);color:var(--text);text-decoration:none;padding:8px 12px;border-radius:50px;font-size:13px;font-weight:500;transition:all 0.2s;">
          <img src="./img/inta.jpg" width="16" alt="IG" onerror="this.style.display='none'" style="border-radius:4px;"> Instagram
        </a>
      </div>
    </div>

    <!-- Reseñas -->
    <div class="detail-section animate-in" style="animation-delay:0.2s;">
      <h2 class="detail-section-title">Reseñas</h2>
      <div style="display:flex;align-items:center;gap:16px;padding:12px;background:var(--card);border-radius:var(--radius-sm);border:1px solid var(--border);margin-bottom:12px;">
        <div style="text-align:center;">
          <span style="font-size:36px;font-weight:800;line-height:1;">4.8</span>
          <div style="color:#f59e0b;font-size:14px;margin-top:2px;">★★★★★</div>
          <span style="font-size:11px;color:var(--text3);">de 5</span>
        </div>
        <div style="flex:1;">
          ${[5,4,3,2,1].map(s => `
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
              <span style="font-size:11px;color:var(--text3);width:8px;">${s}</span>
              <div style="flex:1;height:4px;background:var(--border);border-radius:2px;overflow:hidden;">
                <div style="height:100%;background:#f59e0b;width:${s===5?'75%':s===4?'18%':s===3?'5%':'1%'};border-radius:2px;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="reviews-list" id="reviewsList">
        ${fakeReviews.map(r => `
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">${r.user[0]}</div>
              <span class="review-user">${r.user}</span>
              <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
            </div>
            <p class="review-text">${r.text}</p>
            <p class="review-date">${r.date}</p>
          </div>
        `).join('')}
      </div>

      <!-- Review Form -->
      <div class="review-form" style="margin-top:14px;">
        <p style="font-size:13px;font-weight:600;margin-bottom:8px;">Deja tu reseña</p>
        <div class="star-picker" id="starPicker">
          ${[1,2,3,4,5].map(s => `<button class="star-btn" data-star="${s}" onclick="selectStar(${s})">☆</button>`).join('')}
        </div>
        <textarea class="review-textarea" id="reviewText" placeholder="Escribe tu opinión..." rows="3"></textarea>
        <button class="review-submit-btn" onclick="submitReview()">Publicar reseña</button>
      </div>
    </div>

    <!-- Más del creador -->
    <div class="detail-section animate-in" style="animation-delay:0.22s;padding-bottom:24px;">
      <h2 class="detail-section-title">Más contenido</h2>
      <div class="apps-grid" style="padding:0;">
        ${addonsData.filter(a => a.id !== addon.id).slice(0, 6).map(a => `
          <div class="app-card" onclick="window.location.href='view.html?id=${a.id}'">
            <div class="app-icon-wrap">
              <img src="${a.cover_image}" alt="${a.title}" class="app-icon" loading="lazy" onerror="this.src='./img/NEOCRAFT.png'">
            </div>
            <span class="app-name">${a.title}</span>
            <div class="app-meta"><span class="star">★</span><span>${a.file_size || ''}</span></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Star picker
let selectedStars = 0;
function selectStar(n) {
  selectedStars = n;
  document.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.textContent = i < n ? '★' : '☆';
    btn.classList.toggle('active', i < n);
  });
}

function submitReview() {
  const text = $('reviewText')?.value?.trim();
  if (!selectedStars) { showToast('Selecciona una valoración'); return; }
  if (!text) { showToast('Escribe un comentario'); return; }

  const list = $('reviewsList');
  if (list) {
    const card = document.createElement('div');
    card.className = 'review-card animate-in';
    card.innerHTML = `
      <div class="review-header">
        <div class="review-avatar" style="background:var(--accent);">T</div>
        <span class="review-user">Tú</span>
        <span class="review-stars">${'★'.repeat(selectedStars)}${'☆'.repeat(5-selectedStars)}</span>
      </div>
      <p class="review-text">${text}</p>
      <p class="review-date">ahora mismo</p>
    `;
    list.insertBefore(card, list.firstChild);
  }

  if ($('reviewText')) $('reviewText').value = '';
  selectedStars = 0;
  document.querySelectorAll('.star-btn').forEach(b => { b.textContent = '☆'; b.classList.remove('active'); });
  showToast('¡Reseña publicada!');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const addon = addonsData.find(a => a.id === id);

  if (addon) {
    currentAddon = addon;
    renderAddon(addon);
  } else {
    $('addonDetails').innerHTML = `
      <div style="padding:60px 20px;text-align:center;color:var(--text3);">
        <p style="font-size:48px;margin-bottom:12px;">😕</p>
        <p style="font-size:16px;margin-bottom:20px;">Contenido no encontrado</p>
        <a href="index.html" style="background:var(--accent);color:#fff;padding:10px 20px;border-radius:50px;text-decoration:none;font-weight:600;">Volver al inicio</a>
      </div>
    `;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeShareSheet();
});
