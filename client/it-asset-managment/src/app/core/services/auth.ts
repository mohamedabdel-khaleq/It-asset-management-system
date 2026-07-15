import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private http = inject(HttpClient);


  private apiUrl = 'http://localhost:5000/api/v1/auth';




  login(
    email: string,
    password: string
  ): Observable<any> {


    return this.http.post<any>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    );

  }





  register(
    formData: FormData
  ): Observable<any> {


    return this.http.post<any>(
      `${this.apiUrl}/register`,
      formData
    );

  }





  logout(): void {


    localStorage.removeItem('token');

    localStorage.removeItem('user');


  }





  saveUser(
    token: string,
    user: any
  ): void {


    localStorage.setItem(
      'token',
      token
    );


    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );


  }





  getToken(): string | null {


    return localStorage.getItem('token');


  }





getUser(): any {

  const user = localStorage.getItem('user');

  if(user){

    return JSON.parse(user);

  }

  return null;

}





  isLoggedIn(): boolean {


    return !!this.getToken();


  }



}