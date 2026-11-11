# PROGRESS — FG Car Oficina Funilaria e Pintura

> Registro cronológico de implementações, decisões e pendências do projeto.
> **Atualize este arquivo ao final de cada entrega relevante.**
> Última atualização: **02/11/2026**.

---

## 1. Status atual

| Área | Situação |
|---|---|
| Site institucional + blog | ✅ Publicado em produção (Cloudflare Pages) |
| SEO on-page (title, description, canonical, OG) | ✅ Padronizado nos artigos |
| Schema.org (AutoBodyShop, BlogPosting, FAQ, Breadcrumb) | ✅ Implementado |
| GEO/AEO (`llms.txt`, `llms-full.txt`, bots de IA liberados) | ✅ Implementado |
| Captura de leads (lead gate + Worker central + Google Sheets) | ✅ Em produção |
| Conteúdo do blog | 🔄 Em expansão (pauta prioritária em `PLANO_CONTEUDO_BLOG_FGCAR.md`) |
| Governança de projeto (cline rules, context, progress, templates) | ✅ Criada em 02/11/2026 |

---

## 2. Histórico de implementações

### Fase 1 — Base do site (fundação)
- Estrutura estática completa: home, 6 páginas de serviço, 5 categorias de blog e páginas institucionais (sobre, contato, política de privacidade, termos de uso).
- `style.css` com design system próprio (fundo escuro automotivo, tokens de cor, tipografia e componentes responsivos).
- `script.js` com lead gate de WhatsApp, máscara de telefone, captura de UTMs/origem GMN e armazenamento local (`fg_leads`).
- Header sticky, menu mobile drawer, barra de anúncio, subbar mobile e mega rodapé.
- `robots.txt` com liberação explícita para bots de IA e bloqueio de `/painel-leads`.

### Fase 2 — SEO técnico e GEO
- `sitemap.xml` com as URLs publicadas.
- `llms.txt` e `llms-full.txt` com NAP canônico e dossiê técnico.
- Schema `AutoBodyShop` na home e `BlogPosting` nos artigos.
- `_redirects` (www → sem-www e `pages.dev` → domínio oficial) e `_headers` (`noindex` apenas no domínio provisório).
- Renomeação de imagens com espaços/acentos para hífens e correção de referências em 9 HTMLs (commit `482eec2`).

### Fase 3 — Padronização de metadados e imagens (26/10/2026)
- `og:image` corrigido: de `.webp` com `%20` para **JPG 1200×630** (`images/og-funilaria-pintura-osasco.jpg`), aplicado em 16 HTMLs + schema da home, com `og:image:width/height/type` (commits `c0285d0` e `e444fc0`).
- `@OnlyCurrentDoc` commitado no `GOOGLE-APPS-SCRIPT-CRM.js`.
- Repositório limpo: `Imagens-GMN-Geotag/`, `artigos/*.html` antigos e `*.docx` retirados do versionamento/deploy (mantidos no disco).
- Criado `.assetsignore` e atualizado `.gitignore`.
- CRM/leads preservados integralmente.

### Fase 4 — Expansão de conteúdo (31/10 a 02/11/2026)
- Concluído o plano mestre de conteúdo (`PLANO_CONTEUDO_BLOG_FGCAR.md`): inventário, clusters e convenções.
- Publicados novos artigos, entre eles:
  - "Minha Porta Não Fecha — Pode Ser Batida Estrutural?" (`porta-nao-fecha-batida-estrutural.html`) — commits `caae282` e `5f65da4` (imagem hero).
  - "Conserto após Batida: Passo a Passo Completo" (`conserto-apos-batida-passo-a-passo-completo.html`) — commits `8625ccb` e `1ac3727`, com ajustes de breadcrumb/cabeçalho (`9fa1ac4`).
  - Correção de acentuação em `title`/`og:title` (commit `7bf231c`).
- Correções de layout em artigos (breadcrumb, cabeçalho, CTA final e links do cluster).

### Fase 5 — Governança e padronização (02/11/2026)
- Criado `.clineignore` para reduzir leitura de mídia pesada e artefatos locais.
- Criado `.clinerules` com diretrizes de estrutura semântica, CTAs/WhatsApp, CSS, SEO e deploy.
- Criado `PROJECT_CONTEXT.md` (visão geral, público, paleta, navegação, NAP).
- Criado `PROGRESS.md` (este arquivo).
- Criado `template-post-padrao.html`: base limpa de artigo com head SEO/OpenGraph, banner em 2 colunas, conteúdo + sidebar alinhada e rodapé.

### Fase 6 — Consolidação de skills, templates e auditores locais (02/11/2026)
- `.clinerules` reescrito consolidando `blog_fgcar_automotivo`, `manual_escaneabilidade_copywriting`,
  `geo-fundamentals`, `seo-fundamentals` e a regra de metadados com Takeaway:
  - 8 metadados obrigatórios em comentário HTML (Takeaway como 8º item);
  - barra de autoria azul `#f0f9ff` / `#0284c7` abaixo do H2, datas sem parênteses;
  - 2 imagens 16:9 com legenda centralizada em itálico;
  - parágrafos de 2–3 frases e link âncora `funilaria em Osasco` → home;
  - proibição de jargões técnicos visíveis (Query Fan-out, RAG, GEO, SERP...);
  - cabeçalho sticky limpo, sem barra superior, sem telefone no topo e sem botão flutuante;
  - CTA final para envio de fotos no WhatsApp com endereço físico completo;
  - seções novas: 10 (Templates) e 11 (Auditores locais).
