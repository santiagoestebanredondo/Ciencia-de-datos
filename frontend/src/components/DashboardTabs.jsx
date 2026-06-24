function DashboardTabs({
  currentTab,
  setCurrentTab
}) {

  const tabs = [
    "Resumen",
    "HPN",
    "Red",
    "Métricas",
    "Escenarios"
  ];

  return (

    <div className="tabs-container">

      {tabs.map(tab => (

        <button
          key={tab}
          className={
            currentTab === tab
              ? "tab active"
              : "tab"
          }
          onClick={() =>
            setCurrentTab(tab)
          }
        >
          {tab}
        </button>

      ))}

    </div>

  );
}

export default DashboardTabs;