import { questions } from "./questions.js";
import {
  calculateResult,
  getPyramidPoint,
  PYRAMID_VERTICES,
} from "./scoring.js";

const app = document.querySelector("#app");
const QUESTION_COUNT = 12;
const FEEDBACK_STORAGE_KEY = "fam-question-feedback-v1";
const FEEDBACK_MINIMUM_COUNT = 10;
const FEEDBACK_NEGATIVE_LIMIT = 0.4;

const poleColors = {
  fotzig: "#f7bac8",
  atzig: "#b8ded8",
  mausig: "#f6dc9e",
  cringe: "#d7caf6",
};

const state = {
  screen: "intro",
  currentQuestion: 0,
  sessionQuestions: [],
  selectedAnswers: {},
  sessionFeedback: {},
  questionFeedback: loadQuestionFeedback(),
  nickname: "",
  shareText: "",
  rotation: { x: -0.52, y: 0.72 },
  animationFrame: null,
};

function render() {
  stopPyramidAnimation();
  if (state.screen === "intro") renderIntro();
  if (state.screen === "question") renderQuestion();
  if (state.screen === "result") renderResult();
}

function startQuestionnaire() {
  const activeQuestions = questions.filter((question) => question.active !== false);
  const selectedQuestions = shuffle(activeQuestions).slice(
    0,
    Math.min(QUESTION_COUNT, activeQuestions.length),
  );

  state.screen = "question";
  state.currentQuestion = 0;
  state.selectedAnswers = {};
  state.sessionFeedback = {};
  state.nickname = "";
  state.shareText = "";
  state.sessionQuestions = selectedQuestions.map((question, questionIndex) => {
    const questionId = question.id ?? `frage-${questionIndex + 1}`;
    return {
      ...question,
      id: questionId,
      answers: shuffle(
        question.answers.map((answer, answerIndex) => ({
          ...answer,
          id: answer.id ?? `${questionId}-antwort-${answerIndex + 1}`,
        })),
      ),
    };
  });

  state.sessionQuestions.forEach((question) => recordQuestionShown(question.id));
  persistQuestionFeedback();
  render();
}

function shuffle(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function recordQuestionShown(questionId) {
  const entry = feedbackEntry(questionId);
  entry.shown += 1;
}

function rateQuestion(questionId, rating) {
  const previousRating = state.sessionFeedback[questionId];
  if (previousRating === rating) return;

  const entry = feedbackEntry(questionId);
  if (previousRating) entry[previousRating] = Math.max(0, entry[previousRating] - 1);

  entry[rating] += 1;
  entry.lastRating = rating;
  entry.lastRatedAt = new Date().toISOString();
  state.sessionFeedback[questionId] = rating;
  persistQuestionFeedback();
}

function feedbackEntry(questionId) {
  if (!state.questionFeedback[questionId]) {
    state.questionFeedback[questionId] = {
      shown: 0,
      positive: 0,
      negative: 0,
      lastRating: null,
      lastRatedAt: null,
    };
  }

  state.questionFeedback[questionId].shown =
    Number(state.questionFeedback[questionId].shown) || 0;
  state.questionFeedback[questionId].positive =
    Number(state.questionFeedback[questionId].positive) || 0;
  state.questionFeedback[questionId].negative =
    Number(state.questionFeedback[questionId].negative) || 0;

  return state.questionFeedback[questionId];
}

function loadQuestionFeedback() {
  try {
    const stored = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY));
    return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
  } catch {
    return {};
  }
}

function persistQuestionFeedback() {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(state.questionFeedback));
  } catch {
    // Lokales Feedback ist optional; die Auswertung muss ohne Speicherzugriff weiterlaufen.
  }
}

function feedbackSummary(questionId) {
  const entry = state.questionFeedback[questionId];
  if (!entry) return "";

  const rated = entry.positive + entry.negative;
  if (rated === 0) return "";

  const negativeShare = entry.negative / rated;
  const status =
    rated < FEEDBACK_MINIMUM_COUNT
      ? `Kalibrierung: ${rated}/${FEEDBACK_MINIMUM_COUNT} lokale Rückmeldungen.`
      : negativeShare >= FEEDBACK_NEGATIVE_LIMIT
        ? "Lokaler Prüfkandidat für den Fragenpool."
        : "Lokale Rückmeldungen unauffällig.";

  return `<span class="feedback-summary">${status}</span>`;
}

