import React, {useState} from 'react';
import Header from '../../components/Header';
import { Box, useTheme, IconButton  } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataTeam } from '../../data/mockData';
import moment from "moment";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DialogProfile from './Dialog/DialogProfile';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[300]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const LeadershipPending = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [shouldOpenProfile, setShouldOpenProfile] = useState(false);
  const [employee, setEmployee] = useState({});
  const [pageSize, setPageSize] = React.useState(5);

  const columns = [
    { field: 'action', headerName: 'Thao tác', renderCell: ({row}) => (
      <IconButton 
      color="success" 
      onClick={()=>{
        setEmployee(row)
        setShouldOpenProfile(true)}
      } 
      >
        <RemoveRedEyeIcon />
      </IconButton>
    ) },
    { field: 'code', headerName: 'Mã nhân viên', renderCell:({row}) => row?.code},
    {
      field: 'name',
      headerName: 'Họ và Tên',
      flex: 1,
      renderCell:({row}) => row?.name
    },
    {
      field: 'birthDay',
      headerName: 'Ngày sinh',
      type: 'date',
      headerAlign: 'left',
      align: 'left',
      renderCell:({row}) => moment(row?.birthDay).format("DD/MM/YYYY")
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
      renderCell:({row}) => row?.phone
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      renderCell:({row}) => row?.email
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: ({ row }) => {
        return ( row?.status )
      },
    },
  ];
  const handleClose = () => {
    setShouldOpenProfile(false)
  }
  return (
    <Box m="20px">
      <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" marginBottom="20px">
        <StyledBreadcrumb
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        >
        </StyledBreadcrumb>
        <StyledBreadcrumb component="a" href="/" label="Lãnh đạo" />
        <StyledBreadcrumb component="a" href="/manage-employee-create" label="Danh sách chờ duyệt" />
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
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={mockDataTeam} columns={columns} pageSize={pageSize} onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} rowsPerPageOptions={[5, 10, 20]} />
      </Box>
      {shouldOpenProfile && (
        <DialogProfile 
        open={shouldOpenProfile}
        handleClose={handleClose}
        employee={employee}
        />
      )}
    </Box>
  )
}

export default LeadershipPending
