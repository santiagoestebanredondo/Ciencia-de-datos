class HPNAgent:

    def build_hpn(
        self,
        facts,
        evidences,
        norms
    ):

        rows = []

        for index, fact in enumerate(facts):

            evidence = (
                evidences[index]
                if index < len(evidences)
                else None
            )

            norm = (
                norms[index]
                if index < len(norms)
                else None
            )

            rows.append({

                "id": f"HPN-{index+1:03}",

                "elemento_juridico":
                    "Pendiente Clasificación",

                "hecho":
                    fact["descripcion"],

                "prueba":
                    evidence["descripcion"]
                    if evidence else
                    "Sin prueba",

                "norma":
                    norm["descripcion"]
                    if norm else
                    "Sin norma",

                "fuente_expediente":
                    f"Página {fact['fuente_pagina']}",

                "estado_epistemico":
                    "Completo"
                    if evidence and norm
                    else "Parcial",

                "riesgo":
                    "Bajo"
                    if evidence and norm
                    else "Alto",

                "contradicciones":
                    "Ninguna",

                "accion_sugerida":
                    "Validar soporte",

                "agente_responsable":
                    "Agente HPN",

                "revision_humana":
                    "Pendiente"
            })

        return rows