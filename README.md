<h1 align="center">
  04 — 1 ano de nós
</h1>

<p align="center">
  Uma homenagem de aniversário de namoro, contada como uma pequena
  experiência web — cena por cena, no escuro, com fotos, texto e
  alguns momentos em que quem está assistindo precisa participar.
</p>

<p align="center">
  <a href="https://wdavyviana.github.io/ValentineWish/">Ver ao vivo</a>
</p>


## O que é isso

Este repositório começou como um fork do
[GovindCodes/ValentineWish](https://github.com/GovindCodes/ValentineWish)
(um "wish valentine" genérico de configurar via `customize.json`), mas o
código deste branch (`minha-versao`) foi **reescrito quase por completo**:
outra estrutura de cenas, outra identidade visual, fotos reais, texto
próprio e interações que não existiam no projeto original. O
`customize.json` e o `package.json` ainda estão no repositório por
herança do fork, mas **não são mais usados** pelo site — todo o conteúdo
(nome, textos, fotos, datas) está direto no `index.html` e no
`script/main.js`.

Puro HTML, CSS e JavaScript. Sem build, sem framework — só a lib
[GSAP (TweenMax)](https://gsap.com/) via CDN para as animações.


## Estrutura dos arquivos

```
.
├── index.html          → as 15 cenas da história, em ordem
├── style/style.css      → toda a identidade visual (cores, tipografia, animações)
├── script/main.js       → a timeline (quando cada cena avança) e as interações
├── img/                 → fotos do casal + ícones (balão, coração, etc.)
├── customize.json        → não usado (sobra do fork original)
└── package.json          → não usado pelo site (sobra do fork original)
```


## Como a história é contada

O site é uma sequência de **15 cenas em tela cheia** (`<section class="scene">`
dentro de `index.html`), mostradas uma de cada vez. A maioria avança sozinha
depois de alguns segundos; algumas exigem que a pessoa toque em algo pra
continuar.

| # | Cena | Como avança |
|---|------|-------------|
| 01 | "Ei, Natália..." | automático |
| 02 | "Eu queria te mostrar uma coisa." | botão continuar |
| 03 | "Mas você vai ter que continuar..." | botão continuar (+ um botão "não quero" que foge do toque) |
| 04–05 | "Algumas datas passam despercebidas." / "Outras ficam." | automático |
| 06 | A data (04/09/2025) | **envelope/lacre que ela precisa tocar pra abrir** |
| 07–10 | Primeiro encontro, primeiro beijo, ... | automático |
| 11 | Carrossel de fotos | arrasta/desliza pra navegar, toca em "continuar" |
| 12 | "Hoje faz 1 ano." | automático |
| 13 | "E eu fico muito feliz..." | automático |
| 14 | "Eu te amo, minha princesa." | **precisa segurar um coração até ele encher** |
| 15 | Fogos + coração final | botão "quero ver de novo" reinicia tudo |

A lógica de quanto tempo cada cena fica na tela, e o que acontece quando ela
termina, está toda centralizada na função `handleScene()` em `main.js`.


## As três interações

Além do carrossel de fotos (arrastável) e dos botões "continuar", o site
tem três momentos pensados pra sair do "só assistir":

- **Botão "não quero" fujão** (Cena 03) — desvia do mouse/dedo a cada
  tentativa de clique, com uma mensagem diferente por baixo a cada vez
  (`dodgeMessages`, no topo da seção correspondente em `main.js`).
- **Envelope com lacre** (Cena 06) — a data do encontro fica escondida
  atrás de um lacre de cera; só é revelada quando a pessoa toca nele.
- **Segurar para revelar** (Cena 14) — antes da declaração final, é
  preciso pressionar e segurar um coração (com um anel de progresso ao
  redor) por cerca de 1,4s até ele "encher". Soltar antes reseta o
  progresso.

Essas três reaproveitam a mesma lógica de cena automática/interativa que
já existia — não são um sistema separado.


## Personalizando

Praticamente tudo pode ser trocado direto no `index.html`:

- **Nome, textos e data** — estão escritos diretamente dentro de cada
  `<section class="scene">`.
- **Fotos do carrossel** — trocar os arquivos em `img/` (mesmo nome) ou
  os `src` dos `<img>` dentro da Cena 11.
- **Mensagens do botão fujão** — array `dodgeMessages` em `main.js`.
- **Duração do "segurar para revelar"** — constante `HOLD_DURATION`
  (em milissegundos) em `main.js`.
- **Cores e tipografia** — variáveis no topo do `style.css` (bloco
  `:root`): tons de rosa/dourado e as fontes Cormorant Garamond (títulos)
  + DM Sans (texto de apoio).


## Rodando localmente

Como não tem build, basta servir os arquivos estaticamente. Qualquer
servidor local funciona, por exemplo:

```bash
npx serve .
```

ou, com Python:

```bash
python3 -m http.server 8000
```

e abrir `http://localhost:8000` no navegador.


## Publicando

O site está publicado via **GitHub Pages**, direto do branch
`minha-versao` (Settings → Pages → Deploy from a branch). Qualquer
`git push` nesse branch atualiza o link automaticamente, sem precisar
reconfigurar nada.


## Créditos

Estrutura inicial e algumas animações de base vieram do fork de
[GovindCodes/ValentineWish](https://github.com/GovindCodes/ValentineWish),
que por sua vez credita as animações originais a
[Afiur Rahman Fahim (faahim)](https://github.com/faahim). A história, o
design, os textos, as fotos e as interações deste branch são próprios.