import { PostgreSQLMetadataExtractor } from './pg-metadata-extractor';

export class DBMetadataExtractor {
  databaseType: string;

  host: string;
  username: string;
  password: string;
  port: number;
  database: string;
  schema: string;

  metadataExtractor;

  constructor(
    databaseType,
    host,
    username,
    password,
    port,
    database = '',
    schema = '',
  ) {
    this.databaseType = databaseType;

    this.host = host;
    this.username = username;
    this.password = password;
    this.port = port;
    this.database = database;
    this.schema = schema;

    switch (this.databaseType) {
      case 'PostgreSQL': {
        this.metadataExtractor = new PostgreSQLMetadataExtractor(
          this.host,
          this.username,
          this.password,
          this.port,
          this.database,
          this.schema,
        );
        break;
      }
      default: {
        throw new Error('Database Type invalid');
      }
    }
  }

  async extractMetadata() {
    return await this.metadataExtractor.generateMetadata();
  }
}

export default DBMetadataExtractor;
