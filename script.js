// FG Car Oficina e Funilaria e Pintura - Scripts Principais & Lead Tracker

// Redirecionamento imediato de domínios provisórios (.pages.dev / .github.io) para o domínio oficial (evita duplicidade de indexação)
if (typeof window !== 'undefined' && (window.location.hostname.endsWith('.pages.dev') || window.location.hostname.endsWith('.github.io') || window.location.hostname === 'www.funilariaosasco.com.br')) {
    window.location.replace('https://funilariaosasco.com.br' + window.location.pathname + window.location.search + window.location.hash);
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile Toggle, Subbar & Smart Sticky Header
    initMobileNav();
    initMobileHeaderSubbar();
    initSmartStickyHeader();
    initServiceHeroBadges();
    initFgCarShuffle();

    // 2. Video Background Handling (Garante reprodução contínua e silenciosa)
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.play().catch(err => {
            console.log("Autoplay do vídeo prevenido pelo navegador:", err);
        });
    }

    // 3. Destacar Link Ativo no Menu ao Rolar a Página
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 4. Injeção e Controle do Modal Lead Gate (WhatsApp Popup)
    initLeadGateSystem();
});

// ==========================================================================
// MENU MOBILE & SUB-BARRA DE AVISO
// ==========================================================================

function initMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');

    if (mobileToggle && mobileDrawer) {
        // Assegura topbar com botão fechar se não existir
        if (!mobileDrawer.querySelector('.mobile-drawer-topbar')) {
            const topbarHtml = `
            <div class="mobile-drawer-topbar">
                <a href="/" class="mobile-drawer-brand" aria-label="FG Car - Início">
                    <img src="images/logo-fgcar.png" alt="FG Car Oficina" style="height: 40px; width: auto;">
                </a>
                <button type="button" class="mobile-drawer-close" id="mobileDrawerClose" aria-label="Fechar Menu">
                    ✕ Fechar
                </button>
            </div>`;
            mobileDrawer.insertAdjacentHTML('afterbegin', topbarHtml);
        }

        // Assegura respiro no final se não existir
        if (!mobileDrawer.querySelector('.mobile-drawer-spacer')) {
            mobileDrawer.insertAdjacentHTML('beforeend', '<div class="mobile-drawer-spacer"></div>');
        }

        // Assegura botão WhatsApp pequeno (apenas o ícone) no header fixo
        const headerActions = document.querySelector('.header-actions');
        if (headerActions && !headerActions.querySelector('.mobile-whatsapp-btn')) {
            const waBtnHtml = `
            <a href="https://wa.me/5511947727682?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20funilaria%20para%20o%20meu%20carro." class="mobile-whatsapp-btn" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
            </a>`;
            mobileToggle.insertAdjacentHTML('beforebegin', waBtnHtml);
        }

        function openDrawer() {
            document.body.classList.add('mobile-nav-active');
            mobileDrawer.classList.add('active');
            mobileDrawer.style.display = 'flex';
            mobileToggle.setAttribute('aria-expanded', 'true');
            mobileDrawer.scrollTop = 0;
        }

        function closeDrawer() {
            document.body.classList.remove('mobile-nav-active');
            mobileDrawer.classList.remove('active');
            mobileDrawer.style.display = 'none';
            mobileToggle.setAttribute('aria-expanded', 'false');
        }

        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = document.body.classList.contains('mobile-nav-active') || mobileDrawer.classList.contains('active');
            if (isOpen) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        // Fechar pelo botão Fechar (✕)
        const closeBtn = document.getElementById('mobileDrawerClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeDrawer();
            });
        }

        // Fechar ao clicar em qualquer link interno
        const mobileLinks = mobileDrawer.querySelectorAll('.mobile-link, a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeDrawer();
            });
        });

        // Fechar com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('mobile-nav-active')) {
                closeDrawer();
            }
        });
    }
}

function initMobileHeaderSubbar() {
    // Sub-barra mobile temporariamente desativada para teste visual limpo
    const mainHeader = document.querySelector('.main-header');
    if (!mainHeader) return;

    let subbar = document.querySelector('.mobile-subbar');
    if (subbar && mainHeader.contains(subbar)) {
        mainHeader.insertAdjacentElement('afterend', subbar);
    }
}

