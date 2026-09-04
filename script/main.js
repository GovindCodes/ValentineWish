// =====================================================
// ALTURA REAL DA TELA (celular)
// =====================================================

/*
   Em navegadores mobile, 100vh é calculado como se a barra
   de endereço estivesse escondida — então com ela visível a
   tela real é menor, e qualquer coisa presa no "bottom"
   (como o botão de repetir) acaba ficando fora da área
   visível. Isso resolve isso em qualquer navegador, mesmo
   os que não suportam a unidade mais nova 100dvh.
*/

function setRealVh() {

  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );

}

setRealVh();

window.addEventListener(
  "resize",
  setRealVh
);


// =====================================================
// CENAS
// =====================================================

const scenes =
  document.querySelectorAll(".scene");

const continueButtons =
  document.querySelectorAll(
    ".continue-btn"
  );


let currentScene = 0;

let transitionLocked = false;


// =====================================================
// ESTADO INICIAL
// =====================================================

TweenMax.set(
  scenes,
  {
    autoAlpha: 0
  }
);


showScene(0);


// =====================================================
// MOSTRAR CENA
// =====================================================

function showScene(index) {

  currentScene = index;

  transitionLocked = false;


  TweenMax.set(
    scenes[index],
    {
      autoAlpha: 0
    }
  );


  TweenMax.to(
    scenes[index],
    0.9,
    {

      autoAlpha: 1,

      ease:
        Power2.easeOut

    }
  );


  handleScene(index);

}


// =====================================================
// ESCONDER CENA
// =====================================================

function hideScene(
  index,
  callback
) {

  TweenMax.to(
    scenes[index],
    0.7,
    {

      autoAlpha: 0,

      ease:
        Power2.easeIn,

      onComplete:
        callback

    }
  );

}


// =====================================================
// PRÓXIMA CENA
// =====================================================

function nextScene() {

  if (
    transitionLocked
  ) {

    return;

  }


  if (
    currentScene >=
    scenes.length - 1
  ) {

    return;

  }


  transitionLocked =
    true;


  const previous =
    currentScene;


  const next =
    currentScene + 1;


  /*
     PRIMEIRO desaparece a cena atual.
     SOMENTE depois mostramos a próxima.
     
     Isso impede completamente
     a sobreposição.
  */

  hideScene(
    previous,
    () => {

      showScene(next);

    }
  );

}


// =====================================================
// COMPORTAMENTO DAS CENAS
// =====================================================

function handleScene(index) {


  // ---------------------------------------------
  // CENAS COM BOTÃO
  // ---------------------------------------------

  if (
    index === 1 ||
    index === 2
  ) {

    return;

  }


  // ---------------------------------------------
  // CARTA / DATA
  // ---------------------------------------------

  if (
    index === 5
  ) {

    initEnvelope();

    return;

  }


  // ---------------------------------------------
  // CARROSSEL
  // ---------------------------------------------

  if (
    index === 10
  ) {

    initCarousel();

    return;

  }


  // ---------------------------------------------
  // SEGURAR PARA REVELAR
  // ---------------------------------------------

  if (
    index === 13
  ) {

    initHoldHeart();

    return;

  }


  // ---------------------------------------------
  // FINAL
  // ---------------------------------------------

  if (
    index === 14
  ) {

    startFinal();

    return;

  }


  // ---------------------------------------------
  // CENAS AUTOMÁTICAS
  // ---------------------------------------------

  let duration =
    2600;


  /*
     Algumas cenas importantes
     ficam um pouco mais tempo.
  */

  if (
    index === 7 ||
    index === 8 ||
    index === 11 ||
    index === 12
  ) {

    duration =
      3300;

  }


  setTimeout(
    () => {

      if (
        currentScene === index &&
        !transitionLocked
      ) {

        nextScene();

      }

    },
    duration
  );

}


// =====================================================
// BOTÕES CONTINUAR
// =====================================================

continueButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        nextScene();

      }
    );

  }
);


// =====================================================
// BOTÃO "NÃO QUERO" (fujão)
// =====================================================

const dodgeMessages = [
  "essa não escapa não 😏",
  "tenta de novo",
  "quase!",
  "hoje não tem como",
  "só clicando em continuar mesmo"
];

const dodgeBtn =
  document.getElementById("dodgeBtn");

