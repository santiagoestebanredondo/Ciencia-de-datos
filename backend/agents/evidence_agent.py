class EvidenceAgent:

    KEYWORDS = [
        "contrato",
        "correo",
        "mensaje",
        "factura",
        "peritaje",
        "audio",
        "video",
        "testimonio",
        "documento"
    ]

    def extract_evidence(self, chunks):

        evidences = []

        counter = 1

        for chunk in chunks:

            text = chunk["text"].lower()

            for keyword in self.KEYWORDS:

                if keyword in text:

                    evidences.append({
                        "id": f"P{counter}",
                        "descripcion": keyword,
                        "tipo": keyword,
                        "fuente_pagina": chunk["page"]
                    })

                    counter += 1

        return evidences