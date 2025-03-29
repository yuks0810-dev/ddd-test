import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IncidentCompletedEvent } from '../../../incident/domain/events/incident-completed.event';
import { MLPredictionService } from '../../application/services/ml-prediction.service';

@Injectable()
export class IncidentCompletedHandler {
  constructor(private readonly mlService: MLPredictionService) {}

  @OnEvent('incident.completed')
  async handleIncidentCompleted(event: IncidentCompletedEvent) {
    console.log(`[Event Handler] Received incident.completed event for ID: ${event.incidentId}`);
    await this.mlService.predictCause(event.incidentId);
  }
} 