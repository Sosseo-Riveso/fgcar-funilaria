# Análise Técnica — FG Car Oficina Funilaria e Pintura

> Documento de entendimento do projeto registrado em 26/10/2026. Atualizado em 26/10/2026 (2ª sessão: correções aplicadas).
> Projeto: site da **FG Car Oficina e Funilaria e Pintura** (Osasco/SP) — **cliente com contrato fechado** (dono aguardando ranqueamento).

---

## 1. Identificação e Infraestrutura

| Item | Valor |
|---|---|
| **Site** | https://funilariaosasco.com.br/ |
| **Pasta local** | `c:\Users\Reinaldo\Desktop\SOSSEO_sites\fgcar-funilaria` |
| **Repositório Git** | `https://github.com/Sosseo-Riveso/fgcar-funilaria.git` |
| **Branch** | `main` |
| **Hospedagem** | **Cloudflare Pages** (SEM Worker próprio — site estático puro) |
| **Deploy** | Automático via `git push` (GitHub → Cloudflare Pages) |
| **Backend de leads** | Worker central SOSSEO: `https://sosseo-crm.sosseosites.workers.dev/api/fgcar-leads` + Webhook Google Sheets próprio |
| **Google Perfil da Empresa** | **FG Car Oficina e Funilaria e Pintura** (verificado — dados reais do negócio) |
| **WhatsApp / Telefone** | `+55 11 94772-7682` (`wa.me/5511947727682`) — **número real do cliente** |

### Como funciona o deploy
- Site **100% estático** (HTML + CSS `style.css` + JS `script.js`), servido pelo **Cloudflare Pages** — **ao contrário dos pilotos de câmbio, NÃO há `worker.js`/`wrangler.json`/Pages Functions** no repositório.
- O arquivo `_redirects` força:
  - `www.funilariaosasco.com.br/*` → `funilariaosasco.com.br/:splat` (301, remoção do www);
  - `fgcar-funilaria.pages.dev/*` (provisório) → domínio oficial (301).
- O arquivo `_headers` bloqueia indexação (`noindex, nofollow`) apenas no domínio provisório `.pages.dev`.
- `.gitignore`: ignora `~$*` (temporários do Word), `*.tmp` e `scratch/` (scripts utilitários locais).
- **Não há `.assetsignore`** (não é necessário — sem Worker na raiz).

---

## 2. Estrutura de Pastas e Arquivos

```
fgcar-funilaria/
├── .git/                        # Repositório Git (GitHub Sosseo-Riveso)
├── artigos/                     # Versões .html e .md dos artigos do blog (21 .md + html)
├── images/                      # ~74 imagens (JPG/WebP/PNG) — capas e fotos técnicas; subpasta Conserto/
├── Imagens-GMN-Geotag/         # Acervo de imagens geotagadas do Google Perfil (1-Postagens/2-Acervo/3-Produtos)
├── scratch/                     # Scripts utilitários de auditoria do projeto (audit_schemas.js, etc.) — ignorado no git
├── videos/                      # Vídeo de fundo (video-fundo.mp4)
├── *.html                       # Home + 7 páginas de serviço + 5 categorias + 26+ artigos + páginas institucionais + painel
├── script.js                    # Sistema de captura de leads (lead gate, UTM, webhook, storage fg_leads)
├── style.css                    # CSS principal (design editorial próprio, ~88 KB)
├── GOOGLE-APPS-SCRIPT-CRM.js    # Webhook Google Sheets (Mini CRM FG Car)
├── llms.txt                     # Resumo GEO/AEO com NAP canônico
├── llms-full.txt                # Dossiê técnico completo para IAs (o mais completo dos projetos)
├── sitemap.xml                  # 43 URLs
├── robots.txt                   # Permite bots de IA (GPTBot, ClaudeBot, PerplexityBot etc.) + bloqueia /painel-leads
├── _headers                     # noindex no domínio provisório .pages.dev
├── _redirects                   # 301: www + pages.dev → domínio oficial
├── .gitignore                   # ~$*, *.tmp, scratch/
├── favicon.ico / favicon.png    # Favicons (300x300 png)
├── README.md                    # "Site FG Car Funilaria e Pintura"
├── Artigos para criar no Blog FG Car Oficina.docx   # Planejamento (ignorado: ~$* do Word)
└── 📋 Planejamento da Reunião com o Dono da FG Car.docx
```
---

