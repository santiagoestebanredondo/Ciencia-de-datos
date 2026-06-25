function KPISection({ summary, hpn, pages }) {
  if (!summary) return null;

  const totalRiesgoAlto = hpn?.filter((r) => r.riesgo === "Alto").length || 0;
  const completos = hpn?.filter((r) => r.estado_epistemico === "Completo").length || 0;

  const kpis = [
    { label: "Actores Detectados", value: summary.actores, sub: "Partes e intervinientes" },
    { label: "Hechos Jurídicos", value: summary.hechos, sub: "Eventos relevantes" },
    { label: "Pruebas Identificadas", value: summary.pruebas, sub: "Elementos probatorios" },
    { label: "Normas Citadas", value: summary.normas, sub: "Fundamentos legales" },
    { label: "Páginas Procesadas", value: pages || 0, sub: "Documento analizado" },
    { label: "Elementos HPN", value: hpn?.length || 0, sub: "Filas de la matriz" },
    { label: "Completos", value: completos, sub: `de ${hpn?.length || 0}`, success: true },
    { label: "Riesgo Alto", value: totalRiesgoAlto, sub: `${hpn?.length ? ((totalRiesgoAlto / hpn.length) * 100).toFixed(0) : 0}% del total`, danger: totalRiesgoAlto > 0 },
  ];

  return (
    <div className="kpi-grid">
      {kpis.map((kpi, i) => (
        <div key={i} className={`kpi-card${kpi.danger ? " danger" : ""}${kpi.warning ? " warning" : ""}${kpi.success ? " success" : ""}`}>
          <div className="kpi-label">{kpi.label}</div>
          <div className="kpi-value">{kpi.value}</div>
          <div className="kpi-sub">{kpi.sub}</div>
        </div>
      ))}
    </div>
  );
}

export default KPISection;
