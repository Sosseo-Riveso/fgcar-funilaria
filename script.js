// FG Car Oficina e Funilaria e Pintura - Scripts Leves

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
});
