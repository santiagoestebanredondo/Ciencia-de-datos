class NormativeAgent:

    KEYWORDS = [
        "ley",
        "artículo",
        "codigo",
        "constitución",
        "decreto",
        "sentencia",
        "jurisprudencia",
        "norma"
    ]

    def extract_norms(self, chunks):

        norms = []

        counter = 1

        for chunk in chunks:

            text = chunk["text"]

            for keyword in self.KEYWORDS:

                if keyword.lower() in text.lower():

                    norms.append({
                        "id": f"N{counter}",
                        "descripcion": keyword,
                        "pagina": chunk["page"]
                    })

                    counter += 1

        return norms