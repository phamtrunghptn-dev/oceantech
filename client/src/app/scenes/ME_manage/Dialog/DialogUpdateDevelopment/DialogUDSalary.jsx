import React from 'react'
import { useState, useEffect } from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../../../theme'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import moment from 'moment'
import ConfirmationDialog from 'app/components/ConfirmationDialog'
import { ToastContainer, toast } from 'react-toastify'
import Grid from '@mui/material/Grid'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { getRowIdFromRowModel } from '@mui/x-data-grid/hooks/features/rows/gridRowsUtils'
import { editEmployee } from '../../EmployeeManageService/EmployeeManageService'
const DialogUDSalary = (props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { employee, setEmployee } = props
  //de fetch ra datagrid table
  const [UDSalary, setUDSalary] = useState([])
  //submit
  const [submitUDSalary, setSubmitUDSalary] = useState(null)
  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false)
  const [selectedRow, setSelectedRow] = useState('')
  const [pageSize, setPageSize] = React.useState(5)
  //data edit
  const [valueUDSalary, setValueUDSalary] = useState(null)
  const handleClose = () => {
    setShouldOpenConfirmDialog(false)
  }
  const handleDelete = (id) => {
    setUDSalary(UDSalary.filter((item) => item.id !== id))
    toast.success('Xóa thành công')
    setSelectedRow(null)
    handleClose()
  }
  const handleEdit = (obj) => {
    setValueUDSalary(obj)
  }

  const handleSubmitUDSalary = () => {
    editEmployee(employee).then((res) => {
      toast.success('Cập nhật diễn biến thành công')
      handleClose()
    })
  }

  useEffect(() => {
    if (employee.updateDevelopment?.salary) {
      setUDSalary(employee.updateDevelopment.salary)
    } else {
      setUDSalary([])
    }
  }, [])
  useEffect(() => {
    setEmployee({
      ...employee,
      updateDevelopment: { ...employee?.updateDevelopment, salary: UDSalary },
    })
  }, [UDSalary])

  useEffect(() => {
    if (submitUDSalary) {
      formikUDSalary.handleSubmit()
      setSubmitUDSalary(false)
    }
  }, [submitUDSalary])

  const formikUDSalary = useFormik({
    initialValues: valueUDSalary || {
      date: '',
      count: 0,
      reason: '',
      rank: 0,
      note: '',
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      date: Yup.date()
        .nullable()
        .typeError('Sai định dạng ngày!')
        .max(new Date(), 'Ngày sinh được lớn hơn ngày hiện tại!')
        .required('Vui lòng nhập ngày sinh!'),
      count: Yup.number().required('Vui lòng nhập lần tăng lương !'),
      reason: Yup.string().required('Vui lòng nhập lý do tăng lương !'),
      rank: Yup.number().required('Vui lòng nhập bậc lương!'),
    }),
    onSubmit: (values, actions) => {
      if (valueUDSalary) {
        setUDSalary([
          ...UDSalary.filter((item) => item.id !== valueUDSalary.id),
          values,
        ])
      } else {
        values.id = uuidv4()
        setUDSalary([...UDSalary, values])
      }

      setValueUDSalary(null)
      setSelectedRow(null)
      actions.resetForm()
    },
  })
  const columns = [
    {
      field: 'accessLevel',
      headerName: 'Thao tác',
      renderCell: ({ row }) => {
        return (
          <div
            style={{
              display: 'flex',
              gap: 10,
            }}
          >
            <IconButton
              color="success"
              onClick={() => {
                setSelectedRow(row.id)
                handleEdit(row)
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setShouldOpenConfirmDialog(true)
                setSelectedRow(row.id)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )
      },
    },
    {
      field: 'date',
      headerName: 'Ngày tăng lương',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: ({ row }) => moment(row?.date).format('DD/MM/YYYY'),
    },
    {
      field: 'count',
      headerName: 'Lần tăng',
    },
    {
      field: 'reason',
      headerName: 'Lý do',
      flex: 1,
    },
    {
      field: 'rank',
      headerName: 'Bậc lương',
    },
  ]
  return (
    <>
      <Box noValidate autoComplete="off">
        <Box>
          <h2>Diễn biến: Tăng lương</h2>
          <form onSubmit={formikUDSalary.handleSubmit}>
            <Card style={{ padding: 5, alignItems: 'center' }}>
              <Grid container spacing={2}>
                <Grid item lg={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Ngày tăng lương"
                      name="date"
                      inputFormat="DD/MM/YYYY"
                      value={formikUDSalary.values.date || null}
                      onChange={(value) => {
                        if (value) {
                          formikUDSalary.setFieldValue('date', new Date(value))
                        }
                      }}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            format="DD/MM/YYYY"
                            type="date"
                            fullWidth
                            variant="outlined"
                            size="small"
                            error={
                              formikUDSalary.errors.date &&
                              formikUDSalary.touched.date
                            }
                            helperText={formikUDSalary.errors.date}
                          />
                        )
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item lg={2}>
                  <TextField
                    label="Lần tăng"
                    type="number"
                    fullWidth
                    variant="outlined"
                    name="count"
                    size="small"
                    value={formikUDSalary.values.count}
                    onChange={formikUDSalary.handleChange}
                    error={
                      formikUDSalary.errors.count &&
                      formikUDSalary.touched.count
                    }
                    helperText={formikUDSalary.errors.count}
                  ></TextField>
                </Grid>
                <Grid item lg={2}>
                  <TextField
                    label="Bậc"
                    type="number"
                    fullWidth
                    variant="outlined"
                    name="rank"
                    size="small"
                    value={formikUDSalary.values.rank}
                    onChange={formikUDSalary.handleChange}
                    error={
                      formikUDSalary.errors.rank && formikUDSalary.touched.rank
                    }
                    helperText={formikUDSalary.errors.rank}
                  ></TextField>
                </Grid>
                <Grid item lg={5}>
                  <TextField
                    label="Ghi chú"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="note"
                    size="small"
                    value={formikUDSalary.values.note}
                    onChange={formikUDSalary.handleChange}
                    error={
                      formikUDSalary.errors.note && formikUDSalary.touched.note
                    }
                    helperText={formikUDSalary.errors.note}
                  ></TextField>
                </Grid>
                <Grid item lg={10}>
                  <TextField
                    label="Lý do"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="reason"
                    size="small"
                    value={formikUDSalary.values.reason}
                    onChange={formikUDSalary.handleChange}
                    error={
                      formikUDSalary.errors.reason &&
                      formikUDSalary.touched.reason
                    }
                    helperText={formikUDSalary.errors.reason}
                  ></TextField>
                </Grid>
                <Grid item lg={1}>
                  <Box>
                    <Button
                      variant="contained"
                      style={{
                        float: 'right',
                      }}
                      className="button-confirm1"
                      onClick={() => {
                        setSubmitUDSalary(true)
                      }}
                    >
                      {selectedRow ? 'Sửa' : 'Thêm'}
                    </Button>
                  </Box>
                </Grid>
                <Grid item lg={1}>
                  <Box>
                    <Button
                      variant="contained"
                      style={{
                        float: 'right',
                      }}
                      className="button-confirm"
                      onClick={handleSubmitUDSalary}
                    >
                      Lưu
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </form>
        </Box>
        <Box
          marginTop={3}
          height="40vh"
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
            rows={UDSalary}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>
      </Box>
      {shouldOpenConfirmDialog && (
        <ConfirmationDialog
          title="Xác nhận"
          text="Bạn có muốn xóa diễn biến này không"
          open={shouldOpenConfirmDialog}
          onYesClick={handleDelete}
          onConfirmDialogClose={handleClose}
          id={selectedRow}
        />
      )}
    </>
  )
}

export default DialogUDSalary
