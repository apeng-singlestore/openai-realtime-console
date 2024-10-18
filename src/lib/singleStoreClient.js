import { SingleStoreClient } from '@singlestore/client';

const client = new SingleStoreClient();

const connection = client.connect({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

// Connect to the database
const database = connection.database.use(process.env.DATABASE_NAME);

const singlestore = await database.table.create({
  name: 'commentary_table',
  columns: {
    timestamp: { type: 'DATETIME', nullable: false },
    commentary: { type: 'TEXT', nullable: false },
    latency: { type: 'FLOAT', nullable: true },
  },
});

export { singlestore };
