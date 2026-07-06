import { questions } from "./questions.js";
import {
  CRINGE_THRESHOLD,
  barycentricToTriangle,
  calculateResult,
  getPyramidPoint,
} from "./scoring.js";

const app = document.querySelector("#app");

const state = {
  screen: "intro",
  currentQuestion: 0,
  selectedAnswers: Array.from({ length: questions.length }, () => null),
  rotation: { x: -0.52, y: 0.72 },
};

function render() {
  if (state.screen === "intro") renderIntro();
  if (state.screen === "question") renderQuestion();
  if (state.screen === "result") renderResult();
}

function renderIntro() {
  app.innerHTML = `
    <section class="hero-panel">
      <p class="eyebrow">Institut fuer angewandte Sozialgeometrie</p>
      <h1>Fotzig Atzig Mausig</h1>
      <p class="lead">
        Ein semi-standardisiertes Kurzverfahren zur Positionsbestimmung im FAM-Dreieck
        mit optionaler Cringe-Tiefenpruefung.
      </p>
      <div class="hero-actions">
        <button class="primary-button" data-action="start">Test starten</button>
        <span class="meta-note">12 Items · 4 Antwortmuster · 1 latente Dimension</span>
      </div>
    </section>
    <section class="method-strip">
      <article>
        <strong>Fotzig</strong>
        <span>durchsetzungsstark, elegant unangenehm, meinungsnah</span>
      </article>
      <article>
        <strong>Atzig</strong>
        <span>kantig, effizient, leicht reizbar bei Unklarheit</span>
      </article>
      <article>
        <strong>Mausig</strong>
        <span>weich, verbindend, sozial temperaturbewusst</span>
      </article>
      <article>
        <strong>Cringe</strong>
        <span>latente Tiefenkomponente, ab ${CRINGE_THRESHOLD}% modellrelevant</span>
      </article>
    </section>
  `;

  app.querySelector("[data-action='start']").addEventListener("click", () => {
    state.screen = "question";
    render();
  });
}

