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

export const login  = async (email:string, password:string): Promise<boolean> => {
    try {
      let db = await openDatabaseAsync('tripflow.db');
      let user = await db.getFirstAsync(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password]);
      if (user){
        return true
      }
      return false
    } catch (error) {
      console.error(' Erreur lors de l\'init de la base :', error);
      throw error;
    }
  };