## 3. Páginas do Site

### Páginas de serviço (raiz)
| Arquivo | Slug / URL |
|---|---|
| `index.html` | `/` (Home — Funilaria e Pintura em Osasco) |
| `funilaria-de-colisao-e-batidas.html` | `/funilaria-de-colisao-e-batidas` |
| `martelinho-de-ouro-express.html` | `/martelinho-de-ouro-express` (PDR) |
| `pintura-em-estufa-climatizada.html` | `/pintura-em-estufa-climatizada` |
| `polimento-tecnico-e-cristalizacao.html` | `/polimento-tecnico-e-cristalizacao` |
| `recuperacao-de-para-choques.html` | `/recuperacao-de-para-choques` |
| `retoques-rapidos-spot-repair.html` | `/retoques-rapidos-spot-repair` |
| `o-que-e-repuxo-automotivo-e-quando-fazer.html` | `/o-que-e-repuxo-automotivo-e-quando-fazer` |

### Páginas de categoria (hub de artigos)
`categoria-autoridade-local-e-intencao-de-busca.html`, `categoria-cuidados-e-prevencao.html`, `categoria-pintura-automotiva-e-estetica.html`, `categoria-reparos-e-manutencao.html`, `categoria-restauracao-de-veiculos.html`

### Artigos do blog (26+ na raiz; alguns duplicados em `artigos/` com versão `.md`)
Exemplos: `diferenca-entre-funilaria-tradicional-e-martelinho-de-ouro.html`, `quanto-custa-restaurar-um-carro-antigo.html`, `polimento-tecnico-e-cristalizacao.html`, `tecnicas-modernas-de-pintura-automotiva-acabamento-de-fabrica.html`, etc.

### Páginas institucionais
`sobre.html`, `contato.html`, `politica-de-privacidade.html`, `termos-de-uso.html`

### Painel interno (protegido)
`painel-leads.html` — Mini CRM; **senha padrão `fgcar2026`** (alterável); bloqueado no `robots.txt` e com `noindex`.
---

## 4. Sistema de Captura de Leads / CRM

**Arquitetura diferente dos pilotos de câmbio:** o FG Car **não tem Worker próprio** — usa o **Worker CRM central da SOSSEO** (`sosseo-crm.sosseosites.workers.dev`) que também atende os demais sites do portfólio.

### Camada 1 — Frontend (`script.js`)
- **Lead Gate (WhatsApp Popup):** modal `fgLeadModal` intercepta cliques em `wa.me`/`whatsapp.com`, pede nome + telefone antes de abrir o WhatsApp.
- **Máscara de telefone** em inputs `[name=telefone]`/`[name=whatsapp]`.
- **Captura de UTMs/GMN:** `sessionStorage` (`fg_utm_source/medium/campaign`), detecta tráfego de Google Maps/Perfil da Empresa (`google-maps-referrer`).
- **Storage local:** `localStorage` chave `fg_leads` (array com nome, telefone, página, origem, tipo, timestamp).
- **Envio em 2 frentes** (via `window.fgTrackLead`):
  1. **`POST https://sosseo-crm.sosseosites.workers.dev/api/fgcar-leads`** (Cloudflare KV central — `keepalive`);
  2. **Webhook Google Sheets** — URL padrão `FG_DEFAULT_WEBHOOK_URL` (Google Apps Script da FG Car) ou configurada em `localStorage.fg_webhook_url` (`mode: no-cors`).
- **Baralho flutuante de imagens** (`initFgCarShuffle`) e demais interações do site também no `script.js`.

