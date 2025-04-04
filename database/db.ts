import { openDatabaseAsync } from 'expo-sqlite';


export const initDB = async (): Promise<void> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(250) UNIQUE NOT NULL,
            password VARCHAR(250) NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL
        );
    `);
  } catch (error) {
    console.error(' Erreur lors de l\'init de la base');
    throw error;
  }
};