if (dodgeBtn) {

  const dodgeScene =
    dodgeBtn.closest(".scene");

  const dodgeHint =
    document.getElementById("dodgeHint");

  let dodgeCount = 0;


  function dodge() {

    dodgeBtn.classList.add(
      "is-dodging"
    );

    const sceneRect =
      dodgeScene.getBoundingClientRect();

    const btnWidth =
      dodgeBtn.offsetWidth;

    const btnHeight =
      dodgeBtn.offsetHeight;

    const padding = 24;

    const maxX =
      Math.max(
        sceneRect.width -
        btnWidth -
        padding * 2,
        0
      );

    const maxY =
      Math.max(
        sceneRect.height -
        btnHeight -
        padding * 2,
        0
      );

    const x =
      padding +
      Math.random() * maxX;

    const y =
      padding +
      Math.random() * maxY;

    dodgeBtn.style.left = `${x}px`;
    dodgeBtn.style.top = `${y}px`;


    if (dodgeHint) {

      dodgeHint.textContent =
        dodgeMessages[
          dodgeCount % dodgeMessages.length
        ];

      dodgeHint.classList.add(
        "is-visible"
      );

    }

    dodgeCount++;

  }


  dodgeBtn.addEventListener(
    "mouseenter",
    dodge
  );

  dodgeBtn.addEventListener(
    "touchstart",
    event => {

      event.preventDefault();

      dodge();

    },
    { passive: false }
  );

  dodgeBtn.addEventListener(
    "click",
    event => {

      event.preventDefault();

      dodge();

    }
  );

}


// =====================================================
// CARTA / ENVELOPE (data)
// =====================================================

function initEnvelope() {

  const envelope =
    document.getElementById("envelope");

  const dateReveal =
    document.getElementById("dateReveal");

  if (!envelope || !dateReveal) {
    return;
  }

  // Reset (importante para funcionar de novo no replay)
  envelope.classList.remove("is-open");
  dateReveal.classList.remove("is-visible");

  if (envelope.dataset.bound) {
    return;
  }

  envelope.dataset.bound = "1";

  envelope.addEventListener(
    "click",
    () => {

      if (envelope.classList.contains("is-open")) {
        return;
      }

      envelope.classList.add("is-open");
      dateReveal.classList.add("is-visible");

      setTimeout(
        () => {

          if (
            currentScene === 5 &&
            !transitionLocked
          ) {

            nextScene();

          }

        },
        2200
      );

    }
  );

}


// =====================================================
// SEGURAR PARA REVELAR (declaração final)
// =====================================================

const holdHeartState = { done: false };

function initHoldHeart() {

  const wrap =
    document.getElementById("holdHeartWrap");

  const heartBtn =
    document.getElementById("holdHeart");

  const ring =
    document.getElementById("holdHeartRing");

  const text =
    document.getElementById("declarationText");

  if (!heartBtn || !ring || !text || !wrap) {
    return;
  }

  // Reset (importante para funcionar de novo no replay)
  wrap.classList.remove("is-done");
  text.classList.remove("is-visible");
  heartBtn.classList.remove("is-holding");
  ring.style.strokeDashoffset = 283;

  /*
     "done" precisa viver aqui fora, e não dentro dos
     listeners abaixo — eles só são criados UMA vez
     (por causa do dataset.bound), então se "done" fosse
     uma variável local ali dentro, ficaria travada em
     true para sempre depois da primeira vez, e o coração
     nunca mais funcionaria num replay.
  */

  holdHeartState.done = false;

  if (heartBtn.dataset.bound) {
    return;
  }

  heartBtn.dataset.bound = "1";

  const HOLD_DURATION = 1400;

  let holdStart = null;
  let holdFrame = null;


  function step() {

    const elapsed =
      Date.now() - holdStart;

    const progress =
      Math.min(
        elapsed / HOLD_DURATION,
        1
      );

    ring.style.strokeDashoffset =
      283 - (283 * progress);

    if (progress >= 1) {

      complete();

      return;

    }

    holdFrame =
      requestAnimationFrame(step);

  }


  function startHold(event) {

    if (holdHeartState.done) {
      return;
    }

    event.preventDefault();

    heartBtn.classList.add("is-holding");

    holdStart = Date.now();

    holdFrame =
      requestAnimationFrame(step);

  }


  function cancelHold() {

    if (holdHeartState.done) {
      return;
    }

    heartBtn.classList.remove("is-holding");

    cancelAnimationFrame(holdFrame);

    ring.style.strokeDashoffset = 283;

  }


  function complete() {

    holdHeartState.done = true;

    cancelAnimationFrame(holdFrame);

    wrap.classList.add("is-done");

    text.classList.add("is-visible");

    setTimeout(
      () => {

        if (
          currentScene === 13 &&
          !transitionLocked
        ) {

          nextScene();

        }

      },
      2600
    );

  }


  heartBtn.addEventListener(
    "mousedown",
    startHold
  );

  heartBtn.addEventListener(
    "touchstart",
    startHold,
    { passive: false }
  );

  heartBtn.addEventListener(
    "mouseup",
    cancelHold
  );

  heartBtn.addEventListener(
    "mouseleave",
    cancelHold
  );

  heartBtn.addEventListener(
    "touchend",
    cancelHold
  );

  heartBtn.addEventListener(
    "touchcancel",
    cancelHold
  );

}

