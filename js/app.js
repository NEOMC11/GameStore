// =============================================
// GAMESTORE V2 — Lógica Principal
// =============================================

'use strict';

// Estado global
const state = {
  currentView: 'home',
  searchTerm: '',
  activeChip: 'Todos',
  chips: ['Todos','Apps','Texturas','Shaders','Maps','Addons']
};

// ===== Utilidades =====
function $(id) { return document.getElementById(id); }

function showToast(msg, duration = 2200) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

function setActiveNav(id) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const el = $(id);
  if (el) el.classList.add('active');
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToProfile() {
  window.location.href = 'profile.html';
}

// ===== Lazy Loading de imágenes =====
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const img = e.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imgObserver.unobserve(img);
      }
    }
  });
}, { rootMargin: '100px' });

function lazyImg(src, alt, cls, fallback = './img/NEOCRAFT.png') {
  return `<img data-src="${src}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" alt="${alt}" class="${cls}" loading="lazy" onerror="this.src='${fallback}'; this.onerror=null;">`;
}

function observeImages() {
  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

// ===== Chips =====
function renderChips(chips, active) {
  const c = $('chipsContainer');
  if (!c) return;
  c.innerHTML = chips.map(ch =>
    `<button class="chip ${ch === active ? 'active' : ''}" onclick="filterByChip('${ch}')">${ch}</button>`
  ).join('');
}

function filterByChip(chip) {
  state.activeChip = chip;
  state.searchTerm = '';
  const si = $('searchInput');
  if (si) si.value = '';
  const sc = $('searchClear');
  if (sc) sc.classList.remove('visible');
  renderChips(state.chips, chip);

  if (chip === 'Todos') renderAppsGrid(addonsData);
  else if (chip === 'Apps') renderAppsGrid(addonsData.filter(a => a.tags.some(t => ['App'].includes(t))));
  else if (chip === 'Texturas') renderAppsGrid(addonsData.filter(a => a.tags.some(t => ['Texturas','Textura'].includes(t))));
  else if (chip === 'Shaders') renderAppsGrid(addonsData.filter(a => a.tags.includes('Shaders')));
  else if (chip === 'Maps') renderAppsGrid(addonsData.filter(a => a.tags.includes('Maps')));
  else if (chip === 'Addons') renderAppsGrid(addonsData.filter(a => a.tags.includes('Addon')));
}

// ===== Render Apps Grid =====
function renderAppsGrid(data, container = null) {
  const c = container || $('mainContent');
  if (!c) return;

  if (data.length === 0) {
    c.innerHTML = `
      <div class="apps-grid">
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <p>No se encontraron resultados</p>
        </div>
      </div>`;
    return;
  }

  const html = `
    <div class="section-header">
      <span class="section-title">${state.activeChip === 'Todos' ? 'Todo el contenido' : state.activeChip}</span>
      <span class="section-count">${data.length} items</span>
    </div>
    <div class="apps-grid">
      ${data.map((a, i) => `
        <div class="app-card animate-in" style="animation-delay:${Math.min(i * 0.04, 0.4)}s" onclick="viewAddon(${a.id})" role="button" tabindex="0" aria-label="${a.title}">
          <div class="app-icon-wrap">
            ${lazyImg(a.cover_image, a.title, 'app-icon')}
            ${a.featured ? '<span class="app-badge">NEW</span>' : ''}
          </div>
          <span class="app-name">${a.title}</span>
          <div class="app-meta">
            <span class="star">★</span>
            <span>${a.file_size || ''}</span>
          </div>
        </div>
      `).join('')}
    </div>`;

  c.innerHTML = html;
  observeImages();
}

// ===== Render Home =====
function renderHome() {
  const c = $('mainContent');
  if (!c) return;

  const featured = addonsData.filter(a => a.featured);
  const recent = [...addonsData].sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated)).slice(0, 6);
  const allApps = addonsData.filter(a => a.tags.includes('App')).slice(0, 9);

  c.innerHTML = `
    <!-- Hero Banner -->
    <div class="hero-banner" onclick="viewAddon(${featured[0]?.id || 53})" style="background:linear-gradient(135deg,#1a0a3a 0%,#0a1a4a 50%,#0a2a2a 100%);">
      <div class="hero-banner-inner">
        <span class="hero-badge">Destacado</span>
        <h2 class="hero-title">${featured[0]?.title || 'Crafting and Building X'}</h2>
        <p class="hero-sub">${(featured[0]?.description || '').substring(0, 60)}...</p>
        <button class="hero-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Descargar
        </button>
      </div>
      ${lazyImg(featured[0]?.cover_image || './img/craftsman-ab.jpg', 'Featured', 'hero-img')}
    </div>

    <!-- Recientes -->
    <div class="section-header">
      <span class="section-title">Recién añadidos</span>
      <span class="section-count">Ver todos</span>
    </div>
    <div class="apps-grid">
      ${recent.map((a, i) => `
        <div class="app-card animate-in" style="animation-delay:${i * 0.05}s" onclick="viewAddon(${a.id})">
          <div class="app-icon-wrap">
            ${lazyImg(a.cover_image, a.title, 'app-icon')}
          </div>
          <span class="app-name">${a.title}</span>
          <div class="app-meta"><span class="star">★</span><span>${a.file_size || ''}</span></div>
        </div>
      `).join('')}
    </div>

    <!-- Apps populares -->
    <div class="section-header" style="margin-top:8px;">
      <span class="section-title">Apps populares</span>
      <span class="section-count" onclick="showApps()" style="cursor:pointer;color:var(--accent2);">Ver más</span>
    </div>
    <div class="apps-grid">
      ${allApps.map((a, i) => `
        <div class="app-card animate-in" style="animation-delay:${i * 0.04}s" onclick="viewAddon(${a.id})">
          <div class="app-icon-wrap">
            ${lazyImg(a.cover_image, a.title, 'app-icon')}
          </div>
          <span class="app-name">${a.title}</span>
          <div class="app-meta"><span class="star">★</span><span>${a.file_size || ''}</span></div>
        </div>
      `).join('')}
    </div>
  `;
  observeImages();
}

