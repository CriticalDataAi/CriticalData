import { Test, TestingModule } from '@nestjs/testing';
import { TrainingStatementsService } from './training_statements.service';

describe('TrainingStatementsService', () => {
  let service: TrainingStatementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingStatementsService],
    }).compile();

    service = module.get<TrainingStatementsService>(TrainingStatementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
