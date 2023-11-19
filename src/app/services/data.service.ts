import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, take } from "rxjs/operators";
import { API_CONFIG } from "./api.config";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private baseUrl = API_CONFIG.baseUrl;
  private nitroOxideApi = API_CONFIG.nitroOxideApi;
  private polarIceCapsApi = API_CONFIG.polarIceCapsApi;
  private oceanWarmingApi = API_CONFIG.oceanWarmingApi;
  private forestandCarbonApi = API_CONFIG.forestandCarbonApi;
  private temperatureApi = API_CONFIG.temperatureApi;
  private co2Path = API_CONFIG.co2Path;

  constructor(private http: HttpClient) {}

  generateContentWithGeminiPro(prompt: string) {
    const API_KEY = "yours-api-key";
    const genAI = new GoogleGenerativeAI(API_KEY);
    async function response(): Promise<string> {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    }

    return response();
  }

  getNitrousOxideData() {
    return this.http.get(`${this.baseUrl}${this.nitroOxideApi}`).pipe(
      take(1),
      map((data: any) => {
        return [
          {
            name: "Ortalama",
            series: data.nitrous.map(
              (item: { date: string; average: string }) => ({
                name: item.date,
                value: parseFloat(item.average),
              })
            ),
          },
          {
            name: "Gidişat",
            series: data.nitrous.map(
              (item: { date: string; trend: string }) => ({
                name: item.date,
                value: parseFloat(item.trend),
              })
            ),
          },
          {
            name: "Ortalama Belirsizlik",
            series: data.nitrous.map(
              (item: { date: string; averageUnc: string }) => ({
                name: item.date,
                value: parseFloat(item.averageUnc),
              })
            ),
          },
          {
            name: "Ortalama Gidişat",
            series: data.nitrous.map(
              (item: { date: string; trendUnc: string }) => ({
                name: item.date,
                value: parseFloat(item.trendUnc),
              })
            ),
          },
        ];
      })
    );
  }

  public getCarbonDioxideData() {
    return this.http.get(`${this.baseUrl}${this.co2Path}`).pipe(
      take(1),
      map((data: any) => {
        return [
          {
            name: "Cycle",
            series: data.co2.map((item: { year: string; cycle: string }) => ({
              name: item.year,
              value: item.cycle,
            })),
          },
          {
            name: "Trend",
            series: data.co2.map((item: { year: string; trend: string }) => ({
              name: item.year,
              value: item.trend,
            })),
          },
        ];
      })
    );
  }

  getForestAndCarbonData() {
    return this.http.get(this.forestandCarbonApi).pipe(
      take(1),
      map((data: any) => {
        const transformedData = data.features.map((entry: any) => {
          const countryName = entry.properties.Country;
          const series = Object.entries(entry.properties)
            .filter(([key, value]) => key.startsWith("F") && value !== null)
            .map(([key, value]) => ({ name: key.substring(1), value }));

          return { name: countryName, series };
        });
        return transformedData;
      })
    );
  }

  getTemperatureData() {
    return this.http.get(this.temperatureApi).pipe(
      take(1),
      map((data: any) => {
        const transformedData = data.features.map((entry: any) => {
          const countryName = entry.attributes.Country;
          const series = Object.entries(entry.attributes)
            .filter(([key, value]) => key.startsWith("F") && value !== null)
            .map(([key, value]) => ({ name: key.substring(1), value }));

          return { name: countryName, series };
        });
        return transformedData;
      })
    );
  }

  public getPolarIceCaps() {
    return this.http.get(`${this.baseUrl}${this.polarIceCapsApi}`).pipe(
      take(1),
      map((data: any) => {
        return [
          {
            name: "extent",
            series: data.arcticData.map(
              (item: { year: string; extent: string }) => ({
                name: item.year,
                value: item.extent,
              })
            ),
          },
          {
            name: "area",
            series: data.arcticData.map(
              (item: { year: string; area: string }) => ({
                name: item.year,
                value: item.area,
              })
            ),
          },
        ];
      })
    );
  }

  public getOceanWarmingData() {
    return this.http.get(`${this.baseUrl}${this.oceanWarmingApi}`).pipe(
      take(1),
      map((data: any) => {
        let seriesData = [];
        for (let year in data.result) {
          seriesData.push({
            name: year,
            value: parseFloat(data.result[year]),
          });
        }
        return [
          {
            name: "Ocean Warming",
            series: seriesData,
          },
        ];
      })
    );
  }
}
