import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import moment from "moment";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function EmployeeIndividualHistory(props) {
  const { employee, setEmployee } = props;
  console.log(employee);
  const [listDiploma, setListDiploma] = useState([])
  // useEffect(()=>{
  //   setListDiploma(employee.listRelationships);
  // },[])

  // useEffect(()=>{
  //   setEmployee(listDiploma);
  // },[listDiploma])
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
      <Grid container style={{ padding: "20px 0 10px" }}>
        <Grid
          item
          container
          sm={12}
          xs={12}
          style={{ paddingLeft: "60px" }}
          alignItems="center"
        >
          <span className="font-22 uppercase fw-600">I. Bản thân</span>
        </Grid>
        <Grid container item sm={8} xs={8} className="pdl-60 container-form">
          <Grid item sm={3} xs={3}>
            <span className="font-14">Họ và tên (chữ in hoa): </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.name}
              className="dotted title-1 font-14"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, name: event.target.value })
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={2}
          xs={2}
          style={{ paddingLeft: "10px", display: "flex" }}
        >
          <Grid item sm={5} xs={5}>
            <span className="font-14">Giới tính: </span>
          </Grid>
          <Grid item sm={5} xs={5}>
            <TextField
              value={employee?.gender}
              className="dotted title-1 font-14"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, gender: event.target.value })
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid item sm={2} xs={2}></Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={2} xs={2}>
            <span className="font-14">Tên thường dùng: </span>
          </Grid>
          <Grid item sm={10} xs={10}>
            <TextField
              value={employee?.name}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, name: event.target.value })
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={2} xs={2}>
            <span className="font-14">Sinh ngày: </span>
          </Grid>
          <Grid item sm={10} xs={10}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                value={employee?.birthDay || null}
                onChange={(value) => {
                  if (value) {
                    setEmployee({ ...employee, birthDay: new Date(value) });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="date"
                    fullWidth
                    className="dotted font-14"
                    format="DD/MM/YYYY"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={2} xs={2}>
            <span className="font-14">Nơi sinh: </span>
          </Grid>
          <TextField
            value={employee?.birthplace?.name}
            className="dotted font-14"
            fullWidth
            onChange={(event) =>
              setEmployee((employee) => ({
                ...employee,
                birthplace: {
                  ...employee.birthplace,
                  name: event.target.value,
                },
              }))
            }
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={2} xs={2}>
            <span className="font-14">Chỗ ở hiện nay: </span>
          </Grid>
          <Grid item sm={2} xs={2}>
            <TextField
              value={employee?.addressDetail}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, addressDetail: event.target.value })
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
          <span style={{ padding: 10 }}>-</span>
          <Grid item sm={2} xs={2}>
            <TextField
              value={employee?.commune?.name}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee((employee) => ({
                  ...employee,
                  commune: { ...employee.commune, name: event.target.value },
                }))
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
          <span style={{ padding: 10 }}>-</span>
          <Grid item sm={3} xs={3}>
            <TextField
              value={employee?.district?.name}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee((employee) => ({
                  ...employee,
                  district: { ...employee.district, name: event.target.value },
                }))
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
          <span style={{ padding: 10 }}>-</span>
          <Grid item sm={3} xs={3}>
            <TextField
              value={employee?.province?.name}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee((employee) => ({
                  ...employee,
                  province: { ...employee.province, name: event.target.value },
                }))
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={5}
          xs={5}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={3} xs={3}>
            <span className="font-14">Điện thoại: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.phone}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, phone: event.target.value })
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          sm={5}
          xs={5}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
          justifyContent="space-around"
        >
          <Grid item sm={2} xs={2}>
            <span className="font-14">Email: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.email}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, email: event.target.value })
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid item sm={2} xs={2}></Grid>
        <Grid
          item
          sm={5}
          xs={5}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={2} xs={2}>
            <span className="font-14">Dân tộc: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.ethnic}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, ethnic: event.target.value })
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={5}
          xs={5}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={3} xs={3}>
            <span className="font-14">Tôn giáo: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.religion}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, religion: event.target.value })
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid item sm={2} xs={2}></Grid>
        <Grid
          item
          sm={5}
          xs={5}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={3} xs={3}>
            <span className="font-14">Số CCCD: </span>
          </Grid>
          <Grid item sm={9} xs={9}>
            <TextField
              value={employee?.identification}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, identification: event.target.value })
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={5}
          xs={5}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={3} xs={3}>
            <span className="font-14">Cấp ngày: </span>
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="date"
                    fullWidth
                    className="dotted font-14"
                    format="DD/MM/YYYY"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid item sm={2} xs={2}></Grid>
        <Grid
          item
          sm={10}
          xs={10}
          className="pdl-60 container-form"
          style={{ marginTop: 20 }}
        >
          <Grid item sm={1} xs={1}>
            <span className="font-14">Nơi cấp: </span>
          </Grid>
          <Grid item sm={11} xs={11}>
            <TextField
              value={employee?.issuedBy?.name}
              className="dotted font-14"
              fullWidth
              onChange={(event) =>
                setEmployee((employee) => ({
                  ...employee,
                  issuedBy: { ...employee.issuedBy, name: event.target.value },
                }))
              }
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        sm={12}
        xs={12}
        style={{ paddingLeft: "60px" }}
        alignItems="center"
      >
        <span className="font-22 uppercase fw-600">II. Quan hệ gia đình</span>
      </Grid>
      <Grid
        item
        sm={10}
        xs={10}
        className="pdl-60 container-form"
        style={{ marginTop: 20 }}
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
              <td>{index + 1}</td>
              <td>
                <TextField
                  value={item?.name}
                  className="dotted font-14"
                  fullWidth
                  onChange={(event)=> {
                    let arr = employee?.listRelationships;
                    arr[index].name = event.target.value;
                    setEmployee({...employee, listRelationships: arr})
                  }}
                  
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </td>
              <td>
                <TextField
                  value={item?.relationship}
                  className="dotted font-14"
                  fullWidth
                  onChange={(event)=> {
                    let arr = employee?.listRelationships;
                    arr[index].relationship = event.target.value;
                    setEmployee({...employee, listRelationships: arr})
                  }}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </td>
              <td>
                <TextField
                  value={item?.gender}
                  className="dotted font-14"
                  fullWidth
                  onChange={(event)=> {
                    let arr = employee?.listRelationships;
                    arr[index].gender = event.target.value;
                    setEmployee({...employee, listRelationships: arr})
                  }}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </td>
              <td>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                value={item?.date || null}
                onChange={(value)=> {
                  let arr = employee?.listRelationships;
                  if(value) {
                    arr[index].date = new Date(value);
                    setEmployee({...employee, listRelationships: arr})
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="date"
                    fullWidth
                    className="dotted font-14"
                    format="DD/MM/YYYY"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
              </td>
              <td>
                <TextField
                  value={item?.address}
                  className="dotted font-14"
                  fullWidth
                  onChange={(event)=> {
                    let arr = employee?.listRelationships;
                    arr[index].address = event.target.value;
                    setEmployee({...employee, listRelationships: arr})
                  }}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </td>
            </tr>
          ))}
        </table>
      </Grid>
    </Grid>
  );
}
