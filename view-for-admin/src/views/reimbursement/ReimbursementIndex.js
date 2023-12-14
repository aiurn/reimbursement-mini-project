/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
} from '@coreui/react'
import {
  faEye,
  faFileCircleCheck,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import numeral from 'numeral'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

  // const deleteReimbursement = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/reimbursement/${id}`)
  //     getReimbursements()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const handleDeleteButton = (id, name, date) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will not be able to recover this reimbursement data!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Yes, delete it!',
  //     timer: 5000,
  //     timerProgressBar: true,
  //     allowOutsideClick: false,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: 'Deleted!',
  //         text: `Reimbursement for ${name} at ${date} will be deleted`,
  //         icon: 'success',
  //         timer: 2000,
  //         timerProgressBar: true,
  //         showConfirmButton: false,
  //       }).then(() => {
  //         deleteReimbursement(id)
  //       })
  //     }
  //   })
  // }

  const formatCurrency = (amount) => {
    return numeral(amount).format('0,0.00');
  }

  return (
    <CCard>
      <CCardHeader>
            <h4 className="fw-bold">
              <FontAwesomeIcon icon={faFileInvoice} /> Reimbursements
            </h4>
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
                <CTableDataCell>
                  {new Date(reimbursement.date).toISOString().split('T')[0]}
                </CTableDataCell>
                <CTableDataCell>{reimbursement.employee_name}</CTableDataCell>
                <CTableDataCell>{reimbursement.type_name}</CTableDataCell>
                <CTableDataCell>Rp{formatCurrency(reimbursement.amount)}</CTableDataCell>
                <CTableDataCell>
                  {reimbursement.status === 'In review' ? (
                    <CBadge color="warning">{reimbursement.status}</CBadge>
                  ) : reimbursement.status === 'Declined' ? (
                    <CBadge color="danger">{reimbursement.status}</CBadge>
                  ) : (
                    <CBadge color="success">{reimbursement.status}</CBadge>
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  <Link
                    to={`/reimbursement/show/${reimbursement.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    {reimbursement.status === 'In review' ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faFileCircleCheck} />
                    )}
                  </Link>
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
