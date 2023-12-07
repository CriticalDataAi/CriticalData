import pgMetadataQuery from './constants/pg-queries';
import { DataSource } from 'typeorm';
import { MetadataExtractor } from './metadata-extractor.interface';

export class PostgreSQLMetadataExtractor implements MetadataExtractor {
  host: string;
  username: string;
  password: string;
  port: number;
  database: string;
  schema: string;

  connection;

  constructor(host, username, password, port, database, schema) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.port = port;
    this.database = database;
    this.schema = schema == '' ? 'public' : schema;
  }

  async connect() {
    this.connection = new DataSource({
      type: 'postgres',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
    });

    return await this.connection.initialize();
  }

  async generateMetadata() {
    await this.connect();

    const ddlColumnRows = await this.connection.query(pgMetadataQuery);
    return this.parseRowsToDDL(ddlColumnRows);
  }

  parseRowsToDDL(ddlColumnRows) {
    const tables = {};
    const tableNames = [];
    let ddl = '';

    ddlColumnRows.forEach((row) => {
      if (tables[row.table_name] == undefined) {
        tables[row.table_name] = [];
        tableNames.push(row.table_name);
      }

      tables[row.table_name].push(this.columnsToDDL(row));
    });

    tableNames.forEach((table) => {
      ddl += `create table ${table} (\n`;

      tables[table].forEach((column) => {
        ddl += `\t${column},\n`;
      });

      ddl = ddl.slice(0, -2) + `\n);\n\n`;
    });

    return ddl;
  }

  columnsToDDL(columnData) {
    const isNullable = columnData.is_nullable == 'NO' ? 'not null' : '';
    const columnDefault = columnData.column_default
      ? `default ${columnData.column_default}`
      : '';
    const foreignRelation = columnData.foreign_column_name
      ? `references ${columnData.foreign_table_name} (${columnData.foreign_column_name}) on update cascade on delete restrict`
      : '';

    return `${columnData.column_name} ${columnData.udt_name} ${columnDefault} ${isNullable} ${foreignRelation}`;
  }
}

export default PostgreSQLMetadataExtractor;
