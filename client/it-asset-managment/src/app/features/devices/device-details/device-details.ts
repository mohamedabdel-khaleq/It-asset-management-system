import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { DeviceService } from '../../../core/services/device';


@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './device-details.html',
  styleUrl: './device-details.css'
})
export class DeviceDetails implements OnInit {


  private route = inject(ActivatedRoute);
  private deviceService = inject(DeviceService);


  device: any = null;

  loading = true;

  error = '';



  ngOnInit(): void {


    const id = this.route.snapshot.paramMap.get('id');


    if (id) {

      this.loadDevice(id);

    } else {

      this.loading = false;
      this.error = 'Device ID not found';

    }


  }





  loadDevice(id: string): void {


    console.log('Loading Device ID:', id);


    this.deviceService.getDevice(id)
      .subscribe({

        next: (res: any) => {


          console.log(
            'Device Details Response:',
            res
          );


          this.device = res?.data || res;


          this.loading = false;


        },


        error: (err) => {


          console.error(
            'Device Details Error:',
            err
          );


          this.error =
            err.error?.message ||
            'Failed to load device';


          this.loading = false;


        }


      });


  }


}