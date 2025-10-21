import type { UserSession } from '../types';

const API_BASE_URL = 'https://e565f331e7ac.ngrok-free.app';
const GET_SESSIONS_URL = `${API_BASE_URL}/get-sessions`;
const CANCEL_SESSION_URL = `${API_BASE_URL}/cancel-session`;


interface ApiResponse {
  'odata.count': number;
  value: UserSession[];
}

export const getActiveSessions = async (): Promise<UserSession[]> => {
  try {
    const response = await fetch(GET_SESSIONS_URL, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    // To handle cases where the API returns an empty body on success (e.g. 204 No Content)
    const text = await response.text();
    if (!text) {
        return [];
    }
    
    const data: ApiResponse = JSON.parse(text);
    return data.value || [];

  } catch (error) {
    console.error('Failed to fetch active sessions:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Failed to connect to the server. Please ensure it is running and accessible.');
    }
    // Re-throw other errors to be handled by the caller
    throw error;
  }
};

export const cancelSession = async (sessionkey: string): Promise<void> => {
  const url = new URL(CANCEL_SESSION_URL);
  url.searchParams.append('sessionkey', sessionkey);

  try {
    const response = await fetch(url.toString(), {
      method: 'POST', // Explicitly set the method to POST
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Could not read error response.');
      throw new Error(`API error: ${response.status} ${response.statusText}. Details: ${errorText}`);
    }
  } catch (error) {
    console.error(`Failed to cancel session ${sessionkey}:`, error);
    // Re-throw to be handled by the UI component
    throw error;
  }
};