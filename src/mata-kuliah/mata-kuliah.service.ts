import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMataKuliahDto } from './dto/create-mata-kuliah.dto';
import { UpdateMataKuliahDto } from './dto/update-mata-kuliah.dto';
import { MataKuliah } from './entities/mata-kuliah.entity';

@Injectable()
export class MataKuliahService {
  private data: MataKuliah[] = [];
  create(createMataKuliahDto: CreateMataKuliahDto) {
    if (
      !createMataKuliahDto.kode ||
      !createMataKuliahDto.nama ||
      !createMataKuliahDto.sks ||
      !createMataKuliahDto.semester ||
      !createMataKuliahDto.jurusan
    ) {
      throw new BadRequestException('Semua field harus diisi');
    }

    // cek kalo kode udah ada
    const existingMataKuliah = this.data.find(
      (mataKuliah) => mataKuliah.kode === createMataKuliahDto.kode,
    );

    if (existingMataKuliah) {
      // kalo dah ada, error karena kode harus unik
      throw new ConflictException('Kode mata kuliah sudah ada');
    }

    const newMataKuliah = new MataKuliah(
      createMataKuliahDto.kode,
      createMataKuliahDto.nama,
      createMataKuliahDto.sks,
      createMataKuliahDto.semester,
      createMataKuliahDto.jurusan,
    );

    this.data.push(newMataKuliah);
    return newMataKuliah;
  }

  findAll() {
    return this.data;
  }

  findOne(kode: string) {
    return this.data.find((mataKuliah) => mataKuliah.kode === kode);
  }

  update(
    kode: string,
    updateMataKuliahDto: UpdateMataKuliahDto,
  ): MataKuliah | null {
    if (
      !updateMataKuliahDto.kode ||
      !updateMataKuliahDto.nama ||
      !updateMataKuliahDto.sks ||
      !updateMataKuliahDto.semester ||
      !updateMataKuliahDto.jurusan
    ) {
      throw new BadRequestException('Semua field harus diisi');
    }

    const index = this.data.findIndex((mataKuliah) => mataKuliah.kode === kode);
    if (index === -1) {
      throw new NotFoundException(
        `Mata kuliah dengan kode ${kode} tidak ditemukan`,
      );
    }

    const updatedMataKuliah = new MataKuliah(
      updateMataKuliahDto.kode,
      updateMataKuliahDto.nama,
      updateMataKuliahDto.sks,
      updateMataKuliahDto.semester,
      updateMataKuliahDto.jurusan,
    );
    this.data[index] = updatedMataKuliah;
    return updatedMataKuliah;
  }

  remove(kode: string): MataKuliah | null {
    const index = this.data.findIndex((mataKuliah) => mataKuliah.kode === kode);
    if (index === -1) {
      throw new NotFoundException(
        `Mata kuliah dengan kode ${kode} tidak ditemukan`,
      );
    }

    const deletedMataKuliah = this.data[index];
    this.data.splice(index, 1);
    return deletedMataKuliah;
  }
}
