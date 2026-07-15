import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {


  private http = inject(HttpClient);


  private apiUrl = 'http://localhost:5000/api/v1/devices';



  getDevices(): Observable<any> {

    return this.http.get<any>(
      this.apiUrl
    );

  }




  getDevice(id: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }




  addDevice(data: any): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      data
    );

  }




  updateDevice(
    id: string,
    data: any
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      data
    );

  }




  deleteDevice(
    id: string
  ): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );

  }


}