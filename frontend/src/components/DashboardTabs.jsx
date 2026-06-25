function DashboardTabs({ currentTab, setCurrentTab }) {
  const tabs = [
    "Vista General",
    "Matriz HPN",
    "Red Multicapa",
    "Métricas",
    "Alertas",
    "Simulador",
    "Preguntas",
    "Reporte",
  ];

  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={currentTab === tab ? "tab active" : "tab"}
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default DashboardTabs;
