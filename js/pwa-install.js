let deferredPrompt;
  let isAppInstalled = false;
  
  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('✅ Service Worker registrado:', registration.scope);
        })
        .catch(error => {
          console.log('❌ Error al registrar Service Worker:', error);
        });
    });
  }
  
  // Verificar si la app ya está instalada
  function checkIfInstalled() {
    // Para Android/Chrome
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isAppInstalled = true;
      return true;
    }
    
    // Para iOS
    if (window.navigator.standalone === true) {
      isAppInstalled = true;
      return true;
    }
    
    // Verificar en localStorage si el usuario instaló previamente
    if (localStorage.getItem('pwa-installed') === 'true') {
      isAppInstalled = true;
      return true;
    }
    
    return false;
  }
  
  // Mostrar/Ocultar botón de instalación
  function toggleInstallButton(show) {
    const installContainer = document.getElementById('installContainer');
    if (installContainer) {
      if (show && !isAppInstalled) {
        setTimeout(() => {
          installContainer.classList.add('show');
        }, 1000); // Mostrar después de 1 segundo
      } else {
        installContainer.classList.remove('show');
      }
    }
  }
  
  // Evento: capturar el prompt de instalación
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('💡 Evento beforeinstallprompt capturado');
    
    if (!checkIfInstalled()) {
      toggleInstallButton(true);
    }
  });
  
  // Detectar cuando la app fue instalada
  window.addEventListener('appinstalled', () => {
    console.log('✅ PWA instalada exitosamente');
    isAppInstalled = true;
    localStorage.setItem('pwa-installed', 'true');
    toggleInstallButton(false);
    deferredPrompt = null;
    
    // Mostrar mensaje de éxito
    showNotification('¡App instalada correctamente! 🎉', 'success');
  });
  
  // Manejar clic en el botón de instalación
  document.addEventListener('DOMContentLoaded', () => {
    const installButton = document.getElementById('installButton');
    const closeInstall = document.getElementById('closeInstall');
    
    if (installButton) {
      installButton.addEventListener('click', async () => {
        if (!deferredPrompt) {
          console.log('❌ No hay prompt de instalación disponible');
          
          // Instrucciones para iOS
          if (isIOSDevice()) {
            showIOSInstructions();
          } else {
            showNotification('La app ya está instalada o no está disponible para instalar', 'info');
          }
          return;
        }
        
        // Mostrar el prompt de instalación
        deferredPrompt.prompt();
        
        // Esperar la respuesta del usuario
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Usuario respondió: ${outcome}`);
        
        if (outcome === 'accepted') {
          console.log('✅ Usuario aceptó la instalación');
          localStorage.setItem('pwa-installed', 'true');
        } else {
          console.log('❌ Usuario rechazó la instalación');
        }
        
        deferredPrompt = null;
        toggleInstallButton(false);
      });
    }
    
    // Cerrar el botón de instalación
    if (closeInstall) {
      closeInstall.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleInstallButton(false);
        localStorage.setItem('pwa-dismissed', 'true');
        
        // Volver a mostrar después de 24 horas
        setTimeout(() => {
          localStorage.removeItem('pwa-dismissed');
        }, 86400000); // 24 horas
      });
    }
    
    // Verificar si está instalada al cargar
    if (!checkIfInstalled() && !localStorage.getItem('pwa-dismissed')) {
      // Esperar a que se capture el evento beforeinstallprompt
      setTimeout(() => {
        if (deferredPrompt) {
          toggleInstallButton(true);
        }
      }, 2000);
    }
  });
  
  // Detectar si es dispositivo iOS
  function isIOSDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  
  // Mostrar instrucciones para iOS
  function showIOSInstructions() {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 1rem;
    `;
    
    modal.innerHTML = `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 20px; max-width: 400px; color: white; text-align: center;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem;">Instalar en iOS</h3>
        <p style="margin: 0 0 1rem 0; line-height: 1.6;">
          Para instalar esta app en iOS:
        </p>
        <ol style="text-align: left; margin: 0 0 1.5rem 0; line-height: 2;">
          <li>Toca el botón de compartir <strong>⎙</strong></li>
          <li>Desplázate y selecciona <strong>"Agregar a pantalla de inicio"</strong></li>
          <li>Toca <strong>"Agregar"</strong></li>
        </ol>
        <button onclick="this.parentElement.parentElement.remove()" style="background: white; color: #667eea; border: none; padding: 0.8rem 2rem; border-radius: 50px; font-weight: 600; cursor: pointer; font-size: 1rem;">
          Entendido
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }
  
  // Mostrar notificaciones
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: ${colors[type]};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10001;
      animation: slideIn 0.3s ease;
      max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  console.log('🚀 PWA Install System cargado correctamente');