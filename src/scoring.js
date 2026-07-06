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

  const baseTotal = raw.fotzig + raw.atzig + raw.mausig;
  const allTotal = baseTotal + raw.cringe;
  const rawCringePercent = allTotal === 0 ? 0 : (raw.cringe / allTotal) * 100;
  const isCringeRelevant = rawCringePercent >= CRINGE_THRESHOLD;
  const base = {
    fotzig: baseTotal === 0 ? 1 / 3 : raw.fotzig / baseTotal,
    atzig: baseTotal === 0 ? 1 / 3 : raw.atzig / baseTotal,
    mausig: baseTotal === 0 ? 1 / 3 : raw.mausig / baseTotal,
  };
  const percentages = isCringeRelevant
    ? normalizePercentages({
        fotzig: allTotal === 0 ? 0 : raw.fotzig / allTotal,
        atzig: allTotal === 0 ? 0 : raw.atzig / allTotal,
        mausig: allTotal === 0 ? 0 : raw.mausig / allTotal,
        cringe: allTotal === 0 ? 0 : raw.cringe / allTotal,
      })
    : normalizePercentages(base);

  return {
    raw,
    base,
    rawCringePercent,
    percentages,
    isCringeRelevant,
    sentence: createResultSentence(percentages, isCringeRelevant),
    title: createResultTitle(percentages, isCringeRelevant),
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

function normalizePercentages(weights) {
  const entries = Object.entries(weights);
  const exact = entries.map(([key, value]) => ({
    key,
    value: value * 100,
  }));
  const rounded = Object.fromEntries(
    exact.map((item) => [item.key, Math.floor(item.value)]),
  );
  const missing = 100 - Object.values(rounded).reduce((sum, value) => sum + value, 0);
  const remainders = exact
    .map((item) => ({
      key: item.key,
      remainder: item.value - Math.floor(item.value),
    }))
    .sort((a, b) => b.remainder - a.remainder);

  for (let index = 0; index < missing; index += 1) {
    rounded[remainders[index % remainders.length].key] += 1;
  }

  return rounded;
}

function createResultTitle(percentages, isCringeRelevant) {
  const [primary, secondary] = orderedBaseDimensions(percentages);
  const primaryLabel = label(primary);
  const secondaryLabel = label(secondary);

  if (isCringeRelevant) {
    return `${primaryLabel}-${secondaryLabel} mit latenter Cringe-Aktivierung`;
  }

  return `${primaryLabel}-${secondaryLabel} im flachen Modell`;
}

function createResultSentence(percentages, isCringeRelevant) {
  const [primary, secondary] = orderedBaseDimensions(percentages);
  const primaryLabel = label(primary).toLowerCase();
  const secondaryLabel = label(secondary).toLowerCase();

  if (isCringeRelevant) {
    return `Die Auswertung zeigt eine dominant ${primaryLabel}e Grundstruktur mit ${secondaryLabel}er Beimischung. Die Cringe-Komponente überschreitet den Pufferbereich; eine dreidimensionale Interpretation ist erforderlich.`;
  }

  return `Ihre Positionierung ist überwiegend ${primaryLabel} mit ${secondaryLabel}er Reaktionsneigung. Das Profil bleibt im flachen FAM-Modell stabil interpretierbar.`;
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
