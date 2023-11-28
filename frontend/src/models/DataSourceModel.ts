export type DataSourceType = 'PostgreSQL' | 'MySQL';

export interface DataSourceModel {
  id: string;
  type: DataSourceType;
  url: string;
  username: string;
  password: string;
  database: string;
  port: number;
}
