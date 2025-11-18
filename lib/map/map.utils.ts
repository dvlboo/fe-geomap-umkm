import L from 'leaflet';
import { foodTrenImage } from '@/assets';
import { UMKM } from '@/lib/umkm/umkm.type';
import { MapUMKM } from '@/lib/map/map.type';

export class MapUtils {
  static transformUMKMData(umkmList: UMKM[]): MapUMKM[] {
    return umkmList.map(umkm => ({
      id: umkm.id,
      name: umkm.name.trim(),
      lat: umkm.location.latitude,
      lng: umkm.location.longitude,
      photo: umkm.place_pict || foodTrenImage.src || foodTrenImage,
      regency: umkm.regency.trim(),
      address: umkm.address,
      phone: umkm.phone,
      story: umkm.story,
    }));
  }

  static createMarkerIcon(photo: string): L.DivIcon {
    return L.divIcon({
      html: `
        <div style="
          position: relative;
          width: 42px;
          height: 42px;
          background-color: white;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid orange;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        ">
          <img src="${photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />
          <div style="
            position:absolute;
            bottom:-8px;
            left:50%;
            transform:translateX(-50%);
            width:0;
            height:0;
            border-left:8px solid transparent;
            border-right:8px solid transparent;
            border-top:12px solid orange;
          "></div>
        </div>
      `,
      className: '',
      iconSize: [42, 42],
      iconAnchor: [21, 42],
      popupAnchor: [0, -40],
    });
  }

  static filterUMKM(
    umkmList: MapUMKM[],
    filter: string,
    searchQuery: string = ''
  ): MapUMKM[] {
    return umkmList.filter((umkm) => {
      // Filter by regency
      const matchesRegency = filter === 'Semua' || umkm.regency === filter;
      
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.regency.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRegency && matchesSearch;
    });
  }
}
