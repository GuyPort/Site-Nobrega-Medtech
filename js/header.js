document.addEventListener('DOMContentLoaded', function() {
  // Seleciona o botão hamburger
  const hamburgerButton = document.querySelector('.header__hamburger-button');
  // Seleciona o container do menu de navegação
  const navigationMenu = document.querySelector('.header__navegar');

  // Verifica se ambos os elementos existem na página
  if (hamburgerButton && navigationMenu) {
    hamburgerButton.addEventListener('click', function() {
      // Alterna a classe 'menu-aberto' no menu de navegação
      navigationMenu.classList.toggle('menu-aberto');

      // Alterna a classe 'menu-ativo' no botão hamburger (para animar o ícone para X)
      hamburgerButton.classList.toggle('menu-ativo');

      // Atualiza o atributo aria-expanded para acessibilidade
      const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
      hamburgerButton.setAttribute('aria-expanded', !isExpanded);
    });
  } else {
    // Se não encontrar os elementos, loga um erro no console (útil para debugging)
    if (!hamburgerButton) console.error('Botão hamburger (.header__hamburger-button) não encontrado.');
    if (!navigationMenu) console.error('Menu de navegação (.header__navegar) não encontrado.');
  }
});