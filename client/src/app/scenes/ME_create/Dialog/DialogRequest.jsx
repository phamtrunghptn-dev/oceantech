import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Position } from "app/data/Constant";

export default function DialogRequest(props) {
  const { onConfirmDialogClose, open, onYesClick, item, setItem } = props;

  const formik = useFormik({
    initialValues: {
      dateRequest: item?.dateRequest || null,
      userRequest: item?.userRequest || "",
      position: item?.position || null,
      content: item?.content || "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      content: Yup.string().required("Vui lòng nhập nội dung!"),
      userRequest: Yup.string().required("Vui lòng nhập tên nhân viên!"),
      position: Yup.object()
        .nullable()
        .required("Vui lòng chọn chức vụ nhân viên!"),
      dateRequest: Yup.date()
        .nullable()
        .typeError("Sai định dạng ngày!")
        .required("Vui lòng nhập ngày trình!"),
    }),
    onSubmit: (values) => {
      onYesClick(values);
    },
  });
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        <span className="font-30 fw-600">Trình lãnh đạo</span>
        <Box className="icon-close">
          <IconButton onClick={onConfirmDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                <DatePicker
                  fullWidth
                  label="Ngày trình"
                  name="dateRequest"
                  inputFormat="DD/MM/YYYY"
                  value={formik.values.dateRequest || null}
                  onChange={(value) => {
                    if (value) {
                      formik.setFieldValue("dateRequest", new Date(value));
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
                          formik.errors.dateRequest &&
                          formik.touched.dateRequest
                        }
                        helperText={formik.errors.dateRequest}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Họ và Tên"
                type="text"
                variant="outlined"
                name="userRequest"
                value={formik.values.userRequest}
                size="small"
                onChange={formik.handleChange}
                error={formik.errors.userRequest && formik.touched.userRequest}
                helperText={formik.errors.userRequest}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                size="small"
                fullWidth
                value={formik.values.position}
                onChange={(event, newValue) => {
                  formik.setFieldValue("position", newValue);
                }}
                options={Position}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Chức vụ"
                    error={formik.errors.position && formik.touched.position}
                    helperText={formik.errors.position}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nội dung"
                type="text"
                variant="outlined"
                name="content"
                value={formik.values.content}
                size="small"
                onChange={formik.handleChange}
                error={formik.errors.content && formik.touched.content}
                helperText={formik.errors.content}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <>
            <Button type="submit" className="button-confirm1 mr-10">
              Xác nhận
            </Button>
            <Button
              onClick={onConfirmDialogClose}
              className="button-cancel mr-10"
            >
              Hủy
            </Button>
          </>
        </DialogActions>
      </form>
    </Dialog>
  );
}
