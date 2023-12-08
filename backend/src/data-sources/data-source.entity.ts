import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DataSource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  url: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  database?: string;

  @Column()
  port: string;

  @Column({ nullable: true })
  schema?: string;

  @Column({ nullable: true })
  tablesToScan?: string;
}
