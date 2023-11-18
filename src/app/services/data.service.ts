import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'https://global-warming.org/api/';
  private temperaturePath = 'temperature-api';
  private co2Path = 'co2-api';
  private baseUrl2 =
    'https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_3_1_Climate_Indicators_Annual_Mean_Global_Surface_Temperature/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';

  constructor(private http: HttpClient) {}

  private getAllData(path: string) {
    return this.http.get(`${this.baseUrl}${path}`);
  }



  getTemperatureData() {
    return this.http.get<any[]>(`${this.baseUrl}${this.temperaturePath}`).pipe(
      map((data: any) => {
        return [
          {
            name: 'Kara',
            series: data.result.map((item: { time: any; land: any }) => ({
              name: item.time,
              value: item.land,
            })),
          },
          {
            name: 'İstasyon',
            series: data.result.map((item: { time: any; station: any }) => ({
              name: item.time,
              value: item.station,
            })),
          },
        ];
      })
    );
  }

  public getCo2Data() {
    return this.http.get<any[]>(`${this.baseUrl}${this.co2Path}`).pipe(
      map((data: any) => {
        return [
          {
            name: 'Cycle',
            series: data.co2.map((item: { year: any; cycle: any }) => ({
              name: item.year,
              value: item.cycle,
            })),
          },
          {
            name: 'Trend',
            series: data.co2.map((item: { year: any; trend: any }) => ({
              name: item.year,
              value: item.trend,
            })),
          },
        ];
      })
    );
  }

  getForestAndCarbonData() {
    return this.http.get('https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_3_5/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson');

  }

  getData() {
    return this.http.get(this.baseUrl2);
  }

  public getMethaneData() {
    return this.getAllData('methane-api');
  }

  public getNitrousOxideData() {
    return this.getAllData('nitrous-oxide-api');
  }

  public getArcticData() {
    return this.getAllData('arctic-api');
  }

  public getOceanWarmingData() {
    return this.getAllData('ocean-warming-api');
  }
}
