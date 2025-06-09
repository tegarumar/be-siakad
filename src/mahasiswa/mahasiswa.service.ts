import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mahasiswa } from './entities/mahasiswa.entity';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';

@Injectable()
export class MahasiswaService {
  constructor(
    @InjectRepository(Mahasiswa)
    private readonly repo: Repository<Mahasiswa>,
  ) {}

  findAll(): Promise<Mahasiswa[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Mahasiswa> {
    const data = await this.repo.findOneBy({ id });
    if (!data) {
      throw new NotFoundException(`Mahasiswa dengan ID ${id} tidak ditemukan`);
    }
    return data;
  }

  async create(dto: CreateMahasiswaDto): Promise<Mahasiswa> {
    const mhs = this.repo.create(dto);
    return this.repo.save(mhs);
  }

  async update(id: number, dto: UpdateMahasiswaDto): Promise<Mahasiswa> {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) throw new NotFoundException('Mahasiswa tidak ditemukan');

    const updated = this.repo.merge(existing, dto);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Mahasiswa tidak ditemukan');
    }
  }
}
