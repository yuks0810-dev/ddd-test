import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IncidentRepository } from '../../domain/repositories/incident.repository';
import { Incident } from '../../domain/entities/incident';

@Injectable()
export class PrismaIncidentRepository implements IncidentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Incident | null> {
    const record = await this.prisma.incident.findUnique({ where: { id } });
    if (!record) return null;
    return new Incident(
      record.id,
      record.title,
      record.description,
      record.status,
      record.createdAt,
      record.updatedAt,
    );
  }

  async save(incident: Incident): Promise<void> {
    await this.prisma.incident.update({
      where: { id: incident.id },
      data: incident.toJSON(),
    });
  }

  async findAll(): Promise<Incident[]> {
    const records = await this.prisma.incident.findMany();
    return records.map(
      (record) =>
        new Incident(
          record.id,
          record.title,
          record.description,
          record.status,
          record.createdAt,
          record.updatedAt,
        ),
    );
  }

  async create(incident: Incident): Promise<void> {
    await this.prisma.incident.create({
      data: incident.toJSON(),
    });
  }
} 