import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { IncidentModule } from './modules/incident/incident.module';
import { MLModule } from './modules/ml/ml.module';
import { KnowledgeModule } from './modules/knowledge/knowledge.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    PrismaModule,
    IncidentModule,
    MLModule,
    KnowledgeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
