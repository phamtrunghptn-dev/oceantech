import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { Grid, Typography } from '@material-ui/core'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
//

import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
//icon
import BadgeIcon from '@mui/icons-material/Badge'
import CakeIcon from '@mui/icons-material/Cake'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EmailIcon from '@mui/icons-material/Email'
import GroupIcon from '@mui/icons-material/Group'
import moment from 'moment'
import DialogFinishEmployee from './DialogFinishEmployee'
import DialogUpdateDevelopment from './DialogUpdateDevelopment'
function DialogManage(props) {
  const { open, handleClose, employee, setEmployee, updatePageData } = props
  const [shouldOpenFinishDialog, setShouldOpenFinishDialog] = useState(false)
  const [
    shouldOpenUpdateDevelopmentDialog,
    setShouldOpenUpdateDevelopmentDialog,
  ] = useState(false)
  const handleCloseFinishDialog = () => {
    setShouldOpenFinishDialog(false)
  }
  const handleCloseUpdateDevelopmentDialog = () => {
    setShouldOpenUpdateDevelopmentDialog(false)
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Profile
          <Box className="icon-close">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item sx={5}>
              <Stack
                justifyContent="center"
                alignItems="center"
                style={{
                  padding: 20,
                  alignItems: 'center',
                  width: 300,
                }}
                spacing={2}
              >
                <Avatar
                  variant="circular"
                  sx={{ width: 160, height: 160 }}
                  src={employee.image}
                ></Avatar>
                <Typography alignItems="center" fullWidth variant="h2">
                  {employee.name}
                </Typography>
                <Typography className="position" fullWidth variant="subtitle1">
                  {employee.position.name}
                </Typography>
              </Stack>
            </Grid>
            <Grid item sx={7}>
              <Grid
                container
                spacing={4}
                style={{ padding: 20, marginTop: 50 }}
              >
                <Grid item sx={6}>
                  <Stack spacing={3}>
                    <Typography className="flex" variant="h5">
                      <BadgeIcon className="icon-left" />
                      Mã nhân viên: {employee.code}
                    </Typography>
                    <Typography className="flex" variant="h5">
                      <CakeIcon className="icon-left" />
                      Ngày sinh:{' '}
                      {moment(employee.birthDay).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography className="flex" variant="h5">
                      <ContactPhoneIcon className="icon-left" />
                      Số điện thoại: {employee.phone}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  <Stack spacing={3}>
                    <Typography className="flex" variant="h5">
                      <LocationOnIcon className="icon-left" />
                      Địa chỉ: {employee.province.name}
                    </Typography>
                    <Typography className="flex" variant="h5">
                      <EmailIcon className="icon-left" />
                      Email: {employee.email}
                    </Typography>
                    <Typography className="flex" variant="h5">
                      <GroupIcon className="icon-left" />
                      Nhóm làm việc: {employee.team.name}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className={employee?.status === "Yêu cầu bổ sung" ? "button-confirm1 button-disabled" : "button-confirm1"}
            onClick={() => setShouldOpenUpdateDevelopmentDialog(true)}
            disabled={employee?.status === "Yêu cầu bổ sung"}
          >
            Cập nhật diễn biến
          </Button>
          <Button
            className="button-cancel1"
            onClick={() => setShouldOpenFinishDialog(true)}
          >
            Kết thúc hồ sơ
          </Button>
          <Button className="button-cancel" onClick={handleClose}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenFinishDialog && (
        <DialogFinishEmployee
          open={shouldOpenFinishDialog}
          handleCloseFinishDialog={handleCloseFinishDialog}
          employee={employee}
          setEmployee={setEmployee}
          handleClose={handleClose}
          updatePageData={updatePageData}
        />
      )}
      {shouldOpenUpdateDevelopmentDialog && (
        <DialogUpdateDevelopment
          open={shouldOpenUpdateDevelopmentDialog}
          handleCloseUpdateDevelopmentDialog={
            handleCloseUpdateDevelopmentDialog
          }
          employee={employee}
          setEmployee={setEmployee}
          handleClose={handleClose}
          updatePageData={updatePageData}
        />
      )}
    </>
  )
}
export default DialogManage
