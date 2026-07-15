import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { DeviceService } from '../../../core/services/device';


@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './device-list.html',
  styleUrl: './device-list.css'
})
export class DeviceList implements OnInit {


  private deviceService = inject(DeviceService);
  private router = inject(Router);


  devices: any[] = [];

  loading = true;



  ngOnInit(): void {

    this.loadDevices();

  }




  loadDevices(): void {

    this.loading = true;

    console.log('Loading Devices...');


    this.deviceService.getDevices()
      .subscribe({

        next: (res: any) => {

          console.log('Devices Response:', res);


          this.devices = res?.data || [];


          console.log('Devices Array:', this.devices);


          this.loading = false;

        },


        error: (err) => {

          console.error(
            'Get Devices Error:',
            err
          );


          this.devices = [];

          this.loading = false;

        }

      });


  }





  goToAddDevice(): void {

    this.router.navigate([
      '/devices/add'
    ]);

  }





  deleteDevice(id: string): void {


    if (!confirm('Delete Device?')) {

      return;

    }



    this.deviceService.deleteDevice(id)
      .subscribe({

        next: (res) => {

          console.log(
            'Delete Success:',
            res
          );


          this.loadDevices();


        },


        error: (err) => {

          console.error(
            'Delete Device Error:',
            err
          );

        }

      });


  }


}