- `template-post-padrao.html`, `template-post-cuidados-e-prevencao.html` e
  `template-post-restauracao-de-veiculos.html` atualizados: banner em coluna única com
  `H1 > H2.subtitulo-banner > barra de autoria`, capa 16:9 (`1280×720`, eager) após a autoria,
  imagem técnica 16:9 no meio do post, legendas em itálico, respiro pós-banner, âncora da home
  e CTA final com endereço + CEP. `.top-announcement` removido dos templates.
- `template-artigo.html` marcado como **descontinuado** (referência histórica), com a barra superior
  removida, capa em `loading="eager"` e CEP no CTA final.
- Criados os auditores locais `scripts/seo_checker.py` e `scripts/geo_checker.py` (pt-BR, somente leitura),
  com proteção contra pixels 1×1 no `seo_checker.py` e filtros para pular templates, `painel-leads.html`,
  `artigos/` e mídia.
- `.gitignore`, `.assetsignore` e `.clineignore` agora ignoram `scripts/`, `*.py`, `*.pyc` e `__pycache__/`.
- Diagnóstico inicial (45 páginas publicadas): SEO 56/100 e GEO 78% — nenhuma página ou artigo publicado
  foi alterado nesta fase.

### Fase 6 — Home reforçada: triagem, comparativo e rotas (04/11/2026)
- **Credibilidade:** removidas promessas absolutas ("garantia total", "retém 100% das impurezas",
  "economia de até 70%", "acertar 100% o tom").
- **Novo bloco `#triagem-fotos`:** guia de 5 fotos para orçamento via WhatsApp, entre `#como-funciona`
  e `#diferenciais`, com CTA de mensagem pré-preenchida.
- **Novo comparativo `#comparativo-pdr-repintura`:** tabela de 9 critérios dentro de `#servicos`,
  reutilizando `.service-table` / `.service-table-wrap` / `.highlight-col`.
- **Rotas regionais `#como-chegar`:** acesso por Av. dos Autonomistas, Castelo Branco/Rodoanel e
  Carapicuíba/Barueri; parágrafo de bairros reescrito e rodapé alinhado ao `areaServed`.
- **FAQ 5 → 8:** acerto de cor reescrito (prova em cartela), franquia x particular, o que é franquia e
  martelinho em amassados de estacionamento; `FAQPage` sincronizado pergunta a pergunta.
- **Schema `AutoBodyShop`:** `areaServed` em objetos (inclui Campesina, Rochdale, Quitaúna), 6º serviço
  no `hasOfferCatalog`, `url` e `provider` em cada oferta, `description`, `logo` e `hasMap`.
- **Head:** `title` de 72 → 46 caracteres, `og:site_name`, `og:image:alt`, Twitter Card e cache-buster
  do CSS atualizado.
- **Higiene técnica:** `width`/`height` em todas as `<img>`, `loading` explícito, poster do hero corrigido
  (apontava para arquivo inexistente com `%20`), iframe do Maps sem parâmetros fabricados, `h2 → h4`
  corrigido para `h3`, autoria/data visíveis na home.
- **`llms.txt`:** nova seção com triagem por foto, comparativo técnico, rotas de acesso e dúvidas comerciais.
- Resultado na home: **SEO 100/100** e **GEO 92%** (apenas o aviso de datas em `<time>`, sem erro).

### Fase 7 — Schema da home + 2 artigos técnicos + listagem no blog (04/11/2026)
- **Home:** novo nó JSON-LD `WebPage` com `datePublished` (15/01/2024) e `dateModified` (04/11/2026)
  → home em **SEO 100/100 e GEO 100%**; `aggregateRating` removido do schema (a menção 4.9 no
  Google permanece apenas no HTML visível, como prova social).
- **Novo artigo A:** `franquia-de-seguro-ou-conserto-particular-quando-compensa.html`
  (TechArticle + FAQPage + BreadcrumbList, 3 FAQs espelhadas, 100/100 SEO e 100% GEO).
- **Novo artigo B:** `recuperar-lataria-ou-trocar-peca-criterios-tecnicos.html`
  (TechArticle + FAQPage + BreadcrumbList, 3 FAQs espelhadas, 100/100 SEO e 100% GEO).
- **Listagem:** 2 cards novos no topo de `categoria-reparos-e-manutencao.html`; a página também
  recebeu Open Graph completo, `CollectionPage` + `BreadcrumbList`, autoria/data visíveis e dimensões
  em todas as capas → 45/100 para **100/100 SEO e 100% GEO**.
- **Sincronização:** 2 URLs novas no `sitemap.xml` (prioridade 0.7, lastmod 04/11/2026), `llms.txt`
  (seção de Reparos) e `llms-full.txt` (novas seções 2.5 e 2.6).
- Resultado geral: problemas SEO de 44 → 43 (com 2 páginas novas) e GEO de 30 → 28 páginas com
  pendência; nenhuma regressão.

### Fase 8 — Regularização em lote das 43 páginas legadas (04/11/2026)
- **Open Graph completo** em todas as páginas: `og:image:width/height/type` (tipo detectado pela extensão
  real do arquivo), `og:locale`, `og:site_name` e `twitter:card`; bloco OG reordenado em ordem canônica.
- **Títulos**: 34 títulos acima de 60 caracteres encurtados removendo sufixos de marca; 9 páginas com
  reescrita mínima para não deixar frase truncada.
- **Descrições**: 18 descrições acima de 155 caracteres ajustadas para a faixa 140–155 (corte em fim de
  frase quando possível); 2 descrições curtas completadas.
