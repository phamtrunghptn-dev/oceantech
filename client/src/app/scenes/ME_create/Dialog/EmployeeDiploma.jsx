import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme, IconButton  } from '@mui/material';
import { tokens } from '../../../theme';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


export default function EmployeeDiploma(props) {
    const { employee, setEmployee } = props;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [pageSize, setPageSize] = React.useState(5);

    const columns = [
        { field: "Thao tác", 
        title: "actions", 
        renderCell: ({row}) => ( 
            <IconButton 
            color="success" 
            onClick={()=>{
                alert("Mo form mau")
            }}
            >
              <RemoveRedEyeIcon />
            </IconButton>) 
        },
        { field: 'name', 
        headerName: 'Tên chứng chỉ',
        flex: 1,
        renderCell:({row}) => row?.name
        },
        { field: 'field', 
        headerName: 'Lĩnh vực',
        renderCell:({row}) => row?.field
        },
        { field: 'date', 
        headerName: 'Ngày cấp',
        renderCell:({row}) => row?.date
        },
        { field: 'place', 
        headerName: 'Nơi cấp',
        renderCell:({row}) => row?.place
        },
        { field: 'content', 
        headerName: 'Nội dung',
        flex: 1,
        renderCell:({row}) => row?.content
        },
    ]
  return (
    <Box
        height="70vh"
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
        <DataGrid rows={employee?.listDiplomas} columns={columns} pageSize={pageSize} onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} rowsPerPageOptions={[5, 10, 20]} />
      </Box>
  )
}
