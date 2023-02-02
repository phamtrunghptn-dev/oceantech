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
      setRequest(employee?.request1)
    },[])

    return (
      <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle style={{padding:" 0 20px"}}>
      <h2>Yêu cầu bổ sung</h2>
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
