import apiClient from './apiClient';


  export async function getProfile(token: string) {
    try {
      const response = await apiClient.get('/profile/getProfile', {
        headers: {
          "Content-Type": "application/json",
        },
        params: { token },
      });
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching profile info !!!!:', error);
      throw error;
    }
  }

