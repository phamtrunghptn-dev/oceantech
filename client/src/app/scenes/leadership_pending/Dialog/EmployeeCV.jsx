import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "./Dialog.scss";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import CakeIcon from "@mui/icons-material/Cake";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import moment from "moment";
import { TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function EmployeeCV(props) {
  const { employee, setEmployee } = props;
  return (
    <Grid container spacing={2}>
      <Grid container style={{ height: "40px" }}>
        <Grid item sm={8} xs={8} className="backgroundColor1"></Grid>
        <Grid item sm={2} xs={2}>
          <span className="title">Developer</span>
        </Grid>
        <Grid item sm={2} xs={2} style={{ backgroundColor: "#02a18b" }}></Grid>
      </Grid>
      <Grid container style={{ margin: "20px 0 10px 40px" }}>
        <Grid item sm={6} xs={6}>
          <span className="name">{employee.name}</span>
        </Grid>
      </Grid>
      <Grid container style={{ margin: "0 0 10px 40px" }}>
        <Grid item container sm={6} xs={6}>
          <Grid item container sm={12} xs={12}>
            <Grid item sm={1} xs={1}>
              {employee.gender === "Nam" ? (
                <MaleIcon className="icon" />
              ) : (
                <FemaleIcon className="icon" />
              )}
            </Grid>
            <Grid item sm={9} xs={9}>
              <span className="font-16">
                Giới tính: {employee.gender}
              </span>
            </Grid>
          </Grid>
          <Grid item container sm={12} xs={12}>
            <Grid item sm={1} xs={1}>
              <CakeIcon className="icon" />
            </Grid>
            <Grid item sm={9} xs={9}>
              <span className="font-16">
                Ngày sinh:{" "}
                {moment(employee.birthDay).format("DD-MM-YYYY")}
              </span>
            </Grid>
          </Grid>
          <Grid item container sm={12} xs={12}>
            <Grid item sm={1} xs={1}>
              <PhoneIcon className="icon" />
            </Grid>
            <Grid item sm={9} xs={9}>
              <span className="font-16">
                Số điện thoại: {employee.phone}
              </span>
            </Grid>
          </Grid>
          <Grid item container sm={12} xs={12}>
            <Grid item sm={1} xs={1}>
              <LocationOnIcon className="icon" />
            </Grid>
            <Grid item sm={9} xs={9}>
              <span className="font-16">
                Địa chỉ:{" "}
                {`${employee.district.name} - ${employee.province.name}`}
              </span>
            </Grid>
          </Grid>
          <Grid item container sm={12} xs={12}>
            <Grid item sm={1} xs={1}>
              <EmailIcon className="icon" />
            </Grid>
            <Grid item sm={9} xs={9}>
              <span className="font-16">
                Email: {employee.email}
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container sm={6} xs={6} justifyContent="center">
          <img
            src={employee.image}
            style={{ height: "100%", width: "30%", border: "1px solid #999" }}
            alt=""
          />
        </Grid>
      </Grid>
      <Grid container style={{ margin: "10px 0 10px 40px" }}>
        <Grid item sm={6} xs={6}>
          <span className="title-1 color-1">Mục tiêu nghề nghiệp</span>
        </Grid>
        <Grid item sm={8} xs={8}>
          <TextField
            value={employee?.employeeCV?.careerGoals || ""}
            className="dotted"
            multiline
            fullWidth
            onChange={(event)=> setEmployee(employee => ({
              ...employee,
              employeeCV: {...employee.employeeCV, careerGoals: event.target.value} 
            }))}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container style={{ margin: "10px 0 10px 40px" }}>
        <Grid item sm={6} xs={6}>
          <span className="title-1 color-1">Học vấn</span>
        </Grid>
        <Grid item sm={6} xs={6}></Grid>
        <Grid item sm={6} xs={6}>
          <TextField 
          className="title-2" 
          fullWidth 
          placeholder="Trường"
          value={employee?.employeeCV?.school?.name}
          onChange={(event)=> setEmployee(employee => ({
            ...employee,
            employeeCV: {...employee.employeeCV, school: {...employee.employeeCV.school, name: event.target.value}}} 
          ))}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          />
        </Grid>
        <Grid item sm={2} xs={2}></Grid>
        <Grid container item sm={4} xs={4} justifyContent="space-between" alignItems="center" className="pdl-20" >
          <Grid item  sm={5} xs={5}> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label= "Ngày bắt đầu"
                  inputFormat="DD/MM/YYYY"
                  value={employee?.employeeCV?.school?.timeStart || null}
                  onChange={(value)=>{
                    if(value){
                      setEmployee(employee => ({
                        ...employee,
                        employeeCV: {...employee.employeeCV, school: {...employee.employeeCV.school, timeStart: new Date(value)}}} 
                      ))
                    }
                  }}
                  renderInput={(params) => 
                  <TextField 
                  {...params}  
                  type="date"
                  size="small" 
                  className="color-1" />}
                  format="DD/MM/YYYY" 
                />
              </LocalizationProvider>
          </Grid>
          <Grid item  sm={2} xs={2} style={{textAlign: 'center'}}>-</Grid>
          <Grid item  sm={5} xs={5}> 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label= "Ngày kết thúc"
                  inputFormat="DD/MM/YYYY"
                  value={employee?.employeeCV?.school?.timeEnd || null}
                  onChange={(value)=>{
                    if(value){
                      setEmployee(employee => ({
                        ...employee,
                        employeeCV: {...employee.employeeCV, school: {...employee.employeeCV.school, timeEnd: new Date(value)}}} 
                      ))
                    }
                  }}
                  renderInput={(params) => 
                  <TextField 
                  {...params}  
                  type="date"
                  size="small" 
                  className="color-1" />}
                  format="DD/MM/YYYY" 
                />
              </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid item sm={8} xs={8}>
          <TextField
            value={employee?.employeeCV?.school?.content}
            className="dotted"
            placeholder="Bằng cấp/ Loại tốt nghiệp/ Số điểm GPA"
            multiline
            fullWidth
            onChange={(event)=> setEmployee(employee => ({
              ...employee,
              employeeCV: {...employee.employeeCV, school: {...employee.employeeCV.school, content: event.target.value}}} 
            ))}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container style={{ margin: "10px 0 10px 40px" }}>
        <Grid item sm={6} xs={6}>
          <span className="title-1 color-1">Kinh nghiệm làm việc</span>
        </Grid>
        <Grid item sm={6} xs={6}></Grid>
        <Grid item sm={6} xs={6}>
        <Grid item sm={12} xs={12}>
          <TextField 
          className="title-2" 
          fullWidth 
          placeholder="Công ty"
          value={employee?.employeeCV?.experience?.company}
          onChange={(event)=> setEmployee(employee => ({
            ...employee,
            employeeCV: {...employee.employeeCV, experience: {...employee.employeeCV.experience, company: event.target.value}}} 
          ))}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          />
        </Grid>
        </Grid>
        <Grid container item sm={2} xs={2}></Grid>
        <Grid container item sm={4} xs={4} className="pdl-20" alignItems="center" justifyContent="space-between">
        <Grid item  sm={5} xs={5}> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label= "Ngày bắt đầu"
                  inputFormat="DD/MM/YYYY"
                  value={employee?.employeeCV?.experience?.timeStart || null}
                  onChange={(value)=>{
                    if(value){
                      setEmployee(employee => ({
                        ...employee,
                        employeeCV: {...employee.employeeCV, experience: {...employee.employeeCV.experience, timeStart: new Date(value)}}} 
                      ))
                    }
                  }}
                  renderInput={(params) => 
                  <TextField 
                  {...params}  
                  type="date"
                  size="small" 
                  className="color-1" />}
                  format="DD/MM/YYYY" 
                />
              </LocalizationProvider>
          </Grid>
          <Grid item  sm={2} xs={2} style={{textAlign: 'center'}}>-</Grid>
          <Grid item  sm={5} xs={5}> 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label= "Ngày kết thúc"
                  inputFormat="DD/MM/YYYY"
                  value={employee?.employeeCV?.experience?.timeEnd || null}
                  onChange={(value)=>{
                    if(value){
                      setEmployee(employee => ({
                        ...employee,
                        employeeCV: {...employee.employeeCV, experience: {...employee.employeeCV.experience, timeEnd: new Date(value)}}} 
                      ))
                    }
                  }}
                  renderInput={(params) => 
                  <TextField 
                  {...params}  
                  type="date"
                  size="small" 
                  className="color-1" />}
                  format="DD/MM/YYYY" 
                />
              </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container item sm={8} xs={8}>
          <span className="font-16">Mô tả công việc</span>
        </Grid>
        <Grid container item sm={4} xs={4} justifyContent="center">
          <TextField
            value={employee?.employeeCV?.experience?.position}
            className="dotted title-1 color-1 font-16 pdl-20"
            placeholder="Vị trí làm việc"
            fullWidth
            onChange={(event)=> setEmployee(employee => ({
              ...employee,
              employeeCV: {...employee.employeeCV, experience: {...employee.employeeCV.experience, position: event.target.value}}} 
            ))}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item sm={6} xs={6}>
          <TextField
            value={employee?.employeeCV?.experience?.project?.name}
            className="dotted title-1 color-1 font-16"
            placeholder="Dự án"
            fullWidth
            onChange={(event)=> setEmployee(employee => ({
              ...employee,
              employeeCV: {...employee.employeeCV, experience: {...employee.employeeCV.experience, project: {...employee.employeeCV.experience.project, name: event.target.value}}}} 
            ))}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item sm={8} xs={8}>
          <TextField
            value={employee?.employeeCV?.experience?.project?.content}
            className="dotted"
            multiline
            fullWidth
            onChange={(event)=> setEmployee(employee => ({
              ...employee,
              employeeCV: {...employee.employeeCV, experience: {...employee.employeeCV.experience, project: {...employee.employeeCV.experience.project, content: event.target.value}}}} 
            ))}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container style={{ margin: "10px 0 40px 40px" }}>
        <Grid item sm={5} xs={5}>
          <span className="title-1 color-1">Kỹ năng</span>
        </Grid>
        <Grid item sm={2} xs={2}></Grid>
        <Grid item sm={5} xs={5}>
          <span className="title-1 color-1">Sở thích</span>
        </Grid>
        <Grid item sm={5} xs={5}>
        <TextField
            value={employee?.employeeCV?.hobby}
            className="dotted"
            multiline
            fullWidth
            onChange={(event)=> setEmployee(employee => ({
              ...employee,
              employeeCV: {...employee.employeeCV, hobby: event.target.value} 
            }))}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item sm={2} xs={2}></Grid>
        <Grid item sm={5} xs={5}>
        <TextField
            value={employee?.employeeCV?.skills}
            className="dotted"
            multiline
            fullWidth
            onChange={(event)=> setEmployee(employee => ({
              ...employee,
              employeeCV: {...employee.employeeCV, skills: event.target.value} 
            }))}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container style={{ height: "40px" }}>
        <Grid item sm={12} xs={12} className="backgroundColor1"></Grid>
      </Grid>
    </Grid>
  );
}