- **Imagens**: `width`/`height` reais injetados (dimensões medidas nos arquivos) e `loading` definido em
  todas as `<img>` — `eager` no topo e `lazy` fora da dobra.
- **Dados estruturados**: `BreadcrumbList` (ligado à home, montado a partir do breadcrumb visível) em
  todas as páginas; datas (`datePublished`/`dateModified` reais, extraídas do histórico do git) e
  `author` nos nós de artigo; `Service` com `provider` apontando para `#autobodyshop`; `CollectionPage`
  e `WebPage`/`AboutPage`/`ContactPage` nas páginas que não tinham schema.
- **Hierarquia de títulos**: `h4` do rodapé convertido para `h3` em todo o site e `h4` de conteúdo
  corrigido nas 6 páginas de serviço e em `sobre.html`; `contato.html` teve os `h3` de seção promovidos a `h2`.
- **Correção de bug estrutural pré-existente:** `<p>` órfão em `porta-nao-fecha-batida-estrutural.html`
  que deixava o aninhamento da página desbalanceado.
- **Resultado:** SEO **60/100 → 100/100** (44 páginas com problema → 0) e GEO **80% → 93%**
  (30 páginas com problema → 0). Restam apenas avisos de conteúdo (seções de FAQ ausentes e artigos
  com um único H2), fora do escopo estrutural desta fase.
- Scripts temporários do lote removidos de `scratch/` após a execução.


### Fase 9 — Reestruturação semântica da Home e desarme de canibalização (08/11/2026)
- **Diagnóstico:** auditoria completa da Home apontou densidade muito baixa para as palavras-chave centrais
  (`funilaria e pintura em Osasco` 5× = 0,20% e `funilaria em Osasco` 1× = 0,04%), ausência de resposta
  direta extraível, conflito de intenção com um artigo e uma categoria, e Home linkando apenas 1 dos 44 artigos.
- **Home — blocos novos:** parágrafo de resposta direta (`.fg-answer-box`) no topo do bloco de conteúdo
  (`#sobre-resumo`), seção discursiva `#como-escolher-oficina` (~290 palavras, 4 critérios técnicos) e hub
  `#guias-tecnicos` com 8 links para artigos-pilar.
- **Home — H2 estratégicos:** modificador local adicionado a 3 títulos (serviços, cabine de pintura e guia de fotos)
  e H2 de processo reescrito para carregar "Funilaria e Pintura".
- **Home — estrutura:** conteúdo principal agora dentro de `<main id="conteudo">` (antes as sections ficavam
  soltas entre header e footer); `dateModified` e a barra de atualização passaram para 08/11/2026.
- **Densidade final (mensurada por script, 3.009 palavras de conteúdo principal):** `funilaria e pintura em Osasco`
  **12× (0,40%)**, `funilaria em osasco` **5× (0,17%)**, `oficina de funilaria e pintura em osasco` **6× (0,20%)**,
  `funilaria` **32× (1,06%)**, `osasco` **41× (1,36%)**.
- **Schema da Home:** `streetAddress` com bairro (`3121 - Cipava`), `FAQPage` ligado ao `#webpage` via
  `mainEntityOfPage`, e `slogan`, `knowsAbout`, `paymentAccepted` e `currenciesAccepted` adicionados ao
  `AutoBodyShop`. Espelhamento FAQ visível × schema reconferido: **8 × 8, zero divergências**.
  `sameAs` e `hasMap` permanecem intocados até a definição da URL/CID do Google Perfil da Empresa.
- **Canibalização desarmada:** `oficina-de-funilaria-e-pintura-em-osasco-como-escolher` passou a
  `Como Escolher Oficina de Funilaria e Pintura em Osasco` (title, og:title, headline e H1) e
  `categoria-autoridade-local-e-intencao-de-busca` passou a `Super Dicas de Funilaria e Pintura | FG Car Osasco`
  (title, og:title, nome do schema e H1).
- **Links de retorno para a Home:** âncora exata `funilaria e pintura em Osasco` inserida em `sobre.html`,
  `contato.html` e nas 6 landing pages de serviço (antes, a frase mais valiosa do site não existia em nenhum link interno).
- **Arquitetura de links:** Home deixou de linkar 1 artigo e passou a linkar 9 (hub de 8 + o guia de escolha).
- **GEO:** bairros do `llms.txt` e do `llms-full.txt` alinhados com o que a Home realmente cita
  (removidos Cidade das Flores, Jardim das Flores, Umuarama, Presidente Altino, Continental, Butantã, Lapa e Pinheiros).
- **CSS:** componentes novos adicionados no fim de `style.css` (`.fg-answer-box`, `.fg-guide-list`, `.fg-guide-close`,
  `.fg-hub-links`) com tokens de `:root` e breakpoints 768/480; versão da folha na home → `v=20261108a`.
- **Correção pré-existente no CSS:** removidas 4 linhas duplicadas de `.main-header.fg-header-scrolled
  .mobile-toggle .bar` que estavam fora do `@media (max-width: 992px)`, com um `}` órfão (o bloco aplicava
  `!important` em todas as larguras). `style.css` voltou a 631 chaves abertas / 631 fechadas, sem fechamentos órfãos.
- **Resultado:** SEO **100/100 com 1 aviso** (o de `termos-de-uso`, dispensado por decisão editorial) e
  GEO **93% com 46 avisos**, ambos inalterados em relação à fase anterior — a entrega é de profundidade
  competitiva, não de conformidade técnica.

