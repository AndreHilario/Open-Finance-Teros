import api from '../api';

export async function insertParticipantsApi() {
  const response = await api.post('/participants/insert');
  return response.data;
}