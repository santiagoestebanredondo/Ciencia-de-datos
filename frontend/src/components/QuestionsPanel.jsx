import { useMemo } from "react";

function QuestionsPanel({ hpn, entities }) {
  const questions = useMemo(() => {
    if (!hpn || hpn.length === 0) return [];
    const result = [];

    const factsStrong = hpn.filter((r) => r.estado_epistemico === "Completo" && r.riesgo === "Bajo");
    const factsWeak = hpn.filter((r) => r.estado_epistemico === "Parcial" || r.riesgo === "Alto");
    const contradictions = hpn.filter((r) => r.contradicciones && r.contradicciones !== "Ninguna");
    const conPrueba = hpn.filter((r) => r.prueba && r.prueba !== "Sin prueba" && r.prueba !== "—");
    const evidenceTypes = [...new Set(conPrueba.map((r) => r.prueba))];
    const actores = entities?.actores || [];

    factsStrong.slice(0, 3).forEach((r) => {
      result.push({
        type: "interro",
        category: "Interrogatorio directo",
        text: `Sobre ${r.id}: ¿Puede el testigo confirmar que "${r.hecho?.substring(0, 80)}..." ocurrió en los términos descritos?`,
      });
    });

    factsWeak.slice(0, 4).forEach((r) => {
      result.push({
        type: "contraexamen",
        category: "Contraexamen",
        text: `Sobre ${r.id}: ¿Existe evidencia contradictoria que pueda ser explotada respecto a "${r.hecho?.substring(0, 80)}..."?`,
      });
    });

    contradictions.slice(0, 3).forEach((r) => {
      result.push({
        type: "contraexamen",
        category: "Contraexamen — Contradicciones",
        text: `Sobre ${r.id}: La contradicción "${r.contradicciones}" puede usarse para impugnar la credibilidad. ¿Cómo preparar al testigo?`,
      });
    });

    evidenceTypes.slice(0, 4).forEach((tipo) => {
      const items = conPrueba.filter((r) => r.prueba === tipo);
      result.push({
        type: "cliente",
        category: "Aclaración al cliente",
        text: `Sobre la prueba "${tipo}" (${items.length} ocurrencia${items.length !== 1 ? "s" : ""}): ¿Puede el cliente proporcionar documentación original o adicional?`,
      });
    });

    if (actores.length >= 2) {
      result.push({
        type: "cliente",
        category: "Preparación de audiencia",
        text: `¿Conviene preparar primero la declaración de "${actores[0]?.nombre || "el demandante"}" o "${actores[1]?.nombre || "el demandado"}"? Evaluar orden según grado de centralidad en la red.`,
      });
    }

    const weakest = hpn.filter((r) => r.riesgo === "Alto" && (!r.prueba || r.prueba === "Sin prueba"));
    weakest.slice(0, 2).forEach((r) => {
      result.push({
        type: "perito",
        category: "Consulta a perito",
        text: `Sobre ${r.id}: ¿Puede un peritaje independiente resolver la debilidad probatoria de "${r.hecho?.substring(0, 80)}..."?`,
      });
    });

    return result;
  }, [hpn, entities]);

  if (questions.length === 0) return <p style={{ color: "#6b7280" }}>No hay suficientes datos para generar preguntas sugeridas.</p>;

  const byCategory = {};
  questions.forEach((q) => {
    if (!byCategory[q.category]) byCategory[q.category] = [];
    byCategory[q.category].push(q);
  });

  return (
    <div>
      <h3 className="section-title">Preguntas Sugeridas para Audiencia</h3>
      <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "-8px 0 16px" }}>
        Interrogatorio, contraexamen, aclaraciones al cliente o perito. Generadas automáticamente según la matriz HPN.
      </p>

      {Object.entries(byCategory).map(([category, qs]) => (
        <div key={category} style={{ marginBottom: 24 }}>
          <h4 style={{ fontSize: "0.85rem", fontWeight: 600, color: "#4b5563", margin: "0 0 10px" }}>{category} ({qs.length})</h4>
          <div className="question-grid">
            {qs.map((q, i) => (
              <div key={i} className={`question-card ${q.type}`}>
                <h4>{q.type === "interro" ? "Interrogatorio" : q.type === "contraexamen" ? "Contraexamen" : q.type === "cliente" ? "Cliente" : "Perito"}</h4>
                <p>{q.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionsPanel;
