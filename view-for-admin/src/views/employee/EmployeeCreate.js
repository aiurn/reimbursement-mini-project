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
  CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie, faAnglesLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EmployeeCreate = () => {
  const [name, setName] = useState('')
  const [nrp, setNrp] = useState('')
  const [department, setDepartment] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [departments, setDepartments] = useState([])
  const navigate = useNavigate()

  const getdepartments = async () => {
    const resp = await axios.get('http://localhost:5000/api/department')
    console.log(resp.data)
    setDepartments(resp.data)
  }

  useEffect(() => {
    getdepartments()
  }, [])

  const storeEmployee = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/employee', {
        name: name,
        nrp: nrp,
        department_id: department,
        username: username,
        email: email,
        password: password,
      })
      navigate('/employee')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>
          <FontAwesomeIcon icon={faUserTie} /> Create employee
        </CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={storeEmployee}>
          {/* NAME */}
          <CRow className="mb-3">
            <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="text"
                name="name"
                id="name"
                placeholder="Input employee name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* NRP */}
          <CRow className="mb-3">
            <CFormLabel htmlFor="nrp" className="col-sm-2 col-form-label">
              NRP
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="text"
                name="nrp"
                id="nrp"
                placeholder="Input employee NRP"
                value={nrp}
                onChange={(e) => setNrp(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* DEPARTMENT */}
          <CRow className="mb-3">
            <CFormLabel className="col-sm-2 col-form-label" htmlFor="department">
              Department
            </CFormLabel>
            <CCol sm={10}>
              <CFormSelect
                id="department"
                value={department}
                name="department_id"
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          {/* USERNAME */}
          <CRow className="mb-3">
            <CFormLabel htmlFor="username" className="col-sm-2 col-form-label">
              Username
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="text"
                name="username"
                id="username"
                placeholder="Input employee username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* EMAIL */}
          <CRow className="mb-3">
            <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="email"
                name="email"
                id="email"
                placeholder="Input employee email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* PASSWORD */}
          <CRow className="mb-3">
            <CFormLabel htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="password"
                name="password"
                id="password"
                placeholder="Input employee password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </CCol>
          </CRow>

          {/* BUTTON ACTION */}
          <Link to="/employee" className="btn btn-info me-2">
            <FontAwesomeIcon icon={faAnglesLeft} /> Back
          </Link>
          <CButton type="submit">
            <FontAwesomeIcon icon={faPaperPlane} /> Create Employee
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default EmployeeCreate
    