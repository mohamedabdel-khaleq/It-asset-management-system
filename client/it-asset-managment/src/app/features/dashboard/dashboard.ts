import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';

import {
  Chart,
  registerables,
  ChartConfiguration,
  ChartType
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  // ================= BAR CHART =================

  public barChartType: ChartType = 'bar';

  public barChartData: ChartConfiguration<'bar'>['data'] = {

    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

    datasets: [

      {
        label: 'Devices',

        data: [12, 19, 10, 25, 18, 30],

        backgroundColor: [
          '#2563eb',
          '#3b82f6',
          '#60a5fa',
          '#0ea5e9',
          '#06b6d4',
          '#14b8a6'
        ],

        borderRadius: 12

      }

    ]

  };



  // ================= PIE CHART =================

  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartConfiguration<'pie'>['data'] = {

    labels: [

      'IT',

      'HR',

      'Finance',

      'Sales'

    ],

    datasets: [

      {

        data: [

          40,

          20,

          25,

          15

        ],

        backgroundColor: [

          '#2563eb',

          '#10b981',

          '#f59e0b',

          '#ef4444'

        ]

      }

    ]

  };



  // ================= LINE CHART =================

  public lineChartType: ChartType = 'line';

  public lineChartData: ChartConfiguration<'line'>['data'] = {

    labels: [

      'Jan',

      'Feb',

      'Mar',

      'Apr',

      'May',

      'Jun'

    ],

    datasets: [

      {

        label: 'Employees',

        data: [

          20,

          30,

          35,

          50,

          70,

          90

        ],

        borderColor: '#2563eb',

        backgroundColor: 'rgba(37,99,235,0.2)',

        fill: true,

        tension: 0.4

      }

    ]

  };

}