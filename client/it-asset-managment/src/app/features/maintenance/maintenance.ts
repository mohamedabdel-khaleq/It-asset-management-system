import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MaintenanceService } from '../../core/services/maintenance';



@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css'
})
export class Maintenance implements OnInit {



  private maintenanceService = inject(MaintenanceService);



  maintenanceRecords: any[] = [];

  loading: boolean = false;

  error: string = '';





  ngOnInit(): void {

    this.loadMaintenances();

  }






  loadMaintenances(): void {


    this.loading = true;

    this.error = '';



    this.maintenanceService
      .getAllMaintenances()
      .subscribe({



        next: (res: any) => {



          console.log(
            "Maintenance API Response:",
            res
          );



          this.maintenanceRecords =
            res.data || res || [];



          console.log(
            "Maintenance Records:",
            this.maintenanceRecords
          );



          this.loading = false;



        },




        error: (err) => {



          console.error(
            "Maintenance Load Error:",
            err
          );



          this.error =
            "Failed to load maintenance records";



          this.loading = false;



        }



      });



  }








  deleteMaintenance(id: string): void {



    const confirmDelete =
      confirm(
        "Are you sure you want to delete this maintenance?"
      );



    if (!confirmDelete) {

      return;

    }





    this.maintenanceService
      .deleteMaintenance(id)
      .subscribe({




        next: (res: any) => {



          console.log(
            "Delete Response:",
            res
          );



          alert(
            "Maintenance deleted successfully"
          );



          this.loadMaintenances();



        },





        error: (err) => {



          console.error(
            "Delete Error:",
            err
          );



          alert(
            "Failed to delete maintenance"
          );



        }





      });




  }




}