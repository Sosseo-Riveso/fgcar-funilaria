# Project Context — FG Car Oficina Funilaria e Pintura

> Documento de contexto do projeto. Serve como briefing permanente para pessoas e agentes de IA.
> Última atualização: **02/11/2026**.

---

## 1. Visão geral

| Item | Valor |
|---|---|
| **Negócio** | FG Car Oficina e Funilaria e Pintura |
| **Site** | https://funilariaosasco.com.br/ |
| **Tipo** | Site institucional + blog técnico (lead generation local) |
| **Idioma** | Português do Brasil |
| **Modelo** | 100% estático — HTML, CSS e JavaScript puro, sem framework e sem build |
| **Hospedagem** | Cloudflare Pages (deploy automático a cada `git push` na branch `main`) |
| **Repositório** | `https://github.com/Sosseo-Riveso/fgcar-funilaria.git` |
| **Backend de leads** | Worker central SOSSEO: `https://sosseo-crm.sosseosites.workers.dev/api/fgcar-leads` + Webhook Google Sheets |
| **Posicionamento** | Funilaria e pintura automotiva de precisão em Osasco/SP, com cabine pressurizada, colorimetria digital e martelinho de ouro |

### Objetivo do site
1. **Gerar leads qualificados** de funilaria/pintura em Osasco e região (WhatsApp é o canal principal).
2. **Autoridade local (GEO/SEO)** — ranquear para buscas de serviço + bairro e aparecer em respostas de IA generativa.
3. **Educar o cliente** sobre processo técnico, prazos e valor, reduzindo objeção de preço.

---

## 2. Público-alvo

| Persona | Perfil | Dor principal | O que busca no site |
|---|---|---|---|
| **Motorista pós-colisão** | 30–55 anos, carro de uso diário, bateu/arranhou | Precisa resolver rápido, com preço justo e sem "surpresa" | Orçamento por WhatsApp, prazo, se tem que trocar peça |
| **Proprietário zeloso** | 35–60 anos, carro novo ou seminovo | Medo de perder valor de revenda / serviço mal feito | Padrão de acabamento, tintas, estufa, garantia |
| **Revendedor / gestor de frota** | 30–50 anos, volume de veículos | Custo por veículo e agilidade | Reparo de para-choque, spot repair, martelinho |
| **Colecionador / clássicos** | 45–70 anos, carro antigo | Peças raras, restauração fiel à original | Restauração completa, colorimetria, etapas do processo |

**Abrangência geográfica:** Osasco (Cipava, Bela Vista, Jaguaribe, Centro, Km 18, Vila Yara, Rochdale, Quitaúna), Carapicuíba, Barueri/Alphaville, Cotia e zona oeste de São Paulo.

---

## 3. Proposta de valor e diferenciais

- Cabine de pintura **pressurizada e climatizada** (cura a 60–65 °C), com controle de partículas.
- **Colorimetria computadorizada** (espectrofotômetro) para casar a cor original.
- **Martelinho de ouro (PDR)** e repuxo digital com spotter — reparos sem repintura quando possível.
- **Recuperação de para-choques** por termofusão.
- **Polimento técnico e cristalização** para acabamento espelhado.
- **Spot repair** para danos pontuais com entrega rápida.
- Diagnóstico honesto: quando o reparo é viável, quando a peça deve ser trocada.

---

## 4. Identidade visual — paleta de cores

Definida em `style.css` dentro de `:root`.

| Token | Hex | Uso principal |
|---|---|---|
| `--bg-dark` | `#070b14` | Fundo geral do site (modo automotivo escuro) |
| `--bg-card` | `#0d1527` | Cards e blocos escuros |
| `--bg-card-hover` | `#131e38` | Estado hover dos cards |
| `--border-color` | `#1e293b` | Bordas neutras |
| `--border-highlight` / `--brand-blue` | `#0284c7` | Cor de marca, links, botões primários |
| `--brand-cyan` | `#38bdf8` | Destaques, subtítulos, ícones de acento |
| `--brand-amber` | `#f59e0b` | Alertas, badges e ênfases secundárias |
| `--brand-gold` | `#fbbf24` | CTAs de destaque e palavras-chave visuais |
| `--brand-green` | `#22c55e` | WhatsApp e indicadores positivos |
| `--text-primary` | `#ffffff` | Títulos sobre fundo escuro |
| `--text-secondary` | `#cbd5e1` | Parágrafos sobre fundo escuro |
| `--text-muted` | `#94a3b8` | Legendas, metadados, rodapé |

**Tema claro dentro dos artigos** (bloco branco de leitura): fundo `#ffffff`, texto `#1e293b`, títulos `#0f172a`, subtítulos `#0369a1`, caixas de apoio `#f0f9ff` / `#f8fafc`, bordas `#e2e8f0`.

### Tipografia
- **Artigos e páginas internas:** `Plus Jakarta Sans` (títulos e corpo) + `Space Grotesk` (apoio), via Google Fonts.
- **Tokens do CSS base:** `--font-heading: 'Montserrat'`, `--font-body: 'Inter'`.
- **Contêiner máximo:** `1240px` · corpo de artigo: `~900px` · linha de leitura `1.8`.

### Diretrizes visuais
- Estética "automotiva premium": fundo escuro, gradientes azul → ciano, dourado para CTA.
- Cantos arredondados entre `8px` e `18px`; sombras suaves e profundas.
- Ícones e setas em texto/emoji (⚡ ➔ 📍) combinam com o estilo já usado no site.
---

## 5. Estrutura de navegação

