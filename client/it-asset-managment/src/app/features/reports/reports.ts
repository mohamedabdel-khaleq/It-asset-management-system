import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartType
} from 'chart.js';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {


  // Bar Chart
  barChartType: ChartType = 'bar';

  barChartData: ChartConfiguration['data'] = {

    labels: [
      'Employees',
      'Departments',
      'Devices'
    ],

    datasets: [
      {
        data: [
          120,
          8,
          350
        ],
        label: 'System Data'
      }
    ]

  };


  // Pie Chart

  pieChartType: ChartType = 'pie';


  pieChartData: ChartConfiguration['data'] = {

    labels: [
      'Available',
      'Assigned',
      'Maintenance',
      'Retired'
    ],

    datasets: [
      {
        data:[
          100,
          180,
          40,
          30
        ],
        label:'Devices Status'
      }
    ]

  };



  // Doughnut Chart

  doughnutChartType: ChartType = 'doughnut';


  doughnutChartData: ChartConfiguration['data'] = {

    labels:[
      'Laptop',
      'Desktop',
      'Printer',
      'Other'
    ],

    datasets:[
      {
        data:[
          150,
          120,
          50,
          30
        ],
        label:'Device Types'
      }
    ]

  };


}