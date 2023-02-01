import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Grid } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import moment from 'moment'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from 'react-toastify'
//

import DiaLogUDRegister from './DialogUpdateDevelopment/DiaLogUDRegister'
import DialogUDOrdain from './DialogUpdateDevelopment/DialogUDOrdain'
import DialogUDSalary from './DialogUpdateDevelopment/DialogUDSalary'
import DialogUDPropose from './DialogUpdateDevelopment/DialogUDPropose'
const DialogUpdateDevelopment = (props) => {
  const {
    open,
    handleClose,
    employee,
    setEmployee,
    handleCloseUpdateDevelopmentDialog,
    updatePageData,
  } = props
  const options = [
    'Đăng kí hồ sơ',
    'Tăng lương',
    'Thăng chức',
    'Đề xuất, tham mưu',
  ]
  const [value, setValue] = React.useState('Chọn diễn biến')
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Autocomplete
          disableClearable={true}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Cập nhật diễn biến" />
          )}
        />
        <Box className="icon-close">
          <IconButton onClick={handleCloseUpdateDevelopmentDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {value === 'Đăng kí hồ sơ' && (
          <DiaLogUDRegister employee={employee} setEmployee={setEmployee} />
        )}
        {value === 'Tăng lương' && (
          <DialogUDSalary employee={employee} setEmployee={setEmployee} />
        )}
        {value === 'Thăng chức' && (
          <DialogUDOrdain employee={employee} setEmployee={setEmployee} />
        )}
        {value === 'Đề xuất, tham mưu' && (
          <DialogUDPropose employee={employee} setEmployee={setEmployee} />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          className="button-cancel"
          onClick={handleCloseUpdateDevelopmentDialog}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogUpdateDevelopment
