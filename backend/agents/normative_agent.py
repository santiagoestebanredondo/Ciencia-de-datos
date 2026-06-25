import re

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
        seen = set()
        counter = 1

        for chunk in chunks:

            text = chunk["text"]

            for keyword in self.KEYWORDS:

                pattern = re.compile(
                    re.escape(keyword) + r"[^.]{0,120}\.",
                    re.IGNORECASE
                )

                matches = pattern.findall(text)

                for match in matches:

                    desc = match.strip().replace("\n", " ")[:120]

                    if desc.lower() not in seen:

                        seen.add(desc.lower())

                        norms.append({
                            "id": f"N{counter}",
                            "descripcion": desc,
                            "pagina": chunk["page"]
                        })

                        counter += 1

        return norms