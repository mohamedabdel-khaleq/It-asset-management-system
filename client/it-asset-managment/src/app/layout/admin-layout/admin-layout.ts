import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Navbar } from '../../shared/navbar/navbar';
import { Sidebar } from '../../shared/sidebar/sidebar';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Navbar,
    Sidebar
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {


  sidebarOpen = false;



  toggleSidebar(): void {

    this.sidebarOpen = !this.sidebarOpen;

  }



  closeSidebar(): void {

    this.sidebarOpen = false;

  }


}