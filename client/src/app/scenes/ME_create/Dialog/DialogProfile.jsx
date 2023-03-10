import React, { useEffect, useState, useRef  } from "react";
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
import { toast } from "react-toastify";
import "./Dialog.scss";
import {
  editEmployee,
  addEmployee,
} from "../EmployeeManagerService/EmployeeManageService";
import { v4 as uuidv4 } from "uuid";
import DialogRequest from "./DialogRequest";

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
  const { open, handleClose, handleCloseDialog, item, setItem, readOnly } =
    props;
    const [value, setValue] = React.useState(0);
    const [shouldOpenDialogBrowser, setshouldOpenDialogBrowser] = useState(false);
    const firstRender = useRef(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    if(firstRender.current) {
      if (item?.id) {
        if (item?.status === "Ch??? duy???t") {
          if(item?.userRequest){
            editEmployee(item).then((res) => {
              toast.success("G???i l??nh ?????o th??nh c??ng");
              handleClose();
            });
          } else {
            toast.warning("Vui l??ng nh???p ????? tr?????ng");
          }
        } else if (item?.status === "Ch??? n???p h??? s??") {
          editEmployee(item).then((res) => {
            toast.success("H??? s?? ??ang ??? tr???ng th??i ch??? n???p h??? s??");
            handleClose();
          });
        } else if (item.status === "Ch??? duy???t") {
          editEmployee(item).then((res) => {
            toast.success("G???i l??nh ?????o th??nh c??ng");
            handleClose();
          });
        }
      } else {
        if (item.status === "Ch??? n???p h??? s??") {
          let obj = item;
          obj.id = uuidv4()
          addEmployee(obj).then((res) => {
            toast.success("L??u h??? s?? ??? tr???ng th??i ch??? duy???t");
            handleClose();
          });
        } else if (item.status === "Ch??? duy???t") {
          let obj = item;
          obj.id = uuidv4()
            addEmployee(obj).then((res) => {
              toast.success("G???i l??nh ?????o th??nh c??ng");
              handleClose();
            });
        }
      }
    } else {
      firstRender.current = true
    }
   
  }, [item]);
  return (
    <>
      <Dialog open={open} maxWidth="lg" fullWidth>
        <DialogTitle>
          <span style={{ fontSize: "30px" }}>H??? s?? ???ng vi??n</span>
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
              <Tab label="H??? s?? ???ng vi??n" {...a11yProps(0)} />
              <Tab label="S?? y???u l?? l???ch" {...a11yProps(1)} />
              <Tab label="B???ng c???p" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0} style={{ width: "87%" }}>
              <EmployeeCV
                employee={item}
                setEmployee={setItem}
                readOnly={readOnly}
              />
            </TabPanel>
            <TabPanel value={value} index={1} style={{ width: "87%" }}>
              <EmployeeIndividualHistory
                employee={item}
                setEmployee={setItem}
                readOnly={readOnly}
              />
            </TabPanel>
            <TabPanel value={value} index={2} style={{ width: "87%" }}>
              <EmployeeDiploma
                employee={item}
                setEmployee={setItem}
                readOnly={readOnly}
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

          {readOnly ? (
            <Button onClick={handleCloseDialog} className="button-cancel mr-10">
              ????ng
            </Button>
          ) : (
            <div>
              <Button
                onClick={() => setItem({ ...item, status: "Ch??? n???p h??? s??" })}
                className="button-confirm1 mr-10"
              >
                L??u
              </Button>
              <Button
                onClick={() => {setshouldOpenDialogBrowser(true)}}
                className="button-confirm1 mr-10"
              >
                G???i l??nh ?????o
              </Button>
              <Button
                onClick={handleCloseDialog}
                className="button-cancel mr-10"
              >
                H???y
              </Button>
            </div>
          )}
        </DialogActions>
      </Dialog>
      {shouldOpenDialogBrowser && (
        <DialogRequest
          open={shouldOpenDialogBrowser}
          item={item?.userRequest}
          onYesClick={(value) =>
            {
              setItem({ ...item, status: "Ch??? duy???t",request: "" , userRequest: value});
            }
          }
          setItem={setItem}
          onConfirmDialogClose={() => setshouldOpenDialogBrowser(false)}
        />
      )}
    </>
  );
}
