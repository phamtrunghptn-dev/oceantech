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
  const [pageSize, setPageSize] = React.useState(5)

  useEffect(() => {
    updatePageData()
  }, [])

  const updatePageData = () => {
    getListDataEmployees().then((res) => {
      setListEmployee(res.data.filter((e) => e.status === 'Đã duyệt'))
    })
  }

  const columns = [
    {
      field: 'action',
      headerName: 'Thao tác',
      renderCell: ({ row }) => (
        <Tooltip title="Thông tin">
          <IconButton
            color="success"
            onClick={() => {
              setShouldOpenDialog(true)
              setEmployee(row)
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
        </Tooltip>
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
  ]

  const handleClose = () => {
    setShouldOpenDialog(false)
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
    </Box>
  )
}

export default EmployeeMainManager
