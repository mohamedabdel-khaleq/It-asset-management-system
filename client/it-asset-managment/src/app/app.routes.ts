import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { authGuard } from './core/guards/auth-guard';
import { Dashboard } from './features/dashboard/dashboard';
import { EmployeeList } from './features/employees/employee-list/employee-list';
import { AddEmployee } from './features/employees/add-employee/add-employee';
import { DeviceList } from './features/devices/device-list/device-list';
import { AddDevice } from './features/devices/add-device/add-device';
import { DeviceDetails } from './features/devices/device-details/device-details';
import { DeviceEdit } from './features/devices/device-edit/device-edit';
import { DepartmentList } from './features/departments/department-list/department-list';
import { DepartmentAdd } from './features/departments/department-add/department-add';
import { DepartmentEdit } from './features/departments/department-edit/department-edit';
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
      }



    ]

  },

  {
    path: '**',
    component: NotFound
  }


];