### Camada 2 — Worker central (não está neste repositório)
- O endpoint `sosseo-crm.sosseosites.workers.dev/api/fgcar-leads` é o CRM SOSSEO centralizado (compartilhado entre os sites dos clientes SOSSEO). O repositório deste Worker **não é o fgcar-funilaria**.

### Camada 3 — Webhook Google Sheets (`GOOGLE-APPS-SCRIPT-CRM.js`)
- Apps Script da planilha de leads da FG Car (mesmo padrão dos demais: `doGet` lista, `doPost` registra e suporta `clear`/`delete`/`delete_month`/`prune_year`).
- ⚠️ **Alteração pendente (não commitada):** foi adicionada a diretiva `@OnlyCurrentDoc` na 1ª linha do arquivo (ainda não commitada no git).

### Painel de Gestão (`painel-leads.html`)
- **Senha:** padrão `fgcar2026` (configurável em `localStorage fg_admin_pass`).
- **Cloud API:** `https://sosseo-crm.sosseosites.workers.dev/api/fgcar-leads` (GET para listar leads do KV).
- **Webhook Google Sheets:** `DEFAULT_WEBHOOK` + configuração por `localStorage.fg_webhook_url`.
- Botões de limpeza/exclusão com deduplicação via `localStorage` (assinaturas deletadas).

---

## 5. SEO / GEO / AEO (Estratégia de Conteúdo)

- **Entidade local REAL:** schema `AutoBodyShop` na home com **endereço físico verdadeiro** (Av. Visconde de Nova Granada, 3151 — Cipava, Osasco/SP, CEP 06080-125), **telefone real**, **geo (lat/long)**, **horários**, **Instagram** (`@fgcar_oficina`) e **OfferCatalog** com serviços. — **Correto e legítimo** (diferente dos pilotos de câmbio, aqui o negócio é real e o contrato está fechado).
- **Schema por página de serviço:** `Service` + `provider` (`AutoBodyShop`) com NAP completo + `areaServed`.
- **Schema por artigo:** `Article` + `author`/`publisher` (FG Car) + `FAQPage` em muitos artigos.
- **GEO:** `llms.txt` + `llms-full.txt` (dossiê técnico mais extenso dos projetos: ficha NAP, protocolos técnicos de estufa/colorimetria/martelinho PDR/para-choques, FAQ).
- **robots.txt:** permite **todos os bots de IA** (GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Applebot, CCBot) + Googlebot/Bingbot/Yandex.
- **Sitemap:** 43 URLs.
- **Redirecionamentos:** `_redirects` remove `www` e domínio provisório.
- **Blog por categorias:** 5 hubs de categoria + artigos longos com cabeçalho/FAQ.
- **Skill específica do projeto:** `.agent/skills/blog_fgcar_automotivo/SKILL.md` (aplicada na criação de conteúdo do blog FG Car).
---

## 6. Skills Encontradas (pasta `.agent`)

