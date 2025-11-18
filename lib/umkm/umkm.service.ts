import { umkmApi } from "./umkm.api";
import { CreateUMKMData, UMKM, UpdateUMKMData } from "./umkm.type";

export const umkmService = {
  
  // Get all UMKM
  async getAll() {
    try {
      const response = await umkmApi.getAll();
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch UMKM list' 
      };
    }
  },

  // Get UMKM by ID
  async getById(id: number | string) {
    try {
      const response = await umkmApi.getById(id);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch UMKM details' 
      };
    }
  },

  // Get UMKM by slug (fetches all UMKM and finds matching slug)
  async getBySlug(slug: string) {
    try {
      const allUMKMResponse = await umkmApi.getAll();
      const umkm = allUMKMResponse.data.find(u => u.slug === slug);
      
      if (umkm) {
        return { success: true, data: umkm };
      } else {
        return { 
          success: false, 
          error: 'UMKM tidak ditemukan' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch UMKM details' 
      };
    }
  },

  // Create new UMKM
  async create(data: CreateUMKMData) {
    try {
      const response = await umkmApi.create(data);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create UMKM' 
      };
    }
  },

  // Update UMKM
  async update(id: number | string, data: UpdateUMKMData) {
    try {
      const response = await umkmApi.update(id, data);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update UMKM' 
      };
    }
  },

  // Delete UMKM
  async delete(id: number | string) {
    try {
      const response = await umkmApi.delete(id);
      return { success: true, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete UMKM' 
      };
    }
  },

  // Filter UMKM by regency
  filterByRegency(umkmList: UMKM[], regency: string): UMKM[] {
    if (regency === 'Semua' || !regency) {
      return umkmList;
    }
    return umkmList.filter(umkm => umkm.regency === regency);
  },

  // Filter UMKM by classification
  filterByClassification(umkmList: UMKM[], classification: string): UMKM[] {
    if (!classification) {
      return umkmList;
    }
    return umkmList.filter(umkm => umkm.classification === classification);
  },

  // Search UMKM by name or owner
  search(umkmList: UMKM[], query: string): UMKM[] {
    if (!query) {
      return umkmList;
    }
    const lowercaseQuery = query.toLowerCase();
    return umkmList.filter(umkm => 
      umkm.name.toLowerCase().includes(lowercaseQuery) ||
      umkm.owner.toLowerCase().includes(lowercaseQuery)
    );
  },

  // Validate UMKM data before submission
  validateUMKMData(data: Partial<CreateUMKMData>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name) errors.push('Nama UMKM harus diisi');
    if (!data.owner) errors.push('Nama pemilik harus diisi');
    if (!data.phone) errors.push('Nomor telepon harus diisi');
    if (!data.address) errors.push('Alamat harus diisi');
    if (!data.regency) errors.push('Kabupaten harus dipilih');
    if (data.longitude === undefined) errors.push('Longitude harus diisi');
    if (data.latitude === undefined) errors.push('Latitude harus diisi');

    // Validate phone number format (Indonesian)
    if (data.phone && !/^(\+62|62|0)[0-9]{9,12}$/.test(data.phone.replace(/\s/g, ''))) {
      errors.push('Format nomor telepon tidak valid');
    }

    // Validate coordinates
    if (data.longitude && (data.longitude < -180 || data.longitude > 180)) {
      errors.push('Longitude harus antara -180 dan 180');
    }
    if (data.latitude && (data.latitude < -90 || data.latitude > 90)) {
      errors.push('Latitude harus antara -90 dan 90');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },
};
