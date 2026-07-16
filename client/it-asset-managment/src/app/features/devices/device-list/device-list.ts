import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

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
  styleUrls: ['./device-list.css']
})
export class DeviceList implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  private deviceService = inject(DeviceService);
  private router = inject(Router);

  devices: any[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {

    this.loading = true;
    this.error = '';

    console.log('Loading Devices...');

    this.deviceService.getDevices().subscribe({

      next: (res: any) => {

        console.log('SUCCESS:', res);

        const payload =
          Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res)
              ? res
              : [];

        this.devices = [...payload];

        console.log('Devices:', this.devices);
        console.log('Devices Count:', this.devices.length);

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error('ERROR:', err);

        this.devices = [];
        this.loading = false;

        this.error =
          err?.error?.message ||
          err?.message ||
          'Failed to load devices';

        this.cdr.detectChanges();

      }

    });

  }

  goToAddDevice(): void {

    this.router.navigate([
      '/devices/add'
    ]);

  }

  goToEditDevice(device: any): void {

    const id =
      device?._id ||
      device?.id;

    if (id) {

      this.router.navigate(
        ['/devices/edit', id],
        {
          state: { device }
        }
      );

    }

  }

  deleteDevice(id: string): void {

    if (!confirm('Delete Device ?')) return;

    this.deviceService.deleteDevice(id).subscribe({

      next: () => {

        this.loadDevices();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}