import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { KnowledgeRepository } from '../../domain/repositories/knowledge.repository';
import { Knowledge } from '../../domain/entities/knowledge';

@Injectable()
export class PrismaKnowledgeRepository implements KnowledgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByIncidentId(incidentId: string): Promise<Knowledge | null> {
    const record = await this.prisma.knowledge.findUnique({
      where: { incidentId },
    });
    if (!record) return null;
    return new Knowledge(
      record.id,
      record.incidentId,
      record.title,
      record.summary,
      record.solutionSummary,
      record.createdAt,
      record.updatedAt,
    );
  }

  async save(knowledge: Knowledge): Promise<void> {
    await this.prisma.knowledge.update({
      where: { id: knowledge.id },
      data: knowledge.toJSON(),
    });
  }

  async create(knowledge: Knowledge): Promise<void> {
    await this.prisma.knowledge.create({
      data: knowledge.toJSON(),
    });
  }
} 