// =====================================================
// CARROSSEL
// =====================================================

let carouselIndex = 0;
let carouselReady = false;

const carousel =
  document.getElementById("carousel");

const track =
  document.getElementById("carouselTrack");

const cards =
  document.querySelectorAll(".carousel-card");

const dotsContainer =
  document.getElementById("carouselDots");

const carouselContinue =
  document.getElementById("carouselContinue");


// =====================================================
// CONFIGURAÇÃO
// =====================================================

const TOTAL_CARDS = cards.length;

let isDragging = false;

let dragStartX = 0;

let currentDragX = 0;


// Distância entre cada foto.

function getStep() {

  if (window.innerWidth <= 600) {

    return Math.min(
      window.innerWidth * 0.68,
      330
    );

  }

  return 390;
}


// =====================================================
// DOTS
// =====================================================

cards.forEach((_, index) => {

  const dot =
    document.createElement("span");

  dot.className = "dot";

  dot.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      carouselIndex = index;

      updateCarousel();

    }
  );

  dotsContainer.appendChild(dot);

});

const dots =
  document.querySelectorAll(".dot");


// =====================================================
// INICIALIZAR
// =====================================================

function initCarousel() {

  if (!carouselReady) {

    carouselReady = true;

    setupCarouselInteraction();

  }

  updateCarousel();

}


// =====================================================
// POSICIONAR FOTOS
// =====================================================

function updateCarousel(
  dragOffset = 0,
  instant = false
) {

  if (!cards.length) {
    return;
  }


  const step =
    getStep();


  cards.forEach(
    (card, index) => {

      const distance =
        index - carouselIndex;


      /*
       * Distância horizontal.
       *
       * O card central fica em 0.
       * Os vizinhos ficam para os lados.
       */

      const x =
        distance * step +
        dragOffset;


      /*
       * Calculamos a distância
       * visual em relação ao centro.
       */

      const absoluteDistance =
        Math.abs(distance);


      /*
       * Escala.
       *
       * Centro: 1
       * Vizinho: 0.72
       * Segundo: 0.55
       */

      let scale = 1;

      if (
        absoluteDistance === 1
      ) {

        scale = 0.72;

      } else if (
        absoluteDistance === 2
      ) {

        scale = 0.55;

      } else if (
        absoluteDistance >= 3
      ) {

        scale = 0.4;

      }


      /*
       * Opacidade.
       */

      let opacity = 0;

      if (
        absoluteDistance === 0
      ) {

        opacity = 1;

      } else if (
        absoluteDistance === 1
      ) {

        opacity = 0.72;

      } else if (
        absoluteDistance === 2
      ) {

        opacity = 0.25;

      }


      /*
       * Classes utilizadas pelo CSS.
       */

      card.classList.remove(
        "active",
        "previous",
        "next",
        "far-previous",
        "far-next"
      );


      if (
        distance === 0
      ) {

        card.classList.add(
          "active"
        );

      } else if (
        distance === -1
      ) {

        card.classList.add(
          "previous"
        );

      } else if (
        distance === 1
      ) {

        card.classList.add(
          "next"
        );

      } else if (
        distance < -1
      ) {

        card.classList.add(
          "far-previous"
        );

      } else {

        card.classList.add(
          "far-next"
        );

      }


      /*
       * A foto é posicionada
       * diretamente em relação
       * ao centro do carrossel.
       */

      card.style.transform =
        `
          translate(
            calc(-50% + ${x}px),
            -50%
          )
          scale(${scale})
        `;

      card.style.opacity =
        opacity;


      /*
       * Durante o arraste,
       * removemos a transição.
       */

      card.style.transition =
        instant || isDragging
          ? "none"
          : "";
    }
  );


  /*
   * Atualiza os indicadores.
   */

  dots.forEach(
    (dot, index) => {

      dot.classList.toggle(
        "active",
        index === carouselIndex
      );

    }
  );

}


// =====================================================
// SWIPE / DRAG
// =====================================================

