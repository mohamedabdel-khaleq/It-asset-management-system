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

  device: any = {

    assetTag: '',
    deviceName: '',
    category: '',
    brand: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiry: '',
    status: '',
    notes: ''

  };

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.loadDevice();

  }

  loadDevice(): void {

    this.loading = true;

    this.deviceService.getDevice(this.id).subscribe({

      next: (res: any) => {

        console.log('Device:', res);

        this.device = res.data;

        // Fix Date Format
        if (this.device.purchaseDate) {
          this.device.purchaseDate =
            this.device.purchaseDate.split('T')[0];
        }

        if (this.device.warrantyExpiry) {
          this.device.warrantyExpiry =
            this.device.warrantyExpiry.split('T')[0];
        }

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

        this.error =
          err?.error?.message ||
          'Failed to load device';

      }

    });

  }

  updateDevice(): void {

    this.loading = true;

    this.error = '';

    console.log('Sending Device:', this.device);

    this.deviceService.updateDevice(
      this.id,
      this.device
    ).subscribe({

      next: (res: any) => {

        console.log('Updated:', res);

        this.loading = false;

        alert('Device Updated Successfully');

        this.router.navigate(
          ['/devices'],
          {
            state: {
              refreshDevices: true
            }
          }
        );

      },

      error: (err) => {

        console.error('UPDATE ERROR:', err);

        console.log('Status:', err.status);

        console.log('Body:', err.error);

        this.loading = false;

        this.error =
          err?.error?.message ||
          'Update Failed';

      }

    });

  }

}