// ===== Render Videos =====
function renderVideos() {
  const c = $('mainContent');
  if (!c) return;

  c.innerHTML = `
    <div class="section-header">
      <span class="section-title">Videos</span>
      <span class="section-count">${videosData.length} videos</span>
    </div>
    <div class="video-list">
      ${videosData.map((v, i) => `
        <div class="video-card animate-in" style="animation-delay:${i * 0.07}s" onclick="openVideo('${v.id}')">
          <div class="video-thumb-wrap">
            ${lazyImg(v.thumbnail, v.title, 'video-thumb')}
            <div class="video-play-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div class="video-info">
            <img src="./img/profile/NEOMC11.png" alt="NEOMC11" class="video-channel-icon" onerror="this.src='./img/NEOCRAFT.png'">
            <div class="video-text">
              <h3 class="video-title">${v.title}</h3>
              <p class="video-meta">NEOMC11 · GameStore</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  observeImages();
}

// ===== Abrir Video =====
function openVideo(videoId) {
  const v = videosData.find(x => x.id === videoId);
  if (!v) return;

  let embedUrl = v.url;
  if (embedUrl.includes('youtu.be/')) embedUrl = embedUrl.replace('youtu.be/', 'www.youtube.com/embed/');
  else if (embedUrl.includes('watch?v=')) embedUrl = embedUrl.replace('watch?v=', 'embed/');

  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal-header">
      <button class="video-modal-close" onclick="closeVideoModal()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <span class="video-modal-title">${v.title}</span>
    </div>
    <div class="video-frame-wrap">
      <iframe src="${embedUrl}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
    </div>
    <div class="video-modal-body">
      <p class="video-modal-desc">${v.description}</p>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideoModal();
  });
}

function closeVideoModal() {
  const m = document.querySelector('.video-modal');
  if (m) { m.remove(); document.body.style.overflow = ''; }
}

// ===== Navegación =====
function showHome() {
  state.currentView = 'home';
  state.activeChip = 'Todos';
  setActiveNav('nav-home');
  renderChips(state.chips, 'Todos');
  renderHome();
  scrollToTop();
}

function showApps() {
  state.currentView = 'apps';
  state.activeChip = 'Todos';
  setActiveNav('nav-apps');
  renderChips(state.chips, 'Todos');
  renderAppsGrid(addonsData);
  scrollToTop();
}

function showVideos() {
  state.currentView = 'videos';
  setActiveNav('nav-videos');
  renderChips([], '');
  $('chipsWrap').style.display = 'none';
  renderVideos();
  scrollToTop();
}

function viewAddon(id) {
  window.location.href = `view.html?id=${id}`;
}

// ===== Búsqueda =====
function initSearch() {
  const input = $('searchInput');
  const clearBtn = $('searchClear');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const term = e.target.value.trim();
    state.searchTerm = term;

    if (term) {
      clearBtn?.classList.add('visible');
      const results = addonsData.filter(a =>
        a.title.toLowerCase().includes(term.toLowerCase()) ||
        a.description.toLowerCase().includes(term.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(term.toLowerCase()))
      );
      state.activeChip = 'Todos';
      renderChips(state.chips, 'Todos');
      $('chipsWrap').style.display = '';
      setActiveNav('nav-apps');
      renderAppsGrid(results);
    } else {
      clearBtn?.classList.remove('visible');
      showHome();
    }
  });
}

function clearSearch() {
  const input = $('searchInput');
  if (input) input.value = '';
  $('searchClear')?.classList.remove('visible');
  state.searchTerm = '';
  showHome();
}

// ===== Share Sheet (desde index) =====
function closeShareSheet() {
  const s = document.querySelector('.share-sheet');
  if (s) { s.style.display = 'none'; document.body.style.overflow = ''; }
}

// ===== Teclado =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeVideoModal();
    closeShareSheet();
  }
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderChips(state.chips, 'Todos');
  renderHome();
  initSearch();

  // Marcar nav de perfil con dot
  const navProfile = $('nav-profile');
  if (navProfile) navProfile.classList.add('has-dot');
});
