import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Employee
const EmployeeIndex = React.lazy(() => import('./views/employee/EmployeeIndex'))
const EmployeeCreate = React.lazy(() => import('./views/employee/EmployeeCreate'))
const EmployeeEdit = React.lazy(() => import('./views/employee/EmployeeEdit'))
const EmployeeShow = React.lazy(() => import('./views/employee/EmployeeShow'))

// Reimbursement
const ReimbursementIndex = React.lazy(() => import('./views/reimbursement/ReimbursementIndex'))
const ReimbursementShow = React.lazy(() => import('./views/reimbursement/ReimbursementShow'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/employee', name: 'Employee', element: EmployeeIndex },
  { path: '/employee/create', name: 'Create Employee', element: EmployeeCreate },
  { path: '/employee/edit/:id', name: 'Edit Employee', element: EmployeeEdit },
  { path: '/employee/show/:id', name: 'Show Employee', element: EmployeeShow },
  { path: '/reimbursement', name: 'Reimbursement', element: ReimbursementIndex },
  { path: '/reimbursement/show/:id', name: 'Show Reimbursement', element: ReimbursementShow },
]

export default routes
