export interface Session {
    id: number;
    title: string;
    date: string;
    cycle: 'Fundamentos' | 'Herramientas' | 'Psicotécnico' | 'Estrategia' | 'Evaluación' | 'Específico';
    desc: string;
}

export interface HierarchyLevel {
    level: string;
    role: string;
    desc: string;
    tasks: string;
    competencies: string;
}

export interface SimoStep {
    title: string;
    text: string;
}

export interface ExamComponent {
    title: string;
    pct: string;
    type: 'Eliminatorio' | 'Clasificatorio';
    desc: string;
}
