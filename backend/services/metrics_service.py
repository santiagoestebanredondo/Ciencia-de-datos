from agents.metrics_agent import MetricsAgent


class MetricsService:

    @staticmethod
    def generate(graph):

        agent = MetricsAgent()

        return agent.calculate(graph)