import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Grid } from '@material-ui/core'
import { TextField } from '@mui/material'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import moment from 'moment'
import ConfirmationDialog from "app/components/ConfirmationDialog";
import "./Dialog.scss"
import DialogAdditionalRequest from "./DialogAdditionalRequest"


const DialogFinishEmployee = (props) => {
  const { open, handleClose, employee, setEmployee } = props
  const [shouldOpenDialogBrowser, setshouldOpenDialogBrowser] = useState(false);
  const [shouldOpenDialogAdditionalRequest, setShouldOpenDialogAdditionalRequest] = useState(false);

  return (
    <>
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box className="icon-close">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          style={{ fontFamily: '"Times New Roman", Times, serif', padding: 10 }}
        >
          <Grid container spacing={0.5} className="pd-60">
            <Grid container item sm={12} xs={12} justifyContent="center">
              <span className="font-30 uppercase fw-600">
                Cộng hòa xã hội Việt Nam
              </span>
            </Grid>
            <Grid container item sm={12} xs={12} justifyContent="center">
              <span className="font-22 fw-600">
                Độc lập - Tự do - Hạnh phúc
              </span>
            </Grid>
            <Grid container item sm={12} xs={12} justifyContent="center">
              <span className="font-22 fw-600">
                -------------------------------------
              </span>
            </Grid>
            <Grid
              sx={{ pt: 9, pb: 9 }}
              container
              item
              sm={12}
              xs={12}
              justifyContent="center"
            >
              <span className="font-30 fw-600">ĐƠN XIN NGHỈ VIỆC</span>
            </Grid>
            <Grid
              container
              item
              sm={12}
              xs={12}
              className=" container-form"
              sx={{ pl: 10, pr: 10, pb: 2 }}
            >
              <Grid item sm={12} xs={12}>
                <span className="font-15">
                  Kính gửi: Ban giám đốc công ty OceanTech
                </span>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={12}
              xs={12}
              // className=" container-form"
              sx={{ pl: 10, pr: 10, pb: 2 }}
              justifyContent="flex-start"
            >
              <Grid item className="mr-10">
                <span className="font-15">Tôi tên là:</span>
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextField
                  className=" title-1 font-15"
                  fullWidth
                  variant="standard"
                  value={employee.name}
                  InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={12}
              xs={12}
              // className=" container-form"
              sx={{ pl: 10, pr: 10, pb: 2 }}
              justifyContent="flex-start"
            >
              <Grid item style={{paddingRight : 10}}>
                <span className="font-15">Hiện đang công tác tại vị trí:</span>
              </Grid>
              <Grid item sm={5} xs={5}>
                <TextField
                  className=" title-1 font-15"
                  fullWidth
                  variant="standard"
                  value={employee.position.name}
                  InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={12}
              xs={12}
              // className=" container-form"
              sx={{ pl: 10, pr: 10, mt: 1 }}
              justifyContent="flex-start"
            >
              <Grid item style={{paddingRight : 10}}>
                <span className="font-15">
                  Tôi xin được phép nghỉ làm từ ngày:
                </span>
              </Grid>
              <Grid item sm={4} xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="date"
                    inputFormat="DD/MM/YYYY"
                    readOnly
                    value={employee?.ending?.date || null}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          format="DD/MM/YYYY"
                          type="date"
                          fullWidth
                          className=" title-1 font-15"
                          variant="standard"
                          size="small"
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      )
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={12}
              xs={12}
              className=" container-form"
              sx={{ pl: 10, pr: 10, pb: 2, mt: 2 }}
              justifyContent="flex-start"
            >
              <Grid item sm={12} xs={12}>
                <span className="font-15">
                  Tôi làm đơn này đề nghị ban giám đốc cho tôi xin nghỉ việc vì
                  lí do:
                </span>
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField
                  className=" title-1 font-15"
                  fullWidth
                  multiline
                  variant="standard"
                  value={employee?.ending?.reason || null}
                  InputProps={{
                    disableUnderline: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <span className="font-15">
                  Trong khi chờ đợi sự chấp thuật của Ban Giám đốc Công ty, tôi
                  sẽ tiếp tục làm việc nghiêm túc và tiến hành bàn giao công
                  việc cũng như tài sản cho người quản lý trực tiếp của tôi
                </span>
              </Grid>
              <Grid item sm={12} xs={12} sx={{ mt: 1 }}>
                <span>Tôi xin chân thành cảm ơn</span>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={12}
              xs={12}
              className=" container-form"
              sx={{ pl: 10, pr: 10, mt: 1 }}
              justifyContent="flex-end"
            >
              <Grid item sm={4} xs={4}>
                <span className="font-15">
                  Hà nội, {moment(Date.now()).format('DD')} ngày{' '}
                  {moment(Date.now()).format('MM')} năm{' '}
                  {moment(Date.now()).format('YYYY')}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            className=" container-form pd-60"
            sx={{ pl: 10, pr: 10 }}
            style={{marginBottom: 60}}
            justifyContent="flex-end"
          >
            <Grid item sm={3} xs={3}>
              <span className="font-15" style={{ fontWeight: 'bold' }}>
                Người làm đơn
              </span>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            className=" container-form pd-60"
            sx={{ pl: 10, pr: 10, mt: 3 }}
            justifyContent="flex-end"
          >
            <Grid item sm={3} xs={3}>
              <span
                className="font-15"
                style={{ fontWeight: 'bold', textDecoration: 'uppercase' }}
              >
                {employee.name}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className="button-confirm1" onClick={() => {setshouldOpenDialogBrowser(true)}}>
          Phê duyệt
        </Button>
        <Button onClick={()=>setShouldOpenDialogAdditionalRequest(true)} className="button-confirm1 mr-10">
          Yêu cầu bổ sung
        </Button>
        <Button className="button-cancel1" onClick={handleClose}>
          Từ chối
        </Button>
        <Button className="button-cancel" onClick={handleClose}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
    {shouldOpenDialogBrowser &&(
        <ConfirmationDialog 
        title="Xác nhận"
        text="Bạn có muốn duyệt yêu cầu kết thúc hồ sơ nhân viên này"
        open={shouldOpenDialogBrowser}
        onYesClick={()=> setEmployee({...employee, status: "Kết thúc"})}
        onConfirmDialogClose={()=>setshouldOpenDialogBrowser(false)}
        />
      )}
      {shouldOpenDialogAdditionalRequest && (
        <DialogAdditionalRequest 
        open={shouldOpenDialogAdditionalRequest}
        handleCloseDialog={()=>setShouldOpenDialogAdditionalRequest(false)}
        employee={employee}
        setEmployee={setEmployee}
        />
      )}
    </>
  )
}

export default DialogFinishEmployee
