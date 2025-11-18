import { MapUMKM, RouteData, OSRMRouteResponse } from '@/lib/map/map.type';

export class RouteService {
  private static readonly OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1/driving';
  private static readonly DELAY_MS = 200;
  private cache: Map<string, RouteData[]> = new Map();

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async fetchOSRMRoute(start: MapUMKM, end: MapUMKM): Promise<OSRMRouteResponse | null> {
    try {
      const url = `${RouteService.OSRM_BASE_URL}/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        return {
          geometry: data.routes[0].geometry,
          distance: data.routes[0].distance / 1000, 
          duration: data.routes[0].duration / 60, 
        };
      }
      return null;
    } catch (error) {
      console.error('OSRM routing error:', error);
      return null;
    }
  }

  private generateCacheKey(umkmList: MapUMKM[]): string {
    return umkmList.map(u => u.id).sort().join('-');
  }

  async generateRoutes(
    umkmList: MapUMKM[],
    onProgress?: (current: number, total: number) => void
  ): Promise<RouteData[]> {
    if (umkmList.length < 2) {
      return [];
    }

    // Check cache
    const cacheKey = this.generateCacheKey(umkmList);
    if (this.cache.has(cacheKey)) {
      // console.log('✅ Using cached routes');
      return this.cache.get(cacheKey)!;
    }
    
    const routes: RouteData[] = [];
    const connected = new Set<number>();
    const unconnected = new Set<number>(umkmList.map((_, idx) => idx));
    
    const startIdx = 0;
    connected.add(startIdx);
    unconnected.delete(startIdx);

    let progressCount = 0;
    const totalConnections = umkmList.length - 1;

    while (unconnected.size > 0) {
      let minDistance = Infinity;
      let bestPair: { fromIdx: number; toIdx: number } | null = null;

      for (const connectedIdx of connected) {
        for (const unconnectedIdx of unconnected) {
          const distance = this.calculateDistance(
            umkmList[connectedIdx].lat,
            umkmList[connectedIdx].lng,
            umkmList[unconnectedIdx].lat,
            umkmList[unconnectedIdx].lng
          );

          if (distance < minDistance) {
            minDistance = distance;
            bestPair = { fromIdx: connectedIdx, toIdx: unconnectedIdx };
          }
        }
      }

      if (!bestPair) break;

      const umkm1 = umkmList[bestPair.fromIdx];
      const umkm2 = umkmList[bestPair.toIdx];

      await this.delay(RouteService.DELAY_MS);

      const route = await this.fetchOSRMRoute(umkm1, umkm2);
      
      if (route) {
        // console.log(`✅ Route: ${umkm1.name} (${umkm1.regency}) → ${umkm2.name} (${umkm2.regency})`);
        routes.push({
          name: `route-${umkm1.id}-${umkm2.id}`,
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: route.geometry,
              properties: {
                from: umkm1.name,
                to: umkm2.name,
                fromRegency: umkm1.regency,
                toRegency: umkm2.regency,
              }
            }]
          },
          style: {
            color: '#2900beff',
            weight: 4,
            opacity: 0.7,
          }
        });
      }

      connected.add(bestPair.toIdx);
      unconnected.delete(bestPair.toIdx);

      progressCount++;
      if (onProgress) {
        onProgress(progressCount, totalConnections);
      }
    }

    // Save to cache
    this.cache.set(cacheKey, routes);
    
    return routes;
  }

  filterRoutes(routes: RouteData[], filter: string): RouteData[] {
    if (filter === 'Semua') return routes;
    
    return routes.filter(route => {
      const properties = route.data.features[0]?.properties;
      if (!properties) return false;
      
      const fromRegency = properties.fromRegency?.trim() || '';
      const toRegency = properties.toRegency?.trim() || '';
      
      return fromRegency === filter && toRegency === filter;
    });
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const routeService = new RouteService();