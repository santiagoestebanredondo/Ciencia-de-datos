function KPISection({ summary }) {

  if (!summary) return null;

  return (

    <div className="kpi-grid">

      <div className="kpi-card">
        <h4>Actores</h4>
        <h2>{summary.actores}</h2>
      </div>

      <div className="kpi-card">
        <h4>Hechos</h4>
        <h2>{summary.hechos}</h2>
      </div>

      <div className="kpi-card">
        <h4>Pruebas</h4>
        <h2>{summary.pruebas}</h2>
      </div>

      <div className="kpi-card">
        <h4>Normas</h4>
        <h2>{summary.normas}</h2>
      </div>

    </div>

  );
}

export default KPISection;