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
import { Link } from 'react-router-dom';

const PegawaiIndex = () => {
  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex">
          <div className="p-2 bd-highlight me-auto">
            <h4 className="fw-bold">
              <FontAwesomeIcon icon={faUserTie} /> Pegawai
            </h4>
          </div>
          <div className="p-2 bd-highlight">
            <Link to="/pegawai/create">
              <CButton><FontAwesomeIcon icon={faPlus} /> Tambah Pegawai</CButton>
            </Link>
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
              <CTableHeaderCell scope="col">NRP</CTableHeaderCell>
              <CTableHeaderCell scope="col">Divisi</CTableHeaderCell>
              <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow active>
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
              <CTableDataCell>
                <Link to="/pegawai/show" className='btn btn-sm btn-info me-2'><FontAwesomeIcon icon={faEye} /></Link>
                <Link to="/pegawai/edit" className='btn btn-sm btn-warning me-2'><FontAwesomeIcon icon={faPen} /></Link>
                <CButton type="submit" color='danger' className='btn-sm'><FontAwesomeIcon icon={faTrashCan} /></CButton>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">2</CTableHeaderCell>
              <CTableDataCell>Jacob</CTableDataCell>
              <CTableDataCell>Thornton</CTableDataCell>
              <CTableDataCell>@fat</CTableDataCell>
              <CTableDataCell>
                <Link to="/pegawai/show" className='btn btn-sm btn-info me-2'><FontAwesomeIcon icon={faEye} /></Link>
                <Link to="/pegawai/edit" className='btn btn-sm btn-warning me-2'><FontAwesomeIcon icon={faPen} /></Link>
                <CButton type="submit" color='danger' className='btn-sm'><FontAwesomeIcon icon={faTrashCan} /></CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default PegawaiIndex
