/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { faEye, faFileInvoice, faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ReimbursementIndex = () => {
  const [reimbursements, setReimbursement] = useState([])

  useEffect(() => {
    getReimbursements()
  }, [])

  const getReimbursements = async () => {
    const resp = await axios.get('http://localhost:5000/api/reimbursement')
    console.log(resp.data)
    setReimbursement(resp.data)
  }

  const deleteReimbursement = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reimbursement/${id}`)
      getReimbursements()
    } catch(error) {
      console.log(error)
    }
  }

  const handleDeleteButton = (id, name, date) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this reimbursement data!',
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
        text: `Reimbursement for ${name} at ${date} will be deleted`,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        deleteReimbursement(id);
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
              <FontAwesomeIcon icon={faFileInvoice} /> Reimbursement
            </h4>
          </div>
          <div className="p-2 bd-highlight">
            <Link to="/reimbursement/create">
              <CButton>
                <FontAwesomeIcon icon={faPlus} /> Add Reimbursement
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
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {reimbursements.map((reimbursement, index) => (
              <CTableRow key={reimbursement.id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{new Date(reimbursement.date).toISOString().split('T')[0]}</CTableDataCell>
                <CTableDataCell>{reimbursement.employee_name}</CTableDataCell>
                <CTableDataCell>{reimbursement.type_name}</CTableDataCell>
                <CTableDataCell>{reimbursement.amount}</CTableDataCell>
                <CTableDataCell>{reimbursement.status}</CTableDataCell>
                <CTableDataCell>
                  <Link to={`/reimbursement/show/${reimbursement.id}`} className='btn btn-sm btn-info me-2'><FontAwesomeIcon icon={faEye} /></Link>
                  <Link to={`/reimbursement/edit/${reimbursement.id}`} className='btn btn-sm btn-warning me-2'><FontAwesomeIcon icon={faPen} /></Link>
                  <CButton type='button' color='danger' className='btn-sm' onClick={() => handleDeleteButton(reimbursement.id, reimbursement.employee_name, new Date(reimbursement.date).toISOString().split('T')[0])}><FontAwesomeIcon icon={faTrashCan} /></CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default ReimbursementIndex
