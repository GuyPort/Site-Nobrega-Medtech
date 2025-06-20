import { validarEmail, validarNome, validarMensagem } from './components/form-validation.js';

// Inicialização do formulário de contato
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contato__form');

  // Exibe feedback visual acessível
  const mostrarFeedback = (tipo, mensagem) => {
    const feedback = document.createElement('div');
    feedback.className = `contato__mensagem-${tipo} contato__mensagem-feedback`;
    feedback.setAttribute('role', 'alert');
    feedback.setAttribute('tabindex', '-1');
    feedback.setAttribute('aria-live', 'assertive');
    feedback.innerHTML = tipo === 'sucesso'
      ? `<span class="contato__mensagem-icone" aria-hidden="true">✔️</span> ${mensagem}`
      : `<span class="contato__mensagem-icone" aria-hidden="true">❌</span> ${mensagem}`;
    form.insertAdjacentElement('afterend', feedback);
    feedback.focus();
    setTimeout(() => {
      feedback.classList.add('fade-out');
      setTimeout(() => feedback.remove(), 400);
    }, 5000);
  };

  // Handler de envio do formulário
  const enviarFormulario = (e) => {
    e.preventDefault();
    const nomeInput = form.querySelector('input[name="nome"]');
    const emailInput = form.querySelector('input[type="email"]');
    const mensagemInput = form.querySelector('textarea[name="mensagem"]');
    const emailValue = emailInput.value.trim();
    const nomeValue = nomeInput.value.trim();
    const mensagemValue = mensagemInput.value.trim();

    if (!validarNome(nomeValue)) {
      nomeInput.focus();
      nomeInput.setCustomValidity('Por favor, insira seu nome completo (mínimo 3 letras).');
      nomeInput.reportValidity();
      mostrarFeedback('erro', 'Nome deve ter pelo menos 3 letras.');
      setTimeout(() => nomeInput.setCustomValidity(''), 2000);
      return;
    }
    if (!validarEmail(emailValue)) {
      emailInput.focus();
      emailInput.setCustomValidity('Por favor, insira um e-mail válido.');
      emailInput.reportValidity();
      mostrarFeedback('erro', 'E-mail inválido.');
      setTimeout(() => emailInput.setCustomValidity(''), 2000);
      return;
    }
    if (!validarMensagem(mensagemValue)) {
      mensagemInput.focus();
      mensagemInput.setCustomValidity('Por favor, escreva uma mensagem mais detalhada (mínimo 10 caracteres).');
      mensagemInput.reportValidity();
      mostrarFeedback('erro', 'Mensagem deve ter pelo menos 10 caracteres.');
      setTimeout(() => mensagemInput.setCustomValidity(''), 2000);
      return;
    }
    const data = new FormData(form);
    const action = form.getAttribute('action');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="contato__spinner" aria-hidden="true"></span> Enviando...';
    fetch(action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(() => {
      form.reset();
      mostrarFeedback('sucesso', 'Mensagem enviada com sucesso! Em breve entraremos em contato.');
    })
    .catch(() => {
      mostrarFeedback('erro', 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    });
  };

  form.addEventListener('submit', enviarFormulario);
}); 