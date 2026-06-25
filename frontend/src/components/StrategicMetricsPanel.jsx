import { useMemo } from "react";

function StrategicMetricsPanel({ hpn, metrics }) {
  const strategic = useMemo(() => {
    if (!hpn || hpn.length === 0) return null;
    const total = hpn.length;
    const completos = hpn.filter((r) => r.estado_epistemico === "Completo").length;
    const riesgoAlto = hpn.filter((r) => r.riesgo === "Alto").length;
    const conPrueba = hpn.filter((r) => r.prueba && r.prueba !== "Sin prueba" && r.prueba !== "—").length;
    const contradicciones = hpn.filter((r) => r.contradicciones && r.contradicciones !== "Ninguna").length;

    const cobertura = total > 0 ? (completos / total) * 100 : 0;
    const fragilidad = total > 0 ? (riesgoAlto / total) * 100 : 0;
    const trazabilidad = total > 0 ? (conPrueba / total) * 100 : 0;
    const contradiccion = total > 0 ? (contradicciones / total) * 100 : 0;
    const robustez = 100 - fragilidad;
    const centralidad = metrics?.cantidad_nodos > 0
      ? ((metrics.cantidad_aristas || 0) / (metrics.cantidad_nodos * (metrics.cantidad_nodos - 1))) * 100
      : 0;

    return { cobertura, fragilidad, trazabilidad, contradiccion, robustez, centralidad };
  }, [hpn, metrics]);

  if (!strategic) return <p style={{ color: "#6b7280" }}>No hay datos para calcular métricas estratégicas.</p>;

  const items = [
    { label: "Cobertura", value: strategic.cobertura, unit: "%", desc: "Filas completas sobre total", cls: strategic.cobertura >= 60 ? "metric-good" : strategic.cobertura >= 30 ? "metric-warn" : "metric-bad" },
    { label: "Fragilidad", value: strategic.fragilidad, unit: "%", desc: "Filas con riesgo alto", cls: strategic.fragilidad <= 30 ? "metric-good" : strategic.fragilidad <= 60 ? "metric-warn" : "metric-bad" },
    { label: "Centralidad", value: strategic.centralidad, unit: "%", desc: "Conectividad de la red (densidad relativa)", cls: "metric-warn" },
    { label: "Contradicción", value: strategic.contradiccion, unit: "%", desc: "Filas con contradicciones", cls: strategic.contradiccion <= 10 ? "metric-good" : strategic.contradiccion <= 30 ? "metric-warn" : "metric-bad" },
    { label: "Robustez", value: strategic.robustez, unit: "%", desc: "Filas sin riesgo alto", cls: strategic.robustez >= 60 ? "metric-good" : strategic.robustez >= 30 ? "metric-warn" : "metric-bad" },
    { label: "Trazabilidad", value: strategic.trazabilidad, unit: "%", desc: "Filas con respaldo probatorio", cls: strategic.trazabilidad >= 60 ? "metric-good" : strategic.trazabilidad >= 30 ? "metric-warn" : "metric-bad" },
  ];

  return (
    <div>
      <h3 className="section-title">Métricas Estratégicas</h3>
      <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "-8px 0 16px" }}>
        Priorización basada en la matriz HPN y la estructura de red multicapa.
      </p>
      <div className="metrics-grid">
        {items.map((item, i) => (
          <div key={i} className={`metric-card ${item.cls}`}>
            <h4>{item.label}</h4>
            <div className="metric-value">{item.value.toFixed(1)}{item.unit}</div>
            <div className="metric-sub">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StrategicMetricsPanel;
