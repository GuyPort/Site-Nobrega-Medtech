// Garante que o código só rode após o carregamento completo do HTML.
document.addEventListener("DOMContentLoaded", function () {
  // --- LÓGICA PARA O MENU HAMBÚRGUER ---
  const hamburgerButton = document.querySelector(".header__hamburger-button");
  const navContainer = document.querySelector(".header__navegar");

  if (hamburgerButton && navContainer) {
    hamburgerButton.addEventListener("click", function () {
      // Alterna as classes para o estado ativo/inativo.
      hamburgerButton.classList.toggle("menu-ativo");
      navContainer.classList.toggle("menu-aberto");

      // Atualiza o atributo aria-expanded para acessibilidade.
      const isExpanded = hamburgerButton.classList.contains("menu-ativo");
      hamburgerButton.setAttribute("aria-expanded", isExpanded);

      // ADICIONADO: Alterna a classe no <body> para travar/liberar o scroll da página.
      document.body.classList.toggle("body-no-scroll");
    });
  } else {
    if (!hamburgerButton)
      console.error("Botão hamburger (.header__hamburger-button) não encontrado.");
    if (!navigationMenu)
      console.error("Menu de navegação (.header__navegar) não encontrado.");
  }

  // --- LÓGICA PARA O DROPDOWN ---
  const dropdownItems = document.querySelectorAll(
    ".header__nav-item--has-dropdown"
  );

  dropdownItems.forEach((item) => {
    const toggleLink = item.querySelector("a");

    toggleLink.addEventListener("click", function (event) {
      const isMobileView = getComputedStyle(hamburgerButton).display !== "none";

      if (isMobileView) {
        event.preventDefault();
        item.classList.toggle("dropdown-aberto");
        const isDropdownExpanded = item.classList.contains("dropdown-aberto");
        item.setAttribute("aria-expanded", isDropdownExpanded);
      }
    });
  });
});