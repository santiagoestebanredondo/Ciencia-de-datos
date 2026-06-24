function AlertsPanel({ hpn }) {

  const alerts = [];

  hpn?.forEach(row => {

    if (row.riesgo === "Alto") {

      alerts.push(
        `⚠ ${row.id} posee riesgo alto`
      );

    }

    if (row.prueba === "Sin prueba") {

      alerts.push(
        `⚠ ${row.id} carece de soporte probatorio`
      );

    }

  });

  return (

    <div>

      <h2>Alertas Jurídicas</h2>

      {alerts.length === 0 && (
        <p>No existen alertas.</p>
      )}

      {alerts.map((alert, index) => (

        <div
          key={index}
          className="alert-card"
        >
          {alert}
        </div>

      ))}

    </div>

  );
}

export default AlertsPanel;