### Fase 10 — Sincronização do NAP oficial do Google Perfil da Empresa (08/11/2026)
- **Origem:** dados confirmados diretamente no GBP pelo cliente.
  - Número correto: **3121** (o site declarava 3151).
  - CEP correto: **06075-380** (o site declarava 06080-125).
  - Bairro oficial: **Cipava**.
- **Diagnóstico da divergência:** o CEP antigo (06080-125) corresponde ao bairro **Vila Osasco** nas bases dos
  Correios, enquanto o CEP novo (06075-380) retorna **Cipava** — confirmando que a divergência de NAP era real
  e não apenas um erro de digitação no número.
- **Substituição cirúrgica e auditada:** 230 valores trocados em **95 arquivos**
  (`3151` → `3121`: 198 ocorrências · `06080-125` → `06075-380`: 32 ocorrências), incluindo:
  - **Home:** `streetAddress`, `postalCode`, `hasMap`, texto do `FAQPage`, resposta direta, CTA da triagem,
    rodapé, links do Google Maps e do Waze e o `iframe` do mapa incorporado.
  - **Páginas:** `contato.html`, `sobre.html`, `politica-de-privacidade.html`, `termos-de-uso.html`,
    6 landing pages de serviço, 5 categorias e os 31 artigos publicados.
  - **Templates:** `template-post-padrao`, `template-post-cuidados-e-prevencao`,
    `template-post-restauracao-de-veiculos` e `template-artigo`.
  - **GEO/IA:** `llms.txt` e `llms-full.txt`.
  - **Governança:** `.clinerules` (tabelas e CTA final), `PROJECT_CONTEXT.md`, `ANALISE_PROJETO.md`,
    `PLANO_CONTEUDO_BLOG_FGCAR.md`, `_MEMORIA_PROJETO.md` e `PROGRESS.md`.
  - **Rascunhos:** os `.md` de `artigos/`, para evitar recontaminação em futuras publicações.
- **Integridade da escrita:** reescrita feita em UTF-8 com preservação do BOM por arquivo; varredura de
  U+FFFD em todos os arquivos alterados retornou **zero caractere de substituição** (nenhum acento corrompido).
- **Verificação final:** **0 ocorrências** de `3151`, `06080-125` ou `06080125` em todo o repositório.
- **Auditores:** SEO **0 problemas / 100** e GEO **0 problemas / 93%**, sem regressão. Os scripts validam
  rua, cidade e telefone (não número nem CEP), por isso não precisaram de ajuste.

### Fase 11 — Amarração do Google Perfil da Empresa ao Schema.org (08/11/2026)
- **URL curta oficial resolvida:** `https://maps.app.goo.gl/AApNdrfzaAZE6DZh7` → redireciona para a ficha
  `/maps/place/Fg+Car+Oficina+e+Funilaria+e+Pintura/@…`, da qual foram extraídos:
  - **CID:** `1676882558526959725` (decimal de `0x17457bcd6f0c306d`).
  - **URL canônica por CID:** `https://www.google.com/maps?cid=1676882558526959725` (validada, HTTP 200).
  - **Coordenadas do pino:** `-23.5516665` / `-46.7916685` (parâmetros `!3d`/`!4d`).
  - **Feature ID:** `g/11vhqf8756`.
- **Schema da home (`AutoBodyShop`):**
  - `hasMap` → URL canônica por CID (substituiu a busca textual genérica).
  - `sameAs` → Instagram + URL por CID + URL curta oficial.
  - `geo` → coordenadas exatas do pino (antes `-23.5512` / `-46.7901`).
  - `aggregateRating` → `ratingValue` 5.0 · `reviewCount` 4 · `bestRating` 5 · `worstRating` 1.
- **`/sobre` (`AboutPage`) e `/contato` (`ContactPage`):** nós `AutoBodyShop` passaram a declarar
  `@id` compartilhado (`…#autobodyshop`), `hasMap`, `sameAs` completo e `geo` — consolidando a entidade
  no mesmo nó da home em vez de três nós paralelos. `/sobre` não tinha `geo`; foi adicionado.
- **Correção de defeito no mapa de `/contato`:** o `iframe` usava um **place ID fictício**
  (`1s0x94ce55a9b1c1c1c1%3A0x1`) com coordenadas fixas. Substituído pelo embed por endereço
  (`…,3121 - Cipava, Osasco - SP, 06075-380`), o mesmo padrão já usado na home.
- **Consistência da nota:** o texto visível ainda dizia "4.9" (title, `og:description`, `twitter:description`,
  selo do hero e bloco de conteúdo). Corrigido para **5.0** — divergir do `aggregateRating` seria pior do que
  não declarar nota. Nenhuma outra página usava a menção.
- **Nota de conformidade:** o Google não exibe estrelas para *self-serving reviews* em `LocalBusiness`
  desde 2019. O `aggregateRating` foi mantido porque o dado é real e verificável no perfil, e porque
  motores de IA o usam para desambiguar a entidade — não como expectativa de rich snippet.
- **Resultado:** SEO e GEO sem regressão; JSON-LD das 3 páginas validado por parse.

### Fase 12 — Amarração de entidade nas 6 landing pages de serviço (08/11/2026)
- **Objetivo:** uniformizar o grafo local — todas as declarações de `AutoBodyShop` do site passam a apontar
  para o mesmo perfil do Google, com o mesmo CID e o mesmo pino.
