import { Test, TestingModule } from '@nestjs/testing';
import { TrainingStatementsController } from './training_statements.controller';

describe('TrainingStatementsController', () => {
  let controller: TrainingStatementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingStatementsController],
    }).compile();

    controller = module.get<TrainingStatementsController>(TrainingStatementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
