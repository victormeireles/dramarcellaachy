// ===== INICIALIZAÇÃO ===== 
document.addEventListener('DOMContentLoaded', function() {
    // Garantir visibilidade dos elementos primeiro
    ensureButtonVisibility();
    ensureWhatsAppButtonVisibility();
    
    // Inicializar todas as funcionalidades
    initNavbar();
    initHeroAnimations();
    initScrollAnimations();
    initCarousel();
    initCounters();
    initSmoothScroll();
    initParallax();
    initPreloader();
    initWhatsAppLinks();
    
    // Verificação adicional após 1 segundo
    setTimeout(() => {
        ensureButtonVisibility();
        console.log('Verificação adicional de visibilidade executada');
    }, 1000);
    
    // Verificação final após 3 segundos
    setTimeout(() => {
        ensureButtonVisibility();
        ensureWhatsAppButtonVisibility();
        console.log('Verificação final de visibilidade executada');
    }, 3000);
});

// ===== GARANTIR VISIBILIDADE DOS ELEMENTOS =====
function ensureButtonVisibility() {
    // Tornar TODOS os elementos da hero visíveis
    const heroElements = [
        '.hero-content-left',
        '.hero-image-container', 
        '.hero-image-frame',
        '.hero-image',
        '.hero-cta-main',
        '.btn-hero-primary',
        '.hero-badge-top',
        '.hero-crm-badge', 
        '.hero-title-large',
        '.hero-description',
        '.hero-location',
        '.hero-doctor-info',
        '.doctor-logo',
        '.logo-initials',
        '.doctor-name',
        '.doctor-specialty',
        '.hero-crm-mobile'
    ];
    
    heroElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.transform = 'none';
                el.style.display = selector.includes('btn-hero-primary') ? 'inline-block' : 
                                  selector.includes('hero-image-container') ? 'flex' : 'block';
                
                // Remover atributos AOS
                el.removeAttribute('data-aos');
                el.removeAttribute('data-aos-delay');
                el.removeAttribute('data-aos-duration');
            }
        });
    });
    
    // Verificar se a imagem carregou
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.onerror = function() {
            console.log('Erro ao carregar imagem:', this.src);
            // Tentar imagem alternativa
            this.src = 'assets/dra-marcella-achy.jpeg';
        };
        
        heroImage.onload = function() {
            console.log('Imagem carregada com sucesso:', this.src);
            this.style.opacity = '1';
            this.style.visibility = 'visible';
        };
    }
}

// ===== GARANTIR VISIBILIDADE DO BOTÃO WHATSAPP =====
function ensureWhatsAppButtonVisibility() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (whatsappFloat) {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.visibility = 'visible';
        whatsappFloat.style.display = 'block';
    }
    
    if (whatsappBtn) {
        whatsappBtn.style.opacity = '1';
        whatsappBtn.style.visibility = 'visible';
        whatsappBtn.style.display = 'flex';
    }
}

// ===== NAVEGAÇÃO INTELIGENTE =====
function initNavbar() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect na navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlight
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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

