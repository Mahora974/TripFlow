import { openDatabaseAsync } from 'expo-sqlite';

export const createList = async (id_trip:number, label:string): Promise<boolean> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.runAsync('INSERT INTO lists (id_trip,label,checked) VALUES (?, ?, ?)', [id_trip,label,0]);
    return result.lastInsertRowId?true:false;
  } catch (error) {
    console.error('Erreur lors de la création de la liste, veuillez réessayer plus tard', error);
    throw error
  }
}

export const getTripList = async (id_trip:number): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('SELECT * FROM lists WHERE id_trip = ?', [id_trip]);
    return result;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const updateList = async (id:number, checked:boolean): Promise<boolean> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.runAsync('UPDATE lists SET checked = ? WHERE id = ?', [checked, id]);
    return result.lastInsertRowId?true:false;
  } catch (error) {
    console.error(error);
    throw error
  }
}
