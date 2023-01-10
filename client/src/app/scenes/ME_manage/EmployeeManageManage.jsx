import React, { useState } from 'react'
import Header from '../../components/Header'
import { Box, useTheme, IconButton, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import { mockDataManage } from '../../data/mockData'
import moment from 'moment'
import Tooltip from '@mui/material/Tooltip'
import MovingIcon from '@mui/icons-material/Moving'

const EmployeeManageManage = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false)
  const [employee, setEmployee] = useState({})

  const columns = [
    {
      field: 'action',
      headerName: 'Thao tác',
      renderCell: ({ row }) => (
        <Tooltip title="Cập nhật diễn biến">
          <IconButton
            color="success"
            onClick={() => {
              setShouldOpenDialog(true)
              setEmployee(row)
            }}
          >
            <MovingIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: 'code',
      headerName: 'Mã nhân viên',
      renderCell: ({ row }) => row?.employeeDetail.code,
    },
    {
      field: 'name',
      headerName: 'Họ và Tên',
      flex: 1,
      renderCell: ({ row }) => row?.employeeDetail.name,
    },
    {
      field: 'birthDay',
      headerName: 'Ngày sinh',
      type: 'date',
      headerAlign: 'left',
      align: 'left',
      renderCell: ({ row }) =>
        moment(row?.employeeDetail.birthDay).format('DD/MM/YYYY'),
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
      renderCell: ({ row }) => row?.employeeDetail.phone,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      renderCell: ({ row }) => row?.employeeDetail.email,
    },
  ]

  const handleClose = () => {
    setShouldOpenDialog(false)
    setEmployee({})
  }

  return (
    <Box m="20px">
      <Header
        title="Quản lý nhân viên"
        subtitle="Quản lý, cập nhật diễn biến nhân viên"
      />
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
        <DataGrid rows={mockDataManage} columns={columns} />
      </Box>
      {shouldOpenDialog && (
        <DialogManage
          open={shouldOpenDialog}
          handleClose={handleClose}
          employee={employee}
        />
      )}
    </Box>
  )
}

export default EmployeeManageManage
