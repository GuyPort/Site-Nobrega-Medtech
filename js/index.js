/**
 * Scripts Principais - Nobrega Medtech
 * - Gerenciador de Carrossel
 * - Animação de Entrada do Hero
 * - Otimização de Performance de Imagens
 * @version 5.0 - Otimização de Performance
 */

// Classes CSS usadas
const CLS_BANNER_ACTIVE = 'is-active';
const CLS_BANNER_VISIBLE = 'is-visible';
const CLS_BANNER_EXITING = 'is-exiting';
const CLS_BANNER_ANIMADO = 'animado';

// Otimização de carregamento de imagens
const otimizarImagens = () => {
  // Preload de imagens críticas (acima da dobra)
  const imagensCriticas = [
    'assets/imagens/logo-nobrega-medtech.svg'
  ];
  
  imagensCriticas.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Lazy loading avançado para imagens não críticas
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observar imagens com data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Carrossel principal
const initCarrossel = () => {
  const banner = document.querySelector('.banner');
  if (!banner) return;
  const slides = banner.querySelectorAll('.banner__slide');
  const dots = banner.querySelectorAll('.banner__dot');
  const slideIntervalTime = 7000;
  let currentSlide = 0;
  let slideInterval;
  if (slides.length <= 1) {
    if (slides.length === 1) {
      const firstSlide = slides[0];
      firstSlide.classList.add(CLS_BANNER_ACTIVE);
      const titulo = firstSlide.querySelector('.banner__titulo');
      const texto = firstSlide.querySelector('.banner__texto');
      const botao = firstSlide.querySelector('.banner__botao');
      if (titulo && texto && botao) {
        setTimeout(() => {
          titulo.classList.add(CLS_BANNER_VISIBLE);
          texto.classList.add(CLS_BANNER_VISIBLE);
          botao.classList.add(CLS_BANNER_VISIBLE);
        }, 200);
      }
    }
    const navDots = banner.querySelector('.banner__nav-dots');
    if (navDots) navDots.remove();
    return;
  }
  const goToSlide = (slideIndex) => {
    if (!slides[currentSlide]) return;
    const oldSlide = slides[currentSlide];
    const oldTitulo = oldSlide.querySelector('.banner__titulo');
    const oldTexto = oldSlide.querySelector('.banner__texto');
    const oldBotao = oldSlide.querySelector('.banner__botao');
    [oldTitulo, oldTexto, oldBotao].forEach(el => {
      if (el) el.classList.add(CLS_BANNER_EXITING);
      if (el) el.classList.remove(CLS_BANNER_VISIBLE);
    });
    oldSlide.classList.remove(CLS_BANNER_ACTIVE);
    if (dots[currentSlide]) dots[currentSlide].classList.remove(CLS_BANNER_ACTIVE);
    currentSlide = slideIndex;
    const newSlide = slides[currentSlide];
    const newTitulo = newSlide.querySelector('.banner__titulo');
    const newTexto = newSlide.querySelector('.banner__texto');
    const newBotao = newSlide.querySelector('.banner__botao');
    setTimeout(() => {
      [oldTitulo, oldTexto, oldBotao].forEach(el => { if (el) el.classList.remove(CLS_BANNER_EXITING); });
    }, 600);
    newSlide.classList.add(CLS_BANNER_ACTIVE);
    if (dots[currentSlide]) dots[currentSlide].classList.add(CLS_BANNER_ACTIVE);
    setTimeout(() => {
      [newTitulo, newTexto, newBotao].forEach(el => { if (el) el.classList.add(CLS_BANNER_VISIBLE); });
    }, 50);
  };
  const startSlideTimer = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      const nextSlideIndex = (currentSlide + 1) % slides.length;
      goToSlide(nextSlideIndex);
    }, slideIntervalTime);
  };
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (index === currentSlide) return;
      goToSlide(index);
      startSlideTimer();
    });
  });
  if (slides.length > 0) {
    slides[0].classList.add(CLS_BANNER_ACTIVE);
    setTimeout(() => {
      const firstTitulo = slides[0].querySelector('.banner__titulo');
      const firstTexto = slides[0].querySelector('.banner__texto');
      const firstBotao = slides[0].querySelector('.banner__botao');
      [firstTitulo, firstTexto, firstBotao].forEach(el => { if (el) el.classList.add(CLS_BANNER_VISIBLE); });
    }, 200);
  }
  startSlideTimer();
  banner.addEventListener('mouseenter', () => clearInterval(slideInterval));
  banner.addEventListener('mouseleave', startSlideTimer);
};

// Animação do hero
const animarHero = () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('is-visible');
    }, 100);
  }
};

// Scroll suave para âncoras
const scrollSuave = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

// Animação de entrada para elementos
const animarEntrada = () => {
  const elementos = document.querySelectorAll('.animar-entrada');
  if ('IntersectionObserver' in window && elementos.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(CLS_BANNER_ANIMADO);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    elementos.forEach(el => observer.observe(el));
  } else {
    elementos.forEach(el => el.classList.add(CLS_BANNER_ANIMADO));
  }
};

// Inicialização
otimizarImagens();
initCarrossel();
animarHero();
scrollSuave();
animarEntrada();