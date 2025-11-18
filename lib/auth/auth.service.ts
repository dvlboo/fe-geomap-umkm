import { authApi } from "./auth.api";
import { getAuthToken, removeAuthToken, saveAuthToken } from "../api";
import { ChangePasswordData, ForgotPasswordData, LoginData, ResetPasswordData } from "./auth.type";

export const authService = {

  // Login user
  async login(data: LoginData) {
    try {
      const response = await authApi.login(data);
      
      // Save token to localStorage
      if (response.token) {
        saveAuthToken(response.token);
      }
      
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  },

  // get user profile
  async getProfile() {
    try {
      const user = await authApi.getProfile();
      return { success: true, data: user };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get profile' 
      };
    }
  },

  // update user profile
  async updateProfile(data: { name?: string; email?: string }) {
    try {
      const response = await authApi.updateProfile(data);
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update profile' 
      };
    }
  },

  // change password
  async changePassword(data: ChangePasswordData) {
    try {
      const response = await authApi.changePassword(data);
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to change password' 
      };
    }
  },

  // request password reset email
  async forgotPassword(data: ForgotPasswordData) {
    try {
      const response = await authApi.forgotPassword(data);
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send reset email' 
      };
    }
  },

  // reset password
  async resetPassword(id: string, token: string, data: ResetPasswordData) {
    try {
      const response = await authApi.resetPassword(id, token, data);
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to reset password' 
      };
    }
  },

  logout() {
    removeAuthToken();
  },
  
  isAuthenticated(): boolean {
    return !!getAuthToken();
  },

  getToken(): string | null {
    return getAuthToken();
  },
};
