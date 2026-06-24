from agents.ingestion_agent import IngestionAgent

class PDFService:

    @staticmethod
    def extract(pdf_path):

        agent = IngestionAgent()

        return agent.process_pdf(pdf_path)