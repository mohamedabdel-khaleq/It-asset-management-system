import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { authGuard } from './core/guards/auth-guard';
import { Dashboard } from './features/dashboard/dashboard';
import { EmployeeList } from './features/employees/employee-list/employee-list';
import { AddEmployee } from './features/employees/add-employee/add-employee';
import { EditEmployee } from './features/employees/edit-employee/edit-employee';
import { EmployeeDetails } from './features/employees/employee-details/employee-details';
import { DeviceList } from './features/devices/device-list/device-list';
import { AddDevice } from './features/devices/add-device/add-device';
import { DeviceDetails } from './features/devices/device-details/device-details';
import { DeviceEdit } from './features/devices/device-edit/device-edit';
import { DepartmentList } from './features/departments/department-list/department-list';
import { DepartmentAdd } from './features/departments/department-add/department-add';
import { Reports } from './features/reports/reports';
import { DepartmentEdit } from './features/departments/department-edit/department-edit';
import { Maintenance } from './features/maintenance/maintenance';
import { AddMaintenance } from './features/maintenance/add-maintenance/add-maintenance';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },


  {
    path: 'register',
    component: Register
  },




  // =====================
  // Protected Layout
  // =====================

  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],

    children: [



      // Dashboard

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'employees',
        component: EmployeeList
      },


      {
        path: 'employees/add',
        component: AddEmployee
      },

      {
        path: 'employees/edit/:id',
        component: EditEmployee
      },

      {
        path: 'employees/:id',
        component: EmployeeDetails
      },

      {
        path: 'devices',
        component: DeviceList
      },


      {
        path: 'devices/add',
        component: AddDevice
      },


      {
        path: 'devices/edit/:id',
        component: DeviceEdit
      },


      {
        path: 'devices/:id',
        component: DeviceDetails
      },


      {
        path: 'departments',
        component: DepartmentList
      },


      {
        path: 'departments/add',
        component: DepartmentAdd
      },


      {
        path: 'departments/edit/:id',
        component: DepartmentEdit
      },

      {
        path: 'maintenance',
        component: Maintenance
      },

      {
        path: 'maintenance/add',
        component: AddMaintenance
      },

      {
        path: 'reports',
        component: Reports
      }



    ]

  },

  {
    path: '**',
    component: NotFound
  }


];