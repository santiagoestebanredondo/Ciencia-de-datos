from agents.factual_agent import FactualAgent
from agents.actors_agent import ActorsAgent
from agents.evidence_agent import EvidenceAgent


class ExtractionService:

    @staticmethod
    def execute(chunks):

        factual_agent = FactualAgent()

        actors_agent = ActorsAgent()

        evidence_agent = EvidenceAgent()

        facts = factual_agent.extract_facts(chunks)

        actors = actors_agent.extract_actors(chunks)

        evidences = evidence_agent.extract_evidence(chunks)

        return {
            "hechos": facts,
            "actores": actors,
            "pruebas": evidences
        }