// Dentro do seu novo arquivo js/index.js (ou como você o chamou)

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o elemento do hero banner
    const heroBanner = document.querySelector('.hero-banner');

    // Verifica se o elemento heroBanner realmente existe na página atual
    if (heroBanner) {
        // Adiciona a classe '.is-visible' após um pequeno delay (100ms).
        // Esse delay é opcional, mas pode ajudar a garantir que tudo esteja pronto
        // e dá um instante para o usuário perceber a animação começando.
        // Você pode ajustar este valor de delay ou removê-lo (setTimeout(..., 0)) 
        // se quiser que a animação comece o mais rápido possível.
        setTimeout(function() {
            heroBanner.classList.add('is-visible');
        }, 100); // Delay de 100 milissegundos (0.1 segundos)
    }
});