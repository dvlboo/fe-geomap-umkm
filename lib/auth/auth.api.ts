import { apiClient } from "../api";
import { AuthResponse, ChangePasswordData, ForgotPasswordData, LoginData, MessageResponse, ResetPasswordData, UserProfile } from "./auth.type";

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