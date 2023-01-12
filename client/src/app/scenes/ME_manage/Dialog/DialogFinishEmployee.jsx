import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Grid } from '@material-ui/core'
import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import moment from 'moment'

const DialogFinishEmployee = (props) => {
  const { open, handleClose, employee } = props
  return (
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
          <Grid container>
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
              className=" container-form"
              sx={{ pl: 10, pr: 10, pb: 2 }}
              justifyContent="flex-start"
            >
              <Grid item sm={1.5} xs={1.5}>
                <span className="font-15">Tôi tên là:</span>
              </Grid>
              <Grid item sm={10.5} xs={10.5}>
                <TextField
                  className=" title-1 font-15"
                  fullWidth
                  variant="standard"
                  value={employee.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={12}
              xs={12}
              className=" container-form"
              sx={{ pl: 10, pr: 10, pb: 2 }}
              justifyContent="flex-start"
            >
              <Grid item sm={3.5} xs={3.5}>
                <span className="font-15">Hiện đang công tác tại vị trí:</span>
              </Grid>
              <Grid item sm={8.5} xs={8.5}>
                <TextField
                  className=" title-1 font-15"
                  fullWidth
                  variant="standard"
                  value={employee.position.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={12}
              xs={12}
              className=" container-form"
              sx={{ pl: 10, pr: 10, mt: 1 }}
              justifyContent="flex-start"
            >
              <Grid item sm={4} xs={4}>
                <span className="font-15">
                  Tôi xin được phép nghỉ làm từ ngày:
                </span>
              </Grid>
              <Grid item sm={8} xs={8}>
                <TextField
                  className=" title-1 font-15"
                  fullWidth
                  variant="standard"
                />
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
                  className=" title-1 font-15 dotted"
                  fullWidth
                  multiline
                  variant="standard"
                  required
                  InputProps={{
                    disableUnderline: true,
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
            className=" container-form"
            sx={{ pl: 10, pr: 10 }}
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
            className=" container-form"
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
        <Button className="button-confirm1" onClick={handleClose}>
          Trình lãnh đạo
        </Button>
        <Button className="button-cancel" onClick={handleClose}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogFinishEmployee
