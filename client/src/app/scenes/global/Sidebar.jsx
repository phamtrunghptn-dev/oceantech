import { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MoreIcon from '@mui/icons-material/More';
import ChairIcon from '@mui/icons-material/Chair';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem
      active={selected === to}
      style={{
        color: colors.grey[100],
        paddingBottom: 15
      }}
      onClick={() => setSelected(to)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState(window.location.pathname)

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {

          background: `#2d353c`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: '#2d353c !important',
        },
        '& .pro-inner-item': {
          color: "rgba(251,251,251,.5)",
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#fbfbfb !important',
        },
        '& .pro-menu-item.active > .pro-inner-item': {
          color: '#fbfbfb !important',
        },
        '& .pro-inner-list-item': {
          background: `#2d353c !important`,
        },
        '& .pro-sub-menu': {
          color: `#fbfbfb !important`,
        },
        '& .pro-menu-item > .pro-inner-item:focus': {
          color: `#fbfbfb !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square" style={{height: "100vh"}}>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" style={{color: "#fbfbfb"}}>
                  OceanTech
                </Typography>
                <IconButton style={{color: "#fbfbfb"}} onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
        
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu
              title=" Lãnh đạo"
              icon={<ChairIcon />}
              defaultOpen={selected === "/leadership-pending" || selected === "/leadership-approved"}
            >         
            <Item
              title="Chờ duyệt"
              to="/leadership-pending"
              icon={<PendingActionsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Đã duyệt"
              to="/leadership-approved"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>
            <SubMenu
              title="Quản lý nhân viên"
              icon={<ContactsOutlinedIcon />}
              defaultOpen={selected === "/manage-employee-create" || selected === "/manage_employee_manage" || selected === "/manage_employee_remove"}
            >
            <Item
              title="Tạo mới"
              to="/manage-employee-create"
              icon={<PersonAddAlt1Icon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Quản lý"
              to="/manage_employee_manage"
              icon={<ManageAccountsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Kết thúc"
              to="/manage_employee_remove"
              icon={<PersonRemoveAlt1Icon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Nội dung liên quan"
              to="/manage_employee_release"
              icon={<MoreIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
