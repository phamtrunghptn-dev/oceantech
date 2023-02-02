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
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import { getRowIdFromRowModel } from '@mui/x-data-grid/hooks/features/rows/gridRowsUtils'
import { editEmployee } from '../../EmployeeManageService/EmployeeManageService'
const DialogUDPropose = (props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { employee, setEmployee } = props
  //de fetch ra datagrid table
  const [UDPropose, setUDPropose] = useState([])
  //submit
  const [submitUDPropose, setSubmitUDPropose] = useState(null)
  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false)
  const [selectedRow, setSelectedRow] = useState('')
  const [pageSize, setPageSize] = React.useState(5)
  const UDProposeType = ['Đề xuất', 'Tham mưu']
  //data edit
  const [valueUDPropose, setValueUDPropose] = useState(null)
  const handleUpdate = () => {
    if (employee?.updateDevelopment?.propose) {
      setUDPropose(employee.updateDevelopment.propose)
    } else {
      setUDPropose([])
    }
  }
  const handleClose = () => {
    setShouldOpenConfirmDialog(false)
  }

  const handleDelete = (id) => {
    setUDPropose(UDPropose.filter((item) => item.id !== id))
    toast.success('Xóa thành công')
    setSelectedRow(null)
    handleClose()
  }
  const handleEdit = (obj) => {
    setValueUDPropose(obj)
  }

  const handleSubmitUDPropose = () => {
    editEmployee(employee).then((res) => {
      toast.success('Cập nhật diễn biến thành công')
      handleClose()
    })
  }

  useEffect(() => {
    handleUpdate()
  }, [])
  useEffect(() => {
    setEmployee({
      ...employee,
      updateDevelopment: { ...employee?.updateDevelopment, propose: UDPropose },
    })
  }, [UDPropose])

  useEffect(() => {
    if (submitUDPropose) {
      formikUDPropose.handleSubmit()
      setSubmitUDPropose(false)
    }
  }, [submitUDPropose])

  const formikUDPropose = useFormik({
    initialValues: valueUDPropose || {
      date: '',
      content: '',
      note: '',
      type: '',
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      date: Yup.date()
        .nullable()
        .typeError('Sai định dạng ngày!')
        .required('Vui lòng nhập ngày sinh!'),
      content: Yup.string().required('Vui lòng nhập nội dung!'),
      type: Yup.string().required('Vui lòng chọn!'),
    }),
    onSubmit: (values, actions) => {
      if (valueUDPropose) {
        setUDPropose([
          ...UDPropose.filter((item) => item.id !== valueUDPropose.id),
          values,
        ])
      } else {
        values.id = uuidv4()
        setUDPropose([...UDPropose, values])
      }

      setValueUDPropose(null)
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
      headerName: 'Ngày diễn biến',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: ({ row }) => moment(row?.date).format('DD/MM/YYYY'),
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      flex: 1,
    },
    {
      field: 'note',
      headerName: 'Ghi chú',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Loại',
    },
  ]
  return (
    <>
      <Box noValidate autoComplete="off">
        <Box>
          <form onSubmit={formikUDPropose.handleSubmit}>
            <Card style={{ padding: 5, alignItems: 'center' }}>
              <Grid container spacing={2}>
                <Grid item lg={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Ngày diễn biến"
                      name="date"
                      inputFormat="DD/MM/YYYY"
                      value={formikUDPropose.values.date || null}
                      onChange={(value) => {
                        if (value) {
                          formikUDPropose.setFieldValue('date', new Date(value))
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
                              formikUDPropose.errors.date &&
                              formikUDPropose.touched.date
                            }
                            helperText={formikUDPropose.errors.date}
                          />
                        )
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item lg={8}>
                  <TextField
                    label="Nội dung"
                    fullWidth
                    variant="outlined"
                    name="content"
                    size="small"
                    value={formikUDPropose.values.content}
                    onChange={formikUDPropose.handleChange}
                    error={
                      formikUDPropose.errors.content &&
                      formikUDPropose.touched.content
                    }
                    helperText={formikUDPropose.errors.content}
                  ></TextField>
                </Grid>
                <Grid item lg={7}>
                  <TextField
                    label="Ghi chú"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="note"
                    size="small"
                    value={formikUDPropose.values.note}
                    onChange={formikUDPropose.handleChange}
                    error={
                      formikUDPropose.errors.note &&
                      formikUDPropose.touched.note
                    }
                    helperText={formikUDPropose.errors.note}
                  ></TextField>
                </Grid>
                <Grid item lg={3}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    disablePortal
                    value={formikUDPropose.values.type || null}
                    onChange={(event, newValue) => {
                      formikUDPropose.setFieldValue('type', newValue)
                    }}
                    options={UDProposeType}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Loại đề xuất"
                        error={
                          formikUDPropose.errors.type &&
                          formikUDPropose.touched.type
                        }
                        helperText={formikUDPropose.errors.type}
                      />
                    )}
                  />
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
                        setSubmitUDPropose(true)
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
                      onClick={handleSubmitUDPropose}
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
            rows={UDPropose}
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

export default DialogUDPropose
