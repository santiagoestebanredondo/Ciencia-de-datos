from pydantic import BaseModel
from typing import List


class Actor(BaseModel):
    nombre: str
    tipo: str


class Fact(BaseModel):
    id: str
    descripcion: str
    fecha: str
    fuente_pagina: int


class Evidence(BaseModel):
    id: str
    descripcion: str
    tipo: str
    fuente_pagina: int


class Norm(BaseModel):
    id: str
    descripcion: str


class Risk(BaseModel):
    descripcion: str
    nivel: str


class CaseEntities(BaseModel):

    actores: List[Actor] = []

    hechos: List[Fact] = []

    pruebas: List[Evidence] = []

    normas: List[Norm] = []

    riesgos: List[Risk] = []