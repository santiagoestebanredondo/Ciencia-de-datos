import re

class ActorsAgent:

    EXCLUDE_WORDS = {
        "código", "codigo", "constitución", "constitucion",
        "decreto", "sentencia", "jurisprudencia", "artículo",
        "articulo", "capítulo", "capitulo", "título", "titulo",
        "demanda", "demandante", "demandado", "juzgado",
        "civil", "penal", "laboral", "administrativo",
        "tribunal", "corte", "consejo", "comisión", "comision",
        "ley", "estatuto", "reglamento", "acuerdo",
        "resolución", "resolucion", "providencia",
        "general", "nacional", "municipal", "departamental",
        "primera", "segunda", "tercera", "sala", "sección", "seccion",
        "número", "numero", "página", "pagina",
    }

    NAME_PATTERN = r"[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+){1,2}"

    def extract_actors(self, chunks):

        actors = []

        found = set()

        for chunk in chunks:

            matches = re.findall(self.NAME_PATTERN, chunk["text"])

            for match in matches:

                normalized = match.lower()

                words = normalized.split()

                if any(w in self.EXCLUDE_WORDS for w in words):
                    continue

                if match not in found:

                    found.add(match)

                    actors.append({
                        "nombre": match,
                        "tipo": "persona"
                    })

        return actors