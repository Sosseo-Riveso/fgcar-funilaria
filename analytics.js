// ==========================================================================
// FG Car Oficina e Funilaria e Pintura — Consentimento de cookies (LGPD)
// Usado junto do bootstrap inline do Google Analytics 4 (G-716HE8LM4J) no <head>.
// Regras:
//  - A medição anônima (analytics_storage) já funciona por padrão, com IP
//    anonimizado, conforme o Consent Mode v2 definido no <head>.
//  - Os sinais de publicidade (ad_storage, ad_user_data, ad_personalization)
//    só são liberados após o aceite.
//  - Este arquivo NUNCA chama gtag('config') nem gtag('page_view'): apenas
//    um único gtag('consent', 'update', ...) por decisão do visitante.
// ==========================================================================

(function () {
    'use strict';

    var CONSENT_KEY = 'fgcar_cookie_consent';
    var BANNER_ID = 'fgCookieBanner';
    var SIGNALS = ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization'];

    var BANNER_HTML =
        '<div class="fg-cookie-banner__content">' +
            '<p class="fg-cookie-banner__title">Privacidade e cookies</p>' +
            '<p class="fg-cookie-banner__text">' +
                'Medimos os acessos de forma anônima por padrão (página visitada, origem do acesso, ' +
                'dispositivo e cidade aproximada, com IP anonimizado) para entender o desempenho do site. ' +
                'Cookies e sinais de publicidade só são liberados se você aceitar. Ao recusar, ' +
                'a medição analítica também é desativada. Saiba mais na ' +
                '<a href="/politica-de-privacidade">Política de Privacidade</a>.' +
            '</p>' +
        '</div>' +
        '<div class="fg-cookie-banner__actions">' +
            '<button type="button" class="fg-cookie-banner__btn fg-cookie-banner__btn--ghost" data-cookie-action="reject">Recusar / Só o essencial</button>' +
            '<button type="button" class="fg-cookie-banner__btn fg-cookie-banner__btn--primary" data-cookie-action="accept">Aceitar todos</button>' +
        '</div>';

    function getStoredConsent() {
        try {
            return window.localStorage.getItem(CONSENT_KEY);
        } catch (err) {
            return null;
        }
    }

    function storeConsent(value) {
        try {
            window.localStorage.setItem(CONSENT_KEY, value);
        } catch (err) {
            // Navegação privativa ou armazenamento bloqueado: a escolha vale só para esta sessão.
        }
    }

    // Um único update de consentimento, sem reconfigurar a propriedade e sem page_view.
    function updateConsent(state) {
        if (typeof window.gtag !== 'function') {
            return;
        }
        var payload = {};
        for (var i = 0; i < SIGNALS.length; i++) {
            payload[SIGNALS[i]] = state;
        }
        window.gtag('consent', 'update', payload);
    }

    function hideBanner() {
        var banner = document.getElementById(BANNER_ID);
        if (banner && banner.parentNode) {
            banner.parentNode.removeChild(banner);
        }
    }

    function showBanner() {
        if (document.getElementById(BANNER_ID) || !document.body) {
            return;
        }

        var banner = document.createElement('div');
        banner.id = BANNER_ID;
        banner.className = 'fg-cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Preferências de cookies');
        banner.innerHTML = BANNER_HTML;
        document.body.appendChild(banner);
    }

    function setConsent(value) {
        var granted = value === 'accepted';
        storeConsent(granted ? 'accepted' : 'denied');
        updateConsent(granted ? 'granted' : 'denied');
        hideBanner();
        try {
            document.dispatchEvent(new CustomEvent('fgcar:consent-change', {
                detail: { consent: granted ? 'accepted' : 'denied' }
            }));
        } catch (err) {
            // CustomEvent indisponível: decisão já registrada no localStorage.
        }
    }

    function onClick(event) {
        var target = event.target;
        if (!target || typeof target.closest !== 'function') {
            return;
        }

        var actionElement = target.closest('[data-cookie-action]');
        if (actionElement) {
            event.preventDefault();
            var action = actionElement.getAttribute('data-cookie-action');
            if (action === 'accept') {
                setConsent('accepted');
            } else if (action === 'reject') {
                setConsent('denied');
            } else if (action === 'preferences') {
                showBanner();
            }
            return;
        }

        if (target.closest('[data-cookie-preferences]')) {
            event.preventDefault();
            showBanner();
        }
    }

    function init() {
        document.addEventListener('click', onClick);
        if (!getStoredConsent()) {
            showBanner();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // API usada pela Política de Privacidade e pelos testes automatizados.
    window.FGCarConsent = {
        get: getStoredConsent,
        set: setConsent,
        open: showBanner,
        close: hideBanner
    };
})();
