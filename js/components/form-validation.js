// Funções de validação reutilizáveis
export const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validarNome = (nome) => nome.trim().length >= 3;

export const validarMensagem = (msg) => msg.trim().length >= 10; 