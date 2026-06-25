from agents.hpn_agent import HPNAgent
from agents.normative_agent import NormativeAgent


class HPNService:

    @staticmethod
    def generate(chunks, entities):

        norm_agent = NormativeAgent()

        norms = norm_agent.extract_norms(chunks)

        entities["normas"] = [
            {"nombre": n["descripcion"], "tipo": "norma"}
            for n in norms
        ]

        hpn_agent = HPNAgent()

        hpn = hpn_agent.build_hpn(
            entities["hechos"],
            entities["pruebas"],
            norms
        )

        return hpn