import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import { IncidentApplicationService } from './application/services/incident-application.service';
import { PrismaIncidentRepository } from './infrastructure/prisma/prisma-incident.repository';
import { IncidentController } from './incident.controller';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [IncidentController],
  providers: [
    PrismaService,
    IncidentApplicationService,
    {
      provide: 'IncidentRepository',
      useClass: PrismaIncidentRepository,
    },
  ],
  exports: [IncidentApplicationService],
})
export class IncidentModule {} 