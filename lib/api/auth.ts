import { apiClient } from './client';

export interface LoginData {
  username: string;
  password: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserProfile;
}

export interface MessageResponse {
  message: string;
}

export const authApi = {

  // User login
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post<{ message: string; data: { user: UserProfile; token: string } }>('/auth/login', data);
    
    return {
      message: response.data.message,
      token: response.data.data.token,
      user: response.data.data.user,
    };
  },

  // Get user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile | { data: UserProfile }>('/auth/');
    const result = response.data;
    return 'data' in result ? result.data : result;
  },

  // Update user profile
  updateProfile: async (data: Partial<UserProfile>): Promise<{ message: string; user: UserProfile }> => {
    const response = await apiClient.put<{ message: string; user: UserProfile }>('/auth/', data);
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordData): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/change-password', data);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordData): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/forgot-password', data);
    return response.data;
  },

  // Reset password
  resetPassword: async (
    id: string,
    token: string,
    data: ResetPasswordData
  ): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>(`/auth/reset-password/${id}/${token}`, data);
    return response.data;
  },
};