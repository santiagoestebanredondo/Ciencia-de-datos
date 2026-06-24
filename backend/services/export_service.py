import pandas as pd
import networkx as nx
import json


class ExportService:

    @staticmethod
    def export_hpn_csv(rows):

        df = pd.DataFrame(rows)

        df.to_csv(
            "outputs/hpn_matrix.csv",
            index=False
        )

    @staticmethod
    def export_hpn_json(rows):

        df = pd.DataFrame(rows)

        df.to_json(
            "outputs/hpn_matrix.json",
            orient="records",
            indent=4
        )
    @staticmethod
    def export_graphml(graph):

        nx.write_graphml(
            graph,
            "outputs/network.graphml"
        )


    @staticmethod
    def export_graph_json(graph):

        nodes = []

        edges = []

        for node, data in graph.nodes(data=True):

            nodes.append({
                "id": node,
                **data
            })

        for source, target, data in graph.edges(data=True):

            edges.append({
                "source": source,
                "target": target,
                **data
            })

        with open(
            "outputs/network.json",
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                {
                    "nodes": nodes,
                    "edges": edges
                },
                file,
                ensure_ascii=False,
                indent=4
            )
    @staticmethod
    def export_metrics_json(metrics):

        with open(
            "outputs/metrics.json",
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                metrics,
                file,
                indent=4,
                ensure_ascii=False
            )


    @staticmethod
    def export_metrics_csv(metrics):

        rows = []

        for key, value in metrics.items():

            if isinstance(value, dict):

                for node, node_value in value.items():

                    rows.append({
                        "metric": key,
                        "node": node,
                        "value": node_value
                    })

            else:

                rows.append({
                    "metric": key,
                    "node": "",
                    "value": value
                })

        df = pd.DataFrame(rows)

        df.to_csv(
            "outputs/metrics.csv",
            index=False
        )
    @staticmethod
    def export_scenarios(scenarios):

        import json

        with open(
            "outputs/scenarios.json",
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                scenarios,
                file,
                indent=4,
                ensure_ascii=False
            )