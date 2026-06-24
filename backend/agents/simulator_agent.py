import copy


class SimulatorAgent:

    def simulate(self, graph):

        scenarios = []

        # Escenario 1

        scenario_1 = copy.deepcopy(graph)

        first_edge = list(
            scenario_1.edges()
        )

        if first_edge:

            scenario_1.remove_edge(
                first_edge[0][0],
                first_edge[0][1]
            )

        scenarios.append({
            "name": "Exclusión de prueba",
            "nodes": scenario_1.number_of_nodes(),
            "edges": scenario_1.number_of_edges()
        })

        # Escenario 2

        scenario_2 = copy.deepcopy(graph)

        scenario_2.add_node(
            "NEW_EXPERT",
            layer="pruebas"
        )

        scenarios.append({
            "name": "Nuevo peritaje",
            "nodes": scenario_2.number_of_nodes(),
            "edges": scenario_2.number_of_edges()
        })

        # Escenario 3

        scenario_3 = copy.deepcopy(graph)

        scenario_3.add_node(
            "CONTRADICTORY_WITNESS",
            layer="pruebas"
        )

        scenarios.append({
            "name": "Testigo contradictorio",
            "nodes": scenario_3.number_of_nodes(),
            "edges": scenario_3.number_of_edges()
        })

        # Escenario 4

        scenario_4 = copy.deepcopy(graph)

        scenario_4.add_node(
            "NEW_NORM",
            layer="normas"
        )

        scenarios.append({
            "name": "Nueva norma favorable",
            "nodes": scenario_4.number_of_nodes(),
            "edges": scenario_4.number_of_edges()
        })

        return scenarios