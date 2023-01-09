import React from 'react'
import { useState, useEffect } from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../../theme'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import { MenuItem } from '@material-ui/core'
import moment from 'moment'
import ConfirmationDialog from 'app/components/ConfirmationDialog'
import { ToastContainer, toast } from 'react-toastify'
import {
  Provinces,
  Relationship,
  Gender,
  Related,
} from '../../../data/Constant'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'

const DialogRelationship = (props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { formik } = props
  //de fetch ra datagrid table
  const [dataRelationship, setDataRelationship] = useState([])
  //submit
  const [submitRelationship, setSubmitRelationship] = useState(false)
  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false)
  const [selectedRow, setSelectedRow] = useState('')
  const [pageSize, setPageSize] = React.useState(5)
  //data edit
  const [valueRelationship, setValueRelationship] = useState(null)
  const handleClose = () => {
    setShouldOpenConfirmDialog(false)
  }
  const handleDelete = (id) => {
    const dataDeleted = dataRelationship.filter((item) => item.id !== id)
    setDataRelationship(dataDeleted)
    formik.values.listRelationships = dataDeleted
    toast.success('Xóa thành công')
    handleClose()
  }
  const handleEdit = (obj) => {
    setValueRelationship(obj)
  }

  useEffect(() => {
    if (formik.values.listRelationships) {
      setDataRelationship(formik.values.listRelationships)
    }
  }, [formik.values.listRelationships])

  useEffect(() => {
    if (submitRelationship) {
      formikRelationship.handleSubmit()
      setSubmitRelationship(false)
    }
  }, [submitRelationship])

  const formikRelationship = useFormik({
    initialValues: valueRelationship || {
      name: '',
      date: '',
      gender: '',
      relationship: '',
      address: '',
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/[a-zA-Z]+[ a-zA-Z]*/, 'Tên văn bằng không chứa số!')
        .required('Vui lòng nhập Họ và Tên!'),
      date: Yup.date()
        .nullable()
        .typeError('Sai định dạng ngày!')
        .max(new Date(), 'Ngày sinh được lớn hơn ngày hiện tại!')
        .required('Vui lòng nhập ngày sinh!'),
      gender: Yup.string().required('Vui lòng nhập giới tính!'),
      relationship: Yup.object().required('Vui lòng nhập mối quan hệ!'),
      address: Yup.string().required('Vui lòng nhập địa chỉ cụ thể!'),
    }),
    onSubmit: (values, actions) => {
      if (valueRelationship) {
        formik.values.listRelationships = formik.values.listRelationships.filter(
          (e) => e.id !== valueRelationship.id,
        )
        values.id = valueRelationship.id
      } else {
        values.id = uuidv4()
      }
      formik.values.listRelationships = [
        ...formik.values.listRelationships,
        values,
      ]

      setDataRelationship(formik.values.listRelationships)
      setValueRelationship(null)
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
      field: 'name',
      headerName: 'Họ và tên',
      flex: 2,
      cellClassName: 'name-column--cell',
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Ngày sinh',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      renderCell: ({ row }) => moment(row?.date).format('DD/MM/YYYY'),
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
      flex: 1,
    },
    {
      field: 'relationship',
      headerName: 'Quan hệ',
      flex: 1,
      renderCell: ({ row }) => row?.relationship.related,
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      flex: 1,
    },
  ]
  return (
    <>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '26.5ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Box>
          <form onSubmit={formikRelationship.handleSubmit}>
            <Card
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr ',
                padding: 5,
              }}
            >
              <TextField
                label="Họ và Tên"
                type="text"
                fullWidth
                variant="outlined"
                name="name"
                size="small"
                value={formikRelationship.values.name}
                onChange={formikRelationship.handleChange}
                error={
                  formikRelationship.errors.name &&
                  formikRelationship.touched.name
                }
                helperText={formikRelationship.errors.name}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ngày sinh"
                  name="date"
                  inputFormat="DD/MM/YYYY"
                  value={formikRelationship.values.date || null}
                  onChange={(value) => {
                    if (value) {
                      formikRelationship.setFieldValue('date', new Date(value))
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
                          formikRelationship.errors.date &&
                          formikRelationship.touched.date
                        }
                        helperText={formikRelationship.errors.date}
                      />
                    )
                  }}
                />
              </LocalizationProvider>
              <TextField
                select
                label="Giới tính"
                type="text"
                fullWidth
                variant="outlined"
                name="gender"
                value={formikRelationship.values.gender}
                size="small"
                onChange={formikRelationship.handleChange}
                error={
                  formikRelationship.errors.gender &&
                  formikRelationship.touched.gender
                }
                helperText={formikRelationship.errors.gender}
              >
                {Gender.map((option) => (
                  <MenuItem key={option.id} value={option.gender}>
                    {option.gender}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Mối quan hệ"
                type="text"
                fullWidth
                variant="outlined"
                name="relationship"
                size="small"
                value={formikRelationship.values.relationship}
                onChange={formikRelationship.handleChange}
                error={
                  formikRelationship.errors.relationship &&
                  formikRelationship.touched.relationship
                }
                helperText={formikRelationship.errors.relationship}
              >
                {Related.map((option) => (
                  <MenuItem key={option.id} value={option}>
                    {option.related}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Địa chỉ"
                type="text"
                fullWidth
                variant="outlined"
                name="address"
                size="small"
                value={formikRelationship.values.address}
                onChange={formikRelationship.handleChange}
                error={
                  formikRelationship.errors.address &&
                  formikRelationship.touched.address
                }
                helperText={formikRelationship.errors.address}
              >
                {Provinces.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <Box>
                <Button
                  variant="contained"
                  style={{
                    float: 'right',
                    margin: '10px 0 10px 0',
                  }}
                  className="button-confirm1"
                  onClick={() => {
                    setSubmitRelationship(true)
                  }}
                >
                  {selectedRow ? 'Sửa' : 'Thêm'}
                </Button>
              </Box>
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
            rows={dataRelationship}
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
          text="Bạn có muốn xóa hồ sơ quan hệ này không"
          open={shouldOpenConfirmDialog}
          onYesClick={handleDelete}
          onConfirmDialogClose={handleClose}
          id={selectedRow}
        />
      )}
    </>
  )
}

export default DialogRelationship
