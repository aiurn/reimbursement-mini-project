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

const PegawaiEdit = () => {
  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>
          <FontAwesomeIcon icon={faUserTie} /> Edit Pegawai
        </CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow className="mb-3">
            <CFormLabel htmlFor="nama" className="col-sm-2 col-form-label">
              Nama Pegawai
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput type="text" name="nama" id="nama" placeholder="Masukkan nama pegawai" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="nrp" className="col-sm-2 col-form-label">
              NRP
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput type="text" name="nrp" id="nrp" placeholder="Masukkan NRP pegawai" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel className="col-sm-2 col-form-label" htmlFor="divisi">
              Divisi
            </CFormLabel>
            <CCol sm={10}>
              <CFormSelect id="divisi">
                <option>Pilih Divisi</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <Link to="/pegawai" className="btn btn-info me-2">
            <FontAwesomeIcon icon={faAnglesLeft} /> Kembali
          </Link>
          <CButton type="submit">
            <FontAwesomeIcon icon={faPaperPlane} /> Kirim
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default PegawaiEdit
