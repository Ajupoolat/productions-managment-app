import apiClient from '../../../services/apiClient';

export const getAvailableTalent = async (type: 'CAST' | 'CREW'): Promise<any[]> => {
  const response = await apiClient.get('/users/talent', { params: { type } });
  return response.data.data.users;
};
