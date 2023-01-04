import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {TextField, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function DialogRefuse(props) {
    const {open , handleCloseDialog, handleClose} = props;
    const [refuse, setRefuse] = useState({})
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
    <DialogTitle style={{padding: 0}}>
    <Typography variant="h6" style={{padding: "10px 0 0 20px"}}>Từ chối hồ sơ</Typography>
    <Box className="icon-close">
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
    </DialogTitle>
    <DialogContent>
    <Grid container sm={12} xs={12} style={{display: "flex", justifyContent: "space-between", marginTop: 5}} spacing={2}>
            <Grid item xs={6} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    inputFormat="DD/MM/YYYY"
                    label="Ngày kết thúc"
                    className="date-picker"
                    value={refuse.date || new Date()}
                    onChange={(newValue) => {
                        if(newValue){
                            setRefuse({...refuse, date: new Date(newValue)})
                        }
                    }}
                    renderInput={(params) => <TextField {...params} size="small" format="DD/MM/YYYY" variant="outlined" fullWidth/>}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={6}>
            <TextField 
            label="Lý do từ chối"
            variant="outlined" 
            fullWidth 
            size="small"
            value={refuse.reason || ""}
            onChange={(event) => {
                setRefuse({...refuse, reason: event.target.value})
            }}
            />
            </Grid>
            <Grid item xs={12} md={12}>
            <TextField 
              size="small"
              label="Ghi chú" 
              variant="outlined" 
              fullWidth
              multiline
              rows={4}
              value={refuse.content || ""}
                onChange={(event) => {
                setRefuse({...refuse, content: event.target.value})
                }}
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
