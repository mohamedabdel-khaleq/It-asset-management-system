import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {


  private authService = inject(AuthService);

  private router = inject(Router);




  user = {

    username: '',

    firstName: '',

    lastName: '',

    email: '',

    password: '',

    confirmPassword: '',

    gender: '',

    dateOfBirth: '',

    role: 'employee'

  };




  loading = false;

  success = '';

  error = '';




  showPassword = false;

  showConfirmPassword = false;





  register(): void {



    this.error = '';

    this.success = '';





    if (

      !this.user.username ||

      !this.user.firstName ||

      !this.user.lastName ||

      !this.user.email ||

      !this.user.password ||

      !this.user.confirmPassword ||

      !this.user.gender ||

      !this.user.dateOfBirth

    ) {


      this.error = 'Please fill all required fields';

      return;


    }





    if (this.user.password.length < 6) {


      this.error =
        'Password must be at least 6 characters';


      return;


    }





    if (

      this.user.password !==

      this.user.confirmPassword

    ) {


      this.error =
        'Passwords do not match';


      return;


    }





    this.loading = true;





    const formData = new FormData();




    formData.append(

      'username',

      this.user.username

    );



    formData.append(

      'email',

      this.user.email

    );



    formData.append(

      'password',

      this.user.password

    );



    formData.append(

      'role',

      this.user.role

    );



    formData.append(

      'gender',

      this.user.gender

    );



    formData.append(

      'dateOfBirth',

      this.user.dateOfBirth

    );





    this.authService
      .register(formData)
      .subscribe({




        next: (res) => {



          this.loading = false;



          this.success =

            res.message ||

            'Registration Successful';



          alert(

            'Registration Successful'

          );



          this.router.navigate([

            '/login'

          ]);



        },





        error: (err) => {



          this.loading = false;



          this.error =

            err?.error?.message ||

            'Registration Failed';



        }




      });




  }







  togglePassword(): void {


    this.showPassword =

      !this.showPassword;


  }






  toggleConfirmPassword(): void {


    this.showConfirmPassword =

      !this.showConfirmPassword;


  }




}