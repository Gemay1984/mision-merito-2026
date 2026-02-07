import type { Session, HierarchyLevel, SimoStep, ExamComponent } from '../types';

export const schedule: Session[] = [
    { id: 0, title: "Sesión Introductoria", date: "2026-02-07", cycle: "Fundamentos", desc: "Navegación en SIMO, análisis de la OPEC, selección de vacante según perfil y carga correcta de documentos para evitar exclusión en VRM." },
    { id: 1, title: "Constitución Política I", date: "2026-02-14", cycle: "Fundamentos", desc: "Derechos fundamentales, mecanismos de protección (Tutela, Habeas Corpus, Habeas Data) y su aplicación en la función pública." },
    { id: 2, title: "Constitución Política II", date: "2026-02-21", cycle: "Fundamentos", desc: "Estructura del Estado, ramas del poder público, órganos de control y su articulación institucional." },
    { id: 3, title: "Régimen del Servicio Público", date: "2026-02-28", cycle: "Fundamentos", desc: "Ley 909 de 2004, carrera administrativa, situaciones administrativas, derechos y deberes de los servidores." },
    { id: 4, title: "MIPG D1: Talento Humano", date: "2026-03-07", cycle: "Fundamentos", desc: "El servidor público como corazón del modelo. Política de Integridad y ciclo de vida del talento humano." },
    { id: 5, title: "MIPG D2: Direccionamiento", date: "2026-03-14", cycle: "Fundamentos", desc: "Planeación estratégica, indicadores de gestión y alineación con el Plan Nacional de Desarrollo." },
    { id: 6, title: "Atención al Ciudadano", date: "2026-03-21", cycle: "Fundamentos", desc: "Ley 1755 de 2015 (Derecho de Petición), Ley 1437 (CPACA) y protocolos de servicio con enfoque ciudadano." },
    { id: 7, title: "Gestión Documental", date: "2026-03-28", cycle: "Fundamentos", desc: "Ley 594 de 2000, tablas de retención, ciclo vital del documento y normas del Archivo General de la Nación." },
    { id: 8, title: "MIPG D3: Gestión con Valores", date: "2026-04-11", cycle: "Fundamentos", desc: "Eficiencia administrativa, racionalización de trámites y fundamentos de contratación estatal (Ley 80)." },
    { id: 9, title: "MIPG D4 y D5: Evaluación", date: "2026-04-18", cycle: "Fundamentos", desc: "Seguimiento a resultados, gestión de la información, transparencia y seguridad digital." },
    { id: 10, title: "Simulacro 1: Transversales", date: "2026-04-25", cycle: "Evaluación", desc: "Prueba de 60 ítems cronometrada sobre conocimientos básicos comunes a todos los niveles." },
    { id: 11, title: "Ofimática I: Word", date: "2026-05-02", cycle: "Herramientas", desc: "Redacción de actos administrativos, ortografía técnica y formatos oficiales de comunicación." },
    { id: 12, title: "Ofimática II: Excel", date: "2026-05-09", cycle: "Herramientas", desc: "Análisis de datos, tablas dinámicas para niveles profesional/técnico y fórmulas básicas para asistencial." },
    { id: 13, title: "Razonamiento Lógico", date: "2026-05-16", cycle: "Herramientas", desc: "Interpretación de gráficas, series numéricas y análisis de datos estadísticos para la toma de decisiones." },
    { id: 14, title: "Transparencia (Ley 1712)", date: "2026-05-23", cycle: "Fundamentos", desc: "Acceso a la información pública, datos abiertos y lucha contra la corrupción." },
    { id: 15, title: "Comportamentales I", date: "2026-05-30", cycle: "Psicotécnico", desc: "Análisis del Decreto 815 de 2018: Conductas asociadas a los niveles Asistencial y Técnico." },
    { id: 16, title: "Comportamentales II", date: "2026-06-06", cycle: "Psicotécnico", desc: "Conductas asociadas al Nivel Profesional: Toma de decisiones, liderazgo y aporte técnico." },
    { id: 17, title: "Lectura Crítica", date: "2026-06-13", cycle: "Estrategia", desc: "Técnicas para identificar el problema central en casos de juicio situacional y descartar distractores." },
    { id: 18, title: "Simulacro 2: Psicotécnico", date: "2026-06-20", cycle: "Evaluación", desc: "Evaluación de competencias comportamentales y valores del Código de Integridad." },
    { id: 19, title: "Especialización Profesional", date: "2026-07-18", cycle: "Específico", desc: "Derecho administrativo complejo, supervisión de contratos y planeación misional." },
    { id: 20, title: "Especialización Técnico", date: "2026-07-25", cycle: "Específico", desc: "Operatividad de sistemas de información, soporte técnico y elaboración de informes." },
    { id: 21, title: "Especialización Asistencial", date: "2026-08-01", cycle: "Específico", desc: "Gestión de archivo físico, correspondencia, radicación y atención telefónica/presencial." },
    { id: 22, title: "MIPG D6 y D7: MECI", date: "2026-08-08", cycle: "Fundamentos", desc: "Gestión del conocimiento, innovación pública y Modelo Estándar de Control Interno (Líneas de defensa)." },
    { id: 23, title: "SST Sector Público", date: "2026-08-15", cycle: "Específico", desc: "Normatividad de Seguridad y Salud en el Trabajo aplicada a entidades del Estado." },
    { id: 24, title: "Régimen Disciplinario", date: "2026-08-22", cycle: "Específico", desc: "Procedimiento sancionatorio, faltas gravísimas, graves y leves según el Código General Disciplinario." },
    { id: 25, title: "Simulacro 3: Funcionales", date: "2026-08-29", cycle: "Evaluación", desc: "Prueba específica por niveles jerárquicos centrada en el 'saber hacer' del cargo." }
];

