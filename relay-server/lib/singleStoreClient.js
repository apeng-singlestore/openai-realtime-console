import { SingleStoreClient } from '@singlestore/client';

const client = new SingleStoreClient();

const connection = client.connect({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

// Connect to the database
const database = connection.database.use(process.env.DATABASE_NAME);

const commentaryTable = await database.table.create({
  name: 'commentary_table',
  columns: {
    timestamp: { type: 'DATETIME', nullable: false },
    commentary: { type: 'TEXT', nullable: false },
    embedding: { type: 'vector(1536)', nullable: true },
    latency: { type: 'FLOAT', nullable: true },
  },
});

export default commentaryTable;

// // Function to perform raw queries on the SingleStore database
// export async function query(sql, values = []) {
//   try {
//     const workspace = client.workspace({
//       host: process.env.DATABASE_HOST,
//       user: process.env.DATABASE_USERNAME,
//       password: process.env.DATABASE_PASSWORD,
//       port: process.env.DATABASE_PORT,
//     });

//     const database = workspace.database(process.env.DATABASE_NAME);
//     const [results] = await database.query(sql, values);
//     return results;
//   } catch (error) {
//     console.error('Error executing query:', error);
//     throw error;
//   }
// }
