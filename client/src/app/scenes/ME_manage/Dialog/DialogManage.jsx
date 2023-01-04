import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
  Button,
  Grid,
  MenuItem,
} from "@material-ui/core";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./DialogManage.scss";
import DialogRelease from "./DialogRelease";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const commonStyles = {
  bgcolor: "#e0dfdf",
  margin: "8px 20px",
  height: "80%",
  border: "1px solid #e0dfdf",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function DialogManage(props) {
  const { open, handleClose, employee } = props;
  const [shouldOpenEndDialog, setShouldOpenEndDialog] = useState(false);
  const [updateValue, setUpdateValue] = useState(null);

  const handleCloseDialog = () => {
    setShouldOpenEndDialog(false);
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogTitle>
          Cập nhật diễn biến
          <Box className="icon-close">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <fieldset
            style={{
              width: "0px",
            }}
          >
            <legend>Thông tin nhân viên</legend>
            <Grid container spacing={2} style={{ width: "78vw" }}>
              <Grid
                container
                sm={8}
                xs={8}
                className="padding-container"
                style={{ paddingTop: "40px" }}
              >
                <Grid container spacing={2} sm={12} xs={12}  style={{height: "280px"}}>
                  <Grid container item sm={6} xs={12}>
                    <Grid
                      container
                      item
                      sm={12}
                      xs={12}
                      className="text-sample"
                      spacing={4}
                      style={{ marginBottom: 40 }}
                    >
                      <Grid item xs={4} md={4} className="text-sample-center">
                        <span className="text-form">Mã nhân viên: </span>
                      </Grid>
                      <Grid item xs={8} md={8} className="text-sample-center">
                        <TextField
                          size="small"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          value={employee.employeeDetail.code}
                        />
                      </Grid>
                      <Grid item xs={4} md={4} className="text-sample-center">
                        <span className="text-form">Giới tính: </span>
                      </Grid>
                      <Grid item xs={8} md={8} className="text-sample-center">
                        <TextField
                          size="small"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          value={employee.employeeDetail.gender}
                        />
                      </Grid>
                      <Grid item xs={4} md={4} className="text-sample-center">
                        <span className="text-form">Số CCCD: </span>
                      </Grid>
                      <Grid item xs={8} md={8} className="text-sample-center">
                        <TextField
                          size="small"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          value={employee.employeeDetail.identification}
                        />
                      </Grid>
                      <Grid item xs={4} md={4} className="text-sample-center">
                        <span className="text-form">Email: </span>
                      </Grid>
                      <Grid item xs={8} md={8} className="text-sample-center">
                        <TextField
                          size="small"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          value={employee.employeeDetail.email}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container item sm={6} xs={6}>
                    <Grid
                      container
                      item
                      sm={12}
                      xs={12}
                      className="text-sample"
                      spacing={4}
                      style={{ marginBottom: 40 }}
                    >
                      <Grid item xs={4} md={4} className="text-sample-center">
                        <span className="text-form">Họ và tên: </span>
                      </Grid>
                      <Grid item xs={8} md={8} className="text-sample-center">
                        <TextField
                          size="small"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          value={employee.employeeDetail.name}
                        />
                      </Grid>
                      <Grid item xs={4} md={4} className="text-sample-center">
                        <span className="text-form">Ngày sinh: </span>
                      </Grid>
                      <Grid item xs={8} md={8} className="text-sample-center">
                        <TextField
                          size="small"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          value={moment(
                            employee.employeeDetail.birthDay
                          ).format("DD/MM/YYYY")}
                        />
                      </Grid>
                      <Grid item xs={4} md={4} className="text-sample-center">
                        <span className="text-form">Số điện thoại: </span>
                      </Grid>
                      <Grid item xs={8} md={8} className="text-sample-center">
                        <TextField
                          size="small"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            readOnly: true,
                          }}
                          value={employee.employeeDetail.phone}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                  <Grid item xs={2} md={2}>
                    <span className="text-form" style={{ fontSize: "16px" }}>
                      Địa chỉ:
                    </span>
                  </Grid>
                  <Grid item xs={10} md={10}>
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      multiline
                      value={`${employee.employeeDetail.addressDetail} - ${employee.employeeDetail.commune.name} - ${employee.employeeDetail.district.name} - ${employee.employeeDetail.province.name}`}
                    />
                  </Grid>
 
              </Grid>
              <Grid
                container
                sm={4}
                xs={4}
                className="padding-container"
                style={{ height: "20%" }}
              >
                <Grid container sm={12} xs={12}>
                  <Card
                    sx={{
                      width: "100%",
                      backgroundColor: "#fff",
                      color: "#000",
                      minHeight: "250px",
                    }}
                  >
                    <Box sx={{ ...commonStyles, borderRadius: "4px" }}>
                      <CardMedia
                        component="img"
                        height="90%"
                        style={{
                          borderRadius: "50%",
                          border: "1px solid #e0dfdf",
                          padding: "10px",
                          width: "90%",
                        }}
                        image={employee.employeeDetail.image}
                      />
                    </Box>
                    <CardContent
                      style={{ textAlign: "center", fontSize: "16px" }}
                    >
                      Ảnh nhân viên
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </fieldset>
          <Grid container sm={3} xs={3} style={{ margin: "10px 0" }}>
            <TextField
              select
              label="Cập nhật"
              variant="outlined"
              fullWidth
              onChange={(event) => setUpdateValue(event.target.value)}
            >
              <MenuItem value={0}>Đăng ký nghiệp vụ</MenuItem>
              <MenuItem value={1}>Tăng lương</MenuItem>
              <MenuItem value={2}>Thăng chức</MenuItem>
            </TextField>
          </Grid>
          <Grid container sm={12} xs={12} style={{ margin: "10px 0" }}>
            {updateValue === 0 && (
              <fieldset
                style={{
                  width: "0px",
                }}
              >
                <legend>Đăng ký nghiệp vụ</legend>
                <Grid
                  container
                  sm={12}
                  xs={12}
                  style={{ margin: "10px 0", width: "79vw" }}
                ></Grid>
              </fieldset>
            )}
            {updateValue === 1 && (
              <fieldset
                style={{
                  width: "0px",
                }}
              >
                <legend>Tăng lương</legend>
                <Grid
                  container
                  sm={12}
                  xs={12}
                  style={{ margin: "10px 0", width: "79vw" }}
                ></Grid>
              </fieldset>
            )}
            {updateValue === 2 && (
              <fieldset
                style={{
                  width: "0px",
                }}
              >
                <legend>Thăng chức</legend>
                <Grid
                  container
                  sm={12}
                  xs={12}
                  style={{ margin: "10px 0", width: "79vw" }}
                ></Grid>
              </fieldset>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="button-confirm">
            Lưu
          </Button>
          <Button
            className="button-cancel1"
            onClick={() => setShouldOpenEndDialog(true)}
          >
            Kết thúc
          </Button>
          <Button onClick={handleClose} className="button-cancel">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenEndDialog && (
        <DialogRelease
          open={shouldOpenEndDialog}
          handleCloseDialog={handleCloseDialog}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
