import React from 'react';
import {Dialog, DialogActions, DialogContent, Box, TextField, DialogTitle, Button, Grid, MenuItem } from '@material-ui/core';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./DialogManage.scss"

export default function DialogEnd(props) {
    const {open , handleCloseDialog, handleClose} = props
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
    <DialogTitle>Kết thúc
    <Box className="icon-close">
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
    </DialogTitle>
    <DialogContent>
    <Grid container sm={12} xs={12} style={{display: "flex", justifyContent: "space-between"}} spacing={2}>
            <Grid item xs={6} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="Ngày kết thúc"
                    className="date-picker"
                    // value={dateOfBirth}
                    // onChange={(newValue) => {
                    //     setDateOfBirth(newValue)
                    // }}
                    renderInput={(params) => <TextField {...params} size="small" variant="outlined" fullWidth/>}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={6}>
            <TextField label="Lý do"  variant="outlined" fullWidth size="small"/>
            </Grid>
            <Grid item xs={12} md={12}>
            <TextField 
              size="small"
              label="Ghi chú" 
              variant="outlined" 
              fullWidth
              multiline
              maxRows={4}
            />
            </Grid>
            </Grid>
    </DialogContent>
    <DialogActions>
      <Button className="button-confirm" onClick={handleClose}>Xác nhận</Button>
      <Button className="button-cancel" onClick={handleCloseDialog}>Cancel</Button>
    </DialogActions>
  </Dialog>
  )
}
