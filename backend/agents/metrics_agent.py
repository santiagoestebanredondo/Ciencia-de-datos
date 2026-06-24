import networkx as nx


class MetricsAgent:

    def calculate(self, graph):

        metrics = {}

        metrics["cantidad_nodos"] = graph.number_of_nodes()

        metrics["cantidad_aristas"] = graph.number_of_edges()

        metrics["densidad"] = nx.density(graph)

        metrics["grado"] = dict(graph.degree())

        try:

            metrics["betweenness"] = nx.betweenness_centrality(graph)

        except:

            metrics["betweenness"] = {}

        try:

            metrics["pagerank"] = nx.pagerank(graph)

        except:

            metrics["pagerank"] = {}

        return metrics