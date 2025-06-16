/**
 * Scripts Principais - Nobrega Medtech
 * - Gerenciador de Carrossel
 * - Animação de Entrada do Hero
 * @version 4.1 - Sincronização Final do Carrossel
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- MÓDULO: CARROSSEL (.banner) ---
  const banner = document.querySelector('.banner');
  if (banner) {
    const slides = banner.querySelectorAll('.banner__slide');
    const dots = banner.querySelectorAll('.banner__dot');
    const slideIntervalTime = 7000;
    let currentSlide = 0;
    let slideInterval;

    // Lógica para quando há apenas um slide ou nenhum.
    if (slides.length <= 1) {
      if (slides.length === 1) {
        const firstSlide = slides[0];
        firstSlide.classList.add('is-active');
        const titulo = firstSlide.querySelector('.banner__titulo');
        const texto = firstSlide.querySelector('.banner__texto');
        const botao = firstSlide.querySelector('.banner__botao');
        // Anima todos os elementos
        if (titulo && texto && botao) {
          setTimeout(() => {
            titulo.classList.add('is-visible');
            texto.classList.add('is-visible');
            botao.classList.add('is-visible');
          }, 200);
        }
      }
      const navDots = banner.querySelector('.banner__nav-dots');
      if (navDots) navDots.remove();
      return; // Interrompe a execução do carrossel
    }

    // ==================================================================
    // FUNÇÃO DE TRANSIÇÃO DE SLIDE CORRETA
    // ==================================================================
    /**
     * Move o carrossel para um slide específico com animação de fluxo contínuo.
     * @param {number} slideIndex - O índice do slide para o qual navegar.
     */
    const goToSlide = (slideIndex) => {
      // Proteção para evitar erros se os elementos não existirem
      if (!slides[currentSlide]) return;

      const oldSlide = slides[currentSlide];
      const oldTitulo = oldSlide.querySelector('.banner__titulo');
      const oldTexto = oldSlide.querySelector('.banner__texto');
      const oldBotao = oldSlide.querySelector('.banner__botao');

      // 1. Inicia a animação de SAÍDA do slide antigo
      if (oldTitulo) oldTitulo.classList.add('is-exiting');
      if (oldTexto) oldTexto.classList.add('is-exiting');
      if (oldBotao) oldBotao.classList.add('is-exiting');

      if (oldTitulo) oldTitulo.classList.remove('is-visible');
      if (oldTexto) oldTexto.classList.remove('is-visible');
      if (oldBotao) oldBotao.classList.remove('is-visible');
      
      oldSlide.classList.remove('is-active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('is-active');

      // Define o novo slide
      currentSlide = slideIndex;
      const newSlide = slides[currentSlide];
      const newTitulo = newSlide.querySelector('.banner__titulo');
      const newTexto = newSlide.querySelector('.banner__texto');
      const newBotao = newSlide.querySelector('.banner__botao');
      
      // 2. Reseta o estado do slide antigo para futuras animações
      setTimeout(() => {
        if (oldTitulo) oldTitulo.classList.remove('is-exiting');
        if (oldTexto) oldTexto.classList.remove('is-exiting');
        if (oldBotao) oldBotao.classList.remove('is-exiting');
      }, 600); // Duração igual à transição do CSS

      // 3. Ativa o novo slide e inicia a animação de ENTRADA
      newSlide.classList.add('is-active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('is-active');
      
      setTimeout(() => {
        if (newTitulo) newTitulo.classList.add('is-visible');
        if (newTexto) newTexto.classList.add('is-visible');
        if (newBotao) newBotao.classList.add('is-visible');
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

    // Animação inicial do primeiro slide
    if (slides.length > 0) {
        slides[0].classList.add('is-active');
        setTimeout(() => {
            const firstTitulo = slides[0].querySelector('.banner__titulo');
            const firstTexto = slides[0].querySelector('.banner__texto');
            const firstBotao = slides[0].querySelector('.banner__botao');
            if (firstTitulo) firstTitulo.classList.add('is-visible');
            if (firstTexto) firstTexto.classList.add('is-visible');
            if (firstBotao) firstBotao.classList.add('is-visible');
        }, 200);
    }
    
    startSlideTimer();

    banner.addEventListener('mouseenter', () => clearInterval(slideInterval));
    banner.addEventListener('mouseleave', startSlideTimer);
  }

  // --- MÓDULO: HERO (.hero) ---
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('is-visible');
    }, 100);
  }

});