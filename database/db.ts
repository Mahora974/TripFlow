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
        
        CREATE TABLE IF NOT EXISTS trips (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_user INTEGER NOT NULL, 
            title VARCHAR(250) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            image VARCHAR(50) NOT NULL,
            FOREIGN KEY(id_user) REFERENCES users(id)
        );
    `);
  } catch (error) {
    console.error(' Erreur lors de l\'init de la base');
    throw error;
  }
};
