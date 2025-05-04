import { openDatabaseAsync } from 'expo-sqlite';
import * as Crypto from 'expo-crypto';

export const login  = async (email:string, password:string): Promise<boolean> => {
    try {
      let db = await openDatabaseAsync('tripflow.db');
      let hashed_password = await hash(password);
      let user = await db.getFirstAsync(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, hashed_password]);
      if (user){
        return true
      }
      return false
    } catch (error) {
      console.error(' Erreur lors de l\'init de la base :', error);
      throw error;
    }
  };

export const hash = async (password:string) : Promise<string>=> {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return digest;
}

export const create = async (first_name:string, last_name:string, email: string, password:string): Promise<boolean> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    let hashed_password = await hash(password);
    const result = await db.runAsync('INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?,?, ?)', [email, hashed_password, first_name, last_name]);
    return result.lastInsertRowId?true:false;
  } catch (error) {
    console.error('Erreur lors de l\'inscription, veuillez réessayer plus tard', error);
    throw error
  }
}

export const getUser = async (email: string): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getFirstAsync('SELECT * FROM users WHERE email = ? ', email);
    return result;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const getAllUsers = async (): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('SELECT * FROM users');
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}