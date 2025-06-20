// Classes CSS usadas
const CLS_HAMBURGER_ATIVO = "menu-ativo";
const CLS_NAV_ABERTO = "menu-aberto";
const CLS_BODY_NO_SCROLL = "body-no-scroll";
const CLS_DROPDOWN_ABERTO = "dropdown-aberto";

// Elementos principais
const hamburgerButton = document.querySelector(".header__hamburger-button");
const navContainer = document.querySelector(".header__navegar");
const navigationMenu = document.querySelector(".header__nav");
const body = document.body;

// Alterna menu mobile
const toggleMenu = () => {
  hamburgerButton.classList.toggle(CLS_HAMBURGER_ATIVO);
  navContainer.classList.toggle(CLS_NAV_ABERTO);
  const isExpanded = hamburgerButton.classList.contains(CLS_HAMBURGER_ATIVO);
  hamburgerButton.setAttribute("aria-expanded", isExpanded);
  body.classList.toggle(CLS_BODY_NO_SCROLL);
};

if (hamburgerButton && navContainer) {
  hamburgerButton.addEventListener("click", toggleMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hamburgerButton.classList.contains(CLS_HAMBURGER_ATIVO)) {
      toggleMenu();
    }
  });
}

// Dropdown do menu
const dropdownItems = document.querySelectorAll(".header__nav-item--has-dropdown");

const closeAllDropdowns = (exceptItem) => {
  dropdownItems.forEach((item) => {
    if (item !== exceptItem) {
      item.classList.remove(CLS_DROPDOWN_ABERTO);
      item.setAttribute("aria-expanded", "false");
    }
  });
};

dropdownItems.forEach((item) => {
  const toggleButton = item.querySelector(".header__nav-link");
  if (!toggleButton) return;

  const handleDropdown = (event) => {
    const isMobileView = window.innerWidth < 1024;
    if (isMobileView) {
      event.preventDefault();
      const isOpen = item.classList.toggle(CLS_DROPDOWN_ABERTO);
      item.setAttribute("aria-expanded", isOpen);
      if (isOpen) closeAllDropdowns(item);
    }
  };

  toggleButton.addEventListener("click", handleDropdown);
});

// Fecha dropdown ao clicar fora
document.addEventListener("click", (event) => {
  dropdownItems.forEach((item) => {
    if (!item.contains(event.target) && item.classList.contains(CLS_DROPDOWN_ABERTO)) {
      item.classList.remove(CLS_DROPDOWN_ABERTO);
      item.setAttribute("aria-expanded", "false");
    }
  });
});