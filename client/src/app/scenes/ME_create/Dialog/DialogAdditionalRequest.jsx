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
import { useEffect } from 'react';

export default function DialogAdditionalRequest(props) {
    const {open , handleCloseDialog, handleClose, employee, setEmployee} = props;
    const [request, setRequest] = useState("")
    
    useEffect(()=> {
      setRequest(employee?.request)
    },[])

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
        {request}
      </DialogContent>
      <DialogActions>
        <Button className="button-cancel" onClick={handleCloseDialog}>Đóng</Button>
      </DialogActions>
    </Dialog>
    )
}
