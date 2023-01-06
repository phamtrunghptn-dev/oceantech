import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, MenuItem, styled } from '@material-ui/core'

import './Dialog.css'
import {
  Team,
  Provinces,
  Districts,
  Wards,
  Position,
  Gender,
} from '../../../data/Constant'

export default function DialogMainInfo(props) {
  const { formik, employee, setEmployee, handleChangeZZ } = props
  useEffect(() => {
    setEmployee(formik.values)
  }, [formik])

  return (
    <Grid lq={12}>
      <Box component="form" noValidate autoComplete="off">
        <form onSubmit={formik.handleSubmit}>
          <Grid lg={12} style={{ marginBottom: 10 }}>
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
                    <TextField
                      fullWidth
                      select
                      label="Giới tính"
                      type="text"
                      variant="outlined"
                      name="gender"
                      value={formik.values.gender}
                      size="small"
                      onChange={formik.handleChange}
                      error={formik.errors.gender && formik.touched.gender}
                      helperText={formik.errors.gender}
                    >
                      {Gender.map((option) => (
                        <MenuItem key={option.id} value={option.gender}>
                          {option.gender}
                        </MenuItem>
                      ))}
                    </TextField>
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
                  <Grid item lg={3}>
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
                  </Grid>
                  <Grid item lg={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                      <DatePicker
                        fullWidth
                        label="Ngày sinh"
                        name="birthDay"
                        inputFormat="DD/MM/YYYY"
                        value={formik.values.birthDay || null}
                        onChange={(value) => {
                          if (value) {
                            formik.setFieldValue('birthDay', new Date(value))
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
                          )
                        }}
                      />
                    </LocalizationProvider>{' '}
                  </Grid>
                  <Grid item lg={3}>
                    <TextField
                      fullWidth
                      select
                      label="Nơi sinh"
                      type="text"
                      variant="outlined"
                      name="birthplace"
                      value={formik.values.birthplace.name}
                      size="small"
                      onChange={formik.handleChange}
                      error={
                        formik.errors.birthplace && formik.touched.birthplace
                      }
                      helperText={formik.errors.birthplace}
                    >
                      {Provinces.map((option) => (
                        <MenuItem
                          key={option.id}
                          value={option}
                          onClick={(e) => {
                            handleChangeZZ(option)
                          }}
                        >
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>{' '}
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
                    />{' '}
                  </Grid>
                  <Grid item lg={3}>
                    <TextField
                      fullWidth
                      label="Tôn giáo"
                      name="religion"
                      value={formik.values.religion}
                      size="small"
                      onChange={formik.handleChange}
                      error={formik.errors.religion && formik.touched.religion}
                      helperText={formik.errors.religion}
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
                    <TextField
                      select
                      fullWidth
                      label="Tỉnh/Thành phố"
                      type="text"
                      variant="outlined"
                      name="province"
                      value={formik.values.province}
                      size="small"
                      onChange={formik.handleChange}
                      error={formik.errors.province && formik.touched.province}
                      helperText={formik.errors.province}
                    >
                      {Provinces.map((option) => (
                        <MenuItem key={option.id} value={option}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={3}>
                    <TextField
                      select
                      fullWidth
                      label="Quận/Huyện"
                      type="text"
                      variant="outlined"
                      name="district"
                      value={formik.values.district}
                      size="small"
                      onChange={formik.handleChange}
                      error={formik.errors.district && formik.touched.district}
                      helperText={formik.errors.district}
                    >
                      {Districts.map((option) => (
                        <MenuItem key={option.id} value={option}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={3}>
                    <TextField
                      select
                      fullWidth
                      label="Xã/Phường"
                      type="text"
                      variant="outlined"
                      name="commune"
                      value={formik.values.commune}
                      size="small"
                      onChange={formik.handleChange}
                      error={formik.errors.commune && formik.touched.commune}
                      helperText={formik.errors.commune}
                    >
                      {Wards.map((option) => (
                        <MenuItem key={option.id} value={option}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    />{' '}
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
                            formik.setFieldValue('dateRange', new Date(value))
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
                          )
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item lg={3}>
                    <TextField
                      fullWidth
                      select
                      label="Nơi cấp"
                      type="text"
                      variant="outlined"
                      name="issuedBy"
                      value={formik.values.issuedBy}
                      size="small"
                      onChange={formik.handleChange}
                      error={formik.errors.issuedBy && formik.touched.issuedBy}
                      helperText={formik.errors.issuedBy}
                    >
                      {Provinces.map((option) => (
                        <MenuItem key={option.id} value={option}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    <TextField
                      fullWidth
                      select
                      label="Chức vụ"
                      type="text"
                      variant="outlined"
                      name="position"
                      value={formik.values.position}
                      size="small"
                      onChange={formik.handleChange}
                      error={formik.errors.position && formik.touched.position}
                      helperText={formik.errors.position}
                    >
                      {Position.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={3}>
                    <TextField
                      fullWidth
                      select
                      label="Nhóm"
                      type="text"
                      variant="outlined"
                      name="team"
                      value={formik.values.team}
                      size="small"
                      onChange={formik.handleChange}
                      error={formik.errors.team && formik.touched.team}
                      helperText={formik.errors.team}
                    >
                      {Team.map((option) => (
                        <MenuItem fullWidth key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
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
                              ',',
                            )
                          : ''
                      }
                      size="small"
                      onChange={(event) => {
                        formik.setFieldValue(
                          'salary',
                          event.target.value.replace(/,/g, ''),
                        )
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
  )
}
