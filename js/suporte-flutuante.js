// Classes CSS usadas para controle de estados do widget de suporte
const CLS_POPUP_ATIVO = 'ativo';
const CLS_POPUP_MINIMIZADO = 'minimizado';

// Inicialização do suporte flutuante quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const suportePopups = document.querySelectorAll('.suporte-flutuante__popup');
  const suporteBotoes = document.querySelectorAll('.suporte-flutuante__botao');

  // Função para detectar se está em dispositivo móvel ou tablet
  const isMobileOuTablet = () => window.innerWidth < 1024;

  // Inicializa cada popup de suporte individualmente
  suportePopups.forEach((suportePopup) => {
    const suporteMinimizar = suportePopup.querySelector('.suporte-popup__minimizar');
    const suporteFechar = suportePopup.querySelector('.suporte-popup__fechar');
    const suporteBotao = suportePopup.parentElement.querySelector('.suporte-flutuante__botao');

    // Função para abrir o popup de suporte
    const abrirPopup = () => {
      suportePopup.classList.add(CLS_POPUP_ATIVO);
      suporteBotao.setAttribute('aria-expanded', 'true');
    };
    
    // Função para fechar o popup de suporte
    const fecharPopup = () => {
      suportePopup.classList.remove(CLS_POPUP_ATIVO, CLS_POPUP_MINIMIZADO);
      suporteBotao.setAttribute('aria-expanded', 'false');
    };
    
    // Função para minimizar o popup
    const minimizarPopup = () => suportePopup.classList.add(CLS_POPUP_MINIMIZADO);
    
    // Função para restaurar o popup minimizado
    const restaurarPopup = () => suportePopup.classList.remove(CLS_POPUP_MINIMIZADO);

    // Comportamento diferente para mobile/tablet vs desktop
    if (isMobileOuTablet()) {
      // Em mobile: abre/fecha com clique no botão
      suporteBotao.addEventListener('click', (e) => {
        e.stopPropagation();
        suportePopup.classList.contains(CLS_POPUP_ATIVO) ? fecharPopup() : abrirPopup();
      });
      
      // Fecha popup quando clica fora dele em mobile
      document.addEventListener('click', (event) => {
        if (!suportePopup.contains(event.target) && !suporteBotao.contains(event.target)) {
          fecharPopup();
        }
      });
    } else {
      // Em desktop: abre com hover, fecha quando mouse sai
      let hoverTimeout;
      suporteBotao.addEventListener('mouseenter', abrirPopup);
      suporteBotao.addEventListener('mouseleave', () => { hoverTimeout = setTimeout(fecharPopup, 200); });
      suportePopup.addEventListener('mouseenter', () => { clearTimeout(hoverTimeout); });
      suportePopup.addEventListener('mouseleave', fecharPopup);
    }

    // Event listener para botão de minimizar (se existir)
    if (suporteMinimizar) {
      suporteMinimizar.addEventListener('click', (e) => {
        e.stopPropagation();
        suportePopup.classList.contains(CLS_POPUP_MINIMIZADO) ? restaurarPopup() : minimizarPopup();
      });
    }
    
    // Event listener para botão de fechar (se existir)
    if (suporteFechar) {
      suporteFechar.addEventListener('click', (e) => {
        e.stopPropagation();
        fecharPopup();
      });
    }
    
    // Fecha popup com tecla Escape para acessibilidade
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && suportePopup.classList.contains(CLS_POPUP_ATIVO)) {
        fecharPopup();
      }
    });
  });
}); 