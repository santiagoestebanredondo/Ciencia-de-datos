import { useState, useMemo } from "react";
import "./Dashboard.css";
import UploadPDF from "../components/UploadPDF";
import DashboardTabs from "../components/DashboardTabs";
import KPISection from "../components/KPISection";
import FilterableHPNTable from "../components/FilterableHPNTable";
import EnhancedNetworkGraph from "../components/EnhancedNetworkGraph";
import StrategicMetricsPanel from "../components/StrategicMetricsPanel";
import EnhancedAlertsPanel from "../components/EnhancedAlertsPanel";
import AdvancedScenariosPanel from "../components/AdvancedScenariosPanel";
import QuestionsPanel from "../components/QuestionsPanel";
import ExportPanel from "../components/ExportPanel";

function readinessData(hpn) {
  if (!hpn || hpn.length === 0) return null;
  const total = hpn.length;
  const completos = hpn.filter((r) => r.estado_epistemico === "Completo").length;
  const parciales = hpn.filter((r) => r.estado_epistemico === "Parcial").length;
  const criticos = hpn.filter((r) => r.riesgo === "Alto" && r.estado_epistemico !== "Completo").length;
  const pendientes = total - completos - parciales;
  return { total, completos, parciales, criticos, pendientes };
}

function ReadinessBar({ rd }) {
  if (!rd) return null;
  return (
    <div className="readiness-section">
      <h3 className="section-title">Estado de Preparación del Caso</h3>
      <div className="readiness-bar-bg">
        {rd.completos > 0 && (
          <div className="readiness-segment completo" style={{ width: `${(rd.completos / rd.total) * 100}%` }}>
            {rd.completos}
          </div>
        )}
        {rd.parciales > 0 && (
          <div className="readiness-segment parcial" style={{ width: `${(rd.parciales / rd.total) * 100}%` }}>
            {rd.parciales}
          </div>
        )}
        {rd.criticos > 0 && (
          <div className="readiness-segment critico" style={{ width: `${(rd.criticos / rd.total) * 100}%` }}>
            {rd.criticos}
          </div>
        )}
      </div>
      <div className="readiness-labels">
        <span className="readiness-label"><span className="readiness-dot completo"></span>Completos ({rd.completos})</span>
        <span className="readiness-label"><span className="readiness-dot parcial"></span>Parciales ({rd.parciales})</span>
        <span className="readiness-label"><span className="readiness-dot critico"></span>Críticos ({rd.criticos})</span>
      </div>
    </div>
  );
}

