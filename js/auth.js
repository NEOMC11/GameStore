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
        const inSubfolder = path.includes('/libpatch/') || path.includes('/mc_generator/');
        const loginUrl = inSubfolder ? '../login.html' : 'login.html';

        // Guardar a donde queria entrar para devolverlo ahi tras iniciar sesion
        const ref = inSubfolder ? path.split('/').slice(-2).join('/') : path.split('/').pop();

        window.location.href = loginUrl + '?ref=' + encodeURIComponent(ref || '');
    }

    // Ejecutar check si no estamos en la página de login
    if (!window.location.pathname.includes('login.html')) {
        checkAuth();
    }
})();
