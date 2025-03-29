import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IncidentRepository } from '../../domain/repositories/incident.repository';
import { Incident } from '../../domain/entities/incident';
import { IncidentCompletedEvent } from '../../domain/events/incident-completed.event';

@Injectable()
export class IncidentApplicationService {
  constructor(
    @Inject('IncidentRepository')
    private readonly repository: IncidentRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getIncidentForAnalysis(id: string): Promise<Incident> {
    const incident = await this.repository.findById(id);
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    return incident;
  }

  async completeIncident(id: string): Promise<void> {
    const incident = await this.repository.findById(id);
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }

    incident.complete();
    await this.repository.save(incident);

    const event = new IncidentCompletedEvent(incident.id);
    this.eventEmitter.emit('incident.completed', event);
  }

  async createIncident(title: string, description: string): Promise<string> {
    const incident = new Incident(
      Math.random().toString(36).substr(2, 9),
      title,
      description,
      'OPEN',
    );
    await this.repository.create(incident);
    return incident.id;
  }

  async getAllIncidents(): Promise<Incident[]> {
    return this.repository.findAll();
  }
} 