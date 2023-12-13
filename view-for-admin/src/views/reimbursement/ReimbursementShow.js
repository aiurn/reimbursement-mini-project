/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  CButton,
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import {
  faAnglesLeft,
  faFileInvoice,
  faPaperPlane,
  faThumbsDown,
  faThumbsUp,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const ReimbursementShow = () => {
  const [date, setDate] = useState('')
  const [employee, setEmployee] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [imageURL, setImageURL] = useState(null)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')
  const [types, setTypes] = useState([])
  const [employees, setEmployees] = useState([])
  const [adminProof, setAdminProof] = useState(null)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showDeclineModal, setShowDeclineModal] = useState(false)

  const [reason, setReason] = useState('')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  const getEmployees = async () => {
    const resp = await axios.get('http://localhost:5000/api/employee')
    console.log(resp.data)
    setEmployees(resp.data)
  }

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
    setEmployee(resp.data[0].employee_id)
    setType(resp.data[0].type_id)
    setAmount(resp.data[0].amount)
    setImageURL(resp.data[0].transaction_receipt)
    setNote(resp.data[0].note)
    setStatus(resp.data[0].status)
    console.log(resp.data)
  }

  useState(() => {
    getReimbursement()
    getEmployees()
    getTypes()
  }, [])

  const handleUploadProof = (e) => {
    console.log(e.target.files[0])
    let uploaded = e.target.files[0]
    setImage(URL.createObjectURL(uploaded))
    console.log(URL.createObjectURL(uploaded))
    setAdminProof(uploaded)
  }

  const acceptReimbursement = async () => {
    // e.preventDefault()
    try {
      const accept = new FormData()
      accept.append('status', 'Accepted')
      accept.append('admin_proof', adminProof)

      await axios.patch(`http://localhost:5000/api/reimbursement/approval/${id}`, accept, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      navigate('/reimbursement')
    } catch (error) {
      console.log(error)
    }
  }

  const declineReimbursement = async () => {
    // e.preventDefault()
    try {
      const decline = {
        status: 'Declined',
        reason: reason,
      }
      // const decline = new FormData()
      // decline.append('status', 'Declined')
      // decline.append('reason', reason)

      await axios.patch(`http://localhost:5000/api/reimbursement/approval/${id}`, decline)
      console.log('berhasil')

      navigate('/reimbursement')
    } catch (error) {
      console.log(error)
    }
  }

  const handleAprovalButton = (title, name, successTitle, successName, employee, date) => {
    Swal.fire({
      title: title,
      text: `You will ${name} reimbursement from ${employee}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Yes, ${name}!`,
      timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: successTitle,
          text: `Reimbursement from ${employee} at ${date} will be ${successName}.`,
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          successTitle === 'Accepted!' ? acceptReimbursement() : declineReimbursement()
        })
      }
    })
  }

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
            <CRow className="mb-3">
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
            </CRow>

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
                  src={`http://localhost:5000/public/reimbursement_transaction/${imageURL}`}
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

            {/* BUTTON ACTION */}
            <Link to="/reimbursement" className="btn btn-info me-2">
              <FontAwesomeIcon icon={faAnglesLeft} /> Back
            </Link>

            {status === 'In review' && (
              <>
                <CButton
                  type="button"
                  color="success"
                  className="me-2"
                  onClick={() => setShowAcceptModal(!showAcceptModal)}
                >
                  <FontAwesomeIcon icon={faThumbsUp} /> Accept
                </CButton>
                <CButton
                  type="button"
                  color="danger"
                  className="me-2"
                  onClick={() => setShowDeclineModal(!showDeclineModal)}
                >
                  <FontAwesomeIcon icon={faThumbsDown} /> Decline
                </CButton>
              </>
            )}
          </CForm>
        </CCardBody>
      </CCard>

      {/* ACCEPT MODAL */}
      <CModal
        alignment="center"
        visible={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        aria-labelledby="accept"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle id="accept">Transaction Receipt</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CImage width={300} src={image} className="mb-2" />
          <CFormInput
            type="file"
            accept="image/*"
            name="admin_proof"
            onChange={handleUploadProof}
            required
          />
          <small color="secondary">
            Please make sure the transaction already done then input the proof here
          </small>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowAcceptModal(false)}>
            <FontAwesomeIcon icon={faXmark} /> Close
          </CButton>
          <CButton
            color="success"
            onClick={() =>
              handleAprovalButton('Accept?', 'accept', 'Accepted!', 'accepted', employee.name, date)
            }
          >
            <FontAwesomeIcon icon={faPaperPlane} /> Accept
          </CButton>
        </CModalFooter>
      </CModal>

      {/* DECLINE MODAL */}
      <CModal
        alignment="center"
        visible={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        aria-labelledby="decline"
        backdrop="static"
      >
        {/* <CForm> */}
        <CModalHeader>
          <CModalTitle id="decline">Reasons</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormTextarea
            name="reason"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Input reasons here"
          ></CFormTextarea>
          <small color="secondary">
            Please input the reasons before you decline this reimbursement
          </small>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDeclineModal(false)}>
            <FontAwesomeIcon icon={faXmark} /> Close
          </CButton>
          <CButton
            color="danger"
            onClick={() =>
              handleAprovalButton(
                'Decline?',
                'decline',
                'Declined!',
                'declined',
                employee.name,
                date,
              )
            }
          >
            <FontAwesomeIcon icon={faPaperPlane} /> Decline
          </CButton>
        </CModalFooter>
        {/* </CForm> */}
      </CModal>
    </>
  )
}

export default ReimbursementShow
