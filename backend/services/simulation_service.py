from agents.simulator_agent import SimulatorAgent


class SimulationService:

    @staticmethod
    def generate(graph):

        agent = SimulatorAgent()

        return agent.simulate(graph)