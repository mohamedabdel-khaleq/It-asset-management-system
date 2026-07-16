import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {


  private http = inject(HttpClient);


  private apiUrl =
    'http://localhost:5000/api/v1/maintenances';



  getAllMaintenances() {

    return this.http.get<any>(
      this.apiUrl
    );

  }



  createMaintenance(data: any) {

    return this.http.post<any>(
      this.apiUrl,
      data
    );

  }



  deleteMaintenance(id: string) {

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );

  }



  getMaintenanceById(id: string) {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }



  updateMaintenance(id: string, data: any) {

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      data
    );

  }


}