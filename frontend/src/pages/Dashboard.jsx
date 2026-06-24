import { useState } from "react";

import "./Dashboard.css";

import UploadPDF from "../components/UploadPDF";
import DashboardTabs from "../components/DashboardTabs";

import KPISection from "../components/KPISection";
import HPNTable from "../components/HPNTable";
import NetworkGraph from "../components/NetworkGraph";
import MetricsPanel from "../components/MetricsPanel";
import ScenariosPanel from "../components/ScenariosPanel";
import AlertsPanel from "../components/AlertsPanel";

function Dashboard() {

  const [currentTab, setCurrentTab] =
    useState("Resumen");

  const [caseData, setCaseData] =
    useState(null);

  return (

    <div className="dashboard-container">

      <header className="dashboard-header">

        <div>

          <h1>
            Sistema Inteligente de Litigio Aumentado
          </h1>

          <p>
            Análisis jurídico basado en agentes
            inteligentes y redes complejas.
          </p>

        </div>

      </header>

      <section className="upload-section">

        <UploadPDF
          onDataLoaded={setCaseData}
        />

      </section>

      {caseData && (

        <>
          <KPISection
            summary={caseData.summary}
          />

          <DashboardTabs
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />

          <div className="content-card">

            {currentTab === "Resumen" && (

              <AlertsPanel
                hpn={caseData.hpn_matrix}
              />

            )}

            {currentTab === "HPN" && (

              <HPNTable
                rows={caseData.hpn_matrix}
              />

            )}

            {currentTab === "Red" && (
              <NetworkGraph />
            )}

            {currentTab === "Métricas" && (
              <MetricsPanel />
            )}

            {currentTab === "Escenarios" && (
              <ScenariosPanel />
            )}

          </div>
        </>

      )}

    </div>
  );
}

export default Dashboard;