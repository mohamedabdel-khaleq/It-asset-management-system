import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {



  private authService = inject(AuthService);

  private router = inject(Router);



  username = 'User';




  ngOnInit(): void {


    const user = this.authService.getUser();



    if(user){


      this.username =

        user.name ||

        user.username ||

        user.email ||

        'User';


    }


  }






  logout(): void {


    this.authService.logout();



    this.router.navigate([

      '/login'

    ]);


  }


}