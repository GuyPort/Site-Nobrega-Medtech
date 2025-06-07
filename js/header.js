// Garante que o código só rode após o carregamento completo do HTML.
document.addEventListener("DOMContentLoaded", function () {
  // --- SEU CÓDIGO ORIGINAL (COM UM PEQUENO REFINAMENTO) ---
  const hamburgerButton = document.querySelector(".header__hamburger-button");
  const navigationMenu = document.querySelector(".header__navegar");

  // Verifica se ambos os elementos existem na página
  if (hamburgerButton && navigationMenu) {
    hamburgerButton.addEventListener("click", function () {
      // Alterna a classe 'menu-aberto' no menu de navegação
      navigationMenu.classList.toggle("menu-aberto");

      // Alterna a classe 'menu-ativo' no botão hamburger (para animar o ícone para X)
      hamburgerButton.classList.toggle("menu-ativo");

      // Atualiza o atributo aria-expanded para acessibilidade (lógica um pouco mais direta)
      const isExpanded = hamburgerButton.classList.contains("menu-ativo");
      hamburgerButton.setAttribute("aria-expanded", isExpanded);
    });
  } else {
    // Se não encontrar os elementos, loga um erro no console (útil para debugging)
    if (!hamburgerButton)
      console.error("Botão hamburger (.header__hamburger-button) não encontrado.");
    if (!navigationMenu)
      console.error("Menu de navegação (.header__navegar) não encontrado.");
  }

  // ================================================================
  // --- NOVO CÓDIGO ADICIONADO PARA O DROPDOWN ---
  // ================================================================

  // Seleciona todos os itens de menu que têm um submenu
  const dropdownItems = document.querySelectorAll(
    ".header__nav-item--has-dropdown"
  );

  // Itera sobre cada um deles para adicionar a funcionalidade
  dropdownItems.forEach((item) => {
    // Seleciona o link que servirá como botão de abertura
    const toggleLink = item.querySelector("a");

    // Adiciona um "ouvinte" de clique a este link
    toggleLink.addEventListener("click", function (event) {
      // Condição crucial: A lógica de clique só deve funcionar se o menu hambúrguer estiver visível.
      // Isso garante que o clique não faça nada em telas de desktop (onde o hover comanda).
      const isMobileView = getComputedStyle(hamburgerButton).display !== "none";

      if (isMobileView) {
        // Previne o comportamento padrão do link (de navegar para "#")
        event.preventDefault();

        // Alterna a classe '.dropdown-aberto' no <li> pai
        item.classList.toggle("dropdown-aberto");

        // Atualiza o atributo aria-expanded no <li> para acessibilidade
        const isDropdownExpanded = item.classList.contains("dropdown-aberto");
        item.setAttribute("aria-expanded", isDropdownExpanded);
      }
    });
  });
});