import { openDatabaseAsync } from 'expo-sqlite';
import { getUser } from './users_db';

export const createStep = async (id_trip:string, place_name:string, place_lat:number, place_lon:number, start_date: string, end_date:string, description:string): Promise<boolean> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.runAsync('INSERT INTO steps (id_trip, place_name, place_lat, place_lon, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?, ?)', [id_trip, place_name, place_lat, place_lon, start_date, end_date, description]);
    return result.lastInsertRowId?true:false;
  } catch (error) {
    console.error('Erreur lors de la création de l\'étape, veuillez réessayer plus tard', error);
    throw error
  }
}

export const getStep = async (id: number): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('SELECT * FROM steps WHERE id = ? ', id);
    return result[0];
  } catch (error) {
    console.error(error);
    throw error
  }
}


export const getTripSteps = async (id_trip: number): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('SELECT * FROM steps WHERE id_trip = ? ', id_trip);
    return result;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const getAllSteps = async (): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('SELECT * FROM steps');
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const updateStep = async (place_name:string, place_lat:number, place_lon:number, start_date: string, end_date:string, description:string,id: number): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('UPDATE steps SET place_name = ?, place_lat = ? , place_lon = ?, start_date = ?, end_date = ?, description= ?  WHERE id = ?',[ place_name, place_lat, place_lon, start_date, end_date, description, id]);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const deleteStep = async (id: number): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('DELETE FROM steps WHERE id = ?',id);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}