import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { IncidentModule } from './modules/incident/incident.module';
import { MLModule } from './modules/ml/ml.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    IncidentModule,
    MLModule,
  ],
})
export class AppModule {}
