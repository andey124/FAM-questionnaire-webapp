export const CRINGE_THRESHOLD = 20;

const dimensions = ["fotzig", "atzig", "mausig", "cringe"];

export function emptyScores() {
  return { fotzig: 0, atzig: 0, mausig: 0, cringe: 0 };
}

export function calculateResult(answers) {
  const raw = answers.reduce((sum, answer) => {
    if (!answer) return sum;
    dimensions.forEach((dimension) => {
      sum[dimension] += answer.scores[dimension] ?? 0;
    });
    return sum;
  }, emptyScores());

  const baseTotal = raw.fotzig + raw.atzig + raw.mausig || 1;
  const allTotal = baseTotal + raw.cringe || 1;
  const base = {
    fotzig: raw.fotzig / baseTotal,
    atzig: raw.atzig / baseTotal,
    mausig: raw.mausig / baseTotal,
  };
  const percentages = {
    fotzig: Math.round(base.fotzig * 100),
    atzig: Math.round(base.atzig * 100),
    mausig: Math.round(base.mausig * 100),
    cringe: Math.round((raw.cringe / allTotal) * 100),
  };

  return {
    raw,
    base,
    percentages,
    isCringeRelevant: percentages.cringe >= CRINGE_THRESHOLD,
    sentence: createResultSentence(percentages),
    title: createResultTitle(percentages),
  };
}

export function barycentricToTriangle(base) {
  const vertices = {
    fotzig: { x: 50, y: 8 },
    atzig: { x: 8, y: 86 },
    mausig: { x: 92, y: 86 },
  };

  return {
    x:
      base.fotzig * vertices.fotzig.x +
      base.atzig * vertices.atzig.x +
      base.mausig * vertices.mausig.x,
    y:
      base.fotzig * vertices.fotzig.y +
      base.atzig * vertices.atzig.y +
      base.mausig * vertices.mausig.y,
  };
}

export function getPyramidPoint(result) {
  const z = result.isCringeRelevant ? result.percentages.cringe / 100 : 0;
  return {
    x: result.base.mausig - result.base.atzig,
    y: result.base.fotzig * 1.1 - 0.28,
    z: z * 1.5,
  };
}

function createResultTitle(percentages) {
  const [primary, secondary] = orderedBaseDimensions(percentages);
  const primaryLabel = label(primary);
  const secondaryLabel = label(secondary);

  if (percentages.cringe >= CRINGE_THRESHOLD) {
    return `${primaryLabel}-${secondaryLabel} mit latenter Cringe-Aktivierung`;
  }

  return `${primaryLabel}-${secondaryLabel} im flachen Modell`;
}

function createResultSentence(percentages) {
  const [primary, secondary] = orderedBaseDimensions(percentages);
  const primaryLabel = label(primary).toLowerCase();
  const secondaryLabel = label(secondary).toLowerCase();
  const cringe = percentages.cringe;

  if (cringe >= CRINGE_THRESHOLD) {
    return `Die Auswertung zeigt eine dominant ${primaryLabel}e Grundstruktur mit ${secondaryLabel}er Beimischung. Die Cringe-Komponente überschreitet den Pufferbereich; eine dreidimensionale Interpretation ist erforderlich.`;
  }

  if (cringe >= 14) {
    return `Das Profil ist primär ${primaryLabel}, jedoch durch eine ${secondaryLabel}e Nebenachse moduliert. Cringe bleibt messbar, aber unterhalb der Modellrelevanz.`;
  }

  return `Ihre Positionierung ist überwiegend ${primaryLabel} mit ${secondaryLabel}er Reaktionsneigung. Die latente Cringe-Dimension bleibt im unkritischen Hintergrundrauschen.`;
}

function orderedBaseDimensions(percentages) {
  return ["fotzig", "atzig", "mausig"].sort(
    (a, b) => percentages[b] - percentages[a],
  );
}

function label(dimension) {
  return {
    fotzig: "Fotzig",
    atzig: "Atzig",
    mausig: "Mausig",
    cringe: "Cringe",
  }[dimension];
}
