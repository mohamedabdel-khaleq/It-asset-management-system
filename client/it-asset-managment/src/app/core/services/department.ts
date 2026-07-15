import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/v1/departments';


  getDepartments(): Observable<any> {

    return this.http.get<any>(this.apiUrl);

  }


  getDepartment(id: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }


  addDepartment(data: any): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      data
    );

  }


  updateDepartment(
    id: string,
    data: any
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      data
    );

  }


  deleteDepartment(id: string): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );

  }

}