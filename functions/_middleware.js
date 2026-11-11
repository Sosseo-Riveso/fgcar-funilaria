// ===========================================================================
// _middleware.js - FG Car Oficina Funilaria e Pintura
// ---------------------------------------------------------------------------
// Objetivo: garantir **301** em toda URL que chega com ".html" ou com barra
// final, servindo o arquivo estatico pela rota limpa.
//
// Por que este arquivo existe: o Cloudflare Pages responde 308 por conta
// propria quando encontra o arquivo .html (normalizacao de HTML) e essa
// etapa acontece ANTES das regras do _redirects. O middleware roda antes do
// asset e devolve o 301 permanente pedido, mantendo o rewrite interno
// transparente (context.next() continua servindo o arquivo correspondente).
//
// Sem dependencias externas. Requisicoes que nao sao GET/HEAD seguem direto.
// ===========================================================================

export async function onRequest(context) {
  const { request, next } = context;

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return next();
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // 1) remove barras finais (exceto na raiz)
  let destino = path.length > 1 ? path.replace(/\/+$/, '') : path;

  // 2) remove a extensao .html
  if (destino.endsWith('.html')) {
    destino = destino.slice(0, -'.html'.length);
  }

  // 3) /index e /index.html apontam para a home
  if (destino === '/index' || destino === '') {
    destino = '/';
  }

  if (destino !== path) {
    return new Response(null, {
      status: 301,
      headers: {
        'Location': destino + url.search,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  return next();
}
