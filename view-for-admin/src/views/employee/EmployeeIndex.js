/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CButton,
  CCardHeader,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUserTie, faEye, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const EmployeeIndex = () => {
  const [employees, setEmployee] = useState([])

  useEffect(() => {
    getEmployees()
  }, [])

  const getEmployees = async () => {
    const resp = await axios.get('http://localhost:5000/api/employee')
    console.log(resp.data)
    setEmployee(resp.data)
  }

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${id}`)
      getEmployees()
    } catch(error) {
      console.log(error)
    }
  }

  const handleDeleteButton = (id, name) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this employee data!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    timer: 5000,
    timerProgressBar: true,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleted!',
        text: `${name} will be deleted from Employee`,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        deleteEmployee(id);
      })
    }
  });
};

  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex">
          <div className="p-2 bd-highlight me-auto">
            <h4 className="fw-bold">
              <FontAwesomeIcon icon={faUserTie} /> Employees
            </h4>
          </div>
          <div className="p-2 bd-highlight">
            <Link to="/employee/create">
              <CButton>
                <FontAwesomeIcon icon={faPlus} /> Add Employee
              </CButton>
            </Link>
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">NRP</CTableHeaderCell>
              <CTableHeaderCell scope="col">Department</CTableHeaderCell>
              <CTableHeaderCell scope="col">Username</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employees.map((employee, index) => (
              <CTableRow key={employee.id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{employee.name}</CTableDataCell>
                <CTableDataCell>{employee.nrp}</CTableDataCell>
                <CTableDataCell>{employee.department_name}</CTableDataCell>
                <CTableDataCell>{employee.username}</CTableDataCell>
                <CTableDataCell>{employee.email}</CTableDataCell>
                <CTableDataCell>
                  <Link to={`/employee/show/${employee.id}`} className="btn btn-sm btn-info me-2">
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                  <Link to={`/employee/edit/${employee.id}`} className="btn btn-sm btn-warning me-2">
                    <FontAwesomeIcon icon={faPen} />
                  </Link>
                  <CButton type="button" color="danger" className="btn-sm" onClick={() => handleDeleteButton(employee.id, employee.name)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default EmployeeIndex
