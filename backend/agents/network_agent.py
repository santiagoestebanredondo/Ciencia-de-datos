import networkx as nx


class NetworkAgent:

    def build_network(
        self,
        hpn_rows,
        entities
    ):

        graph = nx.DiGraph()

        # ---------------------
        # ACTORES
        # ---------------------

        for actor in entities["actores"]:

            graph.add_node(
                actor["nombre"],
                layer="actores",
                node_type="actor"
            )

        # ---------------------
        # HECHOS
        # ---------------------

        for row in hpn_rows:

            fact_id = f"FACT_{row['id']}"

            graph.add_node(
                fact_id,
                layer="hechos",
                node_type="hecho",
                label=row["hecho"]
            )

        # ---------------------
        # PRUEBAS
        # ---------------------

        for row in hpn_rows:

            evidence_id = f"EVIDENCE_{row['id']}"

            graph.add_node(
                evidence_id,
                layer="pruebas",
                node_type="prueba",
                label=row["prueba"]
            )

        # ---------------------
        # NORMAS
        # ---------------------

        for row in hpn_rows:

            norm_id = f"NORM_{row['id']}"

            graph.add_node(
                norm_id,
                layer="normas",
                node_type="norma",
                label=row["norma"]
            )

        # ---------------------
        # RIESGOS
        # ---------------------

        for row in hpn_rows:

            risk_id = f"RISK_{row['id']}"

            graph.add_node(
                risk_id,
                layer="riesgos",
                node_type="riesgo",
                label=row["riesgo"]
            )

        # ---------------------
        # RELACIONES
        # ---------------------

        for row in hpn_rows:

            fact_id = f"FACT_{row['id']}"

            evidence_id = f"EVIDENCE_{row['id']}"

            norm_id = f"NORM_{row['id']}"

            risk_id = f"RISK_{row['id']}"

            graph.add_edge(
                evidence_id,
                fact_id,
                relation="soporta",
                weight=1
            )

            graph.add_edge(
                fact_id,
                norm_id,
                relation="activa",
                weight=1
            )

            graph.add_edge(
                risk_id,
                fact_id,
                relation="riesgo",
                weight=1
            )

        # ---------------------
        # ACTOR → HECHO
        # ---------------------

        actors = entities["actores"]

        if actors:

            first_actor = actors[0]["nombre"]

            for row in hpn_rows:

                fact_id = f"FACT_{row['id']}"

                graph.add_edge(
                    first_actor,
                    fact_id,
                    relation="participa"
                )

        return graph