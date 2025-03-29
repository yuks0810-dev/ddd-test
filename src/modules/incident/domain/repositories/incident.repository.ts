import { Incident } from '../entities/incident';

export interface IncidentRepository {
  findById(id: string): Promise<Incident | null>;
  save(incident: Incident): Promise<void>;
  findAll(): Promise<Incident[]>;
  create(incident: Incident): Promise<void>;
} 