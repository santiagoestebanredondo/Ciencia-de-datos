import { useMemo } from "react";

function ExportPanel({ caseData, fileName, rd }) {
  const htmlContent = useMemo(() => {
    if (!caseData) return "";

    const hpn = caseData.hpn_matrix || [];
    const entities = caseData.entities || {};

    const rowsHtml = hpn.map(
      (r) => `<tr>
        <td>${r.id || ""}</td>
        <td>${(r.hecho || "").substring(0, 100)}</td>
        <td>${r.prueba || ""}</td>
        <td>${r.norma || ""}</td>
        <td>${r.estado_epistemico || ""}</td>
        <td>${r.riesgo || ""}</td>
        <td>${r.contradicciones || ""}</td>
        <td>${r.accion_sugerida || ""}</td>
      </tr>`
    ).join("\n");

    const date = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });

    return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Reporte - ${fileName || "Caso"}</title>
<style>
  body { font-family: 'Inter', Arial, sans-serif; color: #1a1a2e; margin: 40px; line-height: 1.5; }
  h1 { font-size: 1.4rem; border-bottom: 2px solid #2563eb; padding-bottom: 8px; }
  h2 { font-size: 1.1rem; margin-top: 24px; color: #1f2937; }
  table { width: 100%; border-collapse: collapse; font-size: 0.8rem; margin: 12px 0; }
  th { background: #f9fafb; padding: 8px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
  td { padding: 8px; border-bottom: 1px solid #f0f2f5; }
  .meta { display: flex; gap: 24px; flex-wrap: wrap; margin: 12px 0; padding: 12px; background: #f9fafb; border-radius: 8px; }
  .meta-item { font-size: 0.8rem; color: #6b7280; }
  .meta-item strong { color: #1f2937; }
  .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 12px 0; }
  .summary-item { padding: 12px; background: #f0f2f5; border-radius: 8px; text-align: center; }
  .summary-item .num { font-size: 1.3rem; font-weight: 700; color: #1f2937; }
  .summary-item .lab { font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; }
  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 0.75rem; color: #9ca3af; }
</style></head>
<body>
  <h1>Reporte de Análisis Jurídico — Sistema de Litigio Aumentado</h1>
  <div class="meta">
    <div class="meta-item"><strong>Expediente:</strong> ${fileName || "—"}</div>
    <div class="meta-item"><strong>Fecha:</strong> ${date}</div>
    <div class="meta-item"><strong>Páginas:</strong> ${caseData.pages || 0}</div>
    <div class="meta-item"><strong>Elementos HPN:</strong> ${hpn.length}</div>
  </div>

  <h2>Resumen Ejecutivo</h2>
  <div class="summary">
    <div class="summary-item"><div class="num">${caseData.summary?.actores || 0}</div><div class="lab">Actores</div></div>
    <div class="summary-item"><div class="num">${caseData.summary?.hechos || 0}</div><div class="lab">Hechos</div></div>
    <div class="summary-item"><div class="num">${caseData.summary?.pruebas || 0}</div><div class="lab">Pruebas</div></div>
    <div class="summary-item"><div class="num">${caseData.summary?.normas || 0}</div><div class="lab">Normas</div></div>
  </div>

  <h2>Matriz HPN</h2>
  <table>
    <thead><tr><th>ID</th><th>Hecho</th><th>Prueba</th><th>Norma</th><th>Estado</th><th>Riesgo</th><th>Contradicción</th><th>Acción</th></tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>

  <h2>Entidades del Caso</h2>
  ${["actores", "hechos", "pruebas", "normas"].map((k) => `
    <h3>${k.charAt(0).toUpperCase() + k.slice(1)} (${(entities[k] || []).length})</h3>
    <ul>${(entities[k] || []).map((e) => `<li>${e.nombre || e.descripcion || e}</li>`).join("")}</ul>
  `).join("\n")}

  <h2>Métricas</h2>
  <table>
    <thead><tr><th>Métrica</th><th>Valor</th></tr></thead>
    <tbody>
      <tr><td>Cobertura</td><td>${rd ? ((rd.completos / rd.total) * 100).toFixed(1) : 0}%</td></tr>
      <tr><td>Fragilidad</td><td>${rd ? ((rd.criticos / rd.total) * 100).toFixed(1) : 0}%</td></tr>
      <tr><td>Trazabilidad</td><td>${rd ? ((hpn.filter((r) => r.prueba && r.prueba !== "Sin prueba" && r.prueba !== "—").length / hpn.length) * 100).toFixed(1) : 0}%</td></tr>
    </tbody>
  </table>

  <h2>Escenarios</h2>
  ${(caseData.scenarios || []).map((s) => `<p><strong>${s.name}:</strong> ${s.nodes} nodos, ${s.edges} aristas</p>`).join("")}

  <div class="footer">
    Reporte generado automáticamente por el Sistema Inteligente de Litigio Aumentado.
  </div>
</body></html>`;
  }, [caseData, fileName, rd]);

  const exportPDF = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const exportHTML = () => {
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte-${fileName || "caso"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!caseData) return <p style={{ color: "#6b7280" }}>No hay datos para exportar.</p>;

  return (
    <div>
      <h3 className="section-title">Exportar Reporte</h3>
      <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "-8px 0 16px" }}>
        Descargue un reporte profesional con resumen ejecutivo, matriz HPN, red, métricas, escenarios y revisión humana.
      </p>

      <div className="export-actions">
        <button className="export-btn pdf" onClick={exportPDF}>
          Exportar PDF
        </button>
        <button className="export-btn html" onClick={exportHTML}>
          Exportar HTML
        </button>
      </div>

      <div className="export-preview">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
}

export default ExportPanel;
