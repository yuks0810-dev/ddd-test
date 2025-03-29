export class Knowledge {
  constructor(
    public readonly id: string,
    public readonly incidentId: string,
    public title: string,
    public summary: string,
    public solutionSummary: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  toJSON() {
    return {
      id: this.id,
      incidentId: this.incidentId,
      title: this.title,
      summary: this.summary,
      solutionSummary: this.solutionSummary,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 