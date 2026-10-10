// FG Car Oficina e Funilaria e Pintura - Scripts Principais & Lead Tracker

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            const isVisible = mobileDrawer.style.display === 'block';
            mobileDrawer.style.display = isVisible ? 'none' : 'block';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.style.display = 'none';
            });
        });
    }

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
// SISTEMA DE CAPTURA DE LEADS & LEAD GATE (WHATSAPP POPUP)
// ==========================================================================

function initLeadGateSystem() {
    // Cria o modal no DOM se não existir
    if (!document.getElementById('fgLeadModal')) {
        const modalHtml = `
        <div id="fgLeadModal" class="lead-modal-backdrop" aria-hidden="true">
            <div class="lead-modal-content" role="dialog" aria-modal="true" aria-labelledby="leadModalTitle">
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
        setTimeout(() => {
            const nomeInput = document.getElementById('fgLeadNome');
            if (nomeInput) nomeInput.focus();
        }, 150);
    }

    // Função para fechar o modal
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
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
