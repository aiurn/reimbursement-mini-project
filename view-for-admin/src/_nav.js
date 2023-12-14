/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice, faUserTie } from '@fortawesome/free-solid-svg-icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Employee',
    to: '/employee',
    icon: <FontAwesomeIcon icon={faUserTie} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reimbursement',
    to: '/reimbursement',
    icon: <FontAwesomeIcon icon={faFileInvoice} className="nav-icon" />,
  },
]

export default _nav
