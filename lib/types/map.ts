export interface MapUMKM {
  id: number;
  name: string;
  lat: number;
  lng: number;
  photo: any;
  regency: string;
  address?: string;
  phone?: string;
  story?: string;
}

export interface GeoLayer {
  name: string;
  data: any;
  style: {
    color: string;
    weight: number;
    fillOpacity?: number;
  };
}

export interface RouteData {
  name: string;
  data: {
    type: 'FeatureCollection';
    features: Array<{
      type: 'Feature';
      geometry: any;
      properties: {
        from: string;
        to: string;
        fromRegency: string;
        toRegency: string;
      };
    }>;
  };
  style: {
    color: string;
    weight: number;
    opacity: number;
  };
}

export interface OSRMRouteResponse {
  geometry: any;
  distance: number;
  duration: number;
}

export interface MapProps {
  filter?: string;
  onMarkerClick?: (umkm: any) => void;
  umkmData?: any[];
  searchQuery?: string;
}
