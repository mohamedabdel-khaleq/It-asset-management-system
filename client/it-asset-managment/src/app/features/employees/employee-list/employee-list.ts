import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { EmployeeService } from '../../../core/services/employee';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeList implements OnInit {



  private employeeService = inject(EmployeeService);

  private router = inject(Router);



  employees: any[] = [];

  loading = true;




  ngOnInit(): void {

    this.loadEmployees();

  }






  loadEmployees(): void {


    this.loading = true;



    this.employeeService
      .getEmployees()
      .subscribe({



        next: (res: any) => {



          if(Array.isArray(res)) {


            this.employees = res;


          }
          else if(Array.isArray(res?.data)) {


            this.employees = res.data;


          }
          else {


            this.employees = [];


          }



          this.loading = false;


        },



        error: (err) => {


          console.error(
            err
          );


          this.employees = [];

          this.loading = false;


        }



      });



  }





  goToAddEmployee(): void {


    this.router.navigate([

      '/employees/add'

    ]);


  }





  deleteEmployee(id:string):void {



    if(!confirm('Delete Employee ?'))

      return;



    this.employeeService
      .deleteEmployee(id)
      .subscribe({



        next:()=>{


          this.loadEmployees();


        },



        error:(err)=>{


          console.error(err);


        }



      });



  }




}