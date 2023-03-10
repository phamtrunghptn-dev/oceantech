import React, { useState, useEffect } from 'react'
import { Box, useTheme, IconButton, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { emphasize, styled } from '@mui/material/styles'
import { tokens } from '../../theme'
import { mockDataCreate } from '../../data/mockData'
import moment from 'moment'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Chip from '@mui/material/Chip'
import HomeIcon from '@mui/icons-material/Home'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ConfirmationDialog from 'app/components/ConfirmationDialog'
import DiaLogCreateNew from './Dialog/DialogCreateNew'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
//
import {
  getListDataEmployees,
  deleteEmployee,
} from './EmployeeManagerService/EmployeeManageService'
import DialogProfile from './Dialog/DialogProfile'
import DialogAdditionalRequest from './Dialog/DialogAdditionalRequest'
import DialogRefuse from "./Dialog/DialogRefuse";
import ErrorIcon from '@mui/icons-material/Error';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[300]
      : theme.palette.grey[800]
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
  }
})

export default function EmployeeManageCreate() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [employee, setEmployee] = useState({
    code: '',
    name: '',
    gender: null,
    ethnic: '',
    religion: '',
    image: '',
    email: '',
    phone: '',
    birthDay: '',
    birthplace: null,
    position: null,
    team: null,
    salary: '',
    identification: '',
    issuedBy: null,
    dateRange: '',
    province: null,
    district: null,
    commune: null,
    addressDetail: '',
    listDiplomas: [],
    listRelationships: [],
  })

  const [listDataEmployees, setListDataEmployees] = useState([])
  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false)
  const [shouldOpenEditDialog, setShouldOpenEditDialog] = useState(false)
  const [shouldOpenViewDialog, setShouldOpenViewDialog] = useState(false)
  const [shouldOpenviewRequestDialog, setShouldOpenviewRequestDialog] = useState(false)
  const [shouldOpenDialogRefuse, setShouldOpenDialogRefuse] = useState(false);
  const [readOnly, setReadOnly] = useState(false)
  useEffect(() => {
    updateDataEmployee()
  }, [])
  const updateDataEmployee = () => {
    getListDataEmployees().then((res) => {
      setListDataEmployees(
        res.data.filter(
          (item) =>
            item.status === 'L??u m???i' ||
            ( item.status === 'T??? ch???i' && item?.refuse) ||
           ( item.status === 'Y??u c???u b??? sung' && item?.request) ||
            item.status === 'Ch??? n???p h??? s??' ||
            item.status === 'Ch??? x??? l??' 
        ),
      )
    })
  }

  const handleEditEmployee = (obj) => {
    setEmployee(obj)
    setShouldOpenEditDialog(true)
  }

  const handleDeleteEmployee = () => {
    deleteEmployee(employee).then(() => {
      updateDataEmployee()
      toast.success('X??a th??nh c??ng')
      handleClose()
    })
  }
  const columns = [
    {
      field: 'action',
      headerName: 'Thao t??c',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <>
        <IconButton
             className={(row.status === 'L??u m???i' || row.status === 'Ch??? n???p h??? s??') ? "icon-btn1-disable" : "icon-btn1"}
             onClick={() => {
              if(row?.request){
                setShouldOpenviewRequestDialog(true)
              } else if(row?.refuse){
                setShouldOpenDialogRefuse(true)
              }
               setEmployee(row)
             }}
             disabled={
              row.status === 'L??u m???i' ||
              row.status === 'Ch??? n???p h??? s??'
            }
           >
             <ErrorIcon />
           </IconButton>
          <IconButton
            color="success"
            onClick={() => {
              setShouldOpenViewDialog(true)
              setEmployee(row)
              setReadOnly(true)
            }}
            disabled={
              row.status === 'K???t th??c' ||
              row.status === 'Ch??? n???p h??? s??' ||
              row.status === 'L??u m???i' ||
              row.status === 'T??? ch???i'
            }
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            color="success"
            onClick={() => {
              handleEditEmployee(row)
            }}
            disabled={
              row.status === 'K???t th??c' ||
              row.status === 'Ch??? duy???t' ||
              row.status === '???? duy???t' ||
              row.status === 'T??? ch???i' ||
              row.status === 'Ch??? x??? l??'
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            disabled={
              row?.status === 'Ch??? n???p h??? s??' ||
              row?.status === 'Ch??? duy???t' ||
              row?.status === 'Y??u c???u b??? sung' ||
              row?.status === '???? duy???t' ||
              row?.status === 'Ch??? duy???t' ||
              row?.status === 'T??? ch???i'
            }
            onClick={() => {
              setEmployee(row)
              setShouldOpenConfirmDialog(true)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: 'code',
      headerName: 'M?? nh??n vi??n',
      renderCell: ({ row }) => row?.code,
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'H??? v?? T??n',
      flex: 0.8,
      renderCell: ({ row }) => row?.name,
    },
    {
      field: 'birthDay',
      headerName: 'Ng??y sinh',
      type: 'date',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => moment(row?.birthDay).format('DD/MM/YYYY'),
    },
    {
      field: 'phone',
      headerName: 'S??? ??i???n tho???i',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => row?.phone,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 0.8,
      renderCell: ({ row }) => row?.email,
    },
    {
      field: 'status',
      headerName: 'Tr???ng th??i',
      flex: 0.6,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => {
        return row?.status
      },
    },
  ]
  const handleDelete = () => {
    toast.success('X??a th??nh c??ng')
    handleClose()
  }

  const handleClose = () => {
    setShouldOpenConfirmDialog(false)
    setShouldOpenEditDialog(false)
    setShouldOpenViewDialog(false)
    setShouldOpenviewRequestDialog(false)
    setShouldOpenDialogRefuse(false)
    updateDataEmployee()
    setEmployee({
      code: '',
      name: '',
      gender: '',
      ethnic: '',
      religion: '',
      image: '',
      email: '',
      phone: '',
      birthDay: '',
      birthplace: '',
      position: '',
      team: '',
      salary: '',
      identification: '',
      issuedBy: '',
      dateRange: '',
      province: '',
      district: '',
      commune: '',
      addressDetail: '',
      listDiplomas: [],
      listRelationships: [],
    })
    setReadOnly(false)
  }

  return (
    <>
      <ToastContainer
        autoClose={2000}
        draggable={false}
        limit={3}
        theme="colored"
      />
      <Box m="20px">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb" marginBottom="20px">
            <StyledBreadcrumb
              label="Home"
              icon={<HomeIcon fontSize="small" />}
            ></StyledBreadcrumb>
            <StyledBreadcrumb
              component="a"
              href="/"
              label="Qu???n l?? nh??n vi??n"
            />
            <StyledBreadcrumb
              component="a"
              href="/manage-employee-create"
              label="T???o m???i nh??n vi??n"
            />
          </Breadcrumbs>
        </div>
        <Button
          variant="contained"
          className="button-confirm1"
          onClick={() => setShouldOpenEditDialog(true)}
        >
          Th??m
        </Button>
        <Box
          m="10px 0 0 0"
          height="70vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              color: "#fbfbfb",
              backgroundColor: "#0D4C92",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              color: "#fbfbfb",
              backgroundColor: "#0D4C92",
            },
            "& .MuiDataGrid-footerContainer > .MuiTablePagination-root": {
              color: "#fbfbfb",
            },
            "& .MuiDataGrid-footerContainer .MuiSvgIcon-root": {
              color: "#fbfbfb",
            },
            "& .MuiDataGrid-footerContainer .Mui-disabled .MuiSvgIcon-root": {
              color: "rgba(251,251,251,.5)",
            },
            "& .MuiCheckbox-root": {
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
          <DataGrid rows={listDataEmployees} columns={columns} />
        </Box>
      </Box>

      {shouldOpenEditDialog && (
        <DiaLogCreateNew
          open={shouldOpenEditDialog}
          employee={employee}
          setEmployee={(data) => setEmployee(data)}
          onClose={handleClose}
          listDataEmployees={listDataEmployees}
          setListDataEmployees={setListDataEmployees}
        />
      )}

      {shouldOpenViewDialog && (
        <DialogProfile
          open={shouldOpenViewDialog}
          handleCloseDialog={handleClose}
          item={employee}
          readOnly={readOnly}
        />
      )}

      {shouldOpenConfirmDialog && (
        <ConfirmationDialog
          title="X??c nh???n"
          text="B???n c?? mu???n x??a h??? s?? nh??n vi??n n??y"
          open={shouldOpenConfirmDialog}
          onYesClick={handleDeleteEmployee}
          onConfirmDialogClose={handleClose}
        />
      )}
      {shouldOpenviewRequestDialog && (
        <DialogAdditionalRequest
          open={shouldOpenviewRequestDialog}
          handleCloseDialog={handleClose}
          employee={employee}
        />
      )}
      {shouldOpenDialogRefuse && (
        <DialogRefuse
          open={shouldOpenDialogRefuse}
          handleCloseDialog={handleClose}
          employee={employee}
        />
      )}
    </>
  );
}
