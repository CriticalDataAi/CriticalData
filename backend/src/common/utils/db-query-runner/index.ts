import { PostgreSQLQueryRunner } from './pg-query-runner';

export class DBQueryRunner {
	databaseType: string;
	host: string;
	username: string;
	password: string;
	port: number;
	database: string;
	schema: string;
	queryStatement: string;

	queryRunner;

	constructor(
		databaseType,
	    host,
	    username,
	    password,
	    port,
	    queryStatement,
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
	    this.queryStatement = queryStatement;

	    switch (this.databaseType) {
			case 'PostgreSQL': {
				this.queryRunner = new PostgreSQLQueryRunner(
					this.host,
					this.username,
					this.password,
					this.port,
					this.database,
					this.schema,
					this.queryStatement,
				);
				break;
			}
			default: {
				throw new Error('Database Type invalid');
			}
	    }
	}

	async executeStatement() {
		return await this.queryRunner.execute();
	}
}

export default DBQueryRunner;