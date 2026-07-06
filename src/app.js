import { questions } from "./questions.js";
import {
  calculateResult,
  getPyramidPoint,
} from "./scoring.js";

const app = document.querySelector("#app");

const poleColors = {
  fotzig: "#f7bac8",
  atzig: "#b8ded8",
  mausig: "#f6dc9e",
  cringe: "#d7caf6",
};

const state = {
  screen: "intro",
  currentQuestion: 0,
  selectedAnswers: Array.from({ length: questions.length }, () => null),
  rotation: { x: -0.52, y: 0.72 },
  animationFrame: null,
};

function render() {
  stopPyramidAnimation();
  if (state.screen === "intro") renderIntro();
  if (state.screen === "question") renderQuestion();
  if (state.screen === "result") renderResult();
}

function renderIntro() {
  app.innerHTML = `
    <section class="hero-panel">
      <p class="eyebrow">Institut für angewandte Sozialgeometrie</p>
      <h1>Fotzig Atzig Mausig</h1>
      <p class="lead">
        Ein semi-standardisiertes Kurzverfahren zur Positionsbestimmung im FAM-Dreieck
        anhand situativer Antwortmuster.
      </p>
      <div class="hero-actions">
        <button class="primary-button" data-action="start">Test starten</button>
        <span class="meta-note">12 Items · 3 Ausprägungen · 1 Ergebnisprofil</span>
        <a class="tool-link" href="fragen-tool.html">Fragen vorschlagen</a>
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
        <button class="ghost-button" data-action="back" ${state.currentQuestion === 0 ? "disabled" : ""}>Zurück</button>
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
          ${scoreRow("Fotzig", result.percentages.fotzig, "fotzig")}
          ${scoreRow("Atzig", result.percentages.atzig, "atzig")}
          ${scoreRow("Mausig", result.percentages.mausig, "mausig")}
          ${result.isCringeRelevant ? scoreRow("Cringe", result.percentages.cringe, "cringe") : ""}
        </div>
        <div class="nav-row left">
          <button class="ghost-button" data-action="restart">Neu kalibrieren</button>
          <button class="primary-button" data-action="revise">Antworten prüfen</button>
        </div>
      </div>
      <div class="visual-panel">
        ${result.isCringeRelevant ? pyramidTemplate() : triangleTemplate(result)}
        ${
          result.isCringeRelevant
            ? '<p class="visual-caption">Cringe ist modellrelevant. Ziehen Sie die Pyramide mit der Maus oder dem Finger.</p>'
            : ""
        }
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

function scoreRow(label, value, tone) {
  return `
    <div class="score-row score-row-${tone}">
      <span>${label}</span>
      <strong>${value}%</strong>
      <i style="width: ${value}%"></i>
    </div>
  `;
}

function triangleTemplate(result) {
  const center = { x: 280, y: 278.67 };
  const vertices = {
    fotzig: { x: 280, y: 82 },
    atzig: { x: 74, y: 439 },
    mausig: { x: 486, y: 439 },
  };
  const dot = {
    x:
      result.base.fotzig * vertices.fotzig.x +
      result.base.atzig * vertices.atzig.x +
      result.base.mausig * vertices.mausig.x,
    y:
      result.base.fotzig * vertices.fotzig.y +
      result.base.atzig * vertices.atzig.y +
      result.base.mausig * vertices.mausig.y,
  };

  return `
    <svg class="triangle-visual" viewBox="0 0 560 520" role="img" aria-label="FAM-Dreieck">
      <defs>
        <clipPath id="triangle-clip">
          <polygon points="${vertices.fotzig.x},${vertices.fotzig.y} ${vertices.atzig.x},${vertices.atzig.y} ${vertices.mausig.x},${vertices.mausig.y}"></polygon>
        </clipPath>
        <radialGradient id="fotzig-glow" cx="50%" cy="18%" r="72%">
          <stop offset="0%" stop-color="${poleColors.fotzig}" stop-opacity="0.62"></stop>
          <stop offset="100%" stop-color="${poleColors.fotzig}" stop-opacity="0"></stop>
        </radialGradient>
        <radialGradient id="atzig-glow" cx="18%" cy="84%" r="72%">
          <stop offset="0%" stop-color="${poleColors.atzig}" stop-opacity="0.56"></stop>
          <stop offset="100%" stop-color="${poleColors.atzig}" stop-opacity="0"></stop>
        </radialGradient>
        <radialGradient id="mausig-glow" cx="82%" cy="84%" r="72%">
          <stop offset="0%" stop-color="${poleColors.mausig}" stop-opacity="0.58"></stop>
          <stop offset="100%" stop-color="${poleColors.mausig}" stop-opacity="0"></stop>
        </radialGradient>
      </defs>
      <polygon
        points="${vertices.fotzig.x},${vertices.fotzig.y} ${vertices.atzig.x},${vertices.atzig.y} ${vertices.mausig.x},${vertices.mausig.y}"
        class="triangle-face"
      ></polygon>
      <polygon points="${vertices.fotzig.x},${vertices.fotzig.y} ${vertices.atzig.x},${vertices.atzig.y} ${center.x},${center.y}" class="triangle-zone triangle-zone-fotzig"></polygon>
      <polygon points="${vertices.atzig.x},${vertices.atzig.y} ${vertices.mausig.x},${vertices.mausig.y} ${center.x},${center.y}" class="triangle-zone triangle-zone-atzig"></polygon>
      <polygon points="${vertices.mausig.x},${vertices.mausig.y} ${vertices.fotzig.x},${vertices.fotzig.y} ${center.x},${center.y}" class="triangle-zone triangle-zone-mausig"></polygon>
      <rect x="36" y="46" width="488" height="430" fill="url(#fotzig-glow)" class="triangle-glow" clip-path="url(#triangle-clip)"></rect>
      <rect x="36" y="46" width="488" height="430" fill="url(#atzig-glow)" class="triangle-glow" clip-path="url(#triangle-clip)"></rect>
      <rect x="36" y="46" width="488" height="430" fill="url(#mausig-glow)" class="triangle-glow" clip-path="url(#triangle-clip)"></rect>
      <line x1="${vertices.fotzig.x}" y1="${vertices.fotzig.y}" x2="${dot.x}" y2="${dot.y}" class="triangle-guide"></line>
      <line x1="${vertices.atzig.x}" y1="${vertices.atzig.y}" x2="${dot.x}" y2="${dot.y}" class="triangle-guide"></line>
      <line x1="${vertices.mausig.x}" y1="${vertices.mausig.y}" x2="${dot.x}" y2="${dot.y}" class="triangle-guide"></line>
      <line x1="${vertices.fotzig.x}" y1="${vertices.fotzig.y}" x2="${vertices.atzig.x}" y2="${vertices.atzig.y}" class="triangle-edge"></line>
      <line x1="${vertices.atzig.x}" y1="${vertices.atzig.y}" x2="${vertices.mausig.x}" y2="${vertices.mausig.y}" class="triangle-edge"></line>
      <line x1="${vertices.mausig.x}" y1="${vertices.mausig.y}" x2="${vertices.fotzig.x}" y2="${vertices.fotzig.y}" class="triangle-edge"></line>
      <circle cx="${dot.x}" cy="${dot.y}" r="9" class="result-dot"></circle>
      ${label("Fotzig", { x: vertices.fotzig.x, y: vertices.fotzig.y - 18 }, "fotzig")}
      ${label("Atzig", { x: vertices.atzig.x, y: vertices.atzig.y + 40 }, "atzig")}
      ${label("Mausig", { x: vertices.mausig.x, y: vertices.mausig.y + 40 }, "mausig")}
    </svg>
  `;
}

function pyramidTemplate() {
  return `
    <svg class="pyramid-visual" viewBox="0 0 560 520" role="img" aria-label="FAM-Pyramide">
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
    fotzig: { x: 0, y: 1.39, z: 0 },
    atzig: { x: -1.2, y: -0.69, z: 0 },
    mausig: { x: 1.2, y: -0.69, z: 0 },
    cringe: { x: 0, y: 0, z: 1.95 },
  };

  function draw() {
    if (!svg.isConnected) return;
    let projected = Object.fromEntries(
      Object.entries(vertices).map(([key, value]) => [key, project(value)]),
    );
    let dot = project(resultPoint);
    const fitted = fitProjection({ ...projected, dot });
    dot = fitted.dot;
    projected = {
      fotzig: fitted.fotzig,
      atzig: fitted.atzig,
      mausig: fitted.mausig,
      cringe: fitted.cringe,
    };
    const faces = [
      ["fotzig", "atzig", "mausig", "rgba(255,255,255,0.54)", "base"],
      ["fotzig", "atzig", "cringe", "rgba(247, 186, 200, 0.66)", "fotzig"],
      ["atzig", "mausig", "cringe", "rgba(184, 222, 216, 0.64)", "atzig"],
      ["mausig", "fotzig", "cringe", "rgba(246, 220, 158, 0.64)", "mausig"],
    ];

    layer.innerHTML = `
      ${faces
        .map((face) => {
          const [a, b, c, color, tone] = face;
          return `<polygon points="${points(projected[a], projected[b], projected[c])}" fill="${color}" class="pyramid-face pyramid-face-${tone}"></polygon>`;
        })
        .join("")}
      ${edge(projected.fotzig, projected.atzig)}
      ${edge(projected.atzig, projected.mausig)}
      ${edge(projected.mausig, projected.fotzig)}
      ${edge(projected.cringe, projected.fotzig)}
      ${edge(projected.cringe, projected.atzig)}
      ${edge(projected.cringe, projected.mausig)}
      ${label("Fotzig", projected.fotzig, "fotzig")}
      ${label("Atzig", projected.atzig, "atzig")}
      ${label("Mausig", projected.mausig, "mausig")}
      ${label("Cringe", projected.cringe, "cringe")}
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
    const scale = 900 / (4.4 - z2);

    return {
      x: 280 + x1 * scale,
      y: 276 - y1 * scale,
    };
  }

  function fitProjection(pointsMap) {
    const values = Object.values(pointsMap);
    const minX = Math.min(...values.map((point) => point.x));
    const maxX = Math.max(...values.map((point) => point.x));
    const minY = Math.min(...values.map((point) => point.y));
    const maxY = Math.max(...values.map((point) => point.y));
    const width = maxX - minX || 1;
    const height = maxY - minY || 1;
    const fit = Math.min(1, 470 / width, 430 / height);
    const center = {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
    };

    return Object.fromEntries(
      Object.entries(pointsMap).map(([key, point]) => [
        key,
        {
          x: 280 + (point.x - center.x) * fit,
          y: 256 + (point.y - center.y) * fit,
        },
      ]),
    );
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

  function animate() {
    if (!svg.isConnected) {
      stopPyramidAnimation();
      return;
    }
    if (!isDragging) {
      state.rotation.y += 0.006;
      draw();
    }
    state.animationFrame = requestAnimationFrame(animate);
  }

  draw();
  state.animationFrame = requestAnimationFrame(animate);
}

function stopPyramidAnimation() {
  if (state.animationFrame !== null) {
    cancelAnimationFrame(state.animationFrame);
    state.animationFrame = null;
  }
}

function points(...items) {
  return items.map((item) => `${item.x},${item.y}`).join(" ");
}

function edge(a, b) {
  return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="pyramid-edge"></line>`;
}

function label(text, point, tone = "") {
  return `<text x="${point.x}" y="${point.y - 14}" text-anchor="middle" class="pyramid-label pyramid-label-${tone}">${text}</text>`;
}

render();
