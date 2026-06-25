import { useEffect, useState } from "react";

function AdvancedScenariosPanel() {
  const [scenarios, setScenarios] = useState([]);
  const [baseline, setBaseline] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/scenarios")
      .then((res) => res.json())
      .then((data) => {
        setScenarios(data);
        if (data.length > 0) {
          setBaseline({ nodes: data[0].nodes, edges: data[0].edges });
        }
      });
  }, []);

  if (scenarios.length === 0) {
    return <p style={{ color: "#6b7280" }}>Cargando escenarios...</p>;
  }

  const impactLabels = {
    "Exclusión de prueba": { label: "Negativo — se pierde una arista", cls: "negative" },
    "Nuevo peritaje": { label: "Positivo — se agrega un nodo", cls: "positive" },
    "Testigo contradictorio": { label: "Positivo — nuevo elemento de prueba", cls: "positive" },
    "Nueva norma favorable": { label: "Positivo — fundamento legal adicional", cls: "positive" },
  };

  return (
    <div>
      <h3 className="section-title">Simulador de Escenarios</h3>
      <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "-8px 0 16px" }}>
        Compare el estado actual con escenarios hipotéticos. Evalúe el impacto en la red antes de tomar decisiones.
      </p>

      <div className="scenario-grid">
        {scenarios.map((scenario, index) => {
          const base = baseline || scenario;
          const nodeDiff = scenario.nodes - base.nodes;
          const edgeDiff = scenario.edges - base.edges;
          const impact = impactLabels[scenario.name] || { label: "Neutro", cls: "neutral" };
          const isBase = index === 0;

          return (
            <div key={index} className="scenario-card" style={isBase ? { borderColor: "#2563eb", borderWidth: 2 } : {}}>
              <h4>{isBase ? "ESTADO ACTUAL (Base)" : scenario.name}</h4>
              <div className="scenario-stat">
                <span>Nodos</span>
                <strong>{scenario.nodes}</strong>
              </div>
              <div className="scenario-stat">
                <span>Aristas</span>
                <strong>{scenario.edges}</strong>
              </div>
              {!isBase && (
                <>
                  <div className="scenario-stat">
                    <span>Δ Nodos</span>
                    <strong style={{ color: nodeDiff >= 0 ? "#059669" : "#dc2626" }}>
                      {nodeDiff > 0 ? "+" : ""}{nodeDiff}
                    </strong>
                  </div>
                  <div className="scenario-stat">
                    <span>Δ Aristas</span>
                    <strong style={{ color: edgeDiff >= 0 ? "#059669" : "#dc2626" }}>
                      {edgeDiff > 0 ? "+" : ""}{edgeDiff}
                    </strong>
                  </div>
                  <div className={`scenario-impact ${impact.cls}`}>
                    {impact.label}
                  </div>
                </>
              )}
              {isBase && (
                <div className="scenario-impact neutral">
                  Punto de comparación
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdvancedScenariosPanel;
