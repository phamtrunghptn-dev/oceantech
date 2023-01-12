import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataChecked } from "../../data/mockData";
import moment from "moment";
import ArchiveIcon from '@mui/icons-material/Archive';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from '@mui/material/Tooltip';
import {getListDataEmployees, editEmployee} from "./ME_removeService/ME_removeService"
import DialogDeposit from "./Dialog/DialogDeposit";
import { toast } from "react-toastify";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[300]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function EmployeeManageRemove() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = React.useState(5);
  const [shouldOpenDialog, setShouldOpenDialog] = React.useState(false);
  const [item, setItem] = React.useState({});
  const [listEmployee, setListEmployee] = React.useState([]);

  const columns = [
    {
      field: "action",
      headerName: "Thao tác",
      renderCell: ({ row }) => (
        <Tooltip title="Nộp lưu hồ sơ">
        <IconButton color="success" onClick={()=>{
              setShouldOpenDialog(true)
              setItem(row)
        }}
        disabled={row.status === "Đã nộp lưu"}
        >
          <ArchiveIcon />
        </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "code",
      headerName: "Mã nhân viên",
      renderCell: ({ row }) => row?.code,
    },
    {
      field: "name",
      headerName: "Họ và Tên",
      flex: 1,
      renderCell: ({ row }) => row?.name,
    },
    {
      field: "birthDay",
      headerName: "Ngày sinh",
      type: "date",
      headerAlign: "left",
      align: "left",
      renderCell: ({ row }) => moment(row?.birthDay).format("DD/MM/YYYY"),
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      renderCell: ({ row }) => row?.phone,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: ({ row }) => row?.email,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: ({ row }) => {
        return row?.status;
      },
    },
  ];

  useEffect(() => {
    updatePageData();
  }, []);

  useEffect(() => {
    if(item.status === "Đã nộp lưu"){
        editEmployee(item)
        .then(res => {
            toast.success("Đã nộp lưu hồ sơ thành công")
            setShouldOpenDialog(false)
            updatePageData()
        })
        .catch(err=> toast.error("Có lỗi"))
    }
  },[item.status])

  const updatePageData = () => {
    getListDataEmployees().then((res) => {
      setListEmployee(res.data.filter((item) => item.status === "Kết thúc" || item.status === "Đã nộp lưu"));
    });
  };

  return (
    <Box m="20px">
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb" marginBottom="20px">
          <StyledBreadcrumb
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          ></StyledBreadcrumb>
          <StyledBreadcrumb component="a" href="/" label="Quản lý" />
          <StyledBreadcrumb
            component="a"
            href="/manage_employee_remove"
            label="Danh sách nghỉ việc"
          />
        </Breadcrumbs>
      </div>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              color: '#fbfbfb',
              backgroundColor: '#0D4C92',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              color: '#fbfbfb',
              backgroundColor: '#0D4C92',
            },
            '& .MuiDataGrid-footerContainer > .MuiTablePagination-root': {
              color: '#fbfbfb',
            },
            '& .MuiDataGrid-footerContainer .MuiSvgIcon-root': {
              color: '#fbfbfb',
            },
            '& .MuiDataGrid-footerContainer .Mui-disabled .MuiSvgIcon-root': {
              color: 'rgba(251,251,251,.5)',
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
            '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
              outline: 'none !important',
            },
            '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
              outline: 'none !important',
            },
          }}
      >
        <DataGrid
          rows={listEmployee}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
      {shouldOpenDialog && (
        <DialogDeposit
        open={shouldOpenDialog}
        onYesOnclick = {(values)=> {
            setItem({...item, status: "Đã nộp lưu", deposit: values})
        }}
        item={item}
        handleCloseDialog={()=> setShouldOpenDialog(false)}
        />
      )}
    </Box>
  );
}
