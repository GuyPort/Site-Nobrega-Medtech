// Importa funções de validação do módulo de validação
import { validarEmail, validarNome, validarMensagem } from './components/form-validation.js';

// Inicialização do formulário de contato quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contato__form');

  // Função para exibir feedback visual acessível ao usuário
  const mostrarFeedback = (tipo, mensagem) => {
    const feedback = document.createElement('div');
    feedback.className = `contato__mensagem-${tipo} contato__mensagem-feedback`;
    feedback.setAttribute('role', 'alert'); // Para screen readers
    feedback.setAttribute('tabindex', '-1'); // Permite foco programático
    feedback.setAttribute('aria-live', 'assertive'); // Anuncia imediatamente
    feedback.innerHTML = tipo === 'sucesso'
      ? `<span class="contato__mensagem-icone" aria-hidden="true">✔️</span> ${mensagem}`
      : `<span class="contato__mensagem-icone" aria-hidden="true">❌</span> ${mensagem}`;
    form.insertAdjacentElement('afterend', feedback);
    feedback.focus(); // Foca no feedback para acessibilidade
    setTimeout(() => {
      feedback.classList.add('fade-out');
      setTimeout(() => feedback.remove(), 400); // Remove após animação
    }, 5000); // Auto-remove após 5 segundos
  };

  // Handler principal para envio do formulário com validação
  const enviarFormulario = (e) => {
    e.preventDefault();
    
    // Obtém referências dos campos do formulário
    const nomeInput = form.querySelector('input[name="nome"]');
    const emailInput = form.querySelector('input[type="email"]');
    const mensagemInput = form.querySelector('textarea[name="mensagem"]');
    
    // Obtém valores dos campos removendo espaços em branco
    const emailValue = emailInput.value.trim();
    const nomeValue = nomeInput.value.trim();
    const mensagemValue = mensagemInput.value.trim();

    // Validação do campo nome
    if (!validarNome(nomeValue)) {
      nomeInput.focus();
      nomeInput.setCustomValidity('Por favor, insira seu nome completo (mínimo 3 letras).');
      nomeInput.reportValidity();
      mostrarFeedback('erro', 'Nome deve ter pelo menos 3 letras.');
      setTimeout(() => nomeInput.setCustomValidity(''), 2000); // Remove validação customizada
      return;
    }
    
    // Validação do campo email
    if (!validarEmail(emailValue)) {
      emailInput.focus();
      emailInput.setCustomValidity('Por favor, insira um e-mail válido.');
      emailInput.reportValidity();
      mostrarFeedback('erro', 'E-mail inválido.');
      setTimeout(() => emailInput.setCustomValidity(''), 2000);
      return;
    }
    
    // Validação do campo mensagem
    if (!validarMensagem(mensagemValue)) {
      mensagemInput.focus();
      mensagemInput.setCustomValidity('Por favor, escreva uma mensagem mais detalhada (mínimo 10 caracteres).');
      mensagemInput.reportValidity();
      mostrarFeedback('erro', 'Mensagem deve ter pelo menos 10 caracteres.');
      setTimeout(() => mensagemInput.setCustomValidity(''), 2000);
      return;
    }
    
    // Preparação para envio do formulário
    const data = new FormData(form);
    const action = form.getAttribute('action');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Desabilita botão e mostra estado de carregamento
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="contato__spinner" aria-hidden="true"></span> Enviando...';
    
    // Envio do formulário via fetch API
    fetch(action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(() => {
      // Sucesso: limpa formulário e mostra feedback positivo
      form.reset();
      mostrarFeedback('sucesso', 'Mensagem enviada com sucesso! Em breve entraremos em contato.');
    })
    .catch(() => {
      // Erro: mostra feedback de erro
      mostrarFeedback('erro', 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
    })
    .finally(() => {
      // Restaura botão ao estado original
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    });
  };

  // Adiciona event listener para envio do formulário
  form.addEventListener('submit', enviarFormulario);
}); 