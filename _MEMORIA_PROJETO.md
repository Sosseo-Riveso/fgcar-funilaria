# _MEMORIA_PROJETO — FG Car Oficina Funilaria e Pintura

> **Memória operacional do projeto.** Resume rotas, arquitetura visual, recursos essenciais e convenções.
> Leia junto com `PROJECT_CONTEXT.md`, `PROGRESS.md` e `.clinerules`.
> Última atualização: **02/11/2026**.

---

## 1. Ficha técnica

| Item | Valor |
|---|---|
| **Site** | https://funilariaosasco.com.br/ |
| **Domínio canônico** | sem `www`; `www` e `*.pages.dev` são redirecionados por `_redirects` |
| **Repositório** | `https://github.com/Sosseo-Riveso/fgcar-funilaria.git` (branch `main`) |
| **Deploy** | Cloudflare Pages — automático a cada `git push`, sem build |
| **Stack** | HTML + CSS + JavaScript puro (100% estático) |
| **Nenhum** | framework, bundler, npm, CMS ou WordPress |
| **CSS global** | `style.css` (`:root` com tokens de cor e tipografia) |
| **JS global** | `script.js` (lead gate, máscara de telefone, UTMs, envio de leads) |
| **Fontes** | Google Fonts — Plus Jakarta Sans + Space Grotesk (artigos); Montserrat/Inter nos tokens base |
| **Leads** | `https://sosseo-crm.sosseosites.workers.dev/api/fgcar-leads` + Google Sheets (`GOOGLE-APPS-SCRIPT-CRM.js`) |
| **NAP** | FG Car Oficina e Funilaria e Pintura · Av. Visconde de Nova Granada, 3151 — Cipava, Osasco/SP — CEP 06080-125 · +55 11 94772-7682 |

**Horário:** seg–sex 08:00–18:00 · sáb 08:00–12:00.

---

## 2. Arquitetura de entrega

```
GitHub (main)
   │  git push
   ▼
Cloudflare Pages (sem build, assets estáticos)
   │
   ├── HTML da raiz        → páginas publicadas
   ├── style.css / script.js → CSS e JS globais
   ├── images/ + videos/   → mídia
   ├── _headers            → noindex apenas em *.pages.dev
   └── _redirects          → 301: www e pages.dev → domínio oficial
```

- A **raiz do repositório é a fonte publicada**. `artigos/` guarda somente os `.md` de edição.
- `.assetsignore` controla o que **não** sobe no deploy (docs, mídia pesada, templates, cópias antigas).
- `.gitignore` controla o que **não** entra no Git (caches, logs, temporários).
- `.clineignore` evita leitura de pastas pesadas por agentes de IA.

### Fluxo de lead
1. Visitante clica em qualquer link `wa.me/5511947727682`.
2. `script.js` intercepta o clique e abre o modal `fgLeadModal` (nome + telefone).
3. Os dados são enviados ao Worker central e registrados no Google Sheets.
4. O WhatsApp é aberto com a mensagem original codificada.

> Por isso é obrigatório manter as classes dos botões e o formato exato dos links de WhatsApp.

---

## 3. "Plugins" e recursos essenciais

O site **não usa WordPress**, portanto **não existem** `wp-content/`, `wp-includes/`, `wp-content/plugins/` nem plugins instalados. As regras para esses caminhos no `.assetsignore` são **preventivas**.

| Recurso | Onde vive | Função | Pode alterar? |
|---|---|---|---|
| CSS global | `style.css` | Design system, layout, componentes, responsividade | Sim, com cuidado (bloco comentado ao final) |
| JS global | `script.js` | Lead gate, máscara, UTMs, envio de leads | **Não** sem pedido explícito |
| CRM/Webhook | `GOOGLE-APPS-SCRIPT-CRM.js` | Registro em Google Sheets | **Não** |
| Painel de leads | `painel-leads.html` | Consulta interna de leads | **Não** |
| Fontes | Google Fonts | Tipografia dos artigos | Evitar trocar |
| Schema.org | JSON-LD inline no HTML | `AutoBodyShop`, `BlogPosting`, `FAQPage`, `BreadcrumbList` | Sim, mantendo NAP |
| Indexação | `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` | SEO e GEO/AEO | Ajustar apenas o necessário |

**Regra de ouro:** nenhum arquivo essencial (CSS, JS, imagens, vídeos, HTML, includes, plugins) pode ser bloqueado no `.assetsignore`.

---

## 4. Rotas do site

Todas as URLs são **sem `.html`** (o `_redirects` remove a extensão).

