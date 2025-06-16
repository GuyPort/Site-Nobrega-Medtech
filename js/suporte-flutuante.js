document.addEventListener('DOMContentLoaded', function() {
  const suporteBotao = document.querySelector('.suporte-flutuante__botao');
  const suportePopup = document.querySelector('.suporte-flutuante__popup');
  if (!suporteBotao || !suportePopup) return;
  function isMobileOuTablet() { return window.innerWidth < 1024; }
  function abrirPopup() { suportePopup.classList.add('ativo'); }
  function fecharPopup() { suportePopup.classList.remove('ativo'); }
  if (isMobileOuTablet()) {
    suporteBotao.addEventListener('click', function(e) { e.stopPropagation(); suportePopup.classList.toggle('ativo'); });
    document.addEventListener('click', function(event) { if (!suportePopup.contains(event.target) && !suporteBotao.contains(event.target)) { fecharPopup(); } });
  } else {
    let hoverTimeout;
    suporteBotao.addEventListener('mouseenter', abrirPopup);
    suporteBotao.addEventListener('mouseleave', () => { hoverTimeout = setTimeout(fecharPopup, 200); });
    suportePopup.addEventListener('mouseenter', () => { clearTimeout(hoverTimeout); });
    suportePopup.addEventListener('mouseleave', fecharPopup);
  }
}); 