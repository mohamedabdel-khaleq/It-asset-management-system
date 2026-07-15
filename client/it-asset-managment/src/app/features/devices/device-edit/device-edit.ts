import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { DeviceService } from '../../../core/services/device';


@Component({
  selector: 'app-device-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './device-edit.html',
  styleUrl: './device-edit.css'
})
export class DeviceEdit implements OnInit {


  private deviceService = inject(DeviceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);



  id = '';

  loading = false;

  error = '';



  device:any = {

    assetTag:'',
    deviceName:'',
    category:'',
    brand:'',
    model:'',
    serialNumber:'',
    purchaseDate:'',
    warrantyExpiry:'',
    status:'',
    notes:''

  };



  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.loadDevice();

  }




  loadDevice(){

    this.deviceService.getDevice(this.id)
    .subscribe({

      next:(res)=>{

        console.log(
          'Device:',
          res
        );

        this.device = res.data;

      },


      error:(err)=>{

        console.error(err);

      }

    })

  }





  updateDevice(){


    this.loading = true;


    this.deviceService.updateDevice(
      this.id,
      this.device
    )
    .subscribe({

      next:(res)=>{

        console.log(
          'Updated:',
          res
        );


        this.loading=false;


        alert(
          'Device Updated Successfully'
        );


        this.router.navigate([
          '/devices'
        ]);

      },


      error:(err)=>{

        console.error(err);

        this.loading=false;

        this.error =
        'Update Failed';

      }


    })


  }



}