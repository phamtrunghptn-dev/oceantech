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
  const {open , diploma, handleClose} = props;
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
    <DialogTitle style={{padding: 0}}>
    <Typography variant="h6" style={{padding: "10px 0 0 20px"}}>Văn bằng </Typography>
    <Box className="icon-close">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
    </DialogTitle>
    <DialogContent>
      <Grid container sm={12} xs={12} style={{display: "flex", justifyContent: "space-between", marginTop: 5}} spacing={2}>
        <div></div>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button className="button-cancel" onClick={handleClose}>Đóng</Button>
    </DialogActions>
  </Dialog>
  )
}
