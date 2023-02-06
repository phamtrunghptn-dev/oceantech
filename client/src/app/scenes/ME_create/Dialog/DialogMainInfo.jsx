import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid, MenuItem, styled } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import "./Dialog.css";

import {
  Team,
  Provinces,
  Districts,
  Wards,
  Position,
  Gender,
} from "../../../data/Constant";

export default function DialogMainInfo(props) {
  const { formik, employee, setEmployee, handleChangeZZ } = props;
  useEffect(() => {
    setEmployee(formik.values);
  }, [formik]);

  return (
    <Grid container>
      <Box component="form" noValidate autoComplete="off">
        <form onSubmit={formik.handleSubmit}>
          <Grid container item xs={12}>
            <Grid item xs={9} style={{ marginBottom: 10 }}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item lg={3}>
                      <TextField
                        fullWidth
                        id="outlined-required"
                        label="Mã nhân viên"
                        size="small"
                        variant="outlined"
                        name="code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        error={formik.errors.code && formik.touched.code}
                        helperText={formik.errors.code}
                      />
                    </Grid>
                    <Grid item lg={3}>
                      <TextField
                        fullWidth
                        label="Tên nhân viên"
                        size="small"
                        type="text"
                        variant="outlined"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name && formik.touched.name}
                        helperText={formik.errors.name}
                      />
                    </Grid>
                    <Grid item lg={3}>
                      <Autocomplete
                        size="small"
                        fullWidth
                        disablePortal
                        value={formik.values.gender || null}
                        onChange={(event, newValue) => {
                          formik.setFieldValue("gender", newValue);
                        }}
                        options={Gender}
                        getOptionLabel={(option) => option.gender}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            label="Giới tính"
                            error={
                              formik.errors.gender && formik.touched.gender
                            }
                            helperText={formik.errors.gender}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={3}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="text"
                        variant="outlined"
                        name="email"
                        value={formik.values.email}
                        size="small"
                        onChange={formik.handleChange}
                        error={formik.errors.email && formik.touched.email}
                        helperText={formik.errors.email}
                      />
                    </Grid>
                    <Grid item lg={3}>
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        type="text"
                        variant="outlined"
                        name="phone"
                        value={formik.values.phone}
                        size="small"
                        onChange={formik.handleChange}
                        error={formik.errors.phone && formik.touched.phone}
                        helperText={formik.errors.phone}
                      />
                    </Grid>
                    {/* <Grid item lg={3}>
                    <TextField
                      fullWidth
                      label="Ảnh nhân viên"
                      type="file"
                      variant="outlined"
                      name="image"
                      size="small"
                      onChange={(event) => {
                        const fileReader = new FileReader()
                        fileReader.onload = () => {
                          // debugger
                          if (fileReader.readyState === 2) {
                            formik.setFieldValue('image', fileReader.result)
                          }
                        }
                        fileReader.readAsDataURL(event.target.files[0])
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{ accept: 'image/*' }}
                      error={formik.errors.image && formik.touched.image}
                      helperText={formik.errors.image}
                    />{' '}
                  </Grid> */}
                    <Grid item lg={3}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        fullWidth
                      >
                        <DatePicker
                          fullWidth
                          label="Ngày sinh"
                          name="birthDay"
                          inputFormat="DD/MM/YYYY"
                          value={formik.values.birthDay || null}
                          onChange={(value) => {
                            if (value) {
                              formik.setFieldValue("birthDay", new Date(value));
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
                                  formik.errors.birthDay &&
                                  formik.touched.birthDay
                                }
                                helperText={formik.errors.birthDay}
                              />
                            );
                          }}
                        />
                      </LocalizationProvider>{" "}
                    </Grid>
                    <Grid item lg={3}>
                      <Autocomplete
                        size="small"
                        fullWidth
                        disablePortal
                        value={formik.values.birthplace || null}
                        onChange={(event, newValue) => {
                          formik.setFieldValue("birthplace", newValue);
                        }}
                        options={Provinces}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            label="Nơi sinh"
                            error={
                              formik.errors.birthplace &&
                              formik.touched.birthplace
                            }
                            helperText={formik.errors.birthplace}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={3}>
                      <TextField
                        fullWidth
                        value={formik.values.ethnic}
                        size="small"
                        name="ethnic"
                        onChange={formik.handleChange}
                        error={formik.errors.ethnic && formik.touched.ethnic}
                        helperText={formik.errors.ethnic}
                        label="Dân tộc"
                      />{" "}
                    </Grid>
                    <Grid item lg={3}>
                      <TextField
                        fullWidth
                        label="Tôn giáo"
                        name="religion"
                        value={formik.values.religion}
                        size="small"
                        onChange={formik.handleChange}
                        error={
                          formik.errors.religion && formik.touched.religion
                        }
                        helperText={formik.errors.religion}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}  className="button-choose-image">
              {formik.values?.image ? (
                <img className="image-upload" src={formik.values?.image} />
              ) : (
                <img
                  className="image-upload"
                  src="https://www.pngitem.com/pimgs/m/516-5167304_transparent-background-white-user-icon-png-png-download.png"
                />
              )}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={9} style={{ marginBottom: 10 }}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item lg={3}>
                      <Autocomplete
                        size="small"
                        fullWidth
                        disablePortal
                        value={formik.values.province || null}
                        onChange={(event, newValue) => {
                          formik.setFieldValue("province", newValue);
                        }}
                        options={Provinces}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            label="Tỉnh/Thành phố"
                            error={
                              formik.errors.province && formik.touched.province
                            }
                            helperText={formik.errors.province}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={3}>
                      <Autocomplete
                        size="small"
                        fullWidth
                        disablePortal
                        value={formik.values.district || null}
                        onChange={(event, newValue) => {
                          formik.setFieldValue("district", newValue);
                        }}
                        options={Districts}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            label="Quận/Huyện"
                            error={
                              formik.errors.district && formik.touched.district
                            }
                            helperText={formik.errors.district}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={3}>
                      <Autocomplete
                        size="small"
                        fullWidth
                        disablePortal
                        value={formik.values.commune || null}
                        onChange={(event, newValue) => {
                          formik.setFieldValue("commune", newValue);
                        }}
                        options={Wards}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            label="Xã/Phường"
                            error={
                              formik.errors.commune && formik.touched.commune
                            }
                            helperText={formik.errors.commune}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={3}>
                      <TextField
                        fullWidth
                        label="Địa chỉ cụ thể"
                        type="text"
                        variant="outlined"
                        name="addressDetail"
                        value={formik.values.addressDetail}
                        size="small"
                        onChange={formik.handleChange}
                        error={
                          formik.errors.addressDetail &&
                          formik.touched.addressDetail
                        }
                        helperText={formik.errors.addressDetail}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={3}
              style={{ marginBottom: 10 }}
              className="button-choose-image"
            >
              <label for="file-upload" class="custom-file-upload p-10">
                <span>Chọn ảnh</span>
              </label>
              <input
                hidden
                type="file"
                id="file-upload"
                name="filename"
                accept="image/*"
                onChange={(event) => {
                  const fileReader = new FileReader()
                  fileReader.onload = () => {
                    // debugger
                    if (fileReader.readyState === 2) {
                      formik.setFieldValue('image', fileReader.result)
                    }
                  }
                  fileReader.readAsDataURL(event.target.files[0])
                }}
              ></input>
            </Grid>
          </Grid>
          <Grid lg={12} style={{ marginBottom: 10 }}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item lg={3}>
                    <TextField
                      label="CCCD"
                      type="text"
                      variant="outlined"
                      name="identification"
                      value={formik.values.identification}
                      size="small"
                      onChange={formik.handleChange}
                      error={
                        formik.errors.identification &&
                        formik.touched.identification
                      }
                      helperText={formik.errors.identification}
                      fullWidth
                    />{" "}
                  </Grid>
                  <Grid item lg={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                      <DatePicker
                        fullWidth
                        label="Ngày cấp"
                        name="dateRange"
                        inputFormat="DD/MM/YYYY"
                        value={formik.values.dateRange || null}
                        onChange={(value) => {
                          if (value) {
                            formik.setFieldValue("dateRange", new Date(value));
                          }
                        }}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              format="DD/MM/YYYY"
                              fullWidth
                              type="date"
                              variant="outlined"
                              size="small"
                              error={
                                formik.errors.dateRange &&
                                formik.touched.dateRange
                              }
                              helperText={formik.errors.dateRange}
                            />
                          );
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item lg={3}>
                    <Autocomplete
                      size="small"
                      fullWidth
                      disablePortal
                      value={formik.values.issuedBy || null}
                      onChange={(event, newValue) => {
                        formik.setFieldValue("issuedBy", newValue);
                      }}
                      options={Provinces}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Nơi cấp"
                          error={
                            formik.errors.issuedBy && formik.touched.issuedBy
                          }
                          helperText={formik.errors.issuedBy}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid lg={12} style={{ marginBottom: 10 }}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item lg={3}>
                    <Autocomplete
                      size="small"
                      fullWidth
                      disablePortal
                      value={formik.values.position || null}
                      onChange={(event, newValue) => {
                        formik.setFieldValue("position", newValue);
                      }}
                      options={Position}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Vị trí"
                          error={
                            formik.errors.position && formik.touched.position
                          }
                          helperText={formik.errors.position}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <Autocomplete
                      size="small"
                      fullWidth
                      disablePortal
                      value={formik.values.team || null}
                      onChange={(event, newValue) => {
                        formik.setFieldValue("team", newValue);
                      }}
                      options={Team}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Nhóm"
                          error={formik.errors.team && formik.touched.team}
                          helperText={formik.errors.team}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <TextField
                      fullWidth
                      label="Lương"
                      type="text"
                      variant="outlined"
                      name="salary"
                      value={
                        formik.values.salary
                          ? formik.values.salary.replace(
                              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                              ","
                            )
                          : ""
                      }
                      size="small"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "salary",
                          event.target.value.replace(/,/g, "")
                        );
                      }}
                      InputProps={{
                        maxLength: 10,
                        endAdornment: (
                          <InputAdornment position="end">VND</InputAdornment>
                        ),
                      }}
                      error={formik.errors.salary && formik.touched.salary}
                      helperText={formik.errors.salary}
                    ></TextField>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
}
