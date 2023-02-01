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
import DialogAdditionalRequest from "./DialogAdditionalRequest";
import DialogRefuse from "./DialogRefuse";
import ConfirmationDialog from "app/components/ConfirmationDialog";
import { toast } from 'react-toastify';
import "./Dialog.scss";
import {editEmployee} from "../LeadershipPendingService/LeadershipPendingService";

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
  const { open, handleClose, employee } = props;

  const [value, setValue] = React.useState(0);
  const [employeeProfile, setEmployeeProfile] = React.useState({});
  const [shouldOpenDialogAdditionalRequest, setShouldOpenDialogAdditionalRequest] = useState(false);
  const [shouldOpenDialogRefuse, setShouldOpenDialogRefuse] = useState(false);
  const [shouldOpenDialogBrowser, setshouldOpenDialogBrowser] = useState(false);

  useEffect(() => {
    setEmployeeProfile(employee);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleApproved = () => {
    setEmployeeProfile({...employee, status: "Đã duyệt"})
  }

  useEffect(()=>{
    if(employeeProfile.status === "Đã duyệt"){
      editEmployee(employeeProfile)
      .then(res=> {
        toast.success("Duyệt nhân viên thành công")
        handleClose()
      })
    } else if(employeeProfile.status === "Yêu cầu bổ sung"){
      editEmployee(employeeProfile)
      .then(res=> {
        toast.success("Gửi yêu cầu thành công")
        handleClose()
      })
    } else if(employeeProfile.status === "Từ chối"){
      editEmployee(employeeProfile)
      .then(res=> {
        toast.success("Bạn đã từ chối hồ sơ này")
        handleClose()
      })
    }
  },[employeeProfile])
  return (
    <>
      <Dialog open={open} maxWidth="lg" fullWidth>
        <DialogTitle>
          <span style={{ fontSize: "30px" }}>Hồ sơ ứng viên</span>
          <Box className="icon-close" onClick={handleClose}>
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
                employee={employeeProfile}
                setEmployee={setEmployeeProfile}
              />
            </TabPanel>
            <TabPanel value={value} index={1} style={{width: "87%"}}>
              <EmployeeIndividualHistory
                employee={employeeProfile}
                setEmployee={setEmployeeProfile}
              />
            </TabPanel>
            <TabPanel value={value} index={2} style={{width: "87%"}}>
              <EmployeeDiploma
                employee={employeeProfile}
                setEmployee={setEmployeeProfile}
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
          <Button onClick={()=>setshouldOpenDialogBrowser(true)} className="button-confirm1 mr-10">
          Phê duyệt
            </Button>
            <Button onClick={()=>setShouldOpenDialogAdditionalRequest(true)} className="button-confirm1 mr-10">
              Yêu cầu bổ sung
            </Button>
            <Button onClick={()=>setShouldOpenDialogRefuse(true)} variant="outlined" className="button-cancel1 mr-10">
              Từ chối
            </Button>
            <Button onClick={handleClose}  className="button-cancel mr-10">
              Hủy
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      {shouldOpenDialogAdditionalRequest && (
        <DialogAdditionalRequest 
          open={shouldOpenDialogAdditionalRequest}
          handleCloseDialog={()=>setShouldOpenDialogAdditionalRequest(false)}
          employee={employeeProfile}
          setEmployee={setEmployeeProfile}
        />
      )}
      {shouldOpenDialogRefuse && (
        <DialogRefuse
          open={shouldOpenDialogRefuse}
          handleCloseDialog={()=>setShouldOpenDialogRefuse(false)}
          handleClose={handleClose}
          employee={employeeProfile}
          setEmployee={setEmployeeProfile}
        />
      )}
      {shouldOpenDialogBrowser &&(
        <ConfirmationDialog 
        title="Xác nhận"
        text="Bạn có muốn duyệt hồ sơ nhân viên này"
        open={shouldOpenDialogBrowser}
        onYesClick={handleApproved}
        onConfirmDialogClose={()=>setshouldOpenDialogBrowser(false)}
        />
      )}
    </>
  );
}
