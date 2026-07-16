import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { DeviceService } from '../../../core/services/device';


@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './add-device.html',
  styleUrl: './add-device.css'
})
export class AddDevice {


  private deviceService = inject(DeviceService);
  private router = inject(Router);



  loading = false;

  error = '';



  device = {

    assetTag: '',

    deviceName: '',

    category: 'Laptop',

    brand: '',

    model: '',

    serialNumber: '',

    purchaseDate: '',

    warrantyExpiry: '',

    status: 'Available',

    notes: ''

  };




  categories = [

    'Laptop',
    'Desktop',
    'Printer',
    'Monitor',
    'Router',
    'Switch',
    'Server',
    'Other'

  ];





  addDevice(): void {



    if(

      !this.device.assetTag ||
      !this.device.deviceName ||
      !this.device.brand ||
      !this.device.model ||
      !this.device.serialNumber

    ){

      this.error = 'Please fill all required fields';

      return;

    }





    this.loading = true;

    this.error = '';




    const deviceData = {


      ...this.device,


      // remove empty dates

      purchaseDate:
        this.device.purchaseDate || undefined,


      warrantyExpiry:
        this.device.warrantyExpiry || undefined


    };





    console.log(
      'Sending Device:',
      deviceData
    );





    this.deviceService.addDevice(deviceData)
      .subscribe({



        next: (res)=>{


          console.log(
            'Device Added:',
            res
          );



          this.loading = false;



          alert(
            'Device Added Successfully'
          );



          this.router.navigate(['/devices'], { state: { refreshDevices: true } });



        },





        error:(err)=>{


          console.error(
            'Add Device Error:',
            err
          );



          console.log(
            'Backend Error:',
            err.error
          );



          this.loading = false;



          this.error =
            err.error?.message ||
            'Something went wrong';



        }



      });



  }


}