function setupCarouselInteraction() {

  /*
   * TOUCH
   */

  carousel.addEventListener(
    "touchstart",
    (event) => {

      isDragging = true;

      dragStartX =
        event.touches[0].clientX;

      currentDragX =
        dragStartX;

    },
    {
      passive: true
    }
  );


  carousel.addEventListener(
    "touchmove",
    (event) => {

      if (!isDragging) {
        return;
      }

      currentDragX =
        event.touches[0].clientX;

      const dragDistance =
        currentDragX -
        dragStartX;


      updateCarousel(
        dragDistance
      );

    },
    {
      passive: true
    }
  );


  carousel.addEventListener(
    "touchend",
    () => {

      if (!isDragging) {
        return;
      }

      finishDrag();

    }
  );


  /*
   * MOUSE
   */

  carousel.addEventListener(
    "mousedown",
    (event) => {

      event.preventDefault();

      isDragging = true;

      dragStartX =
        event.clientX;

      currentDragX =
        dragStartX;

      carousel.classList.add(
        "is-dragging"
      );

    }
  );


  window.addEventListener(
    "mousemove",
    (event) => {

      if (!isDragging) {
        return;
      }

      currentDragX =
        event.clientX;

      const dragDistance =
        currentDragX -
        dragStartX;


      updateCarousel(
        dragDistance
      );

    }
  );


  window.addEventListener(
    "mouseup",
    () => {

      if (!isDragging) {
        return;
      }

      finishDrag();

    }
  );

}


// =====================================================
// FINALIZAR DRAG
// =====================================================

function finishDrag() {

  const distance =
    currentDragX -
    dragStartX;


  isDragging = false;

  carousel.classList.remove(
    "is-dragging"
  );


  /*
   * Só muda de foto se
   * o movimento for relevante.
   */

  const threshold = 60;


  if (
    Math.abs(distance) >= threshold
  ) {

    if (distance < 0) {

      nextPhoto();

    } else {

      previousPhoto();

    }

  } else {

    /*
     * Se ela apenas arrastou um pouco,
     * voltamos suavemente para o centro.
     */

    updateCarousel();

  }

}


// =====================================================
// PRÓXIMA FOTO
// =====================================================

function nextPhoto() {

  if (
    carouselIndex <
    TOTAL_CARDS - 1
  ) {

    carouselIndex++;

    updateCarousel();

  }

}


// =====================================================
// FOTO ANTERIOR
// =====================================================

function previousPhoto() {

  if (
    carouselIndex > 0
  ) {

    carouselIndex--;

    updateCarousel();

  }

}


// =====================================================
// BOTÃO CONTINUAR
// =====================================================

carouselContinue.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    nextScene();

  }
);


// =====================================================
// RECALCULAR AO REDIMENSIONAR
// =====================================================

window.addEventListener(
  "resize",
  () => {

    if (
      currentScene === 10
    ) {

      updateCarousel();

    }

  }
);

// =====================================================
// FOGOS
// =====================================================

const canvas =
  document.getElementById(
    "fireworks"
  );


const ctx =
  canvas.getContext(
    "2d"
  );


let fireworks = [];

let fireworksRunning =
  false;

let fireworksStarted =
  false;

let fireworksInterval;

let animationFrame;


// =====================================================
// CANVAS
// =====================================================

function resizeCanvas() {

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;

}


resizeCanvas();


window.addEventListener(
  "resize",
  resizeCanvas
);


// =====================================================
// CRIAR FOGO
// =====================================================

function createFirework(
  x,
  y
) {

  const explosion = [];

  const count = 80;

  /* Paleta quente (rosa/vinho + dourado), coerente com o
     resto da homenagem — em vez de um arco-íris aleatório. */

  const warmBands = [
    [325, 355],
    [28, 48]
  ];

  const band =
    warmBands[
      Math.floor(
        Math.random() * warmBands.length
      )
    ];

  const hue =
    Math.floor(
      band[0] +
      Math.random() * (band[1] - band[0])
    );


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const angle =
      (
        Math.PI * 2 * i
      ) /
      count;


    const speed =
      2 +
      Math.random() * 5;


    explosion.push({

      x: x,

      y: y,

      vx:
        Math.cos(angle) *
        speed,

      vy:
        Math.sin(angle) *
        speed,

      life: 1,

      size:
        1 +
        Math.random() * 2,

      hue:

        hue,

      heart:

        Math.random() <
        0.14

    });

  }


  fireworks.push(
    explosion
  );

}


// =====================================================
// DESENHAR CORAÇÃO
// =====================================================

