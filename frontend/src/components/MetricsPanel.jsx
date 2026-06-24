import { useEffect, useState } from "react";

function MetricsPanel() {

  const [metrics, setMetrics] = useState(null);

  useEffect(() => {

    fetch("http://localhost:5000/metrics")
      .then(res => res.json())
      .then(data => setMetrics(data));

  }, []);

  if (!metrics) {
    return <p>Cargando métricas...</p>;
  }

  return (

    <div>

      <h2>Métricas Generales</h2>

      <p>
        Nodos:
        {metrics.cantidad_nodos}
      </p>

      <p>
        Aristas:
        {metrics.cantidad_aristas}
      </p>

      <p>
        Densidad:
        {metrics.densidad}
      </p>

    </div>

  );
}

export default MetricsPanel;