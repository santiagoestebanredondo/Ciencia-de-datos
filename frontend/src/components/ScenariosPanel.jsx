import { useEffect, useState } from "react";

function ScenariosPanel() {

  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/scenarios")
      .then(res => res.json())
      .then(data => setScenarios(data));

  }, []);

  return (

    <div>

      <h2>Escenarios Simulados</h2>

      {scenarios.map((scenario, index) => (

        <div key={index}>

          <h3>{scenario.name}</h3>

          <p>Nodos: {scenario.nodes}</p>

          <p>Aristas: {scenario.edges}</p>

        </div>

      ))}

    </div>
  );
}

export default ScenariosPanel;