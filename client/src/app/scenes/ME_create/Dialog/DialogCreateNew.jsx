import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
//
import { toast } from 'react-toastify'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogDegree from './DialogDegree'
import DialogMainInfo from './DialogMainInfo'
import DialogRelationship from './DialogRelationship'
import { Grid } from '@material-ui/core'
import { Button, useTheme } from '@material-ui/core'
import { tokens } from '../../../theme'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
//
import {
  addEmployee,
  editEmployee,
} from '../EmployeeManagerService/EmployeeManageService'
function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function DiaLogCreateNew(props) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { open, onClose } = props
  const { listDataEmployees, setListDataEmployees } = props
  const { employee, setEmployee } = props
  const [value, setValue] = React.useState(0)
  const [typeOfSubmit, setTypeOfSubmit] = useState(null)

  const formik = useFormik({
    initialValues: employee,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/[a-zA-Z]+[ a-zA-Z]*/, 'Tên nhân viên không chứa số!')
        .required('Vui lòng nhập Tên nhân viên!'),
      code: Yup.string()
        .min(6, 'Mã nhân viên tối thiểu 6 ký tự!')
        .max(11, 'Mã nhân viên tối đa 11 ký tự!')
        .required('Vui lòng nhập Mã nhân viên!'),
      image: Yup.string().nullable().required('Vui lòng chọn ảnh nhân viên!'),
      birthDay: Yup.date()
        .nullable()
        .typeError('Sai định dạng ngày!')
        .max(new Date(), 'Ngày sinh không được lớn hơn ngày hiện tại!')
        .min(new Date(0), 'Ngày sinh không được nhỏ hơn ngày 01/01/1970!')
        .required('Vui lòng nhập Ngay sinh!'),
      birthplace: Yup.object().required('Vui lòng chọn nơi sinh!'),
      gender: Yup.string().required('Vui lòng chọn giới tính!'),
      position: Yup.string().required('Vui lòng chọn chức vụ!'),
      team: Yup.string().required('Vui lòng chọn team!'),
      salary: Yup.number()
        .typeError('Sai định dạng số!')
        .required('Vui lòng nhập mức lương!'),
      identification: Yup.string()
        .min(12, 'CCCD không ít hơn 12 số')
        .max(12, 'CCCD không lớn hơn 12 số')
        .required('Vui lòng nhập CCCD!'),
      issuedBy: Yup.object().required('Vui lòng chọn nơi cấp!'),
      dateRange: Yup.string().required('Vui lòng nhập ngày cấp!'),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
          'Đây không phải là email!',
        )
        .required('Vui lòng nhập Email!'),
      phone: Yup.string()
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập Số điện thoại!'),
      province: Yup.object().required('Vui lòng chọn Tỉnh/Thành phố!'),
      district: Yup.object().required('Vui lòng chọn Quận/Huyện!'),
      commune: Yup.object().required('Vui lòng chọn Xã/Phường!'),
      addressDetail: Yup.string().required('Vui lòng chọn Xã/Phường!'),
      ethnic: Yup.string().required('Vui lòng nhập dân tộc'),
      religion: Yup.string().required('Vui lòng nhập tôn giáo'),
    }),
    onSubmit: (values) => {
      if (typeOfSubmit === 'saveToSave') {
        if (employee.id) {
          editEmployee(values).then(() => {
            toast.success('Sửa thành công')
            setTypeOfSubmit(null)
            setEmployee({})
            onClose()
          })
        } else {
          values.id = uuidv4()
          values.status = 'Lưu mới'
          addEmployee(values).then(() => {
            toast.success('Thêm thành công')
            setTypeOfSubmit(null)
            setEmployee({})
            onClose()
          })
        }
      } else if (typeOfSubmit === 'saveToContinue') {
        values.status = ''
      }
    },
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  console.log(listDataEmployees)
  return (
    <Dialog open={open} fullWidth maxWidth="lg">
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid lg={12}>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  fontSize: '',
                  '& .MuiTab-root': { width: '20%' },
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                >
                  <Tab label="  Thông tin nhân viên  " {...a11yProps(0)} />
                  <Tab label="  Thông tin văn bằng  " {...a11yProps(1)} />
                  <Tab label="  Thông tin quan hệ  " {...a11yProps(2)} />
                </Tabs>
                <Box className="icon-close">
                  <IconButton onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <TabPanel value={value} index={0}>
                <DialogMainInfo
                  formik={formik}
                  employee={employee}
                  setEmployee={setEmployee}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <DialogDegree
                  formik={formik}
                  employee={employee}
                  setEmployee={setEmployee}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <DialogRelationship
                  formik={formik}
                  employee={employee}
                  setEmployee={setEmployee}
                />
              </TabPanel>
            </Box>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            className="button-confirm"
            onClick={() => {
              setTypeOfSubmit('saveToSave')
              formik.handleSubmit()
            }}
          >
            {employee.id ? 'Sửa' : 'Thêm'}
          </Button>
          <Button
            variant="contained"
            className="button-confirm1"
            onClick={() => {
              setTypeOfSubmit('saveToContinue')
              formik.handleSubmit()
            }}
          >
            Đăng ký
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            className="button-cancel"
          >
            Hủy
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