function initSmartStickyHeader() {
    const mainHeader = document.querySelector('.main-header');
    if (!mainHeader) return;

    let isScrolled = false;
    function onScroll() {
        const y = window.scrollY || window.pageYOffset || 0;
        if (!isScrolled && y > 48) {
            isScrolled = true;
            mainHeader.classList.add('fg-header-scrolled');
        } else if (isScrolled && y <= 12) {
            isScrolled = false;
            mainHeader.classList.remove('fg-header-scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initServiceHeroBadges() {
    // Garante que o card informativo nos banners de serviços fique posicionado abaixo da imagem
    document.querySelectorAll('.service-hero-media').forEach(media => {
        const wrap = media.querySelector('.service-hero-img-wrap');
        const badge = media.querySelector('.service-hero-badge-overlay');
        if (wrap && badge && wrap.contains(badge)) {
            wrap.insertAdjacentElement('afterend', badge);
        }
    });

    // Também garante que o badge na seção da Cabine da Home fique posicionado abaixo da imagem
    const cabinFrame = document.querySelector('.cabin-img-frame');
    if (cabinFrame) {
        const cabinBadge = cabinFrame.querySelector('.cabin-floating-badge');
        if (cabinBadge) {
            cabinFrame.insertAdjacentElement('afterend', cabinBadge);
        }
    }
}

// ==========================================================================
// SISTEMA DE CAPTURA DE LEADS & LEAD GATE (WHATSAPP POPUP)
// ==========================================================================

// Captura e persiste UTMs (ex: ?utm_source=google-business-profile) durante toda a sessão de navegação
(function captureTrafficSource() {
    try {
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get('utm_source') || params.get('origem');
        const utmMedium = params.get('utm_medium') || '';
        const utmCampaign = params.get('utm_campaign') || '';
        if (utmSource) {
            sessionStorage.setItem('fg_utm_source', utmSource);
            if (utmMedium) sessionStorage.setItem('fg_utm_medium', utmMedium);
            if (utmCampaign) sessionStorage.setItem('fg_utm_campaign', utmCampaign);
        } else if (!sessionStorage.getItem('fg_utm_source') && document.referrer) {
            if (document.referrer.includes('google.com/maps') || document.referrer.includes('maps.app.goo.gl')) {
                sessionStorage.setItem('fg_utm_source', 'google-maps-referrer');
            }
        }
    } catch (e) {}
})();

function getLeadChannelLabel() {
    try {
        const src = (sessionStorage.getItem('fg_utm_source') || '').toLowerCase();
        const camp = sessionStorage.getItem('fg_utm_campaign') || '';
        if (src.includes('google-business') || src.includes('gmn') || src.includes('perfil-empresa') || src.includes('meu-negocio') || src.includes('maps')) {
            return camp ? `📍 GMN (${camp})` : '📍 GMN (Perfil da Empresa)';
        }
        if (src) {
            return camp ? `🎯 ${src} (${camp})` : `🎯 ${src}`;
        }
    } catch (e) {}
    return 'WhatsApp Popup (Site Orgânico)';
}

function initLeadGateSystem() {
    // Cria o modal no DOM se não existir
    if (!document.getElementById('fgLeadModal')) {
        const modalHtml = `
        <div id="fgLeadModal" class="lead-modal-backdrop" aria-hidden="true" style="position: fixed; inset: 0; width: 100vw; height: 100vh; background: rgba(3, 7, 18, 0.88); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); z-index: 9999999; display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.3s ease, visibility 0.3s ease;">
            <div class="lead-modal-content" role="dialog" aria-modal="true" aria-labelledby="leadModalTitle" style="position: relative; background: #0f172a; border: 1px solid rgba(56, 189, 248, 0.45); box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95), 0 0 45px rgba(2, 132, 199, 0.3); border-radius: 22px; width: 100%; max-width: 460px; padding: 38px 32px 32px; color: #ffffff; margin: auto; box-sizing: border-box;">
                <button type="button" class="lead-modal-close" id="fgLeadModalClose" aria-label="Fechar Modal">&times;</button>
                <div class="lead-modal-header">
                    <span class="lead-modal-badge">⚡ Atendimento Imediato</span>
                    <h3 id="leadModalTitle">Fale Direto com a FG Car</h3>
                    <p>Informe seu nome e WhatsApp para agilizar sua estimativa e enviar fotos do veículo.</p>
                </div>
                <form id="fgLeadForm">
                    <div class="lead-form-group">
                        <label for="fgLeadNome">Seu Nome:</label>
                        <input type="text" id="fgLeadNome" placeholder="Digite seu nome completo..." required autocomplete="name">
                    </div>
                    <div class="lead-form-group">
                        <label for="fgLeadTelefone">Seu WhatsApp com DDD:</label>
                        <input type="tel" id="fgLeadTelefone" placeholder="(11) 99999-9999" required maxlength="15" autocomplete="tel">
                    </div>
                    <button type="submit" class="btn btn-primary lead-modal-submit" id="fgLeadSubmitBtn">
                        <span>⚡ Continuar para o WhatsApp ➔</span>
                    </button>
                    <span class="lead-modal-privacy">🔒 Dados protegidos pela LGPD. Uso exclusivo para seu orçamento. <a href="/politica-de-privacidade" target="_blank" style="color: #38bdf8; text-decoration: underline;">Política de Privacidade</a>.</span>
                </form>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const modal = document.getElementById('fgLeadModal');
    const closeBtn = document.getElementById('fgLeadModalClose');
    const leadForm = document.getElementById('fgLeadForm');
    const telInput = document.getElementById('fgLeadTelefone');

    // Máscara de telefone brasileiro (11) 99999-9999
    if (telInput) {
        telInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.substring(0, 11);
            if (v.length > 6) {
                e.target.value = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
            } else if (v.length > 2) {
                e.target.value = `(${v.substring(0, 2)}) ${v.substring(2)}`;
            } else if (v.length > 0) {
                e.target.value = `(${v}`;
            } else {
                e.target.value = '';
            }
        });
    }

    let pendingUrl = '';

    // Função para abrir o modal
    function openModal(destUrl) {
        pendingUrl = destUrl || 'https://wa.me/5511947727682';
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden'; // Trava rolagem de fundo
        setTimeout(() => {
            const nomeInput = document.getElementById('fgLeadNome');
            if (nomeInput) {
                nomeInput.focus({ preventScroll: true }); // Foca sem mover ou rolar a página
            }
        }, 150);
    }

    // Função para fechar o modal
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modal.style.pointerEvents = 'none';
        document.body.style.overflow = ''; // Restaura rolagem de fundo
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Interceptar cliques em links do WhatsApp
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
        if (link && !link.hasAttribute('data-no-modal')) {
            e.preventDefault();
            const href = link.getAttribute('href');
            openModal(href);
        }
    });

    // Submissão do formulário do modal
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('fgLeadNome').value.trim();
            const telefone = document.getElementById('fgLeadTelefone').value.trim();

            if (!nome || !telefone) return;

            const channelLabel = getLeadChannelLabel();
            const isGmn = channelLabel.includes('GMN');
            const pagePath = window.location.pathname || '/';

            // Salva o lead no sistema com identificação da UTM / GMN
            window.fgTrackLead({
                nome: nome,
                telefone: telefone,
                origem: isGmn ? `📍 GMN -> ${document.title || 'Site FG Car'}` : (document.title || 'Site FG Car'),
                pagina: isGmn ? `${pagePath} [GMN]` : pagePath,
                tipo: channelLabel
            });

            // Monta mensagem personalizada
            const customMsg = `Olá! Meu nome é ${nome} e vim pelo site da FG Car para solicitar um orçamento.`;
            const waTarget = `https://wa.me/5511947727682?text=${encodeURIComponent(customMsg)}`;

            closeModal();
            leadForm.reset();

            // Abre o WhatsApp oficial
            window.open(waTarget, '_blank');
        });
    }
}

// Webhook Central Oficial (Google Apps Script / Planilha de Leads FG Car)
window.FG_DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw_GPpVjP3810KNsqvgAY1pG3jYb9jh6nUcIZ8eDatWZ6pnTLG3TAXSKvYCVZHO1UtXQQ/exec';

// Função Global de Gravação de Leads
window.fgTrackLead = function(leadData) {
    const now = new Date();
    const lead = {
        id: 'lead_' + Date.now(),
        data: now.toLocaleDateString('pt-BR'),
        hora: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        nome: leadData.nome || 'Visitante',
        telefone: leadData.telefone || '',
        pagina: leadData.pagina || window.location.pathname || '/',
        origem: leadData.origem || document.title || 'FG Car Oficina',
        tipo: leadData.tipo || getLeadChannelLabel(),
        timestamp: Date.now()
    };

    // 1. Armazena localmente no navegador
    try {
        let leads = JSON.parse(localStorage.getItem('fg_leads') || '[]');
        leads.unshift(lead);
        localStorage.setItem('fg_leads', JSON.stringify(leads));
    } catch (err) {
        console.error('Erro ao salvar lead localmente:', err);
    }

    // 2. Dispara para o Webhook do Google Sheets (Oficial em Nuvem)
    const webhookUrl = localStorage.getItem('fg_webhook_url') || window.FG_DEFAULT_WEBHOOK_URL;
    if (webhookUrl) {
        try {
            fetch(webhookUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lead)
            }).catch(e => console.log('Webhook disparado.'));
        } catch (e) {
            // Silencioso em caso de rede offline
        }
    }

    return lead;
};

