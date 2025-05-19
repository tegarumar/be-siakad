import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import { MataKuliahService } from './mata-kuliah.service';
import { CreateMataKuliahDto } from './dto/create-mata-kuliah.dto';
import { UpdateMataKuliahDto } from './dto/update-mata-kuliah.dto';

@Controller('mata-kuliah')
export class MataKuliahController {
  constructor(private readonly mataKuliahService: MataKuliahService) {}
  @Get()
  findAll() {
    return this.mataKuliahService.findAll();
  }

  @Get(':kode')
  findOne(@Param('kode') kode: string) {
    const matkul = this.mataKuliahService.findOne(kode);

    if (!matkul) {
      throw new NotFoundException(
        `Mata kuliah dengan kode ${kode} tidak ditemukan`,
      );
    }

    return matkul;
  }

  @Post()
  create(@Body() createMataKuliahDto: CreateMataKuliahDto) {
    try {
      return this.mataKuliahService.create(createMataKuliahDto);
    } catch (error) {
      if (error.getStatus) {
        throw error;
      }
      throw new InternalServerErrorException('Terjadi kesalahan tak dikenal');
    }
  }

  @Put(':kode')
  update(
    @Param('kode') kode: string,
    @Body() updateMataKuliahDto: UpdateMataKuliahDto,
  ) {
    try {
      const updated = this.mataKuliahService.update(kode, updateMataKuliahDto);
      return updated;
    } catch (error) {
      if (error.getStatus) {
        throw error;
      }
      throw new InternalServerErrorException('Terjadi kesalahan tak dikenal');
    }
  }

  @Delete(':kode')
  remove(@Param('kode') kode: string) {
    try {
      return this.mataKuliahService.remove(kode);
    } catch (error) {
      if (error.getStatus) {
        throw error;
      }
      throw new InternalServerErrorException('Terjadi kesalahan tak dikenal');
    }
  }
}
