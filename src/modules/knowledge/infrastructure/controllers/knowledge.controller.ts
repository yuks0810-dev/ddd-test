import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { KnowledgeApplicationService } from '../../application/services/knowledge-application.service';

@Controller('knowledges')
export class KnowledgeController {
  constructor(
    private readonly knowledgeService: KnowledgeApplicationService,
  ) {}

  @Post('incident/:incidentId')
  async createKnowledgeFromIncident(@Param('incidentId') incidentId: string) {
    return this.knowledgeService.createKnowledgeFromIncident(incidentId);
  }

  @Post('incident/:incidentId/summary')
  async updateKnowledgeSummary(
    @Param('incidentId') incidentId: string,
    @Body() body: { summary: string; solutionSummary: string },
  ) {
    await this.knowledgeService.updateKnowledgeSummary(
      incidentId,
      body.summary,
      body.solutionSummary,
    );
    return { message: 'Knowledge summary updated successfully' };
  }

  @Get('incident/:incidentId')
  async getKnowledgeByIncidentId(@Param('incidentId') incidentId: string) {
    return this.knowledgeService.getKnowledgeByIncidentId(incidentId);
  }
} 