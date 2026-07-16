import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private http = inject(HttpClient);


  private apiUrl = 'http://localhost:5000/api/v1/employees';




  getEmployees(): Observable<any> {

    return this.http.get<any>(
      this.apiUrl
    );

  }




  getEmployee(
    id: string
  ): Observable<any> {

    if (!id) {
      return of({ success: false, message: 'No employee id provided' });
    }

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }




  addEmployee(
    data: any
  ): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      data
    );

  }




  updateEmployee(
    id: string,
    data: any
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      data
    );

  }




  deleteEmployee(
    id: string
  ): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );

  }


}