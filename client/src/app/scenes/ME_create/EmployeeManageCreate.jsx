import React, { useState, useEffect } from 'react'
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
//
import {
  getListDataEmployees,
  deleteEmployee,
} from './EmployeeManagerService/EmployeeManageService'
import DialogProfile from './Dialog/DialogProfile'
import DialogAdditionalRequest from './Dialog/DialogAdditionalRequest'

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
    gender: null,
    ethnic: '',
    religion: '',
    image: '',
    email: '',
    phone: '',
    birthDay: '',
    birthplace: null,
    position: null,
    team: null,
    salary: '',
    identification: '',
    issuedBy: null,
    dateRange: '',
    province: null,
    district: null,
    commune: null,
    addressDetail: '',
    listDiplomas: [],
    listRelationships: [],
  })

  const [listDataEmployees, setListDataEmployees] = useState([])
  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false)
  const [shouldOpenEditDialog, setShouldOpenEditDialog] = useState(false)
  const [shouldOpenViewDialog, setShouldOpenViewDialog] = useState(false)
  const [shouldOpenviewRequestDialog, setShouldOpenviewRequestDialog] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  useEffect(() => {
    updateDataEmployee()
  }, [])
  const updateDataEmployee = () => {
    getListDataEmployees().then((res) => {
      setListDataEmployees(
        res.data.filter(
          (item) =>
            item.status === 'Lưu mới' ||
            item.status === 'Từ chối' ||
            item.status === 'Yêu cầu bổ sung' ||
            item.status === 'Chờ nộp hồ sơ' ||
            item.status === 'Chờ xử lý' 
        ),
      )
    })
  }

  const handleEditEmployee = (obj) => {
    setEmployee(obj)
    setShouldOpenEditDialog(true)
  }

  const handleDeleteEmployee = () => {
    deleteEmployee(employee).then(() => {
      updateDataEmployee()
      toast.success('Xóa thành công')
      handleClose()
    })
  }
  const columns = [
    {
      field: 'action',
      headerName: 'Thao tác',
      flex: 0.5,

      renderCell: ({ row }) => (
        <>
          <IconButton
            color="success"
            onClick={() => {
              if(row?.request){
                setShouldOpenviewRequestDialog(true)
              } else {
                setShouldOpenViewDialog(true)
              }
              setEmployee(row)
              setReadOnly(true)
            }}
            disabled={
              row.status === 'Kết thúc' ||
              row.status === 'Chờ nộp hồ sơ' ||
              row.status === 'Lưu mới'
            }
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            color="success"
            onClick={() => {
              handleEditEmployee(row)
            }}
            disabled={
              row.status === 'Kết thúc' ||
              row.status === 'Chờ duyệt' ||
              row.status === 'Đã duyệt' ||
              row.status === 'Từ chối' ||
              row.status === 'Chờ xử lý'
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            disabled={
              row?.status === 'Chờ nộp hồ sơ' ||
              row?.status === 'Chờ duyệt' ||
              row?.status === 'Yêu cầu bổ sung' ||
              row?.status === 'Đã duyệt' ||
              row?.status === 'Chờ duyệt' ||
              row?.status === 'Từ chối'
            }
            onClick={() => {
              setEmployee(row)
              setShouldOpenConfirmDialog(true)
            }}
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
      headerName: 'Số điện thoại',
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
  const handleDelete = () => {
    toast.success('Xóa thành công')
    handleClose()
  }

  const handleClose = () => {
    setShouldOpenConfirmDialog(false)
    setShouldOpenEditDialog(false)
    setShouldOpenViewDialog(false)
    setShouldOpenviewRequestDialog(false)
    updateDataEmployee()
    setEmployee({
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
    setReadOnly(false)
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
        <Button
          variant="contained"
          className="button-confirm1"
          onClick={() => setShouldOpenEditDialog(true)}
        >
          Thêm
        </Button>
        <Box
          m="10px 0 0 0"
          height="70vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              color: "#fbfbfb",
              backgroundColor: "#0D4C92",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              color: "#fbfbfb",
              backgroundColor: "#0D4C92",
            },
            "& .MuiDataGrid-footerContainer > .MuiTablePagination-root": {
              color: "#fbfbfb",
            },
            "& .MuiDataGrid-footerContainer .MuiSvgIcon-root": {
              color: "#fbfbfb",
            },
            "& .MuiDataGrid-footerContainer .Mui-disabled .MuiSvgIcon-root": {
              color: "rgba(251,251,251,.5)",
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
              {
                outline: "none !important",
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

      {shouldOpenViewDialog && (
        <DialogProfile
          open={shouldOpenViewDialog}
          handleCloseDialog={handleClose}
          item={employee}
          readOnly={readOnly}
        />
      )}

      {shouldOpenConfirmDialog && (
        <ConfirmationDialog
          title="Xác nhận"
          text="Bạn có muốn xóa hồ sơ nhân viên này"
          open={shouldOpenConfirmDialog}
          onYesClick={handleDeleteEmployee}
          onConfirmDialogClose={handleClose}
        />
      )}
      {shouldOpenviewRequestDialog && (
        <DialogAdditionalRequest
          open={shouldOpenviewRequestDialog}
          handleCloseDialog={handleClose}
          employee={employee}
        />
      )}
    </>
  );
}
