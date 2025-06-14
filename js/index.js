/**
 * Scripts Principais - Nobrega Medtech
 * - Gerenciador de Carrossel
 * - Animação de Entrada do Hero Banner
 * @version 3.0
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

    if (slides.length <= 1) {
      const texto = slides.length > 0 ? slides[0].querySelector('.banner__texto') : null;
      const botao = slides.length > 0 ? slides[0].querySelector('.banner__botao') : null;
      if (texto && botao) {
        setTimeout(() => {
          texto.classList.add('is-visible');
          botao.classList.add('is-visible');
        }, 200);
      }
      const navDots = banner.querySelector('.banner__nav-dots');
      if (navDots) navDots.remove();
    } else {
      const goToSlide = (slideIndex) => {
        slides[currentSlide].classList.remove('is-active');
        dots[currentSlide].classList.remove('is-active');
        slides[currentSlide].querySelector('.banner__texto').classList.remove('is-visible');
        slides[currentSlide].querySelector('.banner__botao').classList.remove('is-visible');
        
        currentSlide = slideIndex;

        slides[currentSlide].classList.add('is-active');
        dots[currentSlide].classList.add('is-active');
        
        setTimeout(() => {
          slides[currentSlide].querySelector('.banner__texto').classList.add('is-visible');
          slides[currentSlide].querySelector('.banner__botao').classList.add('is-visible');
        }, 200);
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

      setTimeout(() => {
        slides[currentSlide].querySelector('.banner__texto').classList.add('is-visible');
        slides[currentSlide].querySelector('.banner__botao').classList.add('is-visible');
      }, 200);
      
      startSlideTimer();

      banner.addEventListener('mouseenter', () => clearInterval(slideInterval));
      banner.addEventListener('mouseleave', startSlideTimer);
    }
  }

  // --- MÓDULO: HERO  (.hero) ---
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('is-visible');
    }, 100);
  }

});