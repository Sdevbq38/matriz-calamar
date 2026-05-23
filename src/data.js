// Datos de las 5 decisiones. Valores PRELIMINARES y modificables.
// baseChoice = alternativa que el equipo ya tomó (debe ganar en el escenario base).

export function makeDecisions() {
  return [
    {
      id: "problematica",
      tab: "Problemática",
      title: "Selección de la problemática",
      baseChoice: "Energía eléctrica en colegios rurales",
      criteria: {
        "Impacto social": 30,
        "Coherencia con el problema central": 25,
        "Disponibilidad de información": 20,
        "Compatibilidad con contexto rural": 25,
      },
      alternatives: [
        { name: "Energía eléctrica en colegios rurales", scores: { "Impacto social": 5, "Coherencia con el problema central": 5, "Disponibilidad de información": 4, "Compatibilidad con contexto rural": 5 } },
        { name: "Acceso a internet rural", scores: { "Impacto social": 4, "Coherencia con el problema central": 3, "Disponibilidad de información": 4, "Compatibilidad con contexto rural": 4 } },
        { name: "Transporte escolar rural", scores: { "Impacto social": 4, "Coherencia con el problema central": 2, "Disponibilidad de información": 3, "Compatibilidad con contexto rural": 3 } },
        { name: "Agua potable en instituciones rurales", scores: { "Impacto social": 5, "Coherencia con el problema central": 2, "Disponibilidad de información": 3, "Compatibilidad con contexto rural": 4 } },
      ],
    },
    {
      id: "territorio",
      tab: "Territorio",
      title: "Selección del territorio",
      baseChoice: "Calamar, Guaviare",
      criteria: {
        "Ruralidad y aislamiento": 18,
        "Pertinencia solución descentralizada": 16,
        "Potencial solar razonable": 12,
        "Delimitación específica del proyecto": 16,
        "Ubicación preliminar identificada": 14,
        "Coherencia con colegios rurales": 12,
        "Viabilidad de formular con info disponible": 12,
      },
      alternatives: [
        { name: "Calamar, Guaviare", scores: { "Ruralidad y aislamiento": 5, "Pertinencia solución descentralizada": 5, "Potencial solar razonable": 4, "Delimitación específica del proyecto": 5, "Ubicación preliminar identificada": 5, "Coherencia con colegios rurales": 5, "Viabilidad de formular con info disponible": 4 } },
        { name: "La Guajira rural", scores: { "Ruralidad y aislamiento": 5, "Pertinencia solución descentralizada": 4, "Potencial solar razonable": 5, "Delimitación específica del proyecto": 2, "Ubicación preliminar identificada": 1, "Coherencia con colegios rurales": 3, "Viabilidad de formular con info disponible": 4 } },
        { name: "Antioquia rural", scores: { "Ruralidad y aislamiento": 3, "Pertinencia solución descentralizada": 3, "Potencial solar razonable": 3, "Delimitación específica del proyecto": 2, "Ubicación preliminar identificada": 1, "Coherencia con colegios rurales": 3, "Viabilidad de formular con info disponible": 5 } },
        { name: "Chocó rural", scores: { "Ruralidad y aislamiento": 5, "Pertinencia solución descentralizada": 4, "Potencial solar razonable": 2, "Delimitación específica del proyecto": 2, "Ubicación preliminar identificada": 1, "Coherencia con colegios rurales": 3, "Viabilidad de formular con info disponible": 3 } },
        { name: "Vichada rural", scores: { "Ruralidad y aislamiento": 5, "Pertinencia solución descentralizada": 4, "Potencial solar razonable": 4, "Delimitación específica del proyecto": 2, "Ubicación preliminar identificada": 1, "Coherencia con colegios rurales": 3, "Viabilidad de formular con info disponible": 2 } },
      ],
    },
    {
      id: "tecnologia",
      tab: "Solución tecnológica",
      title: "Selección de la solución tecnológica",
      baseChoice: "Mini granja solar fotovoltaica",
      criteria: {
        "Viabilidad técnica": 18,
        "Viabilidad económica": 15,
        "Sostenibilidad ambiental": 15,
        "Cobertura de beneficiarios": 15,
        "Facilidad de operación y mantenimiento": 15,
        "Escalabilidad de la solución": 12,
        "Potencial solar": 10,
      },
      alternatives: [
        { name: "Mini granja solar fotovoltaica", scores: { "Viabilidad técnica": 4, "Viabilidad económica": 4, "Sostenibilidad ambiental": 5, "Cobertura de beneficiarios": 5, "Facilidad de operación y mantenimiento": 4, "Escalabilidad de la solución": 5, "Potencial solar": 4 } },
        { name: "Paneles solares individuales por colegio", scores: { "Viabilidad técnica": 4, "Viabilidad económica": 3, "Sostenibilidad ambiental": 5, "Cobertura de beneficiarios": 3, "Facilidad de operación y mantenimiento": 2, "Escalabilidad de la solución": 3, "Potencial solar": 4 } },
        { name: "Sistema híbrido solar-diésel", scores: { "Viabilidad técnica": 4, "Viabilidad económica": 3, "Sostenibilidad ambiental": 3, "Cobertura de beneficiarios": 4, "Facilidad de operación y mantenimiento": 3, "Escalabilidad de la solución": 4, "Potencial solar": 4 } },
        { name: "Extensión de red eléctrica convencional", scores: { "Viabilidad técnica": 2, "Viabilidad económica": 1, "Sostenibilidad ambiental": 3, "Cobertura de beneficiarios": 4, "Facilidad de operación y mantenimiento": 4, "Escalabilidad de la solución": 4, "Potencial solar": 1 } },
        { name: "Generadores diésel", scores: { "Viabilidad técnica": 4, "Viabilidad económica": 2, "Sostenibilidad ambiental": 1, "Cobertura de beneficiarios": 3, "Facilidad de operación y mantenimiento": 2, "Escalabilidad de la solución": 2, "Potencial solar": 1 } },
      ],
    },
    {
      id: "poblacion",
      tab: "Población",
      title: "Selección de la población beneficiaria",
      baseChoice: "Colegios públicos rurales priorizados, con evaluación de excedentes para comunidad cercana",
      criteria: {
        "Impacto social": 22,
        "Cobertura de beneficiarios": 20,
        "Viabilidad técnica": 20,
        "Aceptación social": 18,
        "Coherencia con el problema central": 20,
      },
      alternatives: [
        { name: "Colegios públicos rurales priorizados, con evaluación de excedentes para comunidad cercana", scores: { "Impacto social": 5, "Cobertura de beneficiarios": 4, "Viabilidad técnica": 4, "Aceptación social": 5, "Coherencia con el problema central": 5 } },
        { name: "Varios colegios públicos rurales", scores: { "Impacto social": 4, "Cobertura de beneficiarios": 4, "Viabilidad técnica": 4, "Aceptación social": 4, "Coherencia con el problema central": 5 } },
        { name: "Un solo colegio rural", scores: { "Impacto social": 2, "Cobertura de beneficiarios": 1, "Viabilidad técnica": 5, "Aceptación social": 4, "Coherencia con el problema central": 3 } },
        { name: "Comunidad general del municipio", scores: { "Impacto social": 5, "Cobertura de beneficiarios": 5, "Viabilidad técnica": 2, "Aceptación social": 4, "Coherencia con el problema central": 2 } },
      ],
    },
    {
      id: "localizacion",
      tab: "Localización",
      title: "Selección preliminar de la localización",
      baseChoice: "Punto propuesto (2.0799498, -72.6506530)",
      criteria: {
        "Viabilidad técnica": 20,
        "Cobertura de beneficiarios": 22,
        "Complejidad logística (menor=mejor)": 18,
        "Facilidad de operación y mantenimiento": 20,
        "Aceptación social": 20,
      },
      alternatives: [
        { name: "Punto propuesto (2.0799498, -72.6506530)", scores: { "Viabilidad técnica": 4, "Cobertura de beneficiarios": 5, "Complejidad logística (menor=mejor)": 3, "Facilidad de operación y mantenimiento": 4, "Aceptación social": 4 } },
        { name: "Ubicación más cercana al casco urbano", scores: { "Viabilidad técnica": 4, "Cobertura de beneficiarios": 3, "Complejidad logística (menor=mejor)": 4, "Facilidad de operación y mantenimiento": 5, "Aceptación social": 4 } },
        { name: "Ubicación en un colegio específico", scores: { "Viabilidad técnica": 4, "Cobertura de beneficiarios": 2, "Complejidad logística (menor=mejor)": 4, "Facilidad de operación y mantenimiento": 3, "Aceptación social": 3 } },
        { name: "Ubicación distribuida por colegio", scores: { "Viabilidad técnica": 3, "Cobertura de beneficiarios": 4, "Complejidad logística (menor=mejor)": 2, "Facilidad de operación y mantenimiento": 2, "Aceptación social": 4 } },
        { name: "Ubicación alternativa pendiente por validar", scores: { "Viabilidad técnica": 3, "Cobertura de beneficiarios": 3, "Complejidad logística (menor=mejor)": 3, "Facilidad de operación y mantenimiento": 3, "Aceptación social": 3 } },
      ],
    },
  ];
}

