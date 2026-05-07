/**
 * Sistema de Autenticación para GameStore Suite
 * Usuario: NEO
 * Contraseña: gaelzule
 */

(function() {
    // Credenciales "encriptadas" (Base64)
    const _u = "TkVP"; // NEO
    const _p = "Z2FlbHp1bGU="; // gaelzule

    function checkAuth() {
        const auth = localStorage.getItem('gamestore_auth');
        if (!auth) {
            redirectToLogin();
            return;
        }

        try {
            const decoded = JSON.parse(atob(auth));
            if (decoded.user !== atob(_u) || decoded.pass !== atob(_p)) {
                redirectToLogin();
            }
        } catch (e) {
            redirectToLogin();
        }
    }

    function redirectToLogin() {
        // Determinar la ruta al login dependiendo de dónde estemos
        const path = window.location.pathname;
        let loginUrl = 'login.html';
        
        if (path.includes('/libpatch/') || path.includes('/mc_generator/')) {
            loginUrl = '../login.html';
        }
        
        window.location.href = loginUrl;
    }

    // Ejecutar check si no estamos en la página de login
    if (!window.location.pathname.includes('login.html')) {
        checkAuth();
    }
})();
