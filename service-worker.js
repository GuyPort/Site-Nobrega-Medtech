const CACHE_NAME = 'nobrega-medtech-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/global.css',
  '/css/header.css',
  '/css/footer.css',
  '/js/index.js',
  '/js/header.js',
  '/assets/imagens/logo-nobrega-medtech.svg',
  '/pages/contato/index.html',
  '/pages/educacao/index.html',
  '/pages/educacao/residencia.html',
  '/pages/educacao/preparatorios.html',
  '/pages/educacao/especialidades.html',
  '/pages/educacao/atualizacoes.html',
  '/pages/educacao/ferramentas.html',
  '/pages/educacao/mentorias.html',
  '/assets/imagens/fundadores/fundadores.jpg',
  '/assets/imagens/logo-nobra.svg',
  // Adicione outros arquivos essenciais aqui
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
}); 