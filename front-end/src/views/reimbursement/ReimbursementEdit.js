/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
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
  CRow,
} from '@coreui/react'
import { faAnglesLeft, faFileInvoice, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ReimbursementEdit = () => {
  const [date, setDate] = useState('')
  // const [employee, setEmployee] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [transactionReceipt, setTransactionReceipt] = useState(null)
  const [image, setImage] = useState('')
  const [note, setNote] = useState('')
  const [types, setTypes] = useState([])
  // const [employees, setEmployees] = useState([])
  const navigate = useNavigate()
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
    setTransactionReceipt(resp.data[0].transaction_receipt)
    setNote(resp.data[0].note)
    console.log(resp.data)
  }

  useState(() => {
    getReimbursement()
    // getEmployees()
    getTypes()
  }, [])

  const updateReimbursement = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('date', date)
      formData.append('employee_id', 1)
      formData.append('type_id', type)
      formData.append('amount', amount)
      formData.append('transaction_receipt', transactionReceipt)
      formData.append('note', note)
      formData.append('status', 'In review')
      // formData.append('reason', null)

      await axios.patch(`http://localhost:5000/api/reimbursement/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      navigate('/reimbursement')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUploadImage = (e) => {
    const uploaded = e.target.files[0];

    if (!uploaded) {
      URL.revokeObjectURL(image);
      setImage(transactionReceipt ? `http://localhost:5000/public/reimbursement_transaction/${transactionReceipt}` : '');
      setTransactionReceipt(transactionReceipt);
    } else {
      setImage(URL.createObjectURL(uploaded));
      setTransactionReceipt(uploaded);
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>
          <FontAwesomeIcon icon={faFileInvoice} /> Edit Reimbursement
        </CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={updateReimbursement} encType="multipart/form-data">
          {/* DATE */}
          {/* <CRow className="mb-3">
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
                required
              />
            </CCol>
          </CRow> */}

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
                required
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
                required
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
                required
              />
            </CCol>
          </CRow>

          {/* TRANSACTION RECEIPT */}
          <CRow className="mb-3">
            <CFormLabel htmlFor="transactionReceipt" className="col-sm-2 col-form-label">
              Transaction Receipt
            </CFormLabel>
            <CCol sm={10}>
              {image ? (<CImage width={200} src={image} className='mb-2' />) : <CImage width={200} src={`http://localhost:5000/public/reimbursement_transaction/${transactionReceipt}`} className='mb-2' />}
              <CFormInput
                type="file"
                name="transactionReceipt"
                id="transactionReceipt"
                onChange={handleUploadImage}
                accept="image/*"
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
                required
              ></CFormTextarea>
            </CCol>
          </CRow>

          {/* BUTTON ACTION */}
          <Link to="/reimbursement" className="btn btn-info me-2">
            <FontAwesomeIcon icon={faAnglesLeft} /> Back
          </Link>
          <CButton type="submit">
            <FontAwesomeIcon icon={faPaperPlane} /> Update Reimbursement
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default ReimbursementEdit
