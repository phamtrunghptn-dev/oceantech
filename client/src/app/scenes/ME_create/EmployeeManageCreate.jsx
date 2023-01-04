import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Box, useTheme, IconButton, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { emphasize, styled } from '@mui/material/styles'
import { tokens } from '../../theme'
import { mockDataCreate } from '../../data/mockData'
import moment from 'moment'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Chip from '@mui/material/Chip'
import HomeIcon from '@mui/icons-material/Home'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ConfirmationDialog from 'app/components/ConfirmationDialog'
import DiaLogCreateNew from './Dialog/DialogCreateNew'
//
import { getListDataEmployees } from './EmployeeManagerService/EmployeeManageService'

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[300]
      : theme.palette.grey[800]
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  }
})

export default function EmployeeManageCreate() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [employee, setEmployee] = useState({
    code: '',
    name: '',
    gender: '',
    ethnic: '',
    religion: '',
    image: '',
    email: '',
    phone: '',
    birthDay: '',
    birthplace: '',
    position: '',
    team: '',
    salary: '',
    identification: '',
    issuedBy: '',
    dateRange: '',
    province: '',
    district: '',
    commune: '',
    addressDetail: '',
    listDiplomas: [],
    listRelationships: [],
  })

  const [listDataEmployees, setListDataEmployees] = useState([])
  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false)
  const [shouldOpenEditDialog, setShouldOpenEditDialog] = useState(false)
  useEffect(() => {
    updateDataEmployee()
  }, [])
  const updateDataEmployee = () => {
    getListDataEmployees().then((res) => {
      setListDataEmployees(res.data)
    })
  }

  const handleEditEmployee = (obj) => {
    setEmployee(obj)
    setShouldOpenEditDialog(true)
  }

  const columns = [
    {
      field: 'action',
      headerName: 'Thao tác',
      renderCell: ({ row }) => (
        <>
          <IconButton
            color="success"
            onClick={() => {
              handleEditEmployee(row)
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            disabled={
              row?.status === 'Yêu cầu bổ sung' ||
              row?.status === 'Chờ nộp hồ sơ'
            }
            onClick={() => setShouldOpenConfirmDialog(true)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: 'code',
      headerName: 'Mã nhân viên',
      renderCell: ({ row }) => row?.code,
    },
    {
      field: 'name',
      headerName: 'Họ và Tên',
      flex: 1,
      renderCell: ({ row }) => row?.name,
    },
    {
      field: 'birthDay',
      headerName: 'Ngày sinh',
      type: 'date',
      headerAlign: 'left',
      align: 'left',
      renderCell: ({ row }) => moment(row?.birthDay).format('DD/MM/YYYY'),
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
      renderCell: ({ row }) => row?.phone,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      renderCell: ({ row }) => row?.email,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: ({ row }) => {
        return row?.status
      },
    },
  ]
  console.log('111', employee)
  const handleDelete = () => {
    toast.success('Xóa thành công')
    handleClose()
  }

  const handleClose = () => {
    setShouldOpenConfirmDialog(false)
    setShouldOpenEditDialog(false)
    updateDataEmployee()
  }

  return (
    <>
      <ToastContainer
        autoClose={2000}
        draggable={false}
        limit={3}
        theme="colored"
      />
      <Box m="20px">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb" marginBottom="20px">
            <StyledBreadcrumb
              label="Home"
              icon={<HomeIcon fontSize="small" />}
            ></StyledBreadcrumb>
            <StyledBreadcrumb
              component="a"
              href="/"
              label="Quản lý nhân viên"
            />
            <StyledBreadcrumb
              component="a"
              href="/manage-employee-create"
              label="Tạo mới nhân viên"
            />
          </Breadcrumbs>
        </div>
        <Header title="Tạo mới nhân viên" />
        <Button
          variant="contained"
          style={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            padding: '8px 22px',
            fontSize: '0.9375rem',
          }}
          size="small"
          onClick={() => setShouldOpenEditDialog(true)}
        >
          Thêm
        </Button>
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.blueAccent[700],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700],
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid rows={listDataEmployees} columns={columns} />
        </Box>
      </Box>

      {shouldOpenEditDialog && (
        <DiaLogCreateNew
          open={shouldOpenEditDialog}
          employee={employee}
          setEmployee={(data) => setEmployee(data)}
          onClose={handleClose}
          listDataEmployees={listDataEmployees}
          setListDataEmployees={setListDataEmployees}
        />
      )}

      {shouldOpenConfirmDialog && (
        <ConfirmationDialog
          title="Xác nhận"
          text="Bạn có muốn xóa hồ sơ nhân viên này"
          open={shouldOpenConfirmDialog}
          onYesClick={handleDelete}
          onConfirmDialogClose={handleClose}
        />
      )}
    </>
  )
}