### 4.1 Institucionais
| Rota | Arquivo |
|---|---|
| `/` | `index.html` |
| `/sobre` | `sobre.html` |
| `/contato` | `contato.html` |
| `/politica-de-privacidade` | `politica-de-privacidade.html` |
| `/termos-de-uso` | `termos-de-uso.html` |

### 4.2 Serviços
`/funilaria-de-colisao-e-batidas` · `/pintura-em-estufa-climatizada` · `/martelinho-de-ouro-express` · `/recuperacao-de-para-choques` · `/polimento-tecnico-e-cristalizacao` · `/retoques-rapidos-spot-repair`

### 4.3 Categorias do blog
| Rota | Escopo |
|---|---|
| `/categoria-reparos-e-manutencao` | Reparos e manutenção de lataria |
| `/categoria-pintura-automotiva-e-estetica` | Pintura e estética |
| `/categoria-restauracao-de-veiculos` | Restauração de clássicos |
| `/categoria-cuidados-e-prevencao` | Cuidados e prevenção |
| `/categoria-autoridade-local-e-intencao-de-busca` | Super Dicas FGCar / escolha de oficina |

### 4.4 Artigos publicados (por categoria primária)

**Reparos e Manutenção (6):**
`/conserto-apos-batida-passo-a-passo-completo` · `/diferenca-entre-funilaria-tradicional-e-martelinho-de-ouro` · `/o-que-e-repuxo-automotivo-e-quando-fazer` · `/pequenos-amassados-que-precisam-de-funilaria` · `/por-que-adiar-reparo-de-funilaria-sai-mais-caro` · `/porta-nao-fecha-batida-estrutural`

**Pintura Automotiva e Estética (10):**
`/colorimetria-digital-acerto-exato-da-cor-original` · `/como-manter-o-brilho-da-pintura-do-carro` · `/diferenca-entre-pintura-simples-e-restauracao-completa` · `/erros-que-danificam-a-pintura-do-carro` · `/materiais-premium-secagem-em-estufa-repintura-excelencia` · `/muito-alem-da-estetica-tintas-alta-performance-protegem-lataria` · `/o-barato-que-custa-caro-riscos-pintura-automotiva-baixo-custo` · `/pintura-automotiva-completa-ou-parcial-qual-escolher` · `/por-que-um-bom-servico-de-pintura-valoriza-seu-carro-na-revenda` · `/tecnicas-modernas-de-pintura-automotiva-acabamento-de-fabrica`

**Restauração de Veículos (4):**
`/antes-e-depois-de-uma-restauracao-profissional` · `/como-funciona-o-processo-completo-de-restauracao-automotiva` · `/etapas-de-uma-restauracao-automotiva` · `/quanto-custa-restaurar-um-carro-antigo`

**Cuidados e Prevenção (4):**
`/como-proteger-o-carro-do-sol-e-da-chuva` · `/cuidados-basicos-para-evitar-ferrugem-na-lataria` · `/de-quanto-em-quanto-tempo-polir-o-carro` · `/manchas-na-pintura-causas-e-como-remover`

**Super Dicas FGCar em Osasco (5):**
`/arrumar-funilaria-antes-de-vender-ou-negociar-assim-mesmo` · `/como-encontrar-uma-boa-oficina-de-funilaria` · `/como-saber-se-a-oficina-de-pintura-e-confiavel` · `/o-que-avaliar-em-um-orcamento-de-funilaria-e-pintura` · `/oficina-de-funilaria-e-pintura-em-osasco-como-escolher`

### 4.5 Rotas técnicas (não indexáveis)
`/painel-leads` (bloqueado no `robots.txt`) · `/template-artigo`, `/template-post-padrao` e variantes (templates de desenvolvimento, excluídos do deploy).

---

## 5. Arquitetura visual

### 5.1 Estrutura macro das páginas
1. **Top announcement** — barra fina com CTA de WhatsApp.
2. **Header sticky** (`main-header`) — logo, navegação desktop com dropdowns, botão WhatsApp, botão mobile e drawer (`mobileToggle` / `mobileDrawer`).
3. **Subbar mobile** — reforço de CTA, visível apenas no mobile.
4. **Hero / banner da página** — chamada + imagem (na home, vídeo de fundo `videos/video-fundo.mp4`).
5. **Conteúdo** — seções com `container` de até `1240px`.
6. **CTA final** — bloco escuro com gradiente e botão dourado/azul.
7. **Mega rodapé** — marca, serviços, regiões, horários, blog, institucional, diferenciais e linha legal.