export const CHOICE_NOTE = {
  localizacion: "Ubicación preliminar seleccionada para análisis posterior, sujeta a validación técnica, territorial, ambiental y social.",
  poblacion: "Primero los colegios; el beneficio comunitario solo se evalúa si se comprueban excedentes técnicos.",
};

// Texto que explica cómo se eligieron los criterios (sección informativa).
export const CRITERIA_RATIONALE = [
  {
    title: "Problemática",
    body: "Se priorizó el impacto social y la coherencia con el problema central, porque la entrega busca una situación negativa real y socialmente relevante. Se valoró también la disponibilidad de información secundaria y la compatibilidad con el contexto rural, para asegurar que el problema fuera abordable con la información a la que podemos acceder.",
  },
  {
    title: "Territorio",
    body: "Calamar no se eligió por tener la mayor radiación del país, sino por una combinación de factores: ruralidad y aislamiento, pertinencia para una solución descentralizada, potencial solar razonable, una delimitación específica del proyecto, la existencia de una ubicación preliminar ya identificada y la coherencia con el enfoque de colegios públicos rurales. La Guajira tiene mayor potencial solar, pero menor delimitación concreta; Antioquia ofrece más información, pero se descartó por buscar un territorio más apartado y específico.",
  },
  {
    title: "Solución tecnológica",
    body: "Se ponderaron viabilidad técnica y económica, sostenibilidad ambiental, cobertura de beneficiarios, facilidad de operación y mantenimiento, escalabilidad y potencial solar. La mini granja solar destaca porque centraliza la generación, cubre varios colegios desde una infraestructura común, facilita el mantenimiento y es escalable, frente a soluciones aisladas o contaminantes.",
  },
  {
    title: "Población beneficiaria",
    body: "Se priorizó atender primero a los colegios públicos rurales, dejando el beneficio comunitario como una posibilidad a evaluar solo si se comprueban excedentes técnicos. Por eso la alternativa ganadora no promete beneficiar a toda la comunidad desde el inicio, sino que prioriza los colegios y mantiene abierta la opción comunitaria de forma responsable.",
  },
  {
    title: "Localización preliminar",
    body: "Se valoró la viabilidad técnica, la cobertura de beneficiarios, la complejidad logística, la facilidad de operación y mantenimiento y la aceptación social. El punto propuesto se mantiene como hipótesis preliminar, sujeta a validación técnica, territorial, ambiental y social; no es una decisión definitiva.",
  },
];

export const INTRO_PARAGRAPH =
  "La matriz de decisión ponderada se utilizó como herramienta de validación metodológica para comparar alternativas según criterios técnicos, sociales, ambientales, económicos y de viabilidad. El escenario base permite justificar las decisiones preliminares del proyecto: selección de la problemática energética en colegios rurales, elección de Calamar, Guaviare como territorio de estudio, priorización de colegios públicos rurales como población beneficiaria y selección de la mini granja solar como alternativa tecnológica principal. Los valores son preliminares y modificables, por lo que la matriz también permite hacer análisis de sensibilidad al cambiar la importancia de los criterios.";
