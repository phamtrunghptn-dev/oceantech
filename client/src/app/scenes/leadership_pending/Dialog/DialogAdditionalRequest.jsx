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

export default function DialogAdditionalRequest(props) {
  const {open , handleCloseDialog, handleClose, employee, setEmployee} = props;
  const [request, setRequest] = useState("")

  const handleRequest = () => {
    if(employee.ending){
    setEmployee({...employee, status: "Yêu cầu bổ sung", request1: request})
  } else {
    setEmployee({...employee, status: "Yêu cầu bổ sung", request: request})
  }
  }

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
    <DialogTitle style={{padding: 0}}>
    <Typography variant="h6" style={{padding: "10px 0 0 20px"}}>Yêu cầu bổ sung</Typography>
    <Box className="icon-close">
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
    </DialogTitle>
    <DialogContent>
    <Grid container sm={12} xs={12} style={{display: "flex", justifyContent: "space-between", marginTop: 5}} spacing={2}>
            <Grid item xs={12} md={12}>
            <TextField 
              size="small"
              label="Nội dung yêu cầu" 
              variant="outlined" 
              value={request}
              onChange={(event)=>setRequest(event.target.value)}
              fullWidth
              multiline
              rows={4}
            />
            </Grid>
            </Grid>
    </DialogContent>
    <DialogActions>
      <Button className="button-confirm1" onClick={handleRequest}>Xác nhận</Button>
      <Button className="button-cancel" onClick={handleCloseDialog}>Cancel</Button>
    </DialogActions>
  </Dialog>
  )
}
