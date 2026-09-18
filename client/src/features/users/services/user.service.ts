import apiClient from '../../../services/apiClient';

export const getAvailableTalent = async (role: 'CAST' | 'CREW'): Promise<any[]> => {
  const response = await apiClient.get('/users/talent', { params: { role } });
  return response.data.data.users;
};