function renderQuestion() {
  const question = questions[state.currentQuestion];
  const selected = state.selectedAnswers[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;

  app.innerHTML = `
    <section class="question-layout">
      <div class="question-head">
        <p class="eyebrow">Item ${state.currentQuestion + 1} von ${questions.length}</p>
        <div class="progress-track" aria-label="Fortschritt">
          <span style="width: ${progress}%"></span>
        </div>
        <h2>${question.text}</h2>
      </div>
      <div class="answer-grid">
        ${question.answers
          .map(
            (answer, index) => `
              <button class="answer-card ${selected === index ? "is-selected" : ""}" data-answer="${index}">
                <span>${String.fromCharCode(65 + index)}</span>
                ${answer.text}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="nav-row">
        <button class="ghost-button" data-action="back" ${state.currentQuestion === 0 ? "disabled" : ""}>Zurueck</button>
        <button class="primary-button" data-action="next" ${selected === null ? "disabled" : ""}>
          ${state.currentQuestion === questions.length - 1 ? "Auswerten" : "Weiter"}
        </button>
      </div>
    </section>
  `;

  app.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedAnswers[state.currentQuestion] = Number(button.dataset.answer);
      render();
    });
  });

  app.querySelector("[data-action='back']").addEventListener("click", () => {
    state.currentQuestion = Math.max(0, state.currentQuestion - 1);
    render();
  });

  app.querySelector("[data-action='next']").addEventListener("click", () => {
    if (state.currentQuestion === questions.length - 1) {
      state.screen = "result";
    } else {
      state.currentQuestion += 1;
    }
    render();
  });
}

function renderResult() {
  const answers = state.selectedAnswers.map((answerIndex, questionIndex) => {
    if (answerIndex === null) return null;
    return questions[questionIndex].answers[answerIndex];
  });
  const result = calculateResult(answers);

  app.innerHTML = `
    <section class="result-layout">
      <div class="result-copy">
        <p class="eyebrow">Auswertung abgeschlossen</p>
        <h1>${result.title}</h1>
        <p class="lead">${result.sentence}</p>
        <div class="score-list">
          ${scoreRow("Fotzig", result.percentages.fotzig)}
          ${scoreRow("Atzig", result.percentages.atzig)}
          ${scoreRow("Mausig", result.percentages.mausig)}
          ${scoreRow("Cringe", result.percentages.cringe)}
        </div>
        <div class="nav-row left">
          <button class="ghost-button" data-action="restart">Neu kalibrieren</button>
          <button class="primary-button" data-action="revise">Antworten pruefen</button>
        </div>
      </div>
      <div class="visual-panel">
        ${result.isCringeRelevant ? pyramidTemplate() : triangleTemplate(result)}
        <p class="visual-caption">
          ${
            result.isCringeRelevant
              ? "Cringe ist modellrelevant. Ziehen Sie die Pyramide mit der Maus oder dem Finger."
              : `Cringe liegt unter ${CRINGE_THRESHOLD}%. Die flache Dreiecksdarstellung bleibt ausreichend.`
          }
        </p>
      </div>
    </section>
  `;

  app.querySelector("[data-action='restart']").addEventListener("click", () => {
    state.screen = "intro";
    state.currentQuestion = 0;
    state.selectedAnswers = Array.from({ length: questions.length }, () => null);
    render();
  });

  app.querySelector("[data-action='revise']").addEventListener("click", () => {
    state.screen = "question";
    state.currentQuestion = 0;
    render();
  });

  if (result.isCringeRelevant) {
    mountPyramid(result);
  }
}

function scoreRow(label, value) {
  return `
    <div class="score-row">
      <span>${label}</span>
      <strong>${value}%</strong>
      <i style="width: ${value}%"></i>
    </div>
  `;
}

function triangleTemplate(result) {
  const point = barycentricToTriangle(result.base);

  return `
    <svg class="triangle-visual" viewBox="0 0 100 100" role="img" aria-label="FAM-Dreieck">
      <polygon points="50,8 8,86 92,86" class="triangle-face"></polygon>
      <line x1="50" y1="8" x2="${point.x}" y2="${point.y}" class="triangle-guide"></line>
      <circle cx="${point.x}" cy="${point.y}" r="3.6" class="result-dot"></circle>
      <text x="50" y="5" text-anchor="middle">Fotzig</text>
      <text x="5" y="95" text-anchor="start">Atzig</text>
      <text x="95" y="95" text-anchor="end">Mausig</text>
    </svg>
  `;
}

function pyramidTemplate() {
  return `
    <svg class="pyramid-visual" viewBox="0 0 560 460" role="img" aria-label="FAM-Pyramide">
      <g data-pyramid></g>
    </svg>
  `;
}

function mountPyramid(result) {
  const svg = app.querySelector(".pyramid-visual");
  const layer = app.querySelector("[data-pyramid]");
  const resultPoint = getPyramidPoint(result);
  let isDragging = false;
  let last = { x: 0, y: 0 };

  const vertices = {
    fotzig: { x: 0, y: 1.1, z: 0 },
    atzig: { x: -1.1, y: -0.72, z: 0 },
    mausig: { x: 1.1, y: -0.72, z: 0 },
    cringe: { x: 0, y: 0.02, z: 1.65 },
  };

  function draw() {
    const projected = Object.fromEntries(
      Object.entries(vertices).map(([key, value]) => [key, project(value)]),
    );
    const dot = project(resultPoint);
    const faces = [
      ["fotzig", "atzig", "mausig", "rgba(255,255,255,0.58)"],
      ["fotzig", "atzig", "cringe", "rgba(251, 185, 196, 0.62)"],
      ["atzig", "mausig", "cringe", "rgba(184, 222, 216, 0.60)"],
      ["mausig", "fotzig", "cringe", "rgba(247, 221, 155, 0.58)"],
    ];

    layer.innerHTML = `
      ${faces
        .map((face) => {
          const [a, b, c, color] = face;
          return `<polygon points="${points(projected[a], projected[b], projected[c])}" fill="${color}" class="pyramid-face"></polygon>`;
        })
        .join("")}
      ${edge(projected.fotzig, projected.atzig)}
      ${edge(projected.atzig, projected.mausig)}
      ${edge(projected.mausig, projected.fotzig)}
      ${edge(projected.cringe, projected.fotzig)}
      ${edge(projected.cringe, projected.atzig)}
      ${edge(projected.cringe, projected.mausig)}
      ${label("Fotzig", projected.fotzig)}
      ${label("Atzig", projected.atzig)}
      ${label("Mausig", projected.mausig)}
      ${label("Cringe", projected.cringe)}
      <circle cx="${dot.x}" cy="${dot.y}" r="9" class="pyramid-dot"></circle>
    `;
  }

  function project(point) {
    const cosY = Math.cos(state.rotation.y);
    const sinY = Math.sin(state.rotation.y);
    const cosX = Math.cos(state.rotation.x);
    const sinX = Math.sin(state.rotation.x);
    const x1 = point.x * cosY - point.z * sinY;
    const z1 = point.x * sinY + point.z * cosY;
    const y1 = point.y * cosX - z1 * sinX;
    const z2 = point.y * sinX + z1 * cosX;
    const scale = 150 / (2.9 - z2);

    return {
      x: 280 + x1 * scale,
      y: 230 - y1 * scale,
    };
  }

  svg.addEventListener("pointerdown", (event) => {
    isDragging = true;
    last = { x: event.clientX, y: event.clientY };
    svg.setPointerCapture(event.pointerId);
  });

  svg.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const dx = event.clientX - last.x;
    const dy = event.clientY - last.y;
    state.rotation.y += dx * 0.01;
    state.rotation.x += dy * 0.01;
    state.rotation.x = Math.max(-1.25, Math.min(0.8, state.rotation.x));
    last = { x: event.clientX, y: event.clientY };
    draw();
  });

  svg.addEventListener("pointerup", () => {
    isDragging = false;
  });

  svg.addEventListener("pointerleave", () => {
    isDragging = false;
  });

  draw();
}

function points(...items) {
  return items.map((item) => `${item.x},${item.y}`).join(" ");
}

function edge(a, b) {
  return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="pyramid-edge"></line>`;
}

function label(text, point) {
  return `<text x="${point.x}" y="${point.y - 14}" text-anchor="middle" class="pyramid-label">${text}</text>`;
}

render();

