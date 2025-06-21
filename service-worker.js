// Service Worker da Nobrega Medtech
// Gerencia cache offline e funcionalidades PWA

// Nome do cache para controle de versão
const CACHE_NAME = 'nobrega-medtech-v1';

// Lista de recursos essenciais para cache offline
const urlsToCache = [
  '/',                           // Página inicial
  '/index.html',                 // HTML principal
  '/css/global.css',             // Estilos globais
  '/css/header.css',             // Estilos do cabeçalho
  '/css/footer.css',             // Estilos do rodapé
  '/js/index.js',                // JavaScript principal
  '/js/header.js',               // JavaScript do cabeçalho
  '/assets/imagens/logo-nobrega-medtech.svg', // Logo principal
  '/pages/contato/index.html',   // Página de contato
  '/pages/educacao/index.html',  // Página de educação
  '/pages/educacao/residencia.html',      // Página de residência
  '/pages/educacao/preparatorios.html',   // Página de preparatórios
  '/pages/educacao/especialidades.html',  // Página de especialidades
  '/pages/educacao/atualizacoes.html',    // Página de atualizações
  '/pages/educacao/ferramentas.html',     // Página de ferramentas
  '/pages/educacao/mentorias.html',       // Página de mentorias
  '/assets/imagens/fundadores/fundadores.jpg', // Imagem dos fundadores
  '/assets/imagens/logo-nobra.svg',       // Logo da Nobra
  // Adicione outros arquivos essenciais aqui
];

// Evento de instalação - cache inicial dos recursos
self.addEventListener('install', event => {
  // Força ativação imediata do service worker
  self.skipWaiting();
  
  // Aguarda o cache de todos os recursos essenciais
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Evento de ativação - limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        // Remove todos os caches exceto o atual
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Evento de fetch - estratégia cache-first
self.addEventListener('fetch', event => {
  event.respondWith(
    // Primeiro tenta buscar do cache, depois da rede
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
}); 