export interface QueryRunner {
  connect(): void;

  execute(): void;
}