export const hierarchyLevels: HierarchyLevel[] = [
    {
        level: "Profesional",
        role: "Gestor y Analista",
        desc: "Exige aplicación de conocimientos universitarios para cumplir objetivos institucionales.",
        tasks: "Derecho administrativo complejo, proyectos, planeación y supervisión contractual.",
        competencies: "Aporte técnico, comunicación efectiva, toma de decisiones."
    },
    {
        level: "Técnico",
        role: "Soporte y Experticia",
        desc: "Aplica procedimientos y tecnologías para garantizar la operatividad de los procesos.",
        tasks: "Mantenimiento de sistemas, informes técnicos, apoyo a la gestión administrativa.",
        competencies: "Confiabilidad técnica, disciplina, responsabilidad operativa."
    },
    {
        level: "Asistencial",
        role: "Apoyo Operativo",
        desc: "Ejecuta tareas administrativas y operativas complementarias.",
        tasks: "Gestión documental, correspondencia, ofimática básica y servicio al cliente.",
        competencies: "Relaciones interpersonales, colaboración, manejo de información."
    }
];

export const simoSteps: SimoStep[] = [
    { title: "Registro Único", text: "Cree su cuenta en simo.cnsc.gov.co con datos básicos." },
    { title: "Carga de Documentos", text: "Suba CC, diplomas, actas y certificados laborales con funciones detalladas." },
    { title: "Búsqueda OPEC", text: "Filtre por entidad, nivel y salario. Guarde sus opciones en el 'Panel de Control'." },
    { title: "Pago de Derechos", text: "Generar recibo para banco o PSE ($58.400 / $87.550)." },
    { title: "Confirmación", text: "Debe formalizar la inscripción. Si no da clic en 'Confirmar', no queda inscrito." }
];

export const examComponents: ExamComponent[] = [
    { title: "Competencias Funcionales", pct: "60%", type: "Eliminatorio", desc: "Evalúa el conocimiento técnico y el 'saber hacer' específico." },
    { title: "Competencias Comportamentales", pct: "20%", type: "Clasificatorio", desc: "Mide habilidades blandas, valores y conductas laborales." },
    { title: "Valoración de Antecedentes", pct: "20%", type: "Clasificatorio", desc: "Puntos extra por formación y experiencia adicional." }
];
