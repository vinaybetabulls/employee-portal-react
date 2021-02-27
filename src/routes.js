import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import OrganizationView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import CustomerCreateView from 'src/views/customer/CustomerCreateView';

import CompanyList from 'src/views/companies/CompanyList';
import CompanyCreateView from './views/companies/CompanyCreateView';
import Employee from './views/employees/AddEmployee/Employee';
import EditEmployee from './views/employees/EditEmployee/Employee';
import EmployeestListView from './views/employees/ViewEmployee';
import PermissionsCreateView from './views/permissions/AddPermissions';
import DesignationCreate from './views/designations/DesignationCreateView';
import EditDepartment from './views/department/DepartmentEdit';
import EmployeeProfiletView from './views/employees/ProfileView';
import Departments from './views/department/index';
// import CompanyEditView from './views/companies/CompanyEdit/CompanyEditForm';
import CompanyEditView from './views/companies/CompanyEdit';
import OrganizationEditView from './views/customer/OrganizationEdit';
import OrgDetailsPage from './views/customer/OrgDetailsPage';
import CompanyDetailsPage from './views/companies/CompanyDetailsPage';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'organizaiton/view', element: <OrganizationView /> },
      { path: 'organization/create', element: <CustomerCreateView /> },
      { path: 'organization/edit/:organizationUniqueId', element: <OrganizationEditView /> },
      { path: 'company/view', element: <CompanyList /> },
      { path: 'company/create', element: <CompanyCreateView /> },
      { path: 'company/edit/:companyUniqeId', element: <CompanyEditView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'employee/create', element: <Employee /> },
      { path: 'employee/view', element: <EmployeestListView /> },
      { path: 'permission/create', element: <PermissionsCreateView /> },
      { path: 'designations', element: <DesignationCreate /> },
      { path: 'designations/:desgId', element: <DesignationCreate /> },
      { path: 'employee/:empUniqueId', element: <EmployeeProfiletView /> },
      { path: 'employee/edit/:empUniqueId', element: <EditEmployee /> },
      { path: 'departments/:deptUniqId', element: <Departments /> },
      { path: 'departments/', element: <Departments /> },
      // { path: 'departments/edit/:departmentId', element: <EditDepartment /> },
      { path: 'organization/:orgUniqueId', element: <OrgDetailsPage /> },
      { path: 'company/:companyUniqeId', element: <CompanyDetailsPage /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <LoginView /> },
      { path: 'changepassowrd', element: <Navigate to="/app/settings" /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
