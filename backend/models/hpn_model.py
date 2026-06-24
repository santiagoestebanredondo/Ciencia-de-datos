from pydantic import BaseModel


class HPNRow(BaseModel):

    id: str

    elemento_juridico: str

    hecho: str

    prueba: str

    norma: str

    fuente_expediente: str

    estado_epistemico: str

    riesgo: str

    contradicciones: str

    accion_sugerida: str

    agente_responsable: str

    revision_humana: str