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
- [ ] Home sem `og:site_name`; 29 artigos sem `og:image:width/height/type`.
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

