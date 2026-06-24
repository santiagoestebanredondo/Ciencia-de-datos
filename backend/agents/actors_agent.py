import re

class ActorsAgent:

    def extract_actors(self, chunks):

        actors = []

        found = set()

        pattern = r"[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+"

        for chunk in chunks:

            matches = re.findall(pattern, chunk["text"])

            for actor in matches:

                if actor not in found:

                    found.add(actor)

                    actors.append({
                        "nombre": actor,
                        "tipo": "persona"
                    })

        return actors