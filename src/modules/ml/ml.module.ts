import { Module } from '@nestjs/common';
import { IncidentModule } from '../incident/incident.module';
import { MLPredictionService } from './application/services/ml-prediction.service';
import { IncidentCompletedHandler } from './infrastructure/events/incident-completed.handler';

@Module({
  imports: [IncidentModule],
  providers: [MLPredictionService, IncidentCompletedHandler],
})
export class MLModule {} 