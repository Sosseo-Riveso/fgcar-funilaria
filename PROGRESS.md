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


---

## 3. Pendências

### Conteúdo
- [ ] Publicar os artigos prioritários do cluster pós-acidente (`PLANO_CONTEUDO_BLOG_FGCAR.md`, seção 4).
- [ ] Cobrir o cluster de preços/valores (intenção comercial alta).
- [ ] Revisar e atualizar os 26+ artigos antigos com o padrão de metadados atual (8 itens, Takeaway por último).
- [ ] Incluir FAQ + schema `FAQPage` nos artigos que ainda não têm.

### SEO / GEO
- [ ] Revisar `lastmod` do `sitemap.xml` após cada publicação.
- [ ] Auditar links internos (clusters por categoria) e corrigir órfãos.
- [ ] Monitorar Core Web Vitals (peso das capas e do vídeo de fundo da home).
- [ ] Validar rich results (BlogPosting/FAQ) no Search Console.
- [ ] **`og:locale` ausente** em 44 das 45 páginas publicadas (só a home declara o locale).
- [x] Home sem `og:site_name` (resolvido em 04/11/2026, junto com `og:image:alt` e Twitter Card); 29 artigos sem `og:image:width/height/type`.
- [ ] 25 páginas sem `datePublished`/`dateModified` no JSON-LD (só têm data visível).
- [ ] 16 páginas sem autoria identificada no schema; 7 sem JSON-LD (legais, categorias e contato).
- [ ] Revisar títulos com mais de 60 caracteres e descrições fora de 140–155.

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

