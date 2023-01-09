import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EmployeeCV from "./EmployeeCV";
import EmployeeIndividualHistory from "./EmployeeIndividualHistory";
import EmployeeDiploma from "./EmployeeDiploma";
import ConfirmationDialog from "app/components/ConfirmationDialog";
import { toast } from 'react-toastify';
import "./Dialog.scss";
import {editEmployee, addEmployee} from "../EmployeeManagerService/EmployeeManageService";
import { v4 as uuidv4 } from 'uuid'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: "10px" }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function DialogProfile(props) {
  const { open, handleClose, handleCloseDialog, item, setItem } = props;
console.log(item);
  const [value, setValue] = React.useState(0);
  const [shouldOpenDialogBrowser, setshouldOpenDialogBrowser] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    if(item.id){
      if(item.status === "Chờ nộp hồ sơ"){
        editEmployee(item)
        .then(res=> {
          toast.success("Sửa hồ sơ ở trạng thái chờ duyệt")
          handleClose()
        })
      } else if(item.status === "Chờ duyệt"){
        editEmployee(item)
        .then(res=> {
          toast.success("Gửi lãnh đạo thành công")
          handleClose()
        })
      }
    } else{
      if(item.status === "Chờ nộp hồ sơ"){
        setItem({...item, id: uuidv4()})
        addEmployee(item)
        .then(res=> {
          toast.success("Lưu hồ sơ ở trạng thái chờ duyệt")
          handleClose()
        })
      } else if(item.status === "Chờ duyệt"){
        setItem({...item, id: uuidv4()})
        addEmployee(item)
        .then(res=> {
          toast.success("Gửi lãnh đạo thành công")
          handleClose()
        })
      }
    }
   
  },[item])
  return (
    <>
      <Dialog open={open} maxWidth="lg" fullWidth>
        <DialogTitle>
          <span style={{ fontSize: "30px" }}>Hồ sơ ứng viên</span>
          <Box className="icon-close" onClick={handleCloseDialog}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent style={{ padding: 0 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              height: "100%",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              textColor="primary"
              indicatorColor="primary"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Hồ sơ ứng viên" {...a11yProps(0)} />
              <Tab label="Sơ yếu lý lịch" {...a11yProps(1)} />
              <Tab label="Bằng cấp" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0} style={{width: "87%"}}>
              <EmployeeCV
                employee={item}
                setEmployee={setItem}
              />
            </TabPanel>
            <TabPanel value={value} index={1} style={{width: "87%"}}>
              <EmployeeIndividualHistory
                employee={item}
                setEmployee={setItem}
              />
            </TabPanel>
            <TabPanel value={value} index={2} style={{width: "87%"}}>
              <EmployeeDiploma
                employee={item}
                setEmployee={setItem}
              />
            </TabPanel>
          </Box>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <div>
            <IconButton
              disabled={value === 0}
              size="large"
              className="mr-10"
              onClick={() => setValue(value - 1)}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              disabled={value === 2}
              size="large"
              onClick={() => setValue(value + 1)}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>

          <div>
          <Button onClick={()=>setItem({...item, status: "Chờ nộp hồ sơ"})} className="button-confirm1 mr-10">
              Lưu
            </Button>
            <Button onClick={()=>setshouldOpenDialogBrowser(true)} className="button-confirm1 mr-10">
              Gửi lãnh đạo
            </Button>
            <Button onClick={handleCloseDialog}  className="button-cancel mr-10">
              Hủy
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      {shouldOpenDialogBrowser &&(
        <ConfirmationDialog 
        title="Xác nhận"
        text="Bạn có muốn trình hồ sơ nhân viên này lên lãnh đạo"
        open={shouldOpenDialogBrowser}
        onYesClick={()=>setItem({...item, status: "Chờ duyệt"})}
        onConfirmDialogClose={()=>setshouldOpenDialogBrowser(false)}
        />
      )}
    </>
  );
}
