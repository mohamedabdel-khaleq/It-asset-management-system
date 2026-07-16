import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/v1/reports';

  getDashboardReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  getAvailableDevices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/available-devices`);
  }

  getAssignedDevices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/assigned-devices`);
  }

  getMaintenanceDevices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/maintenance-devices`);
  }

  getRetiredDevices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/retired-devices`);
  }

  getWarrantyExpiringDevices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/warranty-expiring`);
  }

}