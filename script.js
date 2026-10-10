// FG Car Oficina e Funilaria e Pintura - Scripts Principais & Lead Tracker

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile Toggle & Subbar
    initMobileNav();
    initMobileHeaderSubbar();

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
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileDrawer.classList.contains('active') || mobileDrawer.style.display === 'block';
            if (isOpen) {
                mobileDrawer.classList.remove('active');
                mobileDrawer.style.display = 'none';
                mobileToggle.setAttribute('aria-expanded', 'false');
            } else {
                mobileDrawer.classList.add('active');
                mobileDrawer.style.display = 'block';
                mobileToggle.setAttribute('aria-expanded', 'true');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('active');
                mobileDrawer.style.display = 'none';
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileDrawer.classList.remove('active');
                mobileDrawer.style.display = 'none';
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function initMobileHeaderSubbar() {
    const mainHeader = document.querySelector('.main-header');
    if (!mainHeader) return;

    if (!mainHeader.querySelector('.mobile-subbar')) {
        const subbarHtml = `
        <div class="mobile-subbar">
            <div class="container mobile-subbar-container">
                <p class="mobile-subbar-text">
                    <strong>Bateu ou arranhou o carro em Osasco e Região?</strong>
                    Envie as fotos no WhatsApp para uma estimativa rápida!
                </p>
                <div class="mobile-subbar-btn-wrap">
                    <a href="https://wa.me/5511940047324?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20funilaria%20para%20o%20meu%20carro." class="btn btn-primary btn-mobile-whatsapp" target="_blank" rel="noopener">
                        <span>⚡ WhatsApp Orçamento</span>
                    </a>
                </div>
            </div>
        </div>`;
        const headerContainer = mainHeader.querySelector('.header-container');
        if (headerContainer) {
            headerContainer.insertAdjacentHTML('afterend', subbarHtml);
        } else {
            mainHeader.insertAdjacentHTML('beforeend', subbarHtml);
        }
    }
}

// ==========================================================================
// SISTEMA DE CAPTURA DE LEADS & LEAD GATE (WHATSAPP POPUP)
// ==========================================================================

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
                    <span class="lead-modal-privacy">🔒 Seus dados estão seguros e não serão compartilhados.</span>
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
        pendingUrl = destUrl || 'https://wa.me/5511940047324';
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

            // Salva o lead no sistema
            window.fgTrackLead({
                nome: nome,
                telefone: telefone,
                origem: document.title || 'Site FG Car',
                pagina: window.location.pathname || '/',
                tipo: 'WhatsApp Popup'
            });

            // Monta mensagem personalizada
            const customMsg = `Olá! Meu nome é ${nome} e vim pelo site da FG Car para solicitar um orçamento.`;
            const waTarget = `https://wa.me/5511940047324?text=${encodeURIComponent(customMsg)}`;

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
        tipo: leadData.tipo || 'Geral',
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