### 5.2 Estrutura padrão de artigo (novo padrão)
```
top announcement → header → subbar mobile
breadcrumb (Início / Blog / Categoria / Artigo)
banner em 2 colunas (texto + imagem)
grid conteúdo (1fr) + sidebar (340px)
   conteúdo: intro → H2s → imagens → tabela → FAQ → conclusão → cluster
   sidebar: CTA → índice → NAP da oficina → leia também
CTA final
rodapé
```

- O padrão antigo era **coluna única de ~900px, sem sidebar**. O novo template introduz a grade de 2 colunas e a lateral, sem alterar os posts publicados.
- A lateral usa `position: sticky` (`top: 100px`) no desktop e vira bloco estático abaixo de `960px`; o CTA da lateral sobe para o topo no mobile (`order: -1`).

### 5.3 Paleta (tokens de `:root`)
| Token | Hex | Uso |
|---|---|---|
| `--bg-dark` | `#070b14` | fundo geral |
| `--bg-card` | `#0d1527` | cards, sidebar |
| `--bg-card-hover` | `#131e38` | hover |
| `--border-color` | `#1e293b` | bordas |
| `--brand-blue` | `#0284c7` | marca, links, botão primário |
| `--brand-cyan` | `#38bdf8` | destaques e ícones |
| `--brand-amber` | `#f59e0b` | badges/alertas |
| `--brand-gold` | `#fbbf24` | CTA de destaque |
| `--brand-green` | `#22c55e` | WhatsApp/sucesso |
| `--text-primary` | `#ffffff` | títulos |
| `--text-secondary` | `#cbd5e1` | corpo |
| `--text-muted` | `#94a3b8` | legendas |

No bloco branco de leitura dos artigos: fundo `#ffffff`, texto `#1e293b`, títulos `#0f172a`, subtítulos `#0369a1`, caixas `#f0f9ff` / `#f8fafc`, bordas `#e2e8f0`.

### 5.4 Tipografia e grid
- Títulos: `Plus Jakarta Sans` (fallback `--font-heading`).
- Corpo do artigo: `17.5px` / `line-height: 1.8`.
- Largura máxima: `1240px`; conteúdo do artigo: `1fr`; sidebar: `340px`.
- Breakpoints: `1100px` (sidebar 300px), `960px` (1 coluna), `600px` (mobile compacto).
- Uso de `clamp()` para títulos fluidos.

### 5.5 Componentes/classes-chave
`container` · `main-header` · `header-container` · `nav-links` · `dropdown-menu` · `mobile-drawer` · `mobile-subbar` · `btn btn-primary` · `blog-card` · `main-footer` · `footer-grid`.
No padrão novo de artigo: `fg-post-*` (banner, content, sidebar, widget, toc, related, nap, cta-final, gallery, checklist).

---

## 6. Templates de post

| Arquivo | Quando usar | Diferenças estruturais |
|---|---|---|
| `template-post-padrao.html` | Reparos, Pintura e Super Dicas (long-form) | Banner 2 colunas, conteúdo com H2/H3, tabela, FAQ, CTA final, sidebar com CTA + índice + NAP + leia também |
| `template-post-restauracao-de-veiculos.html` | Restauração de clássicos | Herda o base + **galeria antes/depois** (`fg-post-gallery`), **etapas numeradas** da restauração e **tabela de fatores de orçamento** |
| `template-post-cuidados-e-prevencao.html` | Cuidados e Prevenção (short-form) | Herda o base + **checklist visual** (`fg-post-checklist`), blocos de **erros comuns em H3**, menos seções (índice com 5 itens) |

**Base comum a todos:** head SEO/OG/Twitter, JSON-LD `BlogPosting` + `BreadcrumbList`, header/menu mobile/rodapé idênticos ao site, banner em 2 colunas, 3 pontos de conversão de WhatsApp, sidebar alinhada e CSS escopado em `fg-post-*` dentro de `<style>` (não exige alterar `style.css`).

**Como publicar um post a partir do template:**
1. Copie o template adequado para `/<slug>.html` na raiz.
2. Substitua **todos** os placeholders `{{...}}` (o arquivo tem 76+).
3. Remova blocos opcionais não usados (galeria, tabela, FAQ).
4. Inclua a imagem de capa em `images/` (JPG 1200×630 para OG) e a imagem do banner.
5. Valide HTML, JSON-LD e links internos.
6. Adicione a URL ao `sitemap.xml` e o card à página da categoria.
7. `git add` → `git commit -m "Novo artigo: <slug>"` → `git push origin main`.

