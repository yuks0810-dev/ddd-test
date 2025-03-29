import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IncidentApplicationService } from './application/services/incident-application.service';

class CreateIncidentDto {
  title: string;
  description: string;
}

@Controller('incidents')
export class IncidentController {
  constructor(private readonly incidentService: IncidentApplicationService) {}

  @Post()
  async createIncident(@Body() dto: CreateIncidentDto) {
    const id = await this.incidentService.createIncident(dto.title, dto.description);
    return { id };
  }

  @Get()
  async getAllIncidents() {
    const incidents = await this.incidentService.getAllIncidents();
    return incidents;
  }

  @Post(':id/complete')
  async completeIncident(@Param('id') id: string) {
    await this.incidentService.completeIncident(id);
    return { message: 'Incident completed successfully' };
  }

  @Get(':id')
  async getIncident(@Param('id') id: string) {
    const incident = await this.incidentService.getIncidentForAnalysis(id);
    return incident;
  }
} 