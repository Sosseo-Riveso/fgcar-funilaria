// ===========================================================================
// _middleware.js - FG Car Oficina Funilaria e Pintura
// ---------------------------------------------------------------------------
// Duas responsabilidades, nesta ordem:
//
// 1) CONSOLIDACAO DE HOST: www.funilariaosasco.com.br -> https://funilariaosasco.com.br
//    Regra estrita: so o host exato "www.funilariaosasco.com.br" e afetado.
//    localhost, 127.0.0.1, *.pages.dev (preview/branch) e qualquer outro host
//    passam intactos. O redirecionamento ja sai com a rota limpa, entao
//    www/sobre.html chega ao apex em UM salto (sem cadeia).
//
// 2) URLs LIMPAS: toda URL com ".html" ou com barra final responde 301 para a
//    rota limpa, mantendo query string e o mesmo host. O rewrite interno segue
//    transparente (context.next() serve o arquivo estatico correspondente).
//
// Por que o item 2 existe: o Cloudflare Pages responde 308 por conta propria
// quando encontra o arquivo .html, e essa normalizacao acontece ANTES das
// regras do _redirects. O middleware roda antes do asset e entrega o 301.
//
// Sem dependencias externas. Requisicoes que nao sao GET/HEAD seguem direto.
// ===========================================================================

const APEX_ORIGIN = 'https://funilariaosasco.com.br';
const WWW_HOST = 'www.funilariaosasco.com.br';

function redirecionar(location) {
  return new Response(null, {
    status: 301,
    headers: {
      'Location': location,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

// /sobre.html -> /sobre · /sobre/ -> /sobre · /index(.html|/) -> / · / -> /
function caminhoLimpo(pathname) {
  let destino = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  if (destino.endsWith('.html')) {
    destino = destino.slice(0, -'.html'.length);
  }

  if (destino === '/index' || destino === '') {
    destino = '/';
  }

  return destino;
}

export async function onRequest(context) {
  const { request, next } = context;

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return next();
  }

  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();
  const destino = caminhoLimpo(url.pathname);

  // 1) www -> apex, ja na rota final (um unico salto)
  if (host === WWW_HOST) {
    return redirecionar(APEX_ORIGIN + destino + url.search);
  }

  // 2) .html e barra final -> rota limpa no mesmo host
  if (destino !== url.pathname) {
    return redirecionar(destino + url.search);
  }

  return next();
}