> Os templates são excluídos do deploy por `template-*.html` no `.assetsignore` e não devem ser linkados em nenhuma página pública.

---

## 7. Convenções

### HTML
- Um `<h1>` por página; hierarquia `h1 > h2 > h3` sem pular níveis.
- Tags semânticas (`header`, `nav`, `main`, `article`, `section`, `aside`, `footer`) com `aria-label` quando necessário.
- Links internos sempre com barra inicial e sem `.html`.
- Imagens: `alt` descritivo, `width`/`height`, `loading="lazy"`; apenas o banner usa `loading="eager"` + `fetchpriority="high"`.
- Nada de `<br>` para espaçamento estrutural nem tabelas para layout.
- Sem placeholders `{{...}}` em páginas publicadas.

### SEO / GEO
- `<title>` com palavra-chave no início, até ~60 caracteres.
- `meta description` com 140–155 caracteres, benefício + CTA.
- `canonical` sem `.html`; Open Graph completo (JPG 1200×630 em `/images`).
- JSON-LD `BlogPosting` nos artigos e `BreadcrumbList` no breadcrumb; dados idênticos ao NAP.
- Comentário de metadados com 8 itens, **Conclusão Estratégica (Takeaway) por último**.
- Atualizar `sitemap.xml` a cada publicação.

### CTAs e WhatsApp
- Formato: `https://wa.me/5511947727682?text=<mensagem codificada>`, `target="_blank"`, `rel="noopener"`.
- Manter as classes `btn btn-primary`, `btn-header`, `btn-block`, `mobile-whatsapp-btn`, `btn-mobile-whatsapp`.
- Nunca remover, esconder ou trocar o destino de um CTA existente.
- Mínimo de 3 pontos de conversão por artigo (topo, meio/sidebar, final).

### CSS
- Reutilizar tokens de `:root`; evitar hex solto quando há token.
- Componentes com prefixo (`fg-post-*`, `card-*`); evitar seletores genéricos e `!important`.
- Preferir classes a `style=""`; em template isolado, `<style>` escopado.
- Breakpoints em `1024/1100`, `960/768` e `600/480`; `clamp()` para tipografia fluida.
- Contraste AA, `:focus-visible` e `prefers-reduced-motion`.
- Ao alterar `style.css`, acrescentar bloco comentado ao final em vez de reescrever seções.

### Nomenclatura e organização
- Slugs em minúsculas com hífens, palavra-chave no início.
- Imagens em minúsculas, sem espaços/acentos.
- Documentos internos em `_MAIÚSCULAS.md` ou `MAIÚSCULAS.md` e fora do deploy.
- Cópias antigas de artigos não devem ser publicadas (raiz é a fonte).

---

## 8. Mapa de arquivos de governança e deploy

| Arquivo | Papel |
|---|---|
| `.assetsignore` | Exclui do deploy docs, mídia pesada, templates e cópias antigas; protege CSS/JS/includes/plugins (inclusive caminhos WordPress, preventivamente) |
| `.gitignore` | Mantém o repositório leve (caches, logs, temporários, mídia pesada local) |
| `.clineignore` | Evita leitura de pastas pesadas por agentes de IA |
| `.clinerules` | Regras obrigatórias para agentes (estrutura, CTAs, CSS, SEO, deploy) |
| `PROJECT_CONTEXT.md` | Visão geral, público, paleta, navegação, NAP |
| `PROGRESS.md` | Histórico de implementações e pendências |
| `_MEMORIA_PROJETO.md` | Este documento: rotas, arquitetura visual, recursos essenciais e convenções |
| `ANALISE_PROJETO.md` | Análise técnica detalhada e correções aplicadas |
| `PLANO_CONTEUDO_BLOG_FGCAR.md` | Pauta, clusters e convenções de conteúdo |
| `template-*.html` | Templates de post (não publicados) |

---

## 9. Checklist antes de publicar

- [ ] Placeholders substituídos e nenhum `{{...}}` restante.
- [ ] Um único `<h1>`; hierarquia de títulos correta.
- [ ] `title`, `description`, `canonical`, Open Graph e JSON-LD válidos.
- [ ] Imagens com `alt`, dimensões e lazy/eager corretos.
- [ ] Links internos sem `.html` e apontando para rotas existentes.
- [ ] 3 CTAs de WhatsApp com `target="_blank"` e `rel="noopener"`.
- [ ] `sitemap.xml` atualizado e vínculo na categoria.
- [ ] Teste visual em desktop e mobile.
- [ ] Commit em português e `push` na `main`.