// ===== ANIMAÇÕES DO HERO =====
function initHeroAnimations() {
    // Garantir que TODOS os elementos sejam visíveis primeiro
    gsap.set([
        '.hero-content-left', 
        '.hero-image-container', 
        '.hero-image-frame', 
        '.hero-image',
        '.btn-hero-primary',
        '.hero-cta-main',
        '.hero-badge-top',
        '.hero-crm-badge',
        '.hero-title-large',
        '.hero-description',
        '.hero-location'
    ], {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        x: 0,
        scale: 1,
        clearProps: "all"
    });
    
    // Forçar visibilidade com CSS também
    const elements = document.querySelectorAll('.hero-content-left, .hero-image-container, .hero-image-frame, .hero-image, .btn-hero-primary, .hero-cta-main');
    elements.forEach(el => {
        if (el) {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.display = el.classList.contains('btn-hero-primary') ? 'inline-block' : (el.classList.contains('hero-image-container') ? 'flex' : 'block');
            el.style.transform = 'none';
        }
    });
    
    // Animação suave opcional (desabilitada para garantir visibilidade)
    /*
    const heroContent = document.querySelector('.hero-content-left');
    if (heroContent) {
        const tl = gsap.timeline({ delay: 0.5 });
        // Animações comentadas para garantir visibilidade
    }
    */
    
    // Parallax do vídeo de fundo (mantido)
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        gsap.to(heroVideo, {
            scale: 1.1,
            scrollTrigger: {
                trigger: '.hero-section',
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }
}

// ===== ANIMAÇÕES DE SCROLL =====
function initScrollAnimations() {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
    
    // GSAP ScrollTrigger para animações mais avançadas
    gsap.registerPlugin(ScrollTrigger);
    
    // Registrar plugin ScrollTo se disponível
    if (typeof ScrollToPlugin !== 'undefined') {
        gsap.registerPlugin(ScrollToPlugin);
    }
    
    // Animação dos cards de procedimentos
    gsap.utils.toArray('.procedure-card').forEach((card, index) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Animação da seção sobre
    gsap.from('.about-image-grid', {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.about-section',
            start: "top 70%"
        }
    });
    
    // Animação de progresso das features
    gsap.utils.toArray('.feature-item').forEach((feature, index) => {
        gsap.from(feature, {
            x: -50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: feature,
                start: "top 85%"
            }
        });
    });
}

// ===== CARROSSEL DE RESULTADOS =====
function initCarousel() {
    const resultsCarousel = new Swiper('.results-carousel', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
        effect: 'slide',
        speed: 800,
        centeredSlides: false,
        watchOverflow: true,
    });
    
    // Adicionar efeito de hover personalizado
    document.querySelectorAll('.result-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.result-image'), {
                scale: 1.1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.result-image'), {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
}

// ===== CONTADORES ANIMADOS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function para suavidade
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (range * easeOut));
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(update);
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const targetPosition = target.offsetTop - 80;
                const currentPosition = window.pageYOffset;
                const distance = Math.abs(targetPosition - currentPosition);
                
                // Ajustar duração baseada na distância
                let duration = Math.min(0.6, Math.max(0.3, distance / 2000));
                
                // Fallback para scroll nativo se GSAP não estiver disponível
                if (typeof gsap !== 'undefined' && gsap.to) {
                    gsap.to(window, {
                        duration: duration,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: "power2.out"
                    });
                } else {
                    // Scroll nativo como fallback
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== EFEITO PARALLAX =====
function initParallax() {
    // Parallax para elementos flutuantes
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        gsap.to(element, {
            y: -100,
            x: 50 * (index % 2 === 0 ? 1 : -1),
            rotation: 360,
            scrollTrigger: {
                trigger: '.hero-section',
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            }
        });
    });
    
    // Parallax para seções
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0.8,
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                end: "top 30%",
                scrub: 1
            }
        });
    });
}

// ===== PRELOADER =====
function initPreloader() {
    // Criar preloader dinâmico
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <span>Dra. Marcella Achy</span>
            </div>
            <div class="preloader-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
        </div>
    `;
    
    // Adicionar estilos do preloader
    const preloaderStyles = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #F5F2ED 0%, #E8E2D5 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
            overflow: hidden;
        }
        
        .preloader-content {
            text-align: center;
            padding: 0 1rem;
            max-width: 90vw;
        }
        
        .preloader-logo {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 600;
            color: #D4A574;
            margin-bottom: 2rem;
            word-break: break-word;
        }
        
        .preloader-spinner {
            position: relative;
            width: 60px;
            height: 60px;
            margin: 0 auto;
        }
        
        .spinner-ring {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 3px solid transparent;
            border-top-color: #D4A574;
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
        }
        
        .spinner-ring:nth-child(2) {
            animation-delay: 0.3s;
            border-top-color: #B8935F;
        }
        
        .spinner-ring:nth-child(3) {
            animation-delay: 0.6s;
            border-top-color: #8B4513;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        
        @media (max-width: 768px) {
            .preloader-logo {
                font-size: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .preloader-spinner {
                width: 50px;
                height: 50px;
            }
        }
        
        @media (max-width: 576px) {
            .preloader-logo {
                font-size: 1.3rem;
                margin-bottom: 1rem;
            }
            
            .preloader-spinner {
                width: 40px;
                height: 40px;
            }
        }
    `;
    
    // Adicionar estilos ao head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = preloaderStyles;
    document.head.appendChild(styleSheet);
    
    // Adicionar preloader ao body
    document.body.appendChild(preloader);
    
    // Remover preloader após carregamento
    window.addEventListener('load', function() {
        setTimeout(() => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    preloader.remove();
                    document.body.classList.add('loaded');
                    
                    // Trigger das animações iniciais
                    initInitialAnimations();
                }
            });
        }, 1000);
    });
}

