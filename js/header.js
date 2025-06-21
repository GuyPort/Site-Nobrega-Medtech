// Classes CSS usadas para controle de estados do menu mobile e dropdown
const CLS_HAMBURGER_ATIVO = "menu-ativo";
const CLS_NAV_ABERTO = "menu-aberto";
const CLS_BODY_NO_SCROLL = "body-no-scroll";
const CLS_DROPDOWN_ABERTO = "dropdown-aberto";

// Elementos principais do header para manipulação
const hamburgerButton = document.querySelector(".header__hamburger-button");
const navContainer = document.querySelector(".header__navegar");
const navigationMenu = document.querySelector(".header__nav");
const body = document.body;

// Função para alternar estado do menu mobile (abrir/fechar)
const toggleMenu = () => {
  hamburgerButton.classList.toggle(CLS_HAMBURGER_ATIVO);
  navContainer.classList.toggle(CLS_NAV_ABERTO);
  const isExpanded = hamburgerButton.classList.contains(CLS_HAMBURGER_ATIVO);
  hamburgerButton.setAttribute("aria-expanded", isExpanded);
  body.classList.toggle(CLS_BODY_NO_SCROLL); // Previne scroll do body quando menu está aberto
};

// Inicialização do menu mobile se os elementos existirem
if (hamburgerButton && navContainer) {
  hamburgerButton.addEventListener("click", toggleMenu);
  
  // Fecha menu com tecla Escape para acessibilidade
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hamburgerButton.classList.contains(CLS_HAMBURGER_ATIVO)) {
      toggleMenu();
    }
  });
}

// Controle dos dropdowns do menu de navegação
const dropdownItems = document.querySelectorAll(".header__nav-item--has-dropdown");

// Função para fechar todos os dropdowns exceto o especificado
const closeAllDropdowns = (exceptItem) => {
  dropdownItems.forEach((item) => {
    if (item !== exceptItem) {
      item.classList.remove(CLS_DROPDOWN_ABERTO);
      item.setAttribute("aria-expanded", "false");
    }
  });
};

// Adiciona funcionalidade de dropdown para cada item que possui submenu
dropdownItems.forEach((item) => {
  const toggleButton = item.querySelector(".header__nav-link");
  if (!toggleButton) return;

  // Handler para controle do dropdown
  const handleDropdown = (event) => {
    const isMobileView = window.innerWidth < 1024; // Breakpoint para mobile
    
    if (isMobileView) {
      event.preventDefault(); // Previne navegação em mobile
      const isOpen = item.classList.toggle(CLS_DROPDOWN_ABERTO);
      item.setAttribute("aria-expanded", isOpen);
      
      // Fecha outros dropdowns quando um é aberto
      if (isOpen) closeAllDropdowns(item);
    }
  };

  toggleButton.addEventListener("click", handleDropdown);
});

// Fecha dropdowns quando clica fora deles (comportamento padrão)
document.addEventListener("click", (event) => {
  dropdownItems.forEach((item) => {
    if (!item.contains(event.target) && item.classList.contains(CLS_DROPDOWN_ABERTO)) {
      item.classList.remove(CLS_DROPDOWN_ABERTO);
      item.setAttribute("aria-expanded", "false");
    }
  });
});