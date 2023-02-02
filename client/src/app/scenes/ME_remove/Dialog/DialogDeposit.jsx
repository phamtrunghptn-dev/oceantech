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
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DialogDeposit(props) {
    const {open , handleCloseDialog, onYesOnclick, item} = props;
  
    const formik = useFormik({
        initialValues: {
          dateDeposit: item?.dateDeposit || null,
          numberDeposit: item?.numberDeposit || "",
        },
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            numberDeposit: Yup.string().required("Vui lòng nhập số lưu hồ sơ!"),
            dateDeposit: Yup.date()
            .nullable()
            .typeError("Sai định dạng ngày!")
            .required("Vui lòng nhập ngày nộp lưu!"),
        }),
        onSubmit: (values) => {
            onYesOnclick(values);
        },
      });

    return (
      <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle style={{padding: 0}}>
      <Typography variant="h6" style={{padding: "10px 0 0 20px"}}>Nộp lưu hồ sơ</Typography>
      <Box className="icon-close">
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
      <DialogContent>
      <Grid container style={{display: "flex", justifyContent: "space-between", marginTop: 5}} spacing={2}>
              <Grid item xs={6} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                <DatePicker
                  fullWidth
                  label="Ngày nộp lưu"
                  name="dateDeposit"
                  inputFormat="DD/MM/YYYY"
                  value={formik.values.dateDeposit || null}
                  onChange={(value) => {
                    if (value) {
                      formik.setFieldValue("dateDeposit", new Date(value));
                    }
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        format="DD/MM/YYYY"
                        type="date"
                        fullWidth
                        variant="outlined"
                        size="small"
                        error={
                          formik.errors.dateDeposit &&
                          formik.touched.dateDeposit
                        }
                        helperText={formik.errors.dateDeposit}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                label="Số nộp lưu"
                type="text"
                variant="outlined"
                name="numberDeposit"
                value={formik.values.numberDeposit}
                size="small"
                onChange={formik.handleChange}
                error={formik.errors.numberDeposit && formik.touched.numberDeposit}
                helperText={formik.errors.numberDeposit}
              />
              </Grid>
              </Grid>
      </DialogContent>
      <DialogActions>
        <Button className="button-confirm1" type="submit">Xác nhận</Button>
        <Button className="button-cancel" onClick={handleCloseDialog}>Đóng</Button>
      </DialogActions>
      </form>
    </Dialog>
    )
}