As Skills estão no workspace em `c:\Users\Reinaldo\Desktop\SOSSEO_sites\.agent\skills\`:

- **`blog_fgcar_automotivo/SKILL.md`** ⭐ — **Skill específica deste projeto!** Diretrizes do blog da FG Car: URLs/nomenclatura (slug da palavra-chave), metadados internos em comentário HTML (8 itens com Conclusão Estratégica), subtítulo (H2) limpo + barra de autoria/data, 2 imagens 16:9, escaneabilidade (2-3 frases/parágrafo), link estratégico para home com âncora, layout (cabeçalho sticky sem telefone, sem botão flutuante verde), CTA final e deploy Git/Cloudflare.
- **`redator_geo_seo`** — redação GEO/SEO modular (aplicável a novos artigos).
- **`geo-fundamentals`** / **`seo-fundamentals`** — fundamentos GEO/SEO (com scripts Python de auditoria).
- **`manual_escaneabilidade_copywriting`** — escaneabilidade e copywriting.
- **`linkedin_artigos_newsletter`** / **`linkedin_prospeccao_b2b`** — LinkedIn B2B.
- **`GMB_SRE_SEO.md`** — Google Perfil da Empresa (SEO local + copy).

Regra obrigatória em `.agent/rules/metadados_artigos.md`: artigos devem ter a **Conclusão Estratégica (Takeaway)** como último item dos metadados.

---

## 7. Observações e Pendências Encontradas

### ✅ O que está correto (e NÃO mexer)
- **Schema `AutoBodyShop` com dados reais** (endereço, telefone, geo, horários, Instagram) — **legítimo**, pois o contrato está fechado e o GMN existe. Diferente dos pilotos de câmbio.
- **robots.txt** completo para IAs + tradicionais.
- **llms.txt / llms-full.txt** com NAP canônico completo.
- **Redirecionamento www → sem-www** e `pages.dev` → domínio oficial.
- **`_headers`** bloqueando indexação do domínio provisório (correto).

### ✅ CORREÇÕES APLICADAS (26/10/2026 — commit `c0285d0` e `e444fc0`)
1. **og:image corrigido** — trocado de `.webp` com espaços `%20` para **JPG otimizado 1200×630** (`images/og-funilaria-pintura-osasco.jpg`, criado a partir de `Funilaria e Pintura em Osasco.jpg` 3008×1408). Aplicado em **16 HTML** + schema `image` da home, adicionando `og:image:width/height/type`.
2. **`@OnlyCurrentDoc` commitado** no `GOOGLE-APPS-SCRIPT-CRM.js` (estava pendente).
3. **Repositório organizado/limpo:**
   - `Imagens-GMN-Geotag/` (84 MB, acervo de trabalho do GMN, **não usado pelo site**) — removido do versionamento/deploy (arquivos **mantidos no disco local**);
   - `artigos/*.html` (cópias **antigas/divergentes** dos artigos da raiz, com links relativos quebrados — gerariam conteúdo duplicado em `/artigos/*.html`) — removidos do versionamento/deploy, mantidos no disco; **os `.md` (fontes) permanecem versionados**;
   - `*.docx` (documentos internos de planejamento) — removidos do versionamento/deploy, mantidos no disco;
   - Criado **`.assetsignore`** (padrão Cloudflare dos demais projetos) e atualizado `.gitignore`.
4. **CRM/leads INTOCADOS** (conforme solicitado): `script.js`, `painel-leads.html`, `GOOGLE-APPS-SCRIPT-CRM.js` e o endpoint central `sosseo-crm.sosseosites.workers.dev/api/fgcar-leads` permanecem exatamente como estão — os registros de leads são mantidos.

### ⚠️ Pendências restantes (não bloqueantes)
- **Dependência do Worker central SOSSEO** para o backend de leads (ver seção 4) — por decisão, manter como está (funciona e mantém o CRM atual).
- **`artigos/` como fonte `.md`**: manter apenas `.md` versionados (fonte de edição); a raiz é a fonte publicada. Não recriar `.html` dentro de `artigos/`.

---

## 8. Pontos de Atenção / Convenções
- **Domínio canônico:** `funilariaosasco.com.br` (sem `www`).
- **Nomes de arquivo:** slug da palavra-chave, minúsculas + hífens.
- **`robots.txt`:** bloqueia `/painel-leads` e `/painel-leads.html`.
- **Deploy:** `git push` → Cloudflare Pages (sem build, estático puro). Sobe apenas o que está versionado.
- **Não versionar** (`gitignore`/`assetsignore`): `scratch/`, `*.docx`, `~$*`, `Imagens-GMN-Geotag/`, `artigos/*.html`. Essas pastas/arquivos ficam só no disco local.
- **`artigos/`:** manter somente `.md` (fonte de edição); a raiz é a fonte publicada.
- **GMN:** "FG Car Oficina e Funilaria e Pintura" — verificado; NAP do site deve bater 100% (nome, Av. Visconde de Nova Granada 3151, CEP 06080-125, tel +55 11 94772-7682).
- **Skill aplicável:** `blog_fgcar_automotivo` para novos artigos; `redator_geo_seo` como base.