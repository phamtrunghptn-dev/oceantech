
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Box, useTheme, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import { mockDataTeam } from '../../data/mockData'
import moment from 'moment'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DialogProfile from './Dialog/DialogProfile'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { emphasize, styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import HomeIcon from '@mui/icons-material/Home'
import { getListDataEmployees } from './LeadershipPendingService/LeadershipPendingService'
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

const LeadershipPending = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [listEmployee, setListEmployee] = useState([])
  const [shouldOpenProfile, setShouldOpenProfile] = useState(false)
  const [employee, setEmployee] = useState({})
  const [pageSize, setPageSize] = React.useState(10)

  useEffect(() => {
    updatePageData()
  }, [])

  const updatePageData = () => {
    getListDataEmployees().then((res) => {
      let arr = res.data
      setListEmployee(
        arr.filter(
          (item) => item.status === 'Chờ duyệt' || item.status === 'Chờ xử lý',
        ),
      )
    })
  }

  useEffect(() => {
    console.log(listEmployee)
  }, [listEmployee])

  const handleClose = () => {
    setShouldOpenProfile(false)
    updatePageData()
  }

  const columns = [
    {
      field: 'action',
      headerName: 'Thao tác',
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <IconButton
          color="success"
          sortable={false}
          onClick={() => {
            setEmployee(row)
            setShouldOpenProfile(true)
          }}
        >
          <RemoveRedEyeIcon />
        </IconButton>
      ),
    },
    {
      field: 'code',
      sortable: false,
      headerName: 'Mã nhân viên',
      disableColumnMenu: true,
      renderCell: ({ row }) => row?.code,
    },
    {
      field: 'name',
      headerName: 'Họ và Tên',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => row?.name,
    },
    {
      field: 'birthDay',
      headerName: 'Ngày sinh',
      type: 'date',
      headerAlign: 'left',
      align: 'left',
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => moment(row?.birthDay).format('DD/MM/YYYY'),
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => row?.phone,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => row?.email,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => row?.status,
    },
  ]

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
          <StyledBreadcrumb component="a" href="/" label="Lãnh đạo" />
          <StyledBreadcrumb
            component="a"
            href="/manage-employee-create"
            label="Danh sách chờ duyệt"
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
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
        />
      </Box>
      {shouldOpenProfile && (
        <DialogProfile
          open={shouldOpenProfile}
          handleClose={handleClose}
          employee={employee}
        />
      )}
      {shouldOpenFinish && (
        <DialogFinishEmployee 
        open={shouldOpenFinish}
        handleClose={handleClose}
        employee={employee}
        setEmployee={setEmployee}
        />
      )}
    </Box>
  )
}

export default LeadershipPending
