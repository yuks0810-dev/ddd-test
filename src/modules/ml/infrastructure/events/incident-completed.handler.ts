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
    console.log(`[Event Handler] Event timestamp: ${event.completedAt}`);

    try {
      const prediction = await this.mlService.predictCause(event.incidentId);
      console.log('[Event Handler] ML Prediction completed:');
      console.log(`- Predicted Cause: ${prediction.cause}`);
      console.log(`- Confidence: ${prediction.confidence * 100}%`);
    } catch (error) {
      console.error('[Event Handler] Failed to process ML prediction:', error);
    }
  }
} 