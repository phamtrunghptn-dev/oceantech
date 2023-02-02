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
import { useFormik } from "formik";
import * as Yup from "yup";

export default function DialogRefuse(props) {
  const { open, handleCloseDialog, employee, setEmployee } = props;

  const formik = useFormik({
    initialValues: {
      date: "",
      reason: "",
      content: "",
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
      if(employee?.ending){
        setEmployee({ ...employee, status: "Từ chối", refuse1: values });
      } else {
        setEmployee({ ...employee, status: "Từ chối", refuse: values });
      }
    },
  });

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle style={{ padding: 0 }}>
        <Typography variant="h6" style={{ padding: "10px 0 0 20px" }}>
          Từ chối hồ sơ
        </Typography>
        <Box className="icon-close">
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid
            container
            sm={12}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 5,
            }}
            spacing={2}
          >
            <Grid item xs={6} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  inputFormat="DD/MM/YYYY"
                  label="Ngày từ chối"
                  className="date-picker"
                  value={formik.values.date}
                  onChange={(newValue) => {
                    if (newValue) {
                      // setRefuse({ ...refuse, date: new Date(newValue) });
                      formik.setFieldValue('date', new Date(newValue));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      format="DD/MM/YYYY"
                      variant="outlined"
                      fullWidth
                      error={
                        formik.errors.date &&
                        formik.touched.date
                      }
                      helperText={formik.errors.date}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Lý do từ chối"
                variant="outlined"
                fullWidth
                size="small"
                name="reason"
                value={formik.values.reason}
                onChange={formik.handleChange}
                error={
                  formik.errors.reason &&
                  formik.touched.reason
                }
                helperText={formik.errors.reason}
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
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={
                  formik.errors.content &&
                  formik.touched.content
                }
                helperText={formik.errors.content}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" className="button-confirm1">
            Xác nhận
          </Button>
          <Button className="button-cancel" onClick={handleCloseDialog}>
            Đóng
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
