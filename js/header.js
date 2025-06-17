// Garante que o código só rode após o carregamento completo do HTML.
document.addEventListener("DOMContentLoaded", function () {
  // --- LÓGICA PARA O MENU HAMBÚRGUER ---
  const hamburgerButton = document.querySelector(".header__hamburger-button");
  const navContainer = document.querySelector(".header__navegar");
  const navigationMenu = document.querySelector(".header__nav");

  // Cache do body para melhor performance
  const body = document.body;

  if (hamburgerButton && navContainer) {
    const toggleMenu = function() {
      // Alterna as classes para o estado ativo/inativo.
      hamburgerButton.classList.toggle("menu-ativo");
      navContainer.classList.toggle("menu-aberto");

      // Atualiza o atributo aria-expanded para acessibilidade.
      const isExpanded = hamburgerButton.classList.contains("menu-ativo");
      hamburgerButton.setAttribute("aria-expanded", isExpanded);

      // Alterna o scroll da página
      body.classList.toggle("body-no-scroll");
    };

    // Usa event delegation para melhor performance
    hamburgerButton.addEventListener("click", toggleMenu);

    // Fecha o menu ao pressionar ESC
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && hamburgerButton.classList.contains("menu-ativo")) {
        toggleMenu();
      }
    });
  } else {
    console.warn("Elementos do menu não encontrados:", {
      hamburgerButton: !!hamburgerButton,
      navContainer: !!navContainer
    });
  }

  // --- LÓGICA PARA O DROPDOWN ---
  const dropdownItems = document.querySelectorAll(".header__nav-item--has-dropdown");

  dropdownItems.forEach((item) => {
    const toggleLink = item.querySelector("a");
    if (!toggleLink) return;

    const handleDropdown = function(event) {
      const isMobileView = window.innerWidth < 1024;

      if (isMobileView) {
        event.preventDefault();
        item.classList.toggle("dropdown-aberto");
        const isDropdownExpanded = item.classList.contains("dropdown-aberto");
        item.setAttribute("aria-expanded", isDropdownExpanded);
      }
    };

    toggleLink.addEventListener("click", handleDropdown);

    // Fecha dropdown ao clicar fora
    document.addEventListener("click", function(event) {
      if (!item.contains(event.target) && item.classList.contains("dropdown-aberto")) {
        item.classList.remove("dropdown-aberto");
        item.setAttribute("aria-expanded", "false");
      }
    });
  });
});