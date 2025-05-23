import { openDatabaseAsync } from 'expo-sqlite';
import { getUser } from './users_db';
import { getTripSteps } from './steps_db';

export const create = async (user_email:string, title:string, start_date: string, end_date:string, image:any): Promise<boolean> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const user = await getUser(user_email);
    const result = await db.runAsync('INSERT INTO trips (id_user, title, start_date, end_date, image) VALUES (?, ?, ?, ?, ?)', [user.id, title, start_date, end_date, image]);
    return result.lastInsertRowId?true:false;
  } catch (error) {
    console.error('Erreur lors de la création du voyage, veuillez réessayer plus tard', error);
    throw error
  }
}

export const tripByUser = async (id: number): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('SELECT * FROM trips WHERE id_user = ? ', id);
    result.forEach(async (trip,index) => {
      let steps = await getTripSteps(trip.id)   
      trip.steps = steps.length  
      result[index] = trip
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const getTrip = async (id: number): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('SELECT * FROM trips WHERE id = ? ', id);
    return result[0];
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const getAllTrips = async (): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    let result = await db.getAllAsync('SELECT * FROM trips');
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const clearAllTrips = async (): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('DELETE FROM trips');
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export const deleteTrip = async (id: number): Promise<any> => {
  try {
    let db = await openDatabaseAsync('tripflow.db');
    const result = await db.getAllAsync('DELETE FROM trips WHERE id = ?',id);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}