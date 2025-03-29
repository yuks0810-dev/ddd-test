import { Module } from '@nestjs/common';
import { KnowledgeController } from './infrastructure/controllers/knowledge.controller';
import { KnowledgeApplicationService } from './application/services/knowledge-application.service';
import { KnowledgeRepository } from './domain/repositories/knowledge.repository';
import { PrismaKnowledgeRepository } from './infrastructure/repositories/prisma-knowledge.repository';
import { IncidentModule } from '../incident/incident.module';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [IncidentModule],
  controllers: [KnowledgeController],
  providers: [
    PrismaService,
    KnowledgeApplicationService,
    {
      provide: 'KnowledgeRepository',
      useClass: PrismaKnowledgeRepository,
    },
  ],
  exports: [KnowledgeApplicationService],
})
export class KnowledgeModule {} 