// ===== ANIMAÇÕES INICIAIS =====
function initInitialAnimations() {
    // Animação de entrada da navbar
    gsap.from('.navbar', {
        y: -100,
        duration: 0.8,
        ease: "power3.out"
    });
    
    // Revelar conteúdo gradualmente
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 0.3
    });
}

// ===== EFEITOS INTERATIVOS =====
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de hover nos botões
    document.querySelectorAll('.btn-primary-glow').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Efeito de hover nos cards de procedimentos
    document.querySelectorAll('.procedure-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                boxShadow: "0 30px 80px rgba(212, 165, 116, 0.25)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                boxShadow: "0 10px 40px rgba(212, 165, 116, 0.15)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Efeito magnético no cursor (para dispositivos com mouse)
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorStyles = `
            .custom-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                background: rgba(212, 165, 116, 0.5);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                mix-blend-mode: difference;
            }
        `;
        
        const cursorStyleSheet = document.createElement('style');
        cursorStyleSheet.textContent = cursorStyles;
        document.head.appendChild(cursorStyleSheet);
        
        document.addEventListener('mousemove', function(e) {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1
            });
        });
        
        // Aumentar cursor em elementos interativos
        document.querySelectorAll('a, button, .procedure-card, .result-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 2,
                    duration: 0.2
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.2
                });
            });
        });
    }
});

// ===== LAZY LOADING DE IMAGENS =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce resize events
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===== OTIMIZAÇÕES DE ACESSIBILIDADE =====
document.addEventListener('DOMContentLoaded', function() {
    // Verificar preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Desabilitar animações complexas
        gsap.globalTimeline.clear();
        AOS.init({
            disable: true
        });
    }
    
    // Suporte a navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});

// ===== WHATSAPP LINKS MOBILE =====
function initWhatsAppLinks() {
    // Detectar se é mobile por tamanho de tela ou user agent
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // URLs do WhatsApp
    const whatsappWeb = 'https://web.whatsapp.com/send?phone=5519978256532';
    const whatsappMobile = 'https://api.whatsapp.com/send?phone=5519978256532';
    
    // Função para atualizar os links
    function updateWhatsAppLinks() {
        const currentUrl = isMobile() ? whatsappMobile : whatsappWeb;
        
        // Buscar todos os links que contêm WhatsApp, incluindo o botão flutuante e CTAs das seções
        const whatsappLinks = document.querySelectorAll('a[href*="whatsapp.com"], a[href*="send?phone=5519978256532"], .whatsapp-btn, .btn-section-cta');
        
        whatsappLinks.forEach(link => {
            link.href = currentUrl;
            
            // Adicionar target="_blank" se não existir
            if (!link.hasAttribute('target')) {
                link.target = '_blank';
            }
            
            // Adicionar rel="noopener noreferrer" para segurança
            link.rel = 'noopener noreferrer';
        });
        
        console.log(`WhatsApp links atualizados para: ${isMobile() ? 'Mobile' : 'Web'}`);
    }
    
    // Atualizar links na inicialização
    updateWhatsAppLinks();
    
    // Monitorar mudanças no tamanho da tela
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateWhatsAppLinks, 250);
    });
    
    // Monitorar orientação do dispositivo (mobile)
    window.addEventListener('orientationchange', function() {
        setTimeout(updateWhatsAppLinks, 500);
    });
    
    // Observer para novos elementos (caso sejam adicionados dinamicamente)
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            let shouldUpdate = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            const hasWhatsAppLink = node.querySelector && node.querySelector('a[href*="whatsapp.com"], a[href*="send?phone=5519978256532"]');
                            if (hasWhatsAppLink || (node.tagName === 'A' && node.href && node.href.includes('whatsapp.com'))) {
                                shouldUpdate = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldUpdate) {
                setTimeout(updateWhatsAppLinks, 100);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// ===== ANALYTICS E TRACKING =====
function trackEvent(eventName, parameters = {}) {
    // Placeholder para analytics (Google Analytics, Facebook Pixel, etc.)
    console.log('Event tracked:', eventName, parameters);
    
    // Exemplo de implementação com Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
} 