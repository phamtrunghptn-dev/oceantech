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
import DialogProfile from './DialogProfile'
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
  const { open, onClose } = props
  const { employee, setEmployee } = props
  const [value, setValue] = React.useState(0)
  const [typeOfSubmit, setTypeOfSubmit] = useState(null)
  const [shouldOpenFormDialog, setShouldOpenFormDialog] = useState(false)
  const [item, setItem] = useState({})

  const formik = useFormik({
    initialValues: employee,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/[a-zA-Z]+[ a-zA-Z]*/, 'T??n nh??n vi??n kh??ng ch???a s???!')
        .required('Vui l??ng nh???p T??n nh??n vi??n!'),
      code: Yup.string()
        .min(6, 'M?? nh??n vi??n t???i thi???u 6 k?? t???!')
        .max(11, 'M?? nh??n vi??n t???i ??a 11 k?? t???!')
        .required('Vui l??ng nh???p M?? nh??n vi??n!'),
      image: Yup.string().nullable().required('Vui l??ng ch???n ???nh nh??n vi??n!'),
      birthDay: Yup.date()
        .nullable()
        .typeError('Sai ?????nh d???ng ng??y!')
        .max(new Date(), 'Ng??y sinh kh??ng ???????c l???n h??n ng??y hi???n t???i!')
        .min(new Date(0), 'Ng??y sinh kh??ng ???????c nh??? h??n ng??y 01/01/1970!')
        .required('Vui l??ng nh???p Ngay sinh!'),
      birthplace: Yup.object().nullable().required('Vui l??ng ch???n n??i sinh!'),
      gender: Yup.object().nullable().required('Vui l??ng ch???n gi???i t??nh!'),
      position: Yup.object().nullable().required('Vui l??ng ch???n ch???c v???!'),
      team: Yup.object().nullable().required('Vui l??ng ch???n team!'),
      salary: Yup.number()
        .typeError('Sai ?????nh d???ng s???!')
        .required('Vui l??ng nh???p m???c l????ng!'),
      identification: Yup.string()
        .min(12, 'CCCD kh??ng ??t h??n 12 s???')
        .max(12, 'CCCD kh??ng l???n h??n 12 s???')
        .required('Vui l??ng nh???p CCCD!'),
      issuedBy: Yup.object().nullable().required('Vui l??ng ch???n n??i c???p!'),
      dateRange: Yup.string().required('Vui l??ng nh???p ng??y c???p!'),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
          '????y kh??ng ph???i l?? email!',
        )
        .required('Vui l??ng nh???p Email!'),
      phone: Yup.string()
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'S??? ??i???n tho???i kh??ng h???p l???')
        .required('Vui l??ng nh???p S??? ??i???n tho???i!'),
      province: Yup.object()
        .nullable()
        .required('Vui l??ng ch???n T???nh/Th??nh ph???!'),
      district: Yup.object().nullable().required('Vui l??ng ch???n Qu???n/Huy???n!'),
      commune: Yup.object().nullable().required('Vui l??ng ch???n X??/Ph?????ng!'),
      addressDetail: Yup.string().required('Vui l??ng ch???n X??/Ph?????ng!'),
      ethnic: Yup.string().required('Vui l??ng nh???p d??n t???c'),
      religion: Yup.string().required('Vui l??ng nh???p t??n gi??o'),
    }),
    onSubmit: (values) => {
      if (typeOfSubmit === 'saveToSave') {
        if (employee.id) {
          editEmployee(values).then(() => {
            toast.success('S???a th??nh c??ng')
            setTypeOfSubmit(null)
            setEmployee({})
            onClose()
          })
        } else {
          values.id = uuidv4()
          values.status = 'L??u m???i'
          addEmployee(values).then(() => {
            toast.success('Th??m th??nh c??ng')
            setTypeOfSubmit(null)
            setEmployee({})
            onClose(values)
          })
        }
      } else if (typeOfSubmit === 'saveToContinue') {
        setShouldOpenFormDialog(true)
        setItem(values)
      }
    },
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleChangeZZ = (option) => {
    formik.values.birthplace = option
  }
  return (
    <>
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
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <Tab label="  Th??ng tin nh??n vi??n  " {...a11yProps(0)} />
                  <Tab label="  Th??ng tin v??n b???ng  " {...a11yProps(1)} />
                  <Tab label="  Th??ng tin quan h???  " {...a11yProps(2)} />
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
                  handleChangeZZ={handleChangeZZ}
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
            className="button-confirm1"
            onClick={() => {
              setTypeOfSubmit('saveToSave')
              formik.handleSubmit()
            }}
          >
            {employee.id ? 'S???a' : 'Th??m'}
          </Button>
          <Button
            variant="contained"
            className="button-confirm1"
            onClick={() => {
              setTypeOfSubmit('saveToContinue')
              formik.handleSubmit()
            }}
          >
            ????ng k??
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            className="button-cancel"
          >
            H???y
          </Button>
        </DialogActions>
      </form>
    </Dialog>
            {shouldOpenFormDialog && (
              <DialogProfile 
                open={shouldOpenFormDialog}
                handleCloseDialog={()=>setShouldOpenFormDialog(false)}
                handleClose={onClose}
                item={item}
                setItem={setItem}
              />
            )}
    </>
  )
}