- **Aplicado nas 6 landing pages** (`funilaria-de-colisao-e-batidas`, `pintura-em-estufa-climatizada`,
  `martelinho-de-ouro-express`, `recuperacao-de-para-choques`, `polimento-tecnico-e-cristalizacao`,
  `retoques-rapidos-spot-repair`), dentro do nó `provider` de cada `Service`:
  - `sameAs` → Instagram + URL por CID + URL curta oficial (antes só Instagram);
  - `hasMap` → `https://www.google.com/maps?cid=1676882558526959725` (novo);
  - `geo` → `-23.5516665` / `-46.7916685` (novo);
  - `@id` → `https://funilariaosasco.com.br/#autobodyshop` (já existia — o nó já era compartilhado com a home).
- **Escrita segura:** substituição aplicada só quando o bloco-alvo ocorria exatamente **1 vez** por arquivo,
  com detecção de EOL (LF) e preservação de BOM; JSON-LD das 6 páginas revalidado por parse: **3 blocos cada,
  0 erros**, com `provider.hasMap`, `provider.geo` e `provider.sameAs` (3 URLs) conferidos.
- **Os 2 artigos não precisaram de alteração:** `franquia-de-seguro-…` e `recuperar-lataria-…` são `TechArticle`
  e declaram a oficina como `about` com **referência pura por `@id`** — sem `sameAs`, sem `geo`, por design.
  É a forma recomendada de vincular entidades distribuídas: o nó é definido uma vez (home) e referenciado
  nas demais páginas. Duplicar ali as propriedades fragmentaria a entidade em vez de consolidá-la.
- **Estado do grafo local:** home (`AutoBodyShop` completo + `aggregateRating`) → `/sobre` e `/contato`
  (nós com o mesmo `@id`, `hasMap`, `sameAs` e `geo`) → 6 landing pages (idem) → 2 artigos (referência por `@id`).

### Fase 13 — Hero da Home: vídeo em loop substituído por imagem estática (11/11/2026)
- **Motivo:** o `<video autoplay loop>` da primeira dobra era o maior custo de LCP da home e não passava
  pelo cache de imagem. Trocado pela foto real da oficina (Porsche Taycan azul em restauração/pintura,
  com a fachada da FG Car ao fundo).
- **Processamento (`scripts/hero_image_optimize.py`, local e não publicado):** `Pillow 12.3` sobre
  `images/Funilaria e Pintura em Osasco.png` (607×332, RGBA), achatada sobre `#060913`, upscale Lanczos +
  `UnsharpMask` leve e saída WebP `method=6`:
  - `images/funilaria-pintura-osasco-restauracao-porsche-fg-car.webp` — **1280×700 · 114,4 KB** (desktop);
  - `images/funilaria-pintura-osasco-restauracao-porsche-fg-car-mobile.webp` — **768×420 · 67,8 KB** (mobile).