// ==========================================================================
// BARALHO FLUTUANTE DE IMAGENS (SHUFFLE STAGE)
// ==========================================================================
function initFgCarShuffle() {
    const stage = document.getElementById('shuffle-stage-fgcar');
    if (!stage) return;
    const cards = Array.from(stage.querySelectorAll('.fgcar-shuffle-card'));
    if (cards.length < 3) return;

    const positions = [
        { transform: 'translate(0, 0) scale(1) rotate(0deg)', z: 3, opacity: 1 },
        { transform: 'translate(20px, 14px) scale(0.95) rotate(5deg)', z: 1, opacity: 0.85 },
        { transform: 'translate(-18px, 12px) scale(0.97) rotate(-4.5deg)', z: 2, opacity: 0.92 }
    ];
    let order = [0, 1, 2];

    function applyPositions() {
        cards.forEach((card, i) => {
            const pos = positions[order[i]];
            card.style.transform = pos.transform;
            card.style.zIndex = pos.z;
            card.style.opacity = pos.opacity;
        });
    }

    applyPositions();
    let interval = setInterval(() => {
        order.unshift(order.pop());
        applyPositions();
    }, 3000);

    stage.addEventListener('mouseenter', () => clearInterval(interval));
    stage.addEventListener('mouseleave', () => {
        clearInterval(interval);
        interval = setInterval(() => {
            order.unshift(order.pop());
            applyPositions();
        }, 3000);
    });
}

