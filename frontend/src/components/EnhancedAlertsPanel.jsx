function EnhancedAlertsPanel({ hpn }) {
  if (!hpn || hpn.length === 0) return null;

  const highRisk = hpn.filter((r) => r.riesgo === "Alto");
  const noEvidence = hpn.filter((r) => !r.prueba || r.prueba === "Sin prueba" || r.prueba === "—");
  const contradictions = hpn.filter((r) => r.contradicciones && r.contradicciones !== "Ninguna");
  const lowTraceability = hpn.filter((r) => r.estado_epistemico === "Parcial" && (!r.prueba || r.prueba === "Sin prueba"));

  const evidenceCounts = {};
  hpn.forEach((r) => {
    if (r.prueba && r.prueba !== "Sin prueba" && r.prueba !== "—") {
      evidenceCounts[r.prueba] = (evidenceCounts[r.prueba] || 0) + 1;
    }
  });
  const uniqueEvidence = Object.entries(evidenceCounts).filter(([, c]) => c === 1).map(([k]) => k);

  const hasAlerts = highRisk.length > 0 || noEvidence.length > 0 || contradictions.length > 0 || lowTraceability.length > 0 || uniqueEvidence.length > 0;

  if (!hasAlerts) {
    return (
      <div>
        <h3 className="section-title">Alertas del Caso</h3>
        <p style={{ color: "#6b7280" }}>No se detectaron alertas jurídicas en este caso.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="section-title">Alertas del Caso</h3>
      <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "-8px 0 16px" }}>
        Vacíos críticos, pruebas únicas, contradicciones y baja trazabilidad.
      </p>

      {highRisk.length > 0 && (
        <div className="alert-group">
          <h4>Vacios Críticos — Alto Riesgo ({highRisk.length})</h4>
          {highRisk.map((row, i) => (
            <div key={i} className="alert-item risk-high">
              <span className="alert-icon">!</span>
              <span><strong>{row.id}</strong> — {row.hecho?.substring(0, 100)}... Riesgo alto. Acción: {row.accion_sugerida || "revisión urgente"}.</span>
            </div>
          ))}
        </div>
      )}

      {uniqueEvidence.length > 0 && (
        <div className="alert-group">
          <h4>Pruebas Únicas — Críticas de Proteger ({uniqueEvidence.length})</h4>
          {uniqueEvidence.map((ev, i) => {
            const row = hpn.find((r) => r.prueba === ev);
            return (
              <div key={i} className="alert-item evidence-missing">
                <span className="alert-icon">!</span>
                <span><strong>"{ev}"</strong> aparece una sola vez. {row ? `Vínculo: ${row.id}.` : ""} Debe resguardarse y preparar exhibición prioritaria.</span>
              </div>
            );
          })}
        </div>
      )}

      {contradictions.length > 0 && (
        <div className="alert-group">
          <h4>Contradicciones Detectadas ({contradictions.length})</h4>
          {contradictions.map((row, i) => (
            <div key={i} className="alert-item contradiction">
              <span className="alert-icon">~</span>
              <span><strong>{row.id}</strong> — {row.hecho?.substring(0, 100)}... Contradicción: {row.contradicciones}.</span>
            </div>
          ))}
        </div>
      )}

      {lowTraceability.length > 0 && (
        <div className="alert-group">
          <h4>Baja Trazabilidad ({lowTraceability.length})</h4>
          {lowTraceability.slice(0, 10).map((row, i) => (
            <div key={i} className="alert-item low-traceability">
              <span className="alert-icon">?</span>
              <span><strong>{row.id}</strong> — Estado parcial y sin respaldo probatorio suficiente. No incluir en memorial sin refuerzo.</span>
            </div>
          ))}
        </div>
      )}

      {noEvidence.length > 0 && (
        <div className="alert-group">
          <h4>Sin Soporte Probatorio ({noEvidence.length})</h4>
          {noEvidence.slice(0, 8).map((row, i) => (
            <div key={i} className="alert-item evidence-missing">
              <span className="alert-icon">?</span>
              <span><strong>{row.id}</strong> — Carece de prueba asociada.</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnhancedAlertsPanel;
