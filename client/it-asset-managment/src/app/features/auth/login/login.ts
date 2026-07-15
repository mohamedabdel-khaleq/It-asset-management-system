import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {


  private authService = inject(AuthService);

  private router = inject(Router);



  email = '';

  password = '';

  loading = false;

  error = '';





  login(): void {


    if (!this.email || !this.password) {


      this.error = 'Please enter email and password';

      return;


    }



    this.loading = true;

    this.error = '';




    this.authService
      .login(this.email, this.password)
      .subscribe({



        next: (res) => {


          this.loading = false;



          this.authService.saveUser(

            res.token,

            res.data || res.user

          );



          this.router.navigate([

            '/dashboard'

          ]);



        },



        error: (err) => {


          this.loading = false;



          this.error =

            err.error?.message ||

            'Login Failed';



        }



      });


  }


}