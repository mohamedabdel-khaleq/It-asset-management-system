import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MaintenanceService } from '../../../core/services/maintenance';



@Component({
  selector: 'app-add-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-maintenance.html',
  styleUrl: './add-maintenance.css'
})
export class AddMaintenance {



  private router = inject(Router);

  private maintenanceService = inject(MaintenanceService);




  maintenance = {

    device: '',

    issue: '',

    description: '',

    reportedBy: '',

    assignedTo: '',

    cost: 0

  };





  addMaintenance(): void {



    console.log(
      "Sending Maintenance:",
      this.maintenance
    );




    // Validation

    if (
      !this.maintenance.device ||
      !this.maintenance.issue ||
      !this.maintenance.reportedBy
    ) {


      alert(
        "Device, Issue and Reported By are required"
      );


      return;

    }





    this.maintenanceService
      .createMaintenance(this.maintenance)
      .subscribe({



        next: (response: any) => {



          console.log(
            "Maintenance Created:",
            response
          );



          alert(
            "Maintenance Added Successfully"
          );



          this.router.navigate([
            '/maintenance'
          ]);



        },





        error: (error) => {



          console.error(
            "Maintenance Error:",
            error
          );



          console.error(
            "Backend Message:",
            error.error?.message
          );



          alert(
            error.error?.message ||
            "Failed To Add Maintenance"
          );



        }




      });



  }



}