import { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

const LAYER_COLORS = {
  actores: "#3b82f6",
  hechos: "#f59e0b",
  pruebas: "#10b981",
  normas: "#8b5cf6",
  riesgos: "#ef4444",
};

function EnhancedNetworkGraph() {
  const [graph, setGraph] = useState({ nodes: [], links: [] });

  useEffect(() => {
    fetch("http://localhost:5000/network")
      .then((res) => res.json())
      .then((data) => {
        setGraph({
          nodes: data.nodes.map((n) => ({
            ...n,
            color: LAYER_COLORS[n.layer] || "#6b7280",
            size: n.layer === "actores" ? 8 : n.layer === "hechos" ? 6 : 4,
          })),
          links: data.edges.map((e) => ({
            ...e,
            color:
              e.relation === "soporta"
                ? "#10b981"
                : e.relation === "activa"
                  ? "#8b5cf6"
                  : e.relation === "riesgo"
                    ? "#ef4444"
                    : "#9ca3af",
            lineWidth: e.relation === "riesgo" ? 2 : 1,
          })),
        });
      });
  }, []);

  if (graph.nodes.length === 0) {
    return <p style={{ color: "#6b7280" }}>Cargando red multicapa...</p>;
  }

  return (
    <div>
      <h3 className="section-title">Red Multicapa de Conocimiento</h3>
      <div className="graph-legend">
        <span className="legend-item"><span className="legend-color" style={{ background: LAYER_COLORS.actores }}></span>Actores</span>
        <span className="legend-item"><span className="legend-color" style={{ background: LAYER_COLORS.hechos }}></span>Hechos</span>
        <span className="legend-item"><span className="legend-color" style={{ background: LAYER_COLORS.pruebas }}></span>Pruebas</span>
        <span className="legend-item"><span className="legend-color" style={{ background: LAYER_COLORS.normas }}></span>Normas</span>
        <span className="legend-item"><span className="legend-color" style={{ background: LAYER_COLORS.riesgos }}></span>Riesgos</span>
        <span style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 4px" }}></span>
        <span className="legend-item"><span className="legend-color" style={{ background: "#10b981" }}></span>Soporta</span>
        <span className="legend-item"><span className="legend-color" style={{ background: "#8b5cf6" }}></span>Activa</span>
        <span className="legend-item"><span className="legend-color" style={{ background: "#ef4444" }}></span>Riesgo</span>
        <span className="legend-item"><span className="legend-color" style={{ background: "#9ca3af" }}></span>Participa</span>
      </div>
      <div className="graph-container">
        <ForceGraph2D
          graphData={graph}
          nodeColor="color"
          nodeRelSize={4}
          linkColor="color"
          linkWidth="lineWidth"
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={1}
          nodeLabel="id"
          width={1200}
          height={600}
        />
      </div>
    </div>
  );
}

export default EnhancedNetworkGraph;
