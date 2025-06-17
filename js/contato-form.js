document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contato__form');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const data = new FormData(form);
    const action = form.getAttribute('action');
    
    // Desabilitar o botão durante o envio
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    fetch(action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Limpar o formulário
      form.reset();
      
      // Mostrar mensagem de sucesso
      const successMessage = document.createElement('div');
      successMessage.className = 'contato__mensagem-sucesso';
      successMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
      
      // Inserir a mensagem após o formulário
      form.insertAdjacentElement('afterend', successMessage);
      
      // Remover a mensagem após 5 segundos
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    })
    .catch(error => {
      // Mostrar mensagem de erro
      const errorMessage = document.createElement('div');
      errorMessage.className = 'contato__mensagem-erro';
      errorMessage.textContent = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.';
      
      // Inserir a mensagem após o formulário
      form.insertAdjacentElement('afterend', errorMessage);
      
      // Remover a mensagem após 5 segundos
      setTimeout(() => {
        errorMessage.remove();
      }, 5000);
    })
    .finally(() => {
      // Reativar o botão
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    });
  });
}); 