function createShareText(result) {
  const name = state.nickname.trim();
  const subject = name || "Mein Ergebnis";

  return `${subject} ist: ${result.title}. ${result.sentence}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
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
        <span class="meta-note">12 Items aus dem Pool · 3 Ausprägungen · 1 Ergebnisprofil</span>
        <a class="tool-link" href="datenschutz.html">Datenschutzhinweis</a>
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
    startQuestionnaire();
  });
}

function renderQuestion() {
  if (state.sessionQuestions.length === 0) {
    startQuestionnaire();
    return;
  }

  const question = state.sessionQuestions[state.currentQuestion];
  const selected = state.selectedAnswers[question.id] ?? null;
  const questionTotal = state.sessionQuestions.length;
  const progress = ((state.currentQuestion + 1) / questionTotal) * 100;

  app.innerHTML = `
    <section class="question-layout">
      <div class="question-head">
        <p class="eyebrow">Item ${state.currentQuestion + 1} von ${questionTotal}</p>
        <div class="progress-track" aria-label="Fortschritt">
          <span style="width: ${progress}%"></span>
        </div>
        <h2>${escapeHtml(question.text)}</h2>
      </div>
      <div class="answer-grid">
        ${question.answers
          .map(
            (answer, index) => `
              <button class="answer-card ${selected === answer.id ? "is-selected" : ""}" data-answer="${escapeAttribute(answer.id)}">
                <span>${String.fromCharCode(65 + index)}</span>
                ${escapeHtml(answer.text)}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="question-feedback" aria-label="Itemfeedback">
        <span>Itemfeedback</span>
        <button
          class="feedback-button ${state.sessionFeedback[question.id] === "positive" ? "is-selected" : ""}"
          data-feedback="positive"
          aria-pressed="${state.sessionFeedback[question.id] === "positive"}"
        >
          Wirkt passend
        </button>
        <button
          class="feedback-button ${state.sessionFeedback[question.id] === "negative" ? "is-selected" : ""}"
          data-feedback="negative"
          aria-pressed="${state.sessionFeedback[question.id] === "negative"}"
        >
          Wirkt schwach
        </button>
        ${feedbackSummary(question.id)}
      </div>
      <div class="nav-row">
        <button class="ghost-button" data-action="back" ${state.currentQuestion === 0 ? "disabled" : ""}>Zurück</button>
        <button class="primary-button" data-action="next" ${selected === null ? "disabled" : ""}>
          ${state.currentQuestion === questionTotal - 1 ? "Auswerten" : "Weiter"}
        </button>
      </div>
    </section>
  `;

  app.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedAnswers[question.id] = button.dataset.answer;
      state.shareText = "";
      render();
    });
  });

  app.querySelectorAll("[data-feedback]").forEach((button) => {
    button.addEventListener("click", () => {
      rateQuestion(question.id, button.dataset.feedback);
      render();
    });
  });

  app.querySelector("[data-action='back']").addEventListener("click", () => {
    state.currentQuestion = Math.max(0, state.currentQuestion - 1);
    render();
  });

  app.querySelector("[data-action='next']").addEventListener("click", () => {
    if (state.currentQuestion === questionTotal - 1) {
      state.screen = "result";
    } else {
      state.currentQuestion += 1;
    }
    render();
  });
}

function renderResult() {
  const answers = state.sessionQuestions.map((question) => {
    const answerId = state.selectedAnswers[question.id];
    if (!answerId) return null;
    return question.answers.find((answer) => answer.id === answerId) ?? null;
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
        <div class="share-panel">
          <label for="nickname">Optionales Pseudonym für den lokalen Ergebnissatz</label>
          <div class="share-row">
            <input
              id="nickname"
              type="text"
              maxlength="40"
              autocomplete="off"
              data-field="nickname"
              value="${escapeAttribute(state.nickname)}"
              placeholder="Name oder Pseudonym"
            />
            <button class="ghost-button" data-action="share-text">Text erzeugen</button>
          </div>
          ${
            state.shareText
              ? `<output class="share-output">${escapeHtml(state.shareText)}</output>`
              : '<p class="privacy-note">Das Pseudonym bleibt lokal im Browser und wird nicht gespeichert oder übertragen.</p>'
          }
        </div>
      </div>
      <div class="visual-panel">
        ${result.isCringeRelevant ? pyramidTemplate() : triangleTemplate(result)}
        <p class="visual-result-sentence">${escapeHtml(result.sentence)}</p>
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
    state.sessionQuestions = [];
    state.selectedAnswers = {};
    state.sessionFeedback = {};
    state.nickname = "";
    state.shareText = "";
    render();
  });

  app.querySelector("[data-action='revise']").addEventListener("click", () => {
    state.screen = "question";
    state.currentQuestion = 0;
    render();
  });

  app.querySelector("[data-field='nickname']").addEventListener("input", (event) => {
    state.nickname = event.target.value;
  });

  app.querySelector("[data-action='share-text']").addEventListener("click", () => {
    state.shareText = createShareText(result);
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

  const centroid = { x: 0, y: 0.0025, z: 0.4875 };

  function draw() {
    if (!svg.isConnected) return;
    const projected = Object.fromEntries(
      Object.entries(PYRAMID_VERTICES).map(([key, value]) => [key, project(value)]),
    );
    const dot = project(resultPoint);
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
    const px = point.x - centroid.x;
    const py = point.y - centroid.y;
    const pz = point.z - centroid.z;
    const cosY = Math.cos(state.rotation.y);
    const sinY = Math.sin(state.rotation.y);
    const cosX = Math.cos(state.rotation.x);
    const sinX = Math.sin(state.rotation.x);
    const x1 = px * cosY - pz * sinY;
    const z1 = px * sinY + pz * cosY;
    const y1 = py * cosX - z1 * sinX;
    const z2 = py * sinX + z1 * cosX;
    const scale = 950 / (7 - z2);

    return {
      x: 280 + x1 * scale,
      y: 260 - y1 * scale,
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
