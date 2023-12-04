import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TrainingStatement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  context: string;

  @Column()
  query: string;
}
