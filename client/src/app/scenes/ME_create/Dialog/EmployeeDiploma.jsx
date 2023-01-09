import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DialogDiplomaForm from "./DialogDiplomaForm";
import DialogEditDiploma from "./DialogEditDiploma";

export default function EmployeeDiploma(props) {
  const { employee, setEmployee } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = React.useState(5);
  const [shouldOpenDialogForm, setShouldOpenDialogForm] = React.useState(false);
  const [shouldOpenEditDialogDiploma, setShouldOpenOpenEditDialogDiploma] =
    React.useState(false);
  const [item, setItem] = React.useState({});

  const columns = [
    {
      field: "Thao tác",
      title: "actions",
      renderCell: ({ row }) => (
        <>
          <IconButton
            color="success"
            onClick={() => {
              setShouldOpenOpenEditDialogDiploma(true);
              setItem(row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="success"
            onClick={() => {
              setShouldOpenDialogForm(true);
              setItem(row);
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "name",
      headerName: "Tên chứng chỉ",
      flex: 1,
      renderCell: ({ row }) => row?.name,
    },
    {
      field: "field",
      headerName: "Lĩnh vực",
      renderCell: ({ row }) => row?.field?.field,
    },
    {
      field: "date",
      headerName: "Ngày cấp",
      renderCell: ({ row }) => moment(row?.date).format("DD/MM/YYYY"),
    },
    {
      field: "place",
      headerName: "Nơi cấp",
      renderCell: ({ row }) => row?.place?.name,
    },
    {
      field: "content",
      headerName: "Nội dung chứng chỉ",
      flex: 1,
      renderCell: ({ row }) => row?.content,
    },
  ];

  const handleClose = () => {
    setShouldOpenDialogForm(false);
    setShouldOpenOpenEditDialogDiploma(false);
    setItem({});
  };

  return (
    <Box
      height="65vh"
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
          color: "#fbfbfb",
          backgroundColor: "#0D4C92",
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: colors.primary[400],
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          color: "#fbfbfb",
          backgroundColor: "#0D4C92",
        },
        '& .MuiDataGrid-footerContainer > .MuiTablePagination-root': {
          color: "#fbfbfb",
        },
        '& .MuiDataGrid-footerContainer .MuiSvgIcon-root': {
          color: "#fbfbfb",
        },
        '& .MuiDataGrid-footerContainer .Mui-disabled .MuiSvgIcon-root': {
          color: "rgba(251,251,251,.5)",
        },
        '& .MuiCheckbox-root': {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
          outline: "none !important",
        },
        "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
          {
            outline: "none !important",
          },
      }}
    >
      <DataGrid
        rows={employee?.listDiplomas}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
      />
      {shouldOpenDialogForm && (
        <DialogDiplomaForm
          open={shouldOpenDialogForm}
          handleClose={handleClose}
        />
      )}
      {shouldOpenEditDialogDiploma && (
        <DialogEditDiploma
          open={shouldOpenEditDialogDiploma}
          handleCloseDialog={handleClose}
          item={item}
        />
      )}
    </Box>
  );
}
