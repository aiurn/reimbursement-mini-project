/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {
  // CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CImage,
  CRow,
} from '@coreui/react'
import {
  faAnglesLeft,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import Swal from 'sweetalert2'

const ReimbursementShow = () => {
  const [date, setDate] = useState('')
  // const [employee, setEmployee] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [transactionReceiptURL, setTransactionReceiptURL] = useState(null)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')
  const [reason, setReason] = useState('')
  const [adminProofURL, setAdminProofURL] = useState(null)
  const [types, setTypes] = useState([])
  // const [employees, setEmployees] = useState([])
  const { id } = useParams()

  // const getEmployees = async () => {
  //   const resp = await axios.get('http://localhost:5000/api/employee')
  //   console.log(resp.data)
  //   setEmployees(resp.data)
  // }

  const getTypes = async () => {
    const resp = await axios.get('http://localhost:5000/api/type')
    console.log(resp.data)
    setTypes(resp.data)
  }

  const getReimbursement = async () => {
    const resp = await axios.get(`http://localhost:5000/api/reimbursement/${id}`)

    const dateValue = new Date(resp.data[0].date)
    if (!isNaN(dateValue.getTime())) {
      setDate(dateValue.toISOString().split('T')[0])
    } else {
      console.error('Invalid date format:', resp.data[0].date)
    }
    // setEmployee(resp.data[0].employee_id)
    setType(resp.data[0].type_id)
    setAmount(resp.data[0].amount)
    setTransactionReceiptURL(resp.data[0].transaction_receipt)
    setNote(resp.data[0].note)
    setStatus(resp.data[0].status)
    setReason(resp.data[0].reason)
    setAdminProofURL(resp.data[0].admin_proof)
    console.log(resp.data)
  }

  useState(() => {
    getReimbursement()
    // getEmployees()
    getTypes()
  }, [])

  return (
    <>
      <CCard>
        <CCardHeader>
          <CCardTitle>
            <FontAwesomeIcon icon={faFileInvoice} /> Show Reimbursement
          </CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CForm>
            {/* DATE */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="date" className="col-sm-2 col-form-label">
                Date
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled
                />
              </CCol>
            </CRow>

            {/* EMPLOYEE */}
            {/* <CRow className="mb-3">
              <CFormLabel htmlFor="employee" className="col-sm-2 col-form-label">
                Employee
              </CFormLabel>
              <CCol sm={10}>
                <CFormSelect
                  name="employee_id"
                  id="employee"
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                  disabled
                >
                  <option value="" disabled>
                    Select Employee
                  </option>
                  {employees.map((employee) => (
                    <option value={employee.id} key={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow> */}

            {/* TYPE */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="type" className="col-sm-2 col-form-label">
                Type
              </CFormLabel>
              <CCol sm={10}>
                <CFormSelect
                  name="type_id"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  disabled
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {types.map((type) => (
                    <option value={type.id} key={type.id}>
                      {type.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>

            {/* AMOUNT */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="amount" className="col-sm-2 col-form-label">
                Amount
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Input reimbursement amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled
                />
              </CCol>
            </CRow>

            {/* TRANSACTION RECEIPT */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="transactionReceipt" className="col-sm-2 col-form-label">
                Transaction Receipt
              </CFormLabel>
              <CCol sm={10}>
                <CImage
                  width={200}
                  src={`http://localhost:5000/public/reimbursement_transaction/${transactionReceiptURL}`}
                />
              </CCol>
            </CRow>

            {/* NOTE */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="note" className="col-sm-2 col-form-label">
                Note
              </CFormLabel>
              <CCol sm={10}>
                <CFormTextarea
                  name="note"
                  id="note"
                  placeholder="Input reimbursement note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  disabled
                ></CFormTextarea>
              </CCol>
            </CRow>

            {/* status */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="status" className="col-sm-2 col-form-label">
                Status
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  name="status"
                  id="status"
                  placeholder="Input reimbursement status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled
                />
              </CCol>
            </CRow>

            {/* admin proof */}
            {status === 'Accepted' && (
              <CRow className="mb-3">
                <CFormLabel htmlFor="adminProof" className="col-sm-2 col-form-label">
                  Admin Proof
                </CFormLabel>
                <CCol sm={10}>
                  <CImage
                    width={200}
                    src={`http://localhost:5000/public/reimbursement_transaction/${adminProofURL}`}
                  />
                </CCol>
              </CRow>
            )}

            {/* reason */}
            {status === 'Declined' && (
              <CRow className="mb-3">
                <CFormLabel htmlFor="reason" className="col-sm-2 col-form-label">
                  Reason
                </CFormLabel>
                <CCol sm={10}>
                  <CFormTextarea
                    name="reason"
                    id="reason"
                    placeholder="Input reimbursement reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    disabled
                  ></CFormTextarea>
                </CCol>
              </CRow>
            )}

            {/* BUTTON ACTION */}
            <Link to="/reimbursement" className="btn btn-info me-2">
              <FontAwesomeIcon icon={faAnglesLeft} /> Back
            </Link>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ReimbursementShow
