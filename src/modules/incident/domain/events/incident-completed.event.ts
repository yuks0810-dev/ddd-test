export class IncidentCompletedEvent {
  constructor(
    public readonly incidentId: string,
    public readonly completedAt: Date = new Date(),
  ) {}
} 