import { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

function NetworkGraph() {

  const [graph, setGraph] = useState({
    nodes: [],
    links: []
  });

  useEffect(() => {

    fetch("http://localhost:5000/network")
      .then(res => res.json())
      .then(data => {

        setGraph({
          nodes: data.nodes,
          links: data.edges
        });

      });

  }, []);

  return (
    <div style={{ height: "600px" }}>

      <ForceGraph2D
        graphData={graph}
      />

    </div>
  );
}

export default NetworkGraph;