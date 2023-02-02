import React, { useState, useEffect } from 'react'
import { Box, useTheme, IconButton, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import { mockDataManage } from '../../data/mockData'
import moment from 'moment'
import Tooltip from '@mui/material/Tooltip'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { emphasize, styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import HomeIcon from '@mui/icons-material/Home'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { getListDataEmployees } from './EmployeeManageService/EmployeeManageService'
import DialogManage from './Dialog/DialogManage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DialogAdditionalRequest from './Dialog/DialogAdditionalRequest'
import DialogRefuse from "./Dialog/DialogRefuse";
import EditIcon from '@mui/icons-material/Edit'
import ErrorIcon from '@mui/icons-material/Error';

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

const EmployeeMainManager = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false)
  const [listEmployee, setListEmployee] = useState([])
  const [employee, setEmployee] = useState({})
  const [shouldOpenviewRequestDialog, setShouldOpenviewRequestDialog] = useState(false)
  const [shouldOpenDialogRefuse, setShouldOpenDialogRefuse] = useState(false);
  const [pageSize, setPageSize] = React.useState(5)

  useEffect(() => {
    updatePageData()
  }, [])

  const updatePageData = () => {
    getListDataEmployees().then((res) => {
      setListEmployee(res.data.filter((e) => e.status === 'Đã duyệt' ||  ( e.status === 'Yêu cầu bổ sung' && e?.request1) || ( e.status === 'Từ chối' && e?.refuse1)))
    })
  }

  const columns = [
    {
      field: 'action',
      headerName: 'Thao tác',
      renderCell: ({ row }) => (
        <>
         <IconButton
             className="icon-btn1 "
             onClick={() => {
              if(row?.request1){
                setShouldOpenviewRequestDialog(true)
              } else if(row?.refuse1){
                setShouldOpenDialogRefuse(true)
              }
               setEmployee(row)
             }}
             disabled={
              row.status === 'Lưu mới' ||
              row.status === 'Chờ nộp hồ sơ'
            }
           >
             <ErrorIcon />
           </IconButton>
          <IconButton
            color="success"
            onClick={() => {
                setShouldOpenDialog(true)
              setEmployee(row)
            }}
            disabled={
              row.status === 'Từ chối'
            }
          >
            <RemoveRedEyeIcon />
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
      flex: 1.5,
      renderCell: ({ row }) => {
        if(row?.status === "Yêu cầu bổ sung"){
          return "Yêu cầu bổ sung đơn xin nghỉ việc"
        } else if(row?.status === "Từ chối"){
          return "Từ chối đơn xin nghỉ việc"
        } else if(row?.status === "Đã duyệt") {
          return "Nhân viên chính thức"
        }
      },
    },
  ]

  const handleClose = () => {
    setShouldOpenDialog(false)
    setShouldOpenviewRequestDialog(false)
    setShouldOpenDialogRefuse(false)
    setEmployee({})
    updatePageData()
  }

  return (
    <Box m="20px">
      <ToastContainer
        autoClose={2000}
        draggable={false}
        limit={3}
        theme="colored"
      />
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb" marginBottom="20px">
          <StyledBreadcrumb
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          ></StyledBreadcrumb>
          <StyledBreadcrumb component="a" href="/" label="Quản lý nhân viên" />
          <StyledBreadcrumb
            component="a"
            href="/manage-employee-create"
            label="Quản lý"
          />
        </Breadcrumbs>
      </div>
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
            color: '#fbfbfb',
            backgroundColor: '#0D4C92',
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            color: '#fbfbfb',
            backgroundColor: '#0D4C92',
          },
          '& .MuiDataGrid-footerContainer > .MuiTablePagination-root': {
            color: '#fbfbfb',
          },
          '& .MuiDataGrid-footerContainer .MuiSvgIcon-root': {
            color: '#fbfbfb',
          },
          '& .MuiDataGrid-footerContainer .Mui-disabled .MuiSvgIcon-root': {
            color: 'rgba(251,251,251,.5)',
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
            outline: 'none !important',
          },
        }}
      >
        <DataGrid
          rows={listEmployee}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
      {shouldOpenDialog && (
        <DialogManage
          open={shouldOpenDialog}
          handleClose={handleClose}
          employee={employee}
          setEmployee={setEmployee}
          updatePageData={updatePageData}
        />
      )}
       {shouldOpenviewRequestDialog && (
        <DialogAdditionalRequest
          open={shouldOpenviewRequestDialog}
          handleCloseDialog={handleClose}
          employee={employee}
        />
      )}
      {shouldOpenDialogRefuse && (
        <DialogRefuse
          open={shouldOpenDialogRefuse}
          handleCloseDialog={handleClose}
          employee={employee}
        />
      )}
    </Box>
  )
}

export default EmployeeMainManager
