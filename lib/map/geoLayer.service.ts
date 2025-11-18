import { GeoLayer } from '@/lib/map/map.type';

export class GeoLayerService {
  private static readonly DATA_PATH = '/datas';

  async loadKabupatenData(kabupaten: string, color: string): Promise<GeoLayer[]> {
    const results: GeoLayer[] = [];

    try {
      const res = await fetch(`${GeoLayerService.DATA_PATH}/${kabupaten}/adm_desa.json`);
      if (res.ok) {
        const data = await res.json();
        results.push({ 
          name: 'adm_desa.json', 
          data, 
          style: { 
            color, 
            weight: 0, 
            fillOpacity: 0.5 
          } 
        });
      }
    } catch (err) {
      console.error(`Failed to load boundary for ${kabupaten}`, err);
    }

    return results;
  }

  async loadMultipleKabupaten(
    configs: Array<{ name: string; color: string }>
  ): Promise<Map<string, GeoLayer[]>> {
    const results = new Map<string, GeoLayer[]>();

    await Promise.all(
      configs.map(async (config) => {
        const layers = await this.loadKabupatenData(config.name, config.color);
        results.set(config.name, layers);
      })
    );

    return results;
  }
}

export const geoLayerService = new GeoLayerService();
