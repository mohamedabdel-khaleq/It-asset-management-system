import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { EmployeeService } from '../../../core/services/employee';


@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})
export class EmployeeDetails implements OnInit {


  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);


  employee: any = null;

  loading = true;


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');


    if (id) {

      this.loadEmployee(id);

    }

  }



  loadEmployee(id: string): void {


    this.employeeService.getEmployee(id)
      .subscribe({

        next: (res) => {

          console.log('Employee Details:', res);


          this.employee = res.data || res;


          this.loading = false;

        },


        error: (err) => {

          console.error(err);

          this.loading = false;

        }

      });


  }

}