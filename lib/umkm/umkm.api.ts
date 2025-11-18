import { apiClient } from "../api";
import { CreateUMKMData, MessageResponse, UMKMListResponse, UMKMResponse, UpdateUMKMData } from "./umkm.type";

export const umkmApi = {
  // Get all UMKM
  getAll: async (): Promise<UMKMListResponse> => {
    const response = await apiClient.get<UMKMListResponse>('/umkm/');
    return response.data;
  },

  // Get UMKM by ID
  getById: async (id: number | string): Promise<UMKMResponse> => {
    const response = await apiClient.get<UMKMResponse>(`/umkm/${id}`);
    return response.data;
  },

  // Create new UMKM
  create: async (data: CreateUMKMData): Promise<UMKMResponse> => {
    const hasFiles = data.place_pict instanceof File || data.product_pict instanceof File;
    
    if (hasFiles) {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });
      
      const response = await apiClient.post<UMKMResponse>('/umkm/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const response = await apiClient.post<UMKMResponse>('/umkm/', data);
      return response.data;
    }
  },

  // Update UMKM
  update: async (id: number | string, data: UpdateUMKMData): Promise<UMKMResponse> => {
    const hasFiles = data.place_pict instanceof File || data.product_pict instanceof File;
    
    if (hasFiles) {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });
      
      const response = await apiClient.put<UMKMResponse>(`/umkm/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const response = await apiClient.put<UMKMResponse>(`/umkm/${id}`, data);
      return response.data;
    }
  },

  // Delete UMKM
  delete: async (id: number | string): Promise<MessageResponse> => {
    const response = await apiClient.delete<MessageResponse>(`/umkm/${id}`);
    return response.data;
  },
};