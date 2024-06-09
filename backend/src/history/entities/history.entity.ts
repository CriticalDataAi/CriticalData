import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity("history")
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', name: 'question_source'})
  questionSource: string;

  @Column({ nullable: false, type: 'varchar', name: 'question_username'})
  questionUsername: string;

  @Column({ nullable: false, type: 'varchar', name: 'question_asked' })
  questionAsked: string;

  @Column({ nullable: false, type: 'varchar' })
  status: string;

  @Column({ nullable: false, type: 'varchar', name: 'question_response' })
  questionResponse: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: true, type: 'varchar', name: 'validation_status' })
  validationStatus: string;
}