export interface SocialMedia {
  id?: number;
  umkm_id?: number;
  platform: string;
  username: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface UMKM {
  id: number;
  name: string;
  owner: string;
  phone: string;
  address: string;
  regency: string;
  story?: string;
  year?: number;
  classification?: string;
  slug: string;
  location: {
    longitude: number;
    latitude: number;
  };
  type?: string;
  order?: string;
  payment?: string;
  place_pict?: string;
  product_pict?: string;
  medsos?: SocialMedia[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUMKMData {
  name: string;
  owner: string;
  phone: string;
  address: string;
  regency: string;
  story?: string;
  year?: number;
  classification?: string;
  longitude: number;
  latitude: number;
  type?: string;
  order?: string;
  payment?: string;
  place_pict?: File | string;
  product_pict?: File | string;
  medsos?: string; // JSON string array of social media
}

export interface UpdateUMKMData extends Partial<CreateUMKMData> {}

export interface UMKMListResponse {
  message: string;
  data: UMKM[];
}

export interface UMKMResponse {
  message: string;
  data: UMKM;
}

export interface MessageResponse {
  message: string;
}