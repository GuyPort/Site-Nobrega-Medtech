document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o elemento do hero banner
    const heroBanner = document.querySelector('.hero-banner');

    // Verifica se o elemento heroBanner realmente existe na página atual
    if (heroBanner) {
        // Adiciona a classe '.is-visible' após um pequeno delay (100ms).
        // Esse delay é opcional, mas pode ajudar a garantir que tudo esteja pronto
        // e dá um instante para o usuário perceber a animação começando.
        setTimeout(function() {
            heroBanner.classList.add('is-visible');
        }, 100); // Delay de 100 milissegundos (0.1 segundos)
    }
});