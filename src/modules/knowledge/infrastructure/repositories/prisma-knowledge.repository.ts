import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { KnowledgeRepository } from '../../domain/repositories/knowledge.repository';
import { Knowledge } from '../../domain/entities/knowledge';

@Injectable()
export class PrismaKnowledgeRepository implements KnowledgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(knowledge: Knowledge): Promise<void> {
    await this.prisma.knowledge.create({
      data: {
        id: knowledge.id,
        incidentId: knowledge.incidentId,
        title: knowledge.title,
        summary: knowledge.summary,
        solutionSummary: knowledge.solutionSummary,
        createdAt: knowledge.createdAt,
        updatedAt: knowledge.updatedAt,
      },
    });
  }

  async save(knowledge: Knowledge): Promise<void> {
    await this.prisma.knowledge.update({
      where: { id: knowledge.id },
      data: {
        title: knowledge.title,
        summary: knowledge.summary,
        solutionSummary: knowledge.solutionSummary,
        updatedAt: new Date(),
      },
    });
  }

  async findByIncidentId(incidentId: string): Promise<Knowledge | null> {
    const knowledge = await this.prisma.knowledge.findUnique({
      where: { incidentId },
    });

    if (!knowledge) {
      return null;
    }

    return new Knowledge(
      knowledge.id,
      knowledge.incidentId,
      knowledge.title,
      knowledge.summary,
      knowledge.solutionSummary,
      knowledge.createdAt,
      knowledge.updatedAt,
    );
  }
} 