import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mahasiswa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nim: string;

  @Column()
  nama: string;

  @Column()
  prodi: string;

  @Column()
  angkatan: number;

  @Column()
  email: string;
}
