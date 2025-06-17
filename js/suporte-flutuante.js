document.addEventListener('DOMContentLoaded', function() {
  const suporteBotao = document.querySelector('.suporte-flutuante__botao');
  const suportePopup = document.querySelector('.suporte-flutuante__popup');
  
  if (!suporteBotao || !suportePopup) {
    console.warn('Elementos do suporte flutuante não encontrados');
    return;
  }

  let hoverTimeout;
  const HOVER_DELAY = 200;
  
  function isMobileOuTablet() { 
    return window.innerWidth < 1024;
  }
  
  function abrirPopup() { 
    suportePopup.classList.add('ativo');
    suporteBotao.setAttribute('aria-expanded', 'true');
  }
  
  function fecharPopup() { 
    suportePopup.classList.remove('ativo');
    suporteBotao.setAttribute('aria-expanded', 'false');
  }

  function handleClickOutside(event) {
    if (!suportePopup.contains(event.target) && !suporteBotao.contains(event.target)) {
      fecharPopup();
    }
  }

  function setupMobileEvents() {
    suporteBotao.addEventListener('click', function(e) {
      e.stopPropagation();
      suportePopup.classList.contains('ativo') ? fecharPopup() : abrirPopup();
    });
    document.addEventListener('click', handleClickOutside);
  }

  function setupDesktopEvents() {
    suporteBotao.addEventListener('mouseenter', abrirPopup);
    suporteBotao.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(fecharPopup, HOVER_DELAY);
    });
    suportePopup.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
    });
    suportePopup.addEventListener('mouseleave', fecharPopup);
  }

  // Configuração inicial
  suporteBotao.setAttribute('aria-expanded', 'false');
  suporteBotao.setAttribute('aria-controls', 'suporte-popup');
  suportePopup.id = 'suporte-popup';

  // Setup de eventos baseado no dispositivo
  if (isMobileOuTablet()) {
    setupMobileEvents();
  } else {
    setupDesktopEvents();
  }

  // Fechar com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && suportePopup.classList.contains('ativo')) {
      fecharPopup();
    }
  });
}); 