// Classes CSS usadas
const CLS_POPUP_ATIVO = 'ativo';
const CLS_POPUP_MINIMIZADO = 'minimizado';

// Inicialização do suporte flutuante
document.addEventListener('DOMContentLoaded', () => {
  const suportePopups = document.querySelectorAll('.suporte-flutuante__popup');
  const suporteBotoes = document.querySelectorAll('.suporte-flutuante__botao');

  const isMobileOuTablet = () => window.innerWidth < 1024;

  suportePopups.forEach((suportePopup) => {
    const suporteMinimizar = suportePopup.querySelector('.suporte-popup__minimizar');
    const suporteFechar = suportePopup.querySelector('.suporte-popup__fechar');
    const suporteBotao = suportePopup.parentElement.querySelector('.suporte-flutuante__botao');

    const abrirPopup = () => {
      suportePopup.classList.add(CLS_POPUP_ATIVO);
      suporteBotao.setAttribute('aria-expanded', 'true');
    };
    const fecharPopup = () => {
      suportePopup.classList.remove(CLS_POPUP_ATIVO, CLS_POPUP_MINIMIZADO);
      suporteBotao.setAttribute('aria-expanded', 'false');
    };
    const minimizarPopup = () => suportePopup.classList.add(CLS_POPUP_MINIMIZADO);
    const restaurarPopup = () => suportePopup.classList.remove(CLS_POPUP_MINIMIZADO);

    if (isMobileOuTablet()) {
      suporteBotao.addEventListener('click', (e) => {
        e.stopPropagation();
        suportePopup.classList.contains(CLS_POPUP_ATIVO) ? fecharPopup() : abrirPopup();
      });
      document.addEventListener('click', (event) => {
        if (!suportePopup.contains(event.target) && !suporteBotao.contains(event.target)) {
          fecharPopup();
        }
      });
    } else {
      let hoverTimeout;
      suporteBotao.addEventListener('mouseenter', abrirPopup);
      suporteBotao.addEventListener('mouseleave', () => { hoverTimeout = setTimeout(fecharPopup, 200); });
      suportePopup.addEventListener('mouseenter', () => { clearTimeout(hoverTimeout); });
      suportePopup.addEventListener('mouseleave', fecharPopup);
    }

    if (suporteMinimizar) {
      suporteMinimizar.addEventListener('click', (e) => {
        e.stopPropagation();
        suportePopup.classList.contains(CLS_POPUP_MINIMIZADO) ? restaurarPopup() : minimizarPopup();
      });
    }
    if (suporteFechar) {
      suporteFechar.addEventListener('click', (e) => {
        e.stopPropagation();
        fecharPopup();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && suportePopup.classList.contains(CLS_POPUP_ATIVO)) {
        fecharPopup();
      }
    });
  });
}); 