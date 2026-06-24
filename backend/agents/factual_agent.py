import re

class FactualAgent:

    def extract_facts(self, chunks):

        facts = []

        fact_counter = 1

        date_pattern = r"\d{1,2}/\d{1,2}/\d{4}"

        for chunk in chunks:

            text = chunk["text"]

            page = chunk["page"]

            dates = re.findall(date_pattern, text)

            sentences = text.split(".")

            for sentence in sentences:

                sentence = sentence.strip()

                if len(sentence) < 30:
                    continue

                fact = {
                    "id": f"H{fact_counter}",
                    "descripcion": sentence,
                    "fecha": dates[0] if dates else "",
                    "fuente_pagina": page
                }

                facts.append(fact)

                fact_counter += 1

        return facts