import { IsString, IsNumber } from 'class-validator';
export class CreateMataKuliahDto {
  @IsString({ message: 'Kode mata kuliah harus berupa teks' })
  kode: string;

  @IsString({ message: 'Nama mata kuliah tidak boleh kosong' })
  nama: string;

  @IsNumber({}, { message: 'SKS harus berupa angka' })
  sks: number;

  @IsString({ message: 'Semester harus berupa teks' })
  semester: string;

  @IsString({ message: 'Jurusan tidak boleh kosong' })
  jurusan: string;
}
