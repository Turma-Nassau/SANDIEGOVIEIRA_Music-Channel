const BASE_URL = 'http://localhost:4000/api';

export const getAudioFiles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/audios`);
    if (!response.ok) {
      throw new Error('Failed to fetch audio files');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
