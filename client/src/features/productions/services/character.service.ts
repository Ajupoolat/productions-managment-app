import apiClient from '../../../services/apiClient';
import type { Character } from '../types/production.types';

export const createCharacter = async (productionId: string, data: Partial<Character>): Promise<Character> => {
  const response = await apiClient.post(`/productions/${productionId}/characters`, data);
  return response.data.data.character;
};

export const getCharacters = async (productionId: string): Promise<Character[]> => {
  const response = await apiClient.get(`/productions/${productionId}/characters`);
  return response.data.data.characters;
};

export const updateCharacter = async (productionId: string, id: string, data: Partial<Character>): Promise<Character> => {
  const response = await apiClient.put(`/productions/${productionId}/characters/${id}`, data);
  return response.data.data.character;
};

export const deleteCharacter = async (productionId: string, id: string): Promise<void> => {
  await apiClient.delete(`/productions/${productionId}/characters/${id}`);
};
