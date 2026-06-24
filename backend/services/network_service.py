from agents.network_agent import NetworkAgent


class NetworkService:

    @staticmethod
    def generate(
        hpn_rows,
        entities
    ):

        agent = NetworkAgent()

        return agent.build_network(
            hpn_rows,
            entities
        )