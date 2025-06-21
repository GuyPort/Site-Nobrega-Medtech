/**
 * Scripts Principais - Nobrega Medtech
 * - Gerenciador de Carrossel
 * - Animação de Entrada do Hero
 * - Otimização de Performance de Imagens
 * @version 5.0 - Otimização de Performance
 */

// Classes CSS usadas para controle de estados do carrossel
const CLS_BANNER_ACTIVE = 'is-active';
const CLS_BANNER_VISIBLE = 'is-visible';
const CLS_BANNER_EXITING = 'is-exiting';
const CLS_BANNER_ANIMADO = 'animado';

// Função para otimizar carregamento de imagens com preload e lazy loading
const otimizarImagens = () => {
  // Preload de imagens críticas (acima da dobra) para melhor performance
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

  // Lazy loading avançado para imagens não críticas usando Intersection Observer
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
      rootMargin: '50px 0px', // Carrega 50px antes da imagem entrar na viewport
      threshold: 0.01
    });

    // Observar imagens com data-src para lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Inicialização e controle do carrossel principal da página inicial
const initCarrossel = () => {
  const banner = document.querySelector('.banner');
  if (!banner) return;
  const slides = banner.querySelectorAll('.banner__slide');
  const dots = banner.querySelectorAll('.banner__dot');
  const slideIntervalTime = 7000; // Intervalo de 7 segundos entre slides
  let currentSlide = 0;
  let slideInterval;

  // Tratamento especial para quando há apenas 1 slide ou nenhum
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
    if (navDots) navDots.remove(); // Remove navegação se só há 1 slide
    return;
  }

  // Função para navegar para um slide específico com animações
  const goToSlide = (slideIndex) => {
    if (!slides[currentSlide]) return;
    const oldSlide = slides[currentSlide];
    const oldTitulo = oldSlide.querySelector('.banner__titulo');
    const oldTexto = oldSlide.querySelector('.banner__texto');
    const oldBotao = oldSlide.querySelector('.banner__botao');
    
    // Anima saída do slide atual
    [oldTitulo, oldTexto, oldBotao].forEach(el => {
      if (el) el.classList.add(CLS_BANNER_EXITING);
      if (el) el.classList.remove(CLS_BANNER_VISIBLE);
    });
    oldSlide.classList.remove(CLS_BANNER_ACTIVE);
    if (dots[currentSlide]) dots[currentSlide].classList.remove(CLS_BANNER_ACTIVE);
    
    // Atualiza slide atual
    currentSlide = slideIndex;
    const newSlide = slides[currentSlide];
    const newTitulo = newSlide.querySelector('.banner__titulo');
    const newTexto = newSlide.querySelector('.banner__texto');
    const newBotao = newSlide.querySelector('.banner__botao');
    
    // Remove classes de saída após animação
    setTimeout(() => {
      [oldTitulo, oldTexto, oldBotao].forEach(el => { if (el) el.classList.remove(CLS_BANNER_EXITING); });
    }, 600);
    
    // Ativa novo slide
    newSlide.classList.add(CLS_BANNER_ACTIVE);
    if (dots[currentSlide]) dots[currentSlide].classList.add(CLS_BANNER_ACTIVE);
    
    // Anima entrada do novo slide
    setTimeout(() => {
      [newTitulo, newTexto, newBotao].forEach(el => { if (el) el.classList.add(CLS_BANNER_VISIBLE); });
    }, 50);
  };

  // Inicia timer automático para transição entre slides
  const startSlideTimer = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      const nextSlideIndex = (currentSlide + 1) % slides.length;
      goToSlide(nextSlideIndex);
    }, slideIntervalTime);
  };

  // Adiciona event listeners nos pontos de navegação
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (index === currentSlide) return;
      goToSlide(index);
      startSlideTimer(); // Reinicia timer ao navegar manualmente
    });
  });

  // Inicializa primeiro slide
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
  
  // Pausa carrossel quando mouse está sobre o banner
  banner.addEventListener('mouseenter', () => clearInterval(slideInterval));
  banner.addEventListener('mouseleave', startSlideTimer);
};

// Animação de entrada do hero section com delay
const animarHero = () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('is-visible');
    }, 100);
  }
};

// Implementa scroll suave para links internos (âncoras)
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

// Animação de entrada para elementos com classe 'animar-entrada'
const animarEntrada = () => {
  const elementos = document.querySelectorAll('.animar-entrada');
  if ('IntersectionObserver' in window && elementos.length) {
    // Usa Intersection Observer para animar elementos quando entram na viewport
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(CLS_BANNER_ANIMADO);
          obs.unobserve(entry.target); // Para de observar após animar
        }
      });
    }, { threshold: 0.15 }); // Anima quando 15% do elemento está visível
    elementos.forEach(el => observer.observe(el));
  } else {
    // Fallback para navegadores sem suporte ao Intersection Observer
    elementos.forEach(el => el.classList.add(CLS_BANNER_ANIMADO));
  }
};

// Inicialização de todas as funcionalidades
otimizarImagens();
initCarrossel();
animarHero();
scrollSuave();
animarEntrada();