- **Metadados EXIF/XMP (SEO/GEO local):** `DocumentName`, `ImageDescription` ("Restauração automotiva e
  pintura profissional de Porsche realizada na oficina FG Car em Osasco SP."), `Artist`/`Copyright`
  ("FG Car Funilaria e Pintura - Osasco"), `UserComment` + `XPComment` com telefone/WhatsApp
  **+55 11 94772-7682**, endereço completo e palavras-chave; `GPSLatitude` **-23.5516665** /
  `GPSLongitude` **-46.7916685** (mesmo pino do `AutoBodyShop`) + altitude e data. Texto do EXIF gravado em
  Latin-1 (padrão ASCII do formato) e pacote XMP em UTF-8 com `photoshop:City`, `Iptc4xmpCore:Location`,
  `dc:subject` e `exif:GPS*`. Verificação por releitura (`scripts/hero_image_report.py`): acentos corretos,
  GPS e XMP presentes.
- **HTML (`index.html`):** `<video>` removido; `<picture>` com `<source media="(max-width: 768px)">` +
  `<img class="hero-bg-image" width="1280" height="700" loading="eager" fetchpriority="high"
  decoding="async">` e `alt` descritivo. Dois `rel="preload" as="image"` com `media` por breakpoint
  garantem que só o arquivo do dispositivo seja baixado.
- **CSS (`style.css`, bloco novo no fim do arquivo):** `.video-background-wrapper picture` herda a caixa do
  wrapper; `.hero-bg-image` com `object-fit: cover`, `object-position: 62% center` e `opacity: 0.72` no
  desktop. Em `≤992px` e `≤640px` a imagem repete a faixa mascarada (`top`/`height` + `mask-image`) que o
  vídeo ocupava, preservando o layout mobile sem deslocamento. Overlays (`.video-overlay`) intactos.
- **Cache-busting:** folha de estilos da home → `style.css?v=20261111a`.
- **Resultado:** SEO **0 problemas / 100 de média** (index 100/100) e GEO **0 problemas / 100% na home**
  após a mudança. Nenhum `!important` novo, nenhum token de `:root` duplicado.
- **Nota:** o antigo `videos/video-fundo.mp4` e a regra `.hero-bg-video` foram mantidos no repositório
  (regra de não reescrever seções existentes do CSS), mas não são mais usados pela home; o `script.js`
  já protegia o autoplay com `if (heroVideo)`, então a remoção do elemento não gerou erro.


---

### Fase 14 — Padronização total de URLs limpas e 301 (11/11/2026)
- **Diagnóstico em produção:** `/<slug>.html` não era indexado em duplicidade, mas o Pages respondia
  **308** pela normalização automática de HTML — e nem a regra genérica `/*.html /:splat 301!` nem a
  versão explícita por página mudavam isso. Teste controlado (`/teste301 /sobre 301`) provou que o
  `_redirects` **é** lido (respondeu 301), mas a normalização de `.html` do Pages roda **antes** dele e
  sempre devolve 308. Conclusão: `_redirects` sozinho não consegue entregar o 301 exigido.
- **Conteúdo já conforme:** varredura nas 47 páginas publicadas encontrou **0 canonicals com `.html`**,
  **0 links internos com `.html`**, **0 ocorrências em `llms.txt`/`llms-full.txt`** e sitemap 100% limpo.
  Nada de conteúdo precisou ser reescrito.
- **`functions/_middleware.js` (solução efetiva):** novo middleware de Pages Functions, sem dependências,
  que roda **antes** do asset e devolve **301** para `*.html` e para barra final, preservando a query
  string (`/contato.html?x=9` → `/contato?x=9`) e o `Location` relativo. `/index.html`, `/index` e `/index/`
  caem em `/`. Requisições `POST/PUT/PATCH/DELETE` e todos os assets passam direto por `context.next()`.
  O rewrite interno continua automático: o Pages serve `/<slug>.html` quando a rota limpa é pedida.
- **`_redirects` mantido como fonte declarativa (`scripts/generate_redirects.py`):** 101 regras estáticas
  geradas do sitemap — home, **47** `/<slug>.html → /<slug> 301!`, **47** `/<slug>/ → /<slug> 301!` e as 4
  regras de host. Serve de documentação e de rede de proteção caso a normalização de HTML do Pages mude;
  ficou **sem splat no meio do caminho** (não suportado) e com comentários em ASCII puro.
- **`.assetsignore`:** `functions/` passa a ser ignorado no upload (o Pages compila a pasta em separado),
  evitando expor o código do middleware como asset.
- **`sitemap.xml` regerado (`scripts/generate_sitemap.py --write`):** mesmas 47 URLs, mesmos `lastmod`,
  `changefreq` e `priority`, seções preservadas. Correções: BOM removido, última URL (que estava comprimida
  em uma única linha) normalizada e `</urlset>` fechado corretamente. **0 URLs com `.html`, 0 duplicatas.**
- **Novos auditores locais (não publicados):**
  - `scripts/link_checker.py` — 47 páginas, **3.573 links internos testados**, canonical × `og:url` ×
    arquivo existente, sitemap × arquivos, e cobertura/compatibilidade do `_redirects` → **0 problemas**;
  - `scripts/redirect_test.py` — simulação da semântica do Pages seguindo a cadeia de redirects:
    **145 casos, 0 falhas**, no máximo 1 salto por URL.
- **`_routes.json`:** não foi criado. Ele só serve para excluir rotas de Functions em projetos grandes; aqui a
  única função é um `_middleware.js` de borda que intercepta tudo — um `_routes.json` mal configurado
  desativaria justamente esse middleware.
- **Índice de busca:** o projeto não tem busca interna/index JSON (nenhum `fetch` de índice no `script.js`),
  então não havia gerador de índice a ajustar; a fonte de URLs continua sendo o `sitemap.xml`.
- **`robots.txt`:** mantém `Disallow: /painel-leads` e `/painel-leads.html` (defesa em profundidade após o 301).
- **Resultado em produção (11/11/2026, após deploy):** `/sobre.html` **301** → `/sobre`; `/sobre/` **301** →
  `/sobre`; `/index.html` **301** → `/`; `/contato.html?x=9` **301** → `/contato?x=9`; artigo com `.html`
  **301** → URL limpa; rotas limpas **200** com `canonical` correto; seguir os redirects termina em **200**
  em **1 salto** (sem loop); `/style.css`, `/script.js`, `/sitemap.xml`, `/robots.txt`, `/llms.txt` e as
  imagens seguem **200**. SEO **0 problemas / 100** e GEO **0 problemas / 93%** (avisos pré-existentes).
- **Ponto aberto resolvido na Fase 15:** `www.funilariaosasco.com.br` respondia 200 com o mesmo conteúdo;
  a consolidação para o apex passou a ser feita pelo próprio middleware.


### Fase 15 — Consolidação www → apex no middleware (11/11/2026)
- **Problema:** `https://www.funilariaosasco.com.br/...` respondia **200** com o mesmo conteúdo do apex
  (duplicidade de host). As regras de host do `_redirects` não são aplicadas nesse projeto — só as de path.
- **Solução em `functions/_middleware.js`:** checagem de host no início do `onRequest`. Quando o host é
  exatamente `www.funilariaosasco.com.br`, responde **301** para `https://funilariaosasco.com.br` +
  caminho **já limpo** + query string. Como a rota sai limpa do próprio middleware, `www/sobre.html` chega
  ao apex em **um único salto** (sem cadeia): `https://funilariaosasco.com.br/sobre`.
- **Isolamento de ambiente (regra estrita):** apenas o host `www.funilariaosasco.com.br` é interceptado.
  `localhost`, `127.0.0.1` e qualquer `*.pages.dev` (preview de branch ou de produção) seguem apenas com a
  regra de `.html`/barra final, em `Location` **relativo** — nunca são empurrados para o apex. Requisições
  que não são `GET/HEAD` continuam passando por `context.next()`.
- **Refatoração:** a normalização de rota virou a função `caminhoLimpo()` (barra final, `.html`, `/index`),
  reaproveitada tanto no redirect de host quanto no de rota.
- **Teste local (`scripts/middleware_test.mjs`, Node 22, sem dependências):** o arquivo é importado como ESM
  via data URL e exercitado com `Request`/`Response` reais — **23 casos, 0 falhas**, cobrindo www (raiz, rota
  limpa, `.html`, barra final, `index.html`, query string, http→https, artigo), apex, `localhost:8788`,
  `127.0.0.1`, `pages.dev` (produção e preview com hash) e `POST`. Cadeia de saltos medida: **1 salto** em
  todos os casos testados.
- **Validação em produção (11/11/2026):**
  - `www/` → **301** `Location: https://funilariaosasco.com.br/`
  - `www/sobre` → **301** `Location: https://funilariaosasco.com.br/sobre`
  - `www/sobre.html` → **301** `Location: https://funilariaosasco.com.br/sobre` (1 salto)
  - `www/contato.html?x=9` → **301** `Location: https://funilariaosasco.com.br/contato?x=9`
  - `www` em http → **301** para o apex em https
  - `apex/sobre.html` → **301** `/sobre` e `apex/sobre` → **200** (regra anterior preservada)
  - `fgcar-funilaria.pages.dev/sobre` → **200** e `.../sobre.html` → **301** `/sobre` (relativo, preview intacto)
  - Seguindo os redirects: **200** em `https://funilariaosasco.com.br/<rota>` com **1 salto**, sem loop.
- **Auditores:** `link_checker.py` e `redirect_test.py` seguem em **0 problemas / 0 falhas**; SEO e GEO sem
  alteração (nenhum HTML foi tocado).


## 3. Pendências

### Conteúdo
- [ ] Publicar os artigos prioritários do cluster pós-acidente (`PLANO_CONTEUDO_BLOG_FGCAR.md`, seção 4).
- [ ] Cobrir o cluster de preços/valores (intenção comercial alta).
- [ ] Revisar e atualizar os 26+ artigos antigos com o padrão de metadados atual (8 itens, Takeaway por último).
- [ ] Incluir FAQ + schema `FAQPage` nos artigos que ainda não têm.

### SEO / GEO
- [ ] Revisar `lastmod` do `sitemap.xml` após cada publicação.
- [ ] Auditar links internos (clusters por categoria) e corrigir órfãos.
- [x] Monitorar Core Web Vitals (peso das capas e do vídeo de fundo da home). — vídeo em loop removido em 11/11/2026 (Fase 13); segue o acompanhamento das capas.
- [ ] Validar rich results (BlogPosting/FAQ) no Search Console.
- [ ] **`og:locale` ausente** em 44 das 45 páginas publicadas (só a home declara o locale).
- [x] Home sem `og:site_name` (resolvido em 04/11/2026, junto com `og:image:alt` e Twitter Card); 29 artigos sem `og:image:width/height/type`.
- [ ] 25 páginas sem `datePublished`/`dateModified` no JSON-LD (só têm data visível).
- [ ] 16 páginas sem autoria identificada no schema; 7 sem JSON-LD (legais, categorias e contato).
- [ ] Revisar títulos com mais de 60 caracteres e descrições fora de 140–155.

### SEO local — bloqueios de entidade (aberto em 08/11/2026)
- [x] **Google Perfil da Empresa amarrado ao schema (08/11/2026):** `hasMap` e `sameAs` passaram a usar a URL
      canônica por CID (`https://www.google.com/maps?cid=1676882558526959725`) e a URL curta oficial
      (`https://maps.app.goo.gl/AApNdrfzaAZE6DZh7`) na home, em `/sobre` e em `/contato`. Ver Fase 11.
- [x] **NAP sincronizado com o GBP (08/11/2026):** número **3121** e CEP **06075-380** (bairro **Cipava**) aplicados
      em 95 arquivos. O valor anterior (3151 / 06080-125) apontava para o bairro Vila Osasco nos Correios e estava
      errado em todo o site. Ver Fase 10.
- [x] **Coordenadas exatas do pino (08/11/2026):** `geo` atualizado para `-23.5516665` / `-46.7916685`, extraídas
      do parâmetro `!3d`/`!4d` da URL resolvida do perfil. Ver Fase 11.
- [x] **`aggregateRating` (08/11/2026):** implementado com os dados reais do perfil — 5.0 · 4 avaliações · melhor 5.
      As menções visíveis ("4.9") foram corrigidas para 5.0 no title, nas descriptions e no selo do hero.
      **Nota:** o Google não exibe estrelas de *self-serving reviews* para `LocalBusiness`; o dado permanece
      válido para desambiguação de entidade por motores de IA.
- [x] **Nome da entidade:** confirmado pelo cliente que o GBP usa "FG Car Oficina **e** Funilaria e Pintura",
      igual ao site — item encerrado sem alteração de grafia.
- [x] **Amarração replicada nas 6 landing pages de serviço (08/11/2026):** `hasMap` por CID, `sameAs` com as
      três URLs e `geo` exato dentro do nó `provider`/`AutoBodyShop`. Ver Fase 12.
- [x] **Os 2 artigos já estavam corretos:** `franquia-…` e `recuperar-lataria-…` usam
      `about: { "@type": "AutoBodyShop", "@id": "…#autobodyshop" }` — **referência pura ao nó**, sem `sameAs`
      próprio. (A anotação anterior desta lista dizia que tinham `sameAs` só do Instagram: estava equivocada.)
      Manter a referência por `@id` é o padrão recomendado; duplicar propriedades ali fragmentaria a entidade
      em vez de consolidá-la.

### Performance
- [ ] LCP do hero: vídeo de fundo de 2,1 MB com `autoplay`; avaliar `preload="none"` e carregamento pós-`load`
      (exige alteração no `script.js`, que é arquivo protegido).
- [ ] Limpar `images/`: PNGs não referenciados (7,8 MB, 7,5 MB e 6,8 MB) e arquivos com espaço no nome,
      que contrariam a convenção de nomes do `.clinerules` §5.3.

### Infra / operação
- [ ] Manter `_headers` limitado ao domínio provisório (revisar ao migrar de Pages para Workers).
- [ ] Documentar rotina de backup da planilha de leads (Google Sheets).
- [ ] Confirmar mensalmente o NAP do site x Google Perfil da Empresa.

### Técnico / dívida
- [ ] Substituir estilos inline remanescentes dos artigos por classes em `style.css` (sem alterar visual).
- [ ] Unificar `template-artigo.html` (legado) com `template-post-padrao.html` após validação do novo padrão.
- [ ] Criar rotina de verificação automática de HTML/JSON-LD (`scratch/`).

---

## 4. Decisões registradas

| Data | Decisão | Motivo |
|---|---|---|
| 26/10/2026 | Não versionar `Imagens-GMN-Geotag/`, `artigos/*.html` e `*.docx` | Peso e risco de conteúdo duplicado; acervo permanece no disco |
| 26/10/2026 | `og:image` único 1200×630 em JPG | Compatibilidade com WhatsApp/Facebook/LinkedIn |
| 26/10/2026 | Manter backend de leads no Worker central SOSSEO | Já funciona e preserva o CRM atual |
| 02/11/2026 | Artigos na raiz são a fonte publicada; `artigos/` guarda só `.md` | Evita duplicidade de URLs |
| 02/11/2026 | Novo template com banner 2 colunas + sidebar | Melhor escaneabilidade, mais CTAs, padrão visual único |

---

## 5. Como atualizar este documento

1. Ao concluir uma tarefa, adicione uma linha na seção **Histórico** dentro da fase/data correspondente.
2. Marque o item concluído em **Pendências** (`[x]`) e registre novas pendências descobertas.
3. Se houver mudança de arquitetura, infraestrutura ou identidade visual, atualize também `PROJECT_CONTEXT.md` e `ANALISE_PROJETO.md`.

---

## 6. Backlog Editorial: Refinamento de Escaneabilidade (16 Artigos)

> Registrado em **04/11/2026**. A auditoria de GEO aponta 16 artigos publicados com **apenas 1 `<h2>`**
> de seção. São textos longos sustentados por um único subtítulo, o que prejudica a escaneabilidade
> (parágrafos extensos sem quebra visual) e a extração de trechos por motores de IA.
>
> **Decisão:** a divisão em subtítulos adicionais será feita **gradualmente**, artigo por artigo, junto com
> as próximas revisões de conteúdo — não é uma alteração estrutural em lote. Cada intervenção deve
> preservar a redação original, apenas promovendo trechos já existentes a `<h2>`/`<h3>` e respeitando a
> hierarquia `h1 > h2 > h3` sem pular níveis.
>
> Enquanto a revisão não acontece, o aviso permanece como **informativo** (não é defeito de marcação):
> todos os 16 artigos estão com `0` problemas nos auditores e com nota SEO 100/100.

- [ ] `arrumar-funilaria-antes-de-vender-ou-negociar-assim-mesmo.html`
- [ ] `colorimetria-digital-acerto-exato-da-cor-original.html`
- [ ] `como-encontrar-uma-boa-oficina-de-funilaria.html`
- [ ] `como-proteger-o-carro-do-sol-e-da-chuva.html`
- [ ] `como-saber-se-a-oficina-de-pintura-e-confiavel.html`
- [ ] `cuidados-basicos-para-evitar-ferrugem-na-lataria.html`
- [ ] `de-quanto-em-quanto-tempo-polir-o-carro.html`
- [ ] `manchas-na-pintura-causas-e-como-remover.html`
- [ ] `materiais-premium-secagem-em-estufa-repintura-excelencia.html`
- [ ] `muito-alem-da-estetica-tintas-alta-performance-protegem-lataria.html`
- [ ] `o-barato-que-custa-caro-riscos-pintura-automotiva-baixo-custo.html`
- [ ] `o-que-avaliar-em-um-orcamento-de-funilaria-e-pintura.html`
- [ ] `oficina-de-funilaria-e-pintura-em-osasco-como-escolher.html`
- [ ] `por-que-um-bom-servico-de-pintura-valoriza-seu-carro-na-revenda.html`
- [ ] `porta-nao-fecha-batida-estrutural.html`
- [ ] `tecnicas-modernas-de-pintura-automotiva-acabamento-de-fabrica.html`

### Nota técnica — CTAs em `termos-de-uso.html`

O auditor de SEO mantém **um** aviso no site: `apenas 2 CTA(s) de WhatsApp (recomendado 3+)` em
`termos-de-uso.html`. Esse aviso está **dispensado por decisão editorial**: a página é
**institucional/jurídica**, cujo objetivo é informar condições de uso — não converter. Forçar um terceiro
CTA comercial em um documento legal piora a experiência e o próprio enquadramento jurídico do texto.

- Regra: o requisito de **3+ pontos de conversão** do `.clinerules` (§4) vale para home, serviços,
  categorias e artigos — **não** para páginas legais (`termos-de-uso.html`, `politica-de-privacidade.html`).
- Estado atual: os 2 CTAs existentes (cabeçalho e subbar mobile) permanecem intactos.
- Consequência aceita: a média de SEO do domínio fica em **100/100 com 1 aviso informativo**, e não
  100/100 sem avisos.

