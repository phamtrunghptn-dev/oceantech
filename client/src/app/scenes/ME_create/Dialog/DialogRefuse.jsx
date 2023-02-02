import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment"
import { useFormik } from "formik";
import * as Yup from "yup";

export default function DialogRefuse(props) {
  const { open, handleCloseDialog, employee } = props;

  const formik = useFormik({
    initialValues: {
      date: employee?.refuse ? employee?.refuse?.date : "" ,
      reason: employee?.refuse ? employee?.refuse?.reason : "" ,
      content: employee?.refuse ? employee?.refuse?.content : "" ,
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      reason: Yup.string().required("Vui lòng nhập lý do!"),
      date: Yup.date()
        .nullable()
        .typeError("Sai định dạng ngày!")
        .required("Vui lòng nhập từ chối!"),
    }),
    onSubmit: (values) => {
    
    },
  });

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle style={{ padding: "0 20px"}}>
      <h2>Từ chối hồ sơ</h2>
        <Box className="icon-close">
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ padding: "0 20px"}}>
          <Grid
            container
            sm={12}
            xs={12}
            style={{
              display: "flex",
              fontSize: 16
            }}
            spacing={1}
          >
            <Grid item className="fw-600">Ngày từ chối: </Grid>
            <Grid item xs={3} md={3}>
            {moment(formik.values.date).format("DD/MM/YYYY")}
            </Grid>
            <Grid item className="fw-600">Lý do từ chối: </Grid>
            <Grid item xs={4} md={4}>
              {formik.values.reason}
            </Grid>
            <Grid item xs={12} md={12} className="fw-600">Ghi chú: </Grid>
            <Grid item xs={12} md={12}>
              {formik.values.content}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className="button-cancel" onClick={handleCloseDialog}>
            Đóng
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