function drawHeart(
  x,
  y,
  size,
  hue,
  opacity
) {

  ctx.save();


  ctx.translate(
    x,
    y
  );


  ctx.scale(
    size / 8,
    size / 8
  );


  ctx.beginPath();


  ctx.moveTo(
    0,
    6
  );


  ctx.bezierCurveTo(
    -10,
    -2,
    -8,
    -10,
    0,
    -5
  );


  ctx.bezierCurveTo(
    8,
    -10,
    10,
    -2,
    0,
    6
  );


  ctx.fillStyle =
    `hsla(
      ${hue},
      90%,
      70%,
      ${opacity}
    )`;


  ctx.shadowBlur =
    10;


  ctx.shadowColor =
    `hsla(
      ${hue},
      90%,
      70%,
      ${opacity}
    )`;


  ctx.fill();


  ctx.restore();

}


// =====================================================
// ANIMAR FOGOS
// =====================================================

function animateFireworks() {

  if (
    !fireworksRunning
  ) {

    return;

  }


  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  fireworks.forEach(
    (explosion, index) => {


      explosion.forEach(
        particle => {

          particle.x +=
            particle.vx;


          particle.y +=
            particle.vy;


          particle.vy +=
            0.035;


          particle.vx *=
            0.985;


          particle.vy *=
            0.985;


          particle.life -=
            0.012;


          if (
            particle.life <= 0
          ) {

            return;

          }


          if (
            particle.heart
          ) {

            drawHeart(
              particle.x,
              particle.y,
              particle.size * 4,
              particle.hue,
              particle.life
            );

          } else {

            ctx.beginPath();


            ctx.arc(
              particle.x,
              particle.y,
              particle.size,
              0,
              Math.PI * 2
            );


            ctx.fillStyle =
              `hsla(
                ${particle.hue},
                90%,
                70%,
                ${particle.life}
              )`;


            ctx.fill();

          }

        }
      );


      fireworks[index] =
        explosion.filter(
          particle =>
            particle.life > 0
        );


      if (
        fireworks[index]
          .length === 0
      ) {

        fireworks.splice(
          index,
          1
        );

      }

    }
  );


  animationFrame =
    requestAnimationFrame(
      animateFireworks
    );

}


// =====================================================
// INICIAR FOGOS
// =====================================================

function startFireworks() {

  if (
    fireworksStarted
  ) {

    return;

  }


  fireworksStarted =
    true;

  fireworksRunning =
    true;


  fireworksInterval =
    setInterval(
      () => {

        const x =
          canvas.width *
          (
            0.12 +
            Math.random() *
            0.76
          );


        const y =
          canvas.height *
          (
            0.08 +
            Math.random() *
            0.42
          );


        createFirework(
          x,
          y
        );

      },
      550
    );


  animateFireworks();

}


// =====================================================
// FINAL
// =====================================================

function startFinal() {

  startFireworks();


  const heart =
    document.getElementById(
      "mainHeart"
    );


  TweenMax.to(
    heart,
    1.2,
    {

      opacity: 1,

      scale: 1,

      ease:
        Power2.easeOut,

      onComplete:
        () => {

          heart.style.animation =
            "heartPulse 1.2s ease-in-out infinite";

        }

    }
  );


  const replay =
    document.getElementById(
      "replay"
    );


  TweenMax.to(
    replay,
    1,
    {

      opacity: 1,

      delay: 4,

      ease:
        Power2.easeOut

    }
  );

}


// =====================================================
// PARAR FOGOS
// =====================================================

function stopFireworks() {

  fireworksRunning =
    false;


  clearInterval(
    fireworksInterval
  );


  cancelAnimationFrame(
    animationFrame
  );


  fireworks = [];


  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

}


// =====================================================
// REPETIR
// =====================================================

document
  .getElementById(
    "replay"
  )
  .addEventListener(
    "click",
    event => {

      event.stopPropagation();


      stopFireworks();


      fireworksStarted =
        false;


      carouselIndex =
        0;


      updateCarousel();


      TweenMax.set(
        scenes,
        {
          autoAlpha: 0
        }
      );


      const heartEl =
        document.getElementById(
          "mainHeart"
        );

      heartEl.style.animation =
        "none";

      TweenMax.set(
        heartEl,
        {
          opacity: 0,
          scale: 0.3
        }
      );


      TweenMax.set(
        document.getElementById(
          "replay"
        ),
        {
          opacity: 0
        }
      );


      currentScene =
        0;


      transitionLocked =
        false;


      showScene(0);

    }
  );


// =====================================================
// RECALCULAR CARROSSEL
// AO REDIMENSIONAR A JANELA
// =====================================================

window.addEventListener(
  "resize",
  () => {

    if (
      currentScene === 10
    ) {

      updateCarousel();

    }

  }
);