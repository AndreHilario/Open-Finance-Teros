import api from "../api";

export async function listParticipantsApi() {
  const response = await api.get("/participants");
  return response.data;
}