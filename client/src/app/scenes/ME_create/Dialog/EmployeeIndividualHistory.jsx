import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import moment from "moment";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";
import { Provinces, Districts, Wards, Gender, Related } from "app/data/Constant";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function EmployeeIndividualHistory(props) {
  const { employee, setEmployee, readOnly } = props;
  return (
    <Grid
      container
      spacing={2}
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <Grid container>
        <Grid container item sm={12} xs={12} justifyContent="center">
          <span className="font-30 uppercase fw-600">
            Cộng hòa xã hội Việt Nam
          </span>
        </Grid>
        <Grid container item sm={12} xs={12} justifyContent="center">
          <span className="font-22 fw-600">Độc lập - Tự do - Hạnh phúc</span>
        </Grid>
      </Grid>
      <Grid container style={{ padding: "40px 0 10px" }}>
        <Grid item container sm={3} xs={3} justifyContent="center">
          <img
            src={employee?.image}
            style={{ height: "100%", width: "50%", border: "1px solid #999" }}
            alt=""
          />
        </Grid>
        <Grid
          container
          item
          sm={6}
          xs={6}
          justifyContent="center"
          alignItems="center"
        >
          <span className="font-30 uppercase fw-600">Sơ yếu lý lịch</span>
        </Grid>
      </Grid>
      <Grid container style={{ padding: "20px 60px 10px" }}>
        <Grid item container sm={12} xs={12} alignItems="center">
          <span className="font-22 uppercase fw-600">I. Bản thân</span>
        </Grid>
        <Grid container item sm={8} xs={8} className=" container-form">
          <Grid item sm={3} xs={3}>
            <span className="font-15">Họ và tên (chữ in hoa): </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.name}
              className=" title-1 font-15 dotted"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, name: event.target.value })
              }
              variant="standard"
              InputProps={{
                readOnly:readOnly,
              }}
            />
          </Grid>
        </Grid>
        {/* <Grid
          item
          sm={1}
          xs={1}
        ></Grid> */}
        <Grid item sm={2} xs={2} container className=" container-form ml-20">
          <Grid item sm={5} xs={5}>
            <span className="font-15">Giới tính: </span>
          </Grid>
          <Grid item sm={5} xs={5}>
            <Autocomplete
              freeSolo
              fullWidth
              value={employee?.gender}
              onChange={(event, newValue) =>
                setEmployee((employee) => ({
                  ...employee,
                  gender: newValue,
                }))
              }
              readOnly={readOnly}
              options={Gender}
              getOptionLabel={(option) => option.gender}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  className="dotted font-15"
                  fullWidth
                  variant="standard"
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className=" container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={2} xs={2}>
            <span className="font-15">Tên thường dùng: </span>
          </Grid>
          <Grid item sm={10} xs={10}>
            <TextField
              value={employee?.name}
              className="dotted font-15"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, name: event.target.value })
              }
              variant="standard"
              InputProps={{
                readOnly:readOnly,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className=" container-form mt-20"
        >
        <Grid item sm={5} xs={5} className=" container-form">
          <Grid item sm={4} xs={4}>
            <span className="font-15">Sinh ngày: </span>
          </Grid>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              inputFormat="DD/MM/YYYY"
              value={employee?.birthDay || null}
              onChange={(value) => {
                if (value) {
                  setEmployee({ ...employee, birthDay: new Date(value) });
                }
              }}
              readOnly={readOnly}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="date"
                  fullWidth
                  className="dotted font-15"
                  format="DD/MM/YYYY"
                  variant="standard"
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item sm={5} xs={5} className=" container-form ml-20">
          <Grid item sm={4} xs={4}>
            <span className="font-15 mr-10">Nơi sinh: </span>
          </Grid>
          <Autocomplete
            freeSolo
            fullWidth
            value={employee?.birthplace}
            onChange={(event, newValue) =>
              setEmployee((employee) => ({
                ...employee,
                birthplace: {
                  ...employee,
                  birthplace: newValue,
                },
              }))
            }
            readOnly={readOnly}
            options={Provinces}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                className="dotted font-15"
                fullWidth
                variant="standard"
              />
            )}
          />
        </Grid>
        </Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className=" container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={2} xs={2}>
            <span className="font-15">Chỗ ở hiện nay: </span>
          </Grid>
          <Grid item sm={2} xs={2}>
            <TextField
              value={employee?.addressDetail}
              className="dotted font-15"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, addressDetail: event.target.value })
              }
              variant="standard"
              InputProps={{
                readOnly:readOnly,
              }}
            />
          </Grid>
          <span style={{ padding: 10 }}>-</span>
          <Grid item sm={2} xs={2}>
            <Autocomplete
              freeSolo
              fullWidth
              value={employee?.commune}
              onChange={(event, newValue) =>
                setEmployee((employee) => ({
                  ...employee,
                  commune: { ...employee, newValue },
                }))
              }
              options={Wards}
              readOnly={readOnly}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  className="dotted font-15"
                  fullWidth
                  variant="standard"
                />
              )}
            />
          </Grid>
          <span style={{ padding: 10 }}>-</span>
          <Grid item sm={3} xs={3}>
            <Autocomplete
              freeSolo
              fullWidth
              value={employee?.district}
              onChange={(event, newValue) =>
                setEmployee((employee) => ({
                  ...employee,
                  district: { ...employee, newValue },
                }))
              }
              readOnly={readOnly}
              options={Districts}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  className="dotted font-15"
                  fullWidth
                  variant="standard"
                />
              )}
            />
          </Grid>
          <span style={{ padding: 10 }}>-</span>
          <Grid item sm={3} xs={3}>
            <Autocomplete
              freeSolo
              fullWidth
              value={employee?.province}
              onChange={(event, newValue) =>
                setEmployee((employee) => ({
                  ...employee,
                  province: { ...employee, newValue },
                }))
              }
              readOnly={readOnly}
              options={Provinces}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  className="dotted font-15"
                  fullWidth
                  variant="standard"
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className=" container-form mt-20"
        >
        <Grid
          item
          sm={5}
          xs={5}
          className=" container-form"
        >
          <Grid item sm={3} xs={3}>
            <span className="font-15">Điện thoại: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.phone}
              className="dotted font-15"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, phone: event.target.value })
              }
              variant="standard"
              InputProps={{
                readOnly:readOnly,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          sm={5}
          xs={5}
          className=" container-form"
        >
          <Grid item sm={2} xs={2}>
            <span className="font-15">Email: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.email}
              className="dotted font-15"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, email: event.target.value })
              }
              variant="standard"
              InputProps={{
                readOnly:readOnly,
              }}
            />
          </Grid>
        </Grid>
        </Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className=" container-form mt-20"
        >
        <Grid
          item
          sm={5}
          xs={5}
          className=" container-form"
        >
          <Grid item sm={2} xs={2}>
            <span className="font-15">Dân tộc: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.ethnic}
              className="dotted font-15"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, ethnic: event.target.value })
              }
              variant="standard"
              InputProps={{
                readOnly:readOnly,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={5}
          xs={5}
          className=" container-form"
        >
          <Grid item sm={3} xs={3}>
            <span className="font-15">Tôn giáo: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.religion}
              className="dotted font-15"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, religion: event.target.value })
              }
              variant="standard"
              InputProps={{
                readOnly:readOnly,
              }}
            />
          </Grid>
        </Grid>
        </Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className=" container-form mt-20"
        >
          <Grid item sm={2} xs={2}>
            <span className="font-15">Số CCCD: </span>
          </Grid>
            <TextField
              value={employee?.identification}
              className="dotted font-15"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, identification: event.target.value })
              }
              variant="standard"
              InputProps={{
                readOnly:readOnly,
              }}
            />
        </Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className=" container-form mt-20"
        >
        <Grid
          item
          sm={5}
          xs={5}
          className=" container-form"
        >
          <Grid item sm={3} xs={3}>
            <span className="font-15">Cấp ngày: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                value={employee?.dateRange || null}
                onChange={(value) => {
                  if (value) {
                    setEmployee({ ...employee, dateRange: new Date(value) });
                  }
                }}
                readOnly={readOnly}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="date"
                    fullWidth
                    className="dotted font-15"
                    format="DD/MM/YYYY"
                    variant="standard"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        {/* <Grid item sm={2} xs={2}></Grid> */}
        <Grid
          item
          sm={5}
          xs={5}
          className=" container-form"
        >
          <Grid item sm={3} xs={3} className="mr-10">
            <span className="font-15">Nơi cấp: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
          <Autocomplete
              freeSolo
              fullWidth
              value={employee?.issuedBy}
              onChange={(event, newValue) =>
                setEmployee((employee) => ({
                  ...employee,
                  issuedBy: { ...employee, newValue },
                }))
              }
              readOnly={readOnly}
              options={Provinces}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  className="dotted font-15"
                  fullWidth
                  variant="standard"
                />
              )}
            />
          </Grid>
        </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        sm={12}
        xs={12}
        className=" container-form pdl-60"
      >
        <span className="font-22 uppercase fw-600">II. Quan hệ gia đình</span>
      </Grid>
      <Grid
        item
        sm={10}
        xs={10}
        className=" container-form pdl-60 mt-20"
      >
        <table>
          <tr>
            <th>STT</th>
            <th>Họ và Tên</th>
            <th>Quan hệ</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Địa chỉ</th>
          </tr>
          {employee?.listRelationships.map((item, index) => (
            <tr key={index}>
              <td style={{width: "2%"}}>{index + 1}</td>
              <td style={{width: "20%"}}>
                <TextField
                  value={item?.name}
                  className="dotted font-15"
                  fullWidth
                  onChange={(event) => {
                    let arr = employee?.listRelationships;
                    arr[index].name = event.target.value;
                    setEmployee({ ...employee, listRelationships: arr });
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly:readOnly,
                  }}
                />
              </td>
              <td style={{width: "10%"}}>
              <Autocomplete
              freeSolo
              fullWidth
              value={item?.relationship}
              onChange={(event, newValue) =>{
                  let arr = employee?.listRelationships;
                  arr[index].relationship = newValue;
                  setEmployee({ ...employee, listRelationships: arr });
              }}
              readOnly={readOnly}
              options={Related}
              getOptionLabel={(option) => option.related}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  className="dotted font-15"
                  fullWidth
                  variant="standard"
                />
              )}
            />
              </td>
              <td style={{width: "10%"}}>
              <Autocomplete
              freeSolo
              fullWidth
              value={item?.gender}
              onChange={(event, newValue) =>{
                  let arr = employee?.listRelationships;
                  arr[index].gender = newValue;
                  setEmployee({ ...employee, listRelationships: arr });
              }}
              readOnly={readOnly}
              options={Gender}
              getOptionLabel={(option) => option.gender}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  className="dotted font-15"
                  fullWidth
                  variant="standard"
                />
              )}
            />
              </td>
              <td style={{width: "15%"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    value={item?.date || null}
                    onChange={(value) => {
                      let arr = employee?.listRelationships;
                      if (value) {
                        arr[index].date = new Date(value);
                        setEmployee({ ...employee, listRelationships: arr });
                      }
                    }}
                    readOnly={readOnly}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        type="date"
                        fullWidth
                        className="dotted font-15"
                        format="DD/MM/YYYY"
                        variant="standard"
                      />
                    )}
                  />
                </LocalizationProvider>
              </td>
              <td style={{width: "15%"}}>
              <Autocomplete
              freeSolo
              fullWidth
              value={employee?.issuedBy}
              onChange={(event, newValue) =>{
                  let arr = employee?.listRelationships;
                  arr[index].address = newValue;
                  setEmployee({ ...employee, listRelationships: arr });
              }}
              readOnly={readOnly}
              options={Provinces}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  className="dotted font-15"
                  fullWidth
                  variant="standard"
                />
              )}
            />
              </td>
            </tr>
          ))}
        </table>
      </Grid>
    </Grid>
  );
}
