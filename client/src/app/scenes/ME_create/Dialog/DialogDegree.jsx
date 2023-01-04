import React from 'react'
import { useState, useEffect } from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../../theme'
import { Degree } from '../../../data/Constant'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
import { Grid, MenuItem } from '@material-ui/core'
import { Provinces, DegreeField } from '../../../data/Constant'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { toast } from 'react-toastify'
import ConfirmationDialog from 'app/components/ConfirmationDialog'
const DialogDegree = (props) => {
  const theme = useTheme()
  const { formik, employee, setEmployee } = props
  const colors = tokens(theme.palette.mode)
  const [submitDegree, setSubmitDegree] = useState(false)
  const [dataDegree, setDataDegree] = useState([])
  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState('')
  const [selectedRow, setSelectedRow] = useState(null)

  //edit
  const [valueDegree, setValueDegree] = useState(null)
  const [pageSize, setPageSize] = React.useState(5)
  //every submit, add more degree
  useEffect(() => {
    if (submitDegree) {
      formikDegree.handleSubmit()
      setSubmitDegree(false)
    }
  }, [submitDegree])
  //fetch data  degree on table

  useEffect(() => {
    if (formik.values.listDiplomas) {
      setDataDegree(formik.values.listDiplomas)
    }
  }, [formik.values.listDiplomas])
  const handleClose = () => {
    setShouldOpenConfirmDialog(false)
  }
  const handleDelete = (id) => {
    const dataDeleted = dataDegree.filter((item) => item.id !== id)
    setDataDegree(dataDeleted)
    formik.values.listDiplomas = dataDeleted
    toast.success('Xóa thành công')
    handleClose()
  }
  const handleEdit = (obj) => {
    setValueDegree(obj)
  }

  const formikDegree = useFormik({
    initialValues: valueDegree || {
      name: '',
      content: '',
      place: '',
      date: null,
      field: '',
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/[a-zA-Z]+[ a-zA-Z]*/, 'Tên văn bằng không chứa số!')
        .required('Vui lòng nhập tên văn bằng!'),
      content: Yup.string().required('Vui lòng nhập nội dung văn bằng!'),
      place: Yup.string().required('Vui lòng nhập nơi cấp!'),
      date: Yup.date()
        .nullable()
        .typeError('Sai định dạng ngày!')
        .max(new Date(), 'Ngày cấp không được lớn hơn ngày hiện tại!')
        .min(new Date(0), 'Ngày cấp không được nhỏ hơn ngày 01/01/1970!')
        .required('Vui lòng nhập ngày cấp!'),
      field: Yup.string().required('Vui lòng nhập lĩnh vực văn bằng!'),
    }),

    onSubmit: (values, actions) => {
      if (valueDegree) {
        formik.values.listDiplomas = formik.values.listDiplomas.filter(
          (e) => e.id !== valueDegree.id,
        )

        values.id = valueDegree.id
      } else {
        values.id = uuidv4()
      }

      formik.values.listDiplomas = [...formik.values.listDiplomas, values]

      setDataDegree(formik.values.listDiplomas)

      setEmployee({ ...employee, listDiplomas: formik.values.listDiplomas })

      setSelectedRow(null)

      actions.resetForm()
      setValueDegree(null)
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
                handleEdit(row)
                setSelectedRow(row)
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setShouldOpenConfirmDialog(true)
                setSelectedRowId(row.id)
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
      headerName: 'Tên văn bằng',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 2,
    },
    {
      field: 'place',
      headerName: 'Nơi cấp',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Ngày cấp',
      renderCell: ({ row }) => moment(row?.date).format('DD/MM/YYYY'),
    },
    {
      field: 'field',
      headerName: 'Lĩnh vực',
      flex: 1,
    },
  ]
  return (
    <>
      <Grid lg="12">
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '26.5ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Box>
            <form onSubmit={formikDegree.handleSubmit}>
              <Card
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr ',
                  padding: 5,
                }}
              >
                <TextField
                  label="Tên văn bằng"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="name"
                  size="small"
                  value={formikDegree.values.name}
                  onChange={formikDegree.handleChange}
                  error={formikDegree.errors.name && formikDegree.touched.name}
                  helperText={formikDegree.errors.name}
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Nơi cấp"
                  size="small"
                  name="place"
                  value={formikDegree.values.place}
                  onChange={formikDegree.handleChange}
                  error={
                    formikDegree.errors.place && formikDegree.touched.place
                  }
                  helperText={formikDegree.errors.place}
                >
                  {Provinces.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Ngày cấp"
                    inputFormat="DD/MM/YYYY"
                    name="date"
                    value={formikDegree.values.date || null}
                    onChange={(value) => {
                      if (value) {
                        formikDegree.setFieldValue('date', new Date(value))
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        format="DD/MM/YYYY"
                        type="date"
                        variant="outlined"
                        size="small"
                        error={
                          formikDegree.errors.date && formikDegree.touched.date
                        }
                        helperText={formikDegree.errors.date}
                      />
                    )}
                  />
                </LocalizationProvider>
                <TextField
                  select
                  label="Lĩnh vực"
                  type="text"
                  variant="outlined"
                  name="field"
                  size="small"
                  value={formikDegree.values.field}
                  onChange={formikDegree.handleChange}
                  error={
                    formikDegree.errors.field && formikDegree.touched.field
                  }
                  helperText={formikDegree.errors.field}
                >
                  {DegreeField.map((option) => (
                    <MenuItem key={option.id} value={option.field}>
                      {option.field}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Nội dung văn bằng"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="content"
                  size="small"
                  value={formikDegree.values.content}
                  onChange={formikDegree.handleChange}
                  error={
                    formikDegree.errors.content && formikDegree.touched.content
                  }
                  helperText={formikDegree.errors.content}
                />
                <Box>
                  <Button
                    variant="contained"
                    style={{
                      float: 'right',
                      margin: '10px 0 10px 0',
                    }}
                    className="button-confirm"
                    onClick={() => {
                      setSubmitDegree(true)
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
            <DataGrid
              rows={dataDegree || []}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
            />
          </Box>
        </Box>
      </Grid>
      {shouldOpenConfirmDialog && (
        <ConfirmationDialog
          title="Xác nhận"
          text="Bạn có muốn xóa văn bằng này không"
          open={shouldOpenConfirmDialog}
          onYesClick={handleDelete}
          onConfirmDialogClose={handleClose}
          id={selectedRowId}
        />
      )}
    </>
  )
}

export default DialogDegree
