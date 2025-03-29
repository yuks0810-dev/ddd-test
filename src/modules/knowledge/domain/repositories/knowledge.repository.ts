import { Knowledge } from '../entities/knowledge';

export interface KnowledgeRepository {
  create(knowledge: Knowledge): Promise<void>;
  save(knowledge: Knowledge): Promise<void>;
  findByIncidentId(incidentId: string): Promise<Knowledge | null>;
} 