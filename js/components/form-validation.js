// Funções de validação reutilizáveis para formulários
// Módulo ES6 exportável para uso em outros arquivos

// Valida formato de email usando regex
export const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validação básica de email
  return emailRegex.test(email);
};

// Valida se nome tem pelo menos 3 caracteres (após remover espaços)
export const validarNome = (nome) => nome.trim().length >= 3;

// Valida se mensagem tem pelo menos 10 caracteres (após remover espaços)
export const validarMensagem = (msg) => msg.trim().length >= 10; 