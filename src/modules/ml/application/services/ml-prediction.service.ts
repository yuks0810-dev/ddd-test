import { Injectable } from '@nestjs/common';
import { IncidentApplicationService } from '../../../incident/application/services/incident-application.service';

@Injectable()
export class MLPredictionService {
  constructor(private readonly incidentService: IncidentApplicationService) {}

  async predictCause(incidentId: string): Promise<{ cause: string; confidence: number }> {
    const incident = await this.incidentService.getIncidentForAnalysis(incidentId);
    
    // 実際のML予測の代わりに、簡単なルールベースの予測をシミュレート
    const keywords = {
      'error': 'System Error',
      'timeout': 'Network Timeout',
      'crash': 'Application Crash',
      'slow': 'Performance Issue',
      'security': 'Security Breach',
    };

    const description = incident.description.toLowerCase();
    let predictedCause = 'Unknown Issue';
    let confidence = 0.5;

    for (const [keyword, cause] of Object.entries(keywords)) {
      if (description.includes(keyword)) {
        predictedCause = cause;
        confidence = 0.8;
        break;
      }
    }

    console.log(`[ML Prediction] Analyzing incident: ${incident.title}`);
    console.log(`[ML Prediction] Description: ${incident.description}`);
    console.log(`[ML Prediction] Predicted cause: ${predictedCause} (confidence: ${confidence})`);

    return {
      cause: predictedCause,
      confidence: confidence,
    };
  }
} 