### Header desktop (`main-header`)
| Item | Destino |
|---|---|
| Início | `/#inicio` |
| Serviços (dropdown) | `/#servicos` |
| ↳ Funilaria de Colisão & Batidas | `/funilaria-de-colisao-e-batidas` |
| ↳ Pintura em Estufa Climatizada | `/pintura-em-estufa-climatizada` |
| ↳ Martelinho de Ouro Express | `/martelinho-de-ouro-express` |
| ↳ Recuperação de Para-choques | `/recuperacao-de-para-choques` |
| ↳ Polimento Técnico & Cristalização | `/polimento-tecnico-e-cristalizacao` |
| ↳ Retoques Rápidos (Spot Repair) | `/retoques-rapidos-spot-repair` |
| Cabine de Pintura | `/#cabine-destaque` |
| Blog (dropdown) | `/categoria-reparos-e-manutencao` |
| ↳ Reparos & Manutenção | `/categoria-reparos-e-manutencao` |
| ↳ Pintura Automotiva & Estética | `/categoria-pintura-automotiva-e-estetica` |
| ↳ Restauração de Veículos | `/categoria-restauracao-de-veiculos` |
| ↳ Cuidados & Prevenção | `/categoria-cuidados-e-prevencao` |
| ↳ Super Dicas FGCar em Osasco | `/categoria-autoridade-local-e-intencao-de-busca` |
| Sobre | `/sobre` |
| A Oficina | `/#diferenciais` |
| Contato | `/contato` |
| Localização | `/#contato` |
| CTA fixo | WhatsApp `wa.me/5511947727682` |

### Outros caminhos de navegação
- **Barra de aviso superior** + **subbar mobile** com o mesmo CTA de WhatsApp.
- **Menu mobile drawer** (`mobileToggle` / `mobileDrawer`), com serviços, blog, localização e CTA em bloco.
- **Rodapé mega** em 4 colunas (marca + serviços + regiões + horários) e linha inferior com blog, institucional, diferenciais e links legais.
- **Breadcrumb** em todos os artigos: Início / Blog / Categoria / Artigo.
- **Links contextuais** para a categoria e para artigos correlatos no fim de cada post.

---

## 6. Inventário de páginas

**Institucionais (5):** `index.html`, `sobre.html`, `contato.html`, `politica-de-privacidade.html`, `termos-de-uso.html`.

**Serviços (6):** funilaria de colisão e batidas, pintura em estufa climatizada, martelinho de ouro express, recuperação de para-choques, polimento técnico e cristalização, retoques rápidos (spot repair).

**Categorias do blog (5):** reparos e manutenção · pintura automotiva e estética · restauração de veículos · cuidados e prevenção · autoridade local e intenção de busca.

**Artigos (~29 na raiz):** dores pós-batida, custos, escolha de oficina, manutenção da pintura, restauração de antigos, erros de repintura e guias técnicos.

**Técnicos / controle:** `painel-leads.html` (protegido por `noindex` no `robots.txt`), `script.js` (lead gate), `GOOGLE-APPS-SCRIPT-CRM.js` (webhook Sheets), `sitemap.xml` (45 URLs), `robots.txt`, `llms.txt`, `llms-full.txt`.

**Templates:** `template-post-padrao.html` (oficial), `template-post-cuidados-e-prevencao.html` e
`template-post-restauracao-de-veiculos.html` (variações por categoria) e `template-artigo.html` (legado/descontinuado).
Todos seguem: `H1 > H2.subtitulo-banner > barra de autoria azul`, 2 imagens 16:9 com legenda em itálico,
âncora para a home e CTA final com endereço físico.

**Auditores locais (não publicados):** `scripts/seo_checker.py` e `scripts/geo_checker.py` — rodar com
`py scripts/seo_checker.py .` e `py scripts/geo_checker.py .` na raiz.

---

## 7. Dados de contato (NAP canônico)

```
FG Car Oficina e Funilaria e Pintura
Av. Visconde de Nova Granada, 3121 — Cipava
Osasco / SP — CEP 06075-380
Telefone / WhatsApp: +55 11 94772-7682
Link: https://wa.me/5511947727682
Segunda a sexta: 08:00–18:00 · Sábado: 08:00–12:00
```

O NAP do site deve bater 100% com o Google Perfil da Empresa.

---

## 8. Convenções técnicas

- **URLs:** sem `.html` (o `_redirects` remove a extensão) e sempre com barra inicial.
- **Slugs:** minúsculas, hífens, palavra-chave no início.
- **Imagens:** nomes em minúsculas com hífens (sem espaços/acentos), preferencialmente JPG/WebP otimizados; capas de artigo em `/images`.
- **OG image:** JPG 1200×630 (`images/og-funilaria-pintura-osasco.jpg`).
- **CSS:** variáveis de `:root`, componentes com prefixo, sem `!important`.
- **JS:** sem dependências externas; o lead gate intercepta `wa.me`.
- **Versionamento:** `git push` na `main` publica direto na Cloudflare Pages.

---

## 9. Links de referência internos

| Arquivo | Para que serve |
|---|---|
| `ANALISE_PROJETO.md` | Análise técnica detalhada e histórico de correções |
| `PLANO_CONTEUDO_BLOG_FGCAR.md` | Inventário, buracos de conteúdo e convenções de publicação |
| `PROGRESS.md` | Histórico de implementações e pendências |
| `.clinerules` | Regras obrigatórias para agentes de IA |
| `llms.txt` / `llms-full.txt` | Resumo e dossiê para motores de IA (GEO/AEO) |

