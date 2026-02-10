import { TimezoneMap } from '../../types/timezone-map';
import { api } from '../api';

/**
 * Fetchs all of the TimezoneMap objects in the database
 * @returns
 */
export async function fetchAllTimezones() {
  const { data } = await api.get<TimezoneMap[]>('/timezone');

  return data;
}
