import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Parameter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  value: string;
}
