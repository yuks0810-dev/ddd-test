import { Injectable, Inject } from '@nestjs/common';
import { KnowledgeRepository } from '../../domain/repositories/knowledge.repository';
import { Knowledge } from '../../domain/entities/knowledge';
import { IncidentApplicationService } from '../../../incident/application/services/incident-application.service';

@Injectable()
export class KnowledgeApplicationService {
  constructor(
    @Inject('KnowledgeRepository')
    private readonly repository: KnowledgeRepository,
    private readonly incidentService: IncidentApplicationService,
  ) {}

  async createKnowledgeFromIncident(incidentId: string): Promise<Knowledge> {
    const incident = await this.incidentService.getIncidentForAnalysis(incidentId);
    if (!incident) {
      throw new Error(`Incident with ID ${incidentId} not found`);
    }

    // 既存のナレッジをチェック
    const existingKnowledge = await this.repository.findByIncidentId(incidentId);
    if (existingKnowledge) {
      throw new Error(`Knowledge for incident ${incidentId} already exists`);
    }

    // ナレッジを作成
    const knowledge = new Knowledge(
      Math.random().toString(36).substr(2, 9),
      incidentId,
      incident.title,
      '', // MLモジュールで要約後に設定
      '', // MLモジュールで要約後に設定
      new Date(), // createdAt
      new Date(), // updatedAt
    );

    await this.repository.create(knowledge);
    return knowledge;
  }

  async updateKnowledgeSummary(
    incidentId: string,
    summary: string,
    solutionSummary: string,
  ): Promise<void> {
    const knowledge = await this.repository.findByIncidentId(incidentId);
    if (!knowledge) {
      throw new Error(`Knowledge for incident ${incidentId} not found`);
    }

    knowledge.summary = summary;
    knowledge.solutionSummary = solutionSummary;
    await this.repository.save(knowledge);
  }

  async getKnowledgeByIncidentId(incidentId: string): Promise<Knowledge | null> {
    return this.repository.findByIncidentId(incidentId);
  }
} 