function ActionableInsights({ hpn }) {
  if (!hpn || hpn.length === 0) return null;

  const factsStrong = hpn.filter((r) => r.estado_epistemico === "Completo" && r.riesgo === "Bajo");
  const factsModulate = hpn.filter((r) => r.estado_epistemico === "Parcial" || r.riesgo === "Alto");
  const lowTraceability = hpn.filter((r) => !r.prueba || r.prueba === "Sin prueba" || r.prueba === "—");
  const withContradictions = hpn.filter((r) => r.contradicciones && r.contradicciones !== "Ninguna");

  const uniqueEvidence = [...new Set(hpn.map((r) => r.prueba).filter(Boolean))].filter((p) => p !== "Sin prueba" && p !== "—");
  const evidenceCounts = {};
  hpn.forEach((r) => { if (r.prueba && r.prueba !== "Sin prueba" && r.prueba !== "—") { evidenceCounts[r.prueba] = (evidenceCounts[r.prueba] || 0) + 1; } });
  const singleEvidence = Object.entries(evidenceCounts).filter(([, c]) => c === 1).map(([k]) => k);

  return (
    <div>
      <h3 className="section-title">Señales Accionables</h3>
      <div className="insights-grid">
        {factsStrong.length > 0 && (
          <div className="insight-card strong">
            <h4>Hechos afirmables con fuerza</h4>
            <p>{factsStrong.length} hecho{factsStrong.length !== 1 ? "s" : ""} completo{factsStrong.length !== 1 ? "s" : ""} y sin controversia. {factsStrong.slice(0, 3).map((r) => r.id).join(", ")}{factsStrong.length > 3 ? ` y ${factsStrong.length - 3} más` : ""} pueden incorporarse directamente al memorial.</p>
          </div>
        )}
        {factsModulate.length > 0 && (
          <div className="insight-card modulate">
            <h4>Hechos a modular</h4>
            <p>{factsModulate.length} hecho{factsModulate.length !== 1 ? "s" : ""} débil{factsModulate.length !== 1 ? "es" : ""} o controvertido{factsModulate.length !== 1 ? "s" : ""}. Requieren refuerzo probatorio antes de ser afirmados categóricamente. Priorizar: {factsModulate.slice(0, 3).map((r) => r.id).join(", ")}.</p>
          </div>
        )}
        {singleEvidence.length > 0 && (
          <div className="insight-card critical">
            <h4>Prueba crítica a proteger</h4>
            <p>"{singleEvidence[0]}" es la única prueba de su tipo. Debe resguardarse y prepararse su exhibición con prioridad. Identificar testigos que puedan corroborarla.</p>
          </div>
        )}
        {uniqueEvidence.length > 0 && (
          <div className="insight-card info">
            <h4>Documentos a preparar primero</h4>
            <p>Orden sugerido: {uniqueEvidence.slice(0, 4).join(" → ")}{uniqueEvidence.length > 4 ? " → ..." : ""}. Preparar estos elementos probatorios según su criticidad y singularidad.</p>
          </div>
        )}
        {withContradictions.length > 0 && (
          <div className="insight-card modulate">
            <h4>Excepción a anticipar</h4>
            <p>{withContradictions.length} elemento{withContradictions.length !== 1 ? "s" : ""} presenta{withContradictions.length === 1 ? "" : "n"} contradicciones. Anticipar impugnación de: {withContradictions.slice(0, 3).map((r) => r.id).join(", ")}.</p>
          </div>
        )}
        {lowTraceability.length > 0 && (
          <div className="insight-card critical">
            <h4>Puntos no aptos para memorial</h4>
            <p>{lowTraceability.length} elemento{lowTraceability.length !== 1 ? "s" : ""} con baja trazabilidad ({lowTraceability.map((r) => r.id).join(", ")}). No incluir en el escrito principal hasta contar con respaldo probatorio suficiente.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function entityDisplay(item) {
  if (typeof item === "string") return item;
  if (item.nombre) return item.nombre;
  if (item.descripcion) return item.descripcion.length > 90 ? item.descripcion.substring(0, 90) + "..." : item.descripcion;
  return JSON.stringify(item);
}

function CaseOverview({ entities, hpn }) {
  if (!entities) return null;

  const normsFromHpn = hpn
    ? [...new Set(hpn.map((r) => r.norma).filter((n) => n && n !== "—" && n !== "Sin norma"))]
    : [];

  const sections = [
    { key: "actores", label: "Actores", icon: "A", badgeClass: "actor", items: entities.actores || [] },
    { key: "hechos", label: "Hechos Jurídicos", icon: "H", badgeClass: "hecho", items: entities.hechos || [] },
    { key: "pruebas", label: "Pruebas", icon: "P", badgeClass: "prueba", items: entities.pruebas || [] },
    { key: "normas", label: "Normas Citadas", icon: "N", badgeClass: "norma", items: (entities.normas && entities.normas.length > 0) ? entities.normas : normsFromHpn },
  ];
  return (
    <div>
      <h3 className="section-title">Entidades del Caso</h3>
      <div className="entity-grid">
        {sections.map(({ key, label, icon, badgeClass, items }) => (
          <div key={key} className="entity-card">
            <h4>{label} ({items.length})</h4>
            {items.length > 0 ? (
              <ul>
                {items.map((item, i) => (
                  <li key={i}><span className={`badge ${badgeClass}`}>{icon}</span>{entityDisplay(item)}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: 0 }}>No se detectaron {label.toLowerCase()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseMetaBar({ caseData, fileName }) {
  const date = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
  return (
    <div className="case-meta-bar">
      <div className="case-meta-item"><span className="label">Expediente</span><span className="value">{fileName || "—"}</span></div>
      <div className="case-meta-item"><span className="label">Páginas</span><span className="value">{caseData.pages}</span></div>
      <div className="case-meta-item"><span className="label">Elementos HPN</span><span className="value">{caseData.hpn_matrix?.length || 0}</span></div>
      <div className="case-meta-item"><span className="label">Procesado</span><span className="value">{date}</span></div>
      <div className="case-meta-item"><span className="case-meta-badge success">Completado</span></div>
    </div>
  );
}

function Dashboard() {
  const [currentTab, setCurrentTab] = useState("Vista General");
  const [caseData, setCaseData] = useState(null);
  const [fileName, setFileName] = useState(null);

  const rd = useMemo(() => readinessData(caseData?.hpn_matrix), [caseData]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Sistema Inteligente de Litigio Aumentado</h1>
          <p>Análisis jurídico basado en agentes inteligentes y redes complejas</p>
        </div>
      </header>

      <section className="upload-section">
        <UploadPDF onDataLoaded={(data, name) => { setCaseData(data); setFileName(name); }} />
      </section>

      {caseData && (
        <>
          <CaseMetaBar caseData={caseData} fileName={fileName} />
          <KPISection summary={caseData.summary} hpn={caseData.hpn_matrix} pages={caseData.pages} />
          <DashboardTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <div className="content-card">
            {currentTab === "Vista General" && (
              <>
                <ReadinessBar rd={rd} />
                <ActionableInsights hpn={caseData.hpn_matrix} />
                <CaseOverview entities={caseData.entities} hpn={caseData.hpn_matrix} />
              </>
            )}
            {currentTab === "Matriz HPN" && <FilterableHPNTable rows={caseData.hpn_matrix} />}
            {currentTab === "Red Multicapa" && <EnhancedNetworkGraph />}
            {currentTab === "Métricas" && <StrategicMetricsPanel hpn={caseData.hpn_matrix} metrics={caseData.metrics} />}
            {currentTab === "Alertas" && <EnhancedAlertsPanel hpn={caseData.hpn_matrix} />}
            {currentTab === "Simulador" && <AdvancedScenariosPanel />}
            {currentTab === "Preguntas" && <QuestionsPanel hpn={caseData.hpn_matrix} entities={caseData.entities} />}
            {currentTab === "Reporte" && <ExportPanel caseData={caseData} fileName={fileName} rd={rd} />}
          </div>
        </>
      )}

      {!caseData && (
        <div className="empty-state">
          <h3>Bienvenido al Sistema de Litigio Aumentado</h3>
          <p>Cargue un documento PDF para comenzar el análisis jurídico automatizado.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
