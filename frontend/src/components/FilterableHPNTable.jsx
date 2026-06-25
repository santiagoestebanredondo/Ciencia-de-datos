import { useState, useMemo } from "react";

function FilterableHPNTable({ rows }) {
  const [filters, setFilters] = useState({
    estado: "",
    riesgo: "",
    prueba: "",
    norma: "",
    accion: "",
    search: "",
  });

  const uniqueValues = useMemo(() => ({
    estado: [...new Set(rows.map((r) => r.estado_epistemico).filter(Boolean))],
    riesgo: [...new Set(rows.map((r) => r.riesgo).filter(Boolean))],
    prueba: [...new Set(rows.map((r) => r.prueba).filter(Boolean))],
    norma: [...new Set(rows.map((r) => r.norma).filter(Boolean))],
    accion: [...new Set(rows.map((r) => r.accion_sugerida).filter(Boolean))],
  }), [rows]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filters.estado && r.estado_epistemico !== filters.estado) return false;
      if (filters.riesgo && r.riesgo !== filters.riesgo) return false;
      if (filters.prueba && r.prueba !== filters.prueba) return false;
      if (filters.norma && r.norma !== filters.norma) return false;
      if (filters.accion && r.accion_sugerida !== filters.accion) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return Object.values(r).some((v) => String(v).toLowerCase().includes(q));
      }
      return true;
    });
  }, [rows, filters]);

  const clearFilters = () => setFilters({ estado: "", riesgo: "", prueba: "", norma: "", accion: "", search: "" });

  if (!rows || rows.length === 0) {
    return <p style={{ color: "#6b7280" }}>No hay datos HPN disponibles.</p>;
  }

  return (
    <div>
      <h3 className="section-title">Matriz HPN — Revisión Granular</h3>

      <div className="filter-bar">
        <div className="filter-group">
          <label>Estado</label>
          <select value={filters.estado} onChange={(e) => setFilters({ ...filters, estado: e.target.value })}>
            <option value="">Todos</option>
            {uniqueValues.estado.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Riesgo</label>
          <select value={filters.riesgo} onChange={(e) => setFilters({ ...filters, riesgo: e.target.value })}>
            <option value="">Todos</option>
            {uniqueValues.riesgo.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Prueba</label>
          <select value={filters.prueba} onChange={(e) => setFilters({ ...filters, prueba: e.target.value })}>
            <option value="">Todas</option>
            {uniqueValues.prueba.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Norma</label>
          <select value={filters.norma} onChange={(e) => setFilters({ ...filters, norma: e.target.value })}>
            <option value="">Todas</option>
            {uniqueValues.norma.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Acción</label>
          <select value={filters.accion} onChange={(e) => setFilters({ ...filters, accion: e.target.value })}>
            <option value="">Todas</option>
            {uniqueValues.accion.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Buscar</label>
          <input type="text" placeholder="Buscar en toda la fila..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        </div>
        <button className="filter-clear-btn" onClick={clearFilters}>Limpiar</button>
      </div>

      <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: "0 0 12px" }}>
        Mostrando {filtered.length} de {rows.length} elementos
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Hecho</th>
              <th>Prueba</th>
              <th>Norma</th>
              <th>Estado</th>
              <th>Riesgo</th>
              <th>Contradicciones</th>
              <th>Acción Sugerida</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className={row.riesgo === "Alto" ? "critical-row" : row.estado_epistemico === "Parcial" ? "warning-row" : ""}>
                <td><strong>{row.id}</strong></td>
                <td>{row.hecho?.substring(0, 120)}{row.hecho?.length > 120 ? "..." : ""}</td>
                <td>{row.prueba || "—"}</td>
                <td>{row.norma || "—"}</td>
                <td><span className={`state-badge ${row.estado_epistemico || ""}`}>{row.estado_epistemico || "—"}</span></td>
                <td><span className={`risk-badge ${(row.riesgo || "").toLowerCase()}`}>{row.riesgo || "—"}</span></td>
                <td style={{ color: row.contradicciones && row.contradicciones !== "Ninguna" ? "#dc2626" : "#9ca3af" }}>
                  {row.contradicciones || "Ninguna"}
                </td>
                <td>{row.accion_sugerida || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FilterableHPNTable;
