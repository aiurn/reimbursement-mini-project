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
  CRow,
} from '@coreui/react'
import { faAnglesLeft, faFileInvoice, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ReimbursementCreate = () => {
  const [date, setDate] = useState('')
  const [employee, setEmployee] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [transactionReceipt, setTransactionReceipt] = useState(null)
  const [image, setImage] = useState('')
  const [note, setNote] = useState('')
  const [types, setTypes] = useState([])
  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()

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

  useState(() => {
    getEmployees()
    getTypes()
  }, [])

  const storeReimbursement = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('date', date);
      formData.append('employee_id', employee);
      formData.append('type_id', type);
      formData.append('amount', amount);
      formData.append('transaction_receipt', transactionReceipt);
      formData.append('note', note);
      formData.append('status', 'In review');
      // formData.append('reason', null);

      await axios.post('http://localhost:5000/api/reimbursement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/reimbursement')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUploadChange = (e) => {
    console.log(e.target.files[0])
    let uploaded = e.target.files[0]
    setImage(URL.createObjectURL(uploaded))
    console.log(URL.createObjectURL(uploaded))
    setTransactionReceipt(uploaded)
  }

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>
          <FontAwesomeIcon icon={faFileInvoice} /> Create Reimbursement
        </CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={storeReimbursement} encType='multipart/form-data'>
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
                required
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
              <CImage width={200} src={image} />
              <CFormInput
                type="file"
                name="transactionReceipt"
                id="transactionReceipt"
                // value={transactionReceipt}
                // onChange={(e) => setTransactionReceipt(e.target.value)}
                onChange={handleUploadChange}
                required
                accept='image/*'
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
          <Link to='/reimbursement' className="btn btn-info me-2"><FontAwesomeIcon icon={faAnglesLeft} /> Back</Link>
          <CButton type="submit"><FontAwesomeIcon icon={faPaperPlane} /> Create Reimbursement</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default ReimbursementCreate
