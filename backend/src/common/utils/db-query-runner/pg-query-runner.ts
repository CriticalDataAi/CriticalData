import { DataSource } from 'typeorm';
import { QueryRunner } from './query-runner.interface';

export class PostgreSQLQueryRunner implements QueryRunner {
	host: string;
	username: string;
	password: string;
	port: number;
	database: string;
	schema: string;
	queryStatement: string;

	connection;

	constructor(host, username, password, port, database, schema, queryStatement) {
		this.host = host;
		this.username = username;
		this.password = password;
		this.port = port;
		this.database = database;
		this.schema = schema == '' ? 'public' : schema;
		this.queryStatement = queryStatement;
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

	async execute() {
		await this.connect();

		const dataRows = await this.connection.query(
			this.queryStatement
		);
		console.log(dataRows);
		return dataRows;
	}
}

export default PostgreSQLQueryRunner;