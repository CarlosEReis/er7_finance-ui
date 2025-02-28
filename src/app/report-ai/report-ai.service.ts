import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportAiService {

   private readonly URL_API = environment.apiUrl.concat('v1/report-ai')

  constructor(private http: HttpClient) { }

  createReportAi() {
    return this.http.post<any>(`${this.URL_API}`, null);
  }

  getReportAiResume() {
    return this.http.get<any>(`${this.URL_API}/resume`);
  }

  getReportAiById(id: number) {
    return this.http.get(`${this.URL_API}